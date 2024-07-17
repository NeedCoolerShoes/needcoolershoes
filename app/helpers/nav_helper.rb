module NavHelper
  def active_when(path)
    return "active" if request.path.end_with?(path)
    ""
  end

  def class_on_nav(nav, classes, default = "")
    return classes if @nav_section == nav
    default
  end
end
