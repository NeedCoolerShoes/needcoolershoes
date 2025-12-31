class OpencollectiveApi
  ENDPOINT = "https://api.opencollective.com/graphql/v2"

  COLLECTIVE_SLUG = ENV["OPENCOLLECTIVE_SLUG"]
  COLLECTIVE_TOKEN = ENV["OPENCOLLECTIVE_TOKEN"]
  COLLECTIVE_GOAL_ID = ENV["OPENCOLLECTIVE_GOAL_ID"]
  
  CACHE_TIME = 5.minutes

  @@cache = {balance: 0, goal: 0, name: "undefined", currency: "USD", cached_at: Time.at(0)}

  def self.get_goal_data
    if !COLLECTIVE_GOAL_ID || !COLLECTIVE_TOKEN || !COLLECTIVE_SLUG
      return @@cache
    end

    if Time.current < (@@cache[:cached_at] + CACHE_TIME)
      return @@cache
    end

    start_time = Time.now.utc.at_beginning_of_year.iso8601

    query = "query {collective(slug:\"#{COLLECTIVE_SLUG}\") {settings, stats {contributionsAmountTimeSeries(timeUnit: YEAR, dateFrom: \"#{start_time}\") {nodes {amount {valueInCents, currency}, label}}}}}"
    response = HTTP.headers("Personal-Token": COLLECTIVE_TOKEN).post(ENDPOINT, json: {query: query})
    data = JSON.parse(response.to_s)

    goals = data.dig("data", "collective", "settings", "goals") || []
    goal = goals.find {|g| g["key"] == COLLECTIVE_GOAL_ID }

    return @@cache unless goal.present?

    nodes = data.dig("data", "collective", "stats", "contributionsAmountTimeSeries", "nodes") || []
    balance = nodes.sum {|node| (node.dig("amount", "valueInCents") || 0).to_i }
    currency = data.dig("data", "collective", "stats", "contributionsAmountTimeSeries", "nodes", 0, "amount", "currency")

    return @@cache unless balance.present?

    @@cache = {
      balance: balance,
      goal: goal["amount"],
      name: goal["title"],
      currency: currency,
      cached_at: Time.current
    }
    
    @@cache
  rescue
    {balance: 0, goal: 0, name: "undefined", currency: "USD", Time.current}
  end

  def self.donation_url
    "https://opencollective.com/#{COLLECTIVE_SLUG}/contribute"
  end
end