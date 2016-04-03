class Notebook < ActiveRecord::Base
  validates :title, :author_id, presence: true
  has_many :notes, dependent: :destroy
  belongs_to :author, class_name: "User"
end
