json.page do
  json.current @pagy.page
  json.total @pagy.pages
end
json.banners do
  json.partial! "banner", collection: @banners, as: :banner
end
