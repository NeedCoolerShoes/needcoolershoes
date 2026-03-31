[
  [["the_button", "purple"], "Purple - The Button", "Badge obtained by pressing the button when the countdown was 25+ minutes.", "https://res.cloudinary.com/needcoolershoes/image/upload/v1774978245/the_button_purple_jhqcfz.png", 0],
  [["the_button", "blue"], "Blue - The Button", "Badge obtained by pressing the button when the countdown was between 20 and 24 minutes.", "https://res.cloudinary.com/needcoolershoes/image/upload/v1774978244/the_button_blue_kxjl5h.png", 0],
  [["the_button", "green"], "Green - The Button", "Badge obtained by pressing the button when the countdown was between 15 and 19 minutes.", "https://res.cloudinary.com/needcoolershoes/image/upload/v1774978244/the_button_green_ledmdx.png", 0],
  [["the_button", "yellow"], "Yellow - The Button", "Badge obtained by pressing the button when the countdown was between 10 and 14 minutes.", "https://res.cloudinary.com/needcoolershoes/image/upload/v1774978245/the_button_yellow_fh1xim.png", 0],
  [["the_button", "orange"], "Orange - The Button", "Badge obtained by pressing the button when the countdown was between 5 and 9 minutes.", "https://res.cloudinary.com/needcoolershoes/image/upload/v1774978244/the_button_orange_yzanah.png", 0],
  [["the_button", "red"], "Red - The Button", "Badge obtained by pressing the button when the countdown was between 0 and 4 minutes.", "https://res.cloudinary.com/needcoolershoes/image/upload/v1774978244/the_button_red_eourxo.png", 0],
].each do |record|
  tags = record[0]

  badge = Badge.with_tag(tags).first

  if badge.present?
    badge.update(name: record[1], description: record[2], url: record[3], karma: record[4])
  else
    Badge.create(name: record[1], description: record[2], url: record[3], karma: record[4], tags: tags)
  end
end