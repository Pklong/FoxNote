class Api::NotesController < ApplicationController
  before_action :require_signed_in
  def index
    @notes = current_user.notes
  end

  def create
    @note = Note.new(note_params)

    @note.save!

    render :show

  end

  def destroy
    note = Note.find(params[:id])

    note.destroy!

    render text: "note destroyed"
  end

  def show
    @note = Note.find(params[:id])
  end

  def update
    @note = Note.find(params[:id])

    @note.update!(note_params)

    render :show
  end

  private

  def note_params
    params.require(:note).permit(:title, :body, :notebook_id, :author_id)
  end
end
