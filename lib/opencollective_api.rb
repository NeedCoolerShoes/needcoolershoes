class OpencollectiveApi
  ENDPOINT = "https://api.opencollective.com/graphql/v2"

  COLLECTIVE_SLUG = ENV["OPENCOLLECTIVE_SLUG"]
  COLLECTIVE_TOKEN = ENV["OPENCOLLECTIVE_TOKEN"]
  COLLECTIVE_GOAL_ID = ENV["OPENCOLLECTIVE_GOAL_ID"]
  
  CACHE_TIME = 5.minutes

  @@last_cached_at = Time.at(0)
  @@cache = {balance: 0, goal: 0, name: "undefined", currency: "USD"}

  def self.get_goal_data
    if !COLLECTIVE_GOAL_ID || !COLLECTIVE_TOKEN || !COLLECTIVE_SLUG
      return @@cache
    end

    if Time.current < (@@last_cached_at + CACHE_TIME)
      return @@cache
    end

    query = "query {collective(slug:\"#{COLLECTIVE_SLUG}\") {settings, stats {balanceTimeSeries(timeUnit: YEAR) {nodes {amount {valueInCents, currency}}}}}}"
    response = HTTP.headers("Personal-Token": COLLECTIVE_TOKEN).post(ENDPOINT, json: {query: query})
    data = JSON.parse(response.to_s)

    goals = data.dig("data", "collective", "settings", "goals")
    goal = goals.find {|g| g["key"] == COLLECTIVE_GOAL_ID }

    return @@cache unless goal.present?

    balance = data.dig("data", "collective", "stats", "balanceTimeSeries", "nodes", 0, "amount", "valueInCents")
    currency = data.dig("data", "collective", "stats", "balanceTimeSeries", "nodes", 0, "amount", "currency")

    return @@cache unless balance.present?

    @@cache = {
      balance: balance,
      goal: goal["amount"],
      name: goal["title"],
      currency: currency,
    }
    @@last_cached_at = Time.current
    
    @@cache
  rescue
    {balance: 0, goal: 0, name: "undefined", currency: "USD"}
  end

  def self.donation_url
    "https://opencollective.com/#{COLLECTIVE_SLUG}/contribute"
  end
end