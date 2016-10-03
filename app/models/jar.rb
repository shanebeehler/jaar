class Jar < ApplicationRecord
  has_many :items
  belongs_to :user

  scope :newest_first, -> {order('created_at DESC')}
end
