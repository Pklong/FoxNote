json.extract! user, :email, :id

json.image asset_path(user.image.url)
