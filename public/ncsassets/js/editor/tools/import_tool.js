App.ImportTool = function (a, b) {
  "use strict";
  var c = false,
    d = $('<div id = "import" class = "flex flex-row-reverse" ></div>'),
    e = $('<div class = "panel" ></div>'),
    f = $('<div class = "square" ></div>'),
    g =
      ($('<div class = "loading"><div class="spinner"></div></div>'),
      new App.ColorPanel(e, b)),
    h = new App.SearchPanel(e, b);
  f.append($("<h2>Choose an option for import</h2>"));
  var i = new App.InputButton(f, b);
  f.append(
    $("<button>A Solid Color</button>").mousedown(function () {
      g.show(), h.hide();
    })
  );

  var j =
    (new App.FileButton(f, b),
    $("<button disabled>Generate Random</button>").mousedown(function () {
      function a(a) {
        var c = Math.floor(Math.random() * a.length),
          d = a[c].split(",");
        return (
          i.push(d[0]),
          b.transporter.setUVImage(
            App.config.s3.prefix.aws +
              App.config.s3.suffix.file +
              "/save/" +
              d[1] +
              ".png",
              App.UVMAP.current,
            d[0]
          )
        );
      }
      function setFromRandomSkin(params = {}) {
        var query = {
          type: "get",
          url: window.location.origin + "/gallery.json",
          data: Object.assign(params, { items: 1, order: 'random' }),
        }
        return $.ajax(query).done(function (result) {
          var skin = result.skins[0]
          if (!skin) { return; }
          i.push(skin.id);
          b.transporter.setUVImage(skin.image, App.UVMAP.current, skin.id);
        })
      }
      function c() {
        for (var a = 0; a < i.length; a++)
          b.layerModel.loop(function (c) {
            c.skinId == i[a] && b.layerModel.changeOrder(c, 9999);
          });
        b.layerModel.loop(function (a, c) {
          0 == c && b.layerModel.select(a);
        }),
          b.layerModel.renderModel(),
          b.layerPresenter.checkpoint(true),
          b.toolbar.changeToDefault(),
          b.toolbox.refs.colorPicker.addRecentColorsFromFaces(),
          d.removeClass("loading");
      }
      var d = $(this), i = [];
      b.layerModel.removeAll(),
        d.hasClass("loading") ||
          (d.addClass("loading"),
          $.when(
            $.Deferred(function (a) {
              setTimeout(a.resolve, 1e3);
            }),
            setFromRandomSkin({part: "Face/Hair"}),
            setFromRandomSkin({part: "Shoes/Footwear"}),
            setFromRandomSkin({part: "Shirt"}),
            setFromRandomSkin({part: "Pants"}),
            setFromRandomSkin({part: "Base"})
          ).always(c));
    })),
    k = $('<hr class="my-2">'),
    l = new App.ReferenceImgButton(f, b);
  return (
    f.append(j),
    f.append(k),
    f.append(l),
    d.append(e),
    d.append(f),
    a.append(d),
    {
      isEnabled: function () {
        return c;
      },
      hide: function () {
        d.hide();
      },
      show: function () {
        d.show(), g.hide(), h.show(), i.reset();
      },
    }
  );
};
