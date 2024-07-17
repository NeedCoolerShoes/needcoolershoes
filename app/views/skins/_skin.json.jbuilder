json.id skin.id
json.url skin.url
json.image skin.data
json.name skin.name
json.description skin.description
json.model skin.model
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
