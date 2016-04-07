class Notebook < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:title]

  validates :title, :author_id, presence: true
  has_many :notes, dependent: :destroy
  belongs_to :author, class_name: "User"


end
