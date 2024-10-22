module UserHelper
  def authorized?(role, user = current_user)
    return false unless user.is_a? User
    user.authorized?(role)
  end

  def profile_link(user)
    tag.span class: "pointer-events-auto" do
      content = ""

      if (badge = user.featured_badge).present?
        content += " "
        content += tag.img src: badge.url, alt: "Badge icon", title: badge.name, class: "inline w-4 border rounded-full box-content border-ncs-yellow-500 bg-ncs-yellow-500"
      end

      if user.role?
        content += " "
        content += tag.img src: "/ncsassets/img/medals/#{user.role}.png", alt: "Role icon", title: "Site " + user.role.titleize, class: "inline"
      end

      link_to(user.display_name, user.to_path, class: "underline") + content.html_safe
    end
  end
end