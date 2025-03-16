### Throttle ###

# Throttle gallery
Rack::Attack.throttle("gallery", limit: 20, period: 10.seconds) do |req|
  if req.path.start_with?("/gallery")
    req.ip
  end
end

# Throttle gallery with tags
Rack::Attack.throttle("gallery with tags", limit: 10, period: 10.seconds) do |req|
  if req.path.start_with?("/gallery") && req.path.match?(/tags=/)
    req.ip
  end
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