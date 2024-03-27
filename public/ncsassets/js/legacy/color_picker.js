import {RGBToHex} from "./helpers.js";
import {NCRSEditor} from "./editor.js";

const canvas = document.getElementById('colorpicker');
const ctx = canvas.getContext("2d");
const eye = new Image(10, 10);
eye.style = "position: absolute; top: 0px; left: 0px; pointer-events: none;";
eye.src = "/ncsassets/img/legacy/editor/8_ColorPicker_eye.png";
canvas.insertAdjacentElement("beforebegin", eye);

canvas.addEventListener('click', event => {
  const data = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data;
  NCRSEditor.currentColor = RGBToHex(data[0], data[1], data[2]);
  eye.style.top = `${Math.floor(event.offsetY - 5)}px`;
  eye.style.left = `${Math.floor(event.offsetX - 5)}px`;
})

canvas.addEventListener('mousemove', event => {
  if (event.buttons == 1) {
    eye.style.top = `${event.offsetY - 5}px`;
    eye.style.left = `${event.offsetX - 5}px`;
  }
})

function changeColor(color) {
}

export {changeColor};