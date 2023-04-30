SKIN_CATEGORIES = [
  "Other", "Adventure", "Animal", "Anime", "Cartoons", "Comics", "Heroes", "Villains", "Mobs",
  "Holiday", "Objects", "Movies and TV", "Games", "History", "Fantasy", "Sci-Fi", "Horror"
]

SKIN_CATEGORIES.each do |category|
  next if SkinCategory.where(name: category).any?
  SkinCategory.create(name: category)
end