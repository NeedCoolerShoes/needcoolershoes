App.FilterTool = function (a, b) {
  "use strict";
  function c(a) {
    (k[a] = {}),
      (k[a].$ref = $("<div></div>")
        .slider({
          max: j,
          value: j / 2,
          slide: function (a, b) {
            var c = $(b.handle).parent().data("id");
            (k[c].val = b.value), d();
          },
          change: function (a, c) {
            a.originalEvent && b.layerPresenter.checkpoint(true);
          },
        })
        .data("id", a)),
      (k[a].val = j / 2);
  }
  function d() {
    var a = 0;
    b.model.loopOverFaces(function (c) {
      m || l.push(b.layerModel.getFaceColor(c)),
        l[a].isAlpha() ||
          b.layerModel.setFaceColor(
            c,
            l[a]
              .clone()
              .offsetHSL(
                f(k.hue.val),
                f(k.saturation.val),
                f(k.lightness.val)
              )
          ),
        a++;
    }),
      (m = true),
      b.model.render();
  }
  function e() {
    for (var a = 0; a < Object.keys(k).length; a++)
      (k[Object.keys(k)[a]].val = j / 2),
        k[Object.keys(k)[a]].$ref.slider("value", j / 2);
  }
  function f(a) {
    return (a - j / 2) / j;
  }
  var g = $('<div class = "box"></div>'),
    h = $("<button>Make body transparent</button>").mousedown(function () {
      b.model.loopOverParts(function (a) {
        if (a.overlay)
          for (var c = a.geometry.faces, d = 0; d < c.length; d++)
            b.layerModel.setFaceColor(c[d], new THREE.Color().setAlpha());
      }),
        b.layerPresenter.checkpoint(true);
    }),
    i = $('<button>Flip "skin" and "armor"</button>').mousedown(
      function () {
        b.model.loopOverParts(function (a) {
          if (a.overlay)
            for (var c = a.geometry.faces, d = 0; d < c.length; d++) {
              var e = c[d],
                f = a.overlay.geometry.faces[d],
                g = new THREE.Color(b.layerModel.getFaceColor(e)),
                h = new THREE.Color(b.layerModel.getFaceColor(f));
              b.layerModel.setFaceColor(e, h),
                b.layerModel.setFaceColor(f, g);
            }
        }),
          b.layerPresenter.checkpoint(true);
      }
    ),
    j = 20,
    k = {},
    l = [],
    m = false;
  c("hue"), c("saturation"), c("lightness");
  var n = $("<button>Revert Sliders</button>").mousedown(function () {
    e(), d(), b.layerPresenter.checkpoint();
  });
  return (
    g.append(h),
    g.append(i),
    g.append('<div class="action">———————————</div>'),
    g.append("<p>Adjust Hue, Saturation, Brightness</p>"),
    g.append(k.hue.$ref),
    g.append(k.saturation.$ref),
    g.append(k.lightness.$ref),
    g.append(n),
    a.append(g),
    {
      isEnabled: function () {
        return enabled;
      },
      hide: function () {
        g.hide();
      },
      show: function () {
        g.show(), (l = []), (m = false), e();
      },
    }
  );
};
