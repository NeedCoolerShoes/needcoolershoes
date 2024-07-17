module SitemapHelper
  def last_modified(file)
    file = Pathname(file)
    return "1970-01-01" unless file.exist?
    last_modified_date(file.mtime)
  end

  def last_modified_date(date)
    return "1970-01-01" unless date.respond_to? :strftime
    date.strftime("%Y-%m-%d")
  end
end
