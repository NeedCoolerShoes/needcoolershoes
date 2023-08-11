App.PaintMode = function (a) {
  function mousedown(intersectingObjects, cursorOffset) {
    mousemove(intersectingObjects, cursorOffset);
  }
  function mousemove(intersectingObjects, cursorOffset) {
    if (
      intersectingObjects.length &&
      (a.layerModel.setFaceColor(
        intersectingObjects[0].face,
        a.toolbox.refs.colorPicker.getColor(
          a.toolbox.refs.noise.isEnabled()
        )
      ),
      a.toolbox.refs.mirror.isEnabled() &&
        a.layerModel.setFaceColor(
          a.model.getMirroredFace(intersectingObjects[0]),
          a.toolbox.refs.colorPicker.getColor(
            a.toolbox.refs.noise.isEnabled()
          )
        ),
      "size2" == a.toolbox.refs.brushSize.getSize() ||
        "size3" == a.toolbox.refs.brushSize.getSize())
    ) {
      var d = 4,
        e = 10;
      if ("size3" == a.toolbox.refs.brushSize.getSize()) var e = 20;
      for (var f = cursorOffset.left - e; f < cursorOffset.left + e; f += d)
        for (var g = cursorOffset.top - e; g < cursorOffset.top + e; g += d)
          if (
            ((b = a.model.pingIntersects({ left: f, top: g })),
            b.length > 0 &&
              (a.layerModel.setFaceColor(
                b[0].face,
                a.toolbox.refs.colorPicker.getColor(
                  a.toolbox.refs.noise.isEnabled()
                )
              ),
              a.toolbox.refs.mirror.isEnabled()))
          ) {
            var h = a.model.getMirroredFace(b[0]);
            h &&
              a.layerModel.setFaceColor(
                a.model.getMirroredFace(b[0]),
                a.toolbox.refs.colorPicker.getColor(
                  a.toolbox.refs.noise.isEnabled()
                )
              );
          }
    }
  }
  function d() {
    a.layerPresenter.checkpoint(true);
  }
  return {
    getName: function () {
      return "ecmPaint";
    },
    getTitle: function () {
      return "Paint Tool";
    },
    getKey: function () {
      return "p";
    },
    mousedown: mousedown,
    mousemove: mousemove,
    mouseup: d,
    getCursorHoverUrl: function () {
      return "crosshair";
    },
    getCursorDownUrl: function () {
      return "crosshair";
    },
    showTools: function () {
      a.toolbox.show(["colorPicker", "brushSize", "mirror", "noise"]);
    },
  };
};
