App.ShareMode = function (a, b) {
  function c(a, b) {}
  function d(a, b) {}
  function e() {}
  return {
    getName: function () {
      return "ecmShare";
    },
    getTitle: function () {
      return "Export";
    },
    getKey: function () {
      return "e";
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
      a.toolbox.show("share");
    },
  };
};
