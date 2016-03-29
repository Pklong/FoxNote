json.array! @notes do |note|
  json.extract! note, :title, :body
end
