const COLORS_1_8 = [
  {title: "Black", code: "0", color: "#1d1d21", encode:"a"},
  {title: "Dark Gray", code: "8", color: "#474f52", encode:"i"},
  {title: "Gray", code: "7", color: "#9d9d97", encode:"h"},
  {title: "White", code: "15", color: "#f9fffe", encode:"p"},
  {title: "Pink", code: "9", color: "#f38baa", encode:"j"},
  {title: "Magenta", code: "13", color: "#c74ebd", encode:"n"},
  {title: "Purple", code: "5", color: "#8932b8", encode:"f"},
  {title: "Blue", code: "4", color: "#3c44aa", encode:"e"},
  {title: "Cyan", code: "6", color: "#169c9c", encode:"g"},
  {title: "Light Blue", code: "12", color: "#3ab3da", encode:"m"},
  {title: "Green", code: "2", color: "#5e7c16", encode:"c"},
  {title: "Lime", code: "10", color: "#80c71f", encode:"k"},
  {title: "Yellow", code: "11", color: "#fed83d", encode:"l"},
  {title: "Orange", code: "14", color: "#f9801d", encode:"o"},
  {title: "Brown", code: "3", color: "#835432", encode:"d"},
  {title: "Red", code: "1", color: "#b02e26", encode:"b"}
]

const COLORS_1_13 = [
  {title: "Black", code: "15", color: "#1d1d21", encode:"a"},
  {title: "Dark Gray", code: "7", color: "#474f52", encode:"i"},
  {title: "Gray", code: "8", color: "#9d9d97", encode:"h"},
  {title: "White", code: "0", color: "#f9fffe", encode:"p"},
  {title: "Pink", code: "6", color: "#f38baa", encode:"j"},
  {title: "Magenta", code: "2", color: "#c74ebd", encode:"n"},
  {title: "Purple", code: "10", color: "#8932b8", encode:"f"},
  {title: "Blue", code: "11", color: "#3c44aa", encode:"e"},
  {title: "Cyan", code: "9", color: "#169c9c", encode:"g"},
  {title: "Light Blue", code: "3", color: "#3ab3da", encode:"m"},
  {title: "Green", code: "13", color: "#5e7c16", encode:"c"},
  {title: "Lime", code: "5", color: "#80c71f", encode:"k"},
  {title: "Yellow", code: "4", color: "#fed83d", encode:"l"},
  {title: "Orange", code: "1", color: "#f9801d", encode:"o"},
  {title: "Brown", code: "12", color: "#835432", encode:"d"},
  {title: "Red", code: "14", color: "#b02e26", encode:"b"}
]

const COLORS_1_21 = [
  {title: "Black", code: "black", color: "#1d1d21", encode:"a"},
  {title: "Dark Gray", code: "gray", color: "#474f52", encode:"i"},
  {title: "Gray", code: "light_gray", color: "#9d9d97", encode:"h"},
  {title: "White", code: "white", color: "#f9fffe", encode:"p"},
  {title: "Pink", code: "pink", color: "#f38baa", encode:"j"},
  {title: "Magenta", code: "magenta", color: "#c74ebd", encode:"n"},
  {title: "Purple", code: "purple", color: "#8932b8", encode:"f"},
  {title: "Blue", code: "blue", color: "#3c44aa", encode:"e"},
  {title: "Cyan", code: "cyan", color: "#169c9c", encode:"g"},
  {title: "Light Blue", code: "light_blue", color: "#3ab3da", encode:"m"},
  {title: "Green", code: "green", color: "#5e7c16", encode:"c"},
  {title: "Lime", code: "lime", color: "#80c71f", encode:"k"},
  {title: "Yellow", code: "yellow", color: "#fed83d", encode:"l"},
  {title: "Orange", code: "orange", color: "#f9801d", encode:"o"},
  {title: "Brown", code: "brown", color: "#835432", encode:"d"},
  {title: "Red", code: "red", color: "#b02e26", encode:"b"}
]

