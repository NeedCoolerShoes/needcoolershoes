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
    log("ERROR: MODE NOT RECOGNIZED.");
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
