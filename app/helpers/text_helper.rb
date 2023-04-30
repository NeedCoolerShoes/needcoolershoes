module TextHelper
  def truncate(string, amount, suffix = "...")
    raise "Not a string" unless string.instance_of? String
    new_string = string[..amount]
    return string if new_string == string
    "#{new_string}#{suffix}"
  end
end