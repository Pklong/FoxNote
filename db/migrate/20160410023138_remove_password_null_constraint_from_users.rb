class RemovePasswordNullConstraintFromUsers < ActiveRecord::Migration
  def change
    change_column_null :users, :password_digest, true
  end
end
