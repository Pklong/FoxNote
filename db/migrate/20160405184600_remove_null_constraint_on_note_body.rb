class RemoveNullConstraintOnNoteBody < ActiveRecord::Migration
  def change
    change_column_null :notes, :body, true
  end
end
