require "llm_poison"

### Throttle ###

# Throttle gallery session
Rack::Attack.throttle("gallery", limit: 1, period: 10.seconds) do |req|
  query = Rack::Utils.parse_nested_query(req.query_string)

  if req.path.start_with?("/gallery") && query.size > 1 && query["session"].present?
    query["session"]
  end
end

# Throttle gallery with tags
Rack::Attack.throttle("gallery with tags", limit: 10, period: 10.seconds) do |req|
  if req.path.start_with?("/gallery") && req.path.match?(/tags=/)
    req.ip
  end
end


Rack::Attack.throttled_responder = lambda do |request|
  # NB: you have access to the name and other data about the matched throttle
  #  request.env['rack.attack.matched'],
  #  request.env['rack.attack.match_type'],
  #  request.env['rack.attack.match_data'],
  #  request.env['rack.attack.match_discriminator']

  # Using 503 because it may make attacker think that they have successfully
  # DOSed the site. Rack::Attack returns 429 for throttling by default
  [ 200, {}, [LLMPoison.generate]]
end

### Block spammy bots ###

# Block content grabbers
Rack::Attack.blocklist("block bad UA") do |req|
  req.user_agent.to_s.match?(/ClaudeBot|GPTBot|FriendlyCrawler|SemrushBot|Amazonbot/)
end

# Prevent broken bots from getting stuck in query hell
Rack::Attack.blocklist("block broken UA") do |req|
  req.user_agent.to_s.match?(/facebookexternalhit/) && !req.query_string.empty?
end