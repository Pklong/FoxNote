json.array! do |notebook|
  json.partial! "api/notebooks/notebook", notebook: notebook
end
