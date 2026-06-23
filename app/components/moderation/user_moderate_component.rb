# frozen_string_literal: true

class Moderation::UserModerateComponent < ViewComponent::Base
  include TextHelper

  def initialize(user:)
    @user = user
    @has_blocked_email_domain = nil
  end

  def email_name
    @user.email.split("@").slice(..-2).join
  end

  def email_domain
    @user.email.split("@").last
  end

  def has_blocked_email_domain?
    @has_blocked_email_domain ||= BlockedEmailDomain.with_domain(email_domain).any?
  end

  def previous_record
    @user.next(User.status_none)
  end

  def next_record
    @user.previous(User.status_none)
  end

  def modlogs
    @user.modlogs.order(created_at: :desc)
  end

  def markdown(text)
    helpers.markdown(text)
  end
end
