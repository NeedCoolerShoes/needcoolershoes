json.image skin.data
json.name skin.name
json.description skin.description
json.tags skin.tag_list
json.author do
  json.partial! 'users/user', user: skin.user
end