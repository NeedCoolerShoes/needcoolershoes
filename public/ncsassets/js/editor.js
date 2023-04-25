var App = App || {};

App.LayerPresenter = function (toolbar, app) {
  "use strict";
  function render() {
    var element = "";
    app.layerModel.loop(function (layer) {
      var active = "";
      layer.selected && (active = "active");
      var close = "";
      layer.visible || (close = "close");
      var imageURL = "";
      images[layer.id] && (imageURL = "background-image:url(" + images[layer.id] + ") "),
        (element +=
          '<li style = "' +
          imageURL +
          '"  data-id = "' +
          layer.id +
          '" class = "' +
          active +
          '" ><div title = "Toggle layer visibility" class = "eye ' +
          close +
          '"></div></li>');
    }),
      n.html(element);
  }
  function d(a) {
    (a = a || app.layerModel.active()),
      (images[a.id] = app.transporter.getUVImage("frontBack", a).src);
  }
  function updateAllLayerThumbnails() {
    render(),
      app.layerModel.loop(function (a) {
        d(a, true);
      });
  }
  function f(a) {
    a === true
      ? app.layerPresenter.updateLayerThumbnail()
      : a && app.layerPresenter.updateLayerThumbnail(a),
      a && app.layerPresenter.render(),
      app.model.render();
    var c = app.layerModel.stringify();
    localStorage.setItem("layerJson", c), h.push(c);
  }
  function undo() {
    h.length > 1 &&
      (h.pop(),
      app.layerModel.parse(h[h.length - 1]),
      app.layerPresenter && app.layerPresenter.updateAllLayerThumbnails(),
      app.layerModel.renderModel(),
      app.model.render());
  }
  var h = [],
    images = {},
    j = $('<div id = "layers" ></div>'),
    k = $('<li title="Add a new layer" class= "add"></li>'),
    l = $('<li title="Delete this layer" class= "delete"></li></ul>'),
    m = $('<ul class = "button-group top-heavy" ></ul>'),
    n = $("<ul></ul>");
  return (
    j.append(n),
    m.append(k),
    m.append(l),
    j.append(m),
    toolbar &&
      (toolbar.append(j),
      n.sortable({
        axis: "y",
        distance: 10,
        stop: function () {
          n.data("dropped") ||
            (n
              .find("li")
              .not(".ui-sortable-placeholder")
              .each(function (a) {
                app.layerModel.get($(this).attr("data-id")).order = a;
              }),
            app.layerModel.renderModel(),
            app.layerPresenter.checkpoint(true)),
            n.data("dropped", false);
        },
      }),
      n.on("click", "li", function () {
        app.layerModel.select(app.layerModel.get($(this).attr("data-id"))), render();
      }),
      k.click(function () {
        app.layerModel.add(), app.layerPresenter.checkpoint(true);
      }),
      l.click(function () {
        n.find("li[data-id='" + app.layerModel.active().id + "']").slideUp(
          500,
          function () {
            app.layerModel.remove(), render(), app.layerPresenter.checkpoint(false);
          }
        );
      }),
      n.on("click", ".eye", function () {
        app.layerModel.toggleVisibility($(this).parent().attr("data-id")),
          render(),
          app.layerModel.renderModel(),
          app.model.render();
      })),
    {
      updateAllLayerThumbnails: updateAllLayerThumbnails,
      render: render,
      undo: undo,
      checkpoint: f,
      updateLayerThumbnail: d,
    }
  );
};

