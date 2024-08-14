module BannersHelper
  def banners_gallery_filter_tag(params, key, value, title = "", text = nil)
    selected = (params[key] == value)
    if selected
      link_to(text || value, banners_gallery_path(params.except(key)), title: title, class: "font-bold underline")
    else
      link_to(text || value, banners_gallery_path(params.merge({key => value})), title: title, class: "underline")
    end
  end

  def banners_gallery_tag_filter_tag(params, tag, title)
    tags = params[:tag].to_s.split(",")
    classes = "underline"

    if tags.include?(tag)
      classes += " font-bold"
      tags.delete(tag)
    else
      tags << tag
    end

    return link_to(tag, banners_gallery_path(params.merge({tag: tags.join(",")})), title: title, class: classes) if tags.any?
    link_to(tag, banners_gallery_path(params.except(:tag)), title: title, class: classes)
  end
end
