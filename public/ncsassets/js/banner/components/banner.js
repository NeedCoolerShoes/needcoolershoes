import { createWithClasses } from "../util.js"
import { VERSIONS } from "./data.js"

class NCRSBanner {
  constructor(versionId) {
    const version = VERSIONS.find(element => element.id == versionId) || VERSIONS.at(-1)

    this.colors = version.colors;
    this.patterns = version.patterns;
  }

  static validVersions(str) {
    let output = [];

    VERSIONS.forEach(version => {
      const model = new NCRSBanner(version.id);

      console.log(model.colors);
      console.log(model.patterns);

      if (model.validate(str)) { output.push(version); }
    })

    console.log(output);

    return output;
  }

  fromEncoding(str) {
    const colorCode = str[0]
    const patternCode = str[1]
    const color = this.colors.find(color => color.encode == colorCode)
    const pattern = this.patterns.find(pattern => pattern.encode == patternCode)
    return {color: color, pattern: pattern}
  }

  parse(str) {
    const params = str.match(/.{1,2}/g)
    if (!params) { return }
    return params.map(code => { return this.fromEncoding(code) })
  }

  validate(str) {
    const params = str.match(/.{1,2}/g);
    if (!params) { return false; }

    let valid = true;
    let firstLoop = true;

    params.map(code => {
      const colorCode = code[0];
      const patternCode = code[1];

      if (!this.colors.find(color => color.encode == colorCode)) { valid = false; }
      console.log(valid);

      // Ignore pattern "a" in first section
      if (firstLoop) {
        firstLoop = false;

        if (patternCode == "a") { return; }
      }
      if (!this.patterns.find(pattern => pattern.encode == patternCode)) { valid = false; }
    })

    return valid;
  }
}

const BANNER_MODEL = new NCRSBanner("1_21");

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
  constructor(color = "#1d1d21") {
    super()
    if (!this.getAttribute("selected")) {
      this.setAttribute("selected", color)
    }
    this._setupDom(this.getAttribute("selected"))
  }

  _setupDom(selected) {
    BANNER_MODEL.colors.forEach(color => {
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
    BANNER_MODEL.patterns.forEach(pattern => {
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
      const data = BANNER_MODEL.fromEncoding(params[i])
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