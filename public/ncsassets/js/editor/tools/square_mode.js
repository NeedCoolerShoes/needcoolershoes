App.SquareMode = function (a, b) {
  function c(a, b) {
    g = b;
  }
  function d(b, c) {
    for (var d in h)
      h.hasOwnProperty(d) && a.model.setFaceColor(h[d].ref, h[d].color);
    var f = {},
      i = {};
    g.left > c.left
      ? ((f.left = c.left), (i.left = g.left))
      : ((f.left = g.left), (i.left = c.left)),
      g.top > c.top
        ? ((f.top = c.top), (i.top = g.top))
        : ((f.top = g.top), (i.top = c.top));
    for (var j = f.left; j < i.left; j += 5)
      for (var k = f.top; k < i.top; k += 5) {
        var b = a.model.pingIntersects({ left: j, top: k });
        b[0] &&
          (e(b[0].face),
          a.toolbox.refs.mirror.isEnabled() &&
            e(a.model.getMirroredFace(b[0])));
      }
  }
  function e(b) {
    var c = b.faceIndex + "," + b.groupIndex;
    if (!h[c]) {
      var d = new THREE.Color(b.color);
      h[c] = { ref: b, color: d };
    }
    a.model.setFaceColor(
      b,
      a.toolbox.refs.colorPicker.getColor(
        a.toolbox.refs.noise.isEnabled(),
        a.toolbox.refs.blendPalette.isEnabled()
      )
    );
  }
  function f() {
    for (var b in h)
      h.hasOwnProperty(b) &&
        a.layerModel.setFaceColor(h[b].ref, h[b].ref.color);
    a.layerModel.renderModel(),
      a.layerPresenter.updateLayerThumbnail(),
      (h = {}),
      a.layerPresenter.checkpoint(true);
  }
  var g,
    h = {};
  return {
    getName: function () {
      return "ecmSquare";
    },
    getTitle: function () {
      return "Rectangle Tool";
    },
    getKey: function () {
      return "r";
    },
    mousedown: c,
    mousemove: d,
    mouseup: f,
    getCursorHoverUrl: function () {
      return "move";
    },
    getCursorDownUrl: function () {
      return "move";
    },
    showTools: function () {
      a.toolbox.show(["colorPicker", "noise", "mirror", "blendPalette"]);
    },
  };
};