const PATTERNS_1_8 = [
  {title: "Base", code: "bs", sprite: 5, encode: "f"},
  {title: "Chief", code: "ts", sprite: 30, encode: "E"},
  {title: "Pale Dexter", code: "ls", sprite: 18, encode: "s"},
  {title: "Pale Sinister", code: "rs", sprite: 24, encode: "y"},
  {title: "Pale", code: "cs", sprite: 11, encode: "l"},
  {title: "Fess", code: "ms", sprite: 22, encode: "w"},
  {title: "Bend", code: "drs", sprite: 13, encode: "n"},
  {title: "Bend Sinister", code: "dls", sprite: 12, encode: "m"},
  {title: "Paly", code: "ss", sprite: 27, encode: "B"},
  {title: "Saltire", code: "cr", sprite: 9, encode: "j"},
  {title: "Cross", code: "sc", sprite: 25, encode: "z"},
  {title: "Per Bend Sinister", code: "ld", sprite: 17, encode: "r"},
  {title: "Per Bend", code: "rud", sprite: 23, encode: "J"},
  {title: "Per Bend Inverted", code: "lud", sprite: 37, encode: "I"},
  {title: "Per Bend Sinister Inverted", code: "rd", sprite: 38, encode: "x"},
  {title: "Per Pale", code: "vh", sprite: 33, encode: "H"},
  {title: "Per Pale Inverted", code: "vhr", sprite: 35, encode: "M"},
  {title: "Per Fess", code: "hh", sprite: 16, encode: "q"},
  {title: "Per Fess Inverted", code: "hhb", sprite: 36, encode: "L"},
  {title: "Base Dexter Canton", code: "bl", sprite: 1, encode: "b"},
  {title: "Base Sinister Canton", code: "br", sprite: 3, encode: "d"},
  {title: "Chief Dexter Canton", code: "tl", sprite: 28, encode: "C"},
  {title: "Chief Sinister Canton", code: "tr", sprite: 29, encode: "D"},
  {title: "Chevron", code: "bt", sprite: 6, encode: "g"},
  {title: "Inverted Chevron", code: "tt", sprite: 31, encode: "F"},
  {title: "Base Indented", code: "bts", sprite: 7, encode: "h"},
  {title: "Chief Indented", code: "tts", sprite: 32, encode: "G"},
  {title: "Roundel", code: "mc", sprite: 19, encode: "t"},
  {title: "Lozenge", code: "mr", sprite: 21, encode: "v"},
  {title: "Bordure", code: "bo", sprite: 2, encode: "c"},
  {title: "Bordure Indented", code: "cbo", sprite: 8, encode: "i"},
  {title: "Field Masoned", code: "bri", sprite: 4, encode: "e"},
  {title: "Gradient", code: "gra", sprite: 15, encode: "p"},
  {title: "Base Gradient", code: "gru", sprite: 34, encode: "K"},
  {title: "Creeper Charge", code: "cre", sprite: 10, encode: "k"},
  {title: "Skull Charge", code: "sku", sprite: 26, encode: "A"},
  {title: "Flower Charge", code: "flo", sprite: 14, encode: "o"},
  {title: "Thing", code: "moj", sprite: 20, encode: "u"},
]

const PATTERNS_1_16 = [
  {title: "Base", code: "bs", sprite: 5, encode: "f"},
  {title: "Chief", code: "ts", sprite: 30, encode: "E"},
  {title: "Pale Dexter", code: "ls", sprite: 18, encode: "s"},
  {title: "Pale Sinister", code: "rs", sprite: 24, encode: "y"},
  {title: "Pale", code: "cs", sprite: 11, encode: "l"},
  {title: "Fess", code: "ms", sprite: 22, encode: "w"},
  {title: "Bend", code: "drs", sprite: 13, encode: "n"},
  {title: "Bend Sinister", code: "dls", sprite: 12, encode: "m"},
  {title: "Paly", code: "ss", sprite: 27, encode: "B"},
  {title: "Saltire", code: "cr", sprite: 9, encode: "j"},
  {title: "Cross", code: "sc", sprite: 25, encode: "z"},
  {title: "Per Bend Sinister", code: "ld", sprite: 17, encode: "r"},
  {title: "Per Bend", code: "rud", sprite: 23, encode: "J"},
  {title: "Per Bend Inverted", code: "lud", sprite: 37, encode: "I"},
  {title: "Per Bend Sinister Inverted", code: "rd", sprite: 38, encode: "x"},
  {title: "Per Pale", code: "vh", sprite: 33, encode: "H"},
  {title: "Per Pale Inverted", code: "vhr", sprite: 35, encode: "M"},
  {title: "Per Fess", code: "hh", sprite: 16, encode: "q"},
  {title: "Per Fess Inverted", code: "hhb", sprite: 36, encode: "L"},
  {title: "Base Dexter Canton", code: "bl", sprite: 1, encode: "b"},
  {title: "Base Sinister Canton", code: "br", sprite: 3, encode: "d"},
  {title: "Chief Dexter Canton", code: "tl", sprite: 28, encode: "C"},
  {title: "Chief Sinister Canton", code: "tr", sprite: 29, encode: "D"},
  {title: "Chevron", code: "bt", sprite: 6, encode: "g"},
  {title: "Inverted Chevron", code: "tt", sprite: 31, encode: "F"},
  {title: "Base Indented", code: "bts", sprite: 7, encode: "h"},
  {title: "Chief Indented", code: "tts", sprite: 32, encode: "G"},
  {title: "Roundel", code: "mc", sprite: 19, encode: "t"},
  {title: "Lozenge", code: "mr", sprite: 21, encode: "v"},
  {title: "Bordure", code: "bo", sprite: 2, encode: "c"},
  {title: "Bordure Indented", code: "cbo", sprite: 8, encode: "i"},
  {title: "Field Masoned", code: "bri", sprite: 4, encode: "e"},
  {title: "Gradient", code: "gra", sprite: 15, encode: "p"},
  {title: "Base Gradient", code: "gru", sprite: 34, encode: "K"},
  {title: "Creeper Charge", code: "cre", sprite: 10, encode: "k"},
  {title: "Skull Charge", code: "sku", sprite: 26, encode: "A"},
  {title: "Flower Charge", code: "flo", sprite: 14, encode: "o"},
  {title: "Thing", code: "moj", sprite: 20, encode: "u"},
  {title: "Globe", code: "glb", sprite: 39, encode: "N"},
  {title: "Snout", code: "pig", sprite: 40, encode: "O"},
]

