module SkinsHelper
  def pagy_url_for(pagy, page, absolute: false, html_escaped: false) # it was (page, pagy) in previous versions
    params = request.query_parameters.merge(pagy.vars[:page_param] => page, :only_path => !absolute)
    html_escaped ? url_for(params).gsub("&", "&amp;") : url_for(params)
  end

  def gallery_filter_tag(params, key, value, title = "", text = nil)
    selected = (params[key] == value)
    if selected
      link_to(text || value, gallery_path(params.except(key)), title: title, class: "font-bold underline")
    else
      link_to(text || value, gallery_path(params.merge({key => value})), title: title, class: "underline")
    end
  end
end
