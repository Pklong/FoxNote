class Notebook < ActiveRecord::Base
  validates :title, :author_id, presence: true
  has_many :notes
  belongs_to :author, class_name: "User"
end
