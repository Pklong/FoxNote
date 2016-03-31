class Note < ActiveRecord::Base
  include ActionView::Helpers::DateHelper
  belongs_to :author, class_name: "User"

end
