class Api::NotebooksController < ApplicationController
  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  def notebook_params
    params.require(:notebook).permit(:title, :body, :notebook_id, :author_id)
  end
end
