class SkinAttribution < ApplicationRecord
  belongs_to :skin
  belongs_to :attributed_skin, class_name: "Skin", optional: true

  scope :with_attributed_skin, -> { where.not(attributed_skin_id: nil) }
  scope :visible_to_user, ->(user) { where(skin_id: Skin.visible_to_user(user)) }
  scope :attributed_visible_to_user, ->(user) { where(attributed_skin_id: Skin.visible_to_user(user)) }

  scope :not_by_user, ->(user) { joins(:skin).where.not(skin: {user: user}) }

  validates :attributed_skin, uniqueness: {scope: :skin}
  after_create :update_target_rank

  def self.create_from_url(skin, url, author = nil, *_)
    base_url = Routing.skins_url + "/"
    attribution = new(skin: skin, url: url, author: author)

    if url.include? base_url
      begin
        attribution.attributed_skin = Skin.find(url.delete_prefix(base_url))
        attribution.author ||= attribution.attributed_skin.user.name
      rescue ActiveRecord::RecordNotFound
      end
    end

    attribution.save
  end

  private

  def update_target_rank
    attributed_skin.update_ranking!
  end
end
