module BannersHelper
  def banners_gallery_filter_tag(params, key, value, title = "", text = nil)
    selected = (params[key] == value)
    if selected
      link_to(text || value, banners_gallery_path(params.except(key)), title: title, class: "font-bold underline")
    else
      link_to(text || value, banners_gallery_path(params.merge({key => value})), title: title, class: "underline")
    end
  end
end
