import { createWithClasses } from "../util.js"

class NCRSBanner {
  static colors = [
    {title: "Black", code: "black", color: "#191919", encode:"a", legacy: {"1.8": 0, "1.13": 15}},
    {title: "Dark Gray", code: "gray", color: "#4c4c4c", encode:"i", legacy: {"1.8": 8, "1.13": 7}},
    {title: "Gray", code: "light_gray", color: "#999999", encode:"h", legacy: {"1.8": 7, "1.13": 8}},
    {title: "White", code: "white", color: "#ffffff", encode:"p", legacy: {"1.8": 15, "1.13": 0}},
    {title: "Pink", code: "pink", color: "#f27fa5", encode:"j", legacy: {"1.8": 9, "1.13": 6}},
    {title: "Magenta", code: "magenta", color: "#b24cd8", encode:"n", legacy: {"1.8": 13, "1.13": 2}},
    {title: "Purple", code: "purple", color: "#7f3fb2", encode:"f", legacy: {"1.8": 5, "1.13": 10}},
    {title: "Blue", code: "blue", color: "#334cb2", encode:"e", legacy: {"1.8": 4, "1.13": 11}},
    {title: "Cyan", code: "cyan", color: "#4c7f99", encode:"g", legacy: {"1.8": 6, "1.13": 9}},
    {title: "Light Blue", code: "light_blue", color: "#6699d8", encode:"m", legacy: {"1.8": 12, "1.13": 3}},
    {title: "Green", code: "green", color: "#667f33", encode:"c", legacy: {"1.8": 2, "1.13": 13}},
    {title: "Lime", code: "lime", color: "#7fcc19", encode:"k", legacy: {"1.8": 10, "1.13": 5}},
    {title: "Yellow", code: "yellow", color: "#e5e533", encode:"l", legacy: {"1.8": 11, "1.13": 4}},
    {title: "Orange", code: "orange", color: "#d87f33", encode:"o", legacy: {"1.8": 14, "1.13": 1}},
    {title: "Brown", code: "brown", color: "#664c33", encode:"d", legacy: {"1.8": 3, "1.13": 12}},
    {title: "Red", code: "red", color: "#993333", encode:"b", legacy: {"1.8": 1, "1.13": 14}}
  ]