App.Editor = function (a, b, c, d) {
  "use strict";
  function e(a, b) {
    return Math.sqrt(
      Math.pow(b.left - a.left, 2) + Math.pow(b.top - a.top, 2)
    );
  }
  function f(a, b) {
    return Math.atan2(b.left - a.left, b.top - a.top);
  }
  function g(a) {
    m != a &&
      ((m = a),
      "grab" == a
        ? (h.model.$dom.removeClass("grabbing-cursor"),
          h.model.$dom.addClass("grab-cursor"),
          h.model.$dom.css("cursor", ""))
        : "grabbing" == a
        ? (h.model.$dom.addClass("grabbing-cursor"),
          h.model.$dom.removeClass("grab-cursor"),
          h.model.$dom.css("cursor", ""))
        : h.model.$dom.css("cursor", a));
  }
  var h = {};
  (h.model = new App.Model(a, h)),
    (h.keys = new App.Keys(h)),
    (h.toolbox = new App.Toolbox(c, h)),
    (h.toolbar = new App.Toolbar(b, h)),
    (h.layerPresenter = new App.LayerPresenter(b, h)),
    (h.layerModel = new App.LayerModel(h)),
    (h.transporter = new App.Transporter(h)),
    (h.modelToggles = new App.ModelToggles(a, h)),
    (h.undo = new App.Undo(a, h)),
    h.transporter.loadFromLocalStorage(),
    h.toolbar.changeToStart(),
    (App.dep = h);
  var i,
    j,
    k,
    l = "",
    m = "drag";
  h.keys.bind("a", function () {
    h.model.animateTo({ y: -1.57079633, x: 0 });
  }),
    h.keys.bind("d", function () {
      h.model.animateTo({ y: 1.57079633, x: 0 });
    }),
    h.keys.bind("w", function () {
      h.model.animateTo({ x: -1.57079633, y: 0 });
    }),
    h.keys.bind("s", function () {
      h.model.animateTo({ x: 1.57079633, y: 0 });
    }),
    h.model.$dom
      .mousedown(function (a) {
        a.originalEvent.preventDefault();
        var b = h.model.cursorOffset(a),
          c = h.model.pingIntersets(b);
        h.toolbox.refs.colorPicker.isDropperActive()
          ? (c.length && c.length > 0
              ? h.toolbox.refs.colorPicker.dropperDeactivate(
                  h.layerModel.getFaceColor(c[0].face)
                )
              : h.toolbox.refs.colorPicker.dropperDeactivate(),
            g(h.toolbar.getModeObj().getCursorHoverUrl()))
          : (c.length &&
            c.length > 0 &&
            "grab" != h.toolbar.getModeObj().getCursorHoverUrl()
              ? ((l = "drawing"),
                h.toolbar.getModeObj().mousedown(c, b),
                g(h.toolbar.getModeObj().getCursorDownUrl()))
              : ((l = "drag"), (i = b)),
            h.toolbox.refs.colorPicker.addRecentColor()),
          h.model.render();
      })
      .mousemove(function (a) {
        a.preventDefault();
        var b = h.model.cursorOffset(a),
          c = h.model.pingIntersets(b);
        if (h.toolbox.refs.colorPicker.isDropperActive())
          (l = "dropper"),
            g("crosshair"),
            c.length &&
              c.length > 0 &&
              h.toolbox.refs.colorPicker.preveiwColor(
                h.layerModel.getFaceColor(c[0].face)
              );
        else if (h.toolbar.getModeObj() && "drawing" == l) {
          if (c.length > 0) {
            if (b && j) {
              var d = e(j, b),
                m = f(j, b);
              if (d > 5)
                for (var n = 0; n < d; n += 4) {
                  var o = j.left + Math.sin(m) * n,
                    p = j.top + Math.cos(m) * n,
                    q = { left: o, top: p };
                  h.toolbar
                    .getModeObj()
                    .mousemove(h.model.pingIntersets(q), q);
                }
            }
            h.toolbar.getModeObj().mousemove(c, b), (j = b), (k = false);
          } else k || (k = b);
          g(h.toolbar.getModeObj().getCursorDownUrl());
        } else
          "drag" == l
            ? (h.model.rotateTo({ y: i.left - b.left, x: i.top - b.top }),
              (i = b),
              g("grabbing"))
            : g(
                c.length && c.length > 0
                  ? h.toolbar.getModeObj().getCursorHoverUrl()
                  : "grab"
              );
        h.model.render();
      })
      .mouseup(function (a) {
        var b = h.model.cursorOffset(a);
        "drawing" == l &&
          0 != h.toolbar.getModeObj() &&
          h.toolbar.getModeObj().mouseup(),
          k && e(k, b) > 20,
          (j = false),
          (k = false),
          (l = false);
      })
      .mouseleave(function () {
        (k = false), h.model.$dom.mouseup();
      });
};

App.Keys = function (a) {
  function b(a, b) {
    c(a)
      ? console.log("!!! WARNING: DUPLICATE KEY BINDINGS !!!")
      : (Mousetrap.bind(a, b), (d = d.concat(a)));
  }
  function c(a) {
    for (var b = 0; b < d.length; b++)
      for (var c = 0; c < a.length; c++) if (d[b] == a[c]) return true;
    return false;
  }
  var d = [];
  return { bind: b };
};

App.ModelToggles = function (a, b, c) {
  function d() {
    var a = !e.find(".overlay").hasClass("unchecked"),
      c = !e.find(".underlay").hasClass("unchecked");
    b.model.loopOverParts(function (a) {
      a.visible = false;
    }),
      e
        .find(".body div")
        .not(".disabled")
        .each(function (d, e) {
          for (
            var f = $(e).data("parts").split(","), d = 0;
            d < f.length;
            d++
          ) {
            var g = b.model.getPart(f[d]);
            ((g.underlay && a) ||
              (g.overlay && c) ||
              (!g.overlay && !g.underlay)) &&
              (g.visible = true);
          }
        }),
      b.model.render();
  }
  var e = $($("#toggles-template").html());
  e.on("click", ".body div", function () {
    $(this).toggleClass("disabled"), d();
  }),
    e.on("click", ".controls div", function () {
      $(this).toggleClass("unchecked"), d();
    }),
    a.append(e);
};

App.FillMode = function (a) {
  "use strict";
  function b(b, d) {
    (f = a.layerModel.getFaceColor(b[0].face)), c(b[0].face, b[0].object);
    for (var e = b[0].object.geometry.faces, g = 0; g < e.length; g++)
      e[g].touched = false;
    a.layerPresenter.checkpoint(true);
  }
  function c(b, d) {
    b.touched = true;
    for (var e = a.model.getAdjacentFaces(b, d), g = 0; g < e.length; g++) {
      var h = a.layerModel.getFaceColor(e[g]);
      h.equals(f) &&
        (a.layerModel.setFaceColor(
          e[g],
          a.toolbox.refs.colorPicker.getColor(
            a.toolbox.refs.noise.isEnabled()
          )
        ),
        e[g].touched || c(e[g], d));
    }
  }
  function d(a, b) {}
  function e(a, b) {}
  var f;
  return {
    getName: function () {
      return "ecmFill";
    },
    getTitle: function () {
      return "Fill Tool";
    },
    getKey: function () {
      return "f";
    },
    mousedown: b,
    mousemove: d,
    mouseup: e,
    getCursorHoverUrl: function () {
      return "crosshair";
    },
    getCursorDownUrl: function () {
      return "crosshair";
    },
    showTools: function () {
      a.toolbox.show(["colorPicker", "noise"]);
    },
  };
};

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

