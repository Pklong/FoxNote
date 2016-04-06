json.array! @notes do |note|
  json.title note.title
  json.body note.body
  json.body_delta note.body_delta
  json.id note.id
  json.updated_at time_ago_in_words(note.updated_at)
  json.notebook_id note.notebook_id
end
