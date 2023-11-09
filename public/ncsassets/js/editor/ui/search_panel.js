App.SearchPanel = function (a, b) {
  "use strict";
  var currentModel = (App.UVMAP.current == "skinAlex" ? "slim" : "classic")
  function c() {
    "" != n.val() &&
      (o.html('<div class = "message" > Searching.... </div>'),
      d({
        type: "get",
        url: window.location.origin + "/gallery.json",
        data: { search: n.val(), items: 8, page: 1, model: currentModel },
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
  function formatText(text, format = {}) {
    for (const [key, value] of Object.entries(format)) {
      text = text.replaceAll(`%${key}%`, value.toString())
    }
    return text;
  }
  function getSkin2d(skinData) {
    var format = {
      id: skinData.id, url: skinData.url, attribution: skinData.author.attribution_message,
      suffix: (skinData.model == "slim" ? "-slim" : ""), data: skinData.image, name: skinData.name,
      author: skinData.author.display_name
    }
    return formatText(skinTemplate, format)
  }
  function e(result) {
    var b = "";
    if (result) {
      for (var skins = result.skins, d = 0; d < skins.length; d++)
        b += getSkin2d(skins[d]);
      0 == skins.length &&
        (b += '<div class = "message" > No skins found. </div>'),
        result.page.total > 1 &&
          ((b += '<div class = "pagination"> <ul class="button-group">'),
          (b +=
            1 == result.page.current
              ? '<li class="disabled">«</li>'
              : "<li>«</li>"),
          (b +=
            result.page.current == result.page.total
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
      '<input class="search" placeholder = "Search for a skin or part...." type="text">'
    ),
    o = $('<div class = "skins"></div>');
  var skinTemplate = document.getElementById("skin-2d").innerHTML
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
    m.on("click", ".skin", function () {
      k && k();
      $(this);
      l.show(),
        b.transporter
          .setUVImage(
            $(this).attr("data-save"),
            App.UVMAP.current,
            $(this).attr("data-id")
          )
          .done(function () {
            l.hide(),
              b.toolbar && b.toolbar.changeToDefault(),
              b.layerPresenter && b.layerPresenter.checkpoint(true),
              j && j();
          });
    }),
    ((i = {
      type: "get",
      url: window.location.origin + "/gallery.json",
      data: { items: 8, page: 1, order: 'random', model: currentModel },
    }),
    d(i).done(function (a) {
      h = a;
    })),
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
