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
  `Most buttons have a useful tooltip, if you hover your mouse over them for long enough.`,
  `Hovering your mouse over a layer will show the attribution link if it has one.`,
  `You can import reference images from the "Import" tab, which can be moved around, resized, and color picked.`,
  `You can use the scroll wheel, and the arrow keys, to change the value of sliders (shift will make them change faster).`,
  `Exporting to a ".ncrs" file preserves layers, metadata, and filters, all things lost when exporting to ".png".`,
  `Most skins you download from the site will have randomly colored / black pixels next to the face. Those store the attribution data of the skin.`,
  `You can write the names of colors like "red" in the color picker hex field.`,
  `You can write "random" in the hex color field to get a random color`,
  `Shift-click the part toggles to disable all other parts but the one clicked.`,
  `Middle-clicking the color adjustment sliders in the layers tab resets them`,
  `All parts you import from the gallery will be linked under your skin, if you decide to post it to the gallery.`,
];

const SECRET_TIPS = [
  `Try putting "MOXVALLIX" in to the color picker (you can turn it off by typing it again).`,
  `Try putting "DEADMAU5" in to the color picker. (you can turn it off by typing it again)`,
  `Many people from our discord community submitted their names as colors, for example "Wulfian" or "Dragon".`,
];

let tipIndex = Math.floor(Math.random() * TIPS.length);
let tipClickTimes = 0;

function setupTips() {
  loadTip(TIPS[tipIndex]);

  const tipRoll = document.getElementById("roll-tip");
  tipRoll.addEventListener("click", () => {
    tipIndex += 1;
    tipClickTimes++;

    if (tipIndex > (TIPS.length -1)) {
      tipIndex = 0;
    }

    if (tipClickTimes >= 20) {
      const secretTipIndex = Math.floor(Math.random() * SECRET_TIPS.length);
      tipClickTimes = 0;

      loadTip(SECRET_TIPS[secretTipIndex]);
      return;
    }


    loadTip(TIPS[tipIndex]);
  })
}

function loadTip(tip) {
  const tipElement = document.getElementById("tip");

  tipElement.innerHTML = tip;
}

function onLoad() {
  importSkinFromData();
  setupSkinModelEvent();
  setupTips();
}

window.addEventListener("load", () => onLoad());