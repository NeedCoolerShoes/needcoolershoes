App.FillMode = function (a) {
  "use strict";
  function b(b, d) {
    (f = a.layerModel.getFaceColor(b[0].face)), c(b[0].face, b[0].object);
    for (var e = b[0].object.geometry.faces, g = 0; g < e.length; g++)
      e[g].touched = false;
    a.layerPresenter.checkpoint(true);
  }
  function c(b, d) {
    b.touched = true;
    for (var e = a.model.getAdjacentFaces(b, d), g = 0; g < e.length; g++) {
      var h = a.layerModel.getFaceColor(e[g]);
      h.equals(f) &&
        (a.layerModel.setFaceColor(
          e[g],
          a.toolbox.refs.colorPicker.getColor(
            a.toolbox.refs.noise.isEnabled()
          )
        ),
        e[g].touched || c(e[g], d));
    }
  }
  function d(a, b) {}
  function e(a, b) {}
  var f;
  return {
    getName: function () {
      return "ecmFill";
    },
    getTitle: function () {
      return "Fill Tool";
    },
    getKey: function () {
      return "f";
    },
    mousedown: b,
    mousemove: d,
    mouseup: e,
    getCursorHoverUrl: function () {
      return "crosshair";
    },
    getCursorDownUrl: function () {
      return "crosshair";
    },
    showTools: function () {
      a.toolbox.show(["colorPicker", "noise"]);
    },
  };
};
