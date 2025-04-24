import { ProjectLoader } from "ncrs-editor";

function download(filename, url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  link.remove();
}

function filename() {
  const date = new Date();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `old_editor_convert_${year}${month}${day}_${hours}${minutes}`;
}

function convertData(model) {
  const json = localStorage.getItem(`layerJson-${model}`);

  const blendJson = localStorage.getItem("blendPalette") || "[]";

  if (!json) { return; }

  try {
    const parsedJson = JSON.parse(json);
    localStorage.setItem(`layerJson-${model}-old`, JSON.stringify(parsedJson));
    localStorage.removeItem(`layerJson-${model}`);
  } catch(_) {}


  const data = {
    version: 2, model: model, data: json, blendPalette: blendJson
  };

  const pj = new ProjectLoader(data);

  return pj.serialize();
}

function onLoad() {
  const validModels = ["skin", "skinAlex"];

  let model = localStorage.getItem("model");
  if (!validModels.includes(model)) { model = "skin" }

  const otherModel = (model === "skin") ? "skinAlex" : "skin";

  const loadData = convertData(model);
  const exportData = convertData(otherModel);

  if (exportData) {
    const blob = new Blob([JSON.stringify(exportData)], {type: "text/plain"});
    download(`${filename()}.ncrs`, URL.createObjectURL(blob));
  }

  if (loadData) {
    const ui = document.getElementById("ncrs-ui");
    if (!ui) { return; }

    const pj = new ProjectLoader(loadData);
    pj.load(ui.editor);
  }
}

window.addEventListener("load", () => {
  onLoad();
});