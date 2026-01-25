json.id user.id
json.email user.email
json.partial! "users/user", locals: { user: user }