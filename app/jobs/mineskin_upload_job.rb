class MineskinUploadJob < ApplicationJob
  include Turbo::Broadcastable

  queue_as :default

  def perform(skin)
    skin.upload_to_mineskin!

    skin.broadcast_replace_to([skin, :give_command], partial: "skins/give_command", locals: {skin: skin}, target: "skin:give_command_#{skin.id}")
  end
end
