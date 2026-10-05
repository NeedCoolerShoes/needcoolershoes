class Modlog < ApplicationRecord
  belongs_to :user
  belongs_to :associated_user, optional: true, class_name: "User"
  belongs_to :target, polymorphic: true

  validates :user, :target, :changelog, :reason, presence: true

  IGNORED_ATTR = %w[id created_at updated_at]

  scope :with_target_id, ->(id) { where(target_id: id) }
  scope :with_target_type, ->(type) { where(target_type: type) }
  scope :with_user, ->(name) { includes(:user).where(user: {name: name}) }
  scope :with_associated_user, ->(name) { includes(:associated_user).where(associated_user: {name: name}) }

  scope :order_by_creation, ->(dir = :desc) { order(created_at: dir) }

  def self.generate!(target, user, old_attr, new_attr, reason = "")
    attr = {}
    new_attr.each do |key, value|
      next if IGNORED_ATTR.include? key
      next if old_attr[key] == value
      attr[key] = [old_attr[key], value]
    end
    raise "No changes made" if attr.empty?

    associated_user_id = nil
    if target.has_attribute?(:user_id)
      associated_user_id = target.user_id
    end

    create!(user: user, target: target, associated_user_id: associated_user_id, changelog: attr, reason: reason)
  end

  def target_name
    "#{target_type}##{target_id}"
  end
end
