class Note < ActiveRecord::Base
  include ActionView::Helpers::DateHelper
  validates :title, :body, :author_id, presence: true
  belongs_to :author, class_name: "User"
  belongs_to :notebook

end
