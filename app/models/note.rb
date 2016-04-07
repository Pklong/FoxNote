class Note < ActiveRecord::Base
  include ActionView::Helpers::DateHelper
  include PgSearch
  multisearchable against: [:title, :body]
  # using: {tsearch: {prefix: true, dictionary: "english"}}

  validates :title, :body, :author_id, :notebook_id, presence: true
  belongs_to :author, class_name: "User"
  belongs_to :notebook

end
