class Modlog < ApplicationRecord
  belongs_to :user
  belongs_to :target, polymorphic: true

  validates :user, :target, :changelog, :reason, presence: true

  IGNORED_ATTR = %w[id created_at updated_at]

  scope :with_target_id, ->(id) { where(target_id: id) }
  scope :with_target_type, ->(type) { where(target_type: type) }
  scope :with_user, ->(name) { includes(:user).where(user: {name: name}) }

  scope :order_by_creation, ->(dir = :desc) { order(created_at: dir) }

  def self.generate!(target, user, old_attr, new_attr, reason = "")
    attr = {}
    new_attr.each do |key, value|
      next if IGNORED_ATTR.include? key
      next if old_attr[key] == value
      attr[key] = [old_attr[key], value]
    end
    raise "No changes made" if attr.empty?
    create!(user: user, target: target, changelog: attr, reason: reason)
  end

  def target_name
    "#{target_type}##{target_id}"
  end
end
