class Api::NotesController < ApplicationController
  before_action :require_signed_in

  def create
    @note = Note.new(note_params)
    @note.author_id = current_user.id
    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    if @note.author_id == current_user.id
      @note.destroy!
      render :show
    else
      render json: {}, status: 403
    end

  end

  def index
    @notes = current_user.notes
  end

  def show
    @note = Note.find(params[:id])
  end

  def update
    @note = Note.find(params[:id])

    if @note.update(note_params) && @note.author_id == current_user.id
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end

  end

  private

  def note_params
    params.require(:note).permit(:title,
                                 :body,
                                 :notebook_id,
                                 :body_delta)
  end
end
