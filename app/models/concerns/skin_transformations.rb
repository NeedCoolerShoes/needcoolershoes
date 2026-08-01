module SkinTransformations
  UVMAP_CLASSIC = {
    face: [8, 8, 8, 8],
    face_back: [24, 8, 8, 8],
    face_overlay: [40, 8, 8, 8],
    face_overlay_back: [56, 8, 8, 8],
    face_right: [0, 8, 8, 8],
    face_left: [16, 8, 8, 8],
    face_overlay_right: [32, 8, 8, 8],
    face_overlay_left: [48, 8, 8, 8],
    torso: [20, 20, 8, 12],
    torso_back: [32, 20, 8, 12],
    torso_overlay: [20, 36, 8, 12],
    torso_overlay_back: [32, 36, 8, 12],
    left_arm: [36, 52, 4, 12],
    left_arm_back: [44, 52, 4, 12],
    left_arm_overlay: [52, 52, 4, 12],
    left_arm_overlay_back: [60, 52, 4, 12],
    left_arm_left: [40, 52, 4, 12],
    left_arm_overlay_left: [56, 52, 4, 12],
    right_arm: [44, 20, 4, 12],
    right_arm_back: [52, 20, 4, 12],
    right_arm_overlay: [44, 36, 4, 12],
    right_arm_overlay_back: [52, 36, 4, 12],
    right_arm_right: [40, 20, 4, 12],
    right_arm_overlay_right: [40, 36, 4, 12],
    left_leg: [20, 52, 4, 12],
    left_leg_back: [28, 52, 4, 12],
    left_leg_overlay: [4, 52, 4, 12],
    left_leg_overlay_back: [12, 52, 4, 12],
    left_leg_left: [24, 52, 4, 12],
    left_leg_overlay_left: [8, 52, 4, 12],
    right_leg: [4, 20, 4, 12],
    right_leg_back: [12, 20, 4, 12],
    right_leg_overlay: [4, 36, 4, 12],
    right_leg_overlay_back: [12, 36, 4, 12],
    right_leg_right: [0, 20, 4, 12],
    right_leg_overlay_right: [0, 36, 4, 12]
  }

  UVMAP_SLIM = {
    face: [8, 8, 8, 8],
    face_back: [24, 8, 8, 8],
    face_overlay: [40, 8, 8, 8],
    face_overlay_back: [56, 8, 8, 8],
    face_right: [0, 8, 8, 8],
    face_left: [16, 8, 8, 8],
    face_overlay_right: [32, 8, 8, 8],
    face_overlay_left: [48, 8, 8, 8],
    torso: [20, 20, 8, 12],
    torso_back: [32, 20, 8, 12],
    torso_overlay: [20, 36, 8, 12],
    torso_overlay_back: [32, 36, 8, 12],
    left_arm: [36, 52, 3, 12],
    left_arm_back: [43, 52, 3, 12],
    left_arm_overlay: [52, 52, 3, 12],
    left_arm_overlay_back: [59, 52, 3, 12],
    left_arm_left: [39, 52, 4, 12],
    left_arm_overlay_left: [55, 52, 4, 12],
    right_arm: [44, 20, 3, 12],
    right_arm_back: [51, 20, 3, 12],
    right_arm_overlay: [44, 36, 3, 12],
    right_arm_overlay_back: [51, 36, 3, 12],
    right_arm_right: [40, 20, 4, 12],
    right_arm_overlay_right: [40, 36, 4, 12],
    left_leg: [20, 52, 4, 12],
    left_leg_back: [28, 52, 4, 12],
    left_leg_overlay: [4, 52, 4, 12],
    left_leg_overlay_back: [12, 52, 4, 12],
    left_leg_left: [24, 52, 4, 12],
    left_leg_overlay_left: [8, 52, 4, 12],
    right_leg: [4, 20, 4, 12],
    right_leg_back: [12, 20, 4, 12],
    right_leg_overlay: [4, 36, 4, 12],
    right_leg_overlay_back: [12, 36, 4, 12],
    right_leg_right: [0, 20, 4, 12],
    right_leg_overlay_right: [0, 36, 4, 12]
  }

  UV_FRONTBACK_CLASSIC = [
    {uv: %i[face face_overlay], coordinates: [4, 0]},
    {uv: %i[face_back face_overlay_back], coordinates: [24, 0]},
    {uv: %i[torso torso_overlay], coordinates: [4, 8]},
    {uv: %i[torso_back torso_overlay_back], coordinates: [24, 8]},
    {uv: %i[right_leg right_leg_overlay], coordinates: [4, 20]},
    {uv: %i[right_leg_back right_leg_overlay_back], coordinates: [28, 20]},
    {uv: %i[left_leg left_leg_overlay], coordinates: [8, 20]},
    {uv: %i[left_leg_back left_leg_overlay_back], coordinates: [24, 20]},
    {uv: %i[right_arm right_arm_overlay], coordinates: [0, 8]},
    {uv: %i[right_arm_back right_arm_overlay_back], coordinates: [32, 8]},
    {uv: %i[left_arm left_arm_overlay], coordinates: [12, 8]},
    {uv: %i[left_arm_back left_arm_overlay_back], coordinates: [20, 8]}
  ]

  UV_FRONTBACK_SLIM = [
    {uv: %i[face face_overlay], coordinates: [4, 0]},
    {uv: %i[face_back face_overlay_back], coordinates: [24, 0]},
    {uv: %i[torso torso_overlay], coordinates: [4, 8]},
    {uv: %i[torso_back torso_overlay_back], coordinates: [24, 8]},
    {uv: %i[right_leg right_leg_overlay], coordinates: [4, 20]},
    {uv: %i[right_leg_back right_leg_overlay_back], coordinates: [28, 20]},
    {uv: %i[left_leg left_leg_overlay], coordinates: [8, 20]},
    {uv: %i[left_leg_back left_leg_overlay_back], coordinates: [24, 20]},
    {uv: %i[right_arm right_arm_overlay], coordinates: [1, 8]},
    {uv: %i[right_arm_back right_arm_overlay_back], coordinates: [32, 8]},
    {uv: %i[left_arm left_arm_overlay], coordinates: [12, 8]},
    {uv: %i[left_arm_back left_arm_overlay_back], coordinates: [21, 8]}
  ]

  UV_ALL_SIDES_CLASSIC = [
    {uv: %i[right_leg], coordinates: [43, 205], scale: [40, 120]},
    {uv: %i[right_leg_overlay], coordinates: [40, 202], scale: [46, 126]},
    {uv: %i[right_leg_back], coordinates: [403, 205], scale: [40, 120]},
    {uv: %i[right_leg_overlay_back], coordinates: [400, 202], scale: [46, 126]},
    {uv: %i[right_leg_right], coordinates: [223, 205], scale: [40, 120]},
    {uv: %i[right_leg_overlay_right], coordinates: [220, 202], scale: [46, 126]},
    
    {uv: %i[left_leg], coordinates: [83, 205], scale: [40, 120]},
    {uv: %i[left_leg_overlay], coordinates: [80, 202], scale: [46, 126]},
    {uv: %i[left_leg_back], coordinates: [363, 205], scale: [40, 120]},
    {uv: %i[left_leg_overlay_back], coordinates: [360, 202], scale: [46, 126]},
    {uv: %i[left_leg_left], coordinates: [543, 205], scale: [40, 120]},
    {uv: %i[left_leg_overlay_left], coordinates: [540, 202], scale: [46, 126]},
    
    {uv: %i[right_arm], coordinates: [3, 85], scale: [40, 120]},
    {uv: %i[right_arm_overlay], coordinates: [0, 82], scale: [46, 126]},
    {uv: %i[right_arm_back], coordinates: [443, 85], scale: [40, 120]},
    {uv: %i[right_arm_overlay_back], coordinates: [440, 82], scale: [46, 126]},
    {uv: %i[right_arm_right], coordinates: [223, 85], scale: [40, 120]},
    {uv: %i[right_arm_overlay_right], coordinates: [220, 82], scale: [46, 126]},
    
    {uv: %i[left_arm], coordinates: [123, 85], scale: [40, 120]},
    {uv: %i[left_arm_overlay], coordinates: [120, 82], scale: [46, 126]},
    {uv: %i[left_arm_back], coordinates: [323, 85], scale: [40, 120]},
    {uv: %i[left_arm_overlay_back], coordinates: [320, 82], scale: [46, 126]},
    {uv: %i[left_arm_left], coordinates: [543, 85], scale: [40, 120]},
    {uv: %i[left_arm_overlay_left], coordinates: [540, 82], scale: [46, 126]},

    {uv: %i[torso], coordinates: [43, 85], scale: [80, 120]},
    {uv: %i[torso_overlay], coordinates: [40, 82], scale: [86, 126]},
    {uv: %i[torso_back], coordinates: [363, 85], scale: [80, 120]},
    {uv: %i[torso_overlay_back], coordinates: [360, 82], scale: [86, 126]},

    {uv: %i[face], coordinates: [43, 5], scale: [80, 80]},
    {uv: %i[face_overlay], coordinates: [38, 0], scale: [90,90]},
    {uv: %i[face_right], coordinates: [203, 5], scale: [80, 80]},
    {uv: %i[face_overlay_right], coordinates: [198, 0], scale: [90,90]},
    {uv: %i[face_back], coordinates: [363, 5], scale: [80, 80]},
    {uv: %i[face_overlay_back], coordinates: [358, 0], scale: [90,90]},
    {uv: %i[face_left], coordinates: [523, 5], scale: [80, 80]},
    {uv: %i[face_overlay_left], coordinates: [518, 0], scale: [90,90]},
  ]

  UV_ALL_SIDES_SLIM = [
    {uv: %i[right_leg], coordinates: [43, 205], scale: [40, 120]},
    {uv: %i[right_leg_overlay], coordinates: [40, 202], scale: [46, 126]},
    {uv: %i[right_leg_back], coordinates: [403, 205], scale: [40, 120]},
    {uv: %i[right_leg_overlay_back], coordinates: [400, 202], scale: [46, 126]},
    {uv: %i[right_leg_right], coordinates: [223, 205], scale: [40, 120]},
    {uv: %i[right_leg_overlay_right], coordinates: [220, 202], scale: [46, 126]},
    
    {uv: %i[left_leg], coordinates: [83, 205], scale: [40, 120]},
    {uv: %i[left_leg_overlay], coordinates: [80, 202], scale: [46, 126]},
    {uv: %i[left_leg_back], coordinates: [363, 205], scale: [40, 120]},
    {uv: %i[left_leg_overlay_back], coordinates: [360, 202], scale: [46, 126]},
    {uv: %i[left_leg_left], coordinates: [543, 205], scale: [40, 120]},
    {uv: %i[left_leg_overlay_left], coordinates: [540, 202], scale: [46, 126]},
    
    {uv: %i[right_arm], coordinates: [13, 85], scale: [30, 120]},
    {uv: %i[right_arm_overlay], coordinates: [10, 82], scale: [36, 126]},
    {uv: %i[right_arm_back], coordinates: [443, 85], scale: [30, 120]},
    {uv: %i[right_arm_overlay_back], coordinates: [440, 82], scale: [36, 126]},
    {uv: %i[right_arm_right], coordinates: [223, 85], scale: [40, 120]},
    {uv: %i[right_arm_overlay_right], coordinates: [220, 82], scale: [46, 126]},
    
    {uv: %i[left_arm], coordinates: [123, 85], scale: [30, 120]},
    {uv: %i[left_arm_overlay], coordinates: [120, 82], scale: [36, 126]},
    {uv: %i[left_arm_back], coordinates: [333, 85], scale: [30, 120]},
    {uv: %i[left_arm_overlay_back], coordinates: [330, 82], scale: [36, 126]},
    {uv: %i[left_arm_left], coordinates: [543, 85], scale: [40, 120]},
    {uv: %i[left_arm_overlay_left], coordinates: [540, 82], scale: [46, 126]},

    {uv: %i[torso], coordinates: [43, 85], scale: [80, 120]},
    {uv: %i[torso_overlay], coordinates: [40, 82], scale: [86, 126]},
    {uv: %i[torso_back], coordinates: [363, 85], scale: [80, 120]},
    {uv: %i[torso_overlay_back], coordinates: [360, 82], scale: [86, 126]},

    {uv: %i[face], coordinates: [43, 5], scale: [80, 80]},
    {uv: %i[face_overlay], coordinates: [38, 0], scale: [90,90]},
    {uv: %i[face_right], coordinates: [203, 5], scale: [80, 80]},
    {uv: %i[face_overlay_right], coordinates: [198, 0], scale: [90,90]},
    {uv: %i[face_back], coordinates: [363, 5], scale: [80, 80]},
    {uv: %i[face_overlay_back], coordinates: [358, 0], scale: [90,90]},
    {uv: %i[face_left], coordinates: [523, 5], scale: [80, 80]},
    {uv: %i[face_overlay_left], coordinates: [518, 0], scale: [90,90]},
  ]

  FRONTBACK_MODEL_TO_UV = {
    classic: [UV_FRONTBACK_CLASSIC, UVMAP_CLASSIC],
    slim: [UV_FRONTBACK_SLIM, UVMAP_SLIM]
  }

  ALL_SIDES_MODEL_TO_UV = {
    classic: [UV_ALL_SIDES_CLASSIC, UVMAP_CLASSIC],
    slim: [UV_ALL_SIDES_SLIM, UVMAP_SLIM]
  }

  def map_to_image(src, uv, uvmap, size: [36, 32], scale: 1)
    size = size.first(2)
    img = ChunkyPNG::Image.new(*size, ChunkyPNG::Color::TRANSPARENT)
    uv.each do |data|
      data[:uv].each do |id|
        crop = src.crop(*uvmap[id])

        if part_scale = data[:scale]
          sx, sy = part_scale
          crop.resample_nearest_neighbor!((sx).round, (sy).round)
        end
        
        img.compose!(crop, *data[:coordinates])
      end
    end
    img.resample_nearest_neighbor!(*size.map { |n| n * scale }) if scale > 1
    img
  end
end
