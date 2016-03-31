class Api::NotesController < ApplicationController
  def index
    @notes = current_user.notes
  end

  def create
    @note = Note.new(note_params)

    @note.save!

    render :index

  end

  def destroy
    note = Note.find(params[:id])

    note.destroy!

    render :index
  end

  def show
    @note = Note.find(params[:id])
  end

  def update
    @note = Note.find(params[:id])

    @note.update!(note_params)

    render :index
  end

  private

  def note_params
    params.require(:note).permit(:title, :body, :notebook_id, :author_id)
  end
end