App.PaintMode = function (a) {
  function b(a, b) {
    c(a, b);
  }
  function c(b, c) {
    if (
      b.length &&
      (a.layerModel.setFaceColor(
        b[0].face,
        a.toolbox.refs.colorPicker.getColor(
          a.toolbox.refs.noise.isEnabled()
        )
      ),
      a.toolbox.refs.mirror.isEnabled() &&
        a.layerModel.setFaceColor(
          a.model.getMirroredFace(b[0]),
          a.toolbox.refs.colorPicker.getColor(
            a.toolbox.refs.noise.isEnabled()
          )
        ),
      "size2" == a.toolbox.refs.brushSize.getSize() ||
        "size3" == a.toolbox.refs.brushSize.getSize())
    ) {
      var d = 4,
        e = 10;
      if ("size3" == a.toolbox.refs.brushSize.getSize()) var e = 20;
      for (var f = c.left - e; f < c.left + e; f += d)
        for (var g = c.top - e; g < c.top + e; g += d)
          if (
            ((b = a.model.pingIntersets({ left: f, top: g })),
            b.length > 0 &&
              (a.layerModel.setFaceColor(
                b[0].face,
                a.toolbox.refs.colorPicker.getColor(
                  a.toolbox.refs.noise.isEnabled()
                )
              ),
              a.toolbox.refs.mirror.isEnabled()))
          ) {
            var h = a.model.getMirroredFace(b[0]);
            h &&
              a.layerModel.setFaceColor(
                a.model.getMirroredFace(b[0]),
                a.toolbox.refs.colorPicker.getColor(
                  a.toolbox.refs.noise.isEnabled()
                )
              );
          }
    }
  }
  function d() {
    a.layerPresenter.checkpoint(true);
  }
  return {
    getName: function () {
      return "ecmPaint";
    },
    getTitle: function () {
      return "Paint Tool";
    },
    getKey: function () {
      return "p";
    },
    mousedown: b,
    mousemove: c,
    mouseup: d,
    getCursorHoverUrl: function () {
      return "crosshair";
    },
    getCursorDownUrl: function () {
      return "crosshair";
    },
    showTools: function () {
      a.toolbox.show(["colorPicker", "brushSize", "mirror", "noise"]);
    },
  };
};

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

App.SquareMode = function (a, b) {
  function c(a, b) {
    g = b;
  }
  function d(b, c) {
    for (var d in h)
      h.hasOwnProperty(d) && a.model.setFaceColor(h[d].ref, h[d].color);
    var f = {},
      i = {};
    g.left > c.left
      ? ((f.left = c.left), (i.left = g.left))
      : ((f.left = g.left), (i.left = c.left)),
      g.top > c.top
        ? ((f.top = c.top), (i.top = g.top))
        : ((f.top = g.top), (i.top = c.top));
    for (var j = f.left; j < i.left; j += 5)
      for (var k = f.top; k < i.top; k += 5) {
        var b = a.model.pingIntersets({ left: j, top: k });
        b[0] &&
          (e(b[0].face),
          a.toolbox.refs.mirror.isEnabled() &&
            e(a.model.getMirroredFace(b[0])));
      }
  }
  function e(b) {
    var c = b.faceIndex + "," + b.groupIndex;
    if (!h[c]) {
      var d = new THREE.Color(b.color);
      h[c] = { ref: b, color: d };
    }
    a.model.setFaceColor(
      b,
      a.toolbox.refs.colorPicker.getColor(a.toolbox.refs.noise.isEnabled())
    );
  }
  function f() {
    for (var b in h)
      h.hasOwnProperty(b) &&
        a.layerModel.setFaceColor(h[b].ref, h[b].ref.color);
    a.layerModel.renderModel(),
      a.layerPresenter.updateLayerThumbnail(),
      (h = {}),
      a.layerPresenter.checkpoint(true);
  }
  var g,
    h = {};
  return {
    getName: function () {
      return "ecmSquare";
    },
    getTitle: function () {
      return "Rectangle Tool";
    },
    getKey: function () {
      return "r";
    },
    mousedown: c,
    mousemove: d,
    mouseup: f,
    getCursorHoverUrl: function () {
      return "move";
    },
    getCursorDownUrl: function () {
      return "move";
    },
    showTools: function () {
      a.toolbox.show(["colorPicker", "noise", "mirror"]);
    },
  };
};

$(function () {
  App.Editor($("#drawing"), $("#toolbar"), $("#toolbox")),
    $("body").addClass("loaded");
});

