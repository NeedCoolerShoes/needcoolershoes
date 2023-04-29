module NavHelper
  def active_when(path)
    return "active" if request.path.end_with?(path)
    ""
  end

  def class_on_path(path, classes, default = "")
    return classes if request.path.end_with?(path)
    default
  end
end