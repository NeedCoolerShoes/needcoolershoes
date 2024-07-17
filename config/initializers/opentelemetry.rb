require "opentelemetry/sdk"
require "opentelemetry/exporter/otlp"
require "opentelemetry/instrumentation/action_pack"

OpenTelemetry::SDK.configure do |c|
  c.service_name = "needcoolshoes"
  c.use "OpenTelemetry::Instrumentation::ActionPack"
end