App.Toolbar = function (a, b) {
  "use strict";
  function c() {
    d(h);
  }
  function d(c) {
    b.toolbox.hideAll(),
      j.find("li button").removeClass("active"),
      g && "ecmUndo" != g.getName() && (h = g.getName());
    for (var d = 0; d < i.length; d++)
      if (i[d].getName() == c)
        return (
          (g = i[d]),
          j.find("." + c + " button").addClass("active"),
          g.showTools(),
          void ("ecmImport" == g.getName() || "ecmShare" == g.getName()
            ? a.parent().addClass("wide")
            : a.parent().removeClass("wide"))
        );
    log("ERROR: MODE NOT REGONIZED.");
  }
  function e() {
    d("ecmPaint");
  }
  function f() {
    d("ecmImport");
  }
  var g = false,
    h = "ecmPaint",
    i = [],
    j = $('<ul class = "menu" ></ul>');
  i.push(App.PaintMode(b)),
    i.push(App.SquareMode(b)),
    i.push(App.FillMode(b)),
    i.push(App.FilterMode(b)),
    i.push(App.ShareMode(b, c)),
    i.push(App.ImportMode(b, c));
  for (var k = "", l = 0; l < i.length; l++)
    (k +=
      '<li title="' +
      i[l].getTitle() +
      " [" +
      (l + 1) +
      ']" data-id = "' +
      i[l].getName() +
      '" class = "' +
      i[l].getName() +
      '" ><button ></button></li>'),
      (function (a) {
        b.keys.bind(a + 1 + "", function () {
          d(i[a].getName());
        });
      })(l);
  return (
    j.append(k),
    j.on("mouseup", "li", function () {
      d($(this).attr("data-id"));
    }),
    a.append(j),
    {
      getModeObj: function () {
        return g;
      },
      switchToPrevMode: c,
      changeMode: d,
      changeToDefault: e,
      changeToStart: f,
    }
  );
};

App.Toolbox = function (a, b) {
  "use strict";
  function c(b, c) {
    return d.push([b, c]), (e[b] = c), a;
  }
  var d = [],
    e = {};
  return (
    c("colorPicker", App.ColorPickerTool(a, b)),
    c("brushSize", App.BrushSizeTool(a)),
    c(
      "mirror",
      App.ToggleButtonTool(
        a,
        "mirror",
        "Enable/Disable mirrorinng on head and body."
      )
    ),
    c(
      "noise",
      App.ToggleButtonTool(a, "noise", "Add a 'camo' effect to the stroke.")
    ),
    c("share", App.ShareTool(a, b)),
    c("import", App.ImportTool(a, b)),
    c("filter", App.FilterTool(a, b)),
    {
      refs: e,
      add: c,
      show: function (a) {
        "string" == typeof a && (a = [a]);
        for (var b = 0; b < d.length; b++)
          for (var c = 0; c < a.length; c++)
            a[c] == d[b][0] && d[b][1].show();
      },
      hideAll: function () {
        for (var a = 0; a < d.length; a++) d[a][1].hide();
      },
    }
  );
};

App.BrushSizeTool = function (a) {
  "use strict";
  var b = "size1",
    c = $(
      '<ul title = "Brush Sizes" class = "button-group sizes"><li class = "size1 active"></li><li class = "size2"></li><li class = "size3"></li></ul>'
    );
  return (
    a.append(c),
    c.children().mousedown(function (a) {
      c.children().removeClass("active"),
        (b = $(this).attr("class")),
        $(this).addClass("active"),
        a.preventDefault();
    }),
    {
      getSize: function () {
        return b;
      },
      hide: function () {
        c.hide();
      },
      show: function () {
        c.show();
      },
    }
  );
};

