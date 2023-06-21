App.Toolbox = function (a, b) {
  "use strict";
  function c(b, c) {
    return d.push([b, c]), (e[b] = c), a;
  }
  var d = [],
    e = {};
  return (
    c("colorPicker", App.ColorPickerTool(a, b)),
    c("brushSize", App.BrushSizeTool(a)),
    c(
      "mirror",
      App.ToggleButtonTool(
        a,
        "mirror",
        "Enable/Disable mirrorinng on head and body."
      )
    ),
    c(
      "noise",
      App.ToggleButtonTool(a, "noise", "Add a 'camo' effect to the stroke.")
    ),
    c("share", App.ShareTool(a, b)),
    c("import", App.ImportTool(a, b)),
    c("filter", App.FilterTool(a, b)),
    {
      refs: e,
      add: c,
      show: function (a) {
        "string" == typeof a && (a = [a]);
        for (var b = 0; b < d.length; b++)
          for (var c = 0; c < a.length; c++)
            a[c] == d[b][0] && d[b][1].show();
      },
      hideAll: function () {
        for (var a = 0; a < d.length; a++) d[a][1].hide();
      },
    }
  );
};
