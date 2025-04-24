SKIN_PARTS = {
  "Full Skin": {ignore_skin_model: false, skin_upload_status: :manual_upload},
  "Base": {ignore_skin_model: false, skin_upload_status: :no_upload},
  "Face/Hair": {ignore_skin_model: true, skin_upload_status: :no_upload},
  "Hat/Helmet": {ignore_skin_model: true, skin_upload_status: :no_upload},
  "Shirt": {ignore_skin_model: false, skin_upload_status: :no_upload},
  "Jacket": {ignore_skin_model: false, skin_upload_status: :no_upload},
  "Pants": {ignore_skin_model: true, skin_upload_status: :no_upload},
  "Costume/Outfit": {ignore_skin_model: false, skin_upload_status: :no_upload},
  "Armor": {ignore_skin_model: false, skin_upload_status: :no_upload},
  "Accessory": {ignore_skin_model: true, skin_upload_status: :no_upload},
  "Shoes/Footwear": {ignore_skin_model: true, skin_upload_status: :no_upload},
  "Player Head Block": {ignore_skin_model: true, skin_upload_status: :automatic_upload},
}

SKIN_PARTS.each do |name, params|
  part = SkinPart.find_by_name(part)

  if part
    part.update(params)
  else
    SkinPart.create({name: name}.merge(params))
  end
end
