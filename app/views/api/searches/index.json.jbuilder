json.meta do
  json.total_pages @search_results.total_pages
  json.query params[:query]
  json.page @search_results.current_page
end


json.search_results do
  json.array! @search_results.map(&:searchable) do |search_result|
    case search_result
    when Notebook
      json.partial! "api/notebooks/notebook", notebook: search_result

    when Note
      json.partial! "api/notes/note", note: search_result
    end

    json._type search_result.class.to_s
  end
end
