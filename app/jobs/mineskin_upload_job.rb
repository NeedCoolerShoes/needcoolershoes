class MineskinUploadJob < ApplicationJob
  queue_as :default

  def perform(skin)
    skin.upload_to_mineskin!
  end
end
