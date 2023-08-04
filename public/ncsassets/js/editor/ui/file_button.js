App.FileButton = function (a, b) {
  "use strict";
  var c,
    d,
    e = $("<button>Import from Computer</button>"),
    f = $('<input style="display:none" id="files" type="file" accept=".png,.ncrs" />');
  return (
    e.mousedown(function () {
      c && c(), f.click();
    }),
    f.change(function (a) {
      let file = a.target.files[0]
      if ( file.name.endsWith(".ncrs") ) {
        b.transporter.importLayers(file);
      } else {
        b.transporter
          .setUVImage(URL.createObjectURL(file), App.UVMAP.current)
          .done(function () {
            b.layerPresenter && b.layerPresenter.checkpoint(true),
              b.toolbox &&
                b.toolbox.refs.colorPicker.addRecentColorsFromFaces(),
              b.toolbar && b.toolbar.changeToDefault(),
              d && d();
          });
      }
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
