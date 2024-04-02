import {NCRSSkinEditor} from "./skin_editor.js"
import {clamp, hexToRGB, sample, getRandomInt} from "./helpers.js"

const NCRSEditor = new NCRSSkinEditor({
  canvas: document.getElementById("workspace"),
  skin: "/ncsassets/img/default.png"
});

export {NCRSEditor};