const PATTERNS_1_21 = [
  {title: "Base", code: "minecraft:stripe_bottom", sprite: 5, encode: "f"},
  {title: "Chief", code: "minecraft:stripe_top", sprite: 30, encode: "E"},
  {title: "Pale Dexter", code: "minecraft:stripe_left", sprite: 18, encode: "s"},
  {title: "Pale Sinister", code: "minecraft:stripe_right", sprite: 24, encode: "y"},
  {title: "Pale", code: "minecraft:stripe_center", sprite: 11, encode: "l"},
  {title: "Fess", code: "minecraft:stripe_middle", sprite: 22, encode: "w"},
  {title: "Bend", code: "minecraft:stripe_downright", sprite: 13, encode: "n"},
  {title: "Bend Sinister", code: "minecraft:stripe_downleft", sprite: 12, encode: "m"},
  {title: "Paly", code: "minecraft:small_stripes", sprite: 27, encode: "B"},
  {title: "Saltire", code: "minecraft:cross", sprite: 9, encode: "j"},
  {title: "Cross", code: "minecraft:straight_cross", sprite: 25, encode: "z"},
  {title: "Per Bend Sinister", code: "minecraft:diagonal_left", sprite: 17, encode: "r"},
  {title: "Per Bend", code: "minecraft:diagonal_right", sprite: 23, encode: "J"},
  {title: "Per Bend Inverted", code: "minecraft:diagonal_up_left", sprite: 37, encode: "I"},
  {title: "Per Bend Sinister Inverted", code: "minecraft:diagonal_up_right", sprite: 38, encode: "x"},
  {title: "Per Pale", code: "minecraft:half_vertical", sprite: 33, encode: "H"},
  {title: "Per Pale Inverted", code: "minecraft:half_vertical_right", sprite: 35, encode: "M"},
  {title: "Per Fess", code: "minecraft:half_horizontal", sprite: 16, encode: "q"},
  {title: "Per Fess Inverted", code: "minecraft:half_horizontal_bottom", sprite: 36, encode: "L"},
  {title: "Base Dexter Canton", code: "minecraft:square_bottom_left", sprite: 1, encode: "b"},
  {title: "Base Sinister Canton", code: "minecraft:square_bottom_right", sprite: 3, encode: "d"},
  {title: "Chief Dexter Canton", code: "minecraft:square_top_left", sprite: 28, encode: "C"},
  {title: "Chief Sinister Canton", code: "minecraft:square_top_right", sprite: 29, encode: "D"},
  {title: "Chevron", code: "minecraft:triangle_bottom", sprite: 6, encode: "g"},
  {title: "Inverted Chevron", code: "minecraft:triangle_top", sprite: 31, encode: "F"},
  {title: "Base Indented", code: "minecraft:triangles_bottom", sprite: 7, encode: "h"},
  {title: "Chief Indented", code: "minecraft:triangles_top", sprite: 32, encode: "G"},
  {title: "Roundel", code: "minecraft:circle", sprite: 19, encode: "t"},
  {title: "Lozenge", code: "minecraft:rhombus", sprite: 21, encode: "v"},
  {title: "Bordure", code: "minecraft:border", sprite: 2, encode: "c"},
  {title: "Bordure Indented", code: "minecraft:curly_border", sprite: 8, encode: "i"},
  {title: "Field Masoned", code: "minecraft:bricks", sprite: 4, encode: "e"},
  {title: "Gradient", code: "minecraft:gradient", sprite: 15, encode: "p"},
  {title: "Base Gradient", code: "minecraft:gradient_up", sprite: 34, encode: "K"},
  {title: "Creeper Charge", code: "minecraft:creeper", sprite: 10, encode: "k"},
  {title: "Skull Charge", code: "minecraft:skull", sprite: 26, encode: "A"},
  {title: "Flower Charge", code: "minecraft:flower", sprite: 14, encode: "o"},
  {title: "Thing", code: "minecraft:mojang", sprite: 20, encode: "u"},
  {title: "Globe", code: "minecraft:globe", sprite: 39, encode: "N"},
  {title: "Snout", code: "minecraft:piglin", sprite: 40, encode: "O"},
  {title: "Flow", code: "minecraft:flow", sprite: 41, encode: "P"},
  {title: "Guster", code: "minecraft:guster", sprite: 42, encode: "Q"},
]

const VERSIONS = [
  {id: "1_8", name: "1.8+", colors: COLORS_1_8, patterns: PATTERNS_1_8},
  {id: "1_13", name: "1.13+", colors: COLORS_1_13, patterns: PATTERNS_1_8},
  {id: "1_16", name: "1.16+", colors: COLORS_1_13, patterns: PATTERNS_1_16},
  {id: "1_21", name: "1.21+", colors: COLORS_1_21, patterns: PATTERNS_1_21},
]

export {VERSIONS};