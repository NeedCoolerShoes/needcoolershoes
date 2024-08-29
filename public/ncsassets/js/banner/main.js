import {NCRSBanner, NCRSBannerLayer, NCRSBannerPreview} from './components/banner.js'
import './components/commands.js'
import './components/misc.js'
import { createWithClasses } from './util.js';

const state = {
  urlCode: "",
  additionalURL: [],
  bannerData: {base: "white", baseCode: "p", patterns: []},
  loaded: false
}

const layerPicker = document.getElementById("layer-picker")
const layerList = document.getElementById("layers")
const layerPreview = document.getElementById("preview")

function createLayer(detail) {
  const layer = NCRSBannerLayer.deserialize(detail)
  layer.addEventListener("select-color", updateState)
  layer.addEventListener("select-pattern", updateState)
  layer.addEventListener("update-layer", updateState)
  layer.addEventListener("move-layer", event => { moveLayer(event.detail.layer.id, event.detail.direction) })
  layer.addEventListener("remove-layer", event => {
    const layer = document.getElementById(event.detail.id)
    layer.parentElement.remove()
    updateState()
  })
  return layer
}

function addLayerToList(layer) {
  const li = document.createElement("li")
  li.append(layer)
  layerList.append(li)
}

layerPicker.addEventListener("select-pattern", event => {
  const layer = createLayer(event.detail)
  addLayerToList(layer)
  updateState()
})

const overlayPreview = document.getElementById("preview-overlay")
layerPicker.addEventListener("update-preview", event => {
  if (event.detail) {
    overlayPreview.setAttribute("sprite", event.detail.pattern.sprite)
    overlayPreview.style.setProperty("--ncs-banner-color", event.detail.color.color)
    overlayPreview.style.setProperty("display", "block")
  } else {
    overlayPreview.style.setProperty("display", "none")
  }
})

const basePattern = document.getElementById("base-pattern")
basePattern.addEventListener("select-color", event => {
  state.bannerData.base = event.detail.code
  state.bannerData.baseCode = event.detail.encode
  updateState()
})

function updateState() {
  state.urlCode = state.bannerData.baseCode + "a"
  state.bannerData.patterns = []
  const children = layerList.children
  for (let i = 0; i < children.length; i++) {
    const layer = children[i]
    const bannerLayer = layer.querySelector("ncrs-banner-layer")
    if (bannerLayer.hasAttribute("hidden")) { continue }
    state.urlCode += (bannerLayer.color.encode + bannerLayer.pattern.encode)
    state.bannerData.patterns.push({pattern: bannerLayer.pattern.code, color: bannerLayer.color.code})
  }

  layerPreview.setAttribute("banner", state.urlCode)
  updateURL()
  updateCommand()
}

function updateURL(replace = false) {
  if (!state.loaded) { return }
  const current = new URLSearchParams(location)
  const path = "?=" + state.urlCode
  if (current.get("search") == path) { return }
  if (state.bannerData.patterns.length > 0) {
    if (replace) {
      history.replaceState({}, "", path)
    } else {
      history.pushState({}, "", path)
    }
  } else {
    history.replaceState({}, "", location.pathname)
  }
  const url = document.getElementById("url")
  url.value = location
  localStorage.setItem("ncrs-banners-current", state.urlCode)
}

function updateCommand() {
  document.getElementById("banner-command").setAttribute("banner", state.urlCode)
}

function moveLayer(id, direction) {
  const layer = document.getElementById(id)
  const li = layer.parentElement
  if (direction == -1 && li.previousElementSibling) {
    layerList.insertBefore(li, li.previousElementSibling)
  } else if (direction == 1 && li.nextElementSibling) {
    layerList.insertBefore(li.nextElementSibling, li)
  }
  updateState()
}

function loadFromURL(path) {
  if (!path) { return }
  layerList.replaceChildren()
  state.additionalURL = path.replaceAll(/[?=]/g, "").split("_")
  const params = state.additionalURL.shift().match(/.{1,2}/g)
  if (!params) { return }
  layerPreview.setAttribute("banner", params.join(""))
  for (let i = 0; i < params.length; i++) {
    const data = NCRSBanner.fromEncoding(params[i])
    if (i == 0) {
      basePattern.setAttribute("color", data.color.color)
    } else {
      addLayerToList(createLayer(data, (i == params.length - 1)))
    }
  }
  updateState()
}

function createURLBanner(urlCode) {
  const wrapper = createWithClasses("button", "url-banner")
  const instance = new NCRSBannerPreview
  instance.setAttribute("banner", urlCode)
  wrapper.addEventListener("click", () => {
    loadFromURL(urlCode)
  })

  wrapper.append(instance)
  return wrapper
}

