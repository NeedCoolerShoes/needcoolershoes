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

  select.value = editor.config.get("variant");

  editor.config.addEventListener("variant-change", event => {
    select.value = event.detail;
  })
}

function onLoad() {
  importSkinFromData();
  setupSkinModelEvent();
}

window.addEventListener("load", () => onLoad());
