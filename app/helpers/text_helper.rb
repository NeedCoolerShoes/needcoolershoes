module TextHelper
  def truncate(string, amount, suffix = "...")
    raise "Not a string" unless string.instance_of? String
    new_string = string[..amount]
    return string if new_string == string
    "#{new_string}#{suffix}"
  end

  def markdown(text)
    return "" if text.nil?
    render_options = {filter_html: true, safe_links_only: true, hard_wrap: true, link_attributes: {rel: :nofollow}}
    renderer = Redcarpet::Render::HTML.new(render_options)

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
    return number.to_s if number < 1_000
    return "#{(number / 1_000.0).round(2)}K" if number < 9_999
    return "#{number / 1_000}K" if number < 1_000_000
    return "#{(number / 1_000_000.0).round(2)}M" if number < 9_999_999
    return "#{number / 1_000_000}M" if number < 1_000_000_000
    "1B+"
  end
end
