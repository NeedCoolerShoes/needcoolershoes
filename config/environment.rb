# Load the Rails application.
require_relative "application"

begin
  ENV["NCRS_COMMIT_HASH"] ||= `git rev-parse --short HEAD`.strip
rescue
  ENV["NCRS_COMMIT_HASH"] = "undefined"
end

# Initialize the Rails application.
Rails.application.initialize!
