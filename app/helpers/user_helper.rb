module UserHelper
  def authorized?(role, user = current_user)
    return false unless user.is_a? User
    user.authorized?(role)
  end

  def profile_link(user)
    link_to user.to_path, class: "underline" do
      content = tag.span user.display_name
      if (badge = user.featured_badge).present?
        content += " "
        content += tag.img src: badge.url, alt: badge.name, title: badge.name, class: "inline w-4 border rounded-full box-content border-ncs-yellow-500 bg-ncs-yellow-500"
      end
      if user.role?
        content += " "
        content += tag.img src: "/ncsassets/img/medals/#{user.role}.png", alt: user.role.titleize, title: "Site " + user.role.titleize, class: "inline"
      end
      content
    end
  end
end