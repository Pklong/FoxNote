class Api::NotesController < ApplicationController
  def index
    @notes = Note.all
  end

  def create
  end

  def destroy
  end

  def show
    @note = Note.find(params[:id])
  end

  def update
  end

  private

  def note_params
    params.require(:note).permit(:title, :body, :notebook_id, :author_id)
  end
end
