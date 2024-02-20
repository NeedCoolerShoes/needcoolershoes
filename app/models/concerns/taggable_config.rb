module TaggableConfig
  extend ActiveSupport::Concern

  included do
    validates :name, length: { maximum: 32 }
  end
end