App.ColorPickerTool = function (a, b) {
  "use strict";
  function c() {
    o.addClass("active"), (m = true);
  }
  function d(a) {
    (m = false),
      o.removeClass("active"),
      n.removeClass("transparent-active"),
      a && f(a);
  }
  function e(a) {
    if (!a || k.isAlpha()) return k;
    var b = k.getHSL();
    return b.l >= 0.5
      ? new THREE.Color(k).setHSL(b.h, b.s, b.l - Math.random() / 8)
      : new THREE.Color(k).setHSL(b.h, b.s, b.l + Math.random() / 10);
  }
  function f(a) {
    a.isAlpha()
      ? k.isAlpha() || n.addClass("transparent-active")
      : (r.wheelColorPicker("setValue", a.getHexString()),
        k.isAlpha() && n.removeClass("transparent-active")),
      (k = a.clone()),
      (localStorage.currentColor = JSON.stringify(k));
  }
  function g(a) {
    a || (a = k.getHexString()),
      l.indexOf(a) != -1 ||
        k.isAlpha() ||
        (l.push(a), l.length > 24 && l.shift(), h());
  }
  function h() {
    var a = "";
    (a +=
      '<div data-color = "ffffff" style = "background:#ffffff"> </div>'),
      (a +=
        '<div data-color = "000000" style = "background:#000000"> </div>');
    for (var b = 0; b < l.length; b++)
      "ffffff" != l[b] &&
        "000000" != l[b] &&
        (a +=
          '<div data-color = "' +
          l[b] +
          '" style = "background:#' +
          l[b] +
          '"> </div>');
    q.html(a), (localStorage.recentColors = JSON.stringify(l));
  }
  function i(a) {
    n.addClass("transparent-active"),
      a.isAlpha()
        ? n.find(".jQWCP-wPreview").css("background", "")
        : (a.getHexString || (a = new THREE.Color().setRGB(a.r, a.g, a.b)),
          n
            .find(".jQWCP-wPreview")
            .css("background", "#" + a.getHexString()));
  }
  function j() {
    var a = [];
    b.model.loopOverFaces(function (b) {
      b.color.isAlpha() ||
        a.push([256 * b.color.r, 256 * b.color.g, 256 * b.color.b]);
    });
    for (
      var c = MMCQ.quantize(a, 22), d = c.palette(), e = d.length - 1;
      e >= 0;
      e--
    ) {
      var f = new THREE.Color().setRGB(
        d[e][0] / 256,
        d[e][1] / 256,
        d[e][2] / 256
      );
      g(f.getHexString());
    }
  }
  var k = new THREE.Color();
  if (null === localStorage.getItem("recentColors"))
    var l = [
      "ffffff",
      "c0c0c0",
      "808080",
      "000000",
      "ff0000",
      "800000",
      "ffff00",
      "808000",
      "00ff00",
      "008000",
      "00ffff",
      "008080",
      "0000ff",
      "000080",
      "ff00ff",
      "800080",
    ];
  else var l = JSON.parse(localStorage.getItem("recentColors"));
  var m = false,
    n = $('<div class = "colorpicker" ></div>'),
    o = $('<div title = "Color Picker" class = "dropper"></div>'),
    p = $('<div class = "transparent" > </div>'),
    q = $('<div class = "recent" ></div>'),
    r = $('<input type="text" >');
  return (
    n.append(p),
    n.append(o),
    n.append(r),
    n.append(q),
    a.append(n),
    r.wheelColorPicker({
      layout: "block",
      sliders: "whsvp",
      preview: true,
      format: "css",
    }),
    r.on("slidermove", function () {
      var a = r.wheelColorPicker("getColor"),
        b = new THREE.Color().setRGB(a.r, a.g, a.b);
      b.protectAlpha(), f(b);
    }),
    p.click(function () {
      if (k.isAlpha()) {
        var a = r.wheelColorPicker("getColor");
        f(new THREE.Color().setRGB(a.r, a.g, a.b));
      } else f(new THREE.Color().setAlpha());
    }),
    o.mouseup(function () {
      c();
    }),
    q.on("click", "div", function () {
      var a = parseInt("0x" + $(this).attr("data-color"), 16);
      f(new THREE.Color(a).protectAlpha());
    }),
    h(),
    f(new THREE.Color().setRGB(1, 0, 0)),
    $(".jQWCP-wWidget").width(a.width()),
    {
      getColor: e,
      setColor: f,
      hide: function () {
        n.hide();
      },
      show: function () {
        n.show();
      },
      addRecentColor: g,
      isDropperActive: function () {
        return m;
      },
      dropperDeactivate: d,
      preveiwColor: i,
      addRecentColorsFromFaces: j,
    }
  );
};

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

