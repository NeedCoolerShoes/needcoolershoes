module SkinsHelper
  def pagy_url_for(pagy, page, absolute: false, html_escaped: false) # it was (page, pagy) in previous versions
    params = request.query_parameters.merge(pagy.vars[:page_param] => page, :only_path => !absolute)
    html_escaped ? url_for(params).gsub("&", "&amp;") : url_for(params)
  end

  def skins_gallery_filter_tag(params, key, value, title = "", text = nil)
    selected = (params[key] == value)
    if selected
      link_to(text || value, skins_gallery_path(params.except(key)), title: title, class: "font-bold underline")
    else
      link_to(text || value, skins_gallery_path(params.merge({key => value})), title: title, class: "underline")
    end
  end

  def skins_gallery_tag_filter_tag(params, tag, title)
    tags = params[:tag].to_s.split(",").first(Taggable::TAG_STACK_LIMIT)
    classes = "underline"

    if tags.include?(tag)
      classes += " font-bold"
      tags.delete(tag)
    else
      tags.delete_at(-1) if tags.size > Taggable::TAG_STACK_LIMIT - 1
      tags << tag
    end

    return link_to(tag, skins_gallery_path(params.merge({tag: tags.join(",")})), title: title, class: classes) if tags.any?
    link_to(tag, skins_gallery_path(params.except(:tag)), title: title, class: classes)
  end
end
