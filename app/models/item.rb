class Item < ApplicationRecord
  belongs_to :jar
  belongs_to :type
  has_attached_file :image, default_url: "/images/:style/missing.png"

end