  static patterns = [
    {title: "Base", code: "minecraft:stripe_bottom", sprite: 5, encode: "f", legacy: {"1.8": "bs"}},
    {title: "Chief", code: "minecraft:stripe_top", sprite: 30, encode: "E", legacy: {"1.8": "ts"}},
    {title: "Pale Dexter", code: "minecraft:stripe_left", sprite: 18, encode: "s", legacy: {"1.8": "ls"}},
    {title: "Pale Sinister", code: "minecraft:stripe_right", sprite: 24, encode: "y", legacy: {"1.8": "rs"}},
    {title: "Pale", code: "minecraft:stripe_center", sprite: 11, encode: "l", legacy: {"1.8": "cs"}},
    {title: "Fess", code: "minecraft:stripe_middle", sprite: 22, encode: "w", legacy: {"1.8": "ms"}},
    {title: "Bend", code: "minecraft:stripe_downright", sprite: 13, encode: "n", legacy: {"1.8": "drs"}},
    {title: "Bend Sinister", code: "minecraft:stripe_downleft", sprite: 12, encode: "m", legacy: {"1.8": "dls"}},
    {title: "Paly", code: "minecraft:small_stripes", sprite: 27, encode: "B", legacy: {"1.8": "ss"}},
    {title: "Saltire", code: "minecraft:cross", sprite: 9, encode: "j", legacy: {"1.8": "cr"}},
    {title: "Cross", code: "minecraft:straight_cross", sprite: 25, encode: "z", legacy: {"1.8": "sc"}},
    {title: "Per Bend Sinister", code: "minecraft:diagonal_left", sprite: 17, encode: "r", legacy: {"1.8": "ld"}},
    {title: "Per Bend", code: "minecraft:diagonal_right", sprite: 23, encode: "J", legacy: {"1.8": "rud"}},
    {title: "Per Bend Inverted", code: "minecraft:diagonal_up_left", sprite: 37, encode: "I", legacy: {"1.8": "lud"}},
    {title: "Per Bend Sinister Inverted", code: "minecraft:diagonal_up_right", sprite: 38, encode: "x", legacy: {"1.8": "rd"}},
    {title: "Per Pale", code: "minecraft:half_vertical", sprite: 33, encode: "H", legacy: {"1.8": "vh"}},
    {title: "Per Pale Inverted", code: "minecraft:half_vertical_right", sprite: 35, encode: "M", legacy: {"1.8": "vhr"}},
    {title: "Per Fess", code: "minecraft:half_horizontal", sprite: 16, encode: "q", legacy: {"1.8": "hh"}},
    {title: "Per Fess Inverted", code: "minecraft:half_horizontal_bottom", sprite: 36, encode: "L", legacy: {"1.8": "hhb"}},
    {title: "Base Dexter Canton", code: "minecraft:square_bottom_left", sprite: 1, encode: "b", legacy: {"1.8": "bl"}},
    {title: "Base Sinister Canton", code: "minecraft:square_bottom_right", sprite: 3, encode: "d", legacy: {"1.8": "br"}},
    {title: "Chief Dexter Canton", code: "minecraft:square_top_left", sprite: 28, encode: "C", legacy: {"1.8": "tl"}},
    {title: "Chief Sinister Canton", code: "minecraft:square_top_right", sprite: 29, encode: "D", legacy: {"1.8": "tr"}},
    {title: "Chevron", code: "minecraft:triangle_bottom", sprite: 6, encode: "g", legacy: {"1.8": "bt"}},
    {title: "Inverted Chevron", code: "minecraft:triangle_top", sprite: 31, encode: "F", legacy: {"1.8": "tt"}},
    {title: "Base Indented", code: "minecraft:triangles_bottom", sprite: 7, encode: "h", legacy: {"1.8": "bts"}},
    {title: "Chief Indented", code: "minecraft:triangles_top", sprite: 32, encode: "G", legacy: {"1.8": "tts"}},
    {title: "Roundel", code: "minecraft:circle", sprite: 19, encode: "t", legacy: {"1.8": "mc"}},
    {title: "Lozenge", code: "minecraft:rhombus", sprite: 21, encode: "v", legacy: {"1.8": "mr"}},
    {title: "Bordure", code: "minecraft:border", sprite: 2, encode: "c", legacy: {"1.8": "bo"}},
    {title: "Bordure Indented", code: "minecraft:curly_border", sprite: 8, encode: "i", legacy: {"1.8": "cbo"}},
    {title: "Field Masoned", code: "minecraft:bricks", sprite: 4, encode: "e", legacy: {"1.8": "bri"}},
    {title: "Gradient", code: "minecraft:gradient", sprite: 15, encode: "p", legacy: {"1.8": "gra"}},
    {title: "Base Gradient", code: "minecraft:gradient_up", sprite: 34, encode: "K", legacy: {"1.8": "gru"}},
    {title: "Creeper Charge", code: "minecraft:creeper", sprite: 10, encode: "k", legacy: {"1.8": "cre"}},
    {title: "Skull Charge", code: "minecraft:skull", sprite: 26, encode: "A", legacy: {"1.8": "sku"}},
    {title: "Flower Charge", code: "minecraft:flower", sprite: 14, encode: "o", legacy: {"1.8": "flo"}},
    {title: "Thing", code: "minecraft:mojang", sprite: 20, encode: "u", legacy: {"1.8": "moj"}},
    {title: "Globe", code: "minecraft:globe", sprite: 39, encode: "N", legacy: {"1.16": "glb"}},
    {title: "Snout", code: "minecraft:piglin", sprite: 40, encode: "O", legacy: {"1.16": "pig"}},
    {title: "Flow", code: "minecraft:flow", sprite: 41, encode: "P", legacy: {"1.21-br": "flw"}},
    {title: "Guster", code: "minecraft:guster", sprite: 42, encode: "Q", legacy: {"1.21-br": "gus"}},
  ]

