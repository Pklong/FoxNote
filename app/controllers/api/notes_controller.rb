class Api::NotesController < ApplicationController
  def index
    @notes = Note.all
  end

  def create
    @note = Note.new(note_params)

    if @note.save
      redirect_to api_notes_url
    else
      flash[:error] = @note.errors.full_messages
      render :index
    end
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

    @note.update(note_params)

    render :index
  end

  private

  def note_params
    params.require(:note).permit(:title, :body, :notebook_id, :author_id)
  end
end
