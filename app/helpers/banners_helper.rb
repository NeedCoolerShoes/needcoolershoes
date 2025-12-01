module BannersHelper
  def banners_gallery_filter_tag(params, key, value, title = "", text = nil)
    selected = (params[key] == value)
    if selected
      link_to(text || value, banners_gallery_path(params.except(key)), title: title, class: "font-bold underline text-ncs-blue", rel: "nofollow")
    else
      link_to(text || value, banners_gallery_path(params.merge({key => value})), title: title, class: "underline", rel: "nofollow")
    end
  end

  def banners_gallery_tag_filter_tag(params, tag, title)
    tags = params[:tag].to_s.split(",").first(Taggable::TAG_STACK_LIMIT)
    classes = "underline"

    if tags.include?(tag)
      classes += " font-bold text-ncs-blue"
      tags.delete(tag)
    else
      tags.delete_at(-1) if tags.size > Taggable::TAG_STACK_LIMIT - 1
      tags << tag
    end

    return link_to(tag, banners_gallery_path(params.merge({tag: tags.join(",")})), title: title, class: classes, rel: "nofollow") if tags.any?
    link_to(tag, banners_gallery_path(params.except(:tag)), title: title, class: classes, rel: "nofollow")
  end
end
