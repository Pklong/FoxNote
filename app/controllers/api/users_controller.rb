class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      User.set_up_new_user(@user)
      login!(@user)
      render :show
    else
      render json: { message: @user.errors.full_messages }, status: 400
    end

  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params) && @user.id == current_user.id
      render :show
    else
      render json: { message: @user.errors.full_messages }, status: 400
    end
  end

  def destroy
    @user = User.find(params[:id])

    if @user.destroy && @user.id == current_user.id
      render json: {}
    else
      render json: {}, status: 404
    end

  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :image)
  end
end