  static fromEncoding(str) {
    const colorCode = str[0]
    const patternCode = str[1]
    const color = this.colors.find(color => color.encode == colorCode)
    const pattern = this.patterns.find(pattern => pattern.encode == patternCode)
    return {color: color, pattern: pattern}
  }

  static parse(str) {
    const params = str.match(/.{1,2}/g)
    if (!params) { return }
    return params.map(code => { return this.fromEncoding(code) })
  }
}

class NCRSBannerPatternSet extends HTMLElement {
  static observedAttributes = ["color"]
  constructor() {
    super()
  }

  #selectedColor

  selectColorByValue(value) {
    let query = `ncrs-banner-color[color="${value}"]`
    const color = this.querySelector(query)
    if (!color) { return false }
    if (this.#selectedColor == color) { return true }
    color.setAttribute("selected", true)
    return true
  }

  selectColor(newColor) {
    if (this.getAttribute("color") == newColor) { return }
    this.#selectedColor = newColor
    this.setAttribute("color", newColor.getAttribute("color"))
    this.style.setProperty("--ncs-banner-color", this.getAttribute("color"))
    this.querySelectorAll("ncrs-banner-color").forEach(color => {
      if (color == newColor) { return }
      color.removeAttribute("selected")
    })
    this.dispatchEvent(
      new CustomEvent("select-color", {detail: newColor.serialize()})
    )
  }

  selectPattern(pattern) {
    let detail = {pattern: pattern.serialize()}
    if (this.#selectedColor) {
      detail.color = this.#selectedColor.serialize()
    }

    this.dispatchEvent(
      new CustomEvent("select-pattern", {detail: detail})
    )
  }

  showPreview(pattern) {
    let detail = {pattern: pattern.serialize()}
    if (this.#selectedColor) {
      detail.color = this.#selectedColor.serialize()
    }

    this.dispatchEvent(
      new CustomEvent("update-preview", {detail: detail})
    )
  }

  hidePreview() {
    this.dispatchEvent(
      new CustomEvent("update-preview", {detail: undefined})
    )
  }

  attributeChangedCallback(name, _, newValue) {
    if (name == "color") {
      this.selectColorByValue(newValue)
    }
  }
}

class NCRSBannerColor extends HTMLElement {
  static observedAttributes = ["color", "selected"];

  constructor() {
    super()
  }

  static deserialize(details) {
    if (!details) { return }
    const instance = new NCRSBannerColor
    instance.setAttribute("color", details.color)
    instance.setAttribute("code", details.code)
    instance.setAttribute("encode", details.encode)
    instance.setAttribute("title", details.title)
    return instance
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      this.setAttribute("selected", true)
    })
    if (!this.getAttribute("is")) {
      this.setAttribute("is", "ncrs-banner-color")
    }
    if (this.getAttribute("selected")) {
      this._select()
    }
  }

  attributeChangedCallback(name, _, newValue) {
    if (name == "color") {
      this.style.backgroundColor = newValue
    }
    if (name == "selected" && newValue) {
      this._select()
    }
  }

  _select() {
    const parent = this.closest("ncrs-banner-patternset")
    if (!parent) { return }
    parent.selectColor(this)
  }

  serialize() {
    return {
      color: this.getAttribute("color"),
      code: this.getAttribute("code"),
      encode: this.getAttribute("encode"),
      title: this.getAttribute("title"),
    }
  }
}

class NCRSBannerPatternPreview extends HTMLElement {
  static observedAttributes = ["sprite"];
  constructor() {
    super()
  }

  attributeChangedCallback(name, _, newValue) {
    if (name == "sprite") {
      this._updateMask(Number(newValue))
    }
  }

