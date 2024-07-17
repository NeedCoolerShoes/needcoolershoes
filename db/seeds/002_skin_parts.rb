SKIN_PARTS = [
  "Full Skin", "Base", "Face/Hair", "Hat/Helmet", "Shirt", "Jacket", "Pants", "Costume/Outfit", "Armor", "Accessory", "Shoes/Footwear"
]

SKIN_PARTS.each do |part|
  next if SkinPart.where(name: part).any?
  SkinPart.create(name: part)
end
