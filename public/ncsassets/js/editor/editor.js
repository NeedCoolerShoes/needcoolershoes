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
    (h.redo = new App.Redo(a, h)),
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
    h.keys.bind(["-", "_"], function () {
      h.model.addScale(5);
      if (h.model.fov() >= 180) {
        h.model.scale(175);
      }
    }),
    h.keys.bind(["=", "+"], function () {
      h.model.addScale(-5);
      if (h.model.fov() <= 0) {
        h.model.scale(5);
      }
    }),
    h.keys.bind("left", function () {
      h.model.addPosition(1,0);
    }),
    h.keys.bind("right", function () {
      h.model.addPosition(-1,0);
    }),
    h.keys.bind("up", function () {
      h.model.addPosition(0,-1);
    }),
    h.keys.bind("down", function () {
      h.model.addPosition(0,1);
    }),
    h.keys.bind(["0", "enter", "space", "ins"], function () {
      h.model.animateExact({ x: 0, y: 0 });
      h.model.scale(70);
      h.model.position(0,-1);
    }),
    h.keys.bind(["g", "G"], function () {
      h.model.toggleGrid();
    }),
    h.model.$dom
      .mousedown(function (a) {
        a.originalEvent.preventDefault();
        var cursorOffset = h.model.cursorOffset(a),
          intersectingObjects = h.model.pingIntersects(cursorOffset);
        if (h.toolbox.refs.colorPicker.isDropperActive()) {
          if (intersectingObjects.length && intersectingObjects.length > 0) {
            let color = h.layerModel.getFaceColorFromAll(intersectingObjects[0].face);
            if (color.r == 0 && color.g == 1 && color.b == 0 && intersectingObjects.length > 1) {
              color = h.layerModel.getFaceColorFromAll(intersectingObjects[1].face);
            }
            h.toolbox.refs.colorPicker.dropperDeactivate(color)
          } else {
            h.toolbox.refs.colorPicker.dropperDeactivate();
            g(h.toolbar.getModeObj().getCursorHoverUrl());
          }
        } else {
          if (
            intersectingObjects.length &&
            intersectingObjects.length > 0 &&
            "grab" != h.toolbar.getModeObj().getCursorHoverUrl()
            )
          {
              l = "drawing";
              h.toolbar.getModeObj().mousedown(intersectingObjects, cursorOffset);
              g(h.toolbar.getModeObj().getCursorDownUrl());
          } else {
            l = "drag";
            i = cursorOffset;
            h.toolbox.refs.colorPicker.addRecentColor();
            h.model.render();
          }
        }
      })
      .mousemove(function (a) {
        a.preventDefault();
        var cursorOffset = h.model.cursorOffset(a),
          intersectingObjects = h.model.pingIntersects(cursorOffset);
        if (h.toolbox.refs.colorPicker.isDropperActive()) {
            l = "dropper";
            g("crosshair");
            if (intersectingObjects.length && intersectingObjects.length > 0) {
              let color = h.layerModel.getFaceColorFromAll(intersectingObjects[0].face);
              if (color.r == 0 && color.g == 1 && color.b == 0 && intersectingObjects.length > 1) {
                color = h.layerModel.getFaceColorFromAll(intersectingObjects[1].face);
              }
              h.toolbox.refs.colorPicker.previewColor(color);
            }
        } else if (h.toolbar.getModeObj() && "drawing" == l) {
          if (intersectingObjects.length > 0) {
            if (cursorOffset && j) {
              var d = e(j, cursorOffset),
                m = f(j, cursorOffset);
              if (d > 5)
                for (var n = 0; n < d; n += 4) {
                  var o = j.left + Math.sin(m) * n,
                    p = j.top + Math.cos(m) * n,
                    q = { left: o, top: p };
                  h.toolbar
                    .getModeObj()
                    .mousemove(h.model.pingIntersects(q), q);
                }
            }
            h.toolbar.getModeObj().mousemove(intersectingObjects, cursorOffset), (j = cursorOffset), (k = false);
          } else k || (k = cursorOffset);
          g(h.toolbar.getModeObj().getCursorDownUrl());
        } else
          "drag" == l
            ? (h.model.rotateTo({ y: i.left - cursorOffset.left, x: i.top - cursorOffset.top }),
              (i = cursorOffset),
              g("grabbing"))
            : g(
                intersectingObjects.length && intersectingObjects.length > 0
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
