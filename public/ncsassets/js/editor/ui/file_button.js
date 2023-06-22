App.FileButton = function (a, b) {
  "use strict";
  var c,
    d,
    e = $("<button>Import from Computer</button>"),
    f = $('<input style="display:none" id="files" type="file" />');
  return (
    e.mousedown(function () {
      c && c(), f.click();
    }),
    f.change(function (a) {
      b.transporter
        .setUVImage(URL.createObjectURL(a.target.files[0]), App.UVMAP.current)
        .done(function () {
          b.layerPresenter && b.layerPresenter.checkpoint(true),
            b.toolbox &&
              b.toolbox.refs.colorPicker.addRecentColorsFromFaces(),
            b.toolbar && b.toolbar.changeToDefault(),
            d && d();
        });
    }),
    a.append(e),
    {
      hide: function () {
        $searchPanel.hide();
      },
      show: function () {
        $searchPanel.show();
      },
      beforeSkinLoad: function (a) {
        c = a;
      },
      afterSkinLoad: function (a) {
        d = a;
      },
    }
  );
};
