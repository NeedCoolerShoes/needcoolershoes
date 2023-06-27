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
