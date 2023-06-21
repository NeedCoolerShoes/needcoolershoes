App.ColorPanel = function (a, b) {
  "use strict";
  var c = $(
    '<div class = "color" ><div class = "transparent" > </div><div data-color = "#ffffff" style="background:#ffffff"> </div><div data-color = "#c0c0c0" style="background:#c0c0c0"> </div><div data-color = "#808080" style="background:#808080"> </div><div data-color = "#000000" style="background:#000000"> </div><div data-color = "#ff0000" style="background:#ff0000"> </div><div data-color = "#800000" style="background:#800000"> </div><div data-color = "#ffff00" style="background:#ffff00"> </div><div data-color = "#808000" style="background:#808000"> </div><div data-color = "#00ff00" style="background:#00ff00"> </div><div data-color = "#008000" style="background:#008000"> </div><div data-color = "#00ffff" style="background:#00ffff"> </div><div data-color = "#008080" style="background:#008080"> </div><div data-color = "#0000ff" style="background:#0000ff"> </div><div data-color = "#000080" style="background:#000080"> </div><div data-color = "#ff00ff" style="background:#ff00ff"> </div><div data-color = "#800080" style="background:#800080"> </div></div>'
  );
  return (
    c.find("div").click(function () {
      if ($(this).hasClass("transparent"))
        var a = new THREE.Color().setAlpha();
      else var a = new THREE.Color($(this).data("color"));
      b.layerModel.add(),
        b.model.loopOverFaces(function (c, d) {
          (d.overlay || (!d.underlay && !d.overlay)) &&
            b.layerModel.setFaceColor(c, a);
        }),
        b.layerPresenter.updateLayerThumbnail(),
        b.toolbar.changeToDefault(),
        b.layerPresenter.checkpoint(true);
    }),
    a.append(c.hide()),
    {
      hide: function () {
        c.hide();
      },
      show: function () {
        c.show();
      },
    }
  );
};
