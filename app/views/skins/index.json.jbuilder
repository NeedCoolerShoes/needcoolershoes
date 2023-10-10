json.page do
  json.current @pagy.page
  json.total @pagy.pages
end
json.skins do
  json.partial! 'skin', collection: @skins, as: :skin
end