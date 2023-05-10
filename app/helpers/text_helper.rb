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
end