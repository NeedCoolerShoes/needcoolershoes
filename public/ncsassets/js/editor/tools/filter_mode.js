App.FilterMode = function (a, b) {
  function c(a, b) {}
  function d(a, b) {}
  function e() {}
  return {
    getName: function () {
      return "ecmFilter";
    },
    getTitle: function () {
      return "Filter";
    },
    getKey: function () {
      return "u";
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
      a.toolbox.show("filter");
    },
  };
};
