/* Custom Scripts by Moxvallix */

// https://stackoverflow.com/questions/3916191/download-data-url-file

function download(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function editSkin(data, id, location, model) {
  localStorage["edit-save-ref"] = data;
  localStorage["edit-id-ref"] = id;
  localStorage["model"] = model;
  window.location = location;
}