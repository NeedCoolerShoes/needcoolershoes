App.Undo = function (a, b, c) {
  var d = "";
  (d += '<div title = "Undo [z]" id = "undo"></div>'),
    b.keys.bind(["command+z", "ctrl+z", "z"], function () {
      return b.layerPresenter.undo(), false;
    }),
    a.append(
      $(d).click(function () {
        b.layerPresenter.undo();
      })
    );
};