  _updateMask(sprite) {
    const bannerInfo = {
      width: 100,
      x: 20,
      y: 40
    }

    const columns = bannerInfo.width / bannerInfo.x;
    const spriteX = (sprite % columns) * -bannerInfo.x;
    const spriteY = Math.floor(sprite / columns) * -bannerInfo.y;

    this.style.setProperty("--ncs-mask-x", spriteX + "px")
    this.style.setProperty("--ncs-mask-y", spriteY + "px")
  }
}

class NCRSBannerPattern extends HTMLElement {
  static observedAttributes = ["sprite"];
  constructor() {
    super()
    this.overlayElement = document.createElement("ncrs-banner-pattern-preview")
    this.append(this.overlayElement)
  }

  static deserialize(details) {
    if (!details) { return }
    const instance = new NCRSBannerPattern
    instance.setAttribute("sprite", details.sprite)
    instance.setAttribute("code", details.code)
    instance.setAttribute("encode", details.encode)
    instance.setAttribute("title", details.title)
    return instance
  }

  overlayElement;

  connectedCallback() {
    if (!this.getAttribute("is")) {
      this.setAttribute("is", "ncrs-banner-pattern")
    }

    this.addEventListener("click", () => {
      const parent = this.closest("ncrs-banner-patternset")
      if (parent) {
        parent.selectPattern(this)
      }
    })

    this.addEventListener("mouseenter", () => {
      const parent = this.closest("ncrs-banner-patternset")
      if (parent) {
        parent.showPreview(this)
      }
    })

    this.addEventListener("mouseleave", () => {
      const parent = this.closest("ncrs-banner-patternset")
      if (parent) {
        parent.hidePreview()
      }
    })
  }

  attributeChangedCallback(name, _, newValue) {
    if (name == "sprite") {
      this.overlayElement.setAttribute("sprite", newValue)
    }
  }

  serialize() {
    return {
      sprite: this.getAttribute("sprite"),
      code: this.getAttribute("code"),
      encode: this.getAttribute("encode"),
      title: this.getAttribute("title")
    }
  }
}

class NCRSBannerLayer extends HTMLElement {
  static id = 0;

  constructor() {
    super()
  }

  color
  pattern

  static deserialize(details) {
    const instance = new NCRSBannerLayer
    instance._setupAttributes(details)
    instance._setupDom(details)
    instance.color = details.color
    instance.pattern = details.pattern
    return instance
  }

  _setupDom(details) {
    const patternSet = new NCRSBannerPatternSet()
    const layerColor = createWithClasses("div", "layer-color")
    const container = createWithClasses("div", "layer-container")
    const visibilityToggle = createWithClasses("button", "layer-toggle")
    const previewButton = document.createElement("button")
    const previewInner = new NCRSBannerPatternPreview()

    const selector = createWithClasses("div", "layer-selector")
    const selectorColors = new NCRSBannerColorList(details.color.color)
    const selectorLayers = new NCRSBannerPatternList()
    selector.append(selectorColors)
    selector.append(selectorLayers)
    previewButton.append(selector)
    previewInner.setAttribute("sprite", details.pattern.sprite)
    previewButton.classList.add("pattern-preview")
    previewButton.append(previewInner)

    const spacer = createWithClasses("div", "layer-spacer")
    const moveContainer = createWithClasses("div", "layer-move")
    const moveUp = createWithClasses("button", "layer-move-up")
    const moveDown = createWithClasses("button", "layer-move-down")
    const handle = createWithClasses("div", "layer-handle")
    const removeButton = createWithClasses("button", "layer-remove")

    moveContainer.append(moveUp)
    moveContainer.append(moveDown)

    container.append(visibilityToggle)
    container.append(previewButton)
    container.append(spacer)
    container.append(moveContainer)
    container.append(handle)
    container.append(removeButton)

    patternSet.append(layerColor)
    patternSet.append(container)
    this.append(patternSet)

    removeButton.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("remove-layer", {detail: this}))
    })

    moveUp.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("move-layer", {detail: {direction: -1, layer: this}}))
    })

    moveDown.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("move-layer", {detail: {direction: 1, layer: this}}))
    })

    visibilityToggle.addEventListener("click", () => {
      if (this.hasAttribute("hidden")) {
        this.removeAttribute("hidden")
      } else {
        this.setAttribute("hidden", "")
      }
      this.dispatchEvent(new CustomEvent("update-layer", {detail: this}))
    })

    patternSet.addEventListener("select-pattern", event => {
      previewInner.setAttribute("sprite", event.detail.pattern.sprite)
      this.pattern = event.detail.pattern
      this.color = event.detail.color
      this.setAttribute("sprite", event.detail.pattern.sprite)
      this.dispatchEvent(new CustomEvent("select-pattern", {detail: event.detail}))
      this.dispatchEvent(new CustomEvent("update-layer", {detail: this}))
    })

    patternSet.addEventListener("select-color", event => {
      this.setAttribute("color", event.detail.color)
      this.color = event.detail
      this.dispatchEvent(new CustomEvent("select-color", {detail: event.detail}))
      this.dispatchEvent(new CustomEvent("update-layer", {detail: this}))
    })
  }

  _setupAttributes(details) {
    this.setAttribute("id", "layer-" + (NCRSBannerLayer.id += 1))
    this.setAttribute("sprite", details.pattern.sprite)
    this.setAttribute("color", details.color.color)
  }
}

