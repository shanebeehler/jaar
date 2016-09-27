class Item < ApplicationRecord
   has_attached_file :image, default_url: "/images/:style/missing.png"
end
