App.ImportMode = function (a, b) {
  function c(a, b) {}
  function d(a, b) {}
  function e() {}
  return {
    getName: function () {
      return "ecmImport";
    },
    getTitle: function () {
      return "Import";
    },
    getKey: function () {
      return "i";
    },
    mousedown: c,
    mousemove: d,
    mouseup: e,
    getCursorHoverUrl: function () {
      return "grab";
    },
    getCursorDownUrl: function () {
      return "grab";
    },
    showTools: function () {
      a.toolbox.show("import");
    },
  };
};
