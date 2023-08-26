App.Redo = function (a, b, c) {
    var d = "";
    (d += '<div title = "Redo [y]" id = "redo"></div>'),
      b.keys.bind(["command+y", "ctrl+y", "y"], function () {
        return b.layerPresenter.redo(), false;
      }),
      a.append(
        $(d).click(function () {
           b.layerPresenter.redo()
        })
      );
  };
  