class NCRSBannerColorList extends HTMLElement {
  constructor(color = "#191919") {
    super()
    if (!this.getAttribute("selected")) {
      this.setAttribute("selected", color)
    }
    this._setupDom(this.getAttribute("selected"))
  }

  _setupDom(selected) {
    NCRSBanner.colors.forEach(color => {
      const colorInstance = NCRSBannerColor.deserialize(color)
      this.append(colorInstance)
      if (color.color == selected) {
        colorInstance.setAttribute("selected", true)
      }
    })
  }
}

class NCRSBannerPatternList extends HTMLElement {
  constructor() {
    super()
    this._setupDom()
  }

  _setupDom() {
    NCRSBanner.patterns.forEach(pattern => {
      this.append(NCRSBannerPattern.deserialize(pattern))
    })
  }
}

class NCRSBannerPreview extends HTMLElement {
  static observedAttributes = ["banner"];

  constructor() {
    super()
  }
  
  connectedCallback() {    
    if (!this.getAttribute("banner")) {
      this.setAttribute("banner", "pa")
    }
  }

  attributeChangedCallback(name, _, newValue) {
    if (name == "banner") {
      this._render(newValue)
    }
  }

  _createBase(color) {
    const base = createWithClasses("div", "preview-base")
    base.style.setProperty("--ncs-banner-color", color)
    return base
  }

  _createLayer(sprite, color) {
    const layer = new NCRSBannerPatternPreview()
    layer.setAttribute("sprite", sprite)
    layer.style.setProperty("--ncs-banner-color", color)
    return layer
  }

  _render(encodedString) {
    const params = encodedString.match(/.{1,2}/g)
    if (!params) { return }
    const children = []
    for (let i = 0; i < params.length; i++) {
      const data = NCRSBanner.fromEncoding(params[i])
      if (i == 0) {
        children.push(this._createBase(data.color.color))
      } else {
        children.push(this._createLayer(data.pattern.sprite, data.color.color))
      }
    }
    this.replaceChildren(...children)
  }
}

window.customElements.define('ncrs-banner-patternset', NCRSBannerPatternSet)
window.customElements.define('ncrs-banner-color', NCRSBannerColor)
window.customElements.define('ncrs-banner-pattern', NCRSBannerPattern)
window.customElements.define('ncrs-banner-pattern-preview', NCRSBannerPatternPreview)
window.customElements.define('ncrs-banner-layer', NCRSBannerLayer)
window.customElements.define('ncrs-banner-preview', NCRSBannerPreview)

window.customElements.define('ncrs-banner-color-list', NCRSBannerColorList)
window.customElements.define('ncrs-banner-pattern-list', NCRSBannerPatternList)


export {NCRSBanner, NCRSBannerColor, NCRSBannerPattern, NCRSBannerLayer, NCRSBannerPatternPreview, NCRSBannerPreview}