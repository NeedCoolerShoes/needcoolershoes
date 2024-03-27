import './palettes.js'
import "./preview.js"
import {NCRSEditor} from './editor.js'
import {download} from './helpers.js'

const colorpicker = document.getElementById("colorpicker")
const ctx = colorpicker.getContext("2d")

const img = new Image()
img.onload = event => {
  ctx.drawImage(event.target, 0, 0)
  img.remove
}
img.src = "/ncsassets/img/legacy/editor/12_ColorPicker_swatch.jpg"

const camo = document.getElementById("camo")
camo.addEventListener('click', event => {
  if (event.target.dataset.selected) {
    event.target.dataset.selected = '';
    event.target.classList.add('grayscale');
    NCRSEditor.camo = false;
  } else {
    event.target.dataset.selected = true;
    event.target.classList.remove('grayscale');
    NCRSEditor.camo = true;
  }
})

const eyedropper = document.getElementById("eyedropper");
eyedropper.addEventListener("click", () => {
  NCRSEditor.enablePicker();
})

const upload = document.getElementById("upload");
const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", event => {
  upload.click();
})
upload.addEventListener("change", event => {
  const fileURL = URL.createObjectURL(event.target.files[0]);
  NCRSEditor.loadSkin(fileURL);
})

const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", event => {
  NCRSEditor.export().then(url => {
    download(url, "download.png")
  })
})