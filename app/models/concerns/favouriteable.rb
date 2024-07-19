module Favouriteable
  extend ActiveSupport::Concern

  included do
    has_many :favourites, as: :target, dependent: :destroy
    attr_readonly :favourites_count
  end
end