json.id banner.id
json.created_at banner.created_at
json.url banner_url(banner)
json.code banner.data
json.name banner.name
json.description banner.description
json.minimum_version banner.minimum_version
json.style banner.style
json.survival_friendly banner.survival_friendly?
json.favourites_count banner.favourites_count
json.tags banner.tag_list
json.author do
  json.partial! "users/user", user: banner.user
end
