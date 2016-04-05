class AddBodyDeltaToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :body_delta, :text
  end
end
