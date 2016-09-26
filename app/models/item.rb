class Item < ApplicationRecord
  belongs_to :jar
  belongs_to :type
end
