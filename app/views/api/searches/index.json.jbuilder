json.meta do
  json.total_pages @search_results.total_pages
  json.query params[:query]
  json.page @search_results.current_page
end


json.search_results do
  all_results = @search_results.map(&:searchable)
  author_pubs = all_results.select { |result| result.author_id == current_user.id } 
  json.array! author_pubs do |author_pub|
    case author_pub
    when Notebook
      json.partial! "api/notebooks/notebook", notebook: author_pub

    when Note
      json.partial! "api/notes/note", note: author_pub
    end

    json._type author_pub.class.to_s
  end
end
