import "../skinview3d.bundle.js";
import {NCRSEditor} from "./editor.js";

const NCRSSkinPreview = new skinview3d.SkinViewer({
  canvas: document.getElementById("preview"),
  width: 280,
  height: 373,
  skin: "/ncsassets/img/default.png"
});

NCRSSkinPreview.globalLight.intensity = 1.0;
NCRSSkinPreview.cameraLight.intensity = 0.0;
NCRSSkinPreview.animation = new skinview3d.IdleAnimation();

NCRSEditor.addEventListener("render", event => {
  NCRSSkinPreview.loadSkin(event.detail.canvas);
})

export {NCRSSkinPreview};