function renderURLBanners(code) {
  const urlBannersContainer = document.getElementById("url-banners-container")
  
  if (code.length < 2) {
    urlBannersContainer.style.setProperty("display", "none")
    return
  }
    
  const urlBanners = document.getElementById("url-banners")

  urlBanners.append(createURLBanner(state.urlCode))
  state.additionalURL.forEach(url => {
    urlBanners.append(createURLBanner(url))
  })
}

function createSavedBanner(urlCode) {
  const instance = createURLBanner(urlCode)
  const deleteButton = createWithClasses("button", "saved-banner-delete")

  deleteButton.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("ncrs-banners-saved"))
    const index = data.indexOf(urlCode)
    data.splice(index, 1)
    localStorage.setItem("ncrs-banners-saved", JSON.stringify(data))
    instance.remove()
    updateSavedBannersURL(data)
  })

  instance.append(deleteButton)
  return instance
}

function renderSavedBanners() {
  const savedBanners = document.getElementById("saved-banners")
  const banners = localStorage.getItem("ncrs-banners-saved")
  const saveButton = document.getElementById("save-button")
  let list

  if (!banners) {
    list = []
    localStorage.setItem("ncrs-banners-saved", JSON.stringify(list))
  } else {
    list = JSON.parse(banners)
  }

  list.forEach(url => {
    savedBanners.prepend(createSavedBanner(url))
  })

  updateSavedBannersURL(list)

  saveButton.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("ncrs-banners-saved"))
    data.push(state.urlCode)
    localStorage.setItem("ncrs-banners-saved", JSON.stringify(data))
    savedBanners.prepend(createSavedBanner(state.urlCode))
    updateSavedBannersURL(data)
  })
}

function updateSavedBannersURL(data) {
  const url = document.getElementById("saved-banners-url")
  if (data.length < 1) {
    url.value = ""
    return
  }
  url.value = location.origin + location.pathname + "?=" + data.join("_")
}

function transformLegacySave(data) {
  const base = NCRSBanner.colors.find(color => { return color.legacy['1.8'] == data.Base })
  let output = base.encode + "a"
  data.Patterns.forEach(element => {
    const pattern =  NCRSBanner.patterns.find(pattern => { return pattern.legacy['1.8'] == element.Pattern })
    const color =  NCRSBanner.colors.find(color => { return color.legacy['1.8'] == element.Color })
    output += (color.encode + pattern.encode)
  })
  return output
}

function loadLegacySavedBanners() {
  if (localStorage.getItem("bn-imported") || !localStorage.getItem("bn")) { return }
  const data = JSON.parse(localStorage.getItem("bn"))
  const save = data.map(transformLegacySave)
  localStorage.setItem("ncrs-banners-saved", JSON.stringify(save))
  localStorage.setItem("bn-imported", "1")
}

function randomize() {
  let str = ""
  const count = Math.floor((Math.random() * 5) + 2)
  for (let i = 0; i < count; i++) {
    const colorIdx = Math.floor(Math.random() * NCRSBanner.colors.length)
    const patternIdx = Math.floor(Math.random() * NCRSBanner.patterns.length)
    const color = NCRSBanner.colors[colorIdx]
    const pattern = NCRSBanner.patterns[patternIdx]

    if (i == 0) {
      str += (color.encode + "a")
    } else {
      str += (color.encode + pattern.encode)
    }
  }
  return str
}

const randomButton = document.getElementById("random")
randomButton.addEventListener("click", () => {
  loadFromURL(randomize())
})

const clearButton = document.getElementById("clear")
clearButton.addEventListener("click", () => {
  loadFromURL("pa")
})

const shareButton = document.getElementById("share")
const shareModal = document.getElementById("share-form")
const dataField = document.getElementById("banner_data")

shareButton.addEventListener("click", () => {
  if (state.urlCode.length < 2) { return }
  if (dataField != null) {
    dataField.value = state.urlCode
  }

  shareModal.show()
})

const shareCancelButton = document.getElementById("share-cancel")
if (shareCancelButton != null) {
  shareCancelButton.addEventListener("click", () => shareModal.hide())
}

const shieldToggle = document.getElementById("shield-preview")
const previewArea = document.getElementById("preview-area")
shieldToggle.addEventListener("change", event => {
  if (event.target.checked) {
    previewArea.classList.add("shield-sprites")
  } else {
    previewArea.classList.remove("shield-sprites")
  }
})

function load() {
  const currentURL = new URLSearchParams(location)
  const code = currentURL.get("search")
  if (code == "") {
    loadFromURL(localStorage.getItem("ncrs-banners-current"))
  } else {
    loadFromURL(code)
  }
  renderURLBanners(code)
  loadLegacySavedBanners()
  renderSavedBanners()
  state.loaded = true
  updateURL(true)

  if (dataField != null) {
    dataField.value = state.urlCode
  }
}

window.addEventListener("load", load)

new Sortable(layerList, {
  handle: ".layer-handle",
  onEnd: updateState,
})