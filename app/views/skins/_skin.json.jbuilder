json.id skin.id
json.created_at skin.created_at
json.url skin.url
json.image skin.data
json.name skin.name
json.description skin.description
json.model skin.model
json.part skin.skin_part.name
json.category skin.skin_category.name
json.license skin.license
json.favourites_count skin.favourites_count
json.tags skin.tag_list
json.attributions do
  json.partial! "skins/attribution", collection: skin.attributions, as: :attribution
end
json.variants do
  json.partial! "skins/attribution", collection: skin.variants, as: :attribution
end
json.author do
  json.partial! "users/user", user: skin.user
end
