json.array! @notes do |note|
  json.extract! note, :title, :body, :id, :updated_at
end
