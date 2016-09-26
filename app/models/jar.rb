class Jar < ApplicationRecord
  has_many :notes
  belongs_to :user
end
