import { BaseComponent } from "../lib/components.js"
import { NCRSBanner, NCRSBannerPattern } from "./banner.js"

class NCRSBannerCommandGenerator {
  static modes = ["give", "setblock"]
  static validMode(mode) {return this.modes.includes(mode)}

  static generate(mode, bannerData) {
    if (!this.validMode(mode)) { return "" }
    if (bannerData.length < 2) { return "" }
    const instance = new this
    const data = [...bannerData]
    switch (mode) {
      case "give": return instance._generateGiveCommand(data)
      case "setblock": return instance._generateSetblockCommand(data)
    }
  }

  _patternsJSON(patterns) {
    return JSON.stringify(patterns.map(data => {
      return {pattern: data.pattern.code, color: data.color.code}
    }))
  }

  _generateGiveCommand(bannerData) {
    const base = bannerData.shift()
    let command = "give @s minecraft:"
    command += base.color.code + "_banner[banner_patterns="
    command += this._patternsJSON(bannerData)
    return command + "]"
  }

  _generateSetblockCommand(bannerData) {
    const base = bannerData.shift()
    let command = "setblock ~ ~ ~ minecraft:"
    command += base.color.code + "_banner{patterns:"
    command += this._patternsJSON(bannerData)
    return command + "}"
  }
}

class NCRSBannerCommand extends HTMLElement {
  static observedAttributes = ["mode", "banner"]

  _bannerData = []
  _textArea

  constructor() {
    super()
    if (!this.getAttribute("mode")) {
      this.setAttribute("mode", "give")
    }
    this._setupDom()
  }

  _setupDom() {
    this._textArea = document.createElement("textarea")
    this._textArea.setAttribute("readonly", "")
    this._textArea.addEventListener("click", event => { event.target.select() })
    this.append(this._textArea)
  }


  attributeChangedCallback(name, _, newValue) {
    if (name == "mode") {
      if (!NCRSBannerCommandGenerator.validMode(newValue)) {
        return this.setAttribute("mode", "give")
      }
      this._renderCommand(newValue)
    } else if (name == "banner") {
      this._updateBannerData(newValue)
      this._renderCommand(this.getAttribute("mode"))
    }
  }

  _updateBannerData(codes) {
    const params = codes.match(/.{1,2}/g)
    if (!params) { return }
    this._bannerData = params.map(code => { return NCRSBanner.fromEncoding(code) })
  }

  _renderCommand(mode) {
    if (this._bannerData.length < 2) {
      this._textArea.value = ""
    } else {
      this._textArea.value = NCRSBannerCommandGenerator.generate(mode, this._bannerData)
    }
  }
}

class NCRSBannerInstructions extends BaseComponent {
  static {
    this.observe("banner")
  }

  constructor() {
    super()
  }

  _bannerData = []

  onBannerChanged(_, value) {
    this._bannerData = NCRSBanner.parse(value)
    if (!this._bannerData) { return }
    this._render()
  }

  _render() {
    console.log(this._bannerData)
    const base = this._renderBase(this._bannerData.shift())
    const layers = this._bannerData.map(layer => {
      return this._renderLayer(layer)
    })

    this.replaceChildren(base, ...layers)
  }

  _renderBase(data) {
    const preview = document.createElement('ncrs-banner-pattern-preview')
    preview.setAttribute('sprite', 0)
    preview.style.setProperty('--ncs-banner-color', data.color.color)
    preview.setAttribute('title', data.color.title + " Base")
    return preview
  }

  _renderLayer(data) {
    const preview = NCRSBannerPattern.deserialize(data.pattern)
    preview.style.setProperty('--ncs-banner-color', data.color.color)
    preview.setAttribute('title', data.color.title + " " + data.pattern.title)
    return preview
  }
}

window.customElements.define('ncrs-banner-command', NCRSBannerCommand)
window.customElements.define('ncrs-banner-instructions', NCRSBannerInstructions)