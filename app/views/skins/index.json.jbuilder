json.page do
  json.current @pagy.page
  json.total @pagy.pages
end
json.filters do
  json.parts SkinPart.order(id: :asc).pluck(:name)
  json.categories SkinCategory.order(id: :asc).pluck(:name)
end
json.skins do
  json.partial! "skin", collection: @skins, as: :skin
end
