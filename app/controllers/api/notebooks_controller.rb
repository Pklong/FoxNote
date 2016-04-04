class Api::NotebooksController < ApplicationController
  before_action :require_signed_in

  def create
    @notebook = Notebook.new(notebook_params)

    @notebook.save!

    render :show
  end

  def destroy
    @notebook = Notebook.find(params[:id])

    @notebook.destroy!

    render json: @notebook
  end

  def index
    @notebooks = current_user.notebooks
  end

  def show
    @notebook = Notebook.find(params[:id])
  end

  def update
    @notebook = Notebook.find(params[:id])

    @notebook.update!(notebook_params)

    render :show
  end

  private

  def notebook_params
    params.require(:notebook).permit(:title, :author_id)
  end
end
