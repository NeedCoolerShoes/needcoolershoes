json.id modlog.id
json.created_at modlog.created_at
json.updated_at modlog.created_at
json.target do
  json.id modlog.target_id
  json.type modlog.target_type
end
json.moderator do
  json.partial! 'users/user', user: modlog.user
end
json.reason modlog.reason
json.changelog modlog.changelog