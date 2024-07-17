json.page do
  json.current @pagy.page
  json.total @pagy.pages
end
json.modlog do
  json.partial! "modlog", collection: @modlogs, as: :modlog
end
