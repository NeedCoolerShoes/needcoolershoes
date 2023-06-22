App.InputButton = function (a, b) {
  "use strict";
  var c,
    d,
    e = $('<div class = "message" ></div>'),
    f = $(
      '<button class = "top-heavy">Import Minecraft.net skin</button>'
    ).mousedown(function () {
      if ((d && c(), "" != g.val())) {
        e.hide(), f.addClass("loading");
        var a = f.find("li").text();
        f.find("li").text("Searching...");
        var h = g.val();
        var i = "/api/skin/" + h
        b.transporter
          .setUVImage(i, App.UVMAP.current)
          .always(function () {
            f.find("li").text(a), f.removeClass("loading"), d && d();
          })
          .done(function () {
            g.val(""),
              b.toolbar && b.toolbar.changeToDefault(),
              b.layerPresenter && b.layerPresenter.checkpoint(true),
              b.colorPicker &&
              b.toolbox.refs.colorPicker.addRecentColorsFromFaces()
              // g.a("send", "event", "editor", "import minecraft.net skin", h);
          })
          .fail(function () {
            e.text("Could not find a user with that name.").show();
          });
      } else e.text("Please enter a minecraft username.").show();
    }),
    g = $(
      '<input type="text" class="text-sm" placeholder = "Enter a Minecraft username i.g. Honeydew" />'
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
