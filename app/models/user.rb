class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  
  before_validation :setup_username, unless: :id?

  validates :name, format: { with: /\A[a-z0-9\-_]+\z/, message: "only allows letters, numbers, dashes and underscores" }

  private

  def setup_username
    self.display_name = self.name
    self.name = self.name.to_s.parameterize
  end
end
