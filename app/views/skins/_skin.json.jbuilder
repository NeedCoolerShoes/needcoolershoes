json.id skin.id
json.url skin_url(skin)
json.image skin.data
json.name skin.name
json.description skin.description
json.model skin.model
json.favourites_count skin.favourites_count
json.tags skin.tag_list
json.author do
  json.partial! 'users/user', user: skin.user
end