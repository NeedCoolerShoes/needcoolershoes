class Moderation::BaseController < ApplicationController
  require_role :moderator
end
