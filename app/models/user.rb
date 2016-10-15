class User < ApplicationRecord
  has_many :jars
  authenticates_with_sorcery!

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :email, uniqueness: true

  def generate_general_jar(user)
    @jar = Jar.new
    @jar.name = "General"
    @jar.user_id = user.id
    @jar.color = '1'
    @jar.save
  end
end
