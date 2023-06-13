module TextHelper
  def truncate(string, amount, suffix = "...")
    raise "Not a string" unless string.instance_of? String
    new_string = string[..amount]
    return string if new_string == string
    "#{new_string}#{suffix}"
  end

  def markdown(text)
    return '' if text.nil?
    renderer = Redcarpet::Render::HTML.new(render_options = {filter_html: true, hard_wrap: true})
  
    extensions = %i[
      hard_wrap autolink no_intra_emphasis tables fenced_code_blocks
      disable_indented_code_blocks strikethrough lax_spacing quote
      footnotes highlight underline
    ]
    extensions_hash = {}
    extensions.each { |extension| extensions_hash[extension] = true }

    Redcarpet::Markdown.new(renderer, extensions_hash).render(text).html_safe
  end

  def simple_date(date)
    return "Invalid Date" unless date.respond_to? :strftime
    date.strftime("%b %d, %Y")
  end

  def simple_number(number)
    number = number.to_i
    return number.to_s if number < 1000
    return "#{number / 1000.0}k" if number < 9999
    return "#{number / 1000}k" if number < 1000000
    return "#{number / 1000000.0}m" if number < 9999999
    return "#{number / 1000000}m" if number < 1000000000
    return "1B+"
  end
end