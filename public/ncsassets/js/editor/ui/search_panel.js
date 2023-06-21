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