App.ImportTool = function (a, b) {
  "use strict";
  var c = false,
    d = $('<div id = "import" ></div>'),
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

  // Disable randomiser button, as it no longer functions
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
            "skin",
            d[0]
          )
        );
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
      var d = $(this),
        e = [
          "39134,gt9/my-base",
          "35127,f06/unfinished",
          "35712,fcm/girl-base",
          "34428,dKG/mudkip",
          "32040,cRL/jabu-jabu-baby",
          "29273,bQx/male-base",
          "29225,bPC/fakeface039s-base-fixed",
          "28992,bK7/pikaychuu",
          "27747,bgb/mrqwertz112-the-blue-raccon",
          "27272,b53/ggirl1234-base",
          "25895,9zz/stone-creeper",
          "17807,6B2/just-a-random-base",
          "7782,2Tf/bear-bear",
          "9802,3D5/skin-de-mrcrackhd",
          "4195,1yg/white-beard-man-base",
          "409,7Y/baseforstheskini039mdoing",
          "1766,Fy/simple-smiley-skin-with-creeper-face",
          "1812,Gr/pedobear",
          "2109,N8/nude-man",
          "2271,Rg/red-panda",
          "2310,S1/noob",
          "962,lB/pig-man",
          "948,lk/starbound-avian",
          "1617,BH/robot-guy",
          "1439,xg/hulk-18-skin",
          "1409,wH/super-sonic",
          "1390,wk/cyan-slime",
          "1371,vY/the-devil",
          "1316,tV/stickman",
          "1255,sK/naked-angel",
          "1092,p5/cat-skin",
          "3172,19B/robotsteveorange",
          "3146,195/josh-base",
          "3140,18Z/bubblekinz",
          "3126,18J/werk",
          "3100,18c/paddler",
          "3088,17Z/cookieman",
          "3031,16T/anime-cat",
          "3017,16C/jamie",
          "3007,16q/stupidcupid",
          "2933,150/poulet",
          "2874,13S/bmo",
        ],
        f = [
          "10105,3KW/t-shirt-ghost",
          "11523,4gb/green-shirt",
          "12822,4L9/requests",
          "18413,6PH/white-tee-shirt",
          "18413,6PH/white-tee-shirt",
          "26020,9CZ/spider-jacket",
          "25946,9By/nice-creeper-sweater-for-boys",
          "26046,9Dt/shirt",
          "27433,b88/space-armor",
          "29156,bNh/hoodie-with-hood-on",
          "29793,c1x/green-lined-black-jacket",
          "31774,cLD/pull-redstone",
          "32689,d5d/dirt-shirt",
          "32683,d56/creeper-shirt",
          "36141,fmC/enchanting-jacket",
          "36228,fph/fluttershy-hoodie",
          "36230,fpk/rarity-hoodie",
          "36232,fpm/pinkie-pie-hoodie",
          "36570,fwS/applejack-hoodie",
          "36579,fx2/dr-whooves-hoodie",
          "37220,fMm/dj-pon3-hoodie",
          "37887,g1b/vinyl-scratch-hoodie",
          "37906,g1y/cactus-thorn-hoodie",
          "37977,g2W/gold-cuff-jacket",
          "38996,gqw/pirate-shirt",
          "37010,fHk/barbarian-body-armor",
          "2506,WN/golden-boobplate",
          "2336,Sw/sweatshirt",
          "2103,N2/sweatshirt",
          "2100,MZ/sweatshirt",
          "2062,Mf/jaquette",
          "2064,Mh/blouse",
          "2065,Mj/military-shirt",
          "2061,Md/blue-shirt",
          "2060,Mc/military-shirt",
          "2059,Mb/jaquette",
          "2058,M9/shirt",
          "1675,CP/rainbow",
          "1875,HF/vest",
          "1275,t6/sweater-lavender",
          "1273,t4/sweater-mint",
          "1198,rD/grey-amp-terqoiuse-hoodie",
          "1202,rJ/hoodie-grey-amp-black",
          "1260,sQ/steve-shirt",
          "1049,ng/basic",
          "377,7l/red-hoodie-accessory",
          "1737,F0/bear-skin",
          "2530,Xf/golden-rugged-armor",
          "1480,y3/3d-diamond-armour",
          "67,1j/reactive-armor",
          "1702,Dk/armour",
          "2264,R7/hoodie-with-shades",
          "3111,18q/gtnerd30039s-hoodie",
          "3081,17R/karate-gi-with-hood",
          "2057,M8/costume",
          "294,5L/green-cloak",
          "183,3C/ash039s-outfit",
          "166,3c/a-short-tuxedo",
        ],
        g = [
          "36708,fzw/survey-corps-cloak",
          "35662,fbp/lord-part-1",
          "33475,dnl/jacket-layer-bag",
          "32690,d5f/survivalpvp-gear",
          "28952,bJm/survey-corps-cloak",
          "id/slug: 25219,9kz/pokemon-trainer-hat-and-pack",
          "25375,9nz/diamond-gogglesglasses",
          "18400,6Pr/dual-diamond-swords",
          "17853,6BW/bow",
          "19216,767/robot-arm",
          "20385,7xC/infection",
          "21351,7Vb/sly-shirthoodie",
          "18666,6Vy/scarf",
          "31989,cQM/the-waterbender039s-arsenal",
          "437,8v/gold-seeker-glasses",
          "2465,W0/future-army-helmet",
          "2379,Tl/headphones-pink-speckled1",
          "2374,Tf/graduation-cap",
          "1110,pX/wehrmacht-general039s-cap",
          "1108,pV/wehrmacht-infantry-officer039s-cap",
          "1019,mH/top-hat",
          "380,7p/crown-2",
          "65,1g/3d-bling",
          "64,1f/robot-arm-18",
          "184,3D/basic-sash",
          "381,7q/back-pack",
          "828,j1/quiver",
          "822,hV/diamond-sword",
          "676,f5/pink-sword",
          "1687,D2/sun-glasses",
          "1852,Hc/headphones",
          "1895,J2/bow-with-daimond-arrow",
          "2049,M0/backpack",
          "2156,P3/angel-wings",
          "1955,Kb/gray-stripes",
        ],
        h = [
          "32272,cXc/green-pants-with-shoes",
          "25200,9kc/camo-pants-v1",
          "21346,7V5/boxers",
          "6048,2dV/timber-overalls",
          "6163,2h6/suspenders",
          "5891,29T/pink-fluffies",
          "8914,3j1/cobalt-man-mk-3-dif-color-leggings",
          "34235,dFY/stripey-shorts",
          "1052,nk/basic",
          "706,fG/pants",
          "319,6d/blue-pants",
          "1219,s2/terqouise-amp-black-short-shorts",
          "1543,zg/shorts",
          "1547,zl/shorts",
          "2053,M4/jean",
          "2052,M3/jean",
          "1555,zv/shorts",
          "1553,zs/shorts",
          "2054,M5/caleccedilon",
          "2055,M6/jean",
          "2056,M7/jean",
        ],
        i = [];
      b.layerModel.removeAll(),
        d.hasClass("loading") ||
          (d.addClass("loading"),
          $.when(
            $.Deferred(function (a) {
              setTimeout(a.resolve, 1e3);
            }),
            a(g),
            a(f),
            a(h),
            a(e)
          ).always(c));
    }));
  return (
    f.append(j),
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
        .setUVImage(URL.createObjectURL(a.target.files[0]), "skin")
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

App.InputButton = function (a, b) {
  "use strict";
  var c,
    d,
    e = $('<div class = "message" ></div>'),
    f = $(
      '<button class = "top-heavy">Import Minecraft.net skin</button>'
    ).mousedown(function () {
      if ((d && c(), "" != g.val())) {
        // e.hide(), f.addClass("loading");
        // var a = f.find("li").text();
        // f.find("li").text("Searching...");
        var h = g.val();
        //   i =
        //     App.URL.root +
        //     "ncsassets/sip.php?name=" +
        //     h +
        //     "&" +
        //     new Date().getTime();
        //   i = "http://textures.minecraft.net/texture/c4ffe4ce9348035722f3f1e6f5cb8e2cf7f0a260790791cb0098d4ad081468b";
        // b.transporter
        //   .setUVImage(i, "skin")
        //   .always(function () {
        //     f.find("li").text(a), f.removeClass("loading"), d && d();
        //   })
        //   .done(function () {
        //     g.val(""),
        //       b.toolbar && b.toolbar.changeToDefault(),
        //       b.layerPresenter && b.layerPresenter.checkpoint(true),
        //       b.colorPicker &&
        //         b.toolbox.refs.colorPicker.addRecentColorsFromFaces(),
        //       ga("send", "event", "editor", "import minecraft.net skin", h);
        //   })
        //   .fail(function () {
        //     e.text("Could not find a user with that name.").show();
        //   });
        setMinecraftSkin({ b: b, f: f, d: d, g: g, e: e }, h);
      } else e.text("Please enter a minecraft username.").show();
    }),
    g = $(
      '<input type="text" placeholder = "Enter a Minecraft username i.g. Honeydew" />'
    ).keypress(function (a) {
      13 == a.keyCode && f.mousedown();
    });
  return (
    a.append(
      $('<div class = "inputButton" ></div>')
        .append(g)
        .append(f)
        .append(e.hide())
    ),
    {
      reset: function () {
        e.hide(), g.val("");
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

App.SearchPanel = function (a, b) {
  "use strict";
  function c() {
    "" != n.val() &&
      (o.html('<div class = "message" > Searching.... </div>'),
      d({
        type: "get",
        url: App.URL.root + "api/search",
        data: { search: n.val(), count: 8, page: 1 },
      }));
  }
  function d(a) {
    return (
      (g = a),
      $.ajax(a).done(function (a) {
        o.html(e(a));
      })
    );
  }
  function e(a) {
    var b = "";
    if (a) {
      for (var c = a.data, d = 0; d < c.length; d++)
        b +=
          '<img data-id = "' +
          c[d].id +
          '" data-save = "' +
          c[d].images.save.aws +
          '" src="' +
          c[d].images.thumbnail.https +
          '" >';
      0 == c.length &&
        (b += '<div class = "message" > No skins found. </div>'),
        a.last_page != a.current_page &&
          ((b += '<div class = "pagination"> <ul class="button-group">'),
          (b +=
            1 == a.current_page
              ? '<li class="disabled">«</li>'
              : "<li>«</li>"),
          (b +=
            a.current_page == a.last_page
              ? '<li class="disabled right">»</li>'
              : '<li class = "right">»</li>'),
          (b += "</ul></div>"));
    }
    return b;
  }
  function f() {
    h && i && (o.html(e(h)), (g = i)), n.val("");
  }
  var g,
    h,
    i,
    j,
    k,
    l = $('<div class = "loading"><div class="spinner"></div></div>'),
    m = $('<div class = "search"></div>'),
    n = $(
      '<input class="search" style="display: none;" placeholder = "Search for a skin or part...." type="text">'
    ),
    o = $('<div class = "skins"></div>');
  return (
    n.keyup(function (a) {
      13 == a.which && c(), "" == n.val() && f();
    }),
    m.on("click", ".pagination li:not(.disabled)", function (a) {
      a.preventDefault(),
        a.stopPropagation(),
        $(this).hasClass("right") ? (g.data.page += 1) : (g.data.page -= 1),
        o.html('<div class = "message" > Loading.... </div>'),
        d(g);
    }),
    m.on("click", "img", function () {
      k && k();
      $(this);
      l.show(),
        b.transporter
          .setUVImage(
            $(this).attr("data-save"),
            "skin",
            $(this).attr("data-id")
          )
          .done(function () {
            l.hide(),
              b.toolbar && b.toolbar.changeToDefault(),
              b.layerPresenter && b.layerPresenter.checkpoint(true),
              j && j();
          });
    }),
    App.config.userId
      ? ((i = {
          type: "get",
          url: App.URL.root + "api/author",
          data: { user_id: App.config.userId, count: 8, page: 1 },
        }),
        d(i).done(function (a) {
          h = a;
        }))
      : (App.data && App.data.randomSkins
          ? ((h = App.data.randomSkins),
            (i = true),
            (h.total = 8),
            (h.current_page = h.last_page))
          : (h = void 0),
        o.html(e(h))),
    m.append(n),
    m.append(o),
    a.append(m),
    {
      hide: function () {
        m.hide();
      },
      show: function () {
        m.show(), f();
      },
      beforeSkinLoad: function (a) {
        k = a;
      },
      afterSkinLoad: function (a) {
        j = a;
      },
    }
  );
};

App.SkinLoaderPanel = function (a, b) {
  a.append("<hr>");
  var c = new App.InputButton(a, b);
  a.append("<hr>");
  var d = new App.FileButton(a, b);
  a.append("<hr>");
  var e = new App.SearchPanel(a, b);
  return {
    beforeSkinLoad: function (a) {
      e.beforeSkinLoad(a), c.beforeSkinLoad(a), d.beforeSkinLoad(a);
    },
    afterSkinLoad: function (a) {
      e.afterSkinLoad(a), c.afterSkinLoad(a), d.afterSkinLoad(a);
    },
  };
};

App.ShareTool = function (a, b) {
  "use strict";
  var c = $('<div id = "share" ></div>'),
    d = $('<div class = "panel" ></div>'),
    e = $('<div class = "message"></div>'),
    f = $('<div class = "square" ></div>'),
    g = new App.Spinner(d),
    h = $("<button>Change Minecraft.net skin</button>").click(function (a) {
      b.transporter.minecraftNet();
    }),
    i = $("<button>Download to Computer</button>").mousedown(function (a) {
      b.transporter.download();
    }),
    j = $("<button disabled>Share to Gallery</button>").mousedown(function (
      a
    ) {
      l.html($("#sharegalleryform").html()), l.show(), k.hide();
    }),
    k = $("<div></div>"),
    l = $("<div></div>").on("click", "button", function (a) {
      a.preventDefault(),
        a.stopPropagation(),
        App.LOGIN.check(
          "You need to login before you can upload. Don't worry it only takes a second."
        )
          .done(function () {
            g.show();
            var a = b.transporter.getUVImage("frontBack", true),
              c = b.transporter.getUVImage("skin", true),
              d = [];
            b.layerModel.loop(function (a) {
              a.skinId && d.push(a.skinId);
            }),
              $.ajax({
                url: App.URL.root + "api/add",
                type: "post",
                data: {
                  name: l.find(".name input").val(),
                  description: l.find("textarea").val(),
                  category: l
                    .find(".category option:selected")
                    .attr("value"),
                  part: l.find(".part option:selected").attr("value"),
                  thumbnail: a.src,
                  save: c.src,
                  related: d,
                },
              })
                .always(function (a) {
                  g.hide(), e.show();
                })
                .done(function (a) {
                  e.html(a.message), l.find("form").slideUp();
                })
                .fail(function (a) {
                  a.responseJSON && a.responseJSON.message
                    ? e.html(a.responseJSON.message)
                    : e.html(
                        "An unknown error occured. <br> Please try again."
                      );
                });
          })
          .fail(function () {
            e.text(
              "You will need to login to upload your skin to the gallery."
            ),
              e.slideDown();
          });
    });
  l.on("keyup", "input, textarea", function (a) {
    13 == a.which &&
      (a.preventDefault(),
      a.stopPropagation(),
      l.find("button").mousedown());
  });
  var m = $(
    '<div class = "grabber" ><img class = "checker-border print3d" src="ncsassets/img/2.jpg">' +
      "<button disabled>Print in 3d!</button></div>"
  ).click(function () {
    // b.transporter.print3d();
  });
  return (
    f.append($("<h2> Choose an option for export</h2>")),
    f.append(j),
    f.append(h),
    f.append(i),
    d.append(e.hide()),
    d.append(l.hide()),
    d.append(k),
    k.append(m),
    c.append(d),
    c.append(f),
    a.append(c),
    {
      hide: function () {
        c.hide();
      },
      show: function () {
        c.show(), l.hide(), e.hide(), k.show();
      },
    }
  );
};

App.Spinner = function (a) {
  "use strict";
  var b = $('<div class = "loading"><div class="spinner"></div></div>');
  return (
    a.append(b.hide()),
    {
      hide: function () {
        b.hide();
      },
      show: function () {
        b.show();
      },
    }
  );
};

App.ToggleButtonTool = function (a, b, c) {
  "use strict";
  var d = false,
    e = $(
      '<button title = "' +
        c +
        '"class = "toggle" id = "' +
        b +
        '" ></button>'
    );
  return (
    a.append(e),
    e.click(function (a) {
      e.toggleClass("active"), (d = !d), a.preventDefault();
    }),
    {
      isEnabled: function () {
        return d;
      },
      hide: function () {
        e.hide();
      },
      show: function () {
        e.show();
      },
    }
  );
};

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

App.affines = App.affines || {};

/* Custom Scripts by Moxvallix */

function setMinecraftSkin(variables, name) {
  $.get("api/mojang/users/profiles/minecraft/" + name, function (data) {
    getMinecraftPlayerData(variables, data);
  });
}

function getMinecraftPlayerData(variables, data) {
  $.get(
    "api/mojangsessions/session/minecraft/profile/" + data.id,
    function (data) {
      getMinecraftSkinURL(variables, data);
    }
  );
}

function getMinecraftSkinURL(variables, data) {
  var json = JSON.parse(atob(data.properties[0].value));
  var skin = json.textures.SKIN.url;
  var url = skin.replace("http://textures.minecraft.net/", "/api/minecraft/");
  updateMinecraftSkinViewer(variables, url);
}

function updateMinecraftSkinViewer(vars, url) {
  vars.b.transporter
    .setUVImage(url, "skin")
    .always(function () {
      vars.f.find("li").text(vars.a),
        vars.f.removeClass("loading"),
        vars.d && d();
    })
    .done(function () {
      vars.g.val(""),
        vars.b.toolbar && vars.b.toolbar.changeToDefault(),
        vars.b.layerPresenter && vars.b.layerPresenter.checkpoint(true),
        vars.b.colorPicker &&
          vars.b.toolbox.refs.colorPicker.addRecentColorsFromFaces();
      // vars.ga("send", "event", "editor", "import minecraft.net skin", vars.h);
    })
    .fail(function () {
      vars.e.text("Could not find a user with that name.").show();
    });
}

// https://stackoverflow.com/questions/3916191/download-data-url-file

function download(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
