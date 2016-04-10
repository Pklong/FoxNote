Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["GOOGLE_CLIENT_ID"], ENV["GOOGLE_CLIENT_SECRET"],
    {
      name: 'google',
      scope: 'email',
      access_type: 'online',
      image_aspect_ratio: 'square',
      image_size: 65
    }
end

OmniAuth.config.full_host = Rails.env.production? ? 'http://www.foxnote.tech' : 'http://localhost:3000'
