class Item < ApplicationRecord
  belongs_to :jar
  belongs_to :type
  has_attached_file :type_data
  validates_attachment_content_type :type_data, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

end
