// Glue

document.getElementById("cancel-button").addEventListener("click", () => {
  const ui = document.getElementById("ncrs-ui");
  ui.exportModal.hide();
});

const warning = document.getElementById("warning");
const acceptWarning = document.getElementById("accept-warning-button");

if (window.matchMedia("(max-width: 800px)").matches) {
  if (!localStorage.getItem("ncrs-ignore-warning")) {
    warning.classList.remove("hidden");
    warning.classList.add("flex");
  }
}

acceptWarning.addEventListener("click", () => {
  warning.classList.add('hidden');
  warning.classList.remove('flex');
  localStorage.setItem('ncrs-ignore-warning', true);
});

function importSkinFromData() {
  const importData = localStorage.getItem("ncrs-skin-import");
  
  if (!importData) { return; }

  const data = JSON.parse(importData);
  const ui = document.getElementById("ncrs-ui");
  if (!ui) { return; }

  const editor = ui.editor;
  if (!editor) { return; }

  editor.addLayerFromImageURL(data.data, {attribution: data.attribution});

  if (editor.config.get("variant") === "classic" && data.model === "slim") {
    editor.setVariant("slim");
  }

  localStorage.removeItem("ncrs-skin-import");
}

function setupSkinModelEvent() {
  const ui = document.getElementById("ncrs-ui");
  const editor = ui.editor;
  const select = document.getElementById("skin_model");

  if (!select) { return; }

  select.value = editor.config.get("variant");

  editor.config.addEventListener("variant-change", event => {
    select.value = event.detail;
  })
}

const TIPS = [
  `Need help with the editor? Try the <a href="https://wiki.needcoolershoes.com" target="_blank" class="underline">wiki</a>!`,
  `Middle click with your mouse to pan the camera. Press 0 to reset your camera.`,
  `Hovering your mouse over a layer will show any attribution data it has.`,
  `Most buttons have a useful tooltip, if you hover your mouse over them for long enough.`,
  `You can import reference images from the "Import" tab, which can be moved around, resized, and color picked.`,
  `You can use the scroll wheel, and the arrow keys, to change the value of sliders (shift will make it change faster).`,
  `Exporting to a ".ncrs" file preserves layers, metadata, and filters, all things lost when exporting to ".png".`,
  `Most skins you download from the site will have rainbow / black pixels next to the face. Those store the attribution data of the skin.`,
  `You can write the names of colors in to the color picker hex field, based on CSS color names.`,
  `Try writing "MOXVALLIX" in to the color picker. Try "DEADMAU5". To reset, write the word again.`
];
let tipIndex = Math.floor(Math.random() * TIPS.length);

function setupTips() {
  loadTip();

  const tipRoll = document.getElementById("roll-tip");
  tipRoll.addEventListener("click", () => {
    tipIndex += 1;
    if (tipIndex > (TIPS.length -1)) {
      tipIndex = 0;
    }

    loadTip();
  })
}

function loadTip() {
  const tipElement = document.getElementById("tip");
  const tip = TIPS[tipIndex];

  tipElement.innerHTML = tip;
}

function onLoad() {
  importSkinFromData();
  setupSkinModelEvent();
  setupTips();
}

window.addEventListener("load", () => onLoad());