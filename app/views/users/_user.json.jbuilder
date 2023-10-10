json.name user.name
json.display_name user.display_name
json.biography user.biography
json.pixels user.pixels
json.joined_at user.created_at
json.public_skin_count user.skins.count
json.badges do
  json.partial! 'users/badge', collection: user.badges, as: :badge
end