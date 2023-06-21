var App = App || {};
var drawingPanel = document.getElementById("drawing");

var scripts = [
  "transporter", "model", "layer_model", "layer_presenter", "editor", "keys", "ui/model_toggles",
  "tools/fill_mode", "tools/filter_mode", "tools/import_mode", "tools/paint_mode", "tools/share_mode",
  "tools/square_mode", "ui/toolbar", "ui/toolbox", "tools/brush_size_tool", "tools/color_picker_tool",
  "tools/filter_tool", "tools/import_tool", "ui/color_panel", "ui/file_button", "ui/input_button",
  "ui/search_panel", "ui/skin_loader_panel", "ui/share_tool", "ui/spinner", "ui/toggle_button_tool",
  "undo", "custom"
]
scripts.forEach( script => {
  document.write(`<script src="/ncsassets/js/editor/${script}.js" type="text/javascript"></script>`);
})

$(function () {
  App.Editor($("#drawing"), $("#toolbar"), $("#toolbox")),
    $("body").addClass("loaded");
});

App.affines = App.affines || {};