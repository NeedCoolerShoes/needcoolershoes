module NavHelper
  def active_when(path)
    puts request.path
    return "active" if request.path.end_with?(path)
    ""
  end
end