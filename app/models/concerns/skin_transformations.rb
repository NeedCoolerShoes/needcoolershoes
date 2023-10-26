module SkinTransformations
  UVMAP_CLASSIC = {
    face: [8, 8, 8, 8],
    face_back: [24, 8, 8, 8],
    face_overlay: [40, 8, 8, 8],
    face_overlay_back: [56, 8, 8, 8],
    torso: [20, 20, 8, 12],
    torso_back: [32, 20, 8, 12],
    torso_overlay: [20, 36, 8, 12],
    torso_overlay_back: [32, 36, 8, 12],
    left_arm: [36, 52, 4, 12],
    left_arm_back: [44, 52, 4, 12],
    left_arm_overlay: [52, 52, 4, 12],
    left_arm_overlay_back: [60, 52, 4, 12],
    right_arm: [44, 20, 4, 12],
    right_arm_back: [52, 20, 4, 12],
    right_arm_overlay: [44, 36, 4, 12],
    right_arm_overlay_back: [52, 36, 4, 12],
    left_leg: [20, 52, 4, 12],
    left_leg_back: [28, 52, 4, 12],
    left_leg_overlay: [4, 52, 4, 12],
    left_leg_overlay_back: [12, 52, 4, 12],
    right_leg: [4, 20, 4, 12],
    right_leg_back: [12, 20, 4, 12],
    right_leg_overlay: [4, 36, 4, 12],
    right_leg_overlay_back: [12, 36, 4, 12]
  }

  UVMAP_SLIM = {
    face: [8, 8, 8, 8],
    face_back: [24, 8, 8, 8],
    face_overlay: [40, 8, 8, 8],
    face_overlay_back: [56, 8, 8, 8],
    torso: [20, 20, 8, 12],
    torso_back: [32, 20, 8, 12],
    torso_overlay: [20, 36, 8, 12],
    torso_overlay_back: [32, 36, 8, 12],
    left_arm: [36, 52, 3, 12],
    left_arm_back: [43, 52, 3, 12],
    left_arm_overlay: [52, 52, 3, 12],
    left_arm_overlay_back: [59, 52, 3, 12],
    right_arm: [44, 20, 3, 12],
    right_arm_back: [51, 20, 3, 12],
    right_arm_overlay: [44, 36, 3, 12],
    right_arm_overlay_back: [51, 36, 4, 12],
    left_leg: [20, 52, 4, 12],
    left_leg_back: [28, 52, 4, 12],
    left_leg_overlay: [4, 52, 4, 12],
    left_leg_overlay_back: [12, 52, 4, 12],
    right_leg: [4, 20, 4, 12],
    right_leg_back: [12, 20, 4, 12],
    right_leg_overlay: [4, 36, 4, 12],
    right_leg_overlay_back: [12, 36, 4, 12]
  }

  UV_FRONTBACK_CLASSIC = [
    {uv: %i[face face_overlay], coordinates: [4, 0]},
    {uv: %i[face_back face_overlay_back], coordinates: [24, 0]},
    {uv: %i[torso torso_overlay], coordinates: [4, 8]},
    {uv: %i[torso_back torso_overlay_back], coordinates: [24, 8]},
    {uv: %i[torso torso_overlay], coordinates: [4, 8]},
    {uv: %i[torso_back torso_overlay_back], coordinates: [24, 8]},
    {uv: %i[left_leg left_leg_overlay], coordinates: [4, 20]},
    {uv: %i[left_leg_back left_leg_overlay_back], coordinates: [24, 20]},
    {uv: %i[right_leg right_leg_overlay], coordinates: [8, 20]},
    {uv: %i[right_leg_back right_leg_overlay_back], coordinates: [28, 20]},
    {uv: %i[left_arm left_arm_overlay], coordinates: [0, 8]},
    {uv: %i[left_arm_back left_arm_overlay_back], coordinates: [32, 8]},
    {uv: %i[right_arm right_arm_overlay], coordinates: [12, 8]},
    {uv: %i[right_arm_back right_arm_overlay_back], coordinates: [20, 8]}
  ]

  UV_FRONTBACK_SLIM = [
    {uv: %i[face face_overlay], coordinates: [4, 0]},
    {uv: %i[face_back face_overlay_back], coordinates: [24, 0]},
    {uv: %i[torso torso_overlay], coordinates: [4, 8]},
    {uv: %i[torso_back torso_overlay_back], coordinates: [24, 8]},
    {uv: %i[torso torso_overlay], coordinates: [4, 8]},
    {uv: %i[torso_back torso_overlay_back], coordinates: [24, 8]},
    {uv: %i[left_leg left_leg_overlay], coordinates: [4, 20]},
    {uv: %i[left_leg_back left_leg_overlay_back], coordinates: [24, 20]},
    {uv: %i[right_leg right_leg_overlay], coordinates: [8, 20]},
    {uv: %i[right_leg_back right_leg_overlay_back], coordinates: [28, 20]},
    {uv: %i[left_arm left_arm_overlay], coordinates: [1, 8]},
    {uv: %i[left_arm_back left_arm_overlay_back], coordinates: [32, 8]},
    {uv: %i[right_arm right_arm_overlay], coordinates: [12, 8]},
    {uv: %i[right_arm_back right_arm_overlay_back], coordinates: [21, 8]}
  ]

  FRONTBACK_MODEL_TO_UV = {
    classic: [UV_FRONTBACK_CLASSIC, UVMAP_CLASSIC],
    slim: [UV_FRONTBACK_SLIM, UVMAP_SLIM]
  }

  def map_to_image(src, uv, uvmap, size: [36, 32], scale: 1)
    size = size.first(2)
    img = ChunkyPNG::Image.new(*size, ChunkyPNG::Color::TRANSPARENT)
    uv.each do |data|
      data[:uv].each do |id|
        crop = src.crop(*uvmap[id])
        img.compose!(crop, *data[:coordinates])
      end
    end
    img.resample_nearest_neighbor!(*size.map { |n| n * scale }) if scale > 1
    img
  end
end