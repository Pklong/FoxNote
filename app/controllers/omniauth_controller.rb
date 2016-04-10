class OmniauthController < ApplicationController

  def google
    author = User.find_or_create_by_auth_hash(auth_hash)
    login!(author)
    redirect_to "/home"
  end

  private
  def auth_hash
    request.env['omniauth.auth']
  end
end
