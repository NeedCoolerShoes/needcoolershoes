{
  !(function (a) {
    var b,
      c = a(window),
      d = {},
      e = [],
      f = [],
      g = !1,
      h = !1,
      i = null,
      j = null,
      k = null,
      l = null,
      m = "_open",
      n = "_close",
      o = null,
      p = {
        _init: function (b) {
          var c = a(b),
            d = c.data("popupoptions");
          (f[b.id] = !1),
            (e[b.id] = 0),
            c.data("popup-initialized") ||
              (c.attr("data-popup-initialized", "true"), p._initonce(b)),
            d.autoopen &&
              setTimeout(function () {
                p.show(b, 0);
              }, 0);
        },
        _initonce: function (c) {
          var d,
            e = a("body"),
            f = $el.data("popupoptions");
          if (
            ((l = parseInt(e.css("margin-right"), 10)),
            "tooltip" == f.type && ((f.background = !1), (f.scrolllock = !1)),
            f.scrolllock)
          ) {
            var g, h;
            "undefined" == typeof b &&
              ((g = a(
                '<div style="width:50px;height:50px;overflow:auto"><div/></div>'
              ).appendTo("body")),
              (h = g.children()),
              (b = h.innerWidth() - h.height(99).innerWidth()),
              g.remove());
          }
          if (
            ($el.attr("id") ||
              $el.attr("id", "j-popup-" + parseInt(1e8 * Math.random())),
            $el.addClass("popup_content"),
            e.prepend(c),
            $el.wrap('<div id="' + c.id + '_wrapper" class="popup_wrapper" />'),
            (d = a("#" + c.id + "_wrapper")),
            d.css({
              opacity: 0,
              visibility: "hidden",
              position: "absolute",
              overflow: "auto",
            }),
            $el.css({
              opacity: 0,
              visibility: "hidden",
              display: "inline-block",
            }),
            f.setzindex && !f.autozindex && d.css("z-index", "2001"),
            f.outline || $el.css("outline", "none"),
            f.transition &&
              ($el.css("transition", f.transition),
              d.css("transition", f.transition)),
            a(c).attr("aria-hidden", !0),
            f.background && !a("#" + c.id + "_background").length)
          ) {
            var i =
              '<div id="' +
              c.id +
              '_background" class="popup_background"></div>';
            e.prepend(i);
            var j = a("#" + c.id + "_background");
            j.css({
              opacity: 0,
              visibility: "hidden",
              backgroundColor: f.color,
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }),
              f.setzindex && !f.autozindex && j.css("z-index", "2000"),
              f.transition && j.css("transition", f.transition);
          }
          "overlay" == f.type &&
            ($el.css({
              textAlign: "left",
              position: "relative",
              verticalAlign: "middle",
            }),
            d.css({
              position: "fixed",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              textAlign: "center",
            }),
            d.append('<div class="popup_align" />'),
            a(".popup_align").css({
              display: "inline-block",
              verticalAlign: "middle",
              height: "100%",
            })),
            $el.attr("role", "dialog");
          var k = f.openelement ? f.openelement : "." + c.id + m;
          a(k).each(function (b, c) {
            a(c).attr("data-popup-ordinal", b),
              a(c).attr("id") ||
                a(c).attr("id", "open_" + parseInt(1e8 * Math.random(), 10));
          }),
            $el.attr("aria-labelledby") ||
              $el.attr("aria-label") ||
              $el.attr("aria-labelledby", a(k).attr("id")),
            a(document).on("click", k, function (b) {
              if (!$el.data("popup-visible")) {
                var d = a(this).data("popup-ordinal");
                setTimeout(function () {
                  p.show(c, d);
                }, 0),
                  b.preventDefault();
              }
            });
          var o = f.closeelement ? f.closeelement : "." + c.id + n;
          a(document).on("click", o, function (a) {
            p.hide(c), a.preventDefault();
          }),
            f.detach ? $el.hide().detach() : d.hide();
        },
        show: function (d, m) {
          var n = a(d);
          if (!n.data("popup-visible")) {
            n.data("popup-initialized") || p._init(d),
              n.attr("data-popup-initialized", "true");
            var r = a("body"),
              s = n.data("popupoptions"),
              t = a("#" + d.id + "_wrapper"),
              u = a("#" + d.id + "_background");
            if (
              (q(d, m, s.beforeopen),
              (f[d.id] = m),
              s.detach ? (t.prepend(d), n.show()) : t.show(),
              setTimeout(function () {
                t.css({ visibility: "visible", opacity: 1 }),
                  a("html")
                    .addClass("popup_visible")
                    .addClass("popup_visible_" + d.id),
                  n.addClass("popup_content_visible");
              }, 20),
              n.css({ visibility: "visible", opacity: 1 }),
              s.scrolllock &&
                (r.css("overflow", "hidden"),
                r.height() > c.height() && r.css("margin-right", l + b)),
              setTimeout(function () {
                g ||
                  (s.keepfocus && a(document).on("focusin", i),
                  s.blur && a(document).on("click", j),
                  s.escape && a(document).on("keydown", k)),
                  g ? (h = !0) : (g = !0);
              }, 0),
              n.data("popup-visible", !0),
              p.reposition(d, m),
              s.background &&
                (u.css({ visibility: "visible", opacity: s.opacity }),
                setTimeout(function () {
                  u.css({ opacity: s.opacity });
                }, 0)),
              (o = document.activeElement),
              s.keepfocus &&
                (n.attr("tabindex", -1),
                setTimeout(function () {
                  s.focuselement ? a(s.focuselement).focus() : n.focus();
                }, s.focusdelay),
                (i = function (a) {
                  var b = document.getElementById(d.id);
                  b.contains(a.target) || (a.stopPropagation(), b.focus());
                })),
              s.autozindex)
            ) {
              for (
                var v = document.getElementsByTagName("*"),
                  w = v.length,
                  x = 0,
                  y = 0;
                y < w;
                y++
              ) {
                var z = a(v[y]).css("z-index");
                "auto" !== z && ((z = parseInt(z)), x < z && (x = z));
              }
              (e[d.id] = x),
                e[d.id] > 0 && t.css({ zIndex: e[d.id] + 2 }),
                s.background &&
                  e[d.id] > 0 &&
                  a("#" + d.id + "_background").css({ zIndex: e[d.id] + 1 });
            }
            s.blur &&
              (j = function (b) {
                a(b.target)
                  .parents()
                  .andSelf()
                  .is("#" + d.id) || p.hide(d);
              }),
              s.escape &&
                (k = function (a) {
                  27 == a.keyCode && n.data("popup-visible") && p.hide(d);
                }),
              a(s.pagecontainer).attr("aria-hidden", !0),
              n.attr("aria-hidden", !1),
              t.one("transitionend", function () {
                q(d, m, s.opentransitionend);
              }),
              q(d, m, s.onopen);
          }
        },
        hide: function (b) {
          var c = a("body"),
            d = a(b),
            e = d.data("popupoptions"),
            m = a("#" + b.id + "_wrapper"),
            n = a("#" + b.id + "_background");
          d.data("popup-visible", !1),
            h
              ? (a("html").removeClass("popup_visible_" + b.id), (h = !1))
              : (a("html")
                  .removeClass("popup_visible")
                  .removeClass("popup_visible_" + b.id),
                (g = !1)),
            d.removeClass("popup_content_visible"),
            e.scrolllock &&
              setTimeout(function () {
                c.css({ overflow: "visible", "margin-right": l });
              }, 10),
            e.blur && a(document).off("click", j),
            e.keepfocus &&
              (a(document).off("focusin", i),
              setTimeout(function () {
                a(o).is(":visible") && o.focus();
              }, 0)),
            e.escape && a(document).off("keydown", k),
            m.css({ visibility: "hidden", opacity: 0 }),
            d.css({ visibility: "hidden", opacity: 0 }),
            e.background && n.css({ visibility: "hidden", opacity: 0 }),
            d.one("transitionend", function (a) {
              d.data("popup-visible") ||
                (e.detach ? d.hide().detach() : m.hide()),
                e.notransitiondetach || q(b, f[b.id], e.closetransitionend);
            }),
            e.notransitiondetach && (e.detach ? d.hide().detach() : m.hide()),
            a(e.pagecontainer).attr("aria-hidden", !1),
            d.attr("aria-hidden", !0),
            q(b, f[b.id], e.onclose);
        },
        toggle: function (a, b) {
          $el.data("popup-visible")
            ? p.hide(a)
            : setTimeout(function () {
                p.show(a, b);
              }, 0);
        },
        reposition: function (b, c) {
          var d = a(b),
            e = d.data("popupoptions"),
            f = a("#" + b.id + "_wrapper");
          a("#" + b.id + "_background");
          if (((c = c || 0), "tooltip" == e.type)) {
            f.css({ position: "absolute" });
            var g = e.openelement ? e.openelement : "." + b.id + m,
              h = a(g + '[data-popup-ordinal="' + c + '"]'),
              i = h.offset();
            "right" == e.horizontal
              ? f.css("left", i.left + h.outerWidth() + e.offsetleft)
              : "leftedge" == e.horizontal
              ? f.css(
                  "left",
                  i.left + h.outerWidth() - h.outerWidth() + e.offsetleft
                )
              : "left" == e.horizontal
              ? f.css("right", a(window).width() - i.left - e.offsetleft)
              : "rightedge" == e.horizontal
              ? f.css(
                  "right",
                  a(window).width() - i.left - h.outerWidth() - e.offsetleft
                )
              : f.css(
                  "left",
                  i.left +
                    h.outerWidth() / 2 -
                    d.outerWidth() / 2 -
                    parseFloat(d.css("marginLeft")) +
                    e.offsetleft
                ),
              "bottom" == e.vertical
                ? f.css("top", i.top + h.outerHeight() + e.offsettop)
                : "bottomedge" == e.vertical
                ? f.css(
                    "top",
                    i.top + h.outerHeight() - d.outerHeight() + e.offsettop
                  )
                : "top" == e.vertical
                ? f.css("bottom", a(window).height() - i.top - e.offsettop)
                : "topedge" == e.vertical
                ? f.css(
                    "bottom",
                    a(window).height() - i.top - d.outerHeight() - e.offsettop
                  )
                : f.css(
                    "top",
                    i.top +
                      h.outerHeight() / 2 -
                      d.outerHeight() / 2 -
                      parseFloat(d.css("marginTop")) +
                      e.offsettop
                  );
          } else
            "overlay" == e.type &&
              (e.horizontal
                ? f.css("text-align", e.horizontal)
                : f.css("text-align", "center"),
              e.vertical
                ? d.css("vertical-align", e.vertical)
                : d.css("vertical-align", "middle"));
        },
      },
      q = function (b, c, e) {
        var f = d.openelement ? d.openelement : "." + b.id + m,
          g = a(f + '[data-popup-ordinal="' + c + '"]');
        "function" == typeof e && e(g);
      };
    (a.fn.popup = function (b) {
      return this.each(function () {
        if ((($el = a(this)), "object" == typeof b)) {
          var c = a.extend({}, a.fn.popup.defaults, b);
          $el.data("popupoptions", c),
            (d = $el.data("popupoptions")),
            p._init(this);
        } else "string" == typeof b ? ($el.data("popupoptions") || ($el.data("popupoptions", a.fn.popup.defaults), (d = $el.data("popupoptions"))), p[b].call(this, this)) : ($el.data("popupoptions") || ($el.data("popupoptions", a.fn.popup.defaults), (d = $el.data("popupoptions"))), p._init(this));
      });
    }),
      (a.fn.popup.defaults = {
        type: "overlay",
        autoopen: !1,
        background: !0,
        color: "black",
        opacity: "0.5",
        horizontal: "center",
        vertical: "middle",
        offsettop: 0,
        offsetleft: 0,
        escape: !0,
        blur: !0,
        setzindex: !0,
        autozindex: !1,
        scrolllock: !1,
        keepfocus: !0,
        focuselement: null,
        focusdelay: 50,
        outline: !1,
        pagecontainer: null,
        detach: !1,
        openelement: null,
        closeelement: null,
        transition: null,
        notransitiondetach: !1,
        beforeopen: function () {},
        onclose: function () {},
        onopen: function () {},
        opentransitionend: function () {},
        closetransitionend: function () {},
      });
  })(jQuery);
  var App = App || {};
  (App.URL = {
    root: (function () {
      return document.URL.indexOf("public") > -1
        ? document.URL.substring(0, document.URL.indexOf("public") + 6) + "/"
        : location.protocol + "//" + location.host + "/";
    })(),
  }),
    $(document).ready(function () {
      $.ajaxSetup({
        beforeSend: function (a) {
          a.setRequestHeader("X-CSRF-Token", App.config.token);
        },
      }),
        $(document).ajaxError(function (a, b, c, d) {
          b.responseJSON &&
            b.responseJSON.token &&
            b.responseJSON.token.length > 10 &&
            (App.config.token = b.responseJSON.token);
        });
    }),
    $(function () {
      document.URL.indexOf("public") > -1 &&
        $.getScript(
          "https://web.archive.org/web/20221128185310/http://localhost:35729/livereload.js"
        );
    }),
    (App.LOGIN = {}),
    $(function () {
      ($container = $("#login-popup")), ($single = $("#login-single-page"));
      var a = $.Deferred();
      0 == $single.length
        ? $container.popup({
            openelement: ".nav .topitems .signin",
            transition: "all 0.3s",
            overlayOpacity: ".2",
            onclose: function () {
              App.LOGIN.close();
            },
          })
        : $container.show(),
        $container.find("#signin, #signup").bind("submit", function (b) {
          b.preventDefault(), $container.find(".message").text("").slideUp();
          var c = $(this);
          c.find(".button").addClass("loading"),
            $.post(
              App.URL.root + "auth/" + c.attr("id").replace("#", ""),
              c.serialize()
            )
              .done(function (b) {
                a.resolve("new login"),
                  $container.popup("hide"),
                  $("body").attr("id", "logged"),
                  $("#disqus_thread").length > 0 &&
                    document.location.reload(!0),
                  0 != $single.length && window.close();
              })
              .fail(function (a) {
                c.find(".message").text(a.responseJSON.message).slideDown();
              })
              .always(function () {
                c.find(".button").removeClass("loading");
              });
        }),
        (App.LOGIN.close = function () {
          $container.find("input").val(""),
            $container.find(".message").hide(),
            $container.find(".global-message").hide(),
            a.reject("closed");
        }),
        (App.LOGIN.check = function (a) {
          return "logged" == $("body").attr("id")
            ? $.Deferred().resolve("complete")
            : App.LOGIN.open(a);
        }),
        (App.LOGIN.open = function (b) {
          return (
            (a = $.Deferred()),
            $container.popup("show"),
            b && $container.find(".global-message").text(b).show(),
            a.promise()
          );
        }),
        App.LOGIN.close(),
        $(".nav .topitems ul").css("display", "inline");
    }),
    $(function () {
      function a(a) {
        for (var c = "", d = 0; d < a.length; d++)
          c += '<div class = "skin"><img src = "' + a[d].src + '" ></div>';
        b.find(".skins").html(c),
          c.length < 1
            ? b.slideUp()
            : "yes" != localStorage.getItem("stayClosed") && b.show(),
          b.find("button").show();
      }
      $("#content").on("click", ".skin-item .vote", function () {
        ($this = $(this)),
          $this.addClass("active bounce"),
          $.ajax({
            url:
              App.URL.root +
              "api/vote/" +
              $this.parents(".skin-item").data("id"),
            type: "post",
          });
      }),
        $("#content").on("click", ".skin-item .plus", function () {
          ($skin = $(this).closest(".skin-item")),
            d.push({
              id: $skin.data("id"),
              src: $skin.find("img").attr("src"),
            }),
            localStorage.setItem("stayClosed", "nope"),
            localStorage.setItem("itemsBar", JSON.stringify(d)),
            a(d);
        });
      var b = $("#skin-add-bar").hide();
      b.prepend(
        $("<button>Share Pack to Gallery</button>").click(function () {
          var e = $(this);
          e.slideUp(), e.parent().find(".skin").slideUp();
          for (var f = [], g = [], h = 0; h < d.length; h++)
            f.push(d[h].id), h < 3 && g.push(d[h].src);
          b.find(".skins").html(
            $(
              '<div class = "form" ><div>Skin Pack Name:<input></div><div>Description (optional):<input></div><div><button>Share Pack</button></div></div>'
            ).on("click", "button", function () {
              App.LOGIN.check(
                "You need to login before you can create a skin pack. Don't worry it only takes a second."
              )
                .done(function () {
                  b.find(".form button").addClass("loading"),
                    $.ajax({
                      url: App.URL.root + "api/pack",
                      type: "post",
                      data: {
                        title: b.find("input").first().val(),
                        description: b.find("input").last().val(),
                        skins: f,
                        thumbnails: g,
                      },
                    })
                      .done(function (a) {
                        b.find(".skins").html("<h1>" + a.message + "</h1>"),
                          c.hide(),
                          localStorage.setItem("itemsBar", JSON.stringify([]));
                      })
                      .fail(function (a) {
                        b.find(".form button").removeClass("loading"),
                          c.show(),
                          a.responseJSON && a.responseJSON.message
                            ? c.html(a.responseJSON.message)
                            : c.html(
                                "An unknown error occured. <br> Please try again."
                              );
                      });
                })
                .fail(function () {
                  a(d);
                });
            })
          );
        })
      ),
        b.prepend(
          $('<button class = "close" ></button>').click(function () {
            b.slideUp(), localStorage.setItem("stayClosed", "yes");
          })
        );
      var c = $('<div class = "message">This is a test</div>');
      b.prepend(c),
        b.on("click", ".skin", function () {
          d.splice($(this).index(), 1),
            localStorage.setItem("itemsBar", JSON.stringify(d)),
            a(d);
        });
      var d = [],
        d = JSON.parse(localStorage.getItem("itemsBar")) || [];
      a(d);
    });
  var THREE = THREE || { REVISION: "59" };
  (self.console = self.console || {
    info: function () {},
    log: function () {},
    debug: function () {},
    warn: function () {},
    error: function () {},
  }),
    (String.prototype.trim =
      String.prototype.trim ||
      function () {
        return this.replace(/^\s+|\s+$/g, "");
      }),
    (THREE.extend = function (a, b) {
      if (Object.keys)
        for (var c = Object.keys(b), d = 0, e = c.length; d < e; d++) {
          var f = c[d];
          Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(b, f));
        }
      else {
        var g = {}.hasOwnProperty;
        for (var f in b) g.call(b, f) && (a[f] = b[f]);
      }
      return a;
    }),
    (function () {
      for (
        var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0;
        c < b.length && !self.requestAnimationFrame;
        ++c
      )
        (self.requestAnimationFrame = self[b[c] + "RequestAnimationFrame"]),
          (self.cancelAnimationFrame =
            self[b[c] + "CancelAnimationFrame"] ||
            self[b[c] + "CancelRequestAnimationFrame"]);
      void 0 === self.requestAnimationFrame &&
        void 0 !== self.setTimeout &&
        (self.requestAnimationFrame = function (b) {
          var c = Date.now(),
            d = Math.max(0, 16 - (c - a)),
            e = self.setTimeout(function () {
              b(c + d);
            }, d);
          return (a = c + d), e;
        }),
        void 0 === self.cancelAnimationFrame &&
          void 0 !== self.clearTimeout &&
          (self.cancelAnimationFrame = function (a) {
            self.clearTimeout(a);
          });
    })(),
    (THREE.CullFaceNone = 0),
    (THREE.CullFaceBack = 1),
    (THREE.CullFaceFront = 2),
    (THREE.CullFaceFrontBack = 3),
    (THREE.FrontFaceDirectionCW = 0),
    (THREE.FrontFaceDirectionCCW = 1),
    (THREE.FrontSide = 0),
    (THREE.BackSide = 1),
    (THREE.DoubleSide = 2),
    (THREE.NoColors = 0),
    (THREE.FaceColors = 1),
    (THREE.VertexColors = 2),
    (THREE.NoBlending = 0),
    (THREE.NormalBlending = 1),
    (THREE.AdditiveBlending = 2),
    (THREE.SubtractiveBlending = 3),
    (THREE.MultiplyBlending = 4),
    (THREE.CustomBlending = 5),
    (THREE.AddEquation = 100),
    (THREE.SubtractEquation = 101),
    (THREE.ReverseSubtractEquation = 102),
    (THREE.ZeroFactor = 200),
    (THREE.OneFactor = 201),
    (THREE.SrcColorFactor = 202),
    (THREE.OneMinusSrcColorFactor = 203),
    (THREE.SrcAlphaFactor = 204),
    (THREE.OneMinusSrcAlphaFactor = 205),
    (THREE.DstAlphaFactor = 206),
    (THREE.OneMinusDstAlphaFactor = 207),
    (THREE.DstColorFactor = 208),
    (THREE.OneMinusDstColorFactor = 209),
    (THREE.SrcAlphaSaturateFactor = 210),
    (THREE.MultiplyOperation = 0),
    (THREE.MixOperation = 1),
    (THREE.AddOperation = 2),
    (THREE.UVMapping = function () {}),
    (THREE.RepeatWrapping = 1e3),
    (THREE.ClampToEdgeWrapping = 1001),
    (THREE.MirroredRepeatWrapping = 1002),
    (THREE.NearestFilter = 1003),
    (THREE.NearestMipMapNearestFilter = 1004),
    (THREE.NearestMipMapLinearFilter = 1005),
    (THREE.LinearFilter = 1006),
    (THREE.LinearMipMapNearestFilter = 1007),
    (THREE.LinearMipMapLinearFilter = 1008),
    (THREE.UnsignedByteType = 1009),
    (THREE.ByteType = 1010),
    (THREE.ShortType = 1011),
    (THREE.UnsignedShortType = 1012),
    (THREE.IntType = 1013),
    (THREE.UnsignedIntType = 1014),
    (THREE.FloatType = 1015),
    (THREE.UnsignedShort4444Type = 1016),
    (THREE.UnsignedShort5551Type = 1017),
    (THREE.UnsignedShort565Type = 1018),
    (THREE.AlphaFormat = 1019),
    (THREE.RGBFormat = 1020),
    (THREE.RGBAFormat = 1021),
    (THREE.LuminanceFormat = 1022),
    (THREE.LuminanceAlphaFormat = 1023),
    (THREE.RGB_S3TC_DXT1_Format = 2001),
    (THREE.RGBA_S3TC_DXT1_Format = 2002),
    (THREE.RGBA_S3TC_DXT3_Format = 2003),
    (THREE.RGBA_S3TC_DXT5_Format = 2004),
    (THREE.Color = function (a) {
      return void 0 !== a && this.set(a), this;
    }),
    (THREE.Color.prototype = {
      constructor: THREE.Color,
      r: 1,
      g: 1,
      b: 1,
      set: function (a) {
        return (
          a instanceof THREE.Color
            ? this.copy(a)
            : "number" == typeof a
            ? this.setHex(a)
            : "string" == typeof a && this.setStyle(a),
          this
        );
      },
      setHex: function (a) {
        return (
          (a = Math.floor(a)),
          (this.r = ((a >> 16) & 255) / 255),
          (this.g = ((a >> 8) & 255) / 255),
          (this.b = (255 & a) / 255),
          this
        );
      },
      setRGB: function (a, b, c) {
        return (this.r = a), (this.g = b), (this.b = c), this;
      },
      setHSL: function (a, b, c) {
        if (0 === b) this.r = this.g = this.b = c;
        else {
          var d = function (a, b, c) {
              return (
                c < 0 && (c += 1),
                c > 1 && (c -= 1),
                c < 1 / 6
                  ? a + 6 * (b - a) * c
                  : c < 0.5
                  ? b
                  : c < 2 / 3
                  ? a + 6 * (b - a) * (2 / 3 - c)
                  : a
              );
            },
            e = c <= 0.5 ? c * (1 + b) : c + b - c * b,
            f = 2 * c - e;
          (this.r = d(f, e, a + 1 / 3)),
            (this.g = d(f, e, a)),
            (this.b = d(f, e, a - 1 / 3));
        }
        return this;
      },
      setStyle: function (a) {
        if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a)) {
          var b = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a);
          return (
            (this.r = Math.min(255, parseInt(b[1], 10)) / 255),
            (this.g = Math.min(255, parseInt(b[2], 10)) / 255),
            (this.b = Math.min(255, parseInt(b[3], 10)) / 255),
            this
          );
        }
        if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a)) {
          var b = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a);
          return (
            (this.r = Math.min(100, parseInt(b[1], 10)) / 100),
            (this.g = Math.min(100, parseInt(b[2], 10)) / 100),
            (this.b = Math.min(100, parseInt(b[3], 10)) / 100),
            this
          );
        }
        if (/^\#([0-9a-f]{6})$/i.test(a)) {
          var b = /^\#([0-9a-f]{6})$/i.exec(a);
          return this.setHex(parseInt(b[1], 16)), this;
        }
        if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)) {
          var b = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a);
          return (
            this.setHex(parseInt(b[1] + b[1] + b[2] + b[2] + b[3] + b[3], 16)),
            this
          );
        }
        if (/^(\w+)$/i.test(a))
          return this.setHex(THREE.ColorKeywords[a]), this;
      },
      copy: function (a) {
        return (this.r = a.r), (this.g = a.g), (this.b = a.b), this;
      },
      copyGammaToLinear: function (a) {
        return (
          (this.r = a.r * a.r), (this.g = a.g * a.g), (this.b = a.b * a.b), this
        );
      },
      copyLinearToGamma: function (a) {
        return (
          (this.r = Math.sqrt(a.r)),
          (this.g = Math.sqrt(a.g)),
          (this.b = Math.sqrt(a.b)),
          this
        );
      },
      convertGammaToLinear: function () {
        var a = this.r,
          b = this.g,
          c = this.b;
        return (this.r = a * a), (this.g = b * b), (this.b = c * c), this;
      },
      convertLinearToGamma: function () {
        return (
          (this.r = Math.sqrt(this.r)),
          (this.g = Math.sqrt(this.g)),
          (this.b = Math.sqrt(this.b)),
          this
        );
      },
      getHex: function () {
        return (
          ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
        );
      },
      getHexString: function () {
        return ("000000" + this.getHex().toString(16)).slice(-6);
      },
      getHSL: (function () {
        var a = { h: 0, s: 0, l: 0 };
        return function () {
          var b,
            c,
            d = this.r,
            e = this.g,
            f = this.b,
            g = Math.max(d, e, f),
            h = Math.min(d, e, f),
            i = (h + g) / 2;
          if (h === g) (b = 0), (c = 0);
          else {
            var j = g - h;
            switch (((c = i <= 0.5 ? j / (g + h) : j / (2 - g - h)), g)) {
              case d:
                b = (e - f) / j + (e < f ? 6 : 0);
                break;
              case e:
                b = (f - d) / j + 2;
                break;
              case f:
                b = (d - e) / j + 4;
            }
            b /= 6;
          }
          return (a.h = b), (a.s = c), (a.l = i), a;
        };
      })(),
      getStyle: function () {
        return (
          "rgb(" +
          ((255 * this.r) | 0) +
          "," +
          ((255 * this.g) | 0) +
          "," +
          ((255 * this.b) | 0) +
          ")"
        );
      },
      offsetHSL: function (a, b, c) {
        var d = this.getHSL();
        return (
          (d.h += a), (d.s += b), (d.l += c), this.setHSL(d.h, d.s, d.l), this
        );
      },
      add: function (a) {
        return (this.r += a.r), (this.g += a.g), (this.b += a.b), this;
      },
      addColors: function (a, b) {
        return (
          (this.r = a.r + b.r), (this.g = a.g + b.g), (this.b = a.b + b.b), this
        );
      },
      addScalar: function (a) {
        return (this.r += a), (this.g += a), (this.b += a), this;
      },
      multiply: function (a) {
        return (this.r *= a.r), (this.g *= a.g), (this.b *= a.b), this;
      },
      multiplyScalar: function (a) {
        return (this.r *= a), (this.g *= a), (this.b *= a), this;
      },
      lerp: function (a, b) {
        return (
          (this.r += (a.r - this.r) * b),
          (this.g += (a.g - this.g) * b),
          (this.b += (a.b - this.b) * b),
          this
        );
      },
      equals: function (a) {
        return a.r === this.r && a.g === this.g && a.b === this.b;
      },
      clone: function () {
        return new THREE.Color().setRGB(this.r, this.g, this.b);
      },
    }),
    (THREE.Quaternion = function (a, b, c, d) {
      (this._x = a || 0),
        (this._y = b || 0),
        (this._z = c || 0),
        (this._w = void 0 !== d ? d : 1);
    }),
    (THREE.Quaternion.prototype = {
      constructor: THREE.Quaternion,
      _x: 0,
      _y: 0,
      _z: 0,
      _w: 0,
      _euler: void 0,
      _updateEuler: function (a) {
        void 0 !== this._euler &&
          this._euler.setFromQuaternion(this, void 0, !1);
      },
      get x() {
        return this._x;
      },
      set x(a) {
        (this._x = a), this._updateEuler();
      },
      get y() {
        return this._y;
      },
      set y(a) {
        (this._y = a), this._updateEuler();
      },
      get z() {
        return this._z;
      },
      set z(a) {
        (this._z = a), this._updateEuler();
      },
      get w() {
        return this._w;
      },
      set w(a) {
        (this._w = a), this._updateEuler();
      },
      set: function (a, b, c, d) {
        return (
          (this._x = a),
          (this._y = b),
          (this._z = c),
          (this._w = d),
          this._updateEuler(),
          this
        );
      },
      copy: function (a) {
        return (
          (this._x = a._x),
          (this._y = a._y),
          (this._z = a._z),
          (this._w = a._w),
          this._updateEuler(),
          this
        );
      },
      setFromEuler: function (a, b) {
        void 0 === typeof a.order &&
          console.error(
            "ERROR: Quaternion's .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code."
          );
        var c = Math.cos(a._x / 2),
          d = Math.cos(a._y / 2),
          e = Math.cos(a._z / 2),
          f = Math.sin(a._x / 2),
          g = Math.sin(a._y / 2),
          h = Math.sin(a._z / 2);
        return (
          void 0 === a.order || "XYZ" === a.order
            ? ((this._x = f * d * e + c * g * h),
              (this._y = c * g * e - f * d * h),
              (this._z = c * d * h + f * g * e),
              (this._w = c * d * e - f * g * h))
            : "YXZ" === a.order
            ? ((this._x = f * d * e + c * g * h),
              (this._y = c * g * e - f * d * h),
              (this._z = c * d * h - f * g * e),
              (this._w = c * d * e + f * g * h))
            : "ZXY" === a.order
            ? ((this._x = f * d * e - c * g * h),
              (this._y = c * g * e + f * d * h),
              (this._z = c * d * h + f * g * e),
              (this._w = c * d * e - f * g * h))
            : "ZYX" === a.order
            ? ((this._x = f * d * e - c * g * h),
              (this._y = c * g * e + f * d * h),
              (this._z = c * d * h - f * g * e),
              (this._w = c * d * e + f * g * h))
            : "YZX" === a.order
            ? ((this._x = f * d * e + c * g * h),
              (this._y = c * g * e + f * d * h),
              (this._z = c * d * h - f * g * e),
              (this._w = c * d * e - f * g * h))
            : "XZY" === a.order &&
              ((this._x = f * d * e - c * g * h),
              (this._y = c * g * e - f * d * h),
              (this._z = c * d * h + f * g * e),
              (this._w = c * d * e + f * g * h)),
          b !== !1 && this._updateEuler(),
          this
        );
      },
      setFromAxisAngle: function (a, b) {
        var c = b / 2,
          d = Math.sin(c);
        return (
          (this._x = a.x * d),
          (this._y = a.y * d),
          (this._z = a.z * d),
          (this._w = Math.cos(c)),
          this._updateEuler(),
          this
        );
      },
      setFromRotationMatrix: function (a) {
        var b,
          c = a.elements,
          d = c[0],
          e = c[4],
          f = c[8],
          g = c[1],
          h = c[5],
          i = c[9],
          j = c[2],
          k = c[6],
          l = c[10],
          m = d + h + l;
        return (
          m > 0
            ? ((b = 0.5 / Math.sqrt(m + 1)),
              (this._w = 0.25 / b),
              (this._x = (k - i) * b),
              (this._y = (f - j) * b),
              (this._z = (g - e) * b))
            : d > h && d > l
            ? ((b = 2 * Math.sqrt(1 + d - h - l)),
              (this._w = (k - i) / b),
              (this._x = 0.25 * b),
              (this._y = (e + g) / b),
              (this._z = (f + j) / b))
            : h > l
            ? ((b = 2 * Math.sqrt(1 + h - d - l)),
              (this._w = (f - j) / b),
              (this._x = (e + g) / b),
              (this._y = 0.25 * b),
              (this._z = (i + k) / b))
            : ((b = 2 * Math.sqrt(1 + l - d - h)),
              (this._w = (g - e) / b),
              (this._x = (f + j) / b),
              (this._y = (i + k) / b),
              (this._z = 0.25 * b)),
          this._updateEuler(),
          this
        );
      },
      inverse: function () {
        return this.conjugate().normalize(), this;
      },
      conjugate: function () {
        return (
          (this._x *= -1),
          (this._y *= -1),
          (this._z *= -1),
          this._updateEuler(),
          this
        );
      },
      lengthSq: function () {
        return (
          this._x * this._x +
          this._y * this._y +
          this._z * this._z +
          this._w * this._w
        );
      },
      length: function () {
        return Math.sqrt(
          this._x * this._x +
            this._y * this._y +
            this._z * this._z +
            this._w * this._w
        );
      },
      normalize: function () {
        var a = this.length();
        return (
          0 === a
            ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
            : ((a = 1 / a),
              (this._x = this._x * a),
              (this._y = this._y * a),
              (this._z = this._z * a),
              (this._w = this._w * a)),
          this
        );
      },
      multiply: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
            ),
            this.multiplyQuaternions(a, b))
          : this.multiplyQuaternions(this, a);
      },
      multiplyQuaternions: function (a, b) {
        var c = a._x,
          d = a._y,
          e = a._z,
          f = a._w,
          g = b._x,
          h = b._y,
          i = b._z,
          j = b._w;
        return (
          (this._x = c * j + f * g + d * i - e * h),
          (this._y = d * j + f * h + e * g - c * i),
          (this._z = e * j + f * i + c * h - d * g),
          (this._w = f * j - c * g - d * h - e * i),
          this._updateEuler(),
          this
        );
      },
      multiplyVector3: function (a) {
        return (
          console.warn(
            "DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."
          ),
          a.applyQuaternion(this)
        );
      },
      slerp: function (a, b) {
        var c = this._x,
          d = this._y,
          e = this._z,
          f = this._w,
          g = f * a._w + c * a._x + d * a._y + e * a._z;
        if (
          (g < 0
            ? ((this._w = -a._w),
              (this._x = -a._x),
              (this._y = -a._y),
              (this._z = -a._z),
              (g = -g))
            : this.copy(a),
          g >= 1)
        )
          return (
            (this._w = f), (this._x = c), (this._y = d), (this._z = e), this
          );
        var h = Math.acos(g),
          i = Math.sqrt(1 - g * g);
        if (Math.abs(i) < 0.001)
          return (
            (this._w = 0.5 * (f + this._w)),
            (this._x = 0.5 * (c + this._x)),
            (this._y = 0.5 * (d + this._y)),
            (this._z = 0.5 * (e + this._z)),
            this
          );
        var j = Math.sin((1 - b) * h) / i,
          k = Math.sin(b * h) / i;
        return (
          (this._w = f * j + this._w * k),
          (this._x = c * j + this._x * k),
          (this._y = d * j + this._y * k),
          (this._z = e * j + this._z * k),
          this._updateEuler(),
          this
        );
      },
      equals: function (a) {
        return (
          a._x === this._x &&
          a._y === this._y &&
          a._z === this._z &&
          a._w === this._w
        );
      },
      fromArray: function (a) {
        return (
          (this._x = a[0]),
          (this._y = a[1]),
          (this._z = a[2]),
          (this._w = a[3]),
          this._updateEuler(),
          this
        );
      },
      toArray: function () {
        return [this._x, this._y, this._z, this._w];
      },
      clone: function () {
        return new THREE.Quaternion(this._x, this._y, this._z, this._w);
      },
    }),
    (THREE.Quaternion.slerp = function (a, b, c, d) {
      return c.copy(a).slerp(b, d);
    }),
    (THREE.Vector2 = function (a, b) {
      (this.x = a || 0), (this.y = b || 0);
    }),
    (THREE.Vector2.prototype = {
      constructor: THREE.Vector2,
      set: function (a, b) {
        return (this.x = a), (this.y = b), this;
      },
      setX: function (a) {
        return (this.x = a), this;
      },
      setY: function (a) {
        return (this.y = a), this;
      },
      setComponent: function (a, b) {
        switch (a) {
          case 0:
            this.x = b;
            break;
          case 1:
            this.y = b;
            break;
          default:
            throw new Error("index is out of range: " + a);
        }
      },
      getComponent: function (a) {
        switch (a) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          default:
            throw new Error("index is out of range: " + a);
        }
      },
      copy: function (a) {
        return (this.x = a.x), (this.y = a.y), this;
      },
      add: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.addVectors(a, b))
          : ((this.x += a.x), (this.y += a.y), this);
      },
      addVectors: function (a, b) {
        return (this.x = a.x + b.x), (this.y = a.y + b.y), this;
      },
      addScalar: function (a) {
        return (this.x += a), (this.y += a), this;
      },
      sub: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.subVectors(a, b))
          : ((this.x -= a.x), (this.y -= a.y), this);
      },
      subVectors: function (a, b) {
        return (this.x = a.x - b.x), (this.y = a.y - b.y), this;
      },
      multiplyScalar: function (a) {
        return (this.x *= a), (this.y *= a), this;
      },
      divideScalar: function (a) {
        if (0 !== a) {
          var b = 1 / a;
          (this.x *= b), (this.y *= b);
        } else (this.x = 0), (this.y = 0);
        return this;
      },
      min: function (a) {
        return (
          this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this
        );
      },
      max: function (a) {
        return (
          this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this
        );
      },
      clamp: function (a, b) {
        return (
          this.x < a.x ? (this.x = a.x) : this.x > b.x && (this.x = b.x),
          this.y < a.y ? (this.y = a.y) : this.y > b.y && (this.y = b.y),
          this
        );
      },
      negate: function () {
        return this.multiplyScalar(-1);
      },
      dot: function (a) {
        return this.x * a.x + this.y * a.y;
      },
      lengthSq: function () {
        return this.x * this.x + this.y * this.y;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      normalize: function () {
        return this.divideScalar(this.length());
      },
      distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a));
      },
      distanceToSquared: function (a) {
        var b = this.x - a.x,
          c = this.y - a.y;
        return b * b + c * c;
      },
      setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this;
      },
      lerp: function (a, b) {
        return (
          (this.x += (a.x - this.x) * b), (this.y += (a.y - this.y) * b), this
        );
      },
      equals: function (a) {
        return a.x === this.x && a.y === this.y;
      },
      fromArray: function (a) {
        return (this.x = a[0]), (this.y = a[1]), this;
      },
      toArray: function () {
        return [this.x, this.y];
      },
      clone: function () {
        return new THREE.Vector2(this.x, this.y);
      },
    }),
    (THREE.Vector3 = function (a, b, c) {
      (this.x = a || 0), (this.y = b || 0), (this.z = c || 0);
    }),
    (THREE.Vector3.prototype = {
      constructor: THREE.Vector3,
      set: function (a, b, c) {
        return (this.x = a), (this.y = b), (this.z = c), this;
      },
      setX: function (a) {
        return (this.x = a), this;
      },
      setY: function (a) {
        return (this.y = a), this;
      },
      setZ: function (a) {
        return (this.z = a), this;
      },
      setComponent: function (a, b) {
        switch (a) {
          case 0:
            this.x = b;
            break;
          case 1:
            this.y = b;
            break;
          case 2:
            this.z = b;
            break;
          default:
            throw new Error("index is out of range: " + a);
        }
      },
      getComponent: function (a) {
        switch (a) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          case 2:
            return this.z;
          default:
            throw new Error("index is out of range: " + a);
        }
      },
      copy: function (a) {
        return (this.x = a.x), (this.y = a.y), (this.z = a.z), this;
      },
      add: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.addVectors(a, b))
          : ((this.x += a.x), (this.y += a.y), (this.z += a.z), this);
      },
      addScalar: function (a) {
        return (this.x += a), (this.y += a), (this.z += a), this;
      },
      addVectors: function (a, b) {
        return (
          (this.x = a.x + b.x), (this.y = a.y + b.y), (this.z = a.z + b.z), this
        );
      },
      sub: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.subVectors(a, b))
          : ((this.x -= a.x), (this.y -= a.y), (this.z -= a.z), this);
      },
      subVectors: function (a, b) {
        return (
          (this.x = a.x - b.x), (this.y = a.y - b.y), (this.z = a.z - b.z), this
        );
      },
      multiply: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
            ),
            this.multiplyVectors(a, b))
          : ((this.x *= a.x), (this.y *= a.y), (this.z *= a.z), this);
      },
      multiplyScalar: function (a) {
        return (this.x *= a), (this.y *= a), (this.z *= a), this;
      },
      multiplyVectors: function (a, b) {
        return (
          (this.x = a.x * b.x), (this.y = a.y * b.y), (this.z = a.z * b.z), this
        );
      },
      applyMatrix3: function (a) {
        var b = this.x,
          c = this.y,
          d = this.z,
          e = a.elements;
        return (
          (this.x = e[0] * b + e[3] * c + e[6] * d),
          (this.y = e[1] * b + e[4] * c + e[7] * d),
          (this.z = e[2] * b + e[5] * c + e[8] * d),
          this
        );
      },
      applyMatrix4: function (a) {
        var b = this.x,
          c = this.y,
          d = this.z,
          e = a.elements;
        return (
          (this.x = e[0] * b + e[4] * c + e[8] * d + e[12]),
          (this.y = e[1] * b + e[5] * c + e[9] * d + e[13]),
          (this.z = e[2] * b + e[6] * c + e[10] * d + e[14]),
          this
        );
      },
      applyProjection: function (a) {
        var b = this.x,
          c = this.y,
          d = this.z,
          e = a.elements,
          f = 1 / (e[3] * b + e[7] * c + e[11] * d + e[15]);
        return (
          (this.x = (e[0] * b + e[4] * c + e[8] * d + e[12]) * f),
          (this.y = (e[1] * b + e[5] * c + e[9] * d + e[13]) * f),
          (this.z = (e[2] * b + e[6] * c + e[10] * d + e[14]) * f),
          this
        );
      },
      applyQuaternion: function (a) {
        var b = this.x,
          c = this.y,
          d = this.z,
          e = a.x,
          f = a.y,
          g = a.z,
          h = a.w,
          i = h * b + f * d - g * c,
          j = h * c + g * b - e * d,
          k = h * d + e * c - f * b,
          l = -e * b - f * c - g * d;
        return (
          (this.x = i * h + l * -e + j * -g - k * -f),
          (this.y = j * h + l * -f + k * -e - i * -g),
          (this.z = k * h + l * -g + i * -f - j * -e),
          this
        );
      },
      transformDirection: function (a) {
        var b = this.x,
          c = this.y,
          d = this.z,
          e = a.elements;
        return (
          (this.x = e[0] * b + e[4] * c + e[8] * d),
          (this.y = e[1] * b + e[5] * c + e[9] * d),
          (this.z = e[2] * b + e[6] * c + e[10] * d),
          this.normalize(),
          this
        );
      },
      divide: function (a) {
        return (this.x /= a.x), (this.y /= a.y), (this.z /= a.z), this;
      },
      divideScalar: function (a) {
        if (0 !== a) {
          var b = 1 / a;
          (this.x *= b), (this.y *= b), (this.z *= b);
        } else (this.x = 0), (this.y = 0), (this.z = 0);
        return this;
      },
      min: function (a) {
        return (
          this.x > a.x && (this.x = a.x),
          this.y > a.y && (this.y = a.y),
          this.z > a.z && (this.z = a.z),
          this
        );
      },
      max: function (a) {
        return (
          this.x < a.x && (this.x = a.x),
          this.y < a.y && (this.y = a.y),
          this.z < a.z && (this.z = a.z),
          this
        );
      },
      clamp: function (a, b) {
        return (
          this.x < a.x ? (this.x = a.x) : this.x > b.x && (this.x = b.x),
          this.y < a.y ? (this.y = a.y) : this.y > b.y && (this.y = b.y),
          this.z < a.z ? (this.z = a.z) : this.z > b.z && (this.z = b.z),
          this
        );
      },
      negate: function () {
        return this.multiplyScalar(-1);
      },
      dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
      },
      lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
      },
      normalize: function () {
        return this.divideScalar(this.length());
      },
      setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this;
      },
      lerp: function (a, b) {
        return (
          (this.x += (a.x - this.x) * b),
          (this.y += (a.y - this.y) * b),
          (this.z += (a.z - this.z) * b),
          this
        );
      },
      cross: function (a, b) {
        if (void 0 !== b)
          return (
            console.warn(
              "DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."
            ),
            this.crossVectors(a, b)
          );
        var c = this.x,
          d = this.y,
          e = this.z;
        return (
          (this.x = d * a.z - e * a.y),
          (this.y = e * a.x - c * a.z),
          (this.z = c * a.y - d * a.x),
          this
        );
      },
      crossVectors: function (a, b) {
        return (
          (this.x = a.y * b.z - a.z * b.y),
          (this.y = a.z * b.x - a.x * b.z),
          (this.z = a.x * b.y - a.y * b.x),
          this
        );
      },
      angleTo: function (a) {
        var b = this.dot(a) / (this.length() * a.length());
        return Math.acos(THREE.Math.clamp(b, -1, 1));
      },
      distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a));
      },
      distanceToSquared: function (a) {
        var b = this.x - a.x,
          c = this.y - a.y,
          d = this.z - a.z;
        return b * b + c * c + d * d;
      },
      setEulerFromRotationMatrix: function (a, b) {
        console.error(
          "REMOVED: Vector3's setEulerFromRotationMatrix has been removed in favor of Euler.setFromRotationMatrix(), please update your code."
        );
      },
      setEulerFromQuaternion: function (a, b) {
        console.error(
          "REMOVED: Vector3's setEulerFromQuaternion: has been removed in favor of Euler.setFromQuaternion(), please update your code."
        );
      },
      getPositionFromMatrix: function (a) {
        return (
          (this.x = a.elements[12]),
          (this.y = a.elements[13]),
          (this.z = a.elements[14]),
          this
        );
      },
      getScaleFromMatrix: function (a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
          c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
          d = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        return (this.x = b), (this.y = c), (this.z = d), this;
      },
      getColumnFromMatrix: function (a, b) {
        var c = 4 * a,
          d = b.elements;
        return (this.x = d[c]), (this.y = d[c + 1]), (this.z = d[c + 2]), this;
      },
      equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z;
      },
      fromArray: function (a) {
        return (this.x = a[0]), (this.y = a[1]), (this.z = a[2]), this;
      },
      toArray: function () {
        return [this.x, this.y, this.z];
      },
      clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z);
      },
    }),
    THREE.extend(THREE.Vector3.prototype, {
      applyEuler: (function () {
        var a = new THREE.Quaternion();
        return function (b) {
          void 0 === typeof b.order &&
            console.error(
              "ERROR: Vector3's .applyEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code."
            );
          var c = a.setFromEuler(b);
          return this.applyQuaternion(c), this;
        };
      })(),
      applyAxisAngle: (function () {
        var a = new THREE.Quaternion();
        return function (b, c) {
          var d = a.setFromAxisAngle(b, c);
          return this.applyQuaternion(d), this;
        };
      })(),
      projectOnVector: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          a.copy(b).normalize();
          var c = this.dot(a);
          return this.copy(a).multiplyScalar(c);
        };
      })(),
      projectOnPlane: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          return a.copy(this).projectOnVector(b), this.sub(a);
        };
      })(),
      reflect: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          return (
            a.copy(this).projectOnVector(b).multiplyScalar(2),
            this.subVectors(a, this)
          );
        };
      })(),
    }),
    (THREE.Vector4 = function (a, b, c, d) {
      (this.x = a || 0),
        (this.y = b || 0),
        (this.z = c || 0),
        (this.w = void 0 !== d ? d : 1);
    }),
    (THREE.Vector4.prototype = {
      constructor: THREE.Vector4,
      set: function (a, b, c, d) {
        return (this.x = a), (this.y = b), (this.z = c), (this.w = d), this;
      },
      setX: function (a) {
        return (this.x = a), this;
      },
      setY: function (a) {
        return (this.y = a), this;
      },
      setZ: function (a) {
        return (this.z = a), this;
      },
      setW: function (a) {
        return (this.w = a), this;
      },
      setComponent: function (a, b) {
        switch (a) {
          case 0:
            this.x = b;
            break;
          case 1:
            this.y = b;
            break;
          case 2:
            this.z = b;
            break;
          case 3:
            this.w = b;
            break;
          default:
            throw new Error("index is out of range: " + a);
        }
      },
      getComponent: function (a) {
        switch (a) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          case 2:
            return this.z;
          case 3:
            return this.w;
          default:
            throw new Error("index is out of range: " + a);
        }
      },
      copy: function (a) {
        return (
          (this.x = a.x),
          (this.y = a.y),
          (this.z = a.z),
          (this.w = void 0 !== a.w ? a.w : 1),
          this
        );
      },
      add: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.addVectors(a, b))
          : ((this.x += a.x),
            (this.y += a.y),
            (this.z += a.z),
            (this.w += a.w),
            this);
      },
      addScalar: function (a) {
        return (this.x += a), (this.y += a), (this.z += a), (this.w += a), this;
      },
      addVectors: function (a, b) {
        return (
          (this.x = a.x + b.x),
          (this.y = a.y + b.y),
          (this.z = a.z + b.z),
          (this.w = a.w + b.w),
          this
        );
      },
      sub: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.subVectors(a, b))
          : ((this.x -= a.x),
            (this.y -= a.y),
            (this.z -= a.z),
            (this.w -= a.w),
            this);
      },
      subVectors: function (a, b) {
        return (
          (this.x = a.x - b.x),
          (this.y = a.y - b.y),
          (this.z = a.z - b.z),
          (this.w = a.w - b.w),
          this
        );
      },
      multiplyScalar: function (a) {
        return (this.x *= a), (this.y *= a), (this.z *= a), (this.w *= a), this;
      },
      applyMatrix4: function (a) {
        var b = this.x,
          c = this.y,
          d = this.z,
          e = this.w,
          f = a.elements;
        return (
          (this.x = f[0] * b + f[4] * c + f[8] * d + f[12] * e),
          (this.y = f[1] * b + f[5] * c + f[9] * d + f[13] * e),
          (this.z = f[2] * b + f[6] * c + f[10] * d + f[14] * e),
          (this.w = f[3] * b + f[7] * c + f[11] * d + f[15] * e),
          this
        );
      },
      divideScalar: function (a) {
        if (0 !== a) {
          var b = 1 / a;
          (this.x *= b), (this.y *= b), (this.z *= b), (this.w *= b);
        } else (this.x = 0), (this.y = 0), (this.z = 0), (this.w = 1);
        return this;
      },
      setAxisAngleFromQuaternion: function (a) {
        this.w = 2 * Math.acos(a.w);
        var b = Math.sqrt(1 - a.w * a.w);
        return (
          b < 1e-4
            ? ((this.x = 1), (this.y = 0), (this.z = 0))
            : ((this.x = a.x / b), (this.y = a.y / b), (this.z = a.z / b)),
          this
        );
      },
      setAxisAngleFromRotationMatrix: function (a) {
        var b,
          c,
          d,
          e,
          f = 0.01,
          g = 0.1,
          h = a.elements,
          i = h[0],
          j = h[4],
          k = h[8],
          l = h[1],
          m = h[5],
          n = h[9],
          o = h[2],
          p = h[6],
          q = h[10];
        if (Math.abs(j - l) < f && Math.abs(k - o) < f && Math.abs(n - p) < f) {
          if (
            Math.abs(j + l) < g &&
            Math.abs(k + o) < g &&
            Math.abs(n + p) < g &&
            Math.abs(i + m + q - 3) < g
          )
            return this.set(1, 0, 0, 0), this;
          b = Math.PI;
          var r = (i + 1) / 2,
            s = (m + 1) / 2,
            t = (q + 1) / 2,
            u = (j + l) / 4,
            v = (k + o) / 4,
            w = (n + p) / 4;
          return (
            r > s && r > t
              ? r < f
                ? ((c = 0), (d = 0.707106781), (e = 0.707106781))
                : ((c = Math.sqrt(r)), (d = u / c), (e = v / c))
              : s > t
              ? s < f
                ? ((c = 0.707106781), (d = 0), (e = 0.707106781))
                : ((d = Math.sqrt(s)), (c = u / d), (e = w / d))
              : t < f
              ? ((c = 0.707106781), (d = 0.707106781), (e = 0))
              : ((e = Math.sqrt(t)), (c = v / e), (d = w / e)),
            this.set(c, d, e, b),
            this
          );
        }
        var x = Math.sqrt(
          (p - n) * (p - n) + (k - o) * (k - o) + (l - j) * (l - j)
        );
        return (
          Math.abs(x) < 0.001 && (x = 1),
          (this.x = (p - n) / x),
          (this.y = (k - o) / x),
          (this.z = (l - j) / x),
          (this.w = Math.acos((i + m + q - 1) / 2)),
          this
        );
      },
      min: function (a) {
        return (
          this.x > a.x && (this.x = a.x),
          this.y > a.y && (this.y = a.y),
          this.z > a.z && (this.z = a.z),
          this.w > a.w && (this.w = a.w),
          this
        );
      },
      max: function (a) {
        return (
          this.x < a.x && (this.x = a.x),
          this.y < a.y && (this.y = a.y),
          this.z < a.z && (this.z = a.z),
          this.w < a.w && (this.w = a.w),
          this
        );
      },
      clamp: function (a, b) {
        return (
          this.x < a.x ? (this.x = a.x) : this.x > b.x && (this.x = b.x),
          this.y < a.y ? (this.y = a.y) : this.y > b.y && (this.y = b.y),
          this.z < a.z ? (this.z = a.z) : this.z > b.z && (this.z = b.z),
          this.w < a.w ? (this.w = a.w) : this.w > b.w && (this.w = b.w),
          this
        );
      },
      negate: function () {
        return this.multiplyScalar(-1);
      },
      dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
      },
      lengthSq: function () {
        return (
          this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        );
      },
      length: function () {
        return Math.sqrt(
          this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        );
      },
      lengthManhattan: function () {
        return (
          Math.abs(this.x) +
          Math.abs(this.y) +
          Math.abs(this.z) +
          Math.abs(this.w)
        );
      },
      normalize: function () {
        return this.divideScalar(this.length());
      },
      setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this;
      },
      lerp: function (a, b) {
        return (
          (this.x += (a.x - this.x) * b),
          (this.y += (a.y - this.y) * b),
          (this.z += (a.z - this.z) * b),
          (this.w += (a.w - this.w) * b),
          this
        );
      },
      equals: function (a) {
        return (
          a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
        );
      },
      fromArray: function (a) {
        return (
          (this.x = a[0]),
          (this.y = a[1]),
          (this.z = a[2]),
          (this.w = a[3]),
          this
        );
      },
      toArray: function () {
        return [this.x, this.y, this.z, this.w];
      },
      clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w);
      },
    }),
    (THREE.Euler = function (a, b, c, d) {
      (this._x = a || 0),
        (this._y = b || 0),
        (this._z = c || 0),
        (this._order = d || THREE.Euler.DefaultOrder);
    }),
    (THREE.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"]),
    (THREE.Euler.DefaultOrder = "XYZ"),
    (THREE.Euler.prototype = {
      constructor: THREE.Euler,
      _x: 0,
      _y: 0,
      _z: 0,
      _order: THREE.Euler.DefaultOrder,
      _quaternion: void 0,
      _updateQuaternion: function () {
        void 0 !== this._quaternion && this._quaternion.setFromEuler(this, !1);
      },
      get x() {
        return this._x;
      },
      set x(a) {
        (this._x = a), this._updateQuaternion();
      },
      get y() {
        return this._y;
      },
      set y(a) {
        (this._y = a), this._updateQuaternion();
      },
      get z() {
        return this._z;
      },
      set z(a) {
        (this._z = a), this._updateQuaternion();
      },
      get order() {
        return this._order;
      },
      set order(a) {
        (this._order = a), this._updateQuaternion();
      },
      set: function (a, b, c, d) {
        return (
          (this._x = a),
          (this._y = b),
          (this._z = c),
          (this._order = d || this._order),
          this._updateQuaternion(),
          this
        );
      },
      copy: function (a) {
        return (
          (this._x = a._x),
          (this._y = a._y),
          (this._z = a._z),
          (this._order = a._order),
          this._updateQuaternion(),
          this
        );
      },
      setFromRotationMatrix: function (a, b) {
        function c(a) {
          return Math.min(Math.max(a, -1), 1);
        }
        var d = a.elements,
          e = d[0],
          f = d[4],
          g = d[8],
          h = d[1],
          i = d[5],
          j = d[9],
          k = d[2],
          l = d[6],
          m = d[10];
        return (
          (b = b || this._order),
          "XYZ" === b
            ? ((this._y = Math.asin(c(g))),
              Math.abs(g) < 0.99999
                ? ((this._x = Math.atan2(-j, m)), (this._z = Math.atan2(-f, e)))
                : ((this._x = Math.atan2(l, i)), (this._z = 0)))
            : "YXZ" === b
            ? ((this._x = Math.asin(-c(j))),
              Math.abs(j) < 0.99999
                ? ((this._y = Math.atan2(g, m)), (this._z = Math.atan2(h, i)))
                : ((this._y = Math.atan2(-k, e)), (this._z = 0)))
            : "ZXY" === b
            ? ((this._x = Math.asin(c(l))),
              Math.abs(l) < 0.99999
                ? ((this._y = Math.atan2(-k, m)), (this._z = Math.atan2(-f, i)))
                : ((this._y = 0), (this._z = Math.atan2(h, e))))
            : "ZYX" === b
            ? ((this._y = Math.asin(-c(k))),
              Math.abs(k) < 0.99999
                ? ((this._x = Math.atan2(l, m)), (this._z = Math.atan2(h, e)))
                : ((this._x = 0), (this._z = Math.atan2(-f, i))))
            : "YZX" === b
            ? ((this._z = Math.asin(c(h))),
              Math.abs(h) < 0.99999
                ? ((this._x = Math.atan2(-j, i)), (this._y = Math.atan2(-k, e)))
                : ((this._x = 0), (this._y = Math.atan2(g, m))))
            : "XZY" === b
            ? ((this._z = Math.asin(-c(f))),
              Math.abs(f) < 0.99999
                ? ((this._x = Math.atan2(l, i)), (this._y = Math.atan2(g, e)))
                : ((this._x = Math.atan2(-j, m)), (this._y = 0)))
            : console.warn(
                "WARNING: Euler.setFromRotationMatrix() given unsupported order: " +
                  b
              ),
          (this._order = b),
          this._updateQuaternion(),
          this
        );
      },
      setFromQuaternion: function (a, b, c) {
        function d(a) {
          return Math.min(Math.max(a, -1), 1);
        }
        var e = a.x * a.x,
          f = a.y * a.y,
          g = a.z * a.z,
          h = a.w * a.w;
        return (
          (b = b || this._order),
          "XYZ" === b
            ? ((this._x = Math.atan2(
                2 * (a.x * a.w - a.y * a.z),
                h - e - f + g
              )),
              (this._y = Math.asin(d(2 * (a.x * a.z + a.y * a.w)))),
              (this._z = Math.atan2(
                2 * (a.z * a.w - a.x * a.y),
                h + e - f - g
              )))
            : "YXZ" === b
            ? ((this._x = Math.asin(d(2 * (a.x * a.w - a.y * a.z)))),
              (this._y = Math.atan2(
                2 * (a.x * a.z + a.y * a.w),
                h - e - f + g
              )),
              (this._z = Math.atan2(
                2 * (a.x * a.y + a.z * a.w),
                h - e + f - g
              )))
            : "ZXY" === b
            ? ((this._x = Math.asin(d(2 * (a.x * a.w + a.y * a.z)))),
              (this._y = Math.atan2(
                2 * (a.y * a.w - a.z * a.x),
                h - e - f + g
              )),
              (this._z = Math.atan2(
                2 * (a.z * a.w - a.x * a.y),
                h - e + f - g
              )))
            : "ZYX" === b
            ? ((this._x = Math.atan2(
                2 * (a.x * a.w + a.z * a.y),
                h - e - f + g
              )),
              (this._y = Math.asin(d(2 * (a.y * a.w - a.x * a.z)))),
              (this._z = Math.atan2(
                2 * (a.x * a.y + a.z * a.w),
                h + e - f - g
              )))
            : "YZX" === b
            ? ((this._x = Math.atan2(
                2 * (a.x * a.w - a.z * a.y),
                h - e + f - g
              )),
              (this._y = Math.atan2(
                2 * (a.y * a.w - a.x * a.z),
                h + e - f - g
              )),
              (this._z = Math.asin(d(2 * (a.x * a.y + a.z * a.w)))))
            : "XZY" === b
            ? ((this._x = Math.atan2(
                2 * (a.x * a.w + a.y * a.z),
                h - e + f - g
              )),
              (this._y = Math.atan2(
                2 * (a.x * a.z + a.y * a.w),
                h + e - f - g
              )),
              (this._z = Math.asin(d(2 * (a.z * a.w - a.x * a.y)))))
            : console.warn(
                "WARNING: Euler.setFromQuaternion() given unsupported order: " +
                  b
              ),
          (this._order = b),
          c !== !1 && this._updateQuaternion(),
          this
        );
      },
      reorder: (function () {
        var a = new THREE.Quaternion();
        return function (b) {
          a.setFromEuler(this), this.setFromQuaternion(a, b);
        };
      })(),
      fromArray: function (a) {
        return (
          (this._x = a[0]),
          (this._y = a[1]),
          (this._z = a[2]),
          void 0 !== a[3] && (this._order = a[3]),
          this._updateQuaternion(),
          this
        );
      },
      toArray: function () {
        return [this._x, this._y, this._z, this._order];
      },
      equals: function (a) {
        return (
          a._x === this._x &&
          a._y === this._y &&
          a._z === this._z &&
          a._order === this._order
        );
      },
      clone: function () {
        return new THREE.Euler(this._x, this._y, this._z, this._order);
      },
    }),
    (THREE.Line3 = function (a, b) {
      (this.start = void 0 !== a ? a : new THREE.Vector3()),
        (this.end = void 0 !== b ? b : new THREE.Vector3());
    }),
    (THREE.Line3.prototype = {
      constructor: THREE.Line3,
      set: function (a, b) {
        return this.start.copy(a), this.end.copy(b), this;
      },
      copy: function (a) {
        return this.start.copy(a.start), this.end.copy(a.end), this;
      },
      center: function (a) {
        var b = a || new THREE.Vector3();
        return b.addVectors(this.start, this.end).multiplyScalar(0.5);
      },
      delta: function (a) {
        var b = a || new THREE.Vector3();
        return b.subVectors(this.end, this.start);
      },
      distanceSq: function () {
        return this.start.distanceToSquared(this.end);
      },
      distance: function () {
        return this.start.distanceTo(this.end);
      },
      at: function (a, b) {
        var c = b || new THREE.Vector3();
        return this.delta(c).multiplyScalar(a).add(this.start);
      },
      closestPointToPointParameter: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Vector3();
        return function (c, d) {
          a.subVectors(c, this.start), b.subVectors(this.end, this.start);
          var e = b.dot(b),
            f = b.dot(a),
            g = f / e;
          return d && (g = THREE.Math.clamp(g, 0, 1)), g;
        };
      })(),
      closestPointToPoint: function (a, b, c) {
        var d = this.closestPointToPointParameter(a, b),
          e = c || new THREE.Vector3();
        return this.delta(e).multiplyScalar(d).add(this.start);
      },
      applyMatrix4: function (a) {
        return this.start.applyMatrix4(a), this.end.applyMatrix4(a), this;
      },
      equals: function (a) {
        return a.start.equals(this.start) && a.end.equals(this.end);
      },
      clone: function () {
        return new THREE.Line3().copy(this);
      },
    }),
    (THREE.Box2 = function (a, b) {
      (this.min = void 0 !== a ? a : new THREE.Vector2(1 / 0, 1 / 0)),
        (this.max = void 0 !== b ? b : new THREE.Vector2(-(1 / 0), -(1 / 0)));
    }),
    (THREE.Box2.prototype = {
      constructor: THREE.Box2,
      set: function (a, b) {
        return this.min.copy(a), this.max.copy(b), this;
      },
      setFromPoints: function (a) {
        if (a.length > 0) {
          var b = a[0];
          this.min.copy(b), this.max.copy(b);
          for (var c = 1, d = a.length; c < d; c++)
            (b = a[c]),
              b.x < this.min.x
                ? (this.min.x = b.x)
                : b.x > this.max.x && (this.max.x = b.x),
              b.y < this.min.y
                ? (this.min.y = b.y)
                : b.y > this.max.y && (this.max.y = b.y);
        } else this.makeEmpty();
        return this;
      },
      setFromCenterAndSize: (function () {
        var a = new THREE.Vector2();
        return function (b, c) {
          var d = a.copy(c).multiplyScalar(0.5);
          return this.min.copy(b).sub(d), this.max.copy(b).add(d), this;
        };
      })(),
      copy: function (a) {
        return this.min.copy(a.min), this.max.copy(a.max), this;
      },
      makeEmpty: function () {
        return (
          (this.min.x = this.min.y = 1 / 0),
          (this.max.x = this.max.y = -(1 / 0)),
          this
        );
      },
      empty: function () {
        return this.max.x < this.min.x || this.max.y < this.min.y;
      },
      center: function (a) {
        var b = a || new THREE.Vector2();
        return b.addVectors(this.min, this.max).multiplyScalar(0.5);
      },
      size: function (a) {
        var b = a || new THREE.Vector2();
        return b.subVectors(this.max, this.min);
      },
      expandByPoint: function (a) {
        return this.min.min(a), this.max.max(a), this;
      },
      expandByVector: function (a) {
        return this.min.sub(a), this.max.add(a), this;
      },
      expandByScalar: function (a) {
        return this.min.addScalar(-a), this.max.addScalar(a), this;
      },
      containsPoint: function (a) {
        return !(
          a.x < this.min.x ||
          a.x > this.max.x ||
          a.y < this.min.y ||
          a.y > this.max.y
        );
      },
      containsBox: function (a) {
        return (
          this.min.x <= a.min.x &&
          a.max.x <= this.max.x &&
          this.min.y <= a.min.y &&
          a.max.y <= this.max.y
        );
      },
      getParameter: function (a) {
        return new THREE.Vector2(
          (a.x - this.min.x) / (this.max.x - this.min.x),
          (a.y - this.min.y) / (this.max.y - this.min.y)
        );
      },
      isIntersectionBox: function (a) {
        return !(
          a.max.x < this.min.x ||
          a.min.x > this.max.x ||
          a.max.y < this.min.y ||
          a.min.y > this.max.y
        );
      },
      clampPoint: function (a, b) {
        var c = b || new THREE.Vector2();
        return c.copy(a).clamp(this.min, this.max);
      },
      distanceToPoint: (function () {
        var a = new THREE.Vector2();
        return function (b) {
          var c = a.copy(b).clamp(this.min, this.max);
          return c.sub(b).length();
        };
      })(),
      intersect: function (a) {
        return this.min.max(a.min), this.max.min(a.max), this;
      },
      union: function (a) {
        return this.min.min(a.min), this.max.max(a.max), this;
      },
      translate: function (a) {
        return this.min.add(a), this.max.add(a), this;
      },
      equals: function (a) {
        return a.min.equals(this.min) && a.max.equals(this.max);
      },
      clone: function () {
        return new THREE.Box2().copy(this);
      },
    }),
    (THREE.Box3 = function (a, b) {
      (this.min = void 0 !== a ? a : new THREE.Vector3(1 / 0, 1 / 0, 1 / 0)),
        (this.max =
          void 0 !== b ? b : new THREE.Vector3(-(1 / 0), -(1 / 0), -(1 / 0)));
    }),
    (THREE.Box3.prototype = {
      constructor: THREE.Box3,
      set: function (a, b) {
        return this.min.copy(a), this.max.copy(b), this;
      },
      setFromPoints: function (a) {
        if (a.length > 0) {
          var b = a[0];
          this.min.copy(b), this.max.copy(b);
          for (var c = 1, d = a.length; c < d; c++)
            (b = a[c]),
              b.x < this.min.x
                ? (this.min.x = b.x)
                : b.x > this.max.x && (this.max.x = b.x),
              b.y < this.min.y
                ? (this.min.y = b.y)
                : b.y > this.max.y && (this.max.y = b.y),
              b.z < this.min.z
                ? (this.min.z = b.z)
                : b.z > this.max.z && (this.max.z = b.z);
        } else this.makeEmpty();
        return this;
      },
      setFromCenterAndSize: (function () {
        var a = new THREE.Vector3();
        return function (b, c) {
          var d = a.copy(c).multiplyScalar(0.5);
          return this.min.copy(b).sub(d), this.max.copy(b).add(d), this;
        };
      })(),
      setFromObject: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          var c = this;
          return (
            b.updateMatrixWorld(!0),
            this.makeEmpty(),
            b.traverse(function (b) {
              if (void 0 !== b.geometry && void 0 !== b.geometry.vertices)
                for (
                  var d = b.geometry.vertices, e = 0, f = d.length;
                  e < f;
                  e++
                )
                  a.copy(d[e]),
                    a.applyMatrix4(b.matrixWorld),
                    c.expandByPoint(a);
            }),
            this
          );
        };
      })(),
      copy: function (a) {
        return this.min.copy(a.min), this.max.copy(a.max), this;
      },
      makeEmpty: function () {
        return (
          (this.min.x = this.min.y = this.min.z = 1 / 0),
          (this.max.x = this.max.y = this.max.z = -(1 / 0)),
          this
        );
      },
      empty: function () {
        return (
          this.max.x < this.min.x ||
          this.max.y < this.min.y ||
          this.max.z < this.min.z
        );
      },
      center: function (a) {
        var b = a || new THREE.Vector3();
        return b.addVectors(this.min, this.max).multiplyScalar(0.5);
      },
      size: function (a) {
        var b = a || new THREE.Vector3();
        return b.subVectors(this.max, this.min);
      },
      expandByPoint: function (a) {
        return this.min.min(a), this.max.max(a), this;
      },
      expandByVector: function (a) {
        return this.min.sub(a), this.max.add(a), this;
      },
      expandByScalar: function (a) {
        return this.min.addScalar(-a), this.max.addScalar(a), this;
      },
      containsPoint: function (a) {
        return !(
          a.x < this.min.x ||
          a.x > this.max.x ||
          a.y < this.min.y ||
          a.y > this.max.y ||
          a.z < this.min.z ||
          a.z > this.max.z
        );
      },
      containsBox: function (a) {
        return (
          this.min.x <= a.min.x &&
          a.max.x <= this.max.x &&
          this.min.y <= a.min.y &&
          a.max.y <= this.max.y &&
          this.min.z <= a.min.z &&
          a.max.z <= this.max.z
        );
      },
      getParameter: function (a) {
        return new THREE.Vector3(
          (a.x - this.min.x) / (this.max.x - this.min.x),
          (a.y - this.min.y) / (this.max.y - this.min.y),
          (a.z - this.min.z) / (this.max.z - this.min.z)
        );
      },
      isIntersectionBox: function (a) {
        return !(
          a.max.x < this.min.x ||
          a.min.x > this.max.x ||
          a.max.y < this.min.y ||
          a.min.y > this.max.y ||
          a.max.z < this.min.z ||
          a.min.z > this.max.z
        );
      },
      clampPoint: function (a, b) {
        var c = b || new THREE.Vector3();
        return c.copy(a).clamp(this.min, this.max);
      },
      distanceToPoint: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          var c = a.copy(b).clamp(this.min, this.max);
          return c.sub(b).length();
        };
      })(),
      getBoundingSphere: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          var c = b || new THREE.Sphere();
          return (
            (c.center = this.center()),
            (c.radius = 0.5 * this.size(a).length()),
            c
          );
        };
      })(),
      intersect: function (a) {
        return this.min.max(a.min), this.max.min(a.max), this;
      },
      union: function (a) {
        return this.min.min(a.min), this.max.max(a.max), this;
      },
      applyMatrix4: (function () {
        var a = [
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ];
        return function (b) {
          return (
            a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b),
            a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b),
            a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b),
            a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b),
            a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b),
            a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b),
            a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b),
            a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b),
            this.makeEmpty(),
            this.setFromPoints(a),
            this
          );
        };
      })(),
      translate: function (a) {
        return this.min.add(a), this.max.add(a), this;
      },
      equals: function (a) {
        return a.min.equals(this.min) && a.max.equals(this.max);
      },
      clone: function () {
        return new THREE.Box3().copy(this);
      },
    }),
    (THREE.Matrix3 = function (a, b, c, d, e, f, g, h, i) {
      (this.elements = new Float32Array(9)),
        this.set(
          void 0 !== a ? a : 1,
          b || 0,
          c || 0,
          d || 0,
          void 0 !== e ? e : 1,
          f || 0,
          g || 0,
          h || 0,
          void 0 !== i ? i : 1
        );
    }),
    (THREE.Matrix3.prototype = {
      constructor: THREE.Matrix3,
      set: function (a, b, c, d, e, f, g, h, i) {
        var j = this.elements;
        return (
          (j[0] = a),
          (j[3] = b),
          (j[6] = c),
          (j[1] = d),
          (j[4] = e),
          (j[7] = f),
          (j[2] = g),
          (j[5] = h),
          (j[8] = i),
          this
        );
      },
      identity: function () {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
      },
      copy: function (a) {
        var b = a.elements;
        return (
          this.set(b[0], b[3], b[6], b[1], b[4], b[7], b[2], b[5], b[8]), this
        );
      },
      multiplyVector3: function (a) {
        return (
          console.warn(
            "DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."
          ),
          a.applyMatrix3(this)
        );
      },
      multiplyVector3Array: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          for (var c = 0, d = b.length; c < d; c += 3)
            (a.x = b[c]),
              (a.y = b[c + 1]),
              (a.z = b[c + 2]),
              a.applyMatrix3(this),
              (b[c] = a.x),
              (b[c + 1] = a.y),
              (b[c + 2] = a.z);
          return b;
        };
      })(),
      multiplyScalar: function (a) {
        var b = this.elements;
        return (
          (b[0] *= a),
          (b[3] *= a),
          (b[6] *= a),
          (b[1] *= a),
          (b[4] *= a),
          (b[7] *= a),
          (b[2] *= a),
          (b[5] *= a),
          (b[8] *= a),
          this
        );
      },
      determinant: function () {
        var a = this.elements,
          b = a[0],
          c = a[1],
          d = a[2],
          e = a[3],
          f = a[4],
          g = a[5],
          h = a[6],
          i = a[7],
          j = a[8];
        return (
          b * f * j - b * g * i - c * e * j + c * g * h + d * e * i - d * f * h
        );
      },
      getInverse: function (a, b) {
        var c = a.elements,
          d = this.elements;
        (d[0] = c[10] * c[5] - c[6] * c[9]),
          (d[1] = -c[10] * c[1] + c[2] * c[9]),
          (d[2] = c[6] * c[1] - c[2] * c[5]),
          (d[3] = -c[10] * c[4] + c[6] * c[8]),
          (d[4] = c[10] * c[0] - c[2] * c[8]),
          (d[5] = -c[6] * c[0] + c[2] * c[4]),
          (d[6] = c[9] * c[4] - c[5] * c[8]),
          (d[7] = -c[9] * c[0] + c[1] * c[8]),
          (d[8] = c[5] * c[0] - c[1] * c[4]);
        var e = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
        if (0 === e) {
          var f = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
          if (b) throw new Error(f);
          return console.warn(f), this.identity(), this;
        }
        return this.multiplyScalar(1 / e), this;
      },
      transpose: function () {
        var a,
          b = this.elements;
        return (
          (a = b[1]),
          (b[1] = b[3]),
          (b[3] = a),
          (a = b[2]),
          (b[2] = b[6]),
          (b[6] = a),
          (a = b[5]),
          (b[5] = b[7]),
          (b[7] = a),
          this
        );
      },
      getNormalMatrix: function (a) {
        return this.getInverse(a).transpose(), this;
      },
      transposeIntoArray: function (a) {
        var b = this.elements;
        return (
          (a[0] = b[0]),
          (a[1] = b[3]),
          (a[2] = b[6]),
          (a[3] = b[1]),
          (a[4] = b[4]),
          (a[5] = b[7]),
          (a[6] = b[2]),
          (a[7] = b[5]),
          (a[8] = b[8]),
          this
        );
      },
      clone: function () {
        var a = this.elements;
        return new THREE.Matrix3(
          a[0],
          a[3],
          a[6],
          a[1],
          a[4],
          a[7],
          a[2],
          a[5],
          a[8]
        );
      },
    }),
    (THREE.Matrix4 = function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
      this.elements = new Float32Array(16);
      var q = this.elements;
      (q[0] = void 0 !== a ? a : 1),
        (q[4] = b || 0),
        (q[8] = c || 0),
        (q[12] = d || 0),
        (q[1] = e || 0),
        (q[5] = void 0 !== f ? f : 1),
        (q[9] = g || 0),
        (q[13] = h || 0),
        (q[2] = i || 0),
        (q[6] = j || 0),
        (q[10] = void 0 !== k ? k : 1),
        (q[14] = l || 0),
        (q[3] = m || 0),
        (q[7] = n || 0),
        (q[11] = o || 0),
        (q[15] = void 0 !== p ? p : 1);
    }),
    (THREE.Matrix4.prototype = {
      constructor: THREE.Matrix4,
      set: function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        var q = this.elements;
        return (
          (q[0] = a),
          (q[4] = b),
          (q[8] = c),
          (q[12] = d),
          (q[1] = e),
          (q[5] = f),
          (q[9] = g),
          (q[13] = h),
          (q[2] = i),
          (q[6] = j),
          (q[10] = k),
          (q[14] = l),
          (q[3] = m),
          (q[7] = n),
          (q[11] = o),
          (q[15] = p),
          this
        );
      },
      identity: function () {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
      },
      copy: function (a) {
        return this.elements.set(a.elements), this;
      },
      extractPosition: function (a) {
        return (
          console.warn(
            "DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition()."
          ),
          this.copyPosition(a)
        );
      },
      copyPosition: function (a) {
        var b = this.elements,
          c = a.elements;
        return (b[12] = c[12]), (b[13] = c[13]), (b[14] = c[14]), this;
      },
      extractRotation: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          var c = this.elements,
            d = b.elements,
            e = 1 / a.set(d[0], d[1], d[2]).length(),
            f = 1 / a.set(d[4], d[5], d[6]).length(),
            g = 1 / a.set(d[8], d[9], d[10]).length();
          return (
            (c[0] = d[0] * e),
            (c[1] = d[1] * e),
            (c[2] = d[2] * e),
            (c[4] = d[4] * f),
            (c[5] = d[5] * f),
            (c[6] = d[6] * f),
            (c[8] = d[8] * g),
            (c[9] = d[9] * g),
            (c[10] = d[10] * g),
            this
          );
        };
      })(),
      makeRotationFromEuler: function (a) {
        void 0 === typeof a.order &&
          console.error(
            "ERROR: Matrix's .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code."
          );
        var b = this.elements,
          c = a.x,
          d = a.y,
          e = a.z,
          f = Math.cos(c),
          g = Math.sin(c),
          h = Math.cos(d),
          i = Math.sin(d),
          j = Math.cos(e),
          k = Math.sin(e);
        if (void 0 === a.order || "XYZ" === a.order) {
          var l = f * j,
            m = f * k,
            n = g * j,
            o = g * k;
          (b[0] = h * j),
            (b[4] = -h * k),
            (b[8] = i),
            (b[1] = m + n * i),
            (b[5] = l - o * i),
            (b[9] = -g * h),
            (b[2] = o - l * i),
            (b[6] = n + m * i),
            (b[10] = f * h);
        } else if ("YXZ" === a.order) {
          var p = h * j,
            q = h * k,
            r = i * j,
            s = i * k;
          (b[0] = p + s * g),
            (b[4] = r * g - q),
            (b[8] = f * i),
            (b[1] = f * k),
            (b[5] = f * j),
            (b[9] = -g),
            (b[2] = q * g - r),
            (b[6] = s + p * g),
            (b[10] = f * h);
        } else if ("ZXY" === a.order) {
          var p = h * j,
            q = h * k,
            r = i * j,
            s = i * k;
          (b[0] = p - s * g),
            (b[4] = -f * k),
            (b[8] = r + q * g),
            (b[1] = q + r * g),
            (b[5] = f * j),
            (b[9] = s - p * g),
            (b[2] = -f * i),
            (b[6] = g),
            (b[10] = f * h);
        } else if ("ZYX" === a.order) {
          var l = f * j,
            m = f * k,
            n = g * j,
            o = g * k;
          (b[0] = h * j),
            (b[4] = n * i - m),
            (b[8] = l * i + o),
            (b[1] = h * k),
            (b[5] = o * i + l),
            (b[9] = m * i - n),
            (b[2] = -i),
            (b[6] = g * h),
            (b[10] = f * h);
        } else if ("YZX" === a.order) {
          var t = f * h,
            u = f * i,
            v = g * h,
            w = g * i;
          (b[0] = h * j),
            (b[4] = w - t * k),
            (b[8] = v * k + u),
            (b[1] = k),
            (b[5] = f * j),
            (b[9] = -g * j),
            (b[2] = -i * j),
            (b[6] = u * k + v),
            (b[10] = t - w * k);
        } else if ("XZY" === a.order) {
          var t = f * h,
            u = f * i,
            v = g * h,
            w = g * i;
          (b[0] = h * j),
            (b[4] = -k),
            (b[8] = i * j),
            (b[1] = t * k + w),
            (b[5] = f * j),
            (b[9] = u * k - v),
            (b[2] = v * k - u),
            (b[6] = g * j),
            (b[10] = w * k + t);
        }
        return (
          (b[3] = 0),
          (b[7] = 0),
          (b[11] = 0),
          (b[12] = 0),
          (b[13] = 0),
          (b[14] = 0),
          (b[15] = 1),
          this
        );
      },
      setRotationFromQuaternion: function (a) {
        return (
          console.warn(
            "DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code."
          ),
          this.makeRotationFromQuaternion(a)
        );
      },
      makeRotationFromQuaternion: function (a) {
        var b = this.elements,
          c = a.x,
          d = a.y,
          e = a.z,
          f = a.w,
          g = c + c,
          h = d + d,
          i = e + e,
          j = c * g,
          k = c * h,
          l = c * i,
          m = d * h,
          n = d * i,
          o = e * i,
          p = f * g,
          q = f * h,
          r = f * i;
        return (
          (b[0] = 1 - (m + o)),
          (b[4] = k - r),
          (b[8] = l + q),
          (b[1] = k + r),
          (b[5] = 1 - (j + o)),
          (b[9] = n - p),
          (b[2] = l - q),
          (b[6] = n + p),
          (b[10] = 1 - (j + m)),
          (b[3] = 0),
          (b[7] = 0),
          (b[11] = 0),
          (b[12] = 0),
          (b[13] = 0),
          (b[14] = 0),
          (b[15] = 1),
          this
        );
      },
      lookAt: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Vector3(),
          c = new THREE.Vector3();
        return function (d, e, f) {
          var g = this.elements;
          return (
            c.subVectors(d, e).normalize(),
            0 === c.length() && (c.z = 1),
            a.crossVectors(f, c).normalize(),
            0 === a.length() &&
              ((c.x += 1e-4), a.crossVectors(f, c).normalize()),
            b.crossVectors(c, a),
            (g[0] = a.x),
            (g[4] = b.x),
            (g[8] = c.x),
            (g[1] = a.y),
            (g[5] = b.y),
            (g[9] = c.y),
            (g[2] = a.z),
            (g[6] = b.z),
            (g[10] = c.z),
            this
          );
        };
      })(),
      multiply: function (a, b) {
        return void 0 !== b
          ? (console.warn(
              "DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
            ),
            this.multiplyMatrices(a, b))
          : this.multiplyMatrices(this, a);
      },
      multiplyMatrices: function (a, b) {
        var c = a.elements,
          d = b.elements,
          e = this.elements,
          f = c[0],
          g = c[4],
          h = c[8],
          i = c[12],
          j = c[1],
          k = c[5],
          l = c[9],
          m = c[13],
          n = c[2],
          o = c[6],
          p = c[10],
          q = c[14],
          r = c[3],
          s = c[7],
          t = c[11],
          u = c[15],
          v = d[0],
          w = d[4],
          x = d[8],
          y = d[12],
          z = d[1],
          A = d[5],
          B = d[9],
          C = d[13],
          D = d[2],
          E = d[6],
          F = d[10],
          G = d[14],
          H = d[3],
          I = d[7],
          J = d[11],
          K = d[15];
        return (
          (e[0] = f * v + g * z + h * D + i * H),
          (e[4] = f * w + g * A + h * E + i * I),
          (e[8] = f * x + g * B + h * F + i * J),
          (e[12] = f * y + g * C + h * G + i * K),
          (e[1] = j * v + k * z + l * D + m * H),
          (e[5] = j * w + k * A + l * E + m * I),
          (e[9] = j * x + k * B + l * F + m * J),
          (e[13] = j * y + k * C + l * G + m * K),
          (e[2] = n * v + o * z + p * D + q * H),
          (e[6] = n * w + o * A + p * E + q * I),
          (e[10] = n * x + o * B + p * F + q * J),
          (e[14] = n * y + o * C + p * G + q * K),
          (e[3] = r * v + s * z + t * D + u * H),
          (e[7] = r * w + s * A + t * E + u * I),
          (e[11] = r * x + s * B + t * F + u * J),
          (e[15] = r * y + s * C + t * G + u * K),
          this
        );
      },
      multiplyToArray: function (a, b, c) {
        var d = this.elements;
        return (
          this.multiplyMatrices(a, b),
          (c[0] = d[0]),
          (c[1] = d[1]),
          (c[2] = d[2]),
          (c[3] = d[3]),
          (c[4] = d[4]),
          (c[5] = d[5]),
          (c[6] = d[6]),
          (c[7] = d[7]),
          (c[8] = d[8]),
          (c[9] = d[9]),
          (c[10] = d[10]),
          (c[11] = d[11]),
          (c[12] = d[12]),
          (c[13] = d[13]),
          (c[14] = d[14]),
          (c[15] = d[15]),
          this
        );
      },
      multiplyScalar: function (a) {
        var b = this.elements;
        return (
          (b[0] *= a),
          (b[4] *= a),
          (b[8] *= a),
          (b[12] *= a),
          (b[1] *= a),
          (b[5] *= a),
          (b[9] *= a),
          (b[13] *= a),
          (b[2] *= a),
          (b[6] *= a),
          (b[10] *= a),
          (b[14] *= a),
          (b[3] *= a),
          (b[7] *= a),
          (b[11] *= a),
          (b[15] *= a),
          this
        );
      },
      multiplyVector3: function (a) {
        return (
          console.warn(
            "DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."
          ),
          a.applyProjection(this)
        );
      },
      multiplyVector4: function (a) {
        return (
          console.warn(
            "DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."
          ),
          a.applyMatrix4(this)
        );
      },
      multiplyVector3Array: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          for (var c = 0, d = b.length; c < d; c += 3)
            (a.x = b[c]),
              (a.y = b[c + 1]),
              (a.z = b[c + 2]),
              a.applyProjection(this),
              (b[c] = a.x),
              (b[c + 1] = a.y),
              (b[c + 2] = a.z);
          return b;
        };
      })(),
      rotateAxis: function (a) {
        console.warn(
          "DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."
        ),
          a.transformDirection(this);
      },
      crossVector: function (a) {
        return (
          console.warn(
            "DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."
          ),
          a.applyMatrix4(this)
        );
      },
      determinant: function () {
        var a = this.elements,
          b = a[0],
          c = a[4],
          d = a[8],
          e = a[12],
          f = a[1],
          g = a[5],
          h = a[9],
          i = a[13],
          j = a[2],
          k = a[6],
          l = a[10],
          m = a[14],
          n = a[3],
          o = a[7],
          p = a[11],
          q = a[15];
        return (
          n *
            (+e * h * k -
              d * i * k -
              e * g * l +
              c * i * l +
              d * g * m -
              c * h * m) +
          o *
            (+b * h * m -
              b * i * l +
              e * f * l -
              d * f * m +
              d * i * j -
              e * h * j) +
          p *
            (+b * i * k -
              b * g * m -
              e * f * k +
              c * f * m +
              e * g * j -
              c * i * j) +
          q *
            (-d * g * j -
              b * h * k +
              b * g * l +
              d * f * k -
              c * f * l +
              c * h * j)
        );
      },
      transpose: function () {
        var a,
          b = this.elements;
        return (
          (a = b[1]),
          (b[1] = b[4]),
          (b[4] = a),
          (a = b[2]),
          (b[2] = b[8]),
          (b[8] = a),
          (a = b[6]),
          (b[6] = b[9]),
          (b[9] = a),
          (a = b[3]),
          (b[3] = b[12]),
          (b[12] = a),
          (a = b[7]),
          (b[7] = b[13]),
          (b[13] = a),
          (a = b[11]),
          (b[11] = b[14]),
          (b[14] = a),
          this
        );
      },
      flattenToArray: function (a) {
        var b = this.elements;
        return (
          (a[0] = b[0]),
          (a[1] = b[1]),
          (a[2] = b[2]),
          (a[3] = b[3]),
          (a[4] = b[4]),
          (a[5] = b[5]),
          (a[6] = b[6]),
          (a[7] = b[7]),
          (a[8] = b[8]),
          (a[9] = b[9]),
          (a[10] = b[10]),
          (a[11] = b[11]),
          (a[12] = b[12]),
          (a[13] = b[13]),
          (a[14] = b[14]),
          (a[15] = b[15]),
          a
        );
      },
      flattenToArrayOffset: function (a, b) {
        var c = this.elements;
        return (
          (a[b] = c[0]),
          (a[b + 1] = c[1]),
          (a[b + 2] = c[2]),
          (a[b + 3] = c[3]),
          (a[b + 4] = c[4]),
          (a[b + 5] = c[5]),
          (a[b + 6] = c[6]),
          (a[b + 7] = c[7]),
          (a[b + 8] = c[8]),
          (a[b + 9] = c[9]),
          (a[b + 10] = c[10]),
          (a[b + 11] = c[11]),
          (a[b + 12] = c[12]),
          (a[b + 13] = c[13]),
          (a[b + 14] = c[14]),
          (a[b + 15] = c[15]),
          a
        );
      },
      getPosition: (function () {
        var a = new THREE.Vector3();
        return function () {
          console.warn(
            "DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead."
          );
          var b = this.elements;
          return a.set(b[12], b[13], b[14]);
        };
      })(),
      setPosition: function (a) {
        var b = this.elements;
        return (b[12] = a.x), (b[13] = a.y), (b[14] = a.z), this;
      },
      getInverse: function (a, b) {
        var c = this.elements,
          d = a.elements,
          e = d[0],
          f = d[4],
          g = d[8],
          h = d[12],
          i = d[1],
          j = d[5],
          k = d[9],
          l = d[13],
          m = d[2],
          n = d[6],
          o = d[10],
          p = d[14],
          q = d[3],
          r = d[7],
          s = d[11],
          t = d[15];
        (c[0] =
          k * p * r -
          l * o * r +
          l * n * s -
          j * p * s -
          k * n * t +
          j * o * t),
          (c[4] =
            h * o * r -
            g * p * r -
            h * n * s +
            f * p * s +
            g * n * t -
            f * o * t),
          (c[8] =
            g * l * r -
            h * k * r +
            h * j * s -
            f * l * s -
            g * j * t +
            f * k * t),
          (c[12] =
            h * k * n -
            g * l * n -
            h * j * o +
            f * l * o +
            g * j * p -
            f * k * p),
          (c[1] =
            l * o * q -
            k * p * q -
            l * m * s +
            i * p * s +
            k * m * t -
            i * o * t),
          (c[5] =
            g * p * q -
            h * o * q +
            h * m * s -
            e * p * s -
            g * m * t +
            e * o * t),
          (c[9] =
            h * k * q -
            g * l * q -
            h * i * s +
            e * l * s +
            g * i * t -
            e * k * t),
          (c[13] =
            g * l * m -
            h * k * m +
            h * i * o -
            e * l * o -
            g * i * p +
            e * k * p),
          (c[2] =
            j * p * q -
            l * n * q +
            l * m * r -
            i * p * r -
            j * m * t +
            i * n * t),
          (c[6] =
            h * n * q -
            f * p * q -
            h * m * r +
            e * p * r +
            f * m * t -
            e * n * t),
          (c[10] =
            f * l * q -
            h * j * q +
            h * i * r -
            e * l * r -
            f * i * t +
            e * j * t),
          (c[14] =
            h * j * m -
            f * l * m -
            h * i * n +
            e * l * n +
            f * i * p -
            e * j * p),
          (c[3] =
            k * n * q -
            j * o * q -
            k * m * r +
            i * o * r +
            j * m * s -
            i * n * s),
          (c[7] =
            f * o * q -
            g * n * q +
            g * m * r -
            e * o * r -
            f * m * s +
            e * n * s),
          (c[11] =
            g * j * q -
            f * k * q -
            g * i * r +
            e * k * r +
            f * i * s -
            e * j * s),
          (c[15] =
            f * k * m -
            g * j * m +
            g * i * n -
            e * k * n -
            f * i * o +
            e * j * o);
        var u = e * c[0] + i * c[4] + m * c[8] + q * c[12];
        if (0 == u) {
          var v = "Matrix4.getInverse(): can't invert matrix, determinant is 0";
          if (b) throw new Error(v);
          return console.warn(v), this.identity(), this;
        }
        return this.multiplyScalar(1 / u), this;
      },
      translate: function (a) {
        console.warn("DEPRECATED: Matrix4's .translate() has been removed.");
      },
      rotateX: function (a) {
        console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.");
      },
      rotateY: function (a) {
        console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.");
      },
      rotateZ: function (a) {
        console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.");
      },
      rotateByAxis: function (a, b) {
        console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.");
      },
      scale: function (a) {
        var b = this.elements,
          c = a.x,
          d = a.y,
          e = a.z;
        return (
          (b[0] *= c),
          (b[4] *= d),
          (b[8] *= e),
          (b[1] *= c),
          (b[5] *= d),
          (b[9] *= e),
          (b[2] *= c),
          (b[6] *= d),
          (b[10] *= e),
          (b[3] *= c),
          (b[7] *= d),
          (b[11] *= e),
          this
        );
      },
      getMaxScaleOnAxis: function () {
        var a = this.elements,
          b = a[0] * a[0] + a[1] * a[1] + a[2] * a[2],
          c = a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
          d = a[8] * a[8] + a[9] * a[9] + a[10] * a[10];
        return Math.sqrt(Math.max(b, Math.max(c, d)));
      },
      makeTranslation: function (a, b, c) {
        return this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1), this;
      },
      makeRotationX: function (a) {
        var b = Math.cos(a),
          c = Math.sin(a);
        return this.set(1, 0, 0, 0, 0, b, -c, 0, 0, c, b, 0, 0, 0, 0, 1), this;
      },
      makeRotationY: function (a) {
        var b = Math.cos(a),
          c = Math.sin(a);
        return this.set(b, 0, c, 0, 0, 1, 0, 0, -c, 0, b, 0, 0, 0, 0, 1), this;
      },
      makeRotationZ: function (a) {
        var b = Math.cos(a),
          c = Math.sin(a);
        return this.set(b, -c, 0, 0, c, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
      },
      makeRotationAxis: function (a, b) {
        var c = Math.cos(b),
          d = Math.sin(b),
          e = 1 - c,
          f = a.x,
          g = a.y,
          h = a.z,
          i = e * f,
          j = e * g;
        return (
          this.set(
            i * f + c,
            i * g - d * h,
            i * h + d * g,
            0,
            i * g + d * h,
            j * g + c,
            j * h - d * f,
            0,
            i * h - d * g,
            j * h + d * f,
            e * h * h + c,
            0,
            0,
            0,
            0,
            1
          ),
          this
        );
      },
      makeScale: function (a, b, c) {
        return this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1), this;
      },
      compose: function (a, b, c) {
        return (
          this.makeRotationFromQuaternion(b),
          this.scale(c),
          this.setPosition(a),
          this
        );
      },
      decompose: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Matrix4();
        return function (c, d, e) {
          var f = this.elements,
            g = a.set(f[0], f[1], f[2]).length(),
            h = a.set(f[4], f[5], f[6]).length(),
            i = a.set(f[8], f[9], f[10]).length();
          (c.x = f[12]),
            (c.y = f[13]),
            (c.z = f[14]),
            b.elements.set(this.elements);
          var j = 1 / g,
            k = 1 / h,
            l = 1 / i;
          return (
            (b.elements[0] *= j),
            (b.elements[1] *= j),
            (b.elements[2] *= j),
            (b.elements[4] *= k),
            (b.elements[5] *= k),
            (b.elements[6] *= k),
            (b.elements[8] *= l),
            (b.elements[9] *= l),
            (b.elements[10] *= l),
            d.setFromRotationMatrix(b),
            (e.x = g),
            (e.y = h),
            (e.z = i),
            this
          );
        };
      })(),
      makeFrustum: function (a, b, c, d, e, f) {
        var g = this.elements,
          h = (2 * e) / (b - a),
          i = (2 * e) / (d - c),
          j = (b + a) / (b - a),
          k = (d + c) / (d - c),
          l = -(f + e) / (f - e),
          m = (-2 * f * e) / (f - e);
        return (
          (g[0] = h),
          (g[4] = 0),
          (g[8] = j),
          (g[12] = 0),
          (g[1] = 0),
          (g[5] = i),
          (g[9] = k),
          (g[13] = 0),
          (g[2] = 0),
          (g[6] = 0),
          (g[10] = l),
          (g[14] = m),
          (g[3] = 0),
          (g[7] = 0),
          (g[11] = -1),
          (g[15] = 0),
          this
        );
      },
      makePerspective: function (a, b, c, d) {
        var e = c * Math.tan(THREE.Math.degToRad(0.5 * a)),
          f = -e,
          g = f * b,
          h = e * b;
        return this.makeFrustum(g, h, f, e, c, d);
      },
      makeOrthographic: function (a, b, c, d, e, f) {
        var g = this.elements,
          h = b - a,
          i = c - d,
          j = f - e,
          k = (b + a) / h,
          l = (c + d) / i,
          m = (f + e) / j;
        return (
          (g[0] = 2 / h),
          (g[4] = 0),
          (g[8] = 0),
          (g[12] = -k),
          (g[1] = 0),
          (g[5] = 2 / i),
          (g[9] = 0),
          (g[13] = -l),
          (g[2] = 0),
          (g[6] = 0),
          (g[10] = -2 / j),
          (g[14] = -m),
          (g[3] = 0),
          (g[7] = 0),
          (g[11] = 0),
          (g[15] = 1),
          this
        );
      },
      fromArray: function (a) {
        return this.elements.set(a), this;
      },
      toArray: function () {
        var a = this.elements;
        return [
          a[0],
          a[1],
          a[2],
          a[3],
          a[4],
          a[5],
          a[6],
          a[7],
          a[8],
          a[9],
          a[10],
          a[11],
          a[12],
          a[13],
          a[14],
          a[15],
        ];
      },
      clone: function () {
        var a = this.elements;
        return new THREE.Matrix4(
          a[0],
          a[4],
          a[8],
          a[12],
          a[1],
          a[5],
          a[9],
          a[13],
          a[2],
          a[6],
          a[10],
          a[14],
          a[3],
          a[7],
          a[11],
          a[15]
        );
      },
    }),
    (THREE.Ray = function (a, b) {
      (this.origin = void 0 !== a ? a : new THREE.Vector3()),
        (this.direction = void 0 !== b ? b : new THREE.Vector3());
    }),
    (THREE.Ray.prototype = {
      constructor: THREE.Ray,
      set: function (a, b) {
        return this.origin.copy(a), this.direction.copy(b), this;
      },
      copy: function (a) {
        return (
          this.origin.copy(a.origin), this.direction.copy(a.direction), this
        );
      },
      at: function (a, b) {
        var c = b || new THREE.Vector3();
        return c.copy(this.direction).multiplyScalar(a).add(this.origin);
      },
      recast: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          return this.origin.copy(this.at(b, a)), this;
        };
      })(),
      closestPointToPoint: function (a, b) {
        var c = b || new THREE.Vector3();
        c.subVectors(a, this.origin);
        var d = c.dot(this.direction);
        return d < 0
          ? c.copy(this.origin)
          : c.copy(this.direction).multiplyScalar(d).add(this.origin);
      },
      distanceToPoint: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          var c = a.subVectors(b, this.origin).dot(this.direction);
          return c < 0
            ? this.origin.distanceTo(b)
            : (a.copy(this.direction).multiplyScalar(c).add(this.origin),
              a.distanceTo(b));
        };
      })(),
      distanceSqToSegment: function (a, b, c, d) {
        var e,
          f,
          g,
          h,
          i = a.clone().add(b).multiplyScalar(0.5),
          j = b.clone().sub(a).normalize(),
          k = 0.5 * a.distanceTo(b),
          l = this.origin.clone().sub(i),
          m = -this.direction.dot(j),
          n = l.dot(this.direction),
          o = -l.dot(j),
          p = l.lengthSq(),
          q = Math.abs(1 - m * m);
        if (q >= 0)
          if (((e = m * o - n), (f = m * n - o), (h = k * q), e >= 0))
            if (f >= -h)
              if (f <= h) {
                var r = 1 / q;
                (e *= r),
                  (f *= r),
                  (g = e * (e + m * f + 2 * n) + f * (m * e + f + 2 * o) + p);
              } else
                (f = k),
                  (e = Math.max(0, -(m * f + n))),
                  (g = -e * e + f * (f + 2 * o) + p);
            else
              (f = -k),
                (e = Math.max(0, -(m * f + n))),
                (g = -e * e + f * (f + 2 * o) + p);
          else
            f <= -h
              ? ((e = Math.max(0, -(-m * k + n))),
                (f = e > 0 ? -k : Math.min(Math.max(-k, -o), k)),
                (g = -e * e + f * (f + 2 * o) + p))
              : f <= h
              ? ((e = 0),
                (f = Math.min(Math.max(-k, -o), k)),
                (g = f * (f + 2 * o) + p))
              : ((e = Math.max(0, -(m * k + n))),
                (f = e > 0 ? k : Math.min(Math.max(-k, -o), k)),
                (g = -e * e + f * (f + 2 * o) + p));
        else
          (f = m > 0 ? -k : k),
            (e = Math.max(0, -(m * f + n))),
            (g = -e * e + f * (f + 2 * o) + p);
        return (
          c &&
            c.copy(this.direction.clone().multiplyScalar(e).add(this.origin)),
          d && d.copy(j.clone().multiplyScalar(f).add(i)),
          g
        );
      },
      isIntersectionSphere: function (a) {
        return this.distanceToPoint(a.center) <= a.radius;
      },
      isIntersectionPlane: function (a) {
        var b = a.distanceToPoint(this.origin);
        if (0 === b) return !0;
        var c = a.normal.dot(this.direction);
        return c * b < 0;
      },
      distanceToPlane: function (a) {
        var b = a.normal.dot(this.direction);
        if (0 == b) return 0 == a.distanceToPoint(this.origin) ? 0 : null;
        var c = -(this.origin.dot(a.normal) + a.constant) / b;
        return c >= 0 ? c : null;
      },
      intersectPlane: function (a, b) {
        var c = this.distanceToPlane(a);
        return null === c ? null : this.at(c, b);
      },
      applyMatrix4: function (a) {
        return (
          this.direction.add(this.origin).applyMatrix4(a),
          this.origin.applyMatrix4(a),
          this.direction.sub(this.origin),
          this
        );
      },
      equals: function (a) {
        return (
          a.origin.equals(this.origin) && a.direction.equals(this.direction)
        );
      },
      clone: function () {
        return new THREE.Ray().copy(this);
      },
    }),
    (THREE.Sphere = function (a, b) {
      (this.center = void 0 !== a ? a : new THREE.Vector3()),
        (this.radius = void 0 !== b ? b : 0);
    }),
    (THREE.Sphere.prototype = {
      constructor: THREE.Sphere,
      set: function (a, b) {
        return this.center.copy(a), (this.radius = b), this;
      },
      setFromPoints: function (a) {
        for (var b, c = 0, d = 0, e = a.length; d < e; d++)
          (b = a[d].lengthSq()), (c = Math.max(c, b));
        return this.center.set(0, 0, 0), (this.radius = Math.sqrt(c)), this;
      },
      copy: function (a) {
        return this.center.copy(a.center), (this.radius = a.radius), this;
      },
      empty: function () {
        return this.radius <= 0;
      },
      containsPoint: function (a) {
        return a.distanceToSquared(this.center) <= this.radius * this.radius;
      },
      distanceToPoint: function (a) {
        return a.distanceTo(this.center) - this.radius;
      },
      intersectsSphere: function (a) {
        var b = this.radius + a.radius;
        return a.center.distanceToSquared(this.center) <= b * b;
      },
      clampPoint: function (a, b) {
        var c = this.center.distanceToSquared(a),
          d = b || new THREE.Vector3();
        return (
          d.copy(a),
          c > this.radius * this.radius &&
            (d.sub(this.center).normalize(),
            d.multiplyScalar(this.radius).add(this.center)),
          d
        );
      },
      getBoundingBox: function (a) {
        var b = a || new THREE.Box3();
        return (
          b.set(this.center, this.center), b.expandByScalar(this.radius), b
        );
      },
      applyMatrix4: function (a) {
        return (
          this.center.applyMatrix4(a),
          (this.radius = this.radius * a.getMaxScaleOnAxis()),
          this
        );
      },
      translate: function (a) {
        return this.center.add(a), this;
      },
      equals: function (a) {
        return a.center.equals(this.center) && a.radius === this.radius;
      },
      clone: function () {
        return new THREE.Sphere().copy(this);
      },
    }),
    (THREE.Frustum = function (a, b, c, d, e, f) {
      this.planes = [
        void 0 !== a ? a : new THREE.Plane(),
        void 0 !== b ? b : new THREE.Plane(),
        void 0 !== c ? c : new THREE.Plane(),
        void 0 !== d ? d : new THREE.Plane(),
        void 0 !== e ? e : new THREE.Plane(),
        void 0 !== f ? f : new THREE.Plane(),
      ];
    }),
    (THREE.Frustum.prototype = {
      constructor: THREE.Frustum,
      set: function (a, b, c, d, e, f) {
        var g = this.planes;
        return (
          g[0].copy(a),
          g[1].copy(b),
          g[2].copy(c),
          g[3].copy(d),
          g[4].copy(e),
          g[5].copy(f),
          this
        );
      },
      copy: function (a) {
        for (var b = this.planes, c = 0; c < 6; c++) b[c].copy(a.planes[c]);
        return this;
      },
      setFromMatrix: function (a) {
        var b = this.planes,
          c = a.elements,
          d = c[0],
          e = c[1],
          f = c[2],
          g = c[3],
          h = c[4],
          i = c[5],
          j = c[6],
          k = c[7],
          l = c[8],
          m = c[9],
          n = c[10],
          o = c[11],
          p = c[12],
          q = c[13],
          r = c[14],
          s = c[15];
        return (
          b[0].setComponents(g - d, k - h, o - l, s - p).normalize(),
          b[1].setComponents(g + d, k + h, o + l, s + p).normalize(),
          b[2].setComponents(g + e, k + i, o + m, s + q).normalize(),
          b[3].setComponents(g - e, k - i, o - m, s - q).normalize(),
          b[4].setComponents(g - f, k - j, o - n, s - r).normalize(),
          b[5].setComponents(g + f, k + j, o + n, s + r).normalize(),
          this
        );
      },
      intersectsObject: (function () {
        var a = new THREE.Vector3();
        return function (b) {
          var c = b.geometry,
            d = b.matrixWorld;
          null === c.boundingSphere && c.computeBoundingSphere();
          var e = -c.boundingSphere.radius * d.getMaxScaleOnAxis();
          a.getPositionFromMatrix(d);
          for (var f = this.planes, g = 0; g < 6; g++) {
            var h = f[g].distanceToPoint(a);
            if (h < e) return !1;
          }
          return !0;
        };
      })(),
      intersectsSphere: function (a) {
        for (
          var b = this.planes, c = a.center, d = -a.radius, e = 0;
          e < 6;
          e++
        ) {
          var f = b[e].distanceToPoint(c);
          if (f < d) return !1;
        }
        return !0;
      },
      intersectsBox: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Vector3();
        return function (c) {
          for (var d = this.planes, e = 0; e < 6; e++) {
            var f = d[e];
            (a.x = f.normal.x > 0 ? c.min.x : c.max.x),
              (b.x = f.normal.x > 0 ? c.max.x : c.min.x),
              (a.y = f.normal.y > 0 ? c.min.y : c.max.y),
              (b.y = f.normal.y > 0 ? c.max.y : c.min.y),
              (a.z = f.normal.z > 0 ? c.min.z : c.max.z),
              (b.z = f.normal.z > 0 ? c.max.z : c.min.z);
            var g = f.distanceToPoint(a),
              h = f.distanceToPoint(b);
            if (g < 0 && h < 0) return !1;
          }
          return !0;
        };
      })(),
      containsPoint: function (a) {
        for (var b = this.planes, c = 0; c < 6; c++)
          if (b[c].distanceToPoint(a) < 0) return !1;
        return !0;
      },
      clone: function () {
        return new THREE.Frustum().copy(this);
      },
    }),
    (THREE.Plane = function (a, b) {
      (this.normal = void 0 !== a ? a : new THREE.Vector3(1, 0, 0)),
        (this.constant = void 0 !== b ? b : 0);
    }),
    (THREE.Plane.prototype = {
      constructor: THREE.Plane,
      set: function (a, b) {
        return this.normal.copy(a), (this.constant = b), this;
      },
      setComponents: function (a, b, c, d) {
        return this.normal.set(a, b, c), (this.constant = d), this;
      },
      setFromNormalAndCoplanarPoint: function (a, b) {
        return this.normal.copy(a), (this.constant = -b.dot(this.normal)), this;
      },
      setFromCoplanarPoints: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Vector3();
        return function (c, d, e) {
          var f = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
          return this.setFromNormalAndCoplanarPoint(f, c), this;
        };
      })(),
      copy: function (a) {
        return this.normal.copy(a.normal), (this.constant = a.constant), this;
      },
      normalize: function () {
        var a = 1 / this.normal.length();
        return this.normal.multiplyScalar(a), (this.constant *= a), this;
      },
      negate: function () {
        return (this.constant *= -1), this.normal.negate(), this;
      },
      distanceToPoint: function (a) {
        return this.normal.dot(a) + this.constant;
      },
      distanceToSphere: function (a) {
        return this.distanceToPoint(a.center) - a.radius;
      },
      projectPoint: function (a, b) {
        return this.orthoPoint(a, b).sub(a).negate();
      },
      orthoPoint: function (a, b) {
        var c = this.distanceToPoint(a),
          d = b || new THREE.Vector3();
        return d.copy(this.normal).multiplyScalar(c);
      },
      isIntersectionLine: function (a) {
        var b = this.distanceToPoint(a.start),
          c = this.distanceToPoint(a.end);
        return (b < 0 && c > 0) || (c < 0 && b > 0);
      },
      intersectLine: (function () {
        var a = new THREE.Vector3();
        return function (b, c) {
          var d = c || new THREE.Vector3(),
            e = b.delta(a),
            f = this.normal.dot(e);
          if (0 != f) {
            var g = -(b.start.dot(this.normal) + this.constant) / f;
            if (!(g < 0 || g > 1))
              return d.copy(e).multiplyScalar(g).add(b.start);
          } else if (0 == this.distanceToPoint(b.start)) return d.copy(b.start);
        };
      })(),
      coplanarPoint: function (a) {
        var b = a || new THREE.Vector3();
        return b.copy(this.normal).multiplyScalar(-this.constant);
      },
      applyMatrix4: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Vector3();
        return function (c, d) {
          d = d || new THREE.Matrix3().getNormalMatrix(c);
          var e = a.copy(this.normal).applyMatrix3(d),
            f = this.coplanarPoint(b);
          return (
            f.applyMatrix4(c), this.setFromNormalAndCoplanarPoint(e, f), this
          );
        };
      })(),
      translate: function (a) {
        return (this.constant = this.constant - a.dot(this.normal)), this;
      },
      equals: function (a) {
        return a.normal.equals(this.normal) && a.constant == this.constant;
      },
      clone: function () {
        return new THREE.Plane().copy(this);
      },
    }),
    (THREE.Math = {
      PI2: 2 * Math.PI,
      generateUUID: (function () {
        var a,
          b =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
              ""
            ),
          c = new Array(36),
          d = 0;
        return function () {
          for (var e = 0; e < 36; e++)
            8 == e || 13 == e || 18 == e || 23 == e
              ? (c[e] = "-")
              : 14 == e
              ? (c[e] = "4")
              : (d <= 2 && (d = (33554432 + 16777216 * Math.random()) | 0),
                (a = 15 & d),
                (d >>= 4),
                (c[e] = b[19 == e ? (3 & a) | 8 : a]));
          return c.join("");
        };
      })(),
      clamp: function (a, b, c) {
        return a < b ? b : a > c ? c : a;
      },
      clampBottom: function (a, b) {
        return a < b ? b : a;
      },
      mapLinear: function (a, b, c, d, e) {
        return d + ((a - b) * (e - d)) / (c - b);
      },
      smoothstep: function (a, b, c) {
        return a <= b
          ? 0
          : a >= c
          ? 1
          : ((a = (a - b) / (c - b)), a * a * (3 - 2 * a));
      },
      smootherstep: function (a, b, c) {
        return a <= b
          ? 0
          : a >= c
          ? 1
          : ((a = (a - b) / (c - b)), a * a * a * (a * (6 * a - 15) + 10));
      },
      random16: function () {
        return (65280 * Math.random() + 255 * Math.random()) / 65535;
      },
      randInt: function (a, b) {
        return a + Math.floor(Math.random() * (b - a + 1));
      },
      randFloat: function (a, b) {
        return a + Math.random() * (b - a);
      },
      randFloatSpread: function (a) {
        return a * (0.5 - Math.random());
      },
      sign: function (a) {
        return a < 0 ? -1 : a > 0 ? 1 : 0;
      },
      degToRad: (function () {
        var a = Math.PI / 180;
        return function (b) {
          return b * a;
        };
      })(),
      radToDeg: (function () {
        var a = 180 / Math.PI;
        return function (b) {
          return b * a;
        };
      })(),
    }),
    (THREE.Triangle = function (a, b, c) {
      (this.a = void 0 !== a ? a : new THREE.Vector3()),
        (this.b = void 0 !== b ? b : new THREE.Vector3()),
        (this.c = void 0 !== c ? c : new THREE.Vector3());
    }),
    (THREE.Triangle.normal = (function () {
      var a = new THREE.Vector3();
      return function (b, c, d, e) {
        var f = e || new THREE.Vector3();
        f.subVectors(d, c), a.subVectors(b, c), f.cross(a);
        var g = f.lengthSq();
        return g > 0 ? f.multiplyScalar(1 / Math.sqrt(g)) : f.set(0, 0, 0);
      };
    })()),
    (THREE.Triangle.barycoordFromPoint = (function () {
      var a = new THREE.Vector3(),
        b = new THREE.Vector3(),
        c = new THREE.Vector3();
      return function (d, e, f, g, h) {
        a.subVectors(g, e), b.subVectors(f, e), c.subVectors(d, e);
        var i = a.dot(a),
          j = a.dot(b),
          k = a.dot(c),
          l = b.dot(b),
          m = b.dot(c),
          n = i * l - j * j,
          o = h || new THREE.Vector3();
        if (0 == n) return o.set(-2, -1, -1);
        var p = 1 / n,
          q = (l * k - j * m) * p,
          r = (i * m - j * k) * p;
        return o.set(1 - q - r, r, q);
      };
    })()),
    (THREE.Triangle.containsPoint = (function () {
      var a = new THREE.Vector3();
      return function (b, c, d, e) {
        var f = THREE.Triangle.barycoordFromPoint(b, c, d, e, a);
        return f.x >= 0 && f.y >= 0 && f.x + f.y <= 1;
      };
    })()),
    (THREE.Triangle.prototype = {
      constructor: THREE.Triangle,
      set: function (a, b, c) {
        return this.a.copy(a), this.b.copy(b), this.c.copy(c), this;
      },
      setFromPointsAndIndices: function (a, b, c, d) {
        return this.a.copy(a[b]), this.b.copy(a[c]), this.c.copy(a[d]), this;
      },
      copy: function (a) {
        return this.a.copy(a.a), this.b.copy(a.b), this.c.copy(a.c), this;
      },
      area: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Vector3();
        return function () {
          return (
            a.subVectors(this.c, this.b),
            b.subVectors(this.a, this.b),
            0.5 * a.cross(b).length()
          );
        };
      })(),
      midpoint: function (a) {
        var b = a || new THREE.Vector3();
        return b
          .addVectors(this.a, this.b)
          .add(this.c)
          .multiplyScalar(1 / 3);
      },
      normal: function (a) {
        return THREE.Triangle.normal(this.a, this.b, this.c, a);
      },
      plane: function (a) {
        var b = a || new THREE.Plane();
        return b.setFromCoplanarPoints(this.a, this.b, this.c);
      },
      barycoordFromPoint: function (a, b) {
        return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b);
      },
      containsPoint: function (a) {
        return THREE.Triangle.containsPoint(a, this.a, this.b, this.c);
      },
      equals: function (a) {
        return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c);
      },
      clone: function () {
        return new THREE.Triangle().copy(this);
      },
    }),
    (THREE.Vertex = function (a) {
      return (
        console.warn(
          "THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead."
        ),
        a
      );
    }),
    (THREE.UV = function (a, b) {
      return (
        console.warn(
          "THREE.UV has been DEPRECATED. Use THREE.Vector2 instead."
        ),
        new THREE.Vector2(a, b)
      );
    }),
    (THREE.Clock = function (a) {
      (this.autoStart = void 0 === a || a),
        (this.startTime = 0),
        (this.oldTime = 0),
        (this.elapsedTime = 0),
        (this.running = !1);
    }),
    (THREE.Clock.prototype = {
      constructor: THREE.Clock,
      start: function () {
        (this.startTime =
          void 0 !== self.performance && void 0 !== self.performance.now
            ? self.performance.now()
            : Date.now()),
          (this.oldTime = this.startTime),
          (this.running = !0);
      },
      stop: function () {
        this.getElapsedTime(), (this.running = !1);
      },
      getElapsedTime: function () {
        return this.getDelta(), this.elapsedTime;
      },
      getDelta: function () {
        var a = 0;
        if ((this.autoStart && !this.running && this.start(), this.running)) {
          var b =
            void 0 !== self.performance && void 0 !== self.performance.now
              ? self.performance.now()
              : Date.now();
          (a = 0.001 * (b - this.oldTime)),
            (this.oldTime = b),
            (this.elapsedTime += a);
        }
        return a;
      },
    }),
    (THREE.EventDispatcher = function () {}),
    (THREE.EventDispatcher.prototype = {
      constructor: THREE.EventDispatcher,
      apply: function (a) {
        (a.addEventListener = THREE.EventDispatcher.prototype.addEventListener),
          (a.hasEventListener =
            THREE.EventDispatcher.prototype.hasEventListener),
          (a.removeEventListener =
            THREE.EventDispatcher.prototype.removeEventListener),
          (a.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent);
      },
      addEventListener: function (a, b) {
        void 0 === this._listeners && (this._listeners = {});
        var c = this._listeners;
        void 0 === c[a] && (c[a] = []), c[a].indexOf(b) === -1 && c[a].push(b);
      },
      hasEventListener: function (a, b) {
        if (void 0 === this._listeners) return !1;
        var c = this._listeners;
        return void 0 !== c[a] && c[a].indexOf(b) !== -1;
      },
      removeEventListener: function (a, b) {
        if (void 0 !== this._listeners) {
          var c = this._listeners,
            d = c[a].indexOf(b);
          d !== -1 && c[a].splice(d, 1);
        }
      },
      dispatchEvent: function (a) {
        if (void 0 !== this._listeners) {
          var b = this._listeners,
            c = b[a.type];
          if (void 0 !== c) {
            a.target = this;
            for (var d = 0, e = c.length; d < e; d++) c[d].call(this, a);
          }
        }
      },
    }),
    (function (a) {
      a.Raycaster = function (b, c, d, e) {
        (this.ray = new a.Ray(b, c)),
          this.ray.direction.lengthSq() > 0 && this.ray.direction.normalize(),
          (this.near = d || 0),
          (this.far = e || 1 / 0);
      };
      var b = new a.Sphere(),
        c = new a.Ray(),
        d = new a.Plane(),
        e = new a.Vector3(),
        f = new a.Vector3(),
        g = new a.Matrix4(),
        h = function (a, b) {
          return a.distance - b.distance;
        },
        i = function (h, j, k) {
          if (h instanceof a.Particle) {
            f.getPositionFromMatrix(h.matrixWorld);
            var l = j.ray.distanceToPoint(f);
            if (l > h.scale.x) return k;
            k.push({ distance: l, point: h.position, face: null, object: h });
          } else if (h instanceof a.LOD) {
            f.getPositionFromMatrix(h.matrixWorld);
            var l = j.ray.origin.distanceTo(f);
            i(h.getObjectForDistance(l), j, k);
          } else if (h instanceof a.Mesh) {
            var m = h.geometry;
            if (
              (f.getPositionFromMatrix(h.matrixWorld),
              null === m.boundingSphere && m.computeBoundingSphere(),
              b.set(
                f,
                m.boundingSphere.radius * h.matrixWorld.getMaxScaleOnAxis()
              ),
              j.ray.isIntersectionSphere(b) === !1)
            )
              return k;
            var n = m.vertices;
            if (m instanceof a.BufferGeometry) {
              var o = h.material;
              if (void 0 === o) return k;
              if (m.dynamic === !1) return k;
              var p,
                q,
                r,
                s = h.material instanceof a.MeshFaceMaterial,
                t = s === !0 ? h.material.materials : null,
                u = h.material.side,
                v = j.precision;
              g.getInverse(h.matrixWorld), c.copy(j.ray).applyMatrix4(g);
              var w,
                x = !1;
              m.attributes.index
                ? ((x = !0), (w = m.attributes.index.numItems / 3))
                : (w = m.attributes.position.numItems / 9);
              for (
                var y = new a.Vector3(),
                  z = new a.Vector3(),
                  A = new a.Vector3(),
                  B = (new a.Vector3(), new a.Vector3(), 0);
                B < m.offsets.length;
                ++B
              )
                for (
                  var C = m.offsets[B].start,
                    D = m.offsets[B].count,
                    E = m.offsets[B].index,
                    F = C,
                    G = C + D;
                  F < G;
                  F += 3
                ) {
                  x
                    ? ((p = E + m.attributes.index.array[F]),
                      (q = E + m.attributes.index.array[F + 1]),
                      (r = E + m.attributes.index.array[F + 2]))
                    : ((p = E), (q = E + 1), (r = E + 2)),
                    y.set(
                      m.attributes.position.array[3 * p],
                      m.attributes.position.array[3 * p + 1],
                      m.attributes.position.array[3 * p + 2]
                    ),
                    z.set(
                      m.attributes.position.array[3 * q],
                      m.attributes.position.array[3 * q + 1],
                      m.attributes.position.array[3 * q + 2]
                    ),
                    A.set(
                      m.attributes.position.array[3 * r],
                      m.attributes.position.array[3 * r + 1],
                      m.attributes.position.array[3 * r + 2]
                    ),
                    d.setFromCoplanarPoints(y, z, A);
                  var H = c.distanceToPlane(d);
                  if (!(H < v) && null !== H) {
                    if (((u = o.side), u !== a.DoubleSide)) {
                      var I = c.direction.dot(d.normal);
                      if (!(u === a.FrontSide ? I < 0 : I > 0)) continue;
                    }
                    H < j.near ||
                      H > j.far ||
                      ((e = c.at(H, e)),
                      a.Triangle.containsPoint(e, y, z, A) !== !1 &&
                        k.push({
                          distance: H,
                          point: j.ray.at(H),
                          face: null,
                          faceIndex: null,
                          object: h,
                        }));
                  }
                }
            } else if (m instanceof a.Geometry) {
              var p,
                q,
                r,
                J,
                s = h.material instanceof a.MeshFaceMaterial,
                t = s === !0 ? h.material.materials : null,
                u = h.material.side,
                v = j.precision;
              g.getInverse(h.matrixWorld), c.copy(j.ray).applyMatrix4(g);
              for (var K = 0, w = m.faces.length; K < w; K++) {
                var L = m.faces[K],
                  o = s === !0 ? t[L.materialIndex] : h.material;
                if (void 0 !== o) {
                  d.setFromNormalAndCoplanarPoint(L.normal, n[L.a]);
                  var H = c.distanceToPlane(d);
                  if (!(H < v) && null !== H) {
                    if (((u = o.side), u !== a.DoubleSide)) {
                      var I = c.direction.dot(d.normal);
                      if (!(u === a.FrontSide ? I < 0 : I > 0)) continue;
                    }
                    if (!(H < j.near || H > j.far)) {
                      if (((e = c.at(H, e)), L instanceof a.Face3)) {
                        if (
                          ((p = n[L.a]),
                          (q = n[L.b]),
                          (r = n[L.c]),
                          a.Triangle.containsPoint(e, p, q, r) === !1)
                        )
                          continue;
                      } else {
                        if (!(L instanceof a.Face4))
                          throw Error("face type not supported");
                        if (
                          ((p = n[L.a]),
                          (q = n[L.b]),
                          (r = n[L.c]),
                          (J = n[L.d]),
                          a.Triangle.containsPoint(e, p, q, J) === !1 &&
                            a.Triangle.containsPoint(e, q, r, J) === !1)
                        )
                          continue;
                      }
                      k.push({
                        distance: H,
                        point: j.ray.at(H),
                        face: L,
                        faceIndex: K,
                        object: h,
                      });
                    }
                  }
                }
              }
            }
          } else if (h instanceof a.Line) {
            var v = j.linePrecision,
              M = v * v,
              m = h.geometry;
            if (
              (null === m.boundingSphere && m.computeBoundingSphere(),
              f.getPositionFromMatrix(h.matrixWorld),
              b.set(
                f,
                m.boundingSphere.radius * h.matrixWorld.getMaxScaleOnAxis()
              ),
              j.ray.isIntersectionSphere(b) === !1)
            )
              return k;
            g.getInverse(h.matrixWorld),
              c.copy(j.ray).applyMatrix4(g),
              c.direction.normalize();
            for (
              var n = m.vertices,
                N = n.length,
                O = new a.Vector3(),
                P = new a.Vector3(),
                Q = h.type === a.LineStrip ? 1 : 2,
                F = 0;
              F < N - 1;
              F += Q
            ) {
              var R = c.distanceSqToSegment(n[F], n[F + 1], P, O);
              if (R <= M) {
                var l = c.origin.distanceTo(P);
                j.near <= l &&
                  l <= j.far &&
                  k.push({
                    distance: l,
                    point: O.clone().applyMatrix4(h.matrixWorld),
                    face: null,
                    faceIndex: null,
                    object: h,
                  });
              }
            }
          }
        },
        j = function (a, b, c) {
          for (var d = a.getDescendants(), e = 0, f = d.length; e < f; e++)
            i(d[e], b, c);
        };
      (a.Raycaster.prototype.precision = 1e-4),
        (a.Raycaster.prototype.linePrecision = 1),
        (a.Raycaster.prototype.set = function (a, b) {
          this.ray.set(a, b),
            this.ray.direction.length() > 0 && this.ray.direction.normalize();
        }),
        (a.Raycaster.prototype.intersectObject = function (a, b) {
          var c = [];
          return b === !0 && j(a, this, c), i(a, this, c), c.sort(h), c;
        }),
        (a.Raycaster.prototype.intersectObjects = function (a, b) {
          for (var c = [], d = 0, e = a.length; d < e; d++)
            i(a[d], this, c), b === !0 && j(a[d], this, c);
          return c.sort(h), c;
        });
    })(THREE),
    (THREE.Object3D = function () {
      (this.id = THREE.Object3DIdCount++),
        (this.uuid = THREE.Math.generateUUID()),
        (this.name = ""),
        (this.parent = void 0),
        (this.children = []),
        (this.up = new THREE.Vector3(0, 1, 0)),
        (this.position = new THREE.Vector3()),
        (this.rotation = new THREE.Euler()),
        (this.quaternion = new THREE.Quaternion()),
        (this.scale = new THREE.Vector3(1, 1, 1)),
        (this.rotation._quaternion = this.quaternion),
        (this.quaternion._euler = this.rotation),
        (this.renderDepth = null),
        (this.rotationAutoUpdate = !0),
        (this.matrix = new THREE.Matrix4()),
        (this.matrixWorld = new THREE.Matrix4()),
        (this.matrixAutoUpdate = !0),
        (this.matrixWorldNeedsUpdate = !0),
        (this.visible = !0),
        (this.castShadow = !1),
        (this.receiveShadow = !1),
        (this.frustumCulled = !0),
        (this.userData = {});
    }),
    (THREE.Object3D.prototype = {
      constructor: THREE.Object3D,
      get eulerOrder() {
        return (
          console.warn(
            "DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order."
          ),
          this.rotation.order
        );
      },
      set eulerOrder(a) {
        console.warn(
          "DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order."
        ),
          (this.rotation.order = a);
      },
      get useQuaternion() {
        console.warn(
          "DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default."
        );
      },
      set useQuaternion(a) {
        console.warn(
          "DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default."
        );
      },
      applyMatrix: (function () {
        var a = new THREE.Matrix4();
        return function (b) {
          this.matrix.multiplyMatrices(b, this.matrix),
            this.position.getPositionFromMatrix(this.matrix),
            this.scale.getScaleFromMatrix(this.matrix),
            a.extractRotation(this.matrix),
            this.quaternion.setFromRotationMatrix(a);
        };
      })(),
      setRotationFromAxisAngle: function (a, b) {
        this.quaternion.setFromAxisAngle(a, b);
      },
      setRotationFromEuler: function (a) {
        this.quaternion.setFromEuler(a, !0);
      },
      setRotationFromMatrix: function (a) {
        this.quaternion.setFromRotationMatrix(a);
      },
      setRotationFromQuaternion: function (a) {
        this.quaternion.copy(a);
      },
      rotateOnAxis: (function () {
        var a = new THREE.Quaternion();
        return function (b, c) {
          return a.setFromAxisAngle(b, c), this.quaternion.multiply(a), this;
        };
      })(),
      rotateX: (function () {
        var a = new THREE.Vector3(1, 0, 0);
        return function (b) {
          return this.rotateOnAxis(a, b);
        };
      })(),
      rotateY: (function () {
        var a = new THREE.Vector3(0, 1, 0);
        return function (b) {
          return this.rotateOnAxis(a, b);
        };
      })(),
      rotateZ: (function () {
        var a = new THREE.Vector3(0, 0, 1);
        return function (b) {
          return this.rotateOnAxis(a, b);
        };
      })(),
      translateOnAxis: (function () {
        var a = new THREE.Vector3();
        return function (b, c) {
          return (
            a.copy(b),
            a.applyQuaternion(this.quaternion),
            this.position.add(a.multiplyScalar(c)),
            this
          );
        };
      })(),
      translate: function (a, b) {
        return (
          console.warn(
            "DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed."
          ),
          this.translateOnAxis(b, a)
        );
      },
      translateX: (function () {
        var a = new THREE.Vector3(1, 0, 0);
        return function (b) {
          return this.translateOnAxis(a, b);
        };
      })(),
      translateY: (function () {
        var a = new THREE.Vector3(0, 1, 0);
        return function (b) {
          return this.translateOnAxis(a, b);
        };
      })(),
      translateZ: (function () {
        var a = new THREE.Vector3(0, 0, 1);
        return function (b) {
          return this.translateOnAxis(a, b);
        };
      })(),
      localToWorld: function (a) {
        return a.applyMatrix4(this.matrixWorld);
      },
      worldToLocal: (function () {
        var a = new THREE.Matrix4();
        return function (b) {
          return b.applyMatrix4(a.getInverse(this.matrixWorld));
        };
      })(),
      lookAt: (function () {
        var a = new THREE.Matrix4();
        return function (b) {
          a.lookAt(b, this.position, this.up),
            this.quaternion.setFromRotationMatrix(a);
        };
      })(),
      add: function (a) {
        if (a === this)
          return void console.warn(
            "THREE.Object3D.add: An object can't be added as a child of itself."
          );
        if (a instanceof THREE.Object3D) {
          void 0 !== a.parent && a.parent.remove(a),
            (a.parent = this),
            a.dispatchEvent({ type: "added" }),
            this.children.push(a);
          for (var b = this; void 0 !== b.parent; ) b = b.parent;
          void 0 !== b && b instanceof THREE.Scene && b.__addObject(a);
        }
      },
      remove: function (a) {
        var b = this.children.indexOf(a);
        if (b !== -1) {
          (a.parent = void 0),
            a.dispatchEvent({ type: "removed" }),
            this.children.splice(b, 1);
          for (var c = this; void 0 !== c.parent; ) c = c.parent;
          void 0 !== c && c instanceof THREE.Scene && c.__removeObject(a);
        }
      },
      traverse: function (a) {
        a(this);
        for (var b = 0, c = this.children.length; b < c; b++)
          this.children[b].traverse(a);
      },
      getObjectById: function (a, b) {
        for (var c = 0, d = this.children.length; c < d; c++) {
          var e = this.children[c];
          if (e.id === a) return e;
          if (b === !0 && ((e = e.getObjectById(a, b)), void 0 !== e)) return e;
        }
      },
      getObjectByName: function (a, b) {
        for (var c = 0, d = this.children.length; c < d; c++) {
          var e = this.children[c];
          if (e.name === a) return e;
          if (b === !0 && ((e = e.getObjectByName(a, b)), void 0 !== e))
            return e;
        }
      },
      getChildByName: function (a, b) {
        return (
          console.warn(
            "DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName()."
          ),
          this.getObjectByName(a, b)
        );
      },
      getDescendants: function (a) {
        void 0 === a && (a = []), Array.prototype.push.apply(a, this.children);
        for (var b = 0, c = this.children.length; b < c; b++)
          this.children[b].getDescendants(a);
        return a;
      },
      updateMatrix: function () {
        this.matrix.compose(this.position, this.quaternion, this.scale),
          (this.matrixWorldNeedsUpdate = !0);
      },
      updateMatrixWorld: function (a) {
        this.matrixAutoUpdate === !0 && this.updateMatrix(),
          (this.matrixWorldNeedsUpdate !== !0 && a !== !0) ||
            (void 0 === this.parent
              ? this.matrixWorld.copy(this.matrix)
              : this.matrixWorld.multiplyMatrices(
                  this.parent.matrixWorld,
                  this.matrix
                ),
            (this.matrixWorldNeedsUpdate = !1),
            (a = !0));
        for (var b = 0, c = this.children.length; b < c; b++)
          this.children[b].updateMatrixWorld(a);
      },
      clone: function (a, b) {
        if (
          (void 0 === a && (a = new THREE.Object3D()),
          void 0 === b && (b = !0),
          (a.name = this.name),
          a.up.copy(this.up),
          a.position.copy(this.position),
          a.quaternion.copy(this.quaternion),
          a.scale.copy(this.scale),
          (a.renderDepth = this.renderDepth),
          (a.rotationAutoUpdate = this.rotationAutoUpdate),
          a.matrix.copy(this.matrix),
          a.matrixWorld.copy(this.matrixWorld),
          (a.matrixAutoUpdate = this.matrixAutoUpdate),
          (a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate),
          (a.visible = this.visible),
          (a.castShadow = this.castShadow),
          (a.receiveShadow = this.receiveShadow),
          (a.frustumCulled = this.frustumCulled),
          (a.userData = JSON.parse(JSON.stringify(this.userData))),
          b === !0)
        )
          for (var c = 0; c < this.children.length; c++) {
            var d = this.children[c];
            a.add(d.clone());
          }
        return a;
      },
    }),
    THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype),
    (THREE.Object3DIdCount = 0),
    (THREE.Projector = function () {
      function a() {
        if (j === v) {
          var a = new THREE.RenderableObject();
          return u.push(a), v++, j++, a;
        }
        return u[j++];
      }
      function b() {
        if (l === x) {
          var a = new THREE.RenderableVertex();
          return w.push(a), x++, l++, a;
        }
        return w[l++];
      }
      function c() {
        if (n === z) {
          var a = new THREE.RenderableFace3();
          return y.push(a), z++, n++, a;
        }
        return y[n++];
      }
      function d() {
        if (o === B) {
          var a = new THREE.RenderableFace4();
          return A.push(a), B++, o++, a;
        }
        return A[o++];
      }
      function e() {
        if (q === D) {
          var a = new THREE.RenderableLine();
          return C.push(a), D++, q++, a;
        }
        return C[q++];
      }
      function f() {
        if (s === F) {
          var a = new THREE.RenderableParticle();
          return E.push(a), F++, s++, a;
        }
        return E[s++];
      }
      function g(a, b) {
        return a.z !== b.z ? b.z - a.z : a.id !== b.id ? a.id - b.id : 0;
      }
      function h(a, b) {
        var c = 0,
          d = 1,
          e = a.z + a.w,
          f = b.z + b.w,
          g = -a.z + a.w,
          h = -b.z + b.w;
        return (
          (e >= 0 && f >= 0 && g >= 0 && h >= 0) ||
          (!((e < 0 && f < 0) || (g < 0 && h < 0)) &&
            (e < 0
              ? (c = Math.max(c, e / (e - f)))
              : f < 0 && (d = Math.min(d, e / (e - f))),
            g < 0
              ? (c = Math.max(c, g / (g - h)))
              : h < 0 && (d = Math.min(d, g / (g - h))),
            !(d < c) && (a.lerp(b, c), b.lerp(a, 1 - d), !0)))
        );
      }
      var i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = [],
        v = 0,
        w = [],
        x = 0,
        y = [],
        z = 0,
        A = [],
        B = 0,
        C = [],
        D = 0,
        E = [],
        F = 0,
        G = { objects: [], sprites: [], lights: [], elements: [] },
        H = new THREE.Vector3(),
        I = new THREE.Vector4(),
        J = new THREE.Box3(
          new THREE.Vector3(-1, -1, -1),
          new THREE.Vector3(1, 1, 1)
        ),
        K = new THREE.Box3(),
        L = new Array(3),
        M = new Array(4),
        N = new THREE.Matrix4(),
        O = new THREE.Matrix4(),
        P = new THREE.Matrix4(),
        Q = new THREE.Matrix3(),
        R = new THREE.Matrix3(),
        S = new THREE.Vector3(),
        T = new THREE.Frustum(),
        U = new THREE.Vector4(),
        V = new THREE.Vector4();
      (this.projectVector = function (a, b) {
        return (
          b.matrixWorldInverse.getInverse(b.matrixWorld),
          O.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse),
          a.applyProjection(O)
        );
      }),
        (this.unprojectVector = function (a, b) {
          return (
            b.projectionMatrixInverse.getInverse(b.projectionMatrix),
            O.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse),
            a.applyProjection(O)
          );
        }),
        (this.pickingRay = function (a, b) {
          a.z = -1;
          var c = new THREE.Vector3(a.x, a.y, 1);
          return (
            this.unprojectVector(a, b),
            this.unprojectVector(c, b),
            c.sub(a).normalize(),
            new THREE.Raycaster(a, c)
          );
        });
      var W = function (b) {
          return (
            (i = a()),
            (i.id = b.id),
            (i.object = b),
            null !== b.renderDepth
              ? (i.z = b.renderDepth)
              : (H.getPositionFromMatrix(b.matrixWorld),
                H.applyProjection(O),
                (i.z = H.z)),
            i
          );
        },
        X = function (a) {
          if (a.visible !== !1) {
            a instanceof THREE.Light
              ? G.lights.push(a)
              : a instanceof THREE.Mesh || a instanceof THREE.Line
              ? (a.frustumCulled !== !1 && T.intersectsObject(a) !== !0) ||
                G.objects.push(W(a))
              : (a instanceof THREE.Sprite || a instanceof THREE.Particle) &&
                G.sprites.push(W(a));
            for (var b = 0, c = a.children.length; b < c; b++) X(a.children[b]);
          }
        },
        Y = function (a, b) {
          (j = 0),
            (G.objects.length = 0),
            (G.sprites.length = 0),
            (G.lights.length = 0),
            X(a),
            b === !0 && G.objects.sort(g);
        };
      this.projectScene = function (a, i, j, u) {
        var v,
          x,
          y,
          z,
          A,
          B,
          C,
          D,
          E,
          F,
          H,
          W,
          X,
          Z,
          $,
          _,
          aa,
          ba,
          ca,
          da,
          ea,
          fa,
          ga,
          ha,
          ia,
          ja,
          ka = !1;
        for (
          n = 0,
            o = 0,
            q = 0,
            s = 0,
            G.elements.length = 0,
            a.autoUpdate === !0 && a.updateMatrixWorld(),
            void 0 === i.parent && i.updateMatrixWorld(),
            N.copy(i.matrixWorldInverse.getInverse(i.matrixWorld)),
            O.multiplyMatrices(i.projectionMatrix, N),
            R.getNormalMatrix(N),
            T.setFromMatrix(O),
            Y(a, j),
            v = 0,
            x = G.objects.length;
          v < x;
          v++
        )
          if (
            ((X = G.objects[v].object),
            (t = X.matrixWorld),
            (l = 0),
            X instanceof THREE.Mesh)
          ) {
            for (
              Z = X.geometry,
                $ = Z.vertices,
                _ = Z.faces,
                ca = Z.faceVertexUvs,
                Q.getNormalMatrix(t),
                ia = X.material instanceof THREE.MeshFaceMaterial,
                ja = ia === !0 ? X.material : null,
                y = 0,
                z = $.length;
              y < z;
              y++
            ) {
              (k = b()),
                k.positionWorld.copy($[y]).applyMatrix4(t),
                k.positionScreen.copy(k.positionWorld).applyMatrix4(O);
              var la = 1 / k.positionScreen.w;
              (k.positionScreen.x *= la),
                (k.positionScreen.y *= la),
                (k.positionScreen.z *= la),
                (k.visible = !(
                  k.positionScreen.x < -1 ||
                  k.positionScreen.x > 1 ||
                  k.positionScreen.y < -1 ||
                  k.positionScreen.y > 1 ||
                  k.positionScreen.z < -1 ||
                  k.positionScreen.z > 1
                ));
            }
            for (A = 0, B = _.length; A < B; A++) {
              aa = _[A];
              var ma = ia === !0 ? ja.materials[aa.materialIndex] : X.material;
              if (void 0 !== ma) {
                var na = ma.side;
                if (aa instanceof THREE.Face3) {
                  if (
                    ((ea = w[aa.a]),
                    (fa = w[aa.b]),
                    (ga = w[aa.c]),
                    (L[0] = ea.positionScreen),
                    (L[1] = fa.positionScreen),
                    (L[2] = ga.positionScreen),
                    ea.visible !== !0 &&
                      fa.visible !== !0 &&
                      ga.visible !== !0 &&
                      !J.isIntersectionBox(K.setFromPoints(L)))
                  )
                    continue;
                  if (
                    ((ka =
                      (ga.positionScreen.x - ea.positionScreen.x) *
                        (fa.positionScreen.y - ea.positionScreen.y) -
                        (ga.positionScreen.y - ea.positionScreen.y) *
                          (fa.positionScreen.x - ea.positionScreen.x) <
                      0),
                    na !== THREE.DoubleSide && ka !== (na === THREE.FrontSide))
                  )
                    continue;
                  (m = c()),
                    (m.id = X.id),
                    m.v1.copy(ea),
                    m.v2.copy(fa),
                    m.v3.copy(ga);
                } else if (aa instanceof THREE.Face4) {
                  if (
                    ((ea = w[aa.a]),
                    (fa = w[aa.b]),
                    (ga = w[aa.c]),
                    (ha = w[aa.d]),
                    (M[0] = ea.positionScreen),
                    (M[1] = fa.positionScreen),
                    (M[2] = ga.positionScreen),
                    (M[3] = ha.positionScreen),
                    ea.visible !== !0 &&
                      fa.visible !== !0 &&
                      ga.visible !== !0 &&
                      ha.visible !== !0 &&
                      !J.isIntersectionBox(K.setFromPoints(M)))
                  )
                    continue;
                  if (
                    ((ka =
                      (ha.positionScreen.x - ea.positionScreen.x) *
                        (fa.positionScreen.y - ea.positionScreen.y) -
                        (ha.positionScreen.y - ea.positionScreen.y) *
                          (fa.positionScreen.x - ea.positionScreen.x) <
                        0 ||
                      (fa.positionScreen.x - ga.positionScreen.x) *
                        (ha.positionScreen.y - ga.positionScreen.y) -
                        (fa.positionScreen.y - ga.positionScreen.y) *
                          (ha.positionScreen.x - ga.positionScreen.x) <
                        0),
                    na !== THREE.DoubleSide && ka !== (na === THREE.FrontSide))
                  )
                    continue;
                  (m = d()),
                    (m.id = X.id),
                    m.v1.copy(ea),
                    m.v2.copy(fa),
                    m.v3.copy(ga),
                    m.v4.copy(ha);
                }
                for (
                  m.normalModel.copy(aa.normal),
                    ka !== !1 ||
                      (na !== THREE.BackSide && na !== THREE.DoubleSide) ||
                      m.normalModel.negate(),
                    m.normalModel.applyMatrix3(Q).normalize(),
                    m.normalModelView.copy(m.normalModel).applyMatrix3(R),
                    m.centroidModel.copy(aa.centroid).applyMatrix4(t),
                    ba = aa.vertexNormals,
                    C = 0,
                    D = ba.length;
                  C < D;
                  C++
                ) {
                  var oa = m.vertexNormalsModel[C];
                  oa.copy(ba[C]),
                    ka !== !1 ||
                      (na !== THREE.BackSide && na !== THREE.DoubleSide) ||
                      oa.negate(),
                    oa.applyMatrix3(Q).normalize();
                  var pa = m.vertexNormalsModelView[C];
                  pa.copy(oa).applyMatrix3(R);
                }
                for (
                  m.vertexNormalsLength = ba.length, E = 0, F = ca.length;
                  E < F;
                  E++
                )
                  if (((da = ca[E][A]), void 0 !== da))
                    for (H = 0, W = da.length; H < W; H++) m.uvs[E][H] = da[H];
                (m.color = aa.color),
                  (m.material = ma),
                  S.copy(m.centroidModel).applyProjection(O),
                  (m.z = S.z),
                  X.zBoost && (m.z = S.z + X.zBoost),
                  G.elements.push(m);
              }
            }
          } else if (X instanceof THREE.Line) {
            P.multiplyMatrices(O, t),
              ($ = X.geometry.vertices),
              (ea = b()),
              ea.positionScreen.copy($[0]).applyMatrix4(P);
            var qa = X.type === THREE.LinePieces ? 2 : 1;
            for (y = 1, z = $.length; y < z; y++)
              (ea = b()),
                ea.positionScreen.copy($[y]).applyMatrix4(P),
                (y + 1) % qa > 0 ||
                  ((fa = w[l - 2]),
                  U.copy(ea.positionScreen),
                  V.copy(fa.positionScreen),
                  h(U, V) === !0 &&
                    (U.multiplyScalar(1 / U.w),
                    V.multiplyScalar(1 / V.w),
                    (p = e()),
                    (p.id = X.id),
                    p.v1.positionScreen.copy(U),
                    p.v2.positionScreen.copy(V),
                    (p.z = Math.max(U.z, V.z)),
                    (p.material = X.material),
                    X.material.vertexColors === THREE.VertexColors &&
                      (p.vertexColors[0].copy(X.geometry.colors[y]),
                      p.vertexColors[1].copy(X.geometry.colors[y - 1])),
                    G.elements.push(p)));
          }
        for (v = 0, x = G.sprites.length; v < x; v++)
          if (
            ((X = G.sprites[v].object),
            (t = X.matrixWorld),
            X instanceof THREE.Particle)
          ) {
            I.set(t.elements[12], t.elements[13], t.elements[14], 1),
              I.applyMatrix4(O);
            var la = 1 / I.w;
            (I.z *= la),
              I.z > 0 &&
                I.z < 1 &&
                ((r = f()),
                (r.id = X.id),
                (r.x = I.x * la),
                (r.y = I.y * la),
                (r.z = I.z),
                (r.object = X),
                (r.rotation = X.rotation.z),
                (r.scale.x =
                  X.scale.x *
                  Math.abs(
                    r.x -
                      (I.x + i.projectionMatrix.elements[0]) /
                        (I.w + i.projectionMatrix.elements[12])
                  )),
                (r.scale.y =
                  X.scale.y *
                  Math.abs(
                    r.y -
                      (I.y + i.projectionMatrix.elements[5]) /
                        (I.w + i.projectionMatrix.elements[13])
                  )),
                (r.material = X.material),
                G.elements.push(r));
          }
        return u === !0 && G.elements.sort(g), G;
      };
    }),
    (THREE.Face3 = function (a, b, c, d, e, f) {
      (this.a = a),
        (this.b = b),
        (this.c = c),
        (this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3()),
        (this.vertexNormals = d instanceof Array ? d : []),
        (this.color = e instanceof THREE.Color ? e : new THREE.Color()),
        (this.vertexColors = e instanceof Array ? e : []),
        (this.vertexTangents = []),
        (this.materialIndex = void 0 !== f ? f : 0),
        (this.centroid = new THREE.Vector3());
    }),
    (THREE.Face3.prototype = {
      constructor: THREE.Face3,
      clone: function () {
        var a = new THREE.Face3(this.a, this.b, this.c);
        a.normal.copy(this.normal),
          a.color.copy(this.color),
          a.centroid.copy(this.centroid),
          (a.materialIndex = this.materialIndex);
        var b, c;
        for (b = 0, c = this.vertexNormals.length; b < c; b++)
          a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; b < c; b++)
          a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; b < c; b++)
          a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a;
      },
    }),
    (THREE.Face4 = function (a, b, c, d, e, f, g) {
      (this.a = a),
        (this.b = b),
        (this.c = c),
        (this.d = d),
        (this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3()),
        (this.vertexNormals = e instanceof Array ? e : []),
        (this.color = f instanceof THREE.Color ? f : new THREE.Color()),
        (this.vertexColors = f instanceof Array ? f : []),
        (this.vertexTangents = []),
        (this.materialIndex = void 0 !== g ? g : 0),
        (this.centroid = new THREE.Vector3());
    }),
    (THREE.Face4.prototype = {
      constructor: THREE.Face4,
      clone: function () {
        var a = new THREE.Face4(this.a, this.b, this.c, this.d);
        a.normal.copy(this.normal),
          a.color.copy(this.color),
          a.centroid.copy(this.centroid),
          (a.materialIndex = this.materialIndex);
        var b, c;
        for (b = 0, c = this.vertexNormals.length; b < c; b++)
          a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; b < c; b++)
          a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; b < c; b++)
          a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a;
      },
    }),
    (THREE.Geometry = function () {
      (this.id = THREE.GeometryIdCount++),
        (this.uuid = THREE.Math.generateUUID()),
        (this.name = ""),
        (this.vertices = []),
        (this.colors = []),
        (this.normals = []),
        (this.faces = []),
        (this.faceUvs = [[]]),
        (this.faceVertexUvs = [[]]),
        (this.morphTargets = []),
        (this.morphColors = []),
        (this.morphNormals = []),
        (this.skinWeights = []),
        (this.skinIndices = []),
        (this.lineDistances = []),
        (this.boundingBox = null),
        (this.boundingSphere = null),
        (this.hasTangents = !1),
        (this.dynamic = !0),
        (this.verticesNeedUpdate = !1),
        (this.elementsNeedUpdate = !1),
        (this.uvsNeedUpdate = !1),
        (this.normalsNeedUpdate = !1),
        (this.tangentsNeedUpdate = !1),
        (this.colorsNeedUpdate = !1),
        (this.lineDistancesNeedUpdate = !1),
        (this.buffersNeedUpdate = !1);
    }),
    (THREE.Geometry.prototype = {
      constructor: THREE.Geometry,
      applyMatrix: function (a) {
        for (
          var b = new THREE.Matrix3().getNormalMatrix(a),
            c = 0,
            d = this.vertices.length;
          c < d;
          c++
        ) {
          var e = this.vertices[c];
          e.applyMatrix4(a);
        }
        for (var c = 0, d = this.faces.length; c < d; c++) {
          var f = this.faces[c];
          f.normal.applyMatrix3(b).normalize();
          for (var g = 0, h = f.vertexNormals.length; g < h; g++)
            f.vertexNormals[g].applyMatrix3(b).normalize();
          f.centroid.applyMatrix4(a);
        }
        this.boundingBox instanceof THREE.Box3 && this.computeBoundingBox(),
          this.boundingSphere instanceof THREE.Sphere &&
            this.computeBoundingSphere();
      },
      computeCentroids: function () {
        var a, b, c;
        for (a = 0, b = this.faces.length; a < b; a++)
          (c = this.faces[a]),
            c.centroid.set(0, 0, 0),
            c instanceof THREE.Face3
              ? (c.centroid.add(this.vertices[c.a]),
                c.centroid.add(this.vertices[c.b]),
                c.centroid.add(this.vertices[c.c]),
                c.centroid.divideScalar(3))
              : c instanceof THREE.Face4 &&
                (c.centroid.add(this.vertices[c.a]),
                c.centroid.add(this.vertices[c.b]),
                c.centroid.add(this.vertices[c.c]),
                c.centroid.add(this.vertices[c.d]),
                c.centroid.divideScalar(4));
      },
      computeFaceNormals: function () {
        for (
          var a = new THREE.Vector3(),
            b = new THREE.Vector3(),
            c = 0,
            d = this.faces.length;
          c < d;
          c++
        ) {
          var e = this.faces[c],
            f = this.vertices[e.a],
            g = this.vertices[e.b],
            h = this.vertices[e.c];
          a.subVectors(h, g),
            b.subVectors(f, g),
            a.cross(b),
            a.normalize(),
            e.normal.copy(a);
        }
      },
      computeVertexNormals: function (a) {
        var b, c, d, e, f, g;
        if (void 0 === this.__tmpVertices) {
          for (
            this.__tmpVertices = new Array(this.vertices.length),
              g = this.__tmpVertices,
              b = 0,
              c = this.vertices.length;
            b < c;
            b++
          )
            g[b] = new THREE.Vector3();
          for (d = 0, e = this.faces.length; d < e; d++)
            (f = this.faces[d]),
              f instanceof THREE.Face3
                ? (f.vertexNormals = [
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                  ])
                : f instanceof THREE.Face4 &&
                  (f.vertexNormals = [
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                  ]);
        } else
          for (
            g = this.__tmpVertices, b = 0, c = this.vertices.length;
            b < c;
            b++
          )
            g[b].set(0, 0, 0);
        if (a) {
          var h,
            i,
            j,
            k,
            l = new THREE.Vector3(),
            m = new THREE.Vector3(),
            n = new THREE.Vector3(),
            o = new THREE.Vector3(),
            p = new THREE.Vector3();
          for (d = 0, e = this.faces.length; d < e; d++)
            (f = this.faces[d]),
              f instanceof THREE.Face3
                ? ((h = this.vertices[f.a]),
                  (i = this.vertices[f.b]),
                  (j = this.vertices[f.c]),
                  l.subVectors(j, i),
                  m.subVectors(h, i),
                  l.cross(m),
                  g[f.a].add(l),
                  g[f.b].add(l),
                  g[f.c].add(l))
                : f instanceof THREE.Face4 &&
                  ((h = this.vertices[f.a]),
                  (i = this.vertices[f.b]),
                  (j = this.vertices[f.c]),
                  (k = this.vertices[f.d]),
                  n.subVectors(k, i),
                  m.subVectors(h, i),
                  n.cross(m),
                  g[f.a].add(n),
                  g[f.b].add(n),
                  g[f.d].add(n),
                  o.subVectors(k, j),
                  p.subVectors(i, j),
                  o.cross(p),
                  g[f.b].add(o),
                  g[f.c].add(o),
                  g[f.d].add(o));
        } else
          for (d = 0, e = this.faces.length; d < e; d++)
            (f = this.faces[d]),
              f instanceof THREE.Face3
                ? (g[f.a].add(f.normal),
                  g[f.b].add(f.normal),
                  g[f.c].add(f.normal))
                : f instanceof THREE.Face4 &&
                  (g[f.a].add(f.normal),
                  g[f.b].add(f.normal),
                  g[f.c].add(f.normal),
                  g[f.d].add(f.normal));
        for (b = 0, c = this.vertices.length; b < c; b++) g[b].normalize();
        for (d = 0, e = this.faces.length; d < e; d++)
          (f = this.faces[d]),
            f instanceof THREE.Face3
              ? (f.vertexNormals[0].copy(g[f.a]),
                f.vertexNormals[1].copy(g[f.b]),
                f.vertexNormals[2].copy(g[f.c]))
              : f instanceof THREE.Face4 &&
                (f.vertexNormals[0].copy(g[f.a]),
                f.vertexNormals[1].copy(g[f.b]),
                f.vertexNormals[2].copy(g[f.c]),
                f.vertexNormals[3].copy(g[f.d]));
      },
      computeMorphNormals: function () {
        var a, b, c, d, e;
        for (c = 0, d = this.faces.length; c < d; c++)
          for (
            e = this.faces[c],
              e.__originalFaceNormal
                ? e.__originalFaceNormal.copy(e.normal)
                : (e.__originalFaceNormal = e.normal.clone()),
              e.__originalVertexNormals || (e.__originalVertexNormals = []),
              a = 0,
              b = e.vertexNormals.length;
            a < b;
            a++
          )
            e.__originalVertexNormals[a]
              ? e.__originalVertexNormals[a].copy(e.vertexNormals[a])
              : (e.__originalVertexNormals[a] = e.vertexNormals[a].clone());
        var f = new THREE.Geometry();
        for (
          f.faces = this.faces, a = 0, b = this.morphTargets.length;
          a < b;
          a++
        ) {
          if (!this.morphNormals[a]) {
            (this.morphNormals[a] = {}),
              (this.morphNormals[a].faceNormals = []),
              (this.morphNormals[a].vertexNormals = []);
            var g,
              h,
              i = this.morphNormals[a].faceNormals,
              j = this.morphNormals[a].vertexNormals;
            for (c = 0, d = this.faces.length; c < d; c++)
              (e = this.faces[c]),
                (g = new THREE.Vector3()),
                (h =
                  e instanceof THREE.Face3
                    ? {
                        a: new THREE.Vector3(),
                        b: new THREE.Vector3(),
                        c: new THREE.Vector3(),
                      }
                    : {
                        a: new THREE.Vector3(),
                        b: new THREE.Vector3(),
                        c: new THREE.Vector3(),
                        d: new THREE.Vector3(),
                      }),
                i.push(g),
                j.push(h);
          }
          var k = this.morphNormals[a];
          (f.vertices = this.morphTargets[a].vertices),
            f.computeFaceNormals(),
            f.computeVertexNormals();
          var g, h;
          for (c = 0, d = this.faces.length; c < d; c++)
            (e = this.faces[c]),
              (g = k.faceNormals[c]),
              (h = k.vertexNormals[c]),
              g.copy(e.normal),
              e instanceof THREE.Face3
                ? (h.a.copy(e.vertexNormals[0]),
                  h.b.copy(e.vertexNormals[1]),
                  h.c.copy(e.vertexNormals[2]))
                : (h.a.copy(e.vertexNormals[0]),
                  h.b.copy(e.vertexNormals[1]),
                  h.c.copy(e.vertexNormals[2]),
                  h.d.copy(e.vertexNormals[3]));
        }
        for (c = 0, d = this.faces.length; c < d; c++)
          (e = this.faces[c]),
            (e.normal = e.__originalFaceNormal),
            (e.vertexNormals = e.__originalVertexNormals);
      },
      computeTangents: function () {
        function a(a, b, c, d, e, f, g) {
          (j = a.vertices[b]),
            (k = a.vertices[c]),
            (l = a.vertices[d]),
            (m = i[e]),
            (n = i[f]),
            (o = i[g]),
            (p = k.x - j.x),
            (q = l.x - j.x),
            (r = k.y - j.y),
            (s = l.y - j.y),
            (t = k.z - j.z),
            (u = l.z - j.z),
            (v = n.x - m.x),
            (w = o.x - m.x),
            (x = n.y - m.y),
            (y = o.y - m.y),
            (z = 1 / (v * y - w * x)),
            F.set(
              (y * p - x * q) * z,
              (y * r - x * s) * z,
              (y * t - x * u) * z
            ),
            G.set(
              (v * q - w * p) * z,
              (v * s - w * r) * z,
              (v * u - w * t) * z
            ),
            D[b].add(F),
            D[c].add(F),
            D[d].add(F),
            E[b].add(G),
            E[c].add(G),
            E[d].add(G);
        }
        var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z,
          A,
          B,
          C,
          D = [],
          E = [],
          F = new THREE.Vector3(),
          G = new THREE.Vector3(),
          H = new THREE.Vector3(),
          I = new THREE.Vector3(),
          J = new THREE.Vector3();
        for (d = 0, e = this.vertices.length; d < e; d++)
          (D[d] = new THREE.Vector3()), (E[d] = new THREE.Vector3());
        for (b = 0, c = this.faces.length; b < c; b++)
          (h = this.faces[b]),
            (i = this.faceVertexUvs[0][b]),
            h instanceof THREE.Face3
              ? a(this, h.a, h.b, h.c, 0, 1, 2)
              : h instanceof THREE.Face4 &&
                (a(this, h.a, h.b, h.d, 0, 1, 3),
                a(this, h.b, h.c, h.d, 1, 2, 3));
        var K = ["a", "b", "c", "d"];
        for (b = 0, c = this.faces.length; b < c; b++)
          for (h = this.faces[b], f = 0; f < h.vertexNormals.length; f++)
            J.copy(h.vertexNormals[f]),
              (g = h[K[f]]),
              (A = D[g]),
              H.copy(A),
              H.sub(J.multiplyScalar(J.dot(A))).normalize(),
              I.crossVectors(h.vertexNormals[f], A),
              (B = I.dot(E[g])),
              (C = B < 0 ? -1 : 1),
              (h.vertexTangents[f] = new THREE.Vector4(H.x, H.y, H.z, C));
        this.hasTangents = !0;
      },
      computeLineDistances: function () {
        for (var a = 0, b = this.vertices, c = 0, d = b.length; c < d; c++)
          c > 0 && (a += b[c].distanceTo(b[c - 1])),
            (this.lineDistances[c] = a);
      },
      computeBoundingBox: function () {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3()),
          this.boundingBox.setFromPoints(this.vertices);
      },
      computeBoundingSphere: function () {
        null === this.boundingSphere &&
          (this.boundingSphere = new THREE.Sphere()),
          this.boundingSphere.setFromPoints(this.vertices);
      },
      mergeVertices: function () {
        var a,
          b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j = {},
          k = [],
          l = [],
          m = 4,
          n = Math.pow(10, m);
        for (
          this.__tmpVertices = void 0, c = 0, d = this.vertices.length;
          c < d;
          c++
        )
          (a = this.vertices[c]),
            (b =
              Math.round(a.x * n) +
              "_" +
              Math.round(a.y * n) +
              "_" +
              Math.round(a.z * n)),
            void 0 === j[b]
              ? ((j[b] = c), k.push(this.vertices[c]), (l[c] = k.length - 1))
              : (l[c] = l[j[b]]);
        var o = [];
        for (c = 0, d = this.faces.length; c < d; c++)
          if (((e = this.faces[c]), e instanceof THREE.Face3)) {
            (e.a = l[e.a]),
              (e.b = l[e.b]),
              (e.c = l[e.c]),
              (f = [e.a, e.b, e.c]);
            for (var p = -1, q = 0; q < 3; q++)
              if (f[q] == f[(q + 1) % 3]) {
                (p = q), o.push(c);
                break;
              }
          } else if (e instanceof THREE.Face4) {
            (e.a = l[e.a]),
              (e.b = l[e.b]),
              (e.c = l[e.c]),
              (e.d = l[e.d]),
              (f = [e.a, e.b, e.c, e.d]);
            for (var p = -1, q = 0; q < 4; q++)
              f[q] == f[(q + 1) % 4] && (p >= 0 && o.push(c), (p = q));
            if (p >= 0) {
              f.splice(p, 1);
              var r = new THREE.Face3(
                f[0],
                f[1],
                f[2],
                e.normal,
                e.color,
                e.materialIndex
              );
              for (g = 0, h = this.faceVertexUvs.length; g < h; g++)
                (i = this.faceVertexUvs[g][c]), i && i.splice(p, 1);
              e.vertexNormals &&
                e.vertexNormals.length > 0 &&
                ((r.vertexNormals = e.vertexNormals),
                r.vertexNormals.splice(p, 1)),
                e.vertexColors &&
                  e.vertexColors.length > 0 &&
                  ((r.vertexColors = e.vertexColors),
                  r.vertexColors.splice(p, 1)),
                (this.faces[c] = r);
            }
          }
        for (c = o.length - 1; c >= 0; c--)
          for (
            this.faces.splice(c, 1), g = 0, h = this.faceVertexUvs.length;
            g < h;
            g++
          )
            this.faceVertexUvs[g].splice(c, 1);
        var s = this.vertices.length - k.length;
        return (this.vertices = k), s;
      },
      clone: function () {
        for (
          var a = new THREE.Geometry(), b = this.vertices, c = 0, d = b.length;
          c < d;
          c++
        )
          a.vertices.push(b[c].clone());
        for (var e = this.faces, c = 0, d = e.length; c < d; c++)
          a.faces.push(e[c].clone());
        for (var f = this.faceVertexUvs[0], c = 0, d = f.length; c < d; c++) {
          for (var g = f[c], h = [], i = 0, j = g.length; i < j; i++)
            h.push(new THREE.Vector2(g[i].x, g[i].y));
          a.faceVertexUvs[0].push(h);
        }
        return a;
      },
      dispose: function () {
        this.dispatchEvent({ type: "dispose" });
      },
    }),
    THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype),
    (THREE.GeometryIdCount = 0),
    (THREE.BufferGeometry = function () {
      (this.id = THREE.GeometryIdCount++),
        (this.uuid = THREE.Math.generateUUID()),
        (this.attributes = {}),
        (this.dynamic = !1),
        (this.offsets = []),
        (this.boundingBox = null),
        (this.boundingSphere = null),
        (this.hasTangents = !1),
        (this.morphTargets = []);
    }),
    (THREE.BufferGeometry.prototype = {
      constructor: THREE.BufferGeometry,
      applyMatrix: function (a) {
        var b, c;
        if (
          (this.attributes.position && (b = this.attributes.position.array),
          this.attributes.normal && (c = this.attributes.normal.array),
          void 0 !== b &&
            (a.multiplyVector3Array(b), (this.verticesNeedUpdate = !0)),
          void 0 !== c)
        ) {
          var d = new THREE.Matrix3().getNormalMatrix(a);
          d.multiplyVector3Array(c),
            this.normalizeNormals(),
            (this.normalsNeedUpdate = !0);
        }
      },
      computeBoundingBox: function () {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3());
        var a = this.attributes.position.array;
        if (a) {
          var b,
            c,
            d,
            e = this.boundingBox;
          a.length >= 3 &&
            ((e.min.x = e.max.x = a[0]),
            (e.min.y = e.max.y = a[1]),
            (e.min.z = e.max.z = a[2]));
          for (var f = 3, g = a.length; f < g; f += 3)
            (b = a[f]),
              (c = a[f + 1]),
              (d = a[f + 2]),
              b < e.min.x ? (e.min.x = b) : b > e.max.x && (e.max.x = b),
              c < e.min.y ? (e.min.y = c) : c > e.max.y && (e.max.y = c),
              d < e.min.z ? (e.min.z = d) : d > e.max.z && (e.max.z = d);
        }
        (void 0 !== a && 0 !== a.length) ||
          (this.boundingBox.min.set(0, 0, 0),
          this.boundingBox.max.set(0, 0, 0));
      },
      computeBoundingSphere: function () {
        null === this.boundingSphere &&
          (this.boundingSphere = new THREE.Sphere());
        var a = this.attributes.position.array;
        if (a) {
          for (var b, c, d, e, f = 0, g = 0, h = a.length; g < h; g += 3)
            (c = a[g]),
              (d = a[g + 1]),
              (e = a[g + 2]),
              (b = c * c + d * d + e * e),
              b > f && (f = b);
          this.boundingSphere.radius = Math.sqrt(f);
        }
      },
      computeVertexNormals: function () {
        if (this.attributes.position) {
          var a,
            b,
            c,
            d,
            e = this.attributes.position.array.length;
          if (void 0 === this.attributes.normal)
            this.attributes.normal = {
              itemSize: 3,
              array: new Float32Array(e),
            };
          else
            for (a = 0, b = this.attributes.normal.array.length; a < b; a++)
              this.attributes.normal.array[a] = 0;
          var f,
            g,
            h,
            i,
            j,
            k,
            l = this.attributes.position.array,
            m = this.attributes.normal.array,
            n = new THREE.Vector3(),
            o = new THREE.Vector3(),
            p = new THREE.Vector3(),
            q = new THREE.Vector3(),
            r = new THREE.Vector3();
          if (this.attributes.index) {
            var s = this.attributes.index.array,
              t = this.offsets;
            for (c = 0, d = t.length; c < d; ++c) {
              var u = t[c].start,
                v = t[c].count,
                w = t[c].index;
              for (a = u, b = u + v; a < b; a += 3)
                (f = w + s[a]),
                  (g = w + s[a + 1]),
                  (h = w + s[a + 2]),
                  (i = l[3 * f]),
                  (j = l[3 * f + 1]),
                  (k = l[3 * f + 2]),
                  n.set(i, j, k),
                  (i = l[3 * g]),
                  (j = l[3 * g + 1]),
                  (k = l[3 * g + 2]),
                  o.set(i, j, k),
                  (i = l[3 * h]),
                  (j = l[3 * h + 1]),
                  (k = l[3 * h + 2]),
                  p.set(i, j, k),
                  q.subVectors(p, o),
                  r.subVectors(n, o),
                  q.cross(r),
                  (m[3 * f] += q.x),
                  (m[3 * f + 1] += q.y),
                  (m[3 * f + 2] += q.z),
                  (m[3 * g] += q.x),
                  (m[3 * g + 1] += q.y),
                  (m[3 * g + 2] += q.z),
                  (m[3 * h] += q.x),
                  (m[3 * h + 1] += q.y),
                  (m[3 * h + 2] += q.z);
            }
          } else
            for (a = 0, b = l.length; a < b; a += 9)
              (i = l[a]),
                (j = l[a + 1]),
                (k = l[a + 2]),
                n.set(i, j, k),
                (i = l[a + 3]),
                (j = l[a + 4]),
                (k = l[a + 5]),
                o.set(i, j, k),
                (i = l[a + 6]),
                (j = l[a + 7]),
                (k = l[a + 8]),
                p.set(i, j, k),
                q.subVectors(p, o),
                r.subVectors(n, o),
                q.cross(r),
                (m[a] = q.x),
                (m[a + 1] = q.y),
                (m[a + 2] = q.z),
                (m[a + 3] = q.x),
                (m[a + 4] = q.y),
                (m[a + 5] = q.z),
                (m[a + 6] = q.x),
                (m[a + 7] = q.y),
                (m[a + 8] = q.z);
          this.normalizeNormals(), (this.normalsNeedUpdate = !0);
        }
      },
      normalizeNormals: function () {
        for (
          var a, b, c, d, e = this.attributes.normal.array, f = 0, g = e.length;
          f < g;
          f += 3
        )
          (a = e[f]),
            (b = e[f + 1]),
            (c = e[f + 2]),
            (d = 1 / Math.sqrt(a * a + b * b + c * c)),
            (e[f] *= d),
            (e[f + 1] *= d),
            (e[f + 2] *= d);
      },
      computeTangents: function () {
        function a(a, b, c) {
          (m = d[3 * a]),
            (n = d[3 * a + 1]),
            (o = d[3 * a + 2]),
            (p = d[3 * b]),
            (q = d[3 * b + 1]),
            (r = d[3 * b + 2]),
            (s = d[3 * c]),
            (t = d[3 * c + 1]),
            (u = d[3 * c + 2]),
            (v = f[2 * a]),
            (w = f[2 * a + 1]),
            (x = f[2 * b]),
            (y = f[2 * b + 1]),
            (z = f[2 * c]),
            (A = f[2 * c + 1]),
            (B = p - m),
            (C = s - m),
            (D = q - n),
            (E = t - n),
            (F = r - o),
            (G = u - o),
            (H = x - v),
            (I = z - v),
            (J = y - w),
            (K = A - w),
            (L = 1 / (H * K - I * J)),
            T.set(
              (K * B - J * C) * L,
              (K * D - J * E) * L,
              (K * F - J * G) * L
            ),
            U.set(
              (H * C - I * B) * L,
              (H * E - I * D) * L,
              (H * G - I * F) * L
            ),
            j[a].add(T),
            j[b].add(T),
            j[c].add(T),
            k[a].add(U),
            k[b].add(U),
            k[c].add(U);
        }
        function b(a) {
          (ca.x = e[3 * a]),
            (ca.y = e[3 * a + 1]),
            (ca.z = e[3 * a + 2]),
            da.copy(ca),
            ($ = j[a]),
            aa.copy($),
            aa.sub(ca.multiplyScalar(ca.dot($))).normalize(),
            ba.crossVectors(da, $),
            (_ = ba.dot(k[a])),
            (Z = _ < 0 ? -1 : 1),
            (i[4 * a] = aa.x),
            (i[4 * a + 1] = aa.y),
            (i[4 * a + 2] = aa.z),
            (i[4 * a + 3] = Z);
        }
        if (
          void 0 === this.attributes.index ||
          void 0 === this.attributes.position ||
          void 0 === this.attributes.normal ||
          void 0 === this.attributes.uv
        )
          return void console.warn(
            "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"
          );
        var c = this.attributes.index.array,
          d = this.attributes.position.array,
          e = this.attributes.normal.array,
          f = this.attributes.uv.array,
          g = d.length / 3;
        if (void 0 === this.attributes.tangent) {
          var h = 4 * g;
          this.attributes.tangent = { itemSize: 4, array: new Float32Array(h) };
        }
        for (
          var i = this.attributes.tangent.array, j = [], k = [], l = 0;
          l < g;
          l++
        )
          (j[l] = new THREE.Vector3()), (k[l] = new THREE.Vector3());
        var m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z,
          A,
          B,
          C,
          D,
          E,
          F,
          G,
          H,
          I,
          J,
          K,
          L,
          M,
          N,
          O,
          P,
          Q,
          R,
          S,
          T = new THREE.Vector3(),
          U = new THREE.Vector3(),
          V = this.offsets;
        for (O = 0, P = V.length; O < P; ++O) {
          var W = V[O].start,
            X = V[O].count,
            Y = V[O].index;
          for (M = W, N = W + X; M < N; M += 3)
            (Q = Y + c[M]), (R = Y + c[M + 1]), (S = Y + c[M + 2]), a(Q, R, S);
        }
        var Z,
          $,
          _,
          aa = new THREE.Vector3(),
          ba = new THREE.Vector3(),
          ca = new THREE.Vector3(),
          da = new THREE.Vector3();
        for (O = 0, P = V.length; O < P; ++O) {
          var W = V[O].start,
            X = V[O].count,
            Y = V[O].index;
          for (M = W, N = W + X; M < N; M += 3)
            (Q = Y + c[M]),
              (R = Y + c[M + 1]),
              (S = Y + c[M + 2]),
              b(Q),
              b(R),
              b(S);
        }
        (this.hasTangents = !0), (this.tangentsNeedUpdate = !0);
      },
      dispose: function () {
        this.dispatchEvent({ type: "dispose" });
      },
    }),
    THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype),
    (THREE.Camera = function () {
      THREE.Object3D.call(this),
        (this.matrixWorldInverse = new THREE.Matrix4()),
        (this.projectionMatrix = new THREE.Matrix4()),
        (this.projectionMatrixInverse = new THREE.Matrix4());
    }),
    (THREE.Camera.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Camera.prototype.lookAt = (function () {
      var a = new THREE.Matrix4();
      return function (b) {
        a.lookAt(this.position, b, this.up),
          this.quaternion.setFromRotationMatrix(a);
      };
    })()),
    (THREE.OrthographicCamera = function (a, b, c, d, e, f) {
      THREE.Camera.call(this),
        (this.left = a),
        (this.right = b),
        (this.top = c),
        (this.bottom = d),
        (this.near = void 0 !== e ? e : 0.1),
        (this.far = void 0 !== f ? f : 2e3),
        this.updateProjectionMatrix();
    }),
    (THREE.OrthographicCamera.prototype = Object.create(
      THREE.Camera.prototype
    )),
    (THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
      this.projectionMatrix.makeOrthographic(
        this.left,
        this.right,
        this.top,
        this.bottom,
        this.near,
        this.far
      );
    }),
    (THREE.PerspectiveCamera = function (a, b, c, d) {
      THREE.Camera.call(this),
        (this.fov = void 0 !== a ? a : 50),
        (this.aspect = void 0 !== b ? b : 1),
        (this.near = void 0 !== c ? c : 0.1),
        (this.far = void 0 !== d ? d : 2e3),
        this.updateProjectionMatrix();
    }),
    (THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype)),
    (THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
      void 0 === b && (b = 24),
        (this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)))),
        this.updateProjectionMatrix();
    }),
    (THREE.PerspectiveCamera.prototype.setViewOffset = function (
      a,
      b,
      c,
      d,
      e,
      f
    ) {
      (this.fullWidth = a),
        (this.fullHeight = b),
        (this.x = c),
        (this.y = d),
        (this.width = e),
        (this.height = f),
        this.updateProjectionMatrix();
    }),
    (THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
      if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
          b = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
          c = -b,
          d = a * c,
          e = a * b,
          f = Math.abs(e - d),
          g = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(
          d + (this.x * f) / this.fullWidth,
          d + ((this.x + this.width) * f) / this.fullWidth,
          b - ((this.y + this.height) * g) / this.fullHeight,
          b - (this.y * g) / this.fullHeight,
          this.near,
          this.far
        );
      } else
        this.projectionMatrix.makePerspective(
          this.fov,
          this.aspect,
          this.near,
          this.far
        );
    }),
    (THREE.Light = function (a) {
      THREE.Object3D.call(this), (this.color = new THREE.Color(a));
    }),
    (THREE.Light.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Light.prototype.clone = function (a) {
      return (
        void 0 === a && (a = new THREE.Light()),
        THREE.Object3D.prototype.clone.call(this, a),
        a.color.copy(this.color),
        a
      );
    }),
    (THREE.AmbientLight = function (a) {
      THREE.Light.call(this, a);
    }),
    (THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype)),
    (THREE.AmbientLight.prototype.clone = function () {
      var a = new THREE.AmbientLight();
      return THREE.Light.prototype.clone.call(this, a), a;
    }),
    (THREE.AreaLight = function (a, b) {
      THREE.Light.call(this, a),
        (this.normal = new THREE.Vector3(0, -1, 0)),
        (this.right = new THREE.Vector3(1, 0, 0)),
        (this.intensity = void 0 !== b ? b : 1),
        (this.width = 1),
        (this.height = 1),
        (this.constantAttenuation = 1.5),
        (this.linearAttenuation = 0.5),
        (this.quadraticAttenuation = 0.1);
    }),
    (THREE.AreaLight.prototype = Object.create(THREE.Light.prototype)),
    (THREE.DirectionalLight = function (a, b) {
      THREE.Light.call(this, a),
        this.position.set(0, 1, 0),
        (this.target = new THREE.Object3D()),
        (this.intensity = void 0 !== b ? b : 1),
        (this.castShadow = !1),
        (this.onlyShadow = !1),
        (this.shadowCameraNear = 50),
        (this.shadowCameraFar = 5e3),
        (this.shadowCameraLeft = -500),
        (this.shadowCameraRight = 500),
        (this.shadowCameraTop = 500),
        (this.shadowCameraBottom = -500),
        (this.shadowCameraVisible = !1),
        (this.shadowBias = 0),
        (this.shadowDarkness = 0.5),
        (this.shadowMapWidth = 512),
        (this.shadowMapHeight = 512),
        (this.shadowCascade = !1),
        (this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3)),
        (this.shadowCascadeCount = 2),
        (this.shadowCascadeBias = [0, 0, 0]),
        (this.shadowCascadeWidth = [512, 512, 512]),
        (this.shadowCascadeHeight = [512, 512, 512]),
        (this.shadowCascadeNearZ = [-1, 0.99, 0.998]),
        (this.shadowCascadeFarZ = [0.99, 0.998, 1]),
        (this.shadowCascadeArray = []),
        (this.shadowMap = null),
        (this.shadowMapSize = null),
        (this.shadowCamera = null),
        (this.shadowMatrix = null);
    }),
    (THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype)),
    (THREE.DirectionalLight.prototype.clone = function () {
      var a = new THREE.DirectionalLight();
      return (
        THREE.Light.prototype.clone.call(this, a),
        (a.target = this.target.clone()),
        (a.intensity = this.intensity),
        (a.castShadow = this.castShadow),
        (a.onlyShadow = this.onlyShadow),
        a
      );
    }),
    (THREE.HemisphereLight = function (a, b, c) {
      THREE.Light.call(this, a),
        this.position.set(0, 100, 0),
        (this.groundColor = new THREE.Color(b)),
        (this.intensity = void 0 !== c ? c : 1);
    }),
    (THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype)),
    (THREE.HemisphereLight.prototype.clone = function () {
      var a = new THREE.PointLight();
      return (
        THREE.Light.prototype.clone.call(this, a),
        a.groundColor.copy(this.groundColor),
        (a.intensity = this.intensity),
        a
      );
    }),
    (THREE.PointLight = function (a, b, c) {
      THREE.Light.call(this, a),
        (this.intensity = void 0 !== b ? b : 1),
        (this.distance = void 0 !== c ? c : 0);
    }),
    (THREE.PointLight.prototype = Object.create(THREE.Light.prototype)),
    (THREE.PointLight.prototype.clone = function () {
      var a = new THREE.PointLight();
      return (
        THREE.Light.prototype.clone.call(this, a),
        (a.intensity = this.intensity),
        (a.distance = this.distance),
        a
      );
    }),
    (THREE.SpotLight = function (a, b, c, d, e) {
      THREE.Light.call(this, a),
        this.position.set(0, 1, 0),
        (this.target = new THREE.Object3D()),
        (this.intensity = void 0 !== b ? b : 1),
        (this.distance = void 0 !== c ? c : 0),
        (this.angle = void 0 !== d ? d : Math.PI / 3),
        (this.exponent = void 0 !== e ? e : 10),
        (this.castShadow = !1),
        (this.onlyShadow = !1),
        (this.shadowCameraNear = 50),
        (this.shadowCameraFar = 5e3),
        (this.shadowCameraFov = 50),
        (this.shadowCameraVisible = !1),
        (this.shadowBias = 0),
        (this.shadowDarkness = 0.5),
        (this.shadowMapWidth = 512),
        (this.shadowMapHeight = 512),
        (this.shadowMap = null),
        (this.shadowMapSize = null),
        (this.shadowCamera = null),
        (this.shadowMatrix = null);
    }),
    (THREE.SpotLight.prototype = Object.create(THREE.Light.prototype)),
    (THREE.SpotLight.prototype.clone = function () {
      var a = new THREE.SpotLight();
      return (
        THREE.Light.prototype.clone.call(this, a),
        (a.target = this.target.clone()),
        (a.intensity = this.intensity),
        (a.distance = this.distance),
        (a.angle = this.angle),
        (a.exponent = this.exponent),
        (a.castShadow = this.castShadow),
        (a.onlyShadow = this.onlyShadow),
        a
      );
    }),
    (THREE.Loader = function (a) {
      (this.showStatus = a),
        (this.statusDomElement = a
          ? THREE.Loader.prototype.addStatusElement()
          : null),
        (this.onLoadStart = function () {}),
        (this.onLoadProgress = function () {}),
        (this.onLoadComplete = function () {});
    }),
    (THREE.Loader.prototype = {
      constructor: THREE.Loader,
      crossOrigin: "anonymous",
      addStatusElement: function () {
        var a = document.createElement("div");
        return (
          (a.style.position = "absolute"),
          (a.style.right = "0px"),
          (a.style.top = "0px"),
          (a.style.fontSize = "0.8em"),
          (a.style.textAlign = "left"),
          (a.style.background = "rgba(0,0,0,0.25)"),
          (a.style.color = "#fff"),
          (a.style.width = "120px"),
          (a.style.padding = "0.5em 0.5em 0.5em 0.5em"),
          (a.style.zIndex = 1e3),
          (a.innerHTML = "Loading ..."),
          a
        );
      },
      updateProgress: function (a) {
        var b = "Loaded ";
        (b += a.total
          ? ((100 * a.loaded) / a.total).toFixed(0) + "%"
          : (a.loaded / 1e3).toFixed(2) + " KB"),
          (this.statusDomElement.innerHTML = b);
      },
      extractUrlBase: function (a) {
        var b = a.split("/");
        return b.pop(), (b.length < 1 ? "." : b.join("/")) + "/";
      },
      initMaterials: function (a, b) {
        for (var c = [], d = 0; d < a.length; ++d)
          c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
        return c;
      },
      needsTangents: function (a) {
        for (var b = 0, c = a.length; b < c; b++) {
          var d = a[b];
          if (d instanceof THREE.ShaderMaterial) return !0;
        }
        return !1;
      },
      createMaterial: function (a, b) {
        function c(a) {
          var b = Math.log(a) / Math.LN2;
          return Math.floor(b) == b;
        }
        function d(a) {
          var b = Math.log(a) / Math.LN2;
          return Math.pow(2, Math.round(b));
        }
        function e(a, b) {
          var e = new Image();
          (e.onload = function () {
            if (c(this.width) && c(this.height)) a.image = this;
            else {
              var b = d(this.width),
                e = d(this.height);
              (a.image.width = b),
                (a.image.height = e),
                a.image.getContext("2d").drawImage(this, 0, 0, b, e);
            }
            a.needsUpdate = !0;
          }),
            (e.crossOrigin = h.crossOrigin),
            (e.src = b);
        }
        function f(a, c, d, f, g, h, i) {
          var j = /\.dds$/i.test(d),
            k = b + "/" + d;
          if (j) {
            var l = THREE.ImageUtils.loadCompressedTexture(k);
            a[c] = l;
          } else {
            var l = document.createElement("canvas");
            a[c] = new THREE.Texture(l);
          }
          if (
            ((a[c].sourceFile = d),
            f &&
              (a[c].repeat.set(f[0], f[1]),
              1 !== f[0] && (a[c].wrapS = THREE.RepeatWrapping),
              1 !== f[1] && (a[c].wrapT = THREE.RepeatWrapping)),
            g && a[c].offset.set(g[0], g[1]),
            h)
          ) {
            var m = {
              repeat: THREE.RepeatWrapping,
              mirror: THREE.MirroredRepeatWrapping,
            };
            void 0 !== m[h[0]] && (a[c].wrapS = m[h[0]]),
              void 0 !== m[h[1]] && (a[c].wrapT = m[h[1]]);
          }
          i && (a[c].anisotropy = i), j || e(a[c], k);
        }
        function g(a) {
          return ((255 * a[0]) << 16) + ((255 * a[1]) << 8) + 255 * a[2];
        }
        var h = this,
          i = "MeshLambertMaterial",
          j = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            normalMap: null,
            bumpMap: null,
            wireframe: !1,
          };
        if (a.shading) {
          var k = a.shading.toLowerCase();
          "phong" === k
            ? (i = "MeshPhongMaterial")
            : "basic" === k && (i = "MeshBasicMaterial");
        }
        if (
          (void 0 !== a.blending &&
            void 0 !== THREE[a.blending] &&
            (j.blending = THREE[a.blending]),
          (void 0 !== a.transparent || a.opacity < 1) &&
            (j.transparent = a.transparent),
          void 0 !== a.depthTest && (j.depthTest = a.depthTest),
          void 0 !== a.depthWrite && (j.depthWrite = a.depthWrite),
          void 0 !== a.visible && (j.visible = a.visible),
          void 0 !== a.flipSided && (j.side = THREE.BackSide),
          void 0 !== a.doubleSided && (j.side = THREE.DoubleSide),
          void 0 !== a.wireframe && (j.wireframe = a.wireframe),
          void 0 !== a.vertexColors &&
            ("face" === a.vertexColors
              ? (j.vertexColors = THREE.FaceColors)
              : a.vertexColors && (j.vertexColors = THREE.VertexColors)),
          a.colorDiffuse
            ? (j.color = g(a.colorDiffuse))
            : a.DbgColor && (j.color = a.DbgColor),
          a.colorSpecular && (j.specular = g(a.colorSpecular)),
          a.colorAmbient && (j.ambient = g(a.colorAmbient)),
          a.transparency && (j.opacity = a.transparency),
          a.specularCoef && (j.shininess = a.specularCoef),
          a.mapDiffuse &&
            b &&
            f(
              j,
              "map",
              a.mapDiffuse,
              a.mapDiffuseRepeat,
              a.mapDiffuseOffset,
              a.mapDiffuseWrap,
              a.mapDiffuseAnisotropy
            ),
          a.mapLight &&
            b &&
            f(
              j,
              "lightMap",
              a.mapLight,
              a.mapLightRepeat,
              a.mapLightOffset,
              a.mapLightWrap,
              a.mapLightAnisotropy
            ),
          a.mapBump &&
            b &&
            f(
              j,
              "bumpMap",
              a.mapBump,
              a.mapBumpRepeat,
              a.mapBumpOffset,
              a.mapBumpWrap,
              a.mapBumpAnisotropy
            ),
          a.mapNormal &&
            b &&
            f(
              j,
              "normalMap",
              a.mapNormal,
              a.mapNormalRepeat,
              a.mapNormalOffset,
              a.mapNormalWrap,
              a.mapNormalAnisotropy
            ),
          a.mapSpecular &&
            b &&
            f(
              j,
              "specularMap",
              a.mapSpecular,
              a.mapSpecularRepeat,
              a.mapSpecularOffset,
              a.mapSpecularWrap,
              a.mapSpecularAnisotropy
            ),
          a.mapBumpScale && (j.bumpScale = a.mapBumpScale),
          a.mapNormal)
        ) {
          var l = THREE.ShaderLib.normalmap,
            m = THREE.UniformsUtils.clone(l.uniforms);
          (m.tNormal.value = j.normalMap),
            a.mapNormalFactor &&
              m.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor),
            j.map && ((m.tDiffuse.value = j.map), (m.enableDiffuse.value = !0)),
            j.specularMap &&
              ((m.tSpecular.value = j.specularMap),
              (m.enableSpecular.value = !0)),
            j.lightMap && ((m.tAO.value = j.lightMap), (m.enableAO.value = !0)),
            m.uDiffuseColor.value.setHex(j.color),
            m.uSpecularColor.value.setHex(j.specular),
            m.uAmbientColor.value.setHex(j.ambient),
            (m.uShininess.value = j.shininess),
            void 0 !== j.opacity && (m.uOpacity.value = j.opacity);
          var n = {
              fragmentShader: l.fragmentShader,
              vertexShader: l.vertexShader,
              uniforms: m,
              lights: !0,
              fog: !0,
            },
            o = new THREE.ShaderMaterial(n);
          j.transparent && (o.transparent = !0);
        } else var o = new THREE[i](j);
        return void 0 !== a.DbgName && (o.name = a.DbgName), o;
      },
    }),
    (THREE.XHRLoader = function (a) {
      this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    }),
    (THREE.XHRLoader.prototype = {
      constructor: THREE.XHRLoader,
      load: function (a, b, c, d) {
        var e = this,
          f = new XMLHttpRequest();
        void 0 !== b &&
          f.addEventListener(
            "load",
            function (c) {
              e.manager.itemEnd(a), b(c.target.responseText);
            },
            !1
          ),
          void 0 !== c &&
            f.addEventListener(
              "progress",
              function (a) {
                c(a);
              },
              !1
            ),
          void 0 !== d &&
            f.addEventListener(
              "error",
              function (a) {
                d(a);
              },
              !1
            ),
          void 0 !== this.crossOrigin && (f.crossOrigin = this.crossOrigin),
          f.open("GET", a, !0),
          f.send(null),
          e.manager.itemStart(a);
      },
      setCrossOrigin: function (a) {
        this.crossOrigin = a;
      },
    }),
    (THREE.ImageLoader = function (a) {
      this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    }),
    (THREE.ImageLoader.prototype = {
      constructor: THREE.ImageLoader,
      load: function (a, b, c, d) {
        var e = this,
          f = document.createElement("img");
        void 0 !== b &&
          f.addEventListener(
            "load",
            function (c) {
              e.manager.itemEnd(a), b(this);
            },
            !1
          ),
          void 0 !== c &&
            f.addEventListener(
              "progress",
              function (a) {
                c(a);
              },
              !1
            ),
          void 0 !== d &&
            f.addEventListener(
              "error",
              function (a) {
                d(a);
              },
              !1
            ),
          void 0 !== this.crossOrigin && (f.crossOrigin = this.crossOrigin),
          (f.src = a),
          e.manager.itemStart(a);
      },
      setCrossOrigin: function (a) {
        this.crossOrigin = a;
      },
    }),
    (THREE.JSONLoader = function (a) {
      THREE.Loader.call(this, a), (this.withCredentials = !1);
    }),
    (THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype)),
    (THREE.JSONLoader.prototype.load = function (a, b, c) {
      (c = c && "string" == typeof c ? c : this.extractUrlBase(a)),
        this.onLoadStart(),
        this.loadAjaxJSON(this, a, b, c);
    }),
    (THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, e) {
      var f = new XMLHttpRequest(),
        g = 0;
      (f.onreadystatechange = function () {
        if (f.readyState === f.DONE)
          if (200 === f.status || 0 === f.status) {
            if (f.responseText) {
              var h = JSON.parse(f.responseText),
                i = a.parse(h, d);
              c(i.geometry, i.materials);
            } else
              console.warn(
                "THREE.JSONLoader: [" +
                  b +
                  "] seems to be unreachable or file there is empty"
              );
            a.onLoadComplete();
          } else
            console.error(
              "THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]"
            );
        else
          f.readyState === f.LOADING
            ? e &&
              (0 === g && (g = f.getResponseHeader("Content-Length")),
              e({ total: g, loaded: f.responseText.length }))
            : f.readyState === f.HEADERS_RECEIVED &&
              void 0 !== e &&
              (g = f.getResponseHeader("Content-Length"));
      }),
        f.open("GET", b, !0),
        (f.withCredentials = this.withCredentials),
        f.send(null);
    }),
    (THREE.JSONLoader.prototype.parse = function (a, b) {
      function c(b) {
        function c(a, b) {
          return a & (1 << b);
        }
        var d,
          e,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z,
          A,
          B,
          C,
          D,
          E,
          F = a.faces,
          G = a.vertices,
          H = a.normals,
          I = a.colors,
          J = 0;
        if (void 0 !== a.uvs) {
          for (d = 0; d < a.uvs.length; d++) a.uvs[d].length && J++;
          for (d = 0; d < J; d++)
            (f.faceUvs[d] = []), (f.faceVertexUvs[d] = []);
        }
        for (h = 0, i = G.length; h < i; )
          (x = new THREE.Vector3()),
            (x.x = G[h++] * b),
            (x.y = G[h++] * b),
            (x.z = G[h++] * b),
            f.vertices.push(x);
        for (h = 0, i = F.length; h < i; ) {
          if (
            ((o = F[h++]),
            (p = c(o, 0)),
            (q = c(o, 1)),
            (r = c(o, 2)),
            (s = c(o, 3)),
            (t = c(o, 4)),
            (u = c(o, 5)),
            (v = c(o, 6)),
            (w = c(o, 7)),
            p
              ? ((y = new THREE.Face4()),
                (y.a = F[h++]),
                (y.b = F[h++]),
                (y.c = F[h++]),
                (y.d = F[h++]),
                (j = 4))
              : ((y = new THREE.Face3()),
                (y.a = F[h++]),
                (y.b = F[h++]),
                (y.c = F[h++]),
                (j = 3)),
            q && ((n = F[h++]), (y.materialIndex = n)),
            (g = f.faces.length),
            r)
          )
            for (d = 0; d < J; d++)
              (B = a.uvs[d]),
                (m = F[h++]),
                (D = B[2 * m]),
                (E = B[2 * m + 1]),
                (f.faceUvs[d][g] = new THREE.Vector2(D, E));
          if (s)
            for (d = 0; d < J; d++) {
              for (B = a.uvs[d], C = [], e = 0; e < j; e++)
                (m = F[h++]),
                  (D = B[2 * m]),
                  (E = B[2 * m + 1]),
                  (C[e] = new THREE.Vector2(D, E));
              f.faceVertexUvs[d][g] = C;
            }
          if (
            (t &&
              ((l = 3 * F[h++]),
              (A = new THREE.Vector3()),
              (A.x = H[l++]),
              (A.y = H[l++]),
              (A.z = H[l]),
              (y.normal = A)),
            u)
          )
            for (d = 0; d < j; d++)
              (l = 3 * F[h++]),
                (A = new THREE.Vector3()),
                (A.x = H[l++]),
                (A.y = H[l++]),
                (A.z = H[l]),
                y.vertexNormals.push(A);
          if (
            (v && ((k = F[h++]), (z = new THREE.Color(I[k])), (y.color = z)), w)
          )
            for (d = 0; d < j; d++)
              (k = F[h++]), (z = new THREE.Color(I[k])), y.vertexColors.push(z);
          f.faces.push(y);
        }
      }
      function d() {
        var b, c, d, e, g, h, i, j, k, l;
        if (a.skinWeights)
          for (b = 0, c = a.skinWeights.length; b < c; b += 2)
            (d = a.skinWeights[b]),
              (e = a.skinWeights[b + 1]),
              (g = 0),
              (h = 0),
              f.skinWeights.push(new THREE.Vector4(d, e, g, h));
        if (a.skinIndices)
          for (b = 0, c = a.skinIndices.length; b < c; b += 2)
            (i = a.skinIndices[b]),
              (j = a.skinIndices[b + 1]),
              (k = 0),
              (l = 0),
              f.skinIndices.push(new THREE.Vector4(i, j, k, l));
        (f.bones = a.bones), (f.animation = a.animation);
      }
      function e(b) {
        if (void 0 !== a.morphTargets) {
          var c, d, e, g, h, i;
          for (c = 0, d = a.morphTargets.length; c < d; c++)
            for (
              f.morphTargets[c] = {},
                f.morphTargets[c].name = a.morphTargets[c].name,
                f.morphTargets[c].vertices = [],
                h = f.morphTargets[c].vertices,
                i = a.morphTargets[c].vertices,
                e = 0,
                g = i.length;
              e < g;
              e += 3
            ) {
              var j = new THREE.Vector3();
              (j.x = i[e] * b),
                (j.y = i[e + 1] * b),
                (j.z = i[e + 2] * b),
                h.push(j);
            }
        }
        if (void 0 !== a.morphColors) {
          var c, d, k, l, m, n, o;
          for (c = 0, d = a.morphColors.length; c < d; c++)
            for (
              f.morphColors[c] = {},
                f.morphColors[c].name = a.morphColors[c].name,
                f.morphColors[c].colors = [],
                m = f.morphColors[c].colors,
                n = a.morphColors[c].colors,
                k = 0,
                l = n.length;
              k < l;
              k += 3
            )
              (o = new THREE.Color(16755200)),
                o.setRGB(n[k], n[k + 1], n[k + 2]),
                m.push(o);
        }
      }
      var f = new THREE.Geometry(),
        g = void 0 !== a.scale ? 1 / a.scale : 1;
      if (
        (c(g),
        d(),
        e(g),
        f.computeCentroids(),
        f.computeFaceNormals(),
        f.computeBoundingSphere(),
        void 0 === a.materials)
      )
        return { geometry: f };
      var h = this.initMaterials(a.materials, b);
      return (
        this.needsTangents(h) && f.computeTangents(),
        { geometry: f, materials: h }
      );
    }),
    (THREE.LoadingManager = function (a, b, c) {
      var d = this,
        e = 0,
        f = 0;
      (this.onLoad = a),
        (this.onProgress = b),
        (this.onError = c),
        (this.itemStart = function (a) {
          f++;
        }),
        (this.itemEnd = function (a) {
          e++,
            void 0 !== d.onProgress && d.onProgress(a, e, f),
            e === f && void 0 !== d.onLoad && d.onLoad();
        });
    }),
    (THREE.DefaultLoadingManager = new THREE.LoadingManager()),
    (THREE.ObjectLoader = function (a) {
      this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager;
    }),
    (THREE.ObjectLoader.prototype = {
      constructor: THREE.ObjectLoader,
      load: function (a, b, c, d) {
        var e = this,
          f = new THREE.XHRLoader(e.manager);
        f.setCrossOrigin(this.crossOrigin),
          f.load(a, function (a) {
            b(e.parse(JSON.parse(a)));
          });
      },
      setCrossOrigin: function (a) {
        this.crossOrigin = a;
      },
      parse: function (a) {
        var b = this.parseGeometries(a.geometries),
          c = this.parseMaterials(a.materials),
          d = this.parseObject(a.object, b, c);
        return d;
      },
      parseGeometries: function (a) {
        var b = {};
        if (void 0 !== a)
          for (
            var c = new THREE.JSONLoader(), d = 0, e = a.length;
            d < e;
            d++
          ) {
            var f,
              g = a[d];
            switch (g.type) {
              case "PlaneGeometry":
                f = new THREE.PlaneGeometry(
                  g.width,
                  g.height,
                  g.widthSegments,
                  g.heightSegments
                );
                break;
              case "CubeGeometry":
                f = new THREE.CubeGeometry(
                  g.width,
                  g.height,
                  g.depth,
                  g.widthSegments,
                  g.heightSegments,
                  g.depthSegments
                );
                break;
              case "CylinderGeometry":
                f = new THREE.CylinderGeometry(
                  g.radiusTop,
                  g.radiusBottom,
                  g.height,
                  g.radiusSegments,
                  g.heightSegments,
                  g.openEnded
                );
                break;
              case "SphereGeometry":
                f = new THREE.SphereGeometry(
                  g.radius,
                  g.widthSegments,
                  g.heightSegments,
                  g.phiStart,
                  g.phiLength,
                  g.thetaStart,
                  g.thetaLength
                );
                break;
              case "IcosahedronGeometry":
                f = new THREE.IcosahedronGeometry(g.radius, g.detail);
                break;
              case "TorusGeometry":
                f = new THREE.TorusGeometry(
                  g.radius,
                  g.tube,
                  g.radialSegments,
                  g.tubularSegments,
                  g.arc
                );
                break;
              case "TorusKnotGeometry":
                f = new THREE.TorusKnotGeometry(
                  g.radius,
                  g.tube,
                  g.radialSegments,
                  g.tubularSegments,
                  g.p,
                  g.q,
                  g.heightScale
                );
                break;
              case "Geometry":
                f = c.parse(g.data).geometry;
            }
            (f.uuid = g.uuid),
              void 0 !== g.name && (f.name = g.name),
              (b[g.uuid] = f);
          }
        return b;
      },
      parseMaterials: function (a) {
        var b = {};
        if (void 0 !== a)
          for (
            var c = new THREE.MaterialLoader(), d = 0, e = a.length;
            d < e;
            d++
          ) {
            var f = a[d],
              g = c.parse(f);
            (g.uuid = f.uuid),
              void 0 !== f.name && (g.name = f.name),
              (b[f.uuid] = g);
          }
        return b;
      },
      parseObject: (function () {
        var a = new THREE.Matrix4();
        return function (b, c, d) {
          var e;
          switch (b.type) {
            case "Scene":
              e = new THREE.Scene();
              break;
            case "PerspectiveCamera":
              e = new THREE.PerspectiveCamera(b.fov, b.aspect, b.near, b.far);
              break;
            case "OrthographicCamera":
              e = new THREE.OrthographicCamera(
                b.left,
                b.right,
                b.top,
                b.bottom,
                b.near,
                b.far
              );
              break;
            case "AmbientLight":
              e = new THREE.AmbientLight(b.color);
              break;
            case "DirectionalLight":
              e = new THREE.DirectionalLight(b.color, b.intensity);
              break;
            case "PointLight":
              e = new THREE.PointLight(b.color, b.intensity, b.distance);
              break;
            case "SpotLight":
              e = new THREE.SpotLight(
                b.color,
                b.intensity,
                b.distance,
                b.angle,
                b.exponent
              );
              break;
            case "HemisphereLight":
              e = new THREE.HemisphereLight(
                b.color,
                b.groundColor,
                b.intensity
              );
              break;
            case "Mesh":
              var f = c[b.geometry],
                g = d[b.material];
              void 0 === f &&
                console.error(
                  "THREE.ObjectLoader: Undefined geometry " + b.geometry
                ),
                void 0 === g &&
                  console.error(
                    "THREE.ObjectLoader: Undefined material " + b.material
                  ),
                (e = new THREE.Mesh(f, g));
              break;
            default:
              e = new THREE.Object3D();
          }
          if (
            ((e.uuid = b.uuid),
            void 0 !== b.name && (e.name = b.name),
            void 0 !== b.matrix
              ? (a.fromArray(b.matrix),
                a.decompose(e.position, e.quaternion, e.scale))
              : (void 0 !== b.position && e.position.fromArray(b.position),
                void 0 !== b.rotation && e.rotation.fromArray(b.rotation),
                void 0 !== b.scale && e.scale.fromArray(b.scale)),
            void 0 !== b.visible && (e.visible = b.visible),
            void 0 !== b.userData && (e.userData = b.userData),
            void 0 !== b.children)
          )
            for (var h in b.children)
              e.add(this.parseObject(b.children[h], c, d));
          return e;
        };
      })(),
    }),
    (THREE.SceneLoader = function () {
      (this.onLoadStart = function () {}),
        (this.onLoadProgress = function () {}),
        (this.onLoadComplete = function () {}),
        (this.callbackSync = function () {}),
        (this.callbackProgress = function () {}),
        (this.geometryHandlers = {}),
        (this.hierarchyHandlers = {}),
        this.addGeometryHandler("ascii", THREE.JSONLoader);
    }),
    (THREE.SceneLoader.prototype = {
      constructor: THREE.SceneLoader,
      load: function (a, b, c, d) {
        var e = this,
          f = new THREE.XHRLoader(e.manager);
        f.setCrossOrigin(this.crossOrigin),
          f.load(a, function (c) {
            e.parse(JSON.parse(c), b, a);
          });
      },
      setCrossOrigin: function (a) {
        this.crossOrigin = a;
      },
      addGeometryHandler: function (a, b) {
        this.geometryHandlers[a] = { loaderClass: b };
      },
      addHierarchyHandler: function (a, b) {
        this.hierarchyHandlers[a] = { loaderClass: b };
      },
      parse: function (a, b, c) {
        function d(a, b) {
          return "relativeToHTML" == b ? a : D + "/" + a;
        }
        function e() {
          f(B.scene, F.objects);
        }
        function f(a, b) {
          var c, e, g, h, i, k;
          for (var l in b) {
            var m = B.objects[l],
              n = b[l];
            if (void 0 === m) {
              if (n.type && n.type in C.hierarchyHandlers) {
                if (void 0 === n.loading) {
                  var r = {
                      type: 1,
                      url: 1,
                      material: 1,
                      position: 1,
                      rotation: 1,
                      scale: 1,
                      visible: 1,
                      children: 1,
                      userData: 1,
                      skin: 1,
                      morph: 1,
                      mirroredLoop: 1,
                      duration: 1,
                    },
                    s = {};
                  for (var t in n) t in r || (s[t] = n[t]);
                  (p = B.materials[n.material]), (n.loading = !0);
                  var x = C.hierarchyHandlers[n.type].loaderObject;
                  x.options
                    ? x.load(d(n.url, F.urlBaseType), j(l, a, p, n))
                    : x.load(d(n.url, F.urlBaseType), j(l, a, p, n), s);
                }
              } else if (void 0 !== n.geometry) {
                if ((o = B.geometries[n.geometry])) {
                  var y = !1;
                  if (
                    ((p = B.materials[n.material]),
                    (y = p instanceof THREE.ShaderMaterial),
                    (g = n.position),
                    (h = n.rotation),
                    (i = n.scale),
                    (c = n.matrix),
                    (k = n.quaternion),
                    n.material ||
                      (p = new THREE.MeshFaceMaterial(
                        B.face_materials[n.geometry]
                      )),
                    p instanceof THREE.MeshFaceMaterial &&
                      0 === p.materials.length &&
                      (p = new THREE.MeshFaceMaterial(
                        B.face_materials[n.geometry]
                      )),
                    p instanceof THREE.MeshFaceMaterial)
                  )
                    for (var z = 0; z < p.materials.length; z++)
                      y = y || p.materials[z] instanceof THREE.ShaderMaterial;
                  y && o.computeTangents(),
                    n.skin
                      ? (m = new THREE.SkinnedMesh(o, p))
                      : n.morph
                      ? ((m = new THREE.MorphAnimMesh(o, p)),
                        void 0 !== n.duration && (m.duration = n.duration),
                        void 0 !== n.time && (m.time = n.time),
                        void 0 !== n.mirroredLoop &&
                          (m.mirroredLoop = n.mirroredLoop),
                        p.morphNormals && o.computeMorphNormals())
                      : (m = new THREE.Mesh(o, p)),
                    (m.name = l),
                    c
                      ? ((m.matrixAutoUpdate = !1),
                        m.matrix.set(
                          c[0],
                          c[1],
                          c[2],
                          c[3],
                          c[4],
                          c[5],
                          c[6],
                          c[7],
                          c[8],
                          c[9],
                          c[10],
                          c[11],
                          c[12],
                          c[13],
                          c[14],
                          c[15]
                        ))
                      : (m.position.fromArray(g),
                        k ? m.quaternion.fromArray(k) : m.rotation.fromArray(h),
                        m.scale.fromArray(i)),
                    (m.visible = n.visible),
                    (m.castShadow = n.castShadow),
                    (m.receiveShadow = n.receiveShadow),
                    a.add(m),
                    (B.objects[l] = m);
                }
              } else
                "DirectionalLight" === n.type ||
                "PointLight" === n.type ||
                "AmbientLight" === n.type
                  ? ((v = void 0 !== n.color ? n.color : 16777215),
                    (w = void 0 !== n.intensity ? n.intensity : 1),
                    "DirectionalLight" === n.type
                      ? ((g = n.direction),
                        (u = new THREE.DirectionalLight(v, w)),
                        u.position.fromArray(g),
                        n.target &&
                          (E.push({ object: u, targetName: n.target }),
                          (u.target = null)))
                      : "PointLight" === n.type
                      ? ((g = n.position),
                        (e = n.distance),
                        (u = new THREE.PointLight(v, w, e)),
                        u.position.fromArray(g))
                      : "AmbientLight" === n.type &&
                        (u = new THREE.AmbientLight(v)),
                    a.add(u),
                    (u.name = l),
                    (B.lights[l] = u),
                    (B.objects[l] = u))
                  : "PerspectiveCamera" === n.type ||
                    "OrthographicCamera" === n.type
                  ? ((g = n.position),
                    (h = n.rotation),
                    (k = n.quaternion),
                    "PerspectiveCamera" === n.type
                      ? (q = new THREE.PerspectiveCamera(
                          n.fov,
                          n.aspect,
                          n.near,
                          n.far
                        ))
                      : "OrthographicCamera" === n.type &&
                        (q = new THREE.OrthographicCamera(
                          n.left,
                          n.right,
                          n.top,
                          n.bottom,
                          n.near,
                          n.far
                        )),
                    (q.name = l),
                    q.position.fromArray(g),
                    void 0 !== k
                      ? q.quaternion.fromArray(k)
                      : void 0 !== h && q.rotation.fromArray(h),
                    a.add(q),
                    (B.cameras[l] = q),
                    (B.objects[l] = q))
                  : ((g = n.position),
                    (h = n.rotation),
                    (i = n.scale),
                    (k = n.quaternion),
                    (m = new THREE.Object3D()),
                    (m.name = l),
                    m.position.fromArray(g),
                    k ? m.quaternion.fromArray(k) : m.rotation.fromArray(h),
                    m.scale.fromArray(i),
                    (m.visible = void 0 !== n.visible && n.visible),
                    a.add(m),
                    (B.objects[l] = m),
                    (B.empties[l] = m));
              if (m) {
                if (void 0 !== n.userData)
                  for (var A in n.userData) {
                    var D = n.userData[A];
                    m.userData[A] = D;
                  }
                if (void 0 !== n.groups)
                  for (var z = 0; z < n.groups.length; z++) {
                    var G = n.groups[z];
                    void 0 === B.groups[G] && (B.groups[G] = []),
                      B.groups[G].push(l);
                  }
              }
            }
            void 0 !== m && void 0 !== n.children && f(m, n.children);
          }
        }
        function g(a, b, c) {
          (B.geometries[c] = a), (B.face_materials[c] = b), e();
        }
        function h(a, b, c, d, f) {
          var g = f.position,
            h = f.rotation,
            i = f.quaternion,
            j = f.scale;
          a.position.fromArray(g),
            i ? a.quaternion.fromArray(i) : a.rotation.fromArray(h),
            a.scale.fromArray(j),
            d &&
              a.traverse(function (a) {
                a.material = d;
              });
          var k = void 0 === f.visible || f.visible;
          a.traverse(function (a) {
            a.visible = k;
          }),
            c.add(a),
            (a.name = b),
            (B.objects[b] = a),
            e();
        }
        function i(a) {
          return function (b, c) {
            (b.name = a), g(b, c, a), (x -= 1), C.onLoadComplete(), l();
          };
        }
        function j(a, b, c, d) {
          return function (e) {
            var f;
            (f = e.content ? e.content : e.dae ? e.scene : e),
              h(f, a, b, c, d),
              (x -= 1),
              C.onLoadComplete(),
              l();
          };
        }
        function k(a) {
          return function (b, c) {
            (b.name = a), (B.geometries[a] = b), (B.face_materials[a] = c);
          };
        }
        function l() {
          var a = {
            totalModels: z,
            totalTextures: A,
            loadedModels: z - x,
            loadedTextures: A - y,
          };
          C.callbackProgress(a, B),
            C.onLoadProgress(),
            0 === x && 0 === y && (m(), b(B));
        }
        function m() {
          for (var a = 0; a < E.length; a++) {
            var b = E[a],
              c = B.objects[b.targetName];
            c
              ? (b.object.target = c)
              : ((b.object.target = new THREE.Object3D()),
                B.scene.add(b.object.target)),
              (b.object.target.userData.targetInverse = b.object);
          }
        }
        function n(a, b) {
          if ((b(a), void 0 !== a.children))
            for (var c in a.children) n(a.children[c], b);
        }
        var o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z,
          A,
          B,
          C = this,
          D = THREE.Loader.prototype.extractUrlBase(c),
          E = [],
          F = a;
        for (var G in this.geometryHandlers) {
          var H = this.geometryHandlers[G].loaderClass;
          this.geometryHandlers[G].loaderObject = new H();
        }
        for (var G in this.hierarchyHandlers) {
          var H = this.hierarchyHandlers[G].loaderClass;
          this.hierarchyHandlers[G].loaderObject = new H();
        }
        if (
          ((x = 0),
          (y = 0),
          (B = {
            scene: new THREE.Scene(),
            geometries: {},
            face_materials: {},
            materials: {},
            textures: {},
            objects: {},
            cameras: {},
            lights: {},
            fogs: {},
            empties: {},
            groups: {},
          }),
          F.transform)
        ) {
          var I = F.transform.position,
            J = F.transform.rotation,
            K = F.transform.scale;
          I && B.scene.position.fromArray(I),
            J && B.scene.rotation.fromArray(J),
            K && B.scene.scale.fromArray(K),
            (I || J || K) &&
              (B.scene.updateMatrix(), B.scene.updateMatrixWorld());
        }
        var L,
          M,
          N = function (a) {
            (y -= a), l(), C.onLoadComplete();
          },
          O = function (a) {
            return function () {
              N(a);
            };
          };
        for (L in F.fogs)
          (M = F.fogs[L]),
            "linear" === M.type
              ? (r = new THREE.Fog(0, M.near, M.far))
              : "exp2" === M.type && (r = new THREE.FogExp2(0, M.density)),
            (t = M.color),
            r.color.setRGB(t[0], t[1], t[2]),
            (B.fogs[L] = r);
        var P, Q;
        for (P in F.geometries)
          (Q = F.geometries[P]),
            Q.type in this.geometryHandlers && ((x += 1), C.onLoadStart());
        for (var R in F.objects)
          n(F.objects[R], function (a) {
            a.type &&
              a.type in C.hierarchyHandlers &&
              ((x += 1), C.onLoadStart());
          });
        z = x;
        for (P in F.geometries)
          if (((Q = F.geometries[P]), "cube" === Q.type))
            (o = new THREE.CubeGeometry(
              Q.width,
              Q.height,
              Q.depth,
              Q.widthSegments,
              Q.heightSegments,
              Q.depthSegments
            )),
              (o.name = P),
              (B.geometries[P] = o);
          else if ("plane" === Q.type)
            (o = new THREE.PlaneGeometry(
              Q.width,
              Q.height,
              Q.widthSegments,
              Q.heightSegments
            )),
              (o.name = P),
              (B.geometries[P] = o);
          else if ("sphere" === Q.type)
            (o = new THREE.SphereGeometry(
              Q.radius,
              Q.widthSegments,
              Q.heightSegments
            )),
              (o.name = P),
              (B.geometries[P] = o);
          else if ("cylinder" === Q.type)
            (o = new THREE.CylinderGeometry(
              Q.topRad,
              Q.botRad,
              Q.height,
              Q.radSegs,
              Q.heightSegs
            )),
              (o.name = P),
              (B.geometries[P] = o);
          else if ("torus" === Q.type)
            (o = new THREE.TorusGeometry(
              Q.radius,
              Q.tube,
              Q.segmentsR,
              Q.segmentsT
            )),
              (o.name = P),
              (B.geometries[P] = o);
          else if ("icosahedron" === Q.type)
            (o = new THREE.IcosahedronGeometry(Q.radius, Q.subdivisions)),
              (o.name = P),
              (B.geometries[P] = o);
          else if (Q.type in this.geometryHandlers) {
            var S = {};
            for (var T in Q) "type" !== T && "url" !== T && (S[T] = Q[T]);
            var U = this.geometryHandlers[Q.type].loaderObject;
            U.load(d(Q.url, F.urlBaseType), i(P), S);
          } else if ("embedded" === Q.type) {
            var V = F.embeds[Q.id],
              W = "";
            if (((V.metadata = F.metadata), V)) {
              var X = this.geometryHandlers.ascii.loaderObject,
                Y = X.parse(V, W);
              k(P)(Y.geometry, Y.materials);
            }
          }
        var Z, $;
        for (Z in F.textures)
          if ((($ = F.textures[Z]), $.url instanceof Array)) {
            y += $.url.length;
            for (var _ = 0; _ < $.url.length; _++) C.onLoadStart();
          } else (y += 1), C.onLoadStart();
        A = y;
        for (Z in F.textures) {
          if (
            (($ = F.textures[Z]),
            void 0 !== $.mapping &&
              void 0 !== THREE[$.mapping] &&
              ($.mapping = new THREE[$.mapping]()),
            $.url instanceof Array)
          ) {
            for (var aa = $.url.length, ba = [], ca = 0; ca < aa; ca++)
              ba[ca] = d($.url[ca], F.urlBaseType);
            var da = /\.dds$/i.test(ba[0]);
            s = da
              ? THREE.ImageUtils.loadCompressedTextureCube(ba, $.mapping, O(aa))
              : THREE.ImageUtils.loadTextureCube(ba, $.mapping, O(aa));
          } else {
            var da = /\.dds$/i.test($.url),
              ea = d($.url, F.urlBaseType),
              fa = O(1);
            if (
              ((s = da
                ? THREE.ImageUtils.loadCompressedTexture(ea, $.mapping, fa)
                : THREE.ImageUtils.loadTexture(ea, $.mapping, fa)),
              void 0 !== THREE[$.minFilter] &&
                (s.minFilter = THREE[$.minFilter]),
              void 0 !== THREE[$.magFilter] &&
                (s.magFilter = THREE[$.magFilter]),
              $.anisotropy && (s.anisotropy = $.anisotropy),
              $.repeat &&
                (s.repeat.set($.repeat[0], $.repeat[1]),
                1 !== $.repeat[0] && (s.wrapS = THREE.RepeatWrapping),
                1 !== $.repeat[1] && (s.wrapT = THREE.RepeatWrapping)),
              $.offset && s.offset.set($.offset[0], $.offset[1]),
              $.wrap)
            ) {
              var ga = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping,
              };
              void 0 !== ga[$.wrap[0]] && (s.wrapS = ga[$.wrap[0]]),
                void 0 !== ga[$.wrap[1]] && (s.wrapT = ga[$.wrap[1]]);
            }
          }
          B.textures[Z] = s;
        }
        var ha, ia, ja;
        for (ha in F.materials) {
          ia = F.materials[ha];
          for (ja in ia.parameters)
            if (
              "envMap" === ja ||
              "map" === ja ||
              "lightMap" === ja ||
              "bumpMap" === ja
            )
              ia.parameters[ja] = B.textures[ia.parameters[ja]];
            else if ("shading" === ja)
              ia.parameters[ja] =
                "flat" === ia.parameters[ja]
                  ? THREE.FlatShading
                  : THREE.SmoothShading;
            else if ("side" === ja)
              "double" == ia.parameters[ja]
                ? (ia.parameters[ja] = THREE.DoubleSide)
                : "back" == ia.parameters[ja]
                ? (ia.parameters[ja] = THREE.BackSide)
                : (ia.parameters[ja] = THREE.FrontSide);
            else if ("blending" === ja)
              ia.parameters[ja] =
                ia.parameters[ja] in THREE
                  ? THREE[ia.parameters[ja]]
                  : THREE.NormalBlending;
            else if ("combine" === ja)
              ia.parameters[ja] =
                ia.parameters[ja] in THREE
                  ? THREE[ia.parameters[ja]]
                  : THREE.MultiplyOperation;
            else if ("vertexColors" === ja)
              "face" == ia.parameters[ja]
                ? (ia.parameters[ja] = THREE.FaceColors)
                : ia.parameters[ja] && (ia.parameters[ja] = THREE.VertexColors);
            else if ("wrapRGB" === ja) {
              var ka = ia.parameters[ja];
              ia.parameters[ja] = new THREE.Vector3(ka[0], ka[1], ka[2]);
            }
          if (
            (void 0 !== ia.parameters.opacity &&
              ia.parameters.opacity < 1 &&
              (ia.parameters.transparent = !0),
            ia.parameters.normalMap)
          ) {
            var la = THREE.ShaderLib.normalmap,
              ma = THREE.UniformsUtils.clone(la.uniforms),
              na = ia.parameters.color,
              oa = ia.parameters.specular,
              pa = ia.parameters.ambient,
              qa = ia.parameters.shininess;
            (ma.tNormal.value = B.textures[ia.parameters.normalMap]),
              ia.parameters.normalScale &&
                ma.uNormalScale.value.set(
                  ia.parameters.normalScale[0],
                  ia.parameters.normalScale[1]
                ),
              ia.parameters.map &&
                ((ma.tDiffuse.value = ia.parameters.map),
                (ma.enableDiffuse.value = !0)),
              ia.parameters.envMap &&
                ((ma.tCube.value = ia.parameters.envMap),
                (ma.enableReflection.value = !0),
                (ma.uReflectivity.value = ia.parameters.reflectivity)),
              ia.parameters.lightMap &&
                ((ma.tAO.value = ia.parameters.lightMap),
                (ma.enableAO.value = !0)),
              ia.parameters.specularMap &&
                ((ma.tSpecular.value = B.textures[ia.parameters.specularMap]),
                (ma.enableSpecular.value = !0)),
              ia.parameters.displacementMap &&
                ((ma.tDisplacement.value =
                  B.textures[ia.parameters.displacementMap]),
                (ma.enableDisplacement.value = !0),
                (ma.uDisplacementBias.value = ia.parameters.displacementBias),
                (ma.uDisplacementScale.value =
                  ia.parameters.displacementScale)),
              ma.uDiffuseColor.value.setHex(na),
              ma.uSpecularColor.value.setHex(oa),
              ma.uAmbientColor.value.setHex(pa),
              (ma.uShininess.value = qa),
              ia.parameters.opacity &&
                (ma.uOpacity.value = ia.parameters.opacity);
            var ra = {
              fragmentShader: la.fragmentShader,
              vertexShader: la.vertexShader,
              uniforms: ma,
              lights: !0,
              fog: !0,
            };
            p = new THREE.ShaderMaterial(ra);
          } else p = new THREE[ia.type](ia.parameters);
          (p.name = ha), (B.materials[ha] = p);
        }
        for (ha in F.materials)
          if (((ia = F.materials[ha]), ia.parameters.materials)) {
            for (
              var sa = [], ca = 0;
              ca < ia.parameters.materials.length;
              ca++
            ) {
              var ta = ia.parameters.materials[ca];
              sa.push(B.materials[ta]);
            }
            B.materials[ha].materials = sa;
          }
        e(),
          B.cameras &&
            F.defaults.camera &&
            (B.currentCamera = B.cameras[F.defaults.camera]),
          B.fogs && F.defaults.fog && (B.scene.fog = B.fogs[F.defaults.fog]),
          C.callbackSync(B),
          l();
      },
    }),
    (THREE.Material = function () {
      (this.id = THREE.MaterialIdCount++),
        (this.uuid = THREE.Math.generateUUID()),
        (this.name = ""),
        (this.side = THREE.FrontSide),
        (this.opacity = 1),
        (this.transparent = !1),
        (this.blending = THREE.NormalBlending),
        (this.blendSrc = THREE.SrcAlphaFactor),
        (this.blendDst = THREE.OneMinusSrcAlphaFactor),
        (this.blendEquation = THREE.AddEquation),
        (this.depthTest = !0),
        (this.depthWrite = !0),
        (this.polygonOffset = !1),
        (this.polygonOffsetFactor = 0),
        (this.polygonOffsetUnits = 0),
        (this.alphaTest = 0),
        (this.overdraw = 0),
        (this.visible = !0),
        (this.needsUpdate = !0);
    }),
    (THREE.Material.prototype = {
      constructor: THREE.Material,
      setValues: function (a) {
        if (void 0 !== a)
          for (var b in a) {
            var c = a[b];
            if (void 0 !== c) {
              if (b in this) {
                var d = this[b];
                d instanceof THREE.Color
                  ? d.set(c)
                  : d instanceof THREE.Vector3 && c instanceof THREE.Vector3
                  ? d.copy(c)
                  : "overdraw" == b
                  ? (this[b] = Number(c))
                  : (this[b] = c);
              }
            } else
              console.warn(
                "THREE.Material: '" + b + "' parameter is undefined."
              );
          }
      },
      clone: function (a) {
        return (
          void 0 === a && (a = new THREE.Material()),
          (a.name = this.name),
          (a.side = this.side),
          (a.opacity = this.opacity),
          (a.transparent = this.transparent),
          (a.blending = this.blending),
          (a.blendSrc = this.blendSrc),
          (a.blendDst = this.blendDst),
          (a.blendEquation = this.blendEquation),
          (a.depthTest = this.depthTest),
          (a.depthWrite = this.depthWrite),
          (a.polygonOffset = this.polygonOffset),
          (a.polygonOffsetFactor = this.polygonOffsetFactor),
          (a.polygonOffsetUnits = this.polygonOffsetUnits),
          (a.alphaTest = this.alphaTest),
          (a.overdraw = this.overdraw),
          (a.visible = this.visible),
          a
        );
      },
      dispose: function () {
        this.dispatchEvent({ type: "dispose" });
      },
    }),
    THREE.EventDispatcher.prototype.apply(THREE.Material.prototype),
    (THREE.MaterialIdCount = 0),
    (THREE.LineBasicMaterial = function (a) {
      THREE.Material.call(this),
        (this.color = new THREE.Color(16777215)),
        (this.linewidth = 1),
        (this.linecap = "round"),
        (this.linejoin = "round"),
        (this.vertexColors = !1),
        (this.fog = !0),
        this.setValues(a);
    }),
    (THREE.LineBasicMaterial.prototype = Object.create(
      THREE.Material.prototype
    )),
    (THREE.LineBasicMaterial.prototype.clone = function () {
      var a = new THREE.LineBasicMaterial();
      return (
        THREE.Material.prototype.clone.call(this, a),
        a.color.copy(this.color),
        (a.linewidth = this.linewidth),
        (a.linecap = this.linecap),
        (a.linejoin = this.linejoin),
        (a.vertexColors = this.vertexColors),
        (a.fog = this.fog),
        a
      );
    }),
    (THREE.LineDashedMaterial = function (a) {
      THREE.Material.call(this),
        (this.color = new THREE.Color(16777215)),
        (this.linewidth = 1),
        (this.scale = 1),
        (this.dashSize = 3),
        (this.gapSize = 1),
        (this.vertexColors = !1),
        (this.fog = !0),
        this.setValues(a);
    }),
    (THREE.LineDashedMaterial.prototype = Object.create(
      THREE.Material.prototype
    )),
    (THREE.LineDashedMaterial.prototype.clone = function () {
      var a = new THREE.LineDashedMaterial();
      return (
        THREE.Material.prototype.clone.call(this, a),
        a.color.copy(this.color),
        (a.linewidth = this.linewidth),
        (a.scale = this.scale),
        (a.dashSize = this.dashSize),
        (a.gapSize = this.gapSize),
        (a.vertexColors = this.vertexColors),
        (a.fog = this.fog),
        a
      );
    }),
    (THREE.MeshBasicMaterial = function (a) {
      THREE.Material.call(this),
        (this.color = new THREE.Color(16777215)),
        (this.map = null),
        (this.lightMap = null),
        (this.specularMap = null),
        (this.envMap = null),
        (this.combine = THREE.MultiplyOperation),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.fog = !0),
        (this.shading = THREE.SmoothShading),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.vertexColors = THREE.NoColors),
        (this.skinning = !1),
        (this.morphTargets = !1),
        this.setValues(a);
    }),
    (THREE.MeshBasicMaterial.prototype = Object.create(
      THREE.Material.prototype
    )),
    (THREE.MeshBasicMaterial.prototype.clone = function () {
      var a = new THREE.MeshBasicMaterial();
      return (
        THREE.Material.prototype.clone.call(this, a),
        a.color.copy(this.color),
        (a.map = this.map),
        (a.lightMap = this.lightMap),
        (a.specularMap = this.specularMap),
        (a.envMap = this.envMap),
        (a.combine = this.combine),
        (a.reflectivity = this.reflectivity),
        (a.refractionRatio = this.refractionRatio),
        (a.fog = this.fog),
        (a.shading = this.shading),
        (a.wireframe = this.wireframe),
        (a.wireframeLinewidth = this.wireframeLinewidth),
        (a.wireframeLinecap = this.wireframeLinecap),
        (a.wireframeLinejoin = this.wireframeLinejoin),
        (a.vertexColors = this.vertexColors),
        (a.skinning = this.skinning),
        (a.morphTargets = this.morphTargets),
        a
      );
    }),
    (THREE.MeshLambertMaterial = function (a) {
      THREE.Material.call(this),
        (this.color = new THREE.Color(16777215)),
        (this.ambient = new THREE.Color(16777215)),
        (this.emissive = new THREE.Color(0)),
        (this.wrapAround = !1),
        (this.wrapRGB = new THREE.Vector3(1, 1, 1)),
        (this.map = null),
        (this.lightMap = null),
        (this.specularMap = null),
        (this.envMap = null),
        (this.combine = THREE.MultiplyOperation),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.fog = !0),
        (this.shading = THREE.SmoothShading),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.vertexColors = THREE.NoColors),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        this.setValues(a);
    }),
    (THREE.MeshLambertMaterial.prototype = Object.create(
      THREE.Material.prototype
    )),
    (THREE.MeshLambertMaterial.prototype.clone = function () {
      var a = new THREE.MeshLambertMaterial();
      return (
        THREE.Material.prototype.clone.call(this, a),
        a.color.copy(this.color),
        a.ambient.copy(this.ambient),
        a.emissive.copy(this.emissive),
        (a.wrapAround = this.wrapAround),
        a.wrapRGB.copy(this.wrapRGB),
        (a.map = this.map),
        (a.lightMap = this.lightMap),
        (a.specularMap = this.specularMap),
        (a.envMap = this.envMap),
        (a.combine = this.combine),
        (a.reflectivity = this.reflectivity),
        (a.refractionRatio = this.refractionRatio),
        (a.fog = this.fog),
        (a.shading = this.shading),
        (a.wireframe = this.wireframe),
        (a.wireframeLinewidth = this.wireframeLinewidth),
        (a.wireframeLinecap = this.wireframeLinecap),
        (a.wireframeLinejoin = this.wireframeLinejoin),
        (a.vertexColors = this.vertexColors),
        (a.skinning = this.skinning),
        (a.morphTargets = this.morphTargets),
        (a.morphNormals = this.morphNormals),
        a
      );
    }),
    (THREE.MeshPhongMaterial = function (a) {
      THREE.Material.call(this),
        (this.color = new THREE.Color(16777215)),
        (this.ambient = new THREE.Color(16777215)),
        (this.emissive = new THREE.Color(0)),
        (this.specular = new THREE.Color(1118481)),
        (this.shininess = 30),
        (this.metal = !1),
        (this.perPixel = !0),
        (this.wrapAround = !1),
        (this.wrapRGB = new THREE.Vector3(1, 1, 1)),
        (this.map = null),
        (this.lightMap = null),
        (this.bumpMap = null),
        (this.bumpScale = 1),
        (this.normalMap = null),
        (this.normalScale = new THREE.Vector2(1, 1)),
        (this.specularMap = null),
        (this.envMap = null),
        (this.combine = THREE.MultiplyOperation),
        (this.reflectivity = 1),
        (this.refractionRatio = 0.98),
        (this.fog = !0),
        (this.shading = THREE.SmoothShading),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.wireframeLinecap = "round"),
        (this.wireframeLinejoin = "round"),
        (this.vertexColors = THREE.NoColors),
        (this.skinning = !1),
        (this.morphTargets = !1),
        (this.morphNormals = !1),
        this.setValues(a);
    }),
    (THREE.MeshPhongMaterial.prototype = Object.create(
      THREE.Material.prototype
    )),
    (THREE.MeshPhongMaterial.prototype.clone = function () {
      var a = new THREE.MeshPhongMaterial();
      return (
        THREE.Material.prototype.clone.call(this, a),
        a.color.copy(this.color),
        a.ambient.copy(this.ambient),
        a.emissive.copy(this.emissive),
        a.specular.copy(this.specular),
        (a.shininess = this.shininess),
        (a.metal = this.metal),
        (a.perPixel = this.perPixel),
        (a.wrapAround = this.wrapAround),
        a.wrapRGB.copy(this.wrapRGB),
        (a.map = this.map),
        (a.lightMap = this.lightMap),
        (a.bumpMap = this.bumpMap),
        (a.bumpScale = this.bumpScale),
        (a.normalMap = this.normalMap),
        a.normalScale.copy(this.normalScale),
        (a.specularMap = this.specularMap),
        (a.envMap = this.envMap),
        (a.combine = this.combine),
        (a.reflectivity = this.reflectivity),
        (a.refractionRatio = this.refractionRatio),
        (a.fog = this.fog),
        (a.shading = this.shading),
        (a.wireframe = this.wireframe),
        (a.wireframeLinewidth = this.wireframeLinewidth),
        (a.wireframeLinecap = this.wireframeLinecap),
        (a.wireframeLinejoin = this.wireframeLinejoin),
        (a.vertexColors = this.vertexColors),
        (a.skinning = this.skinning),
        (a.morphTargets = this.morphTargets),
        (a.morphNormals = this.morphNormals),
        a
      );
    }),
    (THREE.MeshDepthMaterial = function (a) {
      THREE.Material.call(this),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        this.setValues(a);
    }),
    (THREE.MeshDepthMaterial.prototype = Object.create(
      THREE.Material.prototype
    )),
    (THREE.MeshDepthMaterial.prototype.clone = function () {
      var a = new THREE.MeshDepthMaterial();
      return (
        THREE.Material.prototype.clone.call(this, a),
        (a.wireframe = this.wireframe),
        (a.wireframeLinewidth = this.wireframeLinewidth),
        a
      );
    }),
    (THREE.MeshNormalMaterial = function (a) {
      THREE.Material.call(this, a),
        (this.shading = THREE.FlatShading),
        (this.wireframe = !1),
        (this.wireframeLinewidth = 1),
        (this.morphTargets = !1),
        this.setValues(a);
    }),
    (THREE.MeshNormalMaterial.prototype = Object.create(
      THREE.Material.prototype
    )),
    (THREE.MeshNormalMaterial.prototype.clone = function () {
      var a = new THREE.MeshNormalMaterial();
      return (
        THREE.Material.prototype.clone.call(this, a),
        (a.shading = this.shading),
        (a.wireframe = this.wireframe),
        (a.wireframeLinewidth = this.wireframeLinewidth),
        a
      );
    }),
    (THREE.MeshFaceMaterial = function (a) {
      this.materials = a instanceof Array ? a : [];
    }),
    (THREE.MeshFaceMaterial.prototype.clone = function () {
      return new THREE.MeshFaceMaterial(this.materials.slice(0));
    }),
    (THREE.Texture = function (a, b, c, d, e, f, g, h, i) {
      (this.id = THREE.TextureIdCount++),
        (this.uuid = THREE.Math.generateUUID()),
        (this.name = ""),
        (this.image = a),
        (this.mipmaps = []),
        (this.mapping = void 0 !== b ? b : new THREE.UVMapping()),
        (this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping),
        (this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping),
        (this.magFilter = void 0 !== e ? e : THREE.LinearFilter),
        (this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter),
        (this.anisotropy = void 0 !== i ? i : 1),
        (this.format = void 0 !== g ? g : THREE.RGBAFormat),
        (this.type = void 0 !== h ? h : THREE.UnsignedByteType),
        (this.offset = new THREE.Vector2(0, 0)),
        (this.repeat = new THREE.Vector2(1, 1)),
        (this.generateMipmaps = !0),
        (this.premultiplyAlpha = !1),
        (this.flipY = !0),
        (this.unpackAlignment = 4),
        (this.needsUpdate = !1),
        (this.onUpdate = null);
    }),
    (THREE.Texture.prototype = {
      constructor: THREE.Texture,
      clone: function (a) {
        return (
          void 0 === a && (a = new THREE.Texture()),
          (a.image = this.image),
          (a.mipmaps = this.mipmaps.slice(0)),
          (a.mapping = this.mapping),
          (a.wrapS = this.wrapS),
          (a.wrapT = this.wrapT),
          (a.magFilter = this.magFilter),
          (a.minFilter = this.minFilter),
          (a.anisotropy = this.anisotropy),
          (a.format = this.format),
          (a.type = this.type),
          a.offset.copy(this.offset),
          a.repeat.copy(this.repeat),
          (a.generateMipmaps = this.generateMipmaps),
          (a.premultiplyAlpha = this.premultiplyAlpha),
          (a.flipY = this.flipY),
          (a.unpackAlignment = this.unpackAlignment),
          a
        );
      },
      dispose: function () {
        this.dispatchEvent({ type: "dispose" });
      },
    }),
    THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype),
    (THREE.TextureIdCount = 0),
    (THREE.CompressedTexture = function (a, b, c, d, e, f, g, h, i, j, k) {
      THREE.Texture.call(this, null, f, g, h, i, j, d, e, k),
        (this.image = { width: b, height: c }),
        (this.mipmaps = a),
        (this.generateMipmaps = !1);
    }),
    (THREE.CompressedTexture.prototype = Object.create(
      THREE.Texture.prototype
    )),
    (THREE.CompressedTexture.prototype.clone = function () {
      var a = new THREE.CompressedTexture();
      return THREE.Texture.prototype.clone.call(this, a), a;
    }),
    (THREE.DataTexture = function (a, b, c, d, e, f, g, h, i, j, k) {
      THREE.Texture.call(this, null, f, g, h, i, j, d, e, k),
        (this.image = { data: a, width: b, height: c });
    }),
    (THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype)),
    (THREE.DataTexture.prototype.clone = function () {
      var a = new THREE.DataTexture();
      return THREE.Texture.prototype.clone.call(this, a), a;
    }),
    (THREE.Particle = function (a) {
      THREE.Object3D.call(this), (this.material = a);
    }),
    (THREE.Particle.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Particle.prototype.clone = function (a) {
      return (
        void 0 === a && (a = new THREE.Particle(this.material)),
        THREE.Object3D.prototype.clone.call(this, a),
        a
      );
    }),
    (THREE.ParticleSystem = function (a, b) {
      THREE.Object3D.call(this),
        (this.geometry = void 0 !== a ? a : new THREE.Geometry()),
        (this.material =
          void 0 !== b
            ? b
            : new THREE.ParticleBasicMaterial({
                color: 16777215 * Math.random(),
              })),
        (this.sortParticles = !1),
        (this.frustumCulled = !1);
    }),
    (THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.ParticleSystem.prototype.clone = function (a) {
      return (
        void 0 === a &&
          (a = new THREE.ParticleSystem(this.geometry, this.material)),
        (a.sortParticles = this.sortParticles),
        THREE.Object3D.prototype.clone.call(this, a),
        a
      );
    }),
    (THREE.Line = function (a, b, c) {
      THREE.Object3D.call(this),
        (this.geometry = void 0 !== a ? a : new THREE.Geometry()),
        (this.material =
          void 0 !== b
            ? b
            : new THREE.LineBasicMaterial({ color: 16777215 * Math.random() })),
        (this.type = void 0 !== c ? c : THREE.LineStrip);
    }),
    (THREE.LineStrip = 0),
    (THREE.LinePieces = 1),
    (THREE.Line.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Line.prototype.clone = function (a) {
      return (
        void 0 === a &&
          (a = new THREE.Line(this.geometry, this.material, this.type)),
        THREE.Object3D.prototype.clone.call(this, a),
        a
      );
    }),
    (THREE.Mesh = function (a, b) {
      THREE.Object3D.call(this),
        (this.geometry = void 0 !== a ? a : new THREE.Geometry()),
        (this.material =
          void 0 !== b
            ? b
            : new THREE.MeshBasicMaterial({ color: 16777215 * Math.random() })),
        this.updateMorphTargets();
    }),
    (THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Mesh.prototype.updateMorphTargets = function () {
      if (this.geometry.morphTargets.length > 0) {
        (this.morphTargetBase = -1),
          (this.morphTargetForcedOrder = []),
          (this.morphTargetInfluences = []),
          (this.morphTargetDictionary = {});
        for (var a = 0, b = this.geometry.morphTargets.length; a < b; a++)
          this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[this.geometry.morphTargets[a].name] =
              a);
      }
    }),
    (THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
      return void 0 !== this.morphTargetDictionary[a]
        ? this.morphTargetDictionary[a]
        : (console.log(
            "THREE.Mesh.getMorphTargetIndexByName: morph target " +
              a +
              " does not exist. Returning 0."
          ),
          0);
    }),
    (THREE.Mesh.prototype.clone = function (a) {
      return (
        void 0 === a && (a = new THREE.Mesh(this.geometry, this.material)),
        THREE.Object3D.prototype.clone.call(this, a),
        a
      );
    }),
    (THREE.Bone = function (a) {
      THREE.Object3D.call(this),
        (this.skin = a),
        (this.skinMatrix = new THREE.Matrix4());
    }),
    (THREE.Bone.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Bone.prototype.update = function (a, b) {
      this.matrixAutoUpdate && (b |= this.updateMatrix()),
        (b || this.matrixWorldNeedsUpdate) &&
          (a
            ? this.skinMatrix.multiplyMatrices(a, this.matrix)
            : this.skinMatrix.copy(this.matrix),
          (this.matrixWorldNeedsUpdate = !1),
          (b = !0));
      var c,
        d = this.children.length;
      for (c = 0; c < d; c++) this.children[c].update(this.skinMatrix, b);
    }),
    (THREE.LOD = function () {
      THREE.Object3D.call(this), (this.objects = []);
    }),
    (THREE.LOD.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.LOD.prototype.addLevel = function (a, b) {
      void 0 === b && (b = 0), (b = Math.abs(b));
      for (
        var c = 0;
        c < this.objects.length && !(b < this.objects[c].distance);
        c++
      );
      this.objects.splice(c, 0, { distance: b, object: a }), this.add(a);
    }),
    (THREE.LOD.prototype.getObjectForDistance = function (a) {
      for (
        var b = 1, c = this.objects.length;
        b < c && !(a < this.objects[b].distance);
        b++
      );
      return this.objects[b - 1].object;
    }),
    (THREE.LOD.prototype.update = (function () {
      var a = new THREE.Vector3(),
        b = new THREE.Vector3();
      return function (c) {
        if (this.objects.length > 1) {
          a.getPositionFromMatrix(c.matrixWorld),
            b.getPositionFromMatrix(this.matrixWorld);
          var d = a.distanceTo(b);
          this.objects[0].object.visible = !0;
          for (
            var e = 1, f = this.objects.length;
            e < f && d >= this.objects[e].distance;
            e++
          )
            (this.objects[e - 1].object.visible = !1),
              (this.objects[e].object.visible = !0);
          for (; e < f; e++) this.objects[e].object.visible = !1;
        }
      };
    })()),
    (THREE.LOD.prototype.clone = function () {}),
    (THREE.Sprite = function (a) {
      THREE.Object3D.call(this),
        (this.material = void 0 !== a ? a : new THREE.SpriteMaterial()),
        (this.rotation3d = this.rotation),
        (this.rotation = 0);
    }),
    (THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Sprite.prototype.updateMatrix = function () {
      this.rotation3d.set(0, 0, this.rotation, this.rotation3d.order),
        this.quaternion.setFromEuler(this.rotation3d),
        this.matrix.compose(this.position, this.quaternion, this.scale),
        (this.matrixWorldNeedsUpdate = !0);
    }),
    (THREE.Sprite.prototype.clone = function (a) {
      return (
        void 0 === a && (a = new THREE.Sprite(this.material)),
        THREE.Object3D.prototype.clone.call(this, a),
        a
      );
    }),
    (THREE.Scene = function () {
      THREE.Object3D.call(this),
        (this.fog = null),
        (this.overrideMaterial = null),
        (this.autoUpdate = !0),
        (this.matrixAutoUpdate = !1),
        (this.__objects = []),
        (this.__lights = []),
        (this.__objectsAdded = []),
        (this.__objectsRemoved = []);
    }),
    (THREE.Scene.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Scene.prototype.__addObject = function (a) {
      if (a instanceof THREE.Light)
        this.__lights.indexOf(a) === -1 && this.__lights.push(a),
          a.target && void 0 === a.target.parent && this.add(a.target);
      else if (
        !(a instanceof THREE.Camera || a instanceof THREE.Bone) &&
        this.__objects.indexOf(a) === -1
      ) {
        this.__objects.push(a), this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a);
        b !== -1 && this.__objectsRemoved.splice(b, 1);
      }
      for (var c = 0; c < a.children.length; c++)
        this.__addObject(a.children[c]);
    }),
    (THREE.Scene.prototype.__removeObject = function (a) {
      if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a);
        b !== -1 && this.__lights.splice(b, 1);
      } else if (!(a instanceof THREE.Camera)) {
        var b = this.__objects.indexOf(a);
        if (b !== -1) {
          this.__objects.splice(b, 1), this.__objectsRemoved.push(a);
          var c = this.__objectsAdded.indexOf(a);
          c !== -1 && this.__objectsAdded.splice(c, 1);
        }
      }
      for (var d = 0; d < a.children.length; d++)
        this.__removeObject(a.children[d]);
    }),
    (THREE.Scene.prototype.clone = function (a) {
      return (
        void 0 === a && (a = new THREE.Scene()),
        THREE.Object3D.prototype.clone.call(this, a),
        null !== this.fog && (a.fog = this.fog.clone()),
        null !== this.overrideMaterial &&
          (a.overrideMaterial = this.overrideMaterial.clone()),
        (a.autoUpdate = this.autoUpdate),
        (a.matrixAutoUpdate = this.matrixAutoUpdate),
        a
      );
    }),
    (THREE.Fog = function (a, b, c) {
      (this.name = ""),
        (this.color = new THREE.Color(a)),
        (this.near = void 0 !== b ? b : 1),
        (this.far = void 0 !== c ? c : 1e3);
    }),
    (THREE.Fog.prototype.clone = function () {
      return new THREE.Fog(this.color.getHex(), this.near, this.far);
    }),
    (THREE.FogExp2 = function (a, b) {
      (this.name = ""),
        (this.color = new THREE.Color(a)),
        (this.density = void 0 !== b ? b : 25e-5);
    }),
    (THREE.FogExp2.prototype.clone = function () {
      return new THREE.FogExp2(this.color.getHex(), this.density);
    }),
    (THREE.CanvasRenderer = function (a) {
      function b() {
        Oa.setRGB(0, 0, 0), Pa.setRGB(0, 0, 0), Qa.setRGB(0, 0, 0);
        for (var a = 0, b = A.length; a < b; a++) {
          var c = A[a],
            d = c.color;
          c instanceof THREE.AmbientLight
            ? Oa.add(d)
            : c instanceof THREE.DirectionalLight
            ? Pa.add(d)
            : c instanceof THREE.PointLight && Qa.add(d);
        }
      }
      function c(a, b, c) {
        for (var d = 0, e = A.length; d < e; d++) {
          var f = A[d];
          if ((Ia.copy(f.color), f instanceof THREE.DirectionalLight)) {
            var g = Ra.getPositionFromMatrix(f.matrixWorld).normalize(),
              h = b.dot(g);
            if (h <= 0) continue;
            (h *= f.intensity), c.add(Ia.multiplyScalar(h));
          } else if (f instanceof THREE.PointLight) {
            var g = Ra.getPositionFromMatrix(f.matrixWorld),
              h = b.dot(Ra.subVectors(g, a).normalize());
            if (h <= 0) continue;
            if (
              ((h *=
                0 == f.distance
                  ? 1
                  : 1 - Math.min(a.distanceTo(g) / f.distance, 1)),
              0 == h)
            )
              continue;
            (h *= f.intensity), c.add(Ia.multiplyScalar(h));
          }
        }
      }
      function d(a, b, c) {
        p(c.opacity), q(c.blending);
        var d, e, f, g, h, i, j;
        if (c instanceof THREE.ParticleBasicMaterial)
          if (null === c.map) {
            if (
              ((f = b.object.scale.x),
              (g = b.object.scale.y),
              (f *= b.scale.x * D),
              (g *= b.scale.y * E),
              Na.min.set(a.x - f, a.y - g),
              Na.max.set(a.x + f, a.y + g),
              La.isIntersectionBox(Na) === !1)
            )
              return void Na.makeEmpty();
            v(c.color.getStyle()),
              na.save(),
              na.translate(a.x, a.y),
              na.rotate(-b.rotation),
              na.scale(f, g),
              na.fillRect(-1, -1, 2, 2),
              na.restore();
          } else {
            if (
              ((h = c.map.image),
              (i = h.width >> 1),
              (j = h.height >> 1),
              (f = b.scale.x * D),
              (g = b.scale.y * E),
              (d = f * i),
              (e = g * j),
              Na.min.set(a.x - d, a.y - e),
              Na.max.set(a.x + d, a.y + e),
              La.isIntersectionBox(Na) === !1)
            )
              return void Na.makeEmpty();
            na.save(),
              na.translate(a.x, a.y),
              na.rotate(-b.rotation),
              na.scale(f, -g),
              na.translate(-i, -j),
              na.drawImage(h, 0, 0),
              na.restore();
          }
        else if (c instanceof THREE.ParticleCanvasMaterial) {
          if (
            ((d = b.scale.x * D),
            (e = b.scale.y * E),
            Na.min.set(a.x - d, a.y - e),
            Na.max.set(a.x + d, a.y + e),
            La.isIntersectionBox(Na) === !1)
          )
            return void Na.makeEmpty();
          u(c.color.getStyle()),
            v(c.color.getStyle()),
            na.save(),
            na.translate(a.x, a.y),
            na.rotate(-b.rotation),
            na.scale(d, e),
            c.program(na),
            na.restore();
        }
      }
      function e(a, b, c, d) {
        if (
          (p(d.opacity),
          q(d.blending),
          na.beginPath(),
          na.moveTo(a.positionScreen.x, a.positionScreen.y),
          na.lineTo(b.positionScreen.x, b.positionScreen.y),
          d instanceof THREE.LineBasicMaterial)
        ) {
          if (
            (r(d.linewidth),
            s(d.linecap),
            t(d.linejoin),
            d.vertexColors !== THREE.VertexColors)
          )
            u(d.color.getStyle());
          else {
            var e = c.vertexColors[0].getStyle(),
              f = c.vertexColors[1].getStyle();
            if (e === f) u(e);
            else {
              try {
                var g = na.createLinearGradient(
                  a.positionScreen.x,
                  a.positionScreen.y,
                  b.positionScreen.x,
                  b.positionScreen.y
                );
                g.addColorStop(0, e), g.addColorStop(1, f);
              } catch (h) {
                g = e;
              }
              u(g);
            }
          }
          na.stroke(), Na.expandByScalar(2 * d.linewidth);
        } else
          d instanceof THREE.LineDashedMaterial &&
            (r(d.linewidth),
            s(d.linecap),
            t(d.linejoin),
            u(d.color.getStyle()),
            w(d.dashSize, d.gapSize),
            na.stroke(),
            Na.expandByScalar(2 * d.linewidth),
            w(null, null));
      }
      function f(a, b, d, e, f, g, i, o) {
        if (
          ((ka.info.render.vertices += 3),
          ka.info.render.faces++,
          p(o.opacity),
          q(o.blending),
          (K = a.positionScreen.x),
          (L = a.positionScreen.y),
          (M = b.positionScreen.x),
          (N = b.positionScreen.y),
          (O = d.positionScreen.x),
          (P = d.positionScreen.y),
          h(K, L, M, N, O, P),
          (o instanceof THREE.MeshLambertMaterial ||
            o instanceof THREE.MeshPhongMaterial) &&
            null === o.map)
        )
          Ga.copy(o.color),
            Ha.copy(o.emissive),
            o.vertexColors === THREE.FaceColors && Ga.multiply(i.color),
            o.wireframe === !1 &&
            o.shading == THREE.SmoothShading &&
            3 == i.vertexNormalsLength
              ? (Ca.copy(Oa),
                Da.copy(Oa),
                Ea.copy(Oa),
                c(i.v1.positionWorld, i.vertexNormalsModel[0], Ca),
                c(i.v2.positionWorld, i.vertexNormalsModel[1], Da),
                c(i.v3.positionWorld, i.vertexNormalsModel[2], Ea),
                Ca.multiply(Ga).add(Ha),
                Da.multiply(Ga).add(Ha),
                Ea.multiply(Ga).add(Ha),
                Fa.addColors(Da, Ea).multiplyScalar(0.5),
                (Y = n(Ca, Da, Ea, Fa)),
                m(K, L, M, N, O, P, 0, 0, 1, 0, 0, 1, Y))
              : (Ba.copy(Oa),
                c(i.centroidModel, i.normalModel, Ba),
                Ba.multiply(Ga).add(Ha),
                o.wireframe === !0
                  ? j(
                      Ba,
                      o.wireframeLinewidth,
                      o.wireframeLinecap,
                      o.wireframeLinejoin
                    )
                  : k(Ba));
        else if (
          o instanceof THREE.MeshBasicMaterial ||
          o instanceof THREE.MeshLambertMaterial ||
          o instanceof THREE.MeshPhongMaterial
        )
          null !== o.map
            ? o.map.mapping instanceof THREE.UVMapping &&
              ((Z = i.uvs[0]),
              l(
                K,
                L,
                M,
                N,
                O,
                P,
                Z[e].x,
                Z[e].y,
                Z[f].x,
                Z[f].y,
                Z[g].x,
                Z[g].y,
                o.map
              ))
            : null !== o.envMap
            ? o.envMap.mapping instanceof THREE.SphericalReflectionMapping &&
              (Ra.copy(i.vertexNormalsModelView[e]),
              ($ = 0.5 * Ra.x + 0.5),
              (_ = 0.5 * Ra.y + 0.5),
              Ra.copy(i.vertexNormalsModelView[f]),
              (aa = 0.5 * Ra.x + 0.5),
              (ba = 0.5 * Ra.y + 0.5),
              Ra.copy(i.vertexNormalsModelView[g]),
              (ca = 0.5 * Ra.x + 0.5),
              (da = 0.5 * Ra.y + 0.5),
              l(K, L, M, N, O, P, $, _, aa, ba, ca, da, o.envMap))
            : (Ba.copy(o.color),
              o.vertexColors === THREE.FaceColors && Ba.multiply(i.color),
              o.wireframe === !0
                ? j(
                    Ba,
                    o.wireframeLinewidth,
                    o.wireframeLinecap,
                    o.wireframeLinejoin
                  )
                : k(Ba));
        else if (o instanceof THREE.MeshDepthMaterial)
          (W = F.near),
            (X = F.far),
            (Ca.r =
              Ca.g =
              Ca.b =
                1 - x(a.positionScreen.z * a.positionScreen.w, W, X)),
            (Da.r =
              Da.g =
              Da.b =
                1 - x(b.positionScreen.z * b.positionScreen.w, W, X)),
            (Ea.r =
              Ea.g =
              Ea.b =
                1 - x(d.positionScreen.z * d.positionScreen.w, W, X)),
            Fa.addColors(Da, Ea).multiplyScalar(0.5),
            (Y = n(Ca, Da, Ea, Fa)),
            m(K, L, M, N, O, P, 0, 0, 1, 0, 0, 1, Y);
        else if (o instanceof THREE.MeshNormalMaterial) {
          var r;
          o.shading == THREE.FlatShading
            ? ((r = i.normalModelView),
              Ba.setRGB(r.x, r.y, r.z).multiplyScalar(0.5).addScalar(0.5),
              o.wireframe === !0
                ? j(
                    Ba,
                    o.wireframeLinewidth,
                    o.wireframeLinecap,
                    o.wireframeLinejoin
                  )
                : k(Ba))
            : o.shading == THREE.SmoothShading &&
              ((r = i.vertexNormalsModelView[e]),
              Ca.setRGB(r.x, r.y, r.z).multiplyScalar(0.5).addScalar(0.5),
              (r = i.vertexNormalsModelView[f]),
              Da.setRGB(r.x, r.y, r.z).multiplyScalar(0.5).addScalar(0.5),
              (r = i.vertexNormalsModelView[g]),
              Ea.setRGB(r.x, r.y, r.z).multiplyScalar(0.5).addScalar(0.5),
              Fa.addColors(Da, Ea).multiplyScalar(0.5),
              (Y = n(Ca, Da, Ea, Fa)),
              m(K, L, M, N, O, P, 0, 0, 1, 0, 0, 1, Y));
        }
      }
      function g(a, b, d, e, g, l, o, r) {
        if (
          ((ka.info.render.vertices += 4),
          ka.info.render.faces++,
          p(r.opacity),
          q(r.blending),
          (void 0 !== r.map && null !== r.map) ||
            (void 0 !== r.envMap && null !== r.envMap))
        )
          return f(a, b, e, 0, 1, 3, o, r), void f(g, d, l, 1, 2, 3, o, r);
        if (
          ((K = a.positionScreen.x),
          (L = a.positionScreen.y),
          (M = b.positionScreen.x),
          (N = b.positionScreen.y),
          (O = d.positionScreen.x),
          (P = d.positionScreen.y),
          (Q = e.positionScreen.x),
          (R = e.positionScreen.y),
          (S = g.positionScreen.x),
          (T = g.positionScreen.y),
          (U = l.positionScreen.x),
          (V = l.positionScreen.y),
          r instanceof THREE.MeshLambertMaterial ||
            r instanceof THREE.MeshPhongMaterial)
        )
          Ga.copy(r.color),
            Ha.copy(r.emissive),
            r.vertexColors === THREE.FaceColors && Ga.multiply(o.color),
            r.wireframe === !1 &&
            r.shading == THREE.SmoothShading &&
            4 == o.vertexNormalsLength
              ? (Ca.copy(Oa),
                Da.copy(Oa),
                Ea.copy(Oa),
                Fa.copy(Oa),
                c(o.v1.positionWorld, o.vertexNormalsModel[0], Ca),
                c(o.v2.positionWorld, o.vertexNormalsModel[1], Da),
                c(o.v4.positionWorld, o.vertexNormalsModel[3], Ea),
                c(o.v3.positionWorld, o.vertexNormalsModel[2], Fa),
                Ca.multiply(Ga).add(Ha),
                Da.multiply(Ga).add(Ha),
                Ea.multiply(Ga).add(Ha),
                Fa.multiply(Ga).add(Ha),
                (Y = n(Ca, Da, Ea, Fa)),
                h(K, L, M, N, Q, R),
                m(K, L, M, N, Q, R, 0, 0, 1, 0, 0, 1, Y),
                h(S, T, O, P, U, V),
                m(S, T, O, P, U, V, 1, 0, 1, 1, 0, 1, Y))
              : (Ba.copy(Oa),
                c(o.centroidModel, o.normalModel, Ba),
                Ba.multiply(Ga).add(Ha),
                i(K, L, M, N, O, P, Q, R),
                r.wireframe === !0
                  ? j(
                      Ba,
                      r.wireframeLinewidth,
                      r.wireframeLinecap,
                      r.wireframeLinejoin
                    )
                  : k(Ba));
        else if (r instanceof THREE.MeshBasicMaterial)
          Ba.copy(r.color),
            r.vertexColors === THREE.FaceColors && Ba.multiply(o.color),
            i(K, L, M, N, O, P, Q, R),
            r.wireframe === !0
              ? j(
                  Ba,
                  r.wireframeLinewidth,
                  r.wireframeLinecap,
                  r.wireframeLinejoin
                )
              : k(Ba);
        else if (r instanceof THREE.MeshNormalMaterial) {
          var s;
          r.shading == THREE.FlatShading
            ? ((s = o.normalModelView),
              Ba.setRGB(s.x, s.y, s.z).multiplyScalar(0.5).addScalar(0.5),
              i(K, L, M, N, O, P, Q, R),
              r.wireframe === !0
                ? j(
                    Ba,
                    r.wireframeLinewidth,
                    r.wireframeLinecap,
                    r.wireframeLinejoin
                  )
                : k(Ba))
            : r.shading == THREE.SmoothShading &&
              ((s = o.vertexNormalsModelView[0]),
              Ca.setRGB(s.x, s.y, s.z).multiplyScalar(0.5).addScalar(0.5),
              (s = o.vertexNormalsModelView[1]),
              Da.setRGB(s.x, s.y, s.z).multiplyScalar(0.5).addScalar(0.5),
              (s = o.vertexNormalsModelView[3]),
              Ea.setRGB(s.x, s.y, s.z).multiplyScalar(0.5).addScalar(0.5),
              (s = o.vertexNormalsModelView[2]),
              Fa.setRGB(s.x, s.y, s.z).multiplyScalar(0.5).addScalar(0.5),
              (Y = n(Ca, Da, Ea, Fa)),
              h(K, L, M, N, Q, R),
              m(K, L, M, N, Q, R, 0, 0, 1, 0, 0, 1, Y),
              h(S, T, O, P, U, V),
              m(S, T, O, P, U, V, 1, 0, 1, 1, 0, 1, Y));
        } else
          r instanceof THREE.MeshDepthMaterial &&
            ((W = F.near),
            (X = F.far),
            (Ca.r =
              Ca.g =
              Ca.b =
                1 - x(a.positionScreen.z * a.positionScreen.w, W, X)),
            (Da.r =
              Da.g =
              Da.b =
                1 - x(b.positionScreen.z * b.positionScreen.w, W, X)),
            (Ea.r =
              Ea.g =
              Ea.b =
                1 - x(e.positionScreen.z * e.positionScreen.w, W, X)),
            (Fa.r =
              Fa.g =
              Fa.b =
                1 - x(d.positionScreen.z * d.positionScreen.w, W, X)),
            (Y = n(Ca, Da, Ea, Fa)),
            h(K, L, M, N, Q, R),
            m(K, L, M, N, Q, R, 0, 0, 1, 0, 0, 1, Y),
            h(S, T, O, P, U, V),
            m(S, T, O, P, U, V, 1, 0, 1, 1, 0, 1, Y));
      }
      function h(a, b, c, d, e, f) {
        na.beginPath(),
          na.moveTo(a, b),
          na.lineTo(c, d),
          na.lineTo(e, f),
          na.closePath();
      }
      function i(a, b, c, d, e, f, g, h) {
        na.beginPath(),
          na.moveTo(a, b),
          na.lineTo(c, d),
          na.lineTo(e, f),
          na.lineTo(g, h),
          na.closePath();
      }
      function j(a, b, c, d) {
        r(b),
          s(c),
          t(d),
          u(a.getStyle()),
          na.stroke(),
          Na.expandByScalar(2 * b);
      }
      function k(a) {
        v(a.getStyle()), na.fill();
      }
      function l(a, b, c, d, e, f, g, h, i, j, l, m, n) {
        if (
          !(
            n instanceof THREE.DataTexture ||
            void 0 === n.image ||
            0 == n.image.width
          )
        ) {
          if (n.needsUpdate === !0) {
            var o = n.wrapS == THREE.RepeatWrapping,
              p = n.wrapT == THREE.RepeatWrapping;
            (Ja[n.id] = na.createPattern(
              n.image,
              o === !0 && p === !0
                ? "repeat"
                : o === !0 && p === !1
                ? "repeat-x"
                : o === !1 && p === !0
                ? "repeat-y"
                : "no-repeat"
            )),
              (n.needsUpdate = !1);
          }
          v(void 0 === Ja[n.id] ? "rgba(0,0,0,1)" : Ja[n.id]);
          var q,
            r,
            s,
            t,
            u,
            w,
            x,
            y,
            z = n.offset.x / n.repeat.x,
            A = n.offset.y / n.repeat.y,
            B = n.image.width * n.repeat.x,
            C = n.image.height * n.repeat.y;
          if (
            ((g = (g + z) * B),
            (h = (1 - h + A) * C),
            (i = (i + z) * B),
            (j = (1 - j + A) * C),
            (l = (l + z) * B),
            (m = (1 - m + A) * C),
            (c -= a),
            (d -= b),
            (e -= a),
            (f -= b),
            (i -= g),
            (j -= h),
            (l -= g),
            (m -= h),
            (x = i * m - l * j),
            0 === x)
          ) {
            if (void 0 === Ka[n.id]) {
              var D = document.createElement("canvas");
              (D.width = n.image.width), (D.height = n.image.height);
              var E = D.getContext("2d");
              E.drawImage(n.image, 0, 0),
                (Ka[n.id] = E.getImageData(
                  0,
                  0,
                  n.image.width,
                  n.image.height
                ).data);
            }
            var F = Ka[n.id],
              G = 4 * (Math.floor(g) + Math.floor(h) * n.image.width);
            return (
              Ba.setRGB(F[G] / 255, F[G + 1] / 255, F[G + 2] / 255), void k(Ba)
            );
          }
          (y = 1 / x),
            (q = (m * c - j * e) * y),
            (r = (m * d - j * f) * y),
            (s = (i * e - l * c) * y),
            (t = (i * f - l * d) * y),
            (u = a - q * g - s * h),
            (w = b - r * g - t * h),
            na.save(),
            na.transform(q, r, s, t, u, w),
            na.fill(),
            na.restore();
        }
      }
      function m(a, b, c, d, e, f, g, h, i, j, k, l, m) {
        var n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v = m.width - 1,
          w = m.height - 1;
        (g *= v),
          (h *= w),
          (i *= v),
          (j *= w),
          (k *= v),
          (l *= w),
          (c -= a),
          (d -= b),
          (e -= a),
          (f -= b),
          (i -= g),
          (j -= h),
          (k -= g),
          (l -= h),
          (t = i * l - k * j),
          (u = 1 / t),
          (n = (l * c - j * e) * u),
          (o = (l * d - j * f) * u),
          (p = (i * e - k * c) * u),
          (q = (i * f - k * d) * u),
          (r = a - n * g - p * h),
          (s = b - o * g - q * h),
          na.save(),
          na.transform(n, o, p, q, r, s),
          na.clip(),
          na.drawImage(m, 0, 0),
          na.restore();
      }
      function n(a, b, c, d) {
        return (
          (ha[0] = (255 * a.r) | 0),
          (ha[1] = (255 * a.g) | 0),
          (ha[2] = (255 * a.b) | 0),
          (ha[4] = (255 * b.r) | 0),
          (ha[5] = (255 * b.g) | 0),
          (ha[6] = (255 * b.b) | 0),
          (ha[8] = (255 * c.r) | 0),
          (ha[9] = (255 * c.g) | 0),
          (ha[10] = (255 * c.b) | 0),
          (ha[12] = (255 * d.r) | 0),
          (ha[13] = (255 * d.g) | 0),
          (ha[14] = (255 * d.b) | 0),
          fa.putImageData(ga, 0, 0),
          ja.drawImage(ea, 0, 0),
          ia
        );
      }
      function o(a, b, c) {
        var d,
          e = b.x - a.x,
          f = b.y - a.y,
          g = e * e + f * f;
        0 !== g &&
          ((d = c / Math.sqrt(g)),
          (e *= d),
          (f *= d),
          (b.x += e),
          (b.y += f),
          (a.x -= e),
          (a.y -= f));
      }
      function p(a) {
        qa !== a && ((na.globalAlpha = a), (qa = a));
      }
      function q(a) {
        ra !== a &&
          (a === THREE.NormalBlending
            ? (na.globalCompositeOperation = "source-over")
            : a === THREE.AdditiveBlending
            ? (na.globalCompositeOperation = "lighter")
            : a === THREE.SubtractiveBlending &&
              (na.globalCompositeOperation = "darker"),
          (ra = a));
      }
      function r(a) {
        ua !== a && ((na.lineWidth = a), (ua = a));
      }
      function s(a) {
        va !== a && ((na.lineCap = a), (va = a));
      }
      function t(a) {
        wa !== a && ((na.lineJoin = a), (wa = a));
      }
      function u(a) {
        sa !== a && ((na.strokeStyle = a), (sa = a));
      }
      function v(a) {
        ta !== a && ((na.fillStyle = a), (ta = a));
      }
      function w(a, b) {
        (xa === a && ya === b) || (na.setLineDash([a, b]), (xa = a), (ya = b));
      }
      console.log("THREE.CanvasRenderer", THREE.REVISION);
      var x = THREE.Math.smoothstep;
      a = a || {};
      var y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z,
        $,
        _,
        aa,
        ba,
        ca,
        da,
        ea,
        fa,
        ga,
        ha,
        ia,
        ja,
        ka = this,
        la = new THREE.Projector(),
        ma = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
        na = ma.getContext("2d"),
        oa = new THREE.Color(0),
        pa = 0,
        qa = 1,
        ra = 0,
        sa = null,
        ta = null,
        ua = null,
        va = null,
        wa = null,
        xa = null,
        ya = 0,
        za = new THREE.RenderableVertex(),
        Aa = new THREE.RenderableVertex(),
        Ba = new THREE.Color(),
        Ca = new THREE.Color(),
        Da = new THREE.Color(),
        Ea = new THREE.Color(),
        Fa = new THREE.Color(),
        Ga = new THREE.Color(),
        Ha = new THREE.Color(),
        Ia = new THREE.Color(),
        Ja = {},
        Ka = {},
        La = new THREE.Box2(),
        Ma = new THREE.Box2(),
        Na = new THREE.Box2(),
        Oa = new THREE.Color(),
        Pa = new THREE.Color(),
        Qa = new THREE.Color(),
        Ra = new THREE.Vector3(),
        Sa = 16;
      (ea = document.createElement("canvas")),
        (ea.width = ea.height = 2),
        (fa = ea.getContext("2d")),
        (fa.fillStyle = "rgba(0,0,0,1)"),
        fa.fillRect(0, 0, 2, 2),
        (ga = fa.getImageData(0, 0, 2, 2)),
        (ha = ga.data),
        (ia = document.createElement("canvas")),
        (ia.width = ia.height = Sa),
        (ja = ia.getContext("2d")),
        ja.translate(-Sa / 2, -Sa / 2),
        ja.scale(Sa, Sa),
        Sa--,
        void 0 === na.setLineDash &&
          (void 0 !== na.mozDash
            ? (na.setLineDash = function (a) {
                na.mozDash = null !== a[0] ? a : null;
              })
            : (na.setLineDash = function () {})),
        (this.domElement = ma),
        (this.devicePixelRatio =
          void 0 !== a.devicePixelRatio
            ? a.devicePixelRatio
            : void 0 !== window.devicePixelRatio
            ? window.devicePixelRatio
            : 1),
        (this.autoClear = !0),
        (this.sortObjects = !0),
        (this.sortElements = !0),
        (this.info = { render: { vertices: 0, faces: 0 } }),
        (this.supportsVertexTextures = function () {}),
        (this.setFaceCulling = function () {}),
        (this.setSize = function (a, b, c) {
          (B = a * this.devicePixelRatio),
            (C = b * this.devicePixelRatio),
            (D = Math.floor(B / 2)),
            (E = Math.floor(C / 2)),
            (ma.width = B),
            (ma.height = C),
            1 !== this.devicePixelRatio &&
              c !== !1 &&
              ((ma.style.width = a + "px"), (ma.style.height = b + "px")),
            La.set(new THREE.Vector2(-D, -E), new THREE.Vector2(D, E)),
            Ma.set(new THREE.Vector2(-D, -E), new THREE.Vector2(D, E)),
            (qa = 1),
            (ra = 0),
            (sa = null),
            (ta = null),
            (ua = null),
            (va = null),
            (wa = null);
        }),
        (this.setClearColor = function (a, b) {
          oa.set(a),
            (pa = void 0 !== b ? b : 1),
            Ma.set(new THREE.Vector2(-D, -E), new THREE.Vector2(D, E));
        }),
        (this.setClearColorHex = function (a, b) {
          console.warn(
            "DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."
          ),
            this.setClearColor(a, b);
        }),
        (this.getMaxAnisotropy = function () {
          return 0;
        }),
        (this.clear = function () {
          na.setTransform(1, 0, 0, -1, D, E),
            Ma.empty() === !1 &&
              (Ma.intersect(La),
              Ma.expandByScalar(2),
              pa < 1 &&
                na.clearRect(
                  0 | Ma.min.x,
                  0 | Ma.min.y,
                  (Ma.max.x - Ma.min.x) | 0,
                  (Ma.max.y - Ma.min.y) | 0
                ),
              pa > 0 &&
                (q(THREE.NormalBlending),
                p(1),
                v(
                  "rgba(" +
                    Math.floor(255 * oa.r) +
                    "," +
                    Math.floor(255 * oa.g) +
                    "," +
                    Math.floor(255 * oa.b) +
                    "," +
                    pa +
                    ")"
                ),
                na.fillRect(
                  0 | Ma.min.x,
                  0 | Ma.min.y,
                  (Ma.max.x - Ma.min.x) | 0,
                  (Ma.max.y - Ma.min.y) | 0
                )),
              Ma.makeEmpty());
        }),
        (this.render = function (a, c) {
          if (c instanceof THREE.Camera == !1)
            return void console.error(
              "THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera."
            );
          this.autoClear === !0 && this.clear(),
            na.setTransform(1, 0, 0, -1, D, E),
            (ka.info.render.vertices = 0),
            (ka.info.render.faces = 0),
            (y = la.projectScene(a, c, this.sortObjects, this.sortElements)),
            (z = y.elements),
            (A = y.lights),
            (F = c),
            b();
          for (var h = 0, i = z.length; h < i; h++) {
            var j = z[h],
              k = j.material;
            if (void 0 !== k && k.visible !== !1) {
              if ((Na.makeEmpty(), j instanceof THREE.RenderableParticle))
                (G = j), (G.x *= D), (G.y *= E), d(G, j, k);
              else if (j instanceof THREE.RenderableLine)
                (G = j.v1),
                  (H = j.v2),
                  (G.positionScreen.x *= D),
                  (G.positionScreen.y *= E),
                  (H.positionScreen.x *= D),
                  (H.positionScreen.y *= E),
                  Na.setFromPoints([G.positionScreen, H.positionScreen]),
                  La.isIntersectionBox(Na) === !0 && e(G, H, j, k);
              else if (j instanceof THREE.RenderableFace3) {
                if (
                  ((G = j.v1),
                  (H = j.v2),
                  (I = j.v3),
                  G.positionScreen.z < -1 || G.positionScreen.z > 1)
                )
                  continue;
                if (H.positionScreen.z < -1 || H.positionScreen.z > 1) continue;
                if (I.positionScreen.z < -1 || I.positionScreen.z > 1) continue;
                (G.positionScreen.x *= D),
                  (G.positionScreen.y *= E),
                  (H.positionScreen.x *= D),
                  (H.positionScreen.y *= E),
                  (I.positionScreen.x *= D),
                  (I.positionScreen.y *= E),
                  k.overdraw > 0 &&
                    (o(G.positionScreen, H.positionScreen, k.overdraw),
                    o(H.positionScreen, I.positionScreen, k.overdraw),
                    o(I.positionScreen, G.positionScreen, k.overdraw)),
                  Na.setFromPoints([
                    G.positionScreen,
                    H.positionScreen,
                    I.positionScreen,
                  ]),
                  La.isIntersectionBox(Na) === !0 && f(G, H, I, 0, 1, 2, j, k);
              } else if (j instanceof THREE.RenderableFace4) {
                if (
                  ((G = j.v1),
                  (H = j.v2),
                  (I = j.v3),
                  (J = j.v4),
                  G.positionScreen.z < -1 || G.positionScreen.z > 1)
                )
                  continue;
                if (H.positionScreen.z < -1 || H.positionScreen.z > 1) continue;
                if (I.positionScreen.z < -1 || I.positionScreen.z > 1) continue;
                if (J.positionScreen.z < -1 || J.positionScreen.z > 1) continue;
                (G.positionScreen.x *= D),
                  (G.positionScreen.y *= E),
                  (H.positionScreen.x *= D),
                  (H.positionScreen.y *= E),
                  (I.positionScreen.x *= D),
                  (I.positionScreen.y *= E),
                  (J.positionScreen.x *= D),
                  (J.positionScreen.y *= E),
                  za.positionScreen.copy(H.positionScreen),
                  Aa.positionScreen.copy(J.positionScreen),
                  k.overdraw > 0 &&
                    (o(G.positionScreen, H.positionScreen, k.overdraw),
                    o(H.positionScreen, J.positionScreen, k.overdraw),
                    o(J.positionScreen, G.positionScreen, k.overdraw),
                    o(I.positionScreen, za.positionScreen, k.overdraw),
                    o(I.positionScreen, Aa.positionScreen, k.overdraw)),
                  Na.setFromPoints([
                    G.positionScreen,
                    H.positionScreen,
                    I.positionScreen,
                    J.positionScreen,
                  ]),
                  La.isIntersectionBox(Na) === !0 &&
                    g(G, H, I, J, za, Aa, j, k);
              }
              Ma.union(Na);
            }
          }
          na.setTransform(1, 0, 0, 1, 0, 0);
        });
    }),
    (THREE.UniformsUtils = {
      merge: function (a) {
        var b,
          c,
          d,
          e = {};
        for (b = 0; b < a.length; b++) {
          d = this.clone(a[b]);
          for (c in d) e[c] = d[c];
        }
        return e;
      },
      clone: function (a) {
        var b,
          c,
          d,
          e = {};
        for (b in a) {
          e[b] = {};
          for (c in a[b])
            (d = a[b][c]),
              d instanceof THREE.Color ||
              d instanceof THREE.Vector2 ||
              d instanceof THREE.Vector3 ||
              d instanceof THREE.Vector4 ||
              d instanceof THREE.Matrix4 ||
              d instanceof THREE.Texture
                ? (e[b][c] = d.clone())
                : d instanceof Array
                ? (e[b][c] = d.slice())
                : (e[b][c] = d);
        }
        return e;
      },
    }),
    (THREE.UniformsLib = {
      common: {
        diffuse: { type: "c", value: new THREE.Color(15658734) },
        opacity: { type: "f", value: 1 },
        map: { type: "t", value: null },
        offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
        lightMap: { type: "t", value: null },
        specularMap: { type: "t", value: null },
        envMap: { type: "t", value: null },
        flipEnvMap: { type: "f", value: -1 },
        useRefract: { type: "i", value: 0 },
        reflectivity: { type: "f", value: 1 },
        refractionRatio: { type: "f", value: 0.98 },
        combine: { type: "i", value: 0 },
        morphTargetInfluences: { type: "f", value: 0 },
      },
      bump: {
        bumpMap: { type: "t", value: null },
        bumpScale: { type: "f", value: 1 },
      },
      normalmap: {
        normalMap: { type: "t", value: null },
        normalScale: { type: "v2", value: new THREE.Vector2(1, 1) },
      },
      fog: {
        fogDensity: { type: "f", value: 25e-5 },
        fogNear: { type: "f", value: 1 },
        fogFar: { type: "f", value: 2e3 },
        fogColor: { type: "c", value: new THREE.Color(16777215) },
      },
      lights: {
        ambientLightColor: { type: "fv", value: [] },
        directionalLightDirection: { type: "fv", value: [] },
        directionalLightColor: { type: "fv", value: [] },
        hemisphereLightDirection: { type: "fv", value: [] },
        hemisphereLightSkyColor: { type: "fv", value: [] },
        hemisphereLightGroundColor: { type: "fv", value: [] },
        pointLightColor: { type: "fv", value: [] },
        pointLightPosition: { type: "fv", value: [] },
        pointLightDistance: { type: "fv1", value: [] },
        spotLightColor: { type: "fv", value: [] },
        spotLightPosition: { type: "fv", value: [] },
        spotLightDirection: { type: "fv", value: [] },
        spotLightDistance: { type: "fv1", value: [] },
        spotLightAngleCos: { type: "fv1", value: [] },
        spotLightExponent: { type: "fv1", value: [] },
      },
      particle: {
        psColor: { type: "c", value: new THREE.Color(15658734) },
        opacity: { type: "f", value: 1 },
        size: { type: "f", value: 1 },
        scale: { type: "f", value: 1 },
        map: { type: "t", value: null },
        fogDensity: { type: "f", value: 25e-5 },
        fogNear: { type: "f", value: 1 },
        fogFar: { type: "f", value: 2e3 },
        fogColor: { type: "c", value: new THREE.Color(16777215) },
      },
      shadowmap: {
        shadowMap: { type: "tv", value: [] },
        shadowMapSize: { type: "v2v", value: [] },
        shadowBias: { type: "fv1", value: [] },
        shadowDarkness: { type: "fv1", value: [] },
        shadowMatrix: { type: "m4v", value: [] },
      },
    }),
    (THREE.RenderableVertex = function () {
      (this.positionWorld = new THREE.Vector3()),
        (this.positionScreen = new THREE.Vector4()),
        (this.visible = !0);
    }),
    (THREE.RenderableVertex.prototype.copy = function (a) {
      this.positionWorld.copy(a.positionWorld),
        this.positionScreen.copy(a.positionScreen);
    }),
    (THREE.RenderableFace3 = function () {
      (this.id = 0),
        (this.v1 = new THREE.RenderableVertex()),
        (this.v2 = new THREE.RenderableVertex()),
        (this.v3 = new THREE.RenderableVertex()),
        (this.centroidModel = new THREE.Vector3()),
        (this.normalModel = new THREE.Vector3()),
        (this.normalModelView = new THREE.Vector3()),
        (this.vertexNormalsLength = 0),
        (this.vertexNormalsModel = [
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]),
        (this.vertexNormalsModelView = [
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]),
        (this.color = null),
        (this.material = null),
        (this.uvs = [[]]),
        (this.z = 0);
    }),
    (THREE.RenderableFace4 = function () {
      (this.id = 0),
        (this.v1 = new THREE.RenderableVertex()),
        (this.v2 = new THREE.RenderableVertex()),
        (this.v3 = new THREE.RenderableVertex()),
        (this.v4 = new THREE.RenderableVertex()),
        (this.centroidModel = new THREE.Vector3()),
        (this.normalModel = new THREE.Vector3()),
        (this.normalModelView = new THREE.Vector3()),
        (this.vertexNormalsLength = 0),
        (this.vertexNormalsModel = [
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]),
        (this.vertexNormalsModelView = [
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]),
        (this.color = null),
        (this.material = null),
        (this.uvs = [[]]),
        (this.z = 0);
    }),
    (THREE.RenderableObject = function () {
      (this.id = 0), (this.object = null), (this.z = 0);
    }),
    (THREE.RenderableParticle = function () {
      (this.id = 0),
        (this.object = null),
        (this.x = 0),
        (this.y = 0),
        (this.z = 0),
        (this.rotation = null),
        (this.scale = new THREE.Vector2()),
        (this.material = null);
    }),
    (THREE.RenderableLine = function () {
      (this.id = 0),
        (this.v1 = new THREE.RenderableVertex()),
        (this.v2 = new THREE.RenderableVertex()),
        (this.vertexColors = [new THREE.Color(), new THREE.Color()]),
        (this.material = null),
        (this.z = 0);
    }),
    (THREE.GeometryUtils = {
      merge: function (a, b, c) {
        var d,
          e,
          f = a.vertices.length,
          g =
            (a.faceVertexUvs[0].length,
            b instanceof THREE.Mesh ? b.geometry : b),
          h = a.vertices,
          i = g.vertices,
          j = a.faces,
          k = g.faces,
          l = a.faceVertexUvs[0],
          m = g.faceVertexUvs[0];
        void 0 === c && (c = 0),
          b instanceof THREE.Mesh &&
            (b.matrixAutoUpdate && b.updateMatrix(),
            (d = b.matrix),
            (e = new THREE.Matrix3().getNormalMatrix(d)));
        for (var n = 0, o = i.length; n < o; n++) {
          var p = i[n],
            q = p.clone();
          d && q.applyMatrix4(d), h.push(q);
        }
        for (n = 0, o = k.length; n < o; n++) {
          var r,
            s,
            t,
            u = k[n],
            v = u.vertexNormals,
            w = u.vertexColors;
          u instanceof THREE.Face3
            ? (r = new THREE.Face3(u.a + f, u.b + f, u.c + f))
            : u instanceof THREE.Face4 &&
              (r = new THREE.Face4(u.a + f, u.b + f, u.c + f, u.d + f)),
            r.normal.copy(u.normal),
            e && r.normal.applyMatrix3(e).normalize();
          for (var x = 0, y = v.length; x < y; x++)
            (s = v[x].clone()),
              e && s.applyMatrix3(e).normalize(),
              r.vertexNormals.push(s);
          r.color.copy(u.color);
          for (var x = 0, y = w.length; x < y; x++)
            (t = w[x]), r.vertexColors.push(t.clone());
          (r.materialIndex = u.materialIndex + c),
            r.centroid.copy(u.centroid),
            d && r.centroid.applyMatrix4(d),
            j.push(r);
        }
        for (n = 0, o = m.length; n < o; n++) {
          for (var z = m[n], A = [], x = 0, y = z.length; x < y; x++)
            A.push(new THREE.Vector2(z[x].x, z[x].y));
          l.push(A);
        }
      },
      removeMaterials: function (a, b) {
        for (var c = {}, d = 0, e = b.length; d < e; d++) c[b[d]] = !0;
        for (var f, g = [], d = 0, e = a.faces.length; d < e; d++)
          (f = a.faces[d]), f.materialIndex in c || g.push(f);
        a.faces = g;
      },
      randomPointInTriangle: (function () {
        var a = new THREE.Vector3();
        return function (b, c, d) {
          var e = new THREE.Vector3(),
            f = THREE.Math.random16(),
            g = THREE.Math.random16();
          f + g > 1 && ((f = 1 - f), (g = 1 - g));
          var h = 1 - f - g;
          return (
            e.copy(b),
            e.multiplyScalar(f),
            a.copy(c),
            a.multiplyScalar(g),
            e.add(a),
            a.copy(d),
            a.multiplyScalar(h),
            e.add(a),
            e
          );
        };
      })(),
      randomPointInFace: function (a, b, c) {
        var d, e, f, g;
        if (a instanceof THREE.Face3)
          return (
            (d = b.vertices[a.a]),
            (e = b.vertices[a.b]),
            (f = b.vertices[a.c]),
            THREE.GeometryUtils.randomPointInTriangle(d, e, f)
          );
        if (a instanceof THREE.Face4) {
          (d = b.vertices[a.a]),
            (e = b.vertices[a.b]),
            (f = b.vertices[a.c]),
            (g = b.vertices[a.d]);
          var h, i;
          c
            ? a._area1 && a._area2
              ? ((h = a._area1), (i = a._area2))
              : ((h = THREE.GeometryUtils.triangleArea(d, e, g)),
                (i = THREE.GeometryUtils.triangleArea(e, f, g)),
                (a._area1 = h),
                (a._area2 = i))
            : ((h = THREE.GeometryUtils.triangleArea(d, e, g)),
              (i = THREE.GeometryUtils.triangleArea(e, f, g)));
          var j = THREE.Math.random16() * (h + i);
          return j < h
            ? THREE.GeometryUtils.randomPointInTriangle(d, e, g)
            : THREE.GeometryUtils.randomPointInTriangle(e, f, g);
        }
      },
      randomPointsInGeometry: function (a, b) {
        function c(a) {
          function b(c, d) {
            if (d < c) return c;
            var e = c + Math.floor((d - c) / 2);
            return n[e] > a ? b(c, e - 1) : n[e] < a ? b(e + 1, d) : e;
          }
          var c = b(0, n.length - 1);
          return c;
        }
        var d,
          e,
          f,
          g,
          h,
          i,
          j = a.faces,
          k = a.vertices,
          l = j.length,
          m = 0,
          n = [];
        for (e = 0; e < l; e++)
          (d = j[e]),
            d instanceof THREE.Face3
              ? ((f = k[d.a]),
                (g = k[d.b]),
                (h = k[d.c]),
                (d._area = THREE.GeometryUtils.triangleArea(f, g, h)))
              : d instanceof THREE.Face4 &&
                ((f = k[d.a]),
                (g = k[d.b]),
                (h = k[d.c]),
                (i = k[d.d]),
                (d._area1 = THREE.GeometryUtils.triangleArea(f, g, i)),
                (d._area2 = THREE.GeometryUtils.triangleArea(g, h, i)),
                (d._area = d._area1 + d._area2)),
            (m += d._area),
            (n[e] = m);
        var o,
          p,
          q = [],
          r = {};
        for (e = 0; e < b; e++)
          (o = THREE.Math.random16() * m),
            (p = c(o)),
            (q[e] = THREE.GeometryUtils.randomPointInFace(j[p], a, !0)),
            r[p] ? (r[p] += 1) : (r[p] = 1);
        return q;
      },
      triangleArea: (function () {
        var a = new THREE.Vector3(),
          b = new THREE.Vector3();
        return function (c, d, e) {
          return (
            a.subVectors(d, c), b.subVectors(e, c), a.cross(b), 0.5 * a.length()
          );
        };
      })(),
      center: function (a) {
        a.computeBoundingBox();
        var b = a.boundingBox,
          c = new THREE.Vector3();
        return (
          c.addVectors(b.min, b.max),
          c.multiplyScalar(-0.5),
          a.applyMatrix(new THREE.Matrix4().makeTranslation(c.x, c.y, c.z)),
          a.computeBoundingBox(),
          c
        );
      },
      triangulateQuads: function (a) {
        var b,
          c,
          d,
          e,
          f = [],
          g = [],
          h = [];
        for (b = 0, c = a.faceUvs.length; b < c; b++) g[b] = [];
        for (b = 0, c = a.faceVertexUvs.length; b < c; b++) h[b] = [];
        for (b = 0, c = a.faces.length; b < c; b++) {
          var i = a.faces[b];
          if (i instanceof THREE.Face4) {
            var j = i.a,
              k = i.b,
              l = i.c,
              m = i.d,
              n = new THREE.Face3(),
              o = new THREE.Face3();
            for (
              n.color.copy(i.color),
                o.color.copy(i.color),
                n.materialIndex = i.materialIndex,
                o.materialIndex = i.materialIndex,
                n.a = j,
                n.b = k,
                n.c = m,
                o.a = k,
                o.b = l,
                o.c = m,
                4 === i.vertexColors.length &&
                  ((n.vertexColors[0] = i.vertexColors[0].clone()),
                  (n.vertexColors[1] = i.vertexColors[1].clone()),
                  (n.vertexColors[2] = i.vertexColors[3].clone()),
                  (o.vertexColors[0] = i.vertexColors[1].clone()),
                  (o.vertexColors[1] = i.vertexColors[2].clone()),
                  (o.vertexColors[2] = i.vertexColors[3].clone())),
                f.push(n, o),
                d = 0,
                e = a.faceVertexUvs.length;
              d < e;
              d++
            )
              if (a.faceVertexUvs[d].length) {
                var p = a.faceVertexUvs[d][b],
                  q = p[0],
                  r = p[1],
                  s = p[2],
                  t = p[3],
                  u = [q.clone(), r.clone(), t.clone()],
                  v = [r.clone(), s.clone(), t.clone()];
                h[d].push(u, v);
              }
            for (d = 0, e = a.faceUvs.length; d < e; d++)
              if (a.faceUvs[d].length) {
                var w = a.faceUvs[d][b];
                g[d].push(w, w);
              }
          } else {
            for (f.push(i), d = 0, e = a.faceUvs.length; d < e; d++)
              g[d].push(a.faceUvs[d][b]);
            for (d = 0, e = a.faceVertexUvs.length; d < e; d++)
              h[d].push(a.faceVertexUvs[d][b]);
          }
        }
        (a.faces = f),
          (a.faceUvs = g),
          (a.faceVertexUvs = h),
          a.computeCentroids(),
          a.computeFaceNormals(),
          a.computeVertexNormals(),
          a.hasTangents && a.computeTangents();
      },
      setMaterialIndex: function (a, b, c, d) {
        for (
          var e = a.faces, f = c || 0, g = d || e.length - 1, h = f;
          h <= g;
          h++
        )
          e[h].materialIndex = b;
      },
    }),
    (THREE.ImageUtils = {
      crossOrigin: "anonymous",
      loadTexture: function (a, b, c, d) {
        var e = new Image(),
          f = new THREE.Texture(e, b),
          g = new THREE.ImageLoader();
        return (
          (g.crossOrigin = this.crossOrigin),
          g.load(a, function (a) {
            (f.image = a), (f.needsUpdate = !0), c && c(f);
          }),
          (f.sourceFile = a),
          f
        );
      },
      loadCompressedTexture: function (a, b, c, d) {
        var e = new THREE.CompressedTexture();
        e.mapping = b;
        var f = new XMLHttpRequest();
        return (
          (f.onload = function () {
            var a = f.response,
              b = THREE.ImageUtils.parseDDS(a, !0);
            (e.format = b.format),
              (e.mipmaps = b.mipmaps),
              (e.image.width = b.width),
              (e.image.height = b.height),
              (e.generateMipmaps = !1),
              (e.needsUpdate = !0),
              c && c(e);
          }),
          (f.onerror = d),
          f.open("GET", a, !0),
          (f.responseType = "arraybuffer"),
          f.send(null),
          e
        );
      },
      loadTextureCube: function (a, b, c, d) {
        var e = [];
        e.loadCount = 0;
        var f = new THREE.Texture();
        (f.image = e), void 0 !== b && (f.mapping = b), (f.flipY = !1);
        for (var g = 0, h = a.length; g < h; ++g) {
          var i = new Image();
          (e[g] = i),
            (i.onload = function () {
              (e.loadCount += 1),
                6 === e.loadCount && ((f.needsUpdate = !0), c && c(f));
            }),
            (i.onerror = d),
            (i.crossOrigin = this.crossOrigin),
            (i.src = a[g]);
        }
        return f;
      },
      loadCompressedTextureCube: function (a, b, c, d) {
        var e = [];
        e.loadCount = 0;
        var f = new THREE.CompressedTexture();
        (f.image = e),
          void 0 !== b && (f.mapping = b),
          (f.flipY = !1),
          (f.generateMipmaps = !1);
        var g = function (a, b) {
          return function () {
            var d = a.response,
              g = THREE.ImageUtils.parseDDS(d, !0);
            (b.format = g.format),
              (b.mipmaps = g.mipmaps),
              (b.width = g.width),
              (b.height = g.height),
              (e.loadCount += 1),
              6 === e.loadCount &&
                ((f.format = g.format), (f.needsUpdate = !0), c && c(f));
          };
        };
        if (a instanceof Array)
          for (var h = 0, i = a.length; h < i; ++h) {
            var j = {};
            e[h] = j;
            var k = new XMLHttpRequest();
            (k.onload = g(k, j)), (k.onerror = d);
            var l = a[h];
            k.open("GET", l, !0),
              (k.responseType = "arraybuffer"),
              k.send(null);
          }
        else {
          var l = a,
            k = new XMLHttpRequest();
          (k.onload = function () {
            var a = k.response,
              b = THREE.ImageUtils.parseDDS(a, !0);
            if (b.isCubemap) {
              for (
                var d = b.mipmaps.length / b.mipmapCount, g = 0;
                g < d;
                g++
              ) {
                e[g] = { mipmaps: [] };
                for (var h = 0; h < b.mipmapCount; h++)
                  e[g].mipmaps.push(b.mipmaps[g * b.mipmapCount + h]),
                    (e[g].format = b.format),
                    (e[g].width = b.width),
                    (e[g].height = b.height);
              }
              (f.format = b.format), (f.needsUpdate = !0), c && c(f);
            }
          }),
            (k.onerror = d),
            k.open("GET", l, !0),
            (k.responseType = "arraybuffer"),
            k.send(null);
        }
        return f;
      },
      parseDDS: function (a, b) {
        function c(a) {
          return (
            a.charCodeAt(0) +
            (a.charCodeAt(1) << 8) +
            (a.charCodeAt(2) << 16) +
            (a.charCodeAt(3) << 24)
          );
        }
        function d(a) {
          return String.fromCharCode(
            255 & a,
            (a >> 8) & 255,
            (a >> 16) & 255,
            (a >> 24) & 255
          );
        }
        var e = {
            mipmaps: [],
            width: 0,
            height: 0,
            format: null,
            mipmapCount: 1,
          },
          f = 542327876,
          g = 131072,
          h = 512,
          i = 4,
          j = c("DXT1"),
          k = c("DXT3"),
          l = c("DXT5"),
          m = 31,
          n = 0,
          o = 1,
          p = 2,
          q = 3,
          r = 4,
          s = 7,
          t = 20,
          u = 21,
          v = 28,
          w = new Int32Array(a, 0, m);
        if (w[n] !== f)
          return (
            console.error(
              "ImageUtils.parseDDS(): Invalid magic number in DDS header"
            ),
            e
          );
        if (!w[t] & i)
          return (
            console.error(
              "ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"
            ),
            e
          );
        var x,
          y = w[u];
        switch (y) {
          case j:
            (x = 8), (e.format = THREE.RGB_S3TC_DXT1_Format);
            break;
          case k:
            (x = 16), (e.format = THREE.RGBA_S3TC_DXT3_Format);
            break;
          case l:
            (x = 16), (e.format = THREE.RGBA_S3TC_DXT5_Format);
            break;
          default:
            return (
              console.error(
                "ImageUtils.parseDDS(): Unsupported FourCC code: ",
                d(y)
              ),
              e
            );
        }
        (e.mipmapCount = 1),
          w[p] & g && b !== !1 && (e.mipmapCount = Math.max(1, w[s])),
          (e.isCubemap = !!(w[v] & h)),
          (e.width = w[r]),
          (e.height = w[q]);
        for (
          var z = w[o] + 4,
            A = e.width,
            B = e.height,
            C = e.isCubemap ? 6 : 1,
            D = 0;
          D < C;
          D++
        ) {
          for (var E = 0; E < e.mipmapCount; E++) {
            var F = (((Math.max(4, A) / 4) * Math.max(4, B)) / 4) * x,
              G = new Uint8Array(a, z, F),
              H = { data: G, width: A, height: B };
            e.mipmaps.push(H),
              (z += F),
              (A = Math.max(0.5 * A, 1)),
              (B = Math.max(0.5 * B, 1));
          }
          (A = e.width), (B = e.height);
        }
        return e;
      },
      getNormalMap: function (a, b) {
        var c = function (a, b) {
            return [
              a[1] * b[2] - a[2] * b[1],
              a[2] * b[0] - a[0] * b[2],
              a[0] * b[1] - a[1] * b[0],
            ];
          },
          d = function (a, b) {
            return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
          },
          e = function (a) {
            var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
            return [a[0] / b, a[1] / b, a[2] / b];
          };
        b = 1 | b;
        var f = a.width,
          g = a.height,
          h = document.createElement("canvas");
        (h.width = f), (h.height = g);
        var i = h.getContext("2d");
        i.drawImage(a, 0, 0);
        for (
          var j = i.getImageData(0, 0, f, g).data,
            k = i.createImageData(f, g),
            l = k.data,
            m = 0;
          m < f;
          m++
        )
          for (var n = 0; n < g; n++) {
            var o = n - 1 < 0 ? 0 : n - 1,
              p = n + 1 > g - 1 ? g - 1 : n + 1,
              q = m - 1 < 0 ? 0 : m - 1,
              r = m + 1 > f - 1 ? f - 1 : m + 1,
              s = [],
              t = [0, 0, (j[4 * (n * f + m)] / 255) * b];
            s.push([-1, 0, (j[4 * (n * f + q)] / 255) * b]),
              s.push([-1, -1, (j[4 * (o * f + q)] / 255) * b]),
              s.push([0, -1, (j[4 * (o * f + m)] / 255) * b]),
              s.push([1, -1, (j[4 * (o * f + r)] / 255) * b]),
              s.push([1, 0, (j[4 * (n * f + r)] / 255) * b]),
              s.push([1, 1, (j[4 * (p * f + r)] / 255) * b]),
              s.push([0, 1, (j[4 * (p * f + m)] / 255) * b]),
              s.push([-1, 1, (j[4 * (p * f + q)] / 255) * b]);
            for (var u = [], v = s.length, w = 0; w < v; w++) {
              var x = s[w],
                y = s[(w + 1) % v];
              (x = d(x, t)), (y = d(y, t)), u.push(e(c(x, y)));
            }
            for (var z = [0, 0, 0], w = 0; w < u.length; w++)
              (z[0] += u[w][0]), (z[1] += u[w][1]), (z[2] += u[w][2]);
            (z[0] /= u.length), (z[1] /= u.length), (z[2] /= u.length);
            var A = 4 * (n * f + m);
            (l[A] = (((z[0] + 1) / 2) * 255) | 0),
              (l[A + 1] = (((z[1] + 1) / 2) * 255) | 0),
              (l[A + 2] = (255 * z[2]) | 0),
              (l[A + 3] = 255);
          }
        return i.putImageData(k, 0, 0), h;
      },
      generateDataTexture: function (a, b, c) {
        for (
          var d = a * b,
            e = new Uint8Array(3 * d),
            f = Math.floor(255 * c.r),
            g = Math.floor(255 * c.g),
            h = Math.floor(255 * c.b),
            i = 0;
          i < d;
          i++
        )
          (e[3 * i] = f), (e[3 * i + 1] = g), (e[3 * i + 2] = h);
        var j = new THREE.DataTexture(e, a, b, THREE.RGBFormat);
        return (j.needsUpdate = !0), j;
      },
    }),
    (THREE.SceneUtils = {
      createMultiMaterialObject: function (a, b) {
        for (var c = new THREE.Object3D(), d = 0, e = b.length; d < e; d++)
          c.add(new THREE.Mesh(a, b[d]));
        return c;
      },
      detach: function (a, b, c) {
        a.applyMatrix(b.matrixWorld), b.remove(a), c.add(a);
      },
      attach: function (a, b, c) {
        var d = new THREE.Matrix4();
        d.getInverse(c.matrixWorld), a.applyMatrix(d), b.remove(a), c.add(a);
      },
    }),
    (THREE.FontUtils = {
      faces: {},
      face: "helvetiker",
      weight: "normal",
      style: "normal",
      size: 150,
      divisions: 10,
      getFace: function () {
        return this.faces[this.face][this.weight][this.style];
      },
      loadFace: function (a) {
        var b = a.familyName.toLowerCase(),
          c = this;
        (c.faces[b] = c.faces[b] || {}),
          (c.faces[b][a.cssFontWeight] = c.faces[b][a.cssFontWeight] || {}),
          (c.faces[b][a.cssFontWeight][a.cssFontStyle] = a);
        c.faces[b][a.cssFontWeight][a.cssFontStyle] = a;
        return a;
      },
      drawText: function (a) {
        var b,
          c = this.getFace(),
          d = this.size / c.resolution,
          e = 0,
          f = String(a).split(""),
          g = f.length,
          h = [];
        for (b = 0; b < g; b++) {
          var i = new THREE.Path(),
            j = this.extractGlyphPoints(f[b], c, d, e, i);
          (e += j.offset), h.push(j.path);
        }
        var k = e / 2;
        return { paths: h, offset: k };
      },
      extractGlyphPoints: function (a, b, c, d, e) {
        var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y = [],
          z = b.glyphs[a] || b.glyphs["?"];
        if (z) {
          if (z.o)
            for (
              i = z._cachedOutline || (z._cachedOutline = z.o.split(" ")),
                k = i.length,
                l = c,
                m = c,
                f = 0;
              f < k;

            )
              switch ((j = i[f++])) {
                case "m":
                  (n = i[f++] * l + d), (o = i[f++] * m), e.moveTo(n, o);
                  break;
                case "l":
                  (n = i[f++] * l + d), (o = i[f++] * m), e.lineTo(n, o);
                  break;
                case "q":
                  if (
                    ((p = i[f++] * l + d),
                    (q = i[f++] * m),
                    (t = i[f++] * l + d),
                    (u = i[f++] * m),
                    e.quadraticCurveTo(t, u, p, q),
                    (x = y[y.length - 1]))
                  )
                    for (
                      r = x.x, s = x.y, g = 1, h = this.divisions;
                      g <= h;
                      g++
                    ) {
                      var A = g / h;
                      THREE.Shape.Utils.b2(A, r, t, p),
                        THREE.Shape.Utils.b2(A, s, u, q);
                    }
                  break;
                case "b":
                  if (
                    ((p = i[f++] * l + d),
                    (q = i[f++] * m),
                    (t = i[f++] * l + d),
                    (u = i[f++] * -m),
                    (v = i[f++] * l + d),
                    (w = i[f++] * -m),
                    e.bezierCurveTo(p, q, t, u, v, w),
                    (x = y[y.length - 1]))
                  )
                    for (
                      r = x.x, s = x.y, g = 1, h = this.divisions;
                      g <= h;
                      g++
                    ) {
                      var A = g / h;
                      THREE.Shape.Utils.b3(A, r, t, v, p),
                        THREE.Shape.Utils.b3(A, s, u, w, q);
                    }
              }
          return { offset: z.ha * c, path: e };
        }
      },
    }),
    (THREE.FontUtils.generateShapes = function (a, b) {
      b = b || {};
      var c = void 0 !== b.size ? b.size : 100,
        d = void 0 !== b.curveSegments ? b.curveSegments : 4,
        e = void 0 !== b.font ? b.font : "helvetiker",
        f = void 0 !== b.weight ? b.weight : "normal",
        g = void 0 !== b.style ? b.style : "normal";
      (THREE.FontUtils.size = c),
        (THREE.FontUtils.divisions = d),
        (THREE.FontUtils.face = e),
        (THREE.FontUtils.weight = f),
        (THREE.FontUtils.style = g);
      for (
        var h = THREE.FontUtils.drawText(a),
          i = h.paths,
          j = [],
          k = 0,
          l = i.length;
        k < l;
        k++
      )
        Array.prototype.push.apply(j, i[k].toShapes());
      return j;
    }),
    (function (a) {
      var b = 1e-10,
        c = function (a, b) {
          var c = a.length;
          if (c < 3) return null;
          var f,
            g,
            h,
            i = [],
            j = [],
            k = [];
          if (d(a) > 0) for (g = 0; g < c; g++) j[g] = g;
          else for (g = 0; g < c; g++) j[g] = c - 1 - g;
          var l = c,
            m = 2 * l;
          for (g = l - 1; l > 2; ) {
            if (m-- <= 0)
              return (
                console.log("Warning, unable to triangulate polygon!"),
                b ? k : i
              );
            if (
              ((f = g),
              l <= f && (f = 0),
              (g = f + 1),
              l <= g && (g = 0),
              (h = g + 1),
              l <= h && (h = 0),
              e(a, f, g, h, l, j))
            ) {
              var n, o, p, q, r;
              for (
                n = j[f],
                  o = j[g],
                  p = j[h],
                  i.push([a[n], a[o], a[p]]),
                  k.push([j[f], j[g], j[h]]),
                  q = g,
                  r = g + 1;
                r < l;
                q++, r++
              )
                j[q] = j[r];
              l--, (m = 2 * l);
            }
          }
          return b ? k : i;
        },
        d = function (a) {
          for (var b = a.length, c = 0, d = b - 1, e = 0; e < b; d = e++)
            c += a[d].x * a[e].y - a[e].x * a[d].y;
          return 0.5 * c;
        },
        e = function (a, c, d, e, f, g) {
          var h, i, j, k, l, m, n, o, p;
          if (
            ((i = a[g[c]].x),
            (j = a[g[c]].y),
            (k = a[g[d]].x),
            (l = a[g[d]].y),
            (m = a[g[e]].x),
            (n = a[g[e]].y),
            b > (k - i) * (n - j) - (l - j) * (m - i))
          )
            return !1;
          var q, r, s, t, u, v, w, x, y, z, A, B, C, D, E;
          for (
            q = m - k,
              r = n - l,
              s = i - m,
              t = j - n,
              u = k - i,
              v = l - j,
              h = 0;
            h < f;
            h++
          )
            if (
              h !== c &&
              h !== d &&
              h !== e &&
              ((o = a[g[h]].x),
              (p = a[g[h]].y),
              (w = o - i),
              (x = p - j),
              (y = o - k),
              (z = p - l),
              (A = o - m),
              (B = p - n),
              (E = q * z - r * y),
              (C = u * x - v * w),
              (D = s * B - t * A),
              E >= 0 && D >= 0 && C >= 0)
            )
              return !1;
          return !0;
        };
      return (a.Triangulate = c), (a.Triangulate.area = d), a;
    })(THREE.FontUtils),
    (self._typeface_js = {
      faces: THREE.FontUtils.faces,
      loadFace: THREE.FontUtils.loadFace,
    }),
    (THREE.typeface_js = self._typeface_js),
    (THREE.Curve = function () {}),
    (THREE.Curve.prototype.getPoint = function (a) {
      return console.log("Warning, getPoint() not implemented!"), null;
    }),
    (THREE.Curve.prototype.getPointAt = function (a) {
      var b = this.getUtoTmapping(a);
      return this.getPoint(b);
    }),
    (THREE.Curve.prototype.getPoints = function (a) {
      a || (a = 5);
      var b,
        c = [];
      for (b = 0; b <= a; b++) c.push(this.getPoint(b / a));
      return c;
    }),
    (THREE.Curve.prototype.getSpacedPoints = function (a) {
      a || (a = 5);
      var b,
        c = [];
      for (b = 0; b <= a; b++) c.push(this.getPointAt(b / a));
      return c;
    }),
    (THREE.Curve.prototype.getLength = function () {
      var a = this.getLengths();
      return a[a.length - 1];
    }),
    (THREE.Curve.prototype.getLengths = function (a) {
      if (
        (a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200),
        this.cacheArcLengths &&
          this.cacheArcLengths.length == a + 1 &&
          !this.needsUpdate)
      )
        return this.cacheArcLengths;
      this.needsUpdate = !1;
      var b,
        c,
        d = [],
        e = this.getPoint(0),
        f = 0;
      for (d.push(0), c = 1; c <= a; c++)
        (b = this.getPoint(c / a)), (f += b.distanceTo(e)), d.push(f), (e = b);
      return (this.cacheArcLengths = d), d;
    }),
    (THREE.Curve.prototype.updateArcLengths = function () {
      (this.needsUpdate = !0), this.getLengths();
    }),
    (THREE.Curve.prototype.getUtoTmapping = function (a, b) {
      var c,
        d = this.getLengths(),
        e = 0,
        f = d.length;
      c = b ? b : a * d[f - 1];
      for (var g, h = 0, i = f - 1; h <= i; )
        if (((e = Math.floor(h + (i - h) / 2)), (g = d[e] - c), g < 0))
          h = e + 1;
        else {
          if (!(g > 0)) {
            i = e;
            break;
          }
          i = e - 1;
        }
      if (((e = i), d[e] == c)) {
        var j = e / (f - 1);
        return j;
      }
      var k = d[e],
        l = d[e + 1],
        m = l - k,
        n = (c - k) / m,
        j = (e + n) / (f - 1);
      return j;
    }),
    (THREE.Curve.prototype.getTangent = function (a) {
      var b = 1e-4,
        c = a - b,
        d = a + b;
      c < 0 && (c = 0), d > 1 && (d = 1);
      var e = this.getPoint(c),
        f = this.getPoint(d),
        g = f.clone().sub(e);
      return g.normalize();
    }),
    (THREE.Curve.prototype.getTangentAt = function (a) {
      var b = this.getUtoTmapping(a);
      return this.getTangent(b);
    }),
    (THREE.Curve.Utils = {
      tangentQuadraticBezier: function (a, b, c, d) {
        return 2 * (1 - a) * (c - b) + 2 * a * (d - c);
      },
      tangentCubicBezier: function (a, b, c, d, e) {
        return (
          -3 * b * (1 - a) * (1 - a) +
          3 * c * (1 - a) * (1 - a) -
          6 * a * c * (1 - a) +
          6 * a * d * (1 - a) -
          3 * a * a * d +
          3 * a * a * e
        );
      },
      tangentSpline: function (a, b, c, d, e) {
        var f = 6 * a * a - 6 * a,
          g = 3 * a * a - 4 * a + 1,
          h = -6 * a * a + 6 * a,
          i = 3 * a * a - 2 * a;
        return f + g + h + i;
      },
      interpolate: function (a, b, c, d, e) {
        var f = 0.5 * (c - a),
          g = 0.5 * (d - b),
          h = e * e,
          i = e * h;
        return (
          (2 * b - 2 * c + f + g) * i +
          (-3 * b + 3 * c - 2 * f - g) * h +
          f * e +
          b
        );
      },
    }),
    (THREE.Curve.create = function (a, b) {
      return (
        (a.prototype = Object.create(THREE.Curve.prototype)),
        (a.prototype.getPoint = b),
        a
      );
    }),
    (THREE.CurvePath = function () {
      (this.curves = []), (this.bends = []), (this.autoClose = !1);
    }),
    (THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype)),
    (THREE.CurvePath.prototype.add = function (a) {
      this.curves.push(a);
    }),
    (THREE.CurvePath.prototype.checkConnection = function () {}),
    (THREE.CurvePath.prototype.closePath = function () {
      var a = this.curves[0].getPoint(0),
        b = this.curves[this.curves.length - 1].getPoint(1);
      a.equals(b) || this.curves.push(new THREE.LineCurve(b, a));
    }),
    (THREE.CurvePath.prototype.getPoint = function (a) {
      for (
        var b, c, d = a * this.getLength(), e = this.getCurveLengths(), f = 0;
        f < e.length;

      ) {
        if (e[f] >= d) {
          (b = e[f] - d), (c = this.curves[f]);
          var g = 1 - b / c.getLength();
          return c.getPointAt(g);
        }
        f++;
      }
      return null;
    }),
    (THREE.CurvePath.prototype.getLength = function () {
      var a = this.getCurveLengths();
      return a[a.length - 1];
    }),
    (THREE.CurvePath.prototype.getCurveLengths = function () {
      if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
        return this.cacheLengths;
      var a,
        b = [],
        c = 0,
        d = this.curves.length;
      for (a = 0; a < d; a++) (c += this.curves[a].getLength()), b.push(c);
      return (this.cacheLengths = b), b;
    }),
    (THREE.CurvePath.prototype.getBoundingBox = function () {
      var a,
        b,
        c,
        d,
        e,
        f,
        g = this.getPoints();
      (a = b = Number.NEGATIVE_INFINITY), (d = e = Number.POSITIVE_INFINITY);
      var h,
        i,
        j,
        k,
        l = g[0] instanceof THREE.Vector3;
      for (
        k = l ? new THREE.Vector3() : new THREE.Vector2(), i = 0, j = g.length;
        i < j;
        i++
      )
        (h = g[i]),
          h.x > a ? (a = h.x) : h.x < d && (d = h.x),
          h.y > b ? (b = h.y) : h.y < e && (e = h.y),
          l && (h.z > c ? (c = h.z) : h.z < f && (f = h.z)),
          k.add(h);
      var m = {
        minX: d,
        minY: e,
        maxX: a,
        maxY: b,
        centroid: k.divideScalar(j),
      };
      return l && ((m.maxZ = c), (m.minZ = f)), m;
    }),
    (THREE.CurvePath.prototype.createPointsGeometry = function (a) {
      var b = this.getPoints(a, !0);
      return this.createGeometry(b);
    }),
    (THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
      var b = this.getSpacedPoints(a, !0);
      return this.createGeometry(b);
    }),
    (THREE.CurvePath.prototype.createGeometry = function (a) {
      for (var b = new THREE.Geometry(), c = 0; c < a.length; c++)
        b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
      return b;
    }),
    (THREE.CurvePath.prototype.addWrapPath = function (a) {
      this.bends.push(a);
    }),
    (THREE.CurvePath.prototype.getTransformedPoints = function (a, b) {
      var c,
        d,
        e = this.getPoints(a);
      for (b || (b = this.bends), c = 0, d = b.length; c < d; c++)
        e = this.getWrapPoints(e, b[c]);
      return e;
    }),
    (THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b) {
      var c,
        d,
        e = this.getSpacedPoints(a);
      for (b || (b = this.bends), c = 0, d = b.length; c < d; c++)
        e = this.getWrapPoints(e, b[c]);
      return e;
    }),
    (THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
      var c,
        d,
        e,
        f,
        g,
        h,
        i = this.getBoundingBox();
      for (c = 0, d = a.length; c < d; c++) {
        (e = a[c]),
          (f = e.x),
          (g = e.y),
          (h = f / i.maxX),
          (h = b.getUtoTmapping(h, f));
        var j = b.getPoint(h),
          k = b.getNormalVector(h).multiplyScalar(g);
        (e.x = j.x + k.x), (e.y = j.y + k.y);
      }
      return a;
    }),
    (THREE.Gyroscope = function () {
      THREE.Object3D.call(this);
    }),
    (THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.Gyroscope.prototype.updateMatrixWorld = function (a) {
      this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || a) &&
          (this.parent
            ? (this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix
              ),
              this.matrixWorld.decompose(
                this.translationWorld,
                this.quaternionWorld,
                this.scaleWorld
              ),
              this.matrix.decompose(
                this.translationObject,
                this.quaternionObject,
                this.scaleObject
              ),
              this.matrixWorld.compose(
                this.translationWorld,
                this.quaternionObject,
                this.scaleWorld
              ))
            : this.matrixWorld.copy(this.matrix),
          (this.matrixWorldNeedsUpdate = !1),
          (a = !0));
      for (var b = 0, c = this.children.length; b < c; b++)
        this.children[b].updateMatrixWorld(a);
    }),
    (THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3()),
    (THREE.Gyroscope.prototype.translationObject = new THREE.Vector3()),
    (THREE.Gyroscope.prototype.quaternionWorld = new THREE.Quaternion()),
    (THREE.Gyroscope.prototype.quaternionObject = new THREE.Quaternion()),
    (THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3()),
    (THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3()),
    (THREE.Path = function (a) {
      THREE.CurvePath.call(this), (this.actions = []), a && this.fromPoints(a);
    }),
    (THREE.Path.prototype = Object.create(THREE.CurvePath.prototype)),
    (THREE.PathActions = {
      MOVE_TO: "moveTo",
      LINE_TO: "lineTo",
      QUADRATIC_CURVE_TO: "quadraticCurveTo",
      BEZIER_CURVE_TO: "bezierCurveTo",
      CSPLINE_THRU: "splineThru",
      ARC: "arc",
      ELLIPSE: "ellipse",
    }),
    (THREE.Path.prototype.fromPoints = function (a) {
      this.moveTo(a[0].x, a[0].y);
      for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y);
    }),
    (THREE.Path.prototype.moveTo = function (a, b) {
      var c = Array.prototype.slice.call(arguments);
      this.actions.push({ action: THREE.PathActions.MOVE_TO, args: c });
    }),
    (THREE.Path.prototype.lineTo = function (a, b) {
      var c = Array.prototype.slice.call(arguments),
        d = this.actions[this.actions.length - 1].args,
        e = d[d.length - 2],
        f = d[d.length - 1],
        g = new THREE.LineCurve(
          new THREE.Vector2(e, f),
          new THREE.Vector2(a, b)
        );
      this.curves.push(g),
        this.actions.push({ action: THREE.PathActions.LINE_TO, args: c });
    }),
    (THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d) {
      var e = Array.prototype.slice.call(arguments),
        f = this.actions[this.actions.length - 1].args,
        g = f[f.length - 2],
        h = f[f.length - 1],
        i = new THREE.QuadraticBezierCurve(
          new THREE.Vector2(g, h),
          new THREE.Vector2(a, b),
          new THREE.Vector2(c, d)
        );
      this.curves.push(i),
        this.actions.push({
          action: THREE.PathActions.QUADRATIC_CURVE_TO,
          args: e,
        });
    }),
    (THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
      var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1].args,
        i = h[h.length - 2],
        j = h[h.length - 1],
        k = new THREE.CubicBezierCurve(
          new THREE.Vector2(i, j),
          new THREE.Vector2(a, b),
          new THREE.Vector2(c, d),
          new THREE.Vector2(e, f)
        );
      this.curves.push(k),
        this.actions.push({
          action: THREE.PathActions.BEZIER_CURVE_TO,
          args: g,
        });
    }),
    (THREE.Path.prototype.splineThru = function (a) {
      var b = Array.prototype.slice.call(arguments),
        c = this.actions[this.actions.length - 1].args,
        d = c[c.length - 2],
        e = c[c.length - 1],
        f = [new THREE.Vector2(d, e)];
      Array.prototype.push.apply(f, a);
      var g = new THREE.SplineCurve(f);
      this.curves.push(g),
        this.actions.push({ action: THREE.PathActions.CSPLINE_THRU, args: b });
    }),
    (THREE.Path.prototype.arc = function (a, b, c, d, e, f) {
      var g = this.actions[this.actions.length - 1].args,
        h = g[g.length - 2],
        i = g[g.length - 1];
      this.absarc(a + h, b + i, c, d, e, f);
    }),
    (THREE.Path.prototype.absarc = function (a, b, c, d, e, f) {
      this.absellipse(a, b, c, c, d, e, f);
    }),
    (THREE.Path.prototype.ellipse = function (a, b, c, d, e, f, g) {
      var h = this.actions[this.actions.length - 1].args,
        i = h[h.length - 2],
        j = h[h.length - 1];
      this.absellipse(a + i, b + j, c, d, e, f, g);
    }),
    (THREE.Path.prototype.absellipse = function (a, b, c, d, e, f, g) {
      var h = Array.prototype.slice.call(arguments),
        i = new THREE.EllipseCurve(a, b, c, d, e, f, g);
      this.curves.push(i);
      var j = i.getPoint(g ? 1 : 0);
      h.push(j.x),
        h.push(j.y),
        this.actions.push({ action: THREE.PathActions.ELLIPSE, args: h });
    }),
    (THREE.Path.prototype.getSpacedPoints = function (a, b) {
      a || (a = 40);
      for (var c = [], d = 0; d < a; d++) c.push(this.getPoint(d / a));
      return c;
    }),
    (THREE.Path.prototype.getPoints = function (a, b) {
      if (this.useSpacedPoints)
        return console.log("tata"), this.getSpacedPoints(a, b);
      a = a || 12;
      var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = [];
      for (c = 0, d = this.actions.length; c < d; c++)
        switch (((e = this.actions[c]), (f = e.action), (g = e.args), f)) {
          case THREE.PathActions.MOVE_TO:
            u.push(new THREE.Vector2(g[0], g[1]));
            break;
          case THREE.PathActions.LINE_TO:
            u.push(new THREE.Vector2(g[0], g[1]));
            break;
          case THREE.PathActions.QUADRATIC_CURVE_TO:
            for (
              h = g[2],
                i = g[3],
                l = g[0],
                m = g[1],
                u.length > 0
                  ? ((p = u[u.length - 1]), (n = p.x), (o = p.y))
                  : ((p = this.actions[c - 1].args),
                    (n = p[p.length - 2]),
                    (o = p[p.length - 1])),
                q = 1;
              q <= a;
              q++
            )
              (r = q / a),
                (s = THREE.Shape.Utils.b2(r, n, l, h)),
                (t = THREE.Shape.Utils.b2(r, o, m, i)),
                u.push(new THREE.Vector2(s, t));
            break;
          case THREE.PathActions.BEZIER_CURVE_TO:
            for (
              h = g[4],
                i = g[5],
                l = g[0],
                m = g[1],
                j = g[2],
                k = g[3],
                u.length > 0
                  ? ((p = u[u.length - 1]), (n = p.x), (o = p.y))
                  : ((p = this.actions[c - 1].args),
                    (n = p[p.length - 2]),
                    (o = p[p.length - 1])),
                q = 1;
              q <= a;
              q++
            )
              (r = q / a),
                (s = THREE.Shape.Utils.b3(r, n, l, j, h)),
                (t = THREE.Shape.Utils.b3(r, o, m, k, i)),
                u.push(new THREE.Vector2(s, t));
            break;
          case THREE.PathActions.CSPLINE_THRU:
            p = this.actions[c - 1].args;
            var v = new THREE.Vector2(p[p.length - 2], p[p.length - 1]),
              w = [v],
              x = a * g[0].length;
            w = w.concat(g[0]);
            var y = new THREE.SplineCurve(w);
            for (q = 1; q <= x; q++) u.push(y.getPointAt(q / x));
            break;
          case THREE.PathActions.ARC:
            var z,
              A = g[0],
              B = g[1],
              C = g[2],
              D = g[3],
              E = g[4],
              F = !!g[5],
              G = E - D,
              H = 2 * a;
            for (q = 1; q <= H; q++)
              (r = q / H),
                F || (r = 1 - r),
                (z = D + r * G),
                (s = A + C * Math.cos(z)),
                (t = B + C * Math.sin(z)),
                u.push(new THREE.Vector2(s, t));
            break;
          case THREE.PathActions.ELLIPSE:
            var z,
              A = g[0],
              B = g[1],
              I = g[2],
              J = g[3],
              D = g[4],
              E = g[5],
              F = !!g[6],
              G = E - D,
              H = 2 * a;
            for (q = 1; q <= H; q++)
              (r = q / H),
                F || (r = 1 - r),
                (z = D + r * G),
                (s = A + I * Math.cos(z)),
                (t = B + J * Math.sin(z)),
                u.push(new THREE.Vector2(s, t));
        }
      var K = u[u.length - 1],
        L = 1e-10;
      return (
        Math.abs(K.x - u[0].x) < L &&
          Math.abs(K.y - u[0].y) < L &&
          u.splice(u.length - 1, 1),
        b && u.push(u[0]),
        u
      );
    }),
    (THREE.Path.prototype.toShapes = function (a) {
      var b,
        c,
        d,
        e,
        f,
        g = [],
        h = new THREE.Path();
      for (b = 0, c = this.actions.length; b < c; b++)
        (d = this.actions[b]),
          (f = d.args),
          (e = d.action),
          e == THREE.PathActions.MOVE_TO &&
            0 != h.actions.length &&
            (g.push(h), (h = new THREE.Path())),
          h[e].apply(h, f);
      if ((0 != h.actions.length && g.push(h), 0 == g.length)) return [];
      var i,
        j,
        k,
        l = [];
      if (1 == g.length)
        return (
          (j = g[0]),
          (k = new THREE.Shape()),
          (k.actions = j.actions),
          (k.curves = j.curves),
          l.push(k),
          l
        );
      var m = !THREE.Shape.Utils.isClockWise(g[0].getPoints());
      if ((m = a ? !m : m))
        for (k = new THREE.Shape(), b = 0, c = g.length; b < c; b++)
          (j = g[b]),
            (i = THREE.Shape.Utils.isClockWise(j.getPoints())),
            (i = a ? !i : i),
            i
              ? ((k.actions = j.actions),
                (k.curves = j.curves),
                l.push(k),
                (k = new THREE.Shape()))
              : k.holes.push(j);
      else {
        for (k = void 0, b = 0, c = g.length; b < c; b++)
          (j = g[b]),
            (i = THREE.Shape.Utils.isClockWise(j.getPoints())),
            (i = a ? !i : i),
            i
              ? (k && l.push(k),
                (k = new THREE.Shape()),
                (k.actions = j.actions),
                (k.curves = j.curves))
              : k.holes.push(j);
        l.push(k);
      }
      return l;
    }),
    (THREE.Shape = function () {
      THREE.Path.apply(this, arguments), (this.holes = []);
    }),
    (THREE.Shape.prototype = Object.create(THREE.Path.prototype)),
    (THREE.Shape.prototype.extrude = function (a) {
      var b = new THREE.ExtrudeGeometry(this, a);
      return b;
    }),
    (THREE.Shape.prototype.makeGeometry = function (a) {
      var b = new THREE.ShapeGeometry(this, a);
      return b;
    }),
    (THREE.Shape.prototype.getPointsHoles = function (a) {
      var b,
        c = this.holes.length,
        d = [];
      for (b = 0; b < c; b++)
        d[b] = this.holes[b].getTransformedPoints(a, this.bends);
      return d;
    }),
    (THREE.Shape.prototype.getSpacedPointsHoles = function (a) {
      var b,
        c = this.holes.length,
        d = [];
      for (b = 0; b < c; b++)
        d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
      return d;
    }),
    (THREE.Shape.prototype.extractAllPoints = function (a) {
      return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a),
      };
    }),
    (THREE.Shape.prototype.extractPoints = function (a) {
      return this.useSpacedPoints
        ? this.extractAllSpacedPoints(a)
        : this.extractAllPoints(a);
    }),
    (THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
      return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a),
      };
    }),
    (THREE.Shape.Utils = {
      removeHoles: function (a, b) {
        var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s = a.concat(),
          t = s.concat(),
          u = [];
        for (g = 0; g < b.length; g++) {
          for (
            i = b[g],
              Array.prototype.push.apply(t, i),
              j = Number.POSITIVE_INFINITY,
              h = 0;
            h < i.length;
            h++
          ) {
            m = i[h];
            var v = [];
            for (l = 0; l < s.length; l++)
              (n = s[l]),
                (k = m.distanceToSquared(n)),
                v.push(k),
                k < j && ((j = k), (e = h), (f = l));
          }
          (c = f - 1 >= 0 ? f - 1 : s.length - 1),
            (d = e - 1 >= 0 ? e - 1 : i.length - 1);
          var w = [i[e], s[f], s[c]],
            x = THREE.FontUtils.Triangulate.area(w),
            y = [i[e], i[d], s[f]],
            z = THREE.FontUtils.Triangulate.area(y),
            A = 1,
            B = -1,
            C = f,
            D = e;
          (f += A),
            (e += B),
            f < 0 && (f += s.length),
            (f %= s.length),
            e < 0 && (e += i.length),
            (e %= i.length),
            (c = f - 1 >= 0 ? f - 1 : s.length - 1),
            (d = e - 1 >= 0 ? e - 1 : i.length - 1),
            (w = [i[e], s[f], s[c]]);
          var E = THREE.FontUtils.Triangulate.area(w);
          y = [i[e], i[d], s[f]];
          var F = THREE.FontUtils.Triangulate.area(y);
          x + z > E + F &&
            ((f = C),
            (e = D),
            f < 0 && (f += s.length),
            (f %= s.length),
            e < 0 && (e += i.length),
            (e %= i.length),
            (c = f - 1 >= 0 ? f - 1 : s.length - 1),
            (d = e - 1 >= 0 ? e - 1 : i.length - 1)),
            (o = s.slice(0, f)),
            (p = s.slice(f)),
            (q = i.slice(e)),
            (r = i.slice(0, e));
          var G = [i[e], s[f], s[c]],
            H = [i[e], i[d], s[f]];
          u.push(G), u.push(H), (s = o.concat(q).concat(r).concat(p));
        }
        return { shape: s, isolatedPts: u, allpoints: t };
      },
      triangulateShape: function (a, b) {
        var c,
          d,
          e,
          f,
          g,
          h,
          i = THREE.Shape.Utils.removeHoles(a, b),
          j = i.shape,
          k = i.allpoints,
          l = i.isolatedPts,
          m = THREE.FontUtils.Triangulate(j, !1),
          n = {};
        for (c = 0, d = k.length; c < d; c++)
          (g = k[c].x + ":" + k[c].y),
            void 0 !== n[g] && console.log("Duplicate point", g),
            (n[g] = c);
        for (c = 0, d = m.length; c < d; c++)
          for (f = m[c], e = 0; e < 3; e++)
            (g = f[e].x + ":" + f[e].y), (h = n[g]), void 0 !== h && (f[e] = h);
        for (c = 0, d = l.length; c < d; c++)
          for (f = l[c], e = 0; e < 3; e++)
            (g = f[e].x + ":" + f[e].y), (h = n[g]), void 0 !== h && (f[e] = h);
        return m.concat(l);
      },
      isClockWise: function (a) {
        return THREE.FontUtils.Triangulate.area(a) < 0;
      },
      b2p0: function (a, b) {
        var c = 1 - a;
        return c * c * b;
      },
      b2p1: function (a, b) {
        return 2 * (1 - a) * a * b;
      },
      b2p2: function (a, b) {
        return a * a * b;
      },
      b2: function (a, b, c, d) {
        return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d);
      },
      b3p0: function (a, b) {
        var c = 1 - a;
        return c * c * c * b;
      },
      b3p1: function (a, b) {
        var c = 1 - a;
        return 3 * c * c * a * b;
      },
      b3p2: function (a, b) {
        var c = 1 - a;
        return 3 * c * a * a * b;
      },
      b3p3: function (a, b) {
        return a * a * a * b;
      },
      b3: function (a, b, c, d, e) {
        return (
          this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
        );
      },
    }),
    (THREE.LineCurve = function (a, b) {
      (this.v1 = a), (this.v2 = b);
    }),
    (THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype)),
    (THREE.LineCurve.prototype.getPoint = function (a) {
      var b = this.v2.clone().sub(this.v1);
      return b.multiplyScalar(a).add(this.v1), b;
    }),
    (THREE.LineCurve.prototype.getPointAt = function (a) {
      return this.getPoint(a);
    }),
    (THREE.LineCurve.prototype.getTangent = function (a) {
      var b = this.v2.clone().sub(this.v1);
      return b.normalize();
    }),
    (THREE.QuadraticBezierCurve = function (a, b, c) {
      (this.v0 = a), (this.v1 = b), (this.v2 = c);
    }),
    (THREE.QuadraticBezierCurve.prototype = Object.create(
      THREE.Curve.prototype
    )),
    (THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
      var b, c;
      return (
        (b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x)),
        (c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y)),
        new THREE.Vector2(b, c)
      );
    }),
    (THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
      var b, c;
      (b = THREE.Curve.Utils.tangentQuadraticBezier(
        a,
        this.v0.x,
        this.v1.x,
        this.v2.x
      )),
        (c = THREE.Curve.Utils.tangentQuadraticBezier(
          a,
          this.v0.y,
          this.v1.y,
          this.v2.y
        ));
      var d = new THREE.Vector2(b, c);
      return d.normalize(), d;
    }),
    (THREE.CubicBezierCurve = function (a, b, c, d) {
      (this.v0 = a), (this.v1 = b), (this.v2 = c), (this.v3 = d);
    }),
    (THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype)),
    (THREE.CubicBezierCurve.prototype.getPoint = function (a) {
      var b, c;
      return (
        (b = THREE.Shape.Utils.b3(
          a,
          this.v0.x,
          this.v1.x,
          this.v2.x,
          this.v3.x
        )),
        (c = THREE.Shape.Utils.b3(
          a,
          this.v0.y,
          this.v1.y,
          this.v2.y,
          this.v3.y
        )),
        new THREE.Vector2(b, c)
      );
    }),
    (THREE.CubicBezierCurve.prototype.getTangent = function (a) {
      var b, c;
      (b = THREE.Curve.Utils.tangentCubicBezier(
        a,
        this.v0.x,
        this.v1.x,
        this.v2.x,
        this.v3.x
      )),
        (c = THREE.Curve.Utils.tangentCubicBezier(
          a,
          this.v0.y,
          this.v1.y,
          this.v2.y,
          this.v3.y
        ));
      var d = new THREE.Vector2(b, c);
      return d.normalize(), d;
    }),
    (THREE.SplineCurve = function (a) {
      this.points = void 0 == a ? [] : a;
    }),
    (THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype)),
    (THREE.SplineCurve.prototype.getPoint = function (a) {
      var b,
        c,
        d,
        e = new THREE.Vector2(),
        f = [],
        g = this.points;
      return (
        (b = (g.length - 1) * a),
        (c = Math.floor(b)),
        (d = b - c),
        (f[0] = 0 == c ? c : c - 1),
        (f[1] = c),
        (f[2] = c > g.length - 2 ? g.length - 1 : c + 1),
        (f[3] = c > g.length - 3 ? g.length - 1 : c + 2),
        (e.x = THREE.Curve.Utils.interpolate(
          g[f[0]].x,
          g[f[1]].x,
          g[f[2]].x,
          g[f[3]].x,
          d
        )),
        (e.y = THREE.Curve.Utils.interpolate(
          g[f[0]].y,
          g[f[1]].y,
          g[f[2]].y,
          g[f[3]].y,
          d
        )),
        e
      );
    }),
    (THREE.EllipseCurve = function (a, b, c, d, e, f, g) {
      (this.aX = a),
        (this.aY = b),
        (this.xRadius = c),
        (this.yRadius = d),
        (this.aStartAngle = e),
        (this.aEndAngle = f),
        (this.aClockwise = g);
    }),
    (THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype)),
    (THREE.EllipseCurve.prototype.getPoint = function (a) {
      var b = this.aEndAngle - this.aStartAngle;
      this.aClockwise || (a = 1 - a);
      var c = this.aStartAngle + a * b,
        d = this.aX + this.xRadius * Math.cos(c),
        e = this.aY + this.yRadius * Math.sin(c);
      return new THREE.Vector2(d, e);
    }),
    (THREE.ArcCurve = function (a, b, c, d, e, f) {
      THREE.EllipseCurve.call(this, a, b, c, c, d, e, f);
    }),
    (THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype)),
    (THREE.LineCurve3 = THREE.Curve.create(
      function (a, b) {
        (this.v1 = a), (this.v2 = b);
      },
      function (a) {
        var b = new THREE.Vector3();
        return (
          b.subVectors(this.v2, this.v1), b.multiplyScalar(a), b.add(this.v1), b
        );
      }
    )),
    (THREE.QuadraticBezierCurve3 = THREE.Curve.create(
      function (a, b, c) {
        (this.v0 = a), (this.v1 = b), (this.v2 = c);
      },
      function (a) {
        var b, c, d;
        return (
          (b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x)),
          (c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y)),
          (d = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z)),
          new THREE.Vector3(b, c, d)
        );
      }
    )),
    (THREE.CubicBezierCurve3 = THREE.Curve.create(
      function (a, b, c, d) {
        (this.v0 = a), (this.v1 = b), (this.v2 = c), (this.v3 = d);
      },
      function (a) {
        var b, c, d;
        return (
          (b = THREE.Shape.Utils.b3(
            a,
            this.v0.x,
            this.v1.x,
            this.v2.x,
            this.v3.x
          )),
          (c = THREE.Shape.Utils.b3(
            a,
            this.v0.y,
            this.v1.y,
            this.v2.y,
            this.v3.y
          )),
          (d = THREE.Shape.Utils.b3(
            a,
            this.v0.z,
            this.v1.z,
            this.v2.z,
            this.v3.z
          )),
          new THREE.Vector3(b, c, d)
        );
      }
    )),
    (THREE.SplineCurve3 = THREE.Curve.create(
      function (a) {
        this.points = void 0 == a ? [] : a;
      },
      function (a) {
        var b,
          c,
          d,
          e = new THREE.Vector3(),
          f = [],
          g = this.points;
        (b = (g.length - 1) * a),
          (c = Math.floor(b)),
          (d = b - c),
          (f[0] = 0 == c ? c : c - 1),
          (f[1] = c),
          (f[2] = c > g.length - 2 ? g.length - 1 : c + 1),
          (f[3] = c > g.length - 3 ? g.length - 1 : c + 2);
        var h = g[f[0]],
          i = g[f[1]],
          j = g[f[2]],
          k = g[f[3]];
        return (
          (e.x = THREE.Curve.Utils.interpolate(h.x, i.x, j.x, k.x, d)),
          (e.y = THREE.Curve.Utils.interpolate(h.y, i.y, j.y, k.y, d)),
          (e.z = THREE.Curve.Utils.interpolate(h.z, i.z, j.z, k.z, d)),
          e
        );
      }
    )),
    (THREE.ClosedSplineCurve3 = THREE.Curve.create(
      function (a) {
        this.points = void 0 == a ? [] : a;
      },
      function (a) {
        var b,
          c,
          d,
          e = new THREE.Vector3(),
          f = [],
          g = this.points;
        return (
          (b = (g.length - 0) * a),
          (c = Math.floor(b)),
          (d = b - c),
          (c +=
            c > 0 ? 0 : (Math.floor(Math.abs(c) / g.length) + 1) * g.length),
          (f[0] = (c - 1) % g.length),
          (f[1] = c % g.length),
          (f[2] = (c + 1) % g.length),
          (f[3] = (c + 2) % g.length),
          (e.x = THREE.Curve.Utils.interpolate(
            g[f[0]].x,
            g[f[1]].x,
            g[f[2]].x,
            g[f[3]].x,
            d
          )),
          (e.y = THREE.Curve.Utils.interpolate(
            g[f[0]].y,
            g[f[1]].y,
            g[f[2]].y,
            g[f[3]].y,
            d
          )),
          (e.z = THREE.Curve.Utils.interpolate(
            g[f[0]].z,
            g[f[1]].z,
            g[f[2]].z,
            g[f[3]].z,
            d
          )),
          e
        );
      }
    )),
    (THREE.AnimationHandler = (function () {
      var a = [],
        b = {},
        c = {};
      (c.update = function (b) {
        for (var c = 0; c < a.length; c++) a[c].update(b);
      }),
        (c.addToUpdate = function (b) {
          a.indexOf(b) === -1 && a.push(b);
        }),
        (c.removeFromUpdate = function (b) {
          var c = a.indexOf(b);
          c !== -1 && a.splice(c, 1);
        }),
        (c.add = function (a) {
          void 0 !== b[a.name] &&
            console.log(
              "THREE.AnimationHandler.add: Warning! " +
                a.name +
                " already exists in library. Overwriting."
            ),
            (b[a.name] = a),
            e(a);
        }),
        (c.get = function (a) {
          if ("string" == typeof a)
            return b[a]
              ? b[a]
              : (console.log(
                  "THREE.AnimationHandler.get: Couldn't find animation " + a
                ),
                null);
        }),
        (c.parse = function (a) {
          var b = [];
          if (a instanceof THREE.SkinnedMesh)
            for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
          else d(a, b);
          return b;
        });
      var d = function (a, b) {
          b.push(a);
          for (var c = 0; c < a.children.length; c++) d(a.children[c], b);
        },
        e = function (a) {
          if (a.initialized !== !0) {
            for (var b = 0; b < a.hierarchy.length; b++) {
              for (var c = 0; c < a.hierarchy[b].keys.length; c++)
                if (
                  (a.hierarchy[b].keys[c].time < 0 &&
                    (a.hierarchy[b].keys[c].time = 0),
                  void 0 !== a.hierarchy[b].keys[c].rot &&
                    !(a.hierarchy[b].keys[c].rot instanceof THREE.Quaternion))
                ) {
                  var d = a.hierarchy[b].keys[c].rot;
                  a.hierarchy[b].keys[c].rot = new THREE.Quaternion(
                    d[0],
                    d[1],
                    d[2],
                    d[3]
                  );
                }
              if (
                a.hierarchy[b].keys.length &&
                void 0 !== a.hierarchy[b].keys[0].morphTargets
              ) {
                for (var e = {}, c = 0; c < a.hierarchy[b].keys.length; c++)
                  for (
                    var f = 0;
                    f < a.hierarchy[b].keys[c].morphTargets.length;
                    f++
                  ) {
                    var g = a.hierarchy[b].keys[c].morphTargets[f];
                    e[g] = -1;
                  }
                a.hierarchy[b].usedMorphTargets = e;
                for (var c = 0; c < a.hierarchy[b].keys.length; c++) {
                  var h = {};
                  for (var g in e) {
                    for (
                      var f = 0;
                      f < a.hierarchy[b].keys[c].morphTargets.length;
                      f++
                    )
                      if (a.hierarchy[b].keys[c].morphTargets[f] === g) {
                        h[g] = a.hierarchy[b].keys[c].morphTargetsInfluences[f];
                        break;
                      }
                    f === a.hierarchy[b].keys[c].morphTargets.length &&
                      (h[g] = 0);
                  }
                  a.hierarchy[b].keys[c].morphTargetsInfluences = h;
                }
              }
              for (var c = 1; c < a.hierarchy[b].keys.length; c++)
                a.hierarchy[b].keys[c].time ===
                  a.hierarchy[b].keys[c - 1].time &&
                  (a.hierarchy[b].keys.splice(c, 1), c--);
              for (var c = 0; c < a.hierarchy[b].keys.length; c++)
                a.hierarchy[b].keys[c].index = c;
            }
            var i = parseInt(a.length * a.fps, 10);
            (a.JIT = {}), (a.JIT.hierarchy = []);
            for (var b = 0; b < a.hierarchy.length; b++)
              a.JIT.hierarchy.push(new Array(i));
            a.initialized = !0;
          }
        };
      return (c.LINEAR = 0), (c.CATMULLROM = 1), (c.CATMULLROM_FORWARD = 2), c;
    })()),
    (THREE.CubeCamera = function (a, b, c) {
      THREE.Object3D.call(this);
      var d = 90,
        e = 1,
        f = new THREE.PerspectiveCamera(d, e, a, b);
      f.up.set(0, -1, 0), f.lookAt(new THREE.Vector3(1, 0, 0)), this.add(f);
      var g = new THREE.PerspectiveCamera(d, e, a, b);
      g.up.set(0, -1, 0), g.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(g);
      var h = new THREE.PerspectiveCamera(d, e, a, b);
      h.up.set(0, 0, 1), h.lookAt(new THREE.Vector3(0, 1, 0)), this.add(h);
      var i = new THREE.PerspectiveCamera(d, e, a, b);
      i.up.set(0, 0, -1), i.lookAt(new THREE.Vector3(0, -1, 0)), this.add(i);
      var j = new THREE.PerspectiveCamera(d, e, a, b);
      j.up.set(0, -1, 0), j.lookAt(new THREE.Vector3(0, 0, 1)), this.add(j);
      var k = new THREE.PerspectiveCamera(d, e, a, b);
      k.up.set(0, -1, 0),
        k.lookAt(new THREE.Vector3(0, 0, -1)),
        this.add(k),
        (this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
          format: THREE.RGBFormat,
          magFilter: THREE.LinearFilter,
          minFilter: THREE.LinearFilter,
        })),
        (this.updateCubeMap = function (a, b) {
          var c = this.renderTarget,
            d = c.generateMipmaps;
          (c.generateMipmaps = !1),
            (c.activeCubeFace = 0),
            a.render(b, f, c),
            (c.activeCubeFace = 1),
            a.render(b, g, c),
            (c.activeCubeFace = 2),
            a.render(b, h, c),
            (c.activeCubeFace = 3),
            a.render(b, i, c),
            (c.activeCubeFace = 4),
            a.render(b, j, c),
            (c.generateMipmaps = d),
            (c.activeCubeFace = 5),
            a.render(b, k, c);
        });
    }),
    (THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.CombinedCamera = function (a, b, c, d, e, f, g) {
      THREE.Camera.call(this),
        (this.fov = c),
        (this.left = -a / 2),
        (this.right = a / 2),
        (this.top = b / 2),
        (this.bottom = -b / 2),
        (this.cameraO = new THREE.OrthographicCamera(
          a / -2,
          a / 2,
          b / 2,
          b / -2,
          f,
          g
        )),
        (this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e)),
        (this.zoom = 1),
        this.toPerspective();
    }),
    (THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype)),
    (THREE.CombinedCamera.prototype.toPerspective = function () {
      (this.near = this.cameraP.near),
        (this.far = this.cameraP.far),
        (this.cameraP.fov = this.fov / this.zoom),
        this.cameraP.updateProjectionMatrix(),
        (this.projectionMatrix = this.cameraP.projectionMatrix),
        (this.inPerspectiveMode = !0),
        (this.inOrthographicMode = !1);
    }),
    (THREE.CombinedCamera.prototype.toOrthographic = function () {
      var a = this.fov,
        b = this.cameraP.aspect,
        c = this.cameraP.near,
        d = this.cameraP.far,
        e = (c + d) / 2,
        f = Math.tan(a / 2) * e,
        g = 2 * f,
        h = g * b,
        i = h / 2;
      (f /= this.zoom),
        (i /= this.zoom),
        (this.cameraO.left = -i),
        (this.cameraO.right = i),
        (this.cameraO.top = f),
        (this.cameraO.bottom = -f),
        this.cameraO.updateProjectionMatrix(),
        (this.near = this.cameraO.near),
        (this.far = this.cameraO.far),
        (this.projectionMatrix = this.cameraO.projectionMatrix),
        (this.inPerspectiveMode = !1),
        (this.inOrthographicMode = !0);
    }),
    (THREE.CombinedCamera.prototype.setSize = function (a, b) {
      (this.cameraP.aspect = a / b),
        (this.left = -a / 2),
        (this.right = a / 2),
        (this.top = b / 2),
        (this.bottom = -b / 2);
    }),
    (THREE.CombinedCamera.prototype.setFov = function (a) {
      (this.fov = a),
        this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
    }),
    (THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
      this.inPerspectiveMode
        ? this.toPerspective()
        : (this.toPerspective(), this.toOrthographic());
    }),
    (THREE.CombinedCamera.prototype.setLens = function (a, b) {
      void 0 === b && (b = 24);
      var c = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
      return this.setFov(c), c;
    }),
    (THREE.CombinedCamera.prototype.setZoom = function (a) {
      (this.zoom = a),
        this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
    }),
    (THREE.CombinedCamera.prototype.toFrontView = function () {
      (this.rotation.x = 0),
        (this.rotation.y = 0),
        (this.rotation.z = 0),
        (this.rotationAutoUpdate = !1);
    }),
    (THREE.CombinedCamera.prototype.toBackView = function () {
      (this.rotation.x = 0),
        (this.rotation.y = Math.PI),
        (this.rotation.z = 0),
        (this.rotationAutoUpdate = !1);
    }),
    (THREE.CombinedCamera.prototype.toLeftView = function () {
      (this.rotation.x = 0),
        (this.rotation.y = -Math.PI / 2),
        (this.rotation.z = 0),
        (this.rotationAutoUpdate = !1);
    }),
    (THREE.CombinedCamera.prototype.toRightView = function () {
      (this.rotation.x = 0),
        (this.rotation.y = Math.PI / 2),
        (this.rotation.z = 0),
        (this.rotationAutoUpdate = !1);
    }),
    (THREE.CombinedCamera.prototype.toTopView = function () {
      (this.rotation.x = -Math.PI / 2),
        (this.rotation.y = 0),
        (this.rotation.z = 0),
        (this.rotationAutoUpdate = !1);
    }),
    (THREE.CombinedCamera.prototype.toBottomView = function () {
      (this.rotation.x = Math.PI / 2),
        (this.rotation.y = 0),
        (this.rotation.z = 0),
        (this.rotationAutoUpdate = !1);
    }),
    (THREE.CircleGeometry = function (a, b, c, d) {
      THREE.Geometry.call(this),
        (a = a || 50),
        (c = void 0 !== c ? c : 0),
        (d = void 0 !== d ? d : 2 * Math.PI),
        (b = void 0 !== b ? Math.max(3, b) : 8);
      var e,
        f = [],
        g = new THREE.Vector3(),
        h = new THREE.Vector2(0.5, 0.5);
      for (this.vertices.push(g), f.push(h), e = 0; e <= b; e++) {
        var i = new THREE.Vector3(),
          j = c + (e / b) * d;
        (i.x = a * Math.cos(j)),
          (i.y = a * Math.sin(j)),
          this.vertices.push(i),
          f.push(new THREE.Vector2((i.x / a + 1) / 2, (i.y / a + 1) / 2));
      }
      var k = new THREE.Vector3(0, 0, 1);
      for (e = 1; e <= b; e++) {
        var l = e,
          m = e + 1,
          n = 0;
        this.faces.push(new THREE.Face3(l, m, n, [k, k, k])),
          this.faceVertexUvs[0].push([f[e], f[e + 1], h]);
      }
      this.computeCentroids(),
        this.computeFaceNormals(),
        (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), a));
    }),
    (THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.CubeGeometry = function (a, b, c, d, e, f) {
      function g(a, b, c, d, e, f, g, i) {
        var j,
          k,
          l,
          m = h.widthSegments,
          n = h.heightSegments,
          o = e / 2,
          p = f / 2,
          q = h.vertices.length;
        ("x" === a && "y" === b) || ("y" === a && "x" === b)
          ? (j = "z")
          : ("x" === a && "z" === b) || ("z" === a && "x" === b)
          ? ((j = "y"), (n = h.depthSegments))
          : (("z" === a && "y" === b) || ("y" === a && "z" === b)) &&
            ((j = "x"), (m = h.depthSegments));
        var r = m + 1,
          s = n + 1,
          t = e / m,
          u = f / n,
          v = new THREE.Vector3();
        for (v[j] = g > 0 ? 1 : -1, l = 0; l < s; l++)
          for (k = 0; k < r; k++) {
            var w = new THREE.Vector3();
            (w[a] = (k * t - o) * c),
              (w[b] = (l * u - p) * d),
              (w[j] = g),
              h.vertices.push(w);
          }
        for (l = 0; l < n; l++)
          for (k = 0; k < m; k++) {
            var x = k + r * l,
              y = k + r * (l + 1),
              z = k + 1 + r * (l + 1),
              A = k + 1 + r * l,
              B = new THREE.Face4(x + q, y + q, z + q, A + q);
            B.normal.copy(v),
              B.vertexNormals.push(v.clone(), v.clone(), v.clone(), v.clone()),
              (B.materialIndex = i),
              h.faces.push(B),
              h.faceVertexUvs[0].push([
                new THREE.Vector2(k / m, 1 - l / n),
                new THREE.Vector2(k / m, 1 - (l + 1) / n),
                new THREE.Vector2((k + 1) / m, 1 - (l + 1) / n),
                new THREE.Vector2((k + 1) / m, 1 - l / n),
              ]);
          }
      }
      THREE.Geometry.call(this);
      var h = this;
      (this.width = a),
        (this.height = b),
        (this.depth = c),
        (this.widthSegments = d || 1),
        (this.heightSegments = e || 1),
        (this.depthSegments = f || 1);
      var i = this.width / 2,
        j = this.height / 2,
        k = this.depth / 2;
      g("z", "y", -1, -1, this.depth, this.height, i, 0),
        g("z", "y", 1, -1, this.depth, this.height, -i, 1),
        g("x", "z", 1, 1, this.width, this.depth, j, 2),
        g("x", "z", 1, -1, this.width, this.depth, -j, 3),
        g("x", "y", 1, -1, this.width, this.height, k, 4),
        g("x", "y", -1, -1, this.width, this.height, -k, 5),
        this.computeCentroids(),
        this.mergeVertices();
    }),
    (THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.CylinderGeometry = function (a, b, c, d, e, f) {
      THREE.Geometry.call(this),
        (this.radiusTop = a = void 0 !== a ? a : 20),
        (this.radiusBottom = b = void 0 !== b ? b : 20),
        (this.height = c = void 0 !== c ? c : 100),
        (this.radialSegments = d = d || 8),
        (this.heightSegments = e = e || 1),
        (this.openEnded = f = void 0 !== f && f);
      var g,
        h,
        i = c / 2,
        j = [],
        k = [];
      for (h = 0; h <= e; h++) {
        var l = [],
          m = [],
          n = h / e,
          o = n * (b - a) + a;
        for (g = 0; g <= d; g++) {
          var p = g / d,
            q = new THREE.Vector3();
          (q.x = o * Math.sin(p * Math.PI * 2)),
            (q.y = -n * c + i),
            (q.z = o * Math.cos(p * Math.PI * 2)),
            this.vertices.push(q),
            l.push(this.vertices.length - 1),
            m.push(new THREE.Vector2(p, 1 - n));
        }
        j.push(l), k.push(m);
      }
      var r,
        s,
        t = (b - a) / c;
      for (g = 0; g < d; g++)
        for (
          0 !== a
            ? ((r = this.vertices[j[0][g]].clone()),
              (s = this.vertices[j[0][g + 1]].clone()))
            : ((r = this.vertices[j[1][g]].clone()),
              (s = this.vertices[j[1][g + 1]].clone())),
            r.setY(Math.sqrt(r.x * r.x + r.z * r.z) * t).normalize(),
            s.setY(Math.sqrt(s.x * s.x + s.z * s.z) * t).normalize(),
            h = 0;
          h < e;
          h++
        ) {
          var u = j[h][g],
            v = j[h + 1][g],
            w = j[h + 1][g + 1],
            x = j[h][g + 1],
            y = r.clone(),
            z = r.clone(),
            A = s.clone(),
            B = s.clone(),
            C = k[h][g].clone(),
            D = k[h + 1][g].clone(),
            E = k[h + 1][g + 1].clone(),
            F = k[h][g + 1].clone();
          this.faces.push(new THREE.Face4(u, v, w, x, [y, z, A, B])),
            this.faceVertexUvs[0].push([C, D, E, F]);
        }
      if (f === !1 && a > 0)
        for (
          this.vertices.push(new THREE.Vector3(0, i, 0)), g = 0;
          g < d;
          g++
        ) {
          var u = j[0][g],
            v = j[0][g + 1],
            w = this.vertices.length - 1,
            y = new THREE.Vector3(0, 1, 0),
            z = new THREE.Vector3(0, 1, 0),
            A = new THREE.Vector3(0, 1, 0),
            C = k[0][g].clone(),
            D = k[0][g + 1].clone(),
            E = new THREE.Vector2(D.u, 0);
          this.faces.push(new THREE.Face3(u, v, w, [y, z, A])),
            this.faceVertexUvs[0].push([C, D, E]);
        }
      if (f === !1 && b > 0)
        for (
          this.vertices.push(new THREE.Vector3(0, -i, 0)), g = 0;
          g < d;
          g++
        ) {
          var u = j[h][g + 1],
            v = j[h][g],
            w = this.vertices.length - 1,
            y = new THREE.Vector3(0, -1, 0),
            z = new THREE.Vector3(0, -1, 0),
            A = new THREE.Vector3(0, -1, 0),
            C = k[h][g + 1].clone(),
            D = k[h][g].clone(),
            E = new THREE.Vector2(D.u, 1);
          this.faces.push(new THREE.Face3(u, v, w, [y, z, A])),
            this.faceVertexUvs[0].push([C, D, E]);
        }
      this.computeCentroids(), this.computeFaceNormals();
    }),
    (THREE.CylinderGeometry.prototype = Object.create(
      THREE.Geometry.prototype
    )),
    (THREE.ExtrudeGeometry = function (a, b) {
      return "undefined" == typeof a
        ? void (a = [])
        : (THREE.Geometry.call(this),
          (a = a instanceof Array ? a : [a]),
          (this.shapebb = a[a.length - 1].getBoundingBox()),
          this.addShapeList(a, b),
          this.computeCentroids(),
          void this.computeFaceNormals());
    }),
    (THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b) {
      for (var c = a.length, d = 0; d < c; d++) {
        var e = a[d];
        this.addShape(e, b);
      }
    }),
    (THREE.ExtrudeGeometry.prototype.addShape = function (a, b) {
      function c(a, b, c) {
        return b || console.log("die"), b.clone().multiplyScalar(c).add(a);
      }
      function d(a, b, c) {
        return f(a, b, c);
      }
      function e(a, b, c) {
        var d = Math.atan2(b.y - a.y, b.x - a.x),
          e = Math.atan2(c.y - a.y, c.x - a.x);
        d > e && (e += 2 * Math.PI);
        var f = (d + e) / 2,
          g = -Math.cos(f),
          h = -Math.sin(f),
          i = new THREE.Vector2(g, h);
        return i;
      }
      function f(a, b, c) {
        var d,
          f,
          g,
          h,
          i,
          j,
          k = THREE.ExtrudeGeometry.__v1,
          l = THREE.ExtrudeGeometry.__v2,
          m = THREE.ExtrudeGeometry.__v3,
          n = THREE.ExtrudeGeometry.__v4,
          o = THREE.ExtrudeGeometry.__v5,
          p = THREE.ExtrudeGeometry.__v6;
        return (
          k.set(a.x - b.x, a.y - b.y),
          l.set(a.x - c.x, a.y - c.y),
          (d = k.normalize()),
          (f = l.normalize()),
          m.set(-d.y, d.x),
          n.set(f.y, -f.x),
          o.copy(a).add(m),
          p.copy(a).add(n),
          o.equals(p)
            ? n.clone()
            : (o.copy(b).add(m),
              p.copy(c).add(n),
              (g = d.dot(n)),
              (h = p.sub(o).dot(n)),
              0 === g &&
                (console.log("Either infinite or no solutions!"),
                0 === h
                  ? console.log("Its finite solutions.")
                  : console.log("Too bad, no solutions.")),
              (i = h / g),
              i < 0
                ? e(a, b, c)
                : ((j = d.multiplyScalar(i).add(o)), j.sub(a).clone()))
        );
      }
      function g() {
        if (v) {
          var a = 0,
            b = U * a;
          for (X = 0; X < V; X++)
            (T = M[X]), k(T[2] + b, T[1] + b, T[0] + b, !0);
          for (a = x + 2 * u, b = U * a, X = 0; X < V; X++)
            (T = M[X]), k(T[0] + b, T[1] + b, T[2] + b, !1);
        } else {
          for (X = 0; X < V; X++) (T = M[X]), k(T[2], T[1], T[0], !0);
          for (X = 0; X < V; X++)
            (T = M[X]), k(T[0] + U * x, T[1] + U * x, T[2] + U * x, !1);
        }
      }
      function h() {
        var a = 0;
        for (i(N, a), a += N.length, E = 0, F = K.length; E < F; E++)
          (D = K[E]), i(D, a), (a += D.length);
      }
      function i(a, b) {
        var c, d;
        for (X = a.length; --X >= 0; ) {
          (c = X), (d = X - 1), d < 0 && (d = a.length - 1);
          var e = 0,
            f = x + 2 * u;
          for (e = 0; e < f; e++) {
            var g = U * e,
              h = U * (e + 1),
              i = b + c + g,
              j = b + d + g,
              k = b + d + h,
              m = b + c + h;
            l(i, j, k, m, a, e, f, c, d);
          }
        }
      }
      function j(a, b, c) {
        G.vertices.push(new THREE.Vector3(a, b, c));
      }
      function k(c, d, e, f) {
        (c += H),
          (d += H),
          (e += H),
          G.faces.push(new THREE.Face3(c, d, e, null, null, A));
        var g = f
          ? C.generateBottomUV(G, a, b, c, d, e)
          : C.generateTopUV(G, a, b, c, d, e);
        G.faceVertexUvs[0].push(g);
      }
      function l(c, d, e, f, g, h, i, j, k) {
        (c += H),
          (d += H),
          (e += H),
          (f += H),
          G.faces.push(new THREE.Face4(c, d, e, f, null, null, B));
        var l = C.generateSideWallUV(G, a, g, b, c, d, e, f, h, i, j, k);
        G.faceVertexUvs[0].push(l);
      }
      var m,
        n,
        o,
        p,
        q,
        r = void 0 !== b.amount ? b.amount : 100,
        s = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
        t = void 0 !== b.bevelSize ? b.bevelSize : s - 2,
        u = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
        v = void 0 === b.bevelEnabled || b.bevelEnabled,
        w = void 0 !== b.curveSegments ? b.curveSegments : 12,
        x = void 0 !== b.steps ? b.steps : 1,
        y = b.extrudePath,
        z = !1,
        A = b.material,
        B = b.extrudeMaterial,
        C =
          void 0 !== b.UVGenerator
            ? b.UVGenerator
            : THREE.ExtrudeGeometry.WorldUVGenerator;
      this.shapebb;
      y &&
        ((m = y.getSpacedPoints(x)),
        (z = !0),
        (v = !1),
        (n =
          void 0 !== b.frames
            ? b.frames
            : new THREE.TubeGeometry.FrenetFrames(y, x, !1)),
        (o = new THREE.Vector3()),
        (p = new THREE.Vector3()),
        (q = new THREE.Vector3())),
        v || ((u = 0), (s = 0), (t = 0));
      var D,
        E,
        F,
        G = this,
        H = this.vertices.length,
        I = a.extractPoints(w),
        J = I.shape,
        K = I.holes,
        L = !THREE.Shape.Utils.isClockWise(J);
      if (L) {
        for (J = J.reverse(), E = 0, F = K.length; E < F; E++)
          (D = K[E]), THREE.Shape.Utils.isClockWise(D) && (K[E] = D.reverse());
        L = !1;
      }
      var M = THREE.Shape.Utils.triangulateShape(J, K),
        N = J;
      for (E = 0, F = K.length; E < F; E++) (D = K[E]), (J = J.concat(D));
      for (
        var O,
          P,
          Q,
          R,
          S,
          T,
          U = J.length,
          V = M.length,
          W = (N.length, 180 / Math.PI, []),
          X = 0,
          Y = N.length,
          Z = Y - 1,
          $ = X + 1;
        X < Y;
        X++, Z++, $++
      ) {
        Z === Y && (Z = 0), $ === Y && ($ = 0);
        N[X], N[Z], N[$];
        W[X] = d(N[X], N[Z], N[$]);
      }
      var _,
        aa = [],
        ba = W.concat();
      for (E = 0, F = K.length; E < F; E++) {
        for (
          D = K[E], _ = [], X = 0, Y = D.length, Z = Y - 1, $ = X + 1;
          X < Y;
          X++, Z++, $++
        )
          Z === Y && (Z = 0), $ === Y && ($ = 0), (_[X] = d(D[X], D[Z], D[$]));
        aa.push(_), (ba = ba.concat(_));
      }
      for (O = 0; O < u; O++) {
        for (
          Q = O / u,
            R = s * (1 - Q),
            P = t * Math.sin((Q * Math.PI) / 2),
            X = 0,
            Y = N.length;
          X < Y;
          X++
        )
          (S = c(N[X], W[X], P)), j(S.x, S.y, -R);
        for (E = 0, F = K.length; E < F; E++)
          for (D = K[E], _ = aa[E], X = 0, Y = D.length; X < Y; X++)
            (S = c(D[X], _[X], P)), j(S.x, S.y, -R);
      }
      for (P = t, X = 0; X < U; X++)
        (S = v ? c(J[X], ba[X], P) : J[X]),
          z
            ? (p.copy(n.normals[0]).multiplyScalar(S.x),
              o.copy(n.binormals[0]).multiplyScalar(S.y),
              q.copy(m[0]).add(p).add(o),
              j(q.x, q.y, q.z))
            : j(S.x, S.y, 0);
      var ca;
      for (ca = 1; ca <= x; ca++)
        for (X = 0; X < U; X++)
          (S = v ? c(J[X], ba[X], P) : J[X]),
            z
              ? (p.copy(n.normals[ca]).multiplyScalar(S.x),
                o.copy(n.binormals[ca]).multiplyScalar(S.y),
                q.copy(m[ca]).add(p).add(o),
                j(q.x, q.y, q.z))
              : j(S.x, S.y, (r / x) * ca);
      for (O = u - 1; O >= 0; O--) {
        for (
          Q = O / u,
            R = s * (1 - Q),
            P = t * Math.sin((Q * Math.PI) / 2),
            X = 0,
            Y = N.length;
          X < Y;
          X++
        )
          (S = c(N[X], W[X], P)), j(S.x, S.y, r + R);
        for (E = 0, F = K.length; E < F; E++)
          for (D = K[E], _ = aa[E], X = 0, Y = D.length; X < Y; X++)
            (S = c(D[X], _[X], P)),
              z ? j(S.x, S.y + m[x - 1].y, m[x - 1].x + R) : j(S.x, S.y, r + R);
      }
      g(), h();
    }),
    (THREE.ExtrudeGeometry.WorldUVGenerator = {
      generateTopUV: function (a, b, c, d, e, f) {
        var g = a.vertices[d].x,
          h = a.vertices[d].y,
          i = a.vertices[e].x,
          j = a.vertices[e].y,
          k = a.vertices[f].x,
          l = a.vertices[f].y;
        return [
          new THREE.Vector2(g, h),
          new THREE.Vector2(i, j),
          new THREE.Vector2(k, l),
        ];
      },
      generateBottomUV: function (a, b, c, d, e, f) {
        return this.generateTopUV(a, b, c, d, e, f);
      },
      generateSideWallUV: function (a, b, c, d, e, f, g, h, i, j, k, l) {
        var m = a.vertices[e].x,
          n = a.vertices[e].y,
          o = a.vertices[e].z,
          p = a.vertices[f].x,
          q = a.vertices[f].y,
          r = a.vertices[f].z,
          s = a.vertices[g].x,
          t = a.vertices[g].y,
          u = a.vertices[g].z,
          v = a.vertices[h].x,
          w = a.vertices[h].y,
          x = a.vertices[h].z;
        return Math.abs(n - q) < 0.01
          ? [
              new THREE.Vector2(m, 1 - o),
              new THREE.Vector2(p, 1 - r),
              new THREE.Vector2(s, 1 - u),
              new THREE.Vector2(v, 1 - x),
            ]
          : [
              new THREE.Vector2(n, 1 - o),
              new THREE.Vector2(q, 1 - r),
              new THREE.Vector2(t, 1 - u),
              new THREE.Vector2(w, 1 - x),
            ];
      },
    }),
    (THREE.ExtrudeGeometry.__v1 = new THREE.Vector2()),
    (THREE.ExtrudeGeometry.__v2 = new THREE.Vector2()),
    (THREE.ExtrudeGeometry.__v3 = new THREE.Vector2()),
    (THREE.ExtrudeGeometry.__v4 = new THREE.Vector2()),
    (THREE.ExtrudeGeometry.__v5 = new THREE.Vector2()),
    (THREE.ExtrudeGeometry.__v6 = new THREE.Vector2()),
    (THREE.ShapeGeometry = function (a, b) {
      THREE.Geometry.call(this),
        a instanceof Array == !1 && (a = [a]),
        (this.shapebb = a[a.length - 1].getBoundingBox()),
        this.addShapeList(a, b),
        this.computeCentroids(),
        this.computeFaceNormals();
    }),
    (THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.ShapeGeometry.prototype.addShapeList = function (a, b) {
      for (var c = 0, d = a.length; c < d; c++) this.addShape(a[c], b);
      return this;
    }),
    (THREE.ShapeGeometry.prototype.addShape = function (a, b) {
      void 0 === b && (b = {});
      var c,
        d,
        e,
        f = void 0 !== b.curveSegments ? b.curveSegments : 12,
        g = b.material,
        h =
          void 0 === b.UVGenerator
            ? THREE.ExtrudeGeometry.WorldUVGenerator
            : b.UVGenerator,
        i = (this.shapebb, this.vertices.length),
        j = a.extractPoints(f),
        k = j.shape,
        l = j.holes,
        m = !THREE.Shape.Utils.isClockWise(k);
      if (m) {
        for (k = k.reverse(), c = 0, d = l.length; c < d; c++)
          (e = l[c]), THREE.Shape.Utils.isClockWise(e) && (l[c] = e.reverse());
        m = !1;
      }
      var n = THREE.Shape.Utils.triangulateShape(k, l),
        o = k;
      for (c = 0, d = l.length; c < d; c++) (e = l[c]), (k = k.concat(e));
      var p,
        q,
        r = k.length,
        s = n.length;
      o.length;
      for (c = 0; c < r; c++)
        (p = k[c]), this.vertices.push(new THREE.Vector3(p.x, p.y, 0));
      for (c = 0; c < s; c++) {
        q = n[c];
        var t = q[0] + i,
          u = q[1] + i,
          v = q[2] + i;
        this.faces.push(new THREE.Face3(t, u, v, null, null, g)),
          this.faceVertexUvs[0].push(h.generateBottomUV(this, a, b, t, u, v));
      }
    }),
    (THREE.LatheGeometry = function (a, b, c, d) {
      THREE.Geometry.call(this),
        (b = b || 12),
        (c = c || 0),
        (d = d || 2 * Math.PI);
      for (var e = 1 / (a.length - 1), f = 1 / b, g = 0, h = b; g <= h; g++)
        for (
          var i = c + g * f * d,
            j = Math.cos(i),
            k = Math.sin(i),
            l = 0,
            m = a.length;
          l < m;
          l++
        ) {
          var n = a[l],
            o = new THREE.Vector3();
          (o.x = j * n.x - k * n.y),
            (o.y = k * n.x + j * n.y),
            (o.z = n.z),
            this.vertices.push(o);
        }
      for (var p = a.length, g = 0, h = b; g < h; g++)
        for (var l = 0, m = a.length - 1; l < m; l++) {
          var q = l + p * g,
            r = q,
            s = q + p,
            j = q + 1 + p,
            t = q + 1;
          this.faces.push(new THREE.Face4(r, s, j, t));
          var u = g * f,
            v = l * e,
            w = u + f,
            x = v + e;
          this.faceVertexUvs[0].push([
            new THREE.Vector2(u, v),
            new THREE.Vector2(w, v),
            new THREE.Vector2(w, x),
            new THREE.Vector2(u, x),
          ]);
        }
      this.mergeVertices(),
        this.computeCentroids(),
        this.computeFaceNormals(),
        this.computeVertexNormals();
    }),
    (THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.PlaneGeometry = function (a, b, c, d) {
      THREE.Geometry.call(this),
        (this.width = a),
        (this.height = b),
        (this.widthSegments = c || 1),
        (this.heightSegments = d || 1);
      var e,
        f,
        g = a / 2,
        h = b / 2,
        i = this.widthSegments,
        j = this.heightSegments,
        k = i + 1,
        l = j + 1,
        m = this.width / i,
        n = this.height / j,
        o = new THREE.Vector3(0, 0, 1);
      for (f = 0; f < l; f++)
        for (e = 0; e < k; e++) {
          var p = e * m - g,
            q = f * n - h;
          this.vertices.push(new THREE.Vector3(p, -q, 0));
        }
      for (f = 0; f < j; f++)
        for (e = 0; e < i; e++) {
          var r = e + k * f,
            s = e + k * (f + 1),
            t = e + 1 + k * (f + 1),
            u = e + 1 + k * f,
            v = new THREE.Face4(r, s, t, u);
          v.normal.copy(o),
            v.vertexNormals.push(o.clone(), o.clone(), o.clone(), o.clone()),
            this.faces.push(v),
            this.faceVertexUvs[0].push([
              new THREE.Vector2(e / i, 1 - f / j),
              new THREE.Vector2(e / i, 1 - (f + 1) / j),
              new THREE.Vector2((e + 1) / i, 1 - (f + 1) / j),
              new THREE.Vector2((e + 1) / i, 1 - f / j),
            ]);
        }
      this.computeCentroids();
    }),
    (THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.RingGeometry = function (a, b, c, d, e, f) {
      THREE.Geometry.call(this),
        (a = a || 0),
        (b = b || 50),
        (e = void 0 !== e ? e : 0),
        (f = void 0 !== f ? f : 2 * Math.PI),
        (c = void 0 !== c ? Math.max(3, c) : 8),
        (d = void 0 !== d ? Math.max(3, d) : 8);
      var g,
        h,
        i = [],
        j = a,
        k = (b - a) / d;
      for (g = 0; g <= d; g++) {
        for (h = 0; h <= c; h++) {
          var l = new THREE.Vector3(),
            m = e + (h / c) * f;
          (l.x = j * Math.cos(m)),
            (l.y = j * Math.sin(m)),
            this.vertices.push(l),
            i.push(
              new THREE.Vector2((l.x / j + 1) / 2, -(l.y / j + 1) / 2 + 1)
            );
        }
        j += k;
      }
      var n = new THREE.Vector3(0, 0, 1);
      for (g = 0; g < d; g++) {
        var o = g * c;
        for (h = 0; h <= c; h++) {
          var m = h + o,
            p = m + g,
            q = m + c + g,
            r = m + c + 1 + g;
          this.faces.push(new THREE.Face3(p, q, r, [n, n, n])),
            this.faceVertexUvs[0].push([i[p], i[q], i[r]]),
            (p = m + g),
            (q = m + c + 1 + g),
            (r = m + 1 + g),
            this.faces.push(new THREE.Face3(p, q, r, [n, n, n])),
            this.faceVertexUvs[0].push([i[p], i[q], i[r]]);
        }
      }
      this.computeCentroids(),
        this.computeFaceNormals(),
        (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), j));
    }),
    (THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.SphereGeometry = function (a, b, c, d, e, f, g) {
      THREE.Geometry.call(this),
        (this.radius = a = a || 50),
        (this.widthSegments = b = Math.max(3, Math.floor(b) || 8)),
        (this.heightSegments = c = Math.max(2, Math.floor(c) || 6)),
        (this.phiStart = d = void 0 !== d ? d : 0),
        (this.phiLength = e = void 0 !== e ? e : 2 * Math.PI),
        (this.thetaStart = f = void 0 !== f ? f : 0),
        (this.thetaLength = g = void 0 !== g ? g : Math.PI);
      var h,
        i,
        j = [],
        k = [];
      for (i = 0; i <= c; i++) {
        var l = [],
          m = [];
        for (h = 0; h <= b; h++) {
          var n = h / b,
            o = i / c,
            p = new THREE.Vector3();
          (p.x = -a * Math.cos(d + n * e) * Math.sin(f + o * g)),
            (p.y = a * Math.cos(f + o * g)),
            (p.z = a * Math.sin(d + n * e) * Math.sin(f + o * g)),
            this.vertices.push(p),
            l.push(this.vertices.length - 1),
            m.push(new THREE.Vector2(n, 1 - o));
        }
        j.push(l), k.push(m);
      }
      for (i = 0; i < this.heightSegments; i++)
        for (h = 0; h < this.widthSegments; h++) {
          var q = j[i][h + 1],
            r = j[i][h],
            s = j[i + 1][h],
            t = j[i + 1][h + 1],
            u = this.vertices[q].clone().normalize(),
            v = this.vertices[r].clone().normalize(),
            w = this.vertices[s].clone().normalize(),
            x = this.vertices[t].clone().normalize(),
            y = k[i][h + 1].clone(),
            z = k[i][h].clone(),
            A = k[i + 1][h].clone(),
            B = k[i + 1][h + 1].clone();
          Math.abs(this.vertices[q].y) === this.radius
            ? (this.faces.push(new THREE.Face3(q, s, t, [u, w, x])),
              this.faceVertexUvs[0].push([y, A, B]))
            : Math.abs(this.vertices[s].y) === this.radius
            ? (this.faces.push(new THREE.Face3(q, r, s, [u, v, w])),
              this.faceVertexUvs[0].push([y, z, A]))
            : (this.faces.push(new THREE.Face4(q, r, s, t, [u, v, w, x])),
              this.faceVertexUvs[0].push([y, z, A, B]));
        }
      this.computeCentroids(),
        this.computeFaceNormals(),
        (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), a));
    }),
    (THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.TextGeometry = function (a, b) {
      b = b || {};
      var c = THREE.FontUtils.generateShapes(a, b);
      (b.amount = void 0 !== b.height ? b.height : 50),
        void 0 === b.bevelThickness && (b.bevelThickness = 10),
        void 0 === b.bevelSize && (b.bevelSize = 8),
        void 0 === b.bevelEnabled && (b.bevelEnabled = !1),
        THREE.ExtrudeGeometry.call(this, c, b);
    }),
    (THREE.TextGeometry.prototype = Object.create(
      THREE.ExtrudeGeometry.prototype
    )),
    (THREE.TorusGeometry = function (a, b, c, d, e) {
      THREE.Geometry.call(this);
      (this.radius = a || 100),
        (this.tube = b || 40),
        (this.radialSegments = c || 8),
        (this.tubularSegments = d || 6),
        (this.arc = e || 2 * Math.PI);
      for (
        var f = new THREE.Vector3(), g = [], h = [], i = 0;
        i <= this.radialSegments;
        i++
      )
        for (var j = 0; j <= this.tubularSegments; j++) {
          var k = (j / this.tubularSegments) * this.arc,
            l = (i / this.radialSegments) * Math.PI * 2;
          (f.x = this.radius * Math.cos(k)), (f.y = this.radius * Math.sin(k));
          var m = new THREE.Vector3();
          (m.x = (this.radius + this.tube * Math.cos(l)) * Math.cos(k)),
            (m.y = (this.radius + this.tube * Math.cos(l)) * Math.sin(k)),
            (m.z = this.tube * Math.sin(l)),
            this.vertices.push(m),
            g.push(
              new THREE.Vector2(
                j / this.tubularSegments,
                i / this.radialSegments
              )
            ),
            h.push(m.clone().sub(f).normalize());
        }
      for (var i = 1; i <= this.radialSegments; i++)
        for (var j = 1; j <= this.tubularSegments; j++) {
          var n = (this.tubularSegments + 1) * i + j - 1,
            o = (this.tubularSegments + 1) * (i - 1) + j - 1,
            p = (this.tubularSegments + 1) * (i - 1) + j,
            q = (this.tubularSegments + 1) * i + j,
            r = new THREE.Face4(n, o, p, q, [h[n], h[o], h[p], h[q]]);
          r.normal.add(h[n]),
            r.normal.add(h[o]),
            r.normal.add(h[p]),
            r.normal.add(h[q]),
            r.normal.normalize(),
            this.faces.push(r),
            this.faceVertexUvs[0].push([
              g[n].clone(),
              g[o].clone(),
              g[p].clone(),
              g[q].clone(),
            ]);
        }
      this.computeCentroids();
    }),
    (THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.TubeGeometry = function (a, b, c, d, e) {
      function f(a, b, c) {
        return A.vertices.push(new THREE.Vector3(a, b, c)) - 1;
      }
      THREE.Geometry.call(this),
        (this.path = a),
        (this.segments = b || 64),
        (this.radius = c || 1),
        (this.radialSegments = d || 8),
        (this.closed = e || !1),
        (this.grid = []);
      var g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A = this,
        B = this.segments + 1,
        C = new THREE.Vector3(),
        D = new THREE.TubeGeometry.FrenetFrames(
          this.path,
          this.segments,
          this.closed
        ),
        E = D.tangents,
        F = D.normals,
        G = D.binormals;
      for (
        this.tangents = E, this.normals = F, this.binormals = G, o = 0;
        o < B;
        o++
      )
        for (
          this.grid[o] = [],
            j = o / (B - 1),
            n = a.getPointAt(j),
            g = E[o],
            h = F[o],
            i = G[o],
            p = 0;
          p < this.radialSegments;
          p++
        )
          (k = (p / this.radialSegments) * 2 * Math.PI),
            (l = -this.radius * Math.cos(k)),
            (m = this.radius * Math.sin(k)),
            C.copy(n),
            (C.x += l * h.x + m * i.x),
            (C.y += l * h.y + m * i.y),
            (C.z += l * h.z + m * i.z),
            (this.grid[o][p] = f(C.x, C.y, C.z));
      for (o = 0; o < this.segments; o++)
        for (p = 0; p < this.radialSegments; p++)
          (q = this.closed ? (o + 1) % this.segments : o + 1),
            (r = (p + 1) % this.radialSegments),
            (s = this.grid[o][p]),
            (t = this.grid[q][p]),
            (u = this.grid[q][r]),
            (v = this.grid[o][r]),
            (w = new THREE.Vector2(o / this.segments, p / this.radialSegments)),
            (x = new THREE.Vector2(
              (o + 1) / this.segments,
              p / this.radialSegments
            )),
            (y = new THREE.Vector2(
              (o + 1) / this.segments,
              (p + 1) / this.radialSegments
            )),
            (z = new THREE.Vector2(
              o / this.segments,
              (p + 1) / this.radialSegments
            )),
            this.faces.push(new THREE.Face4(s, t, u, v)),
            this.faceVertexUvs[0].push([w, x, y, z]);
      this.computeCentroids(),
        this.computeFaceNormals(),
        this.computeVertexNormals();
    }),
    (THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
    (THREE.TubeGeometry.FrenetFrames = function (a, b, c) {
      function d() {
        (n[0] = new THREE.Vector3()),
          (o[0] = new THREE.Vector3()),
          (f = Number.MAX_VALUE),
          (g = Math.abs(m[0].x)),
          (h = Math.abs(m[0].y)),
          (i = Math.abs(m[0].z)),
          g <= f && ((f = g), l.set(1, 0, 0)),
          h <= f && ((f = h), l.set(0, 1, 0)),
          i <= f && l.set(0, 0, 1),
          p.crossVectors(m[0], l).normalize(),
          n[0].crossVectors(m[0], p),
          o[0].crossVectors(m[0], n[0]);
      }
      var e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = (new THREE.Vector3(), new THREE.Vector3()),
        m = (new THREE.Vector3(), []),
        n = [],
        o = [],
        p = new THREE.Vector3(),
        q = new THREE.Matrix4(),
        r = b + 1,
        s = 1e-4;
      for (
        this.tangents = m, this.normals = n, this.binormals = o, j = 0;
        j < r;
        j++
      )
        (k = j / (r - 1)), (m[j] = a.getTangentAt(k)), m[j].normalize();
      for (d(), j = 1; j < r; j++)
        (n[j] = n[j - 1].clone()),
          (o[j] = o[j - 1].clone()),
          p.crossVectors(m[j - 1], m[j]),
          p.length() > s &&
            (p.normalize(),
            (e = Math.acos(THREE.Math.clamp(m[j - 1].dot(m[j]), -1, 1))),
            n[j].applyMatrix4(q.makeRotationAxis(p, e))),
          o[j].crossVectors(m[j], n[j]);
      if (c)
        for (
          e = Math.acos(THREE.Math.clamp(n[0].dot(n[r - 1]), -1, 1)),
            e /= r - 1,
            m[0].dot(p.crossVectors(n[0], n[r - 1])) > 0 && (e = -e),
            j = 1;
          j < r;
          j++
        )
          n[j].applyMatrix4(q.makeRotationAxis(m[j], e * j)),
            o[j].crossVectors(m[j], n[j]);
    }),
    (THREE.PolyhedronGeometry = function (a, b, c, d) {
      function e(a) {
        var b = a.normalize().clone();
        b.index = k.vertices.push(b) - 1;
        var c = h(a) / 2 / Math.PI + 0.5,
          d = i(a) / Math.PI + 0.5;
        return (b.uv = new THREE.Vector2(c, 1 - d)), b;
      }
      function f(a, b, c) {
        var d = new THREE.Face3(a.index, b.index, c.index, [
          a.clone(),
          b.clone(),
          c.clone(),
        ]);
        d.centroid.add(a).add(b).add(c).divideScalar(3), k.faces.push(d);
        var e = h(d.centroid);
        k.faceVertexUvs[0].push([j(a.uv, a, e), j(b.uv, b, e), j(c.uv, c, e)]);
      }
      function g(a, b) {
        for (
          var c = Math.pow(2, b),
            d = (Math.pow(4, b), e(k.vertices[a.a])),
            g = e(k.vertices[a.b]),
            h = e(k.vertices[a.c]),
            i = [],
            j = 0;
          j <= c;
          j++
        ) {
          i[j] = [];
          for (
            var l = e(d.clone().lerp(h, j / c)),
              m = e(g.clone().lerp(h, j / c)),
              n = c - j,
              o = 0;
            o <= n;
            o++
          )
            0 == o && j == c
              ? (i[j][o] = l)
              : (i[j][o] = e(l.clone().lerp(m, o / n)));
        }
        for (var j = 0; j < c; j++)
          for (var o = 0; o < 2 * (c - j) - 1; o++) {
            var p = Math.floor(o / 2);
            o % 2 == 0
              ? f(i[j][p + 1], i[j + 1][p], i[j][p])
              : f(i[j][p + 1], i[j + 1][p + 1], i[j + 1][p]);
          }
      }
      function h(a) {
        return Math.atan2(a.z, -a.x);
      }
      function i(a) {
        return Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z));
      }
      function j(a, b, c) {
        return (
          c < 0 && 1 === a.x && (a = new THREE.Vector2(a.x - 1, a.y)),
          0 === b.x &&
            0 === b.z &&
            (a = new THREE.Vector2(c / 2 / Math.PI + 0.5, a.y)),
          a.clone()
        );
      }
      THREE.Geometry.call(this), (c = c || 1), (d = d || 0);
      for (var k = this, l = 0, m = a.length; l < m; l++)
        e(new THREE.Vector3(a[l][0], a[l][1], a[l][2]));
      for (var n = this.vertices, o = [], l = 0, m = b.length; l < m; l++) {
        var p = n[b[l][0]],
          q = n[b[l][1]],
          r = n[b[l][2]];
        o[l] = new THREE.Face3(p.index, q.index, r.index, [
          p.clone(),
          q.clone(),
          r.clone(),
        ]);
      }
      for (var l = 0, m = o.length; l < m; l++) g(o[l], d);
      for (var l = 0, m = this.faceVertexUvs[0].length; l < m; l++) {
        var s = this.faceVertexUvs[0][l],
          t = s[0].x,
          u = s[1].x,
          v = s[2].x,
          w = Math.max(t, Math.max(u, v)),
          x = Math.min(t, Math.min(u, v));
        w > 0.9 &&
          x < 0.1 &&
          (t < 0.2 && (s[0].x += 1),
          u < 0.2 && (s[1].x += 1),
          v < 0.2 && (s[2].x += 1));
      }
      for (var l = 0, m = this.vertices.length; l < m; l++)
        this.vertices[l].multiplyScalar(c);
      this.mergeVertices(),
        this.computeCentroids(),
        this.computeFaceNormals(),
        (this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), c));
    }),
    (THREE.PolyhedronGeometry.prototype = Object.create(
      THREE.Geometry.prototype
    )),
    (THREE.IcosahedronGeometry = function (a, b) {
      (this.radius = a), (this.detail = b);
      var c = (1 + Math.sqrt(5)) / 2,
        d = [
          [-1, c, 0],
          [1, c, 0],
          [-1, -c, 0],
          [1, -c, 0],
          [0, -1, c],
          [0, 1, c],
          [0, -1, -c],
          [0, 1, -c],
          [c, 0, -1],
          [c, 0, 1],
          [-c, 0, -1],
          [-c, 0, 1],
        ],
        e = [
          [0, 11, 5],
          [0, 5, 1],
          [0, 1, 7],
          [0, 7, 10],
          [0, 10, 11],
          [1, 5, 9],
          [5, 11, 4],
          [11, 10, 2],
          [10, 7, 6],
          [7, 1, 8],
          [3, 9, 4],
          [3, 4, 2],
          [3, 2, 6],
          [3, 6, 8],
          [3, 8, 9],
          [4, 9, 5],
          [2, 4, 11],
          [6, 2, 10],
          [8, 6, 7],
          [9, 8, 1],
        ];
      THREE.PolyhedronGeometry.call(this, d, e, a, b);
    }),
    (THREE.IcosahedronGeometry.prototype = Object.create(
      THREE.Geometry.prototype
    )),
    (THREE.OctahedronGeometry = function (a, b) {
      var c = [
          [1, 0, 0],
          [-1, 0, 0],
          [0, 1, 0],
          [0, -1, 0],
          [0, 0, 1],
          [0, 0, -1],
        ],
        d = [
          [0, 2, 4],
          [0, 4, 3],
          [0, 3, 5],
          [0, 5, 2],
          [1, 2, 5],
          [1, 5, 3],
          [1, 3, 4],
          [1, 4, 2],
        ];
      THREE.PolyhedronGeometry.call(this, c, d, a, b);
    }),
    (THREE.OctahedronGeometry.prototype = Object.create(
      THREE.Geometry.prototype
    )),
    (THREE.TetrahedronGeometry = function (a, b) {
      var c = [
          [1, 1, 1],
          [-1, -1, 1],
          [-1, 1, -1],
          [1, -1, -1],
        ],
        d = [
          [2, 1, 0],
          [0, 3, 2],
          [1, 3, 0],
          [2, 3, 1],
        ];
      THREE.PolyhedronGeometry.call(this, c, d, a, b);
    }),
    (THREE.TetrahedronGeometry.prototype = Object.create(
      THREE.Geometry.prototype
    )),
    (THREE.ParametricGeometry = function (a, b, c, d) {
      THREE.Geometry.call(this);
      var e = this.vertices,
        f = this.faces,
        g = this.faceVertexUvs[0];
      d = void 0 !== d && d;
      var h,
        i,
        j,
        k,
        l,
        m = b + 1;
      for (h = 0; h <= c; h++)
        for (l = h / c, i = 0; i <= b; i++)
          (k = i / b), (j = a(k, l)), e.push(j);
      var n, o, p, q, r, s, t, u;
      for (h = 0; h < c; h++)
        for (i = 0; i < b; i++)
          (n = h * m + i),
            (o = h * m + i + 1),
            (p = (h + 1) * m + i),
            (q = (h + 1) * m + i + 1),
            (r = new THREE.Vector2(i / b, h / c)),
            (s = new THREE.Vector2((i + 1) / b, h / c)),
            (t = new THREE.Vector2(i / b, (h + 1) / c)),
            (u = new THREE.Vector2((i + 1) / b, (h + 1) / c)),
            d
              ? (f.push(new THREE.Face3(n, o, p)),
                f.push(new THREE.Face3(o, q, p)),
                g.push([r, s, t]),
                g.push([s, u, t]))
              : (f.push(new THREE.Face4(n, o, q, p)), g.push([r, s, u, t]));
      this.computeCentroids(),
        this.computeFaceNormals(),
        this.computeVertexNormals();
    }),
    (THREE.ParametricGeometry.prototype = Object.create(
      THREE.Geometry.prototype
    )),
    (THREE.AxisHelper = function (a) {
      a = a || 1;
      var b = new THREE.Geometry();
      b.vertices.push(
        new THREE.Vector3(),
        new THREE.Vector3(a, 0, 0),
        new THREE.Vector3(),
        new THREE.Vector3(0, a, 0),
        new THREE.Vector3(),
        new THREE.Vector3(0, 0, a)
      ),
        b.colors.push(
          new THREE.Color(16711680),
          new THREE.Color(16755200),
          new THREE.Color(65280),
          new THREE.Color(11206400),
          new THREE.Color(255),
          new THREE.Color(43775)
        );
      var c = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
      THREE.Line.call(this, b, c, THREE.LinePieces);
    }),
    (THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype)),
    (THREE.ArrowHelper = function (a, b, c, d) {
      THREE.Object3D.call(this),
        void 0 === d && (d = 16776960),
        void 0 === c && (c = 1),
        (this.position = b);
      var e = new THREE.Geometry();
      e.vertices.push(new THREE.Vector3(0, 0, 0)),
        e.vertices.push(new THREE.Vector3(0, 1, 0)),
        (this.line = new THREE.Line(
          e,
          new THREE.LineBasicMaterial({ color: d })
        )),
        (this.line.matrixAutoUpdate = !1),
        this.add(this.line);
      var f = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1);
      f.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.875, 0)),
        (this.cone = new THREE.Mesh(
          f,
          new THREE.MeshBasicMaterial({ color: d })
        )),
        (this.cone.matrixAutoUpdate = !1),
        this.add(this.cone),
        this.setDirection(a),
        this.setLength(c);
    }),
    (THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.ArrowHelper.prototype.setDirection = (function () {
      var a,
        b = new THREE.Vector3();
      return function (c) {
        c.y > 0.99999
          ? this.quaternion.set(0, 0, 0, 1)
          : c.y < -0.99999
          ? this.quaternion.set(1, 0, 0, 0)
          : (b.set(c.z, 0, -c.x).normalize(),
            (a = Math.acos(c.y)),
            this.quaternion.setFromAxisAngle(b, a));
      };
    })()),
    (THREE.ArrowHelper.prototype.setLength = function (a) {
      this.scale.set(a, a, a);
    }),
    (THREE.ArrowHelper.prototype.setColor = function (a) {
      this.line.material.color.setHex(a), this.cone.material.color.setHex(a);
    }),
    (THREE.BoxHelper = function (a) {
      var b = [
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(-1, -1, 1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(1, -1, -1),
      ];
      this.vertices = b;
      var c = new THREE.Geometry();
      c.vertices.push(
        b[0],
        b[1],
        b[1],
        b[2],
        b[2],
        b[3],
        b[3],
        b[0],
        b[4],
        b[5],
        b[5],
        b[6],
        b[6],
        b[7],
        b[7],
        b[4],
        b[0],
        b[4],
        b[1],
        b[5],
        b[2],
        b[6],
        b[3],
        b[7]
      ),
        THREE.Line.call(
          this,
          c,
          new THREE.LineBasicMaterial({ color: 16776960 }),
          THREE.LinePieces
        ),
        void 0 !== a && this.update(a);
    }),
    (THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype)),
    (THREE.BoxHelper.prototype.update = function (a) {
      var b = a.geometry;
      null === b.boundingBox && b.computeBoundingBox();
      var c = b.boundingBox.min,
        d = b.boundingBox.max,
        e = this.vertices;
      e[0].set(d.x, d.y, d.z),
        e[1].set(c.x, d.y, d.z),
        e[2].set(c.x, c.y, d.z),
        e[3].set(d.x, c.y, d.z),
        e[4].set(d.x, d.y, c.z),
        e[5].set(c.x, d.y, c.z),
        e[6].set(c.x, c.y, c.z),
        e[7].set(d.x, c.y, c.z),
        this.geometry.computeBoundingSphere(),
        (this.geometry.verticesNeedUpdate = !0),
        (this.matrixAutoUpdate = !1),
        (this.matrixWorld = a.matrixWorld);
    }),
    (THREE.BoundingBoxHelper = function (a, b) {
      var c = b || 8947848;
      (this.object = a),
        (this.box = new THREE.Box3()),
        THREE.Mesh.call(
          this,
          new THREE.CubeGeometry(1, 1, 1),
          new THREE.MeshBasicMaterial({ color: c, wireframe: !0 })
        );
    }),
    (THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype)),
    (THREE.BoundingBoxHelper.prototype.update = function () {
      this.box.setFromObject(this.object),
        this.box.size(this.scale),
        this.box.center(this.position);
    }),
    (THREE.CameraHelper = function (a) {
      function b(a, b, d) {
        c(a, d), c(b, d);
      }
      function c(a, b) {
        d.vertices.push(new THREE.Vector3()),
          d.colors.push(new THREE.Color(b)),
          void 0 === f[a] && (f[a] = []),
          f[a].push(d.vertices.length - 1);
      }
      var d = new THREE.Geometry(),
        e = new THREE.LineBasicMaterial({
          color: 16777215,
          vertexColors: THREE.FaceColors,
        }),
        f = {},
        g = 16755200,
        h = 16711680,
        i = 43775,
        j = 16777215,
        k = 3355443;
      b("n1", "n2", g),
        b("n2", "n4", g),
        b("n4", "n3", g),
        b("n3", "n1", g),
        b("f1", "f2", g),
        b("f2", "f4", g),
        b("f4", "f3", g),
        b("f3", "f1", g),
        b("n1", "f1", g),
        b("n2", "f2", g),
        b("n3", "f3", g),
        b("n4", "f4", g),
        b("p", "n1", h),
        b("p", "n2", h),
        b("p", "n3", h),
        b("p", "n4", h),
        b("u1", "u2", i),
        b("u2", "u3", i),
        b("u3", "u1", i),
        b("c", "t", j),
        b("p", "c", k),
        b("cn1", "cn2", k),
        b("cn3", "cn4", k),
        b("cf1", "cf2", k),
        b("cf3", "cf4", k),
        THREE.Line.call(this, d, e, THREE.LinePieces),
        (this.camera = a),
        (this.matrixWorld = a.matrixWorld),
        (this.matrixAutoUpdate = !1),
        (this.pointMap = f),
        this.update();
    }),
    (THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype)),
    (THREE.CameraHelper.prototype.update = (function () {
      var a = new THREE.Vector3(),
        b = new THREE.Camera(),
        c = new THREE.Projector();
      return function () {
        function d(d, f, g, h) {
          a.set(f, g, h), c.unprojectVector(a, b);
          var i = e.pointMap[d];
          if (void 0 !== i)
            for (var j = 0, k = i.length; j < k; j++)
              e.geometry.vertices[i[j]].copy(a);
        }
        var e = this,
          f = 1,
          g = 1;
        b.projectionMatrix.copy(this.camera.projectionMatrix),
          d("c", 0, 0, -1),
          d("t", 0, 0, 1),
          d("n1", -f, -g, -1),
          d("n2", f, -g, -1),
          d("n3", -f, g, -1),
          d("n4", f, g, -1),
          d("f1", -f, -g, 1),
          d("f2", f, -g, 1),
          d("f3", -f, g, 1),
          d("f4", f, g, 1),
          d("u1", 0.7 * f, 1.1 * g, -1),
          d("u2", 0.7 * -f, 1.1 * g, -1),
          d("u3", 0, 2 * g, -1),
          d("cf1", -f, 0, 1),
          d("cf2", f, 0, 1),
          d("cf3", 0, -g, 1),
          d("cf4", 0, g, 1),
          d("cn1", -f, 0, -1),
          d("cn2", f, 0, -1),
          d("cn3", 0, -g, -1),
          d("cn4", 0, g, -1),
          (this.geometry.verticesNeedUpdate = !0);
      };
    })()),
    (THREE.DirectionalLightHelper = function (a, b) {
      THREE.Object3D.call(this),
        (this.light = a),
        this.light.updateMatrixWorld(),
        (this.matrixWorld = a.matrixWorld),
        (this.matrixAutoUpdate = !1);
      var c = new THREE.PlaneGeometry(b, b),
        d = new THREE.MeshBasicMaterial({ wireframe: !0, fog: !1 });
      d.color.copy(this.light.color).multiplyScalar(this.light.intensity),
        (this.lightPlane = new THREE.Mesh(c, d)),
        this.add(this.lightPlane),
        (c = new THREE.Geometry()),
        c.vertices.push(new THREE.Vector3()),
        c.vertices.push(new THREE.Vector3()),
        c.computeLineDistances(),
        (d = new THREE.LineBasicMaterial({ fog: !1 })),
        d.color.copy(this.light.color).multiplyScalar(this.light.intensity),
        (this.targetLine = new THREE.Line(c, d)),
        this.add(this.targetLine),
        this.update();
    }),
    (THREE.DirectionalLightHelper.prototype = Object.create(
      THREE.Object3D.prototype
    )),
    (THREE.DirectionalLightHelper.prototype.update = (function () {
      var a = new THREE.Vector3();
      return function () {
        a.getPositionFromMatrix(this.light.matrixWorld).negate(),
          this.lightPlane.lookAt(a),
          this.lightPlane.material.color
            .copy(this.light.color)
            .multiplyScalar(this.light.intensity),
          this.targetLine.geometry.vertices[1].copy(a),
          (this.targetLine.geometry.verticesNeedUpdate = !0),
          this.targetLine.material.color.copy(this.lightPlane.material.color);
      };
    })()),
    (THREE.FaceNormalsHelper = function (a, b, c, d) {
      (this.object = a), (this.size = b || 1);
      for (
        var e = c || 16776960,
          f = d || 1,
          g = new THREE.Geometry(),
          h = this.object.geometry.faces,
          i = 0,
          j = h.length;
        i < j;
        i++
      )
        g.vertices.push(new THREE.Vector3()),
          g.vertices.push(new THREE.Vector3());
      THREE.Line.call(
        this,
        g,
        new THREE.LineBasicMaterial({ color: e, linewidth: f }),
        THREE.LinePieces
      ),
        (this.matrixAutoUpdate = !1),
        (this.normalMatrix = new THREE.Matrix3()),
        this.update();
    }),
    (THREE.FaceNormalsHelper.prototype = Object.create(THREE.Line.prototype)),
    (THREE.FaceNormalsHelper.prototype.update = (function (a) {
      var b = new THREE.Vector3();
      return function (a) {
        this.object.updateMatrixWorld(!0),
          this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
        for (
          var c = this.geometry.vertices,
            d = this.object.geometry.faces,
            e = this.object.matrixWorld,
            f = 0,
            g = d.length;
          f < g;
          f++
        ) {
          var h = d[f];
          b.copy(h.normal)
            .applyMatrix3(this.normalMatrix)
            .normalize()
            .multiplyScalar(this.size);
          var i = 2 * f;
          c[i].copy(h.centroid).applyMatrix4(e), c[i + 1].addVectors(c[i], b);
        }
        return (this.geometry.verticesNeedUpdate = !0), this;
      };
    })()),
    (THREE.GridHelper = function (a, b) {
      var c = new THREE.Geometry(),
        d = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
      (this.color1 = new THREE.Color(4473924)),
        (this.color2 = new THREE.Color(8947848));
      for (var e = -a; e <= a; e += b) {
        c.vertices.push(
          new THREE.Vector3(-a, 0, e),
          new THREE.Vector3(a, 0, e),
          new THREE.Vector3(e, 0, -a),
          new THREE.Vector3(e, 0, a)
        );
        var f = 0 === e ? this.color1 : this.color2;
        c.colors.push(f, f, f, f);
      }
      THREE.Line.call(this, c, d, THREE.LinePieces);
    }),
    (THREE.GridHelper.prototype = Object.create(THREE.Line.prototype)),
    (THREE.GridHelper.prototype.setColors = function (a, b) {
      this.color1.set(a),
        this.color2.set(b),
        (this.geometry.colorsNeedUpdate = !0);
    }),
    (THREE.HemisphereLightHelper = function (a, b, c, d) {
      THREE.Object3D.call(this),
        (this.light = a),
        this.light.updateMatrixWorld(),
        (this.matrixWorld = a.matrixWorld),
        (this.matrixAutoUpdate = !1),
        (this.colors = [new THREE.Color(), new THREE.Color()]);
      var e = new THREE.SphereGeometry(b, 4, 2);
      e.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
      for (var f = 0, g = 8; f < g; f++)
        e.faces[f].color = this.colors[f < 4 ? 0 : 1];
      var h = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        wireframe: !0,
      });
      (this.lightSphere = new THREE.Mesh(e, h)),
        this.add(this.lightSphere),
        this.update();
    }),
    (THREE.HemisphereLightHelper.prototype = Object.create(
      THREE.Object3D.prototype
    )),
    (THREE.HemisphereLightHelper.prototype.update = (function () {
      var a = new THREE.Vector3();
      return function () {
        this.colors[0]
          .copy(this.light.color)
          .multiplyScalar(this.light.intensity),
          this.colors[1]
            .copy(this.light.groundColor)
            .multiplyScalar(this.light.intensity),
          this.lightSphere.lookAt(
            a.getPositionFromMatrix(this.light.matrixWorld).negate()
          ),
          (this.lightSphere.geometry.colorsNeedUpdate = !0);
      };
    })()),
    (THREE.PointLightHelper = function (a, b) {
      (this.light = a), this.light.updateMatrixWorld();
      var c = new THREE.SphereGeometry(b, 4, 2),
        d = new THREE.MeshBasicMaterial({ wireframe: !0, fog: !1 });
      d.color.copy(this.light.color).multiplyScalar(this.light.intensity),
        THREE.Mesh.call(this, c, d),
        (this.matrixWorld = this.light.matrixWorld),
        (this.matrixAutoUpdate = !1);
    }),
    (THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype)),
    (THREE.PointLightHelper.prototype.update = function () {
      this.material.color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity);
    }),
    (THREE.SpotLightHelper = function (a) {
      THREE.Object3D.call(this),
        (this.light = a),
        this.light.updateMatrixWorld(),
        (this.matrixWorld = a.matrixWorld),
        (this.matrixAutoUpdate = !1);
      var b = new THREE.CylinderGeometry(0, 1, 1, 8, 1, !0);
      b.applyMatrix(new THREE.Matrix4().makeTranslation(0, -0.5, 0)),
        b.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
      var c = new THREE.MeshBasicMaterial({ wireframe: !0, fog: !1 });
      (this.cone = new THREE.Mesh(b, c)), this.add(this.cone), this.update();
    }),
    (THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.SpotLightHelper.prototype.update = (function () {
      var a = new THREE.Vector3();
      return function () {
        var b = this.light.distance ? this.light.distance : 1e4,
          c = b * Math.tan(this.light.angle);
        this.cone.scale.set(c, c, b),
          this.cone.lookAt(
            a.getPositionFromMatrix(this.light.matrixWorld).negate()
          ),
          this.cone.material.color
            .copy(this.light.color)
            .multiplyScalar(this.light.intensity);
      };
    })()),
    (THREE.VertexNormalsHelper = function (a, b, c, d) {
      (this.object = a), (this.size = b || 1);
      for (
        var e = c || 16711680,
          f = d || 1,
          g = new THREE.Geometry(),
          h = (a.geometry.vertices, a.geometry.faces),
          i = 0,
          j = h.length;
        i < j;
        i++
      )
        for (var k = h[i], l = 0, m = k.vertexNormals.length; l < m; l++)
          g.vertices.push(new THREE.Vector3()),
            g.vertices.push(new THREE.Vector3());
      THREE.Line.call(
        this,
        g,
        new THREE.LineBasicMaterial({ color: e, linewidth: f }),
        THREE.LinePieces
      ),
        (this.matrixAutoUpdate = !1),
        (this.normalMatrix = new THREE.Matrix3()),
        this.update();
    }),
    (THREE.VertexNormalsHelper.prototype = Object.create(THREE.Line.prototype)),
    (THREE.VertexNormalsHelper.prototype.update = (function (a) {
      var b = new THREE.Vector3();
      return function (a) {
        var c = ["a", "b", "c", "d"];
        this.object.updateMatrixWorld(!0),
          this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
        for (
          var d = this.geometry.vertices,
            e = this.object.geometry.vertices,
            f = this.object.geometry.faces,
            g = this.object.matrixWorld,
            h = 0,
            i = 0,
            j = f.length;
          i < j;
          i++
        )
          for (var k = f[i], l = 0, m = k.vertexNormals.length; l < m; l++) {
            var n = k[c[l]],
              o = e[n],
              p = k.vertexNormals[l];
            d[h].copy(o).applyMatrix4(g),
              b
                .copy(p)
                .applyMatrix3(this.normalMatrix)
                .normalize()
                .multiplyScalar(this.size),
              b.add(d[h]),
              (h += 1),
              d[h].copy(b),
              (h += 1);
          }
        return (this.geometry.verticesNeedUpdate = !0), this;
      };
    })()),
    (THREE.VertexTangentsHelper = function (a, b, c, d) {
      (this.object = a), (this.size = b || 1);
      for (
        var e = c || 255,
          f = d || 1,
          g = new THREE.Geometry(),
          h = (a.geometry.vertices, a.geometry.faces),
          i = 0,
          j = h.length;
        i < j;
        i++
      )
        for (var k = h[i], l = 0, m = k.vertexTangents.length; l < m; l++)
          g.vertices.push(new THREE.Vector3()),
            g.vertices.push(new THREE.Vector3());
      THREE.Line.call(
        this,
        g,
        new THREE.LineBasicMaterial({ color: e, linewidth: f }),
        THREE.LinePieces
      ),
        (this.matrixAutoUpdate = !1),
        this.update();
    }),
    (THREE.VertexTangentsHelper.prototype = Object.create(
      THREE.Line.prototype
    )),
    (THREE.VertexTangentsHelper.prototype.update = (function (a) {
      var b = new THREE.Vector3();
      return function (a) {
        var c = ["a", "b", "c", "d"];
        this.object.updateMatrixWorld(!0);
        for (
          var d = this.geometry.vertices,
            e = this.object.geometry.vertices,
            f = this.object.geometry.faces,
            g = this.object.matrixWorld,
            h = 0,
            i = 0,
            j = f.length;
          i < j;
          i++
        )
          for (var k = f[i], l = 0, m = k.vertexTangents.length; l < m; l++) {
            var n = k[c[l]],
              o = e[n],
              p = k.vertexTangents[l];
            d[h].copy(o).applyMatrix4(g),
              b.copy(p).transformDirection(g).multiplyScalar(this.size),
              b.add(d[h]),
              (h += 1),
              d[h].copy(b),
              (h += 1);
          }
        return (this.geometry.verticesNeedUpdate = !0), this;
      };
    })()),
    (THREE.WireframeHelper = function (a) {
      for (
        var b = [0, 0],
          c = {},
          d = function (a, b) {
            return a - b;
          },
          e = ["a", "b", "c", "d"],
          f = new THREE.Geometry(),
          g = a.geometry.vertices,
          h = a.geometry.faces,
          i = 0,
          j = h.length;
        i < j;
        i++
      )
        for (
          var k = h[i], l = k instanceof THREE.Face4 ? 4 : 3, m = 0;
          m < l;
          m++
        ) {
          (b[0] = k[e[m]]), (b[1] = k[e[(m + 1) % l]]), b.sort(d);
          var n = b.toString();
          void 0 === c[n] &&
            (f.vertices.push(g[b[0]]), f.vertices.push(g[b[1]]), (c[n] = !0));
        }
      THREE.Line.call(
        this,
        f,
        new THREE.LineBasicMaterial({ color: 16777215 }),
        THREE.LinePieces
      ),
        (this.matrixAutoUpdate = !1),
        (this.matrixWorld = a.matrixWorld);
    }),
    (THREE.WireframeHelper.prototype = Object.create(THREE.Line.prototype)),
    (THREE.ImmediateRenderObject = function () {
      THREE.Object3D.call(this), (this.render = function (a) {});
    }),
    (THREE.ImmediateRenderObject.prototype = Object.create(
      THREE.Object3D.prototype
    )),
    (THREE.LensFlare = function (a, b, c, d, e) {
      THREE.Object3D.call(this),
        (this.lensFlares = []),
        (this.positionScreen = new THREE.Vector3()),
        (this.customUpdateCallback = void 0),
        void 0 !== a && this.add(a, b, c, d, e);
    }),
    (THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype)),
    (THREE.LensFlare.prototype.add = function (a, b, c, d, e, f) {
      void 0 === b && (b = -1),
        void 0 === c && (c = 0),
        void 0 === f && (f = 1),
        void 0 === e && (e = new THREE.Color(16777215)),
        void 0 === d && (d = THREE.NormalBlending),
        (c = Math.min(c, Math.max(0, c))),
        this.lensFlares.push({
          texture: a,
          size: b,
          distance: c,
          x: 0,
          y: 0,
          z: 0,
          scale: 1,
          rotation: 1,
          opacity: f,
          color: e,
          blending: d,
        });
    }),
    (THREE.LensFlare.prototype.updateLensFlares = function () {
      var a,
        b,
        c = this.lensFlares.length,
        d = 2 * -this.positionScreen.x,
        e = 2 * -this.positionScreen.y;
      for (a = 0; a < c; a++)
        (b = this.lensFlares[a]),
          (b.x = this.positionScreen.x + d * b.distance),
          (b.y = this.positionScreen.y + e * b.distance),
          (b.wantedRotation = b.x * Math.PI * 0.25),
          (b.rotation += 0.25 * (b.wantedRotation - b.rotation));
    }),
    (THREE.Color.prototype.isAlpha = function () {
      return 1 == this.g && 0 == this.r && 0 == this.b;
    }),
    (THREE.Color.prototype.setAlpha = function () {
      return (this.r = 0), (this.g = 1), (this.b = 0), this;
    }),
    (THREE.Color.prototype.protectAlpha = function () {
      return this.isAlpha() && (this.g = 0.98), this;
    }),
    (App.UVMAP = {
      skinLT18: {
        width: 64,
        height: 32,
        commands: [
          [40, 0, "top", "hat"],
          [48, 0, "bottom", "hat"],
          [32, 8, "right", "hat"],
          [48, 8, "left", "hat"],
          [40, 8, "front", "hat"],
          [56, 8, "back", "hat"],
          [8, 0, "top", "head"],
          [16, 0, "bottom", "head"],
          [0, 8, "right", "head"],
          [16, 8, "left", "head"],
          [8, 8, "front", "head"],
          [24, 8, "back", "head"],
          [20, 16, "top", "torso"],
          [28, 16, "bottom", "torso"],
          [16, 20, "right", "torso"],
          [28, 20, "left", "torso"],
          [20, 20, "front", "torso"],
          [32, 20, "back", "torso"],
          [4, 16, "top", "legR"],
          [8, 16, "bottom", "legR", !0],
          [8, 20, "left", "legR", !1, !1],
          [0, 20, "right", "legR", !1, !1],
          [4, 20, "front", "legR"],
          [12, 20, "back", "legR"],
          [4, 16, "top", "legL", !1, !0],
          [8, 16, "bottom", "legL", !0, !0],
          [8, 20, "right", "legL", !1, !0],
          [0, 20, "left", "legL", !1, !0],
          [4, 20, "front", "legL", !1, !0],
          [12, 20, "back", "legL", !1, !0],
          [44, 16, "top", "armR"],
          [48, 16, "bottom", "armR", !0],
          [48, 20, "left", "armR"],
          [40, 20, "right", "armR"],
          [44, 20, "front", "armR"],
          [52, 20, "back", "armR"],
          [44, 16, "top", "armL", !1, !0],
          [48, 16, "bottom", "armL", !0, !0],
          [48, 20, "right", "armL", !1, !0],
          [40, 20, "left", "armL", !1, !0],
          [44, 20, "front", "armL", !1, !0],
          [52, 20, "back", "armL", !1, !0],
        ],
      },
      skin: {
        width: 64,
        height: 64,
        commands: [
          [40, 0, "top", "hat"],
          [48, 0, "bottom", "hat", !0],
          [32, 8, "right", "hat"],
          [48, 8, "left", "hat"],
          [40, 8, "front", "hat"],
          [56, 8, "back", "hat"],
          [8, 0, "top", "head"],
          [16, 0, "bottom", "head", !0],
          [0, 8, "right", "head"],
          [16, 8, "left", "head"],
          [8, 8, "front", "head"],
          [24, 8, "back", "head"],
          [20, 16, "top", "torso"],
          [28, 16, "bottom", "torso", !0],
          [16, 20, "right", "torso"],
          [28, 20, "left", "torso"],
          [20, 20, "front", "torso"],
          [32, 20, "back", "torso"],
          [20, 32, "top", "torso2"],
          [28, 32, "bottom", "torso2", !0],
          [16, 36, "right", "torso2"],
          [28, 36, "left", "torso2"],
          [20, 36, "front", "torso2"],
          [32, 36, "back", "torso2"],
          [4, 16, "top", "legR"],
          [8, 16, "bottom", "legR", !0],
          [8, 20, "left", "legR", !1, !1],
          [0, 20, "right", "legR", !1, !1],
          [4, 20, "front", "legR"],
          [12, 20, "back", "legR"],
          [4, 32, "top", "legR2"],
          [8, 32, "bottom", "legR2", !0],
          [8, 36, "left", "legR2", !1, !1],
          [0, 36, "right", "legR2", !1, !1],
          [4, 36, "front", "legR2"],
          [12, 36, "back", "legR2"],
          [44, 16, "top", "armR"],
          [48, 16, "bottom", "armR", !0],
          [48, 20, "left", "armR"],
          [40, 20, "right", "armR"],
          [44, 20, "front", "armR"],
          [52, 20, "back", "armR"],
          [44, 32, "top", "armR2"],
          [48, 32, "bottom", "armR2", !0],
          [48, 36, "left", "armR2"],
          [40, 36, "right", "armR2"],
          [44, 36, "front", "armR2"],
          [52, 36, "back", "armR2"],
          [4, 48, "top", "legL2"],
          [8, 48, "bottom", "legL2", !0],
          [8, 52, "left", "legL2", !1, !1],
          [0, 52, "right", "legL2", !1, !1],
          [4, 52, "front", "legL2"],
          [12, 52, "back", "legL2"],
          [20, 48, "top", "legL"],
          [24, 48, "bottom", "legL", !0],
          [24, 52, "left", "legL", !1, !1],
          [16, 52, "right", "legL", !1, !1],
          [20, 52, "front", "legL"],
          [28, 52, "back", "legL"],
          [36, 48, "top", "armL"],
          [40, 48, "bottom", "armL", !0],
          [40, 52, "left", "armL", !1, !1],
          [32, 52, "right", "armL", !1, !1],
          [36, 52, "front", "armL"],
          [44, 52, "back", "armL"],
          [52, 48, "top", "armL2"],
          [56, 48, "bottom", "armL2", !0],
          [56, 52, "left", "armL2", !1, !1],
          [48, 52, "right", "armL2", !1, !1],
          [52, 52, "front", "armL2"],
          [60, 52, "back", "armL2"],
        ],
      },
      frontBack: {
        width: 36,
        height: 32,
        commands: [
          [4, 8, "front", "torso2"],
          [12, 8, "front", "armL2"],
          [0, 8, "front", "armR2"],
          [4, 20, "front", "legR2"],
          [8, 20, "front", "legL2"],
          [24, 8, "back", "torso2"],
          [32, 8, "back", "armR2"],
          [20, 8, "back", "armL2"],
          [24, 20, "back", "legL2"],
          [28, 20, "back", "legR2"],
          [4, 0, "front", "hat"],
          [4, 0, "front", "head"],
          [4, 8, "front", "torso"],
          [12, 8, "front", "armL"],
          [0, 8, "front", "armR"],
          [4, 20, "front", "legR"],
          [8, 20, "front", "legL"],
          [24, 0, "back", "hat"],
          [24, 0, "back", "head"],
          [24, 8, "back", "torso"],
          [32, 8, "back", "armR"],
          [20, 8, "back", "armL"],
          [24, 20, "back", "legL"],
          [28, 20, "back", "legR"],
        ],
      },
      picnicRender: {
        width: 36,
        height: 32,
        commands: [
          [8, 0, "front", "hat"],
          [8, 0, "front", "head"],
          [16, 0, "left", "hat"],
          [16, 0, "left", "head"],
          [0, 0, "top", "hat"],
          [0, 0, "top", "head"],
          [4, 8, "front", "armR2"],
          [4, 8, "front", "armR"],
          [8, 8, "front", "torso2"],
          [8, 8, "front", "torso"],
          [16, 8, "left", "torso2"],
          [16, 8, "left", "torso"],
          [20, 8, "front", "armL2"],
          [20, 8, "front", "armL"],
          [24, 8, "left", "armL2"],
          [24, 8, "left", "armL"],
          [4, 20, "front", "legR2"],
          [4, 20, "front", "legR"],
          [8, 20, "left", "legR2"],
          [8, 20, "left", "legR"],
          [12, 20, "front", "legL2"],
          [12, 20, "front", "legL"],
          [16, 20, "left", "legL2"],
          [16, 20, "left", "legL"],
          [0, 8, "bottom", "legR2"],
          [0, 8, "bottom", "legR"],
          [0, 12, "bottom", "legL2"],
          [0, 12, "bottom", "legL"],
        ],
      },
      cubeRender: {
        width: 24,
        height: 8,
        commands: [
          [0, 0, "front", "hat"],
          [0, 0, "front", "head"],
          [8, 0, "right", "hat"],
          [8, 0, "right", "head"],
          [16, 0, "top", "hat"],
          [16, 0, "top", "head"],
        ],
      },
      print3dUV: {
        width: 64,
        height: 64,
        commands: [
          [8, 0, "top", "hat"],
          [16, 0, "bottom", "hat", !0],
          [0, 8, "right", "hat"],
          [16, 8, "left", "hat"],
          [8, 8, "front", "hat"],
          [24, 8, "back", "hat"],
          [8, 0, "top", "head"],
          [16, 0, "bottom", "head", !0],
          [0, 8, "right", "head"],
          [16, 8, "left", "head"],
          [8, 8, "front", "head"],
          [24, 8, "back", "head"],
          [20, 16, "top", "torso2"],
          [28, 16, "bottom", "torso2", !0],
          [16, 20, "right", "torso2"],
          [28, 20, "left", "torso2"],
          [20, 20, "front", "torso2"],
          [32, 20, "back", "torso2"],
          [20, 16, "top", "torso"],
          [28, 16, "bottom", "torso", !0],
          [16, 20, "right", "torso"],
          [28, 20, "left", "torso"],
          [20, 20, "front", "torso"],
          [32, 20, "back", "torso"],
          [4, 16, "top", "legR2"],
          [8, 16, "bottom", "legR2", !0],
          [8, 20, "left", "legR2", !1, !1],
          [0, 20, "right", "legR2", !1, !1],
          [4, 20, "front", "legR2"],
          [12, 20, "back", "legR2"],
          [4, 16, "top", "legR"],
          [8, 16, "bottom", "legR", !0],
          [8, 20, "left", "legR", !1, !1],
          [0, 20, "right", "legR", !1, !1],
          [4, 20, "front", "legR"],
          [12, 20, "back", "legR"],
          [44, 16, "top", "armR2"],
          [48, 16, "bottom", "armR2", !0],
          [48, 20, "left", "armR2"],
          [40, 20, "right", "armR2"],
          [44, 20, "front", "armR2"],
          [52, 20, "back", "armR2"],
          [44, 16, "top", "armR"],
          [48, 16, "bottom", "armR", !0],
          [48, 20, "left", "armR"],
          [40, 20, "right", "armR"],
          [44, 20, "front", "armR"],
          [52, 20, "back", "armR"],
          [4, 48, "top", "legL2"],
          [8, 48, "bottom", "legL2", !0],
          [8, 52, "left", "legL2", !1, !1],
          [0, 52, "right", "legL2", !1, !1],
          [4, 52, "front", "legL2"],
          [12, 52, "back", "legL2"],
          [4, 48, "top", "legL"],
          [8, 48, "bottom", "legL", !0],
          [8, 52, "left", "legL", !1, !1],
          [0, 52, "right", "legL", !1, !1],
          [4, 52, "front", "legL"],
          [12, 52, "back", "legL"],
          [36, 48, "top", "armL2"],
          [40, 48, "bottom", "armL2", !0],
          [40, 52, "left", "armL2", !1, !1],
          [32, 52, "right", "armL2", !1, !1],
          [36, 52, "front", "armL2"],
          [44, 52, "back", "armL2"],
          [36, 48, "top", "armL"],
          [40, 48, "bottom", "armL", !0],
          [40, 52, "left", "armL", !1, !1],
          [32, 52, "right", "armL", !1, !1],
          [36, 52, "front", "armL"],
          [44, 52, "back", "armL"],
        ],
      },
      allPartsOverlayed: {
        width: 64,
        height: 32,
        commands: [
          [8, 0, "top", "hat"],
          [0, 0, "bottom", "hat", !0],
          [0, 8, "right", "hat"],
          [16, 8, "left", "hat"],
          [8, 8, "front", "hat"],
          [16, 0, "back", "hat"],
          [8, 0, "top", "head"],
          [0, 0, "bottom", "head", !0],
          [0, 8, "right", "head"],
          [16, 8, "left", "head"],
          [8, 8, "front", "head"],
          [16, 0, "back", "head"],
          [4, 16, "top", "torso2"],
          [12, 16, "bottom", "torso2", !0],
          [0, 20, "right", "torso2"],
          [12, 20, "left", "torso2"],
          [4, 20, "front", "torso2"],
          [16, 20, "back", "torso2"],
          [4, 16, "top", "torso"],
          [12, 16, "bottom", "torso", !0],
          [0, 20, "right", "torso"],
          [12, 20, "left", "torso"],
          [4, 20, "front", "torso"],
          [16, 20, "back", "torso"],
          [28, 0, "top", "legR2"],
          [32, 0, "bottom", "legR2", !0],
          [32, 4, "left", "legR2", !1, !1],
          [24, 4, "right", "legR2", !1, !1],
          [28, 4, "front", "legR2"],
          [36, 4, "back", "legR2"],
          [28, 0, "top", "legR"],
          [32, 0, "bottom", "legR", !0],
          [32, 4, "left", "legR", !1, !1],
          [24, 4, "right", "legR", !1, !1],
          [28, 4, "front", "legR"],
          [36, 4, "back", "legR"],
          [28, 16, "top", "armR2"],
          [32, 16, "bottom", "armR2", !0],
          [32, 20, "left", "armR2"],
          [24, 20, "right", "armR2"],
          [28, 20, "front", "armR2"],
          [36, 20, "back", "armR2"],
          [28, 16, "top", "armR"],
          [32, 16, "bottom", "armR", !0],
          [32, 20, "left", "armR"],
          [24, 20, "right", "armR"],
          [28, 20, "front", "armR"],
          [36, 20, "back", "armR"],
          [44, 0, "top", "legL2"],
          [48, 0, "bottom", "legL2", !0],
          [48, 4, "left", "legL2", !1, !1],
          [40, 4, "right", "legL2", !1, !1],
          [44, 4, "front", "legL2"],
          [52, 4, "back", "legL2"],
          [44, 0, "top", "legL"],
          [48, 0, "bottom", "legL", !0],
          [48, 4, "left", "legL", !1, !1],
          [40, 4, "right", "legL", !1, !1],
          [44, 4, "front", "legL"],
          [52, 4, "back", "legL"],
          [44, 16, "top", "armL2"],
          [48, 16, "bottom", "armL2", !0],
          [48, 20, "left", "armL2", !1, !1],
          [40, 20, "right", "armL2", !1, !1],
          [44, 20, "front", "armL2"],
          [52, 20, "back", "armL2"],
          [44, 16, "top", "armL"],
          [48, 16, "bottom", "armL", !0],
          [48, 20, "left", "armL", !1, !1],
          [40, 20, "right", "armL", !1, !1],
          [44, 20, "front", "armL"],
          [52, 20, "back", "armL"],
        ],
      },
    }),
    (App.Canvas = function () {
      "use strict";
      function a() {
        n && (m.putImageData(j, 0, 0), (n = !1)),
          o && ((j = m.getImageData(0, 0, l.width, l.height)), (o = !1));
      }
      function b(b, c) {
        a(), (l.width = b), (l.height = c), (o = !0);
      }
      function c(b, c, d) {
        a();
        var e = 4 * (b + c * j.width);
        (j.data[e + 0] = 256 * d.r),
          (j.data[e + 1] = 256 * d.g),
          (j.data[e + 2] = 256 * d.b),
          d.isAlpha() ? (j.data[e + 3] = 0) : (j.data[e + 3] = 256),
          (n = !0);
      }
      function d(b, c) {
        a();
        var d = new THREE.Color(),
          e = 4 * (b + c * j.width);
        return (
          (d.r = j.data[e + 0] / 256),
          (d.g = j.data[e + 1] / 256),
          (d.b = j.data[e + 2] / 256),
          d.protectAlpha(),
          j.data[e + 3] / 256 == 0 && d.setAlpha(),
          d
        );
      }
      function e() {
        return a(), (k = new Image()), (k.src = l.toDataURL("image/png")), k;
      }
      function f(c) {
        a(), b(c.width, c.height), m.drawImage(c, 0, 0), (o = !0);
      }
      function g(a) {
        for (
          var c = l.width * a,
            d = l.height * a,
            e = m.getImageData(0, 0, c, d),
            f = 0;
          f < d;
          f++
        )
          for (var g = 0; g < c; g++) {
            var h = 4 * (Math.floor(f / a) * l.width + Math.floor(g / a)),
              i = 4 * (f * c + g);
            (e.data[i] = j.data[h]),
              (e.data[i + 1] = j.data[h + 1]),
              (e.data[i + 2] = j.data[h + 2]),
              (e.data[i + 3] = j.data[h + 3]);
          }
        return b(c, d), m.putImageData(e, 0, 0), (j = e), l;
      }
      function h(b, c, d) {
        return a(), m.drawImage(b, 0, 0), (o = !0), l;
      }
      function i() {
        return a(), l.toDataURL();
      }
      var j,
        k,
        l = document.createElement("canvas"),
        m = l.getContext("2d"),
        n = !1,
        o = !1;
      return (
        b(16, 16),
        {
          setSize: b,
          setPixelColor: c,
          getPixelColor: d,
          getImage: e,
          setImage: f,
          resizeNearestNeighbor: g,
          context: m,
          element: l,
          drawImage: h,
          toDataURL: i,
        }
      );
    }),
    (App.Transporter = function (a) {
      "use strict";
      function b(b, c, d) {
        var e = App.UVMAP[b];
        return (
          o.setSize(e.width, e.height),
          a.model.loopOverMap(
            e.commands,
            function (b, d, e) {
              if (c === !0)
                var f = a.layerModel.getFaceColor(
                  e,
                  a.layerModel.getTopLayerOf(e)
                );
              else var f = a.layerModel.getFaceColor(e, c);
              f.isAlpha() || o.setPixelColor(b, d, f);
            },
            d
          ),
          o
        );
      }
      function c(a, c, d) {
        return b(a, c, d).getImage();
      }
      function d(b, c, d) {
        var e = $.Deferred(),
          f = new THREE.ImageLoader(),
          g = App.UVMAP[c];
        f.setCrossOrigin(!0);
        var h = function (b) {
            if (
              (32 == b.height && "skin" == c && (g = App.UVMAP.skinLT18),
              a.layerModel && a.layerModel.add)
            )
              var f = a.layerModel.add(d);
            o.setImage(b),
              a.model.loopOverMap(g.commands, function (b, c, d) {
                a.layerModel.setFaceColor(d, o.getPixelColor(b, c));
              }),
              e.resolve("complete"),
              a.layerPresenter && a.layerPresenter.updateLayerThumbnail(f);
          },
          i = function () {},
          j = function (a) {
            e.reject("error");
          };
        return (
          /MSIE (\d+\.\d+);/.test(navigator.userAgent) &&
            (b =
              App.URL.root + "assets/ieproxy.php?url=" + encodeURIComponent(b)),
          f.load(b, h, i, j),
          e.promise()
        );
      }
      function e() {
        if (localStorage.getItem("layerJson")) {
          var b = localStorage.getItem("layerJson");
          a.layerModel.parse(b),
            a.layerPresenter && a.layerPresenter.updateAllLayerThumbnails(),
            a.layerModel.renderModel(),
            a.model.render();
        } else a.layerModel.add();
        localStorage.getItem("edit-save-ref") &&
        localStorage.getItem("edit-id-ref")
          ? a.transporter
              .setUVImage(
                localStorage.getItem("edit-save-ref"),
                "skin",
                localStorage.getItem("edit-id-ref")
              )
              .done(function () {
                a.layerPresenter.checkpoint(!0);
              })
              .always(function () {
                localStorage.removeItem("edit-save-ref"),
                  localStorage.removeItem("edit-slug-ref");
              })
          : a.layerPresenter && a.layerPresenter.checkpoint(!0);
      }
      function f(a) {
        var c = $.Deferred(),
          d = function (d) {
            d && (p[a.img] = d);
            var e = b(a.uv.name, !0);
            a.uv.scale && a.uv.scale > 1 && e.resizeNearestNeighbor(a.uv.scale);
            var f = new App.Canvas();
            f.setSize(p[a.img].width, p[a.img].height);
            for (var h = g(a.shards), j = 0; j < h.length; j++) {
              var k = h[j];
              i(
                e,
                k.uv[0][0],
                k.uv[0][1],
                k.uv[1][0],
                k.uv[1][1],
                k.uv[2][0],
                k.uv[2][1],
                f,
                k.coord[0][0],
                k.coord[0][1],
                k.coord[1][0],
                k.coord[1][1],
                k.coord[2][0],
                k.coord[2][1]
              );
            }
            f.context.drawImage(p[a.img], 0, 0), c.resolve(f);
          },
          e = function () {},
          f = function () {
            c.reject("error");
          };
        if (p[a.img]) d();
        else {
          var h = new THREE.ImageLoader();
          h.setCrossOrigin(!0),
            h.load(App.URL.root + "assets/" + a.img, d, e, f);
        }
        return c.promise();
      }
      function g(a) {
        "string" == typeof a && (a = JSON.parse(a));
        for (var b = [], c = 0; c < a.length; c += 12) {
          b.push({
            uv: [
              [a[c + 0], a[c + 1]],
              [a[c + 2], a[c + 3]],
              [a[c + 4], a[c + 5]],
            ],
            coord: [
              [a[c + 6], a[c + 7]],
              [a[c + 8], a[c + 9]],
              [a[c + 10], a[c + 11]],
            ],
          });
        }
        return b;
      }
      function h(a, b, c) {
        var d,
          e = b.x - a.x,
          f = b.y - a.y,
          g = e * e + f * f;
        0 !== g &&
          ((d = c / Math.sqrt(g)),
          (e *= d),
          (f *= d),
          (b.x += e),
          (b.y += f),
          (a.x -= e),
          (a.y -= f));
      }
      function i(a, b, c, d, e, f, g, i, j, k, l, m, n, o, p) {
        var q = { x: j, y: k },
          r = { x: l, y: m },
          s = { x: n, y: o };
        h(q, r, 0.5),
          h(r, s, 0.5),
          h(s, q, 0.5),
          (j = q.x),
          (l = r.x),
          (n = s.x),
          (k = q.y),
          (m = r.y),
          (o = s.y),
          i.context.beginPath(),
          i.context.moveTo(j, k),
          i.context.lineTo(l, m),
          i.context.lineTo(n, o),
          i.context.closePath(),
          (l -= j),
          (m -= k),
          (n -= j),
          (o -= k),
          (d -= b),
          (e -= c),
          (f -= b),
          (g -= c);
        var t = 1 / (d * g - f * e),
          u = (g * l - e * n) * t,
          v = (g * m - e * o) * t,
          w = (d * n - f * l) * t,
          x = (d * o - f * m) * t,
          y = j - u * b - w * c,
          z = k - v * b - x * c;
        i.context.save(),
          i.context.transform(u, v, w, x, y, z),
          i.context.clip(),
          i.context.drawImage(a.element, 0, 0),
          p && ((i.context.lineWidth = 1), i.context.stroke()),
          i.context.restore();
      }
      function j() {
        var a = window.open(
          "https://web.archive.org/web/20221128185310/https://minecraft.net/profile/skin/remote?url=" +
            App.config.s3.prefix.aws +
            App.config.s3.suffix.file +
            "/loading.png",
          "popup",
          "left=20,top=20,width=1200,height=600,toolbar=0,resizable=1"
        );
        return $.ajax({
          url: App.URL.root + "api/temp",
          type: "post",
          data: { upload: c("skin", !0).src },
        }).done(function (b) {
          a.location =
            "https://web.archive.org/web/20221128185310/https://minecraft.net/profile/skin/remote?url=" +
            b.message;
        });
      }
      function k(a, b, c) {
        var d = document.createElement("form");
        (d.method = "post"),
          (d.action = a),
          d.setAttribute("hidden", !0),
          c && d.setAttribute("target", "_blank"),
          (b["X-CSRF-Token"] = App.config.token);
        for (var e in b)
          if (b.hasOwnProperty(e)) {
            var f = document.createElement("input");
            f.setAttribute("name", e),
              f.setAttribute("value", b[e]),
              f.setAttribute("type", "hidden"),
              d.appendChild(f);
          }
        document.body.appendChild(d), d.submit(), document.body.removeChild(d);
      }
      function l() {
        download(c("skin", !0).src, "download.png");
      }
      function m() {
        window.open(App.URL.root + "product/print3d/picnic");
      }
      function n() {}
      var o = new App.Canvas(),
        p = {};
      return {
        loadFromLocalStorage: e,
        minecraftNet: j,
        download: l,
        shirt: n,
        print3d: m,
        getUVCanvas: b,
        getUVImage: c,
        setUVImage: d,
        getAffineCanvas: f,
        drawTexturedTriangle: i,
        submitter: k,
      };
    }),
    (App.Model = function (a, b) {
      "use strict";
      function c(a, b, c, d) {
        (d = d || 0),
          (z[a] = new THREE.Mesh(
            new THREE.CubeGeometry(
              b.width + d,
              b.height + d,
              b.depth + d,
              b.width,
              b.height,
              b.depth
            ),
            new THREE.MeshFaceMaterial(y)
          )),
          (z[a].name = a),
          A.add(z[a]),
          (z[a].position.x = c.x),
          (z[a].position.y = c.y),
          (z[a].position.z = c.z);
      }
      function d(a, b) {
        (z[a].mirrorPart = z[b]), (z[b].mirrorPart = z[a]);
      }
      function e(a, b) {
        (z[a].underlay = z[b]), (z[b].overlay = z[a]);
      }
      function f() {
        (v = a.width()), (w = a.height()), C.setSize(v, w);
      }
      function g(a) {
        var b = new THREE.Vector3(
          (a.left / v) * 2 - 1,
          2 * -(a.top / w) + 1,
          0.5
        );
        B.unprojectVector(b, D);
        for (
          var c = new THREE.Raycaster(
              D.position,
              b.sub(D.position).normalize()
            ),
            d = [],
            e = 0;
          e < A.children.length;
          e++
        )
          A.children[e].visible && d.push(A.children[e]);
        var f = c.intersectObjects(d);
        return f;
      }
      function h(a) {
        (A.rotation.y -= 0.02 * a.y), (A.rotation.x -= 0.02 * a.x);
      }
      function i(a) {
        if (!x) {
          new TWEEN.Tween({ x: A.rotation.x, y: A.rotation.y })
            .to({ x: A.rotation.x + a.x, y: A.rotation.y + a.y }, 250)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
              (A.rotation.x = this.x), (A.rotation.y = this.y), t();
            })
            .onComplete(function () {
              x = !1;
            })
            .start();
          (x = !0), j();
        }
      }
      function j() {
        x && (requestAnimationFrame(j), TWEEN.update());
      }
      function k(a, b) {
        (a.materialIndex = 1),
          b.isAlpha() && (a.materialIndex = 0),
          (a.color = b);
      }
      function l(a) {
        return a.color;
      }
      function m(a, b) {
        var c = b.geometry.depth / b.geometry.depthSegments;
        c += c / 4;
        for (
          var d = [], e = b.geometry.faces, f = a.centroid, g = 0;
          g < e.length;
          g++
        ) {
          var h = e[g].centroid,
            i = Math.sqrt(
              (f.x - h.x) * (f.x - h.x) +
                (f.y - h.y) * (f.y - h.y) +
                (f.z - h.z) * (f.z - h.z)
            );
          i <= c && d.push(e[g]);
        }
        return d;
      }
      function n(a) {
        var b = a.object;
        if (a.object.mirrorPart) var b = a.object.mirrorPart;
        var c = b.geometry.widthSegments,
          d = b.geometry.heightSegments;
        if (
          ("torso" != b.name ||
            (1 != a.face.normal.x && a.face.normal.x != -1) ||
            (c = b.geometry.depthSegments),
          1 == a.face.normal.z ||
            a.face.normal.z == -1 ||
            1 == a.face.normal.y ||
            a.face.normal.y == -1)
        )
          var e = a.faceIndex - (2 * ((a.faceIndex % c) - c / 2) + 1);
        else if (1 == a.face.normal.x || a.face.normal.x == -1)
          var e =
            a.faceIndex -
            c * d * -a.face.normal.x -
            (2 * ((a.faceIndex % c) - c / 2) + 1);
        return b.geometry.faces[e];
      }
      function o(a, b, c) {
        for (var d = A.children.length - 1; d >= 0; d--) {
          var e = {};
          if (!c || c == A.children[d])
            for (var f = 0; f < A.children[d].geometry.faces.length; f++) {
              var g = A.children[d].geometry.faces[f];
              if (JSON.stringify(e) != JSON.stringify(g.normal)) {
                e = g.normal;
                var h = 0,
                  i = 0,
                  j = A.children[d].geometry.depthSegments,
                  k = A.children[d].geometry.heightSegments;
                (Math.abs(e.z) > 0 || Math.abs(e.y) > 0) &&
                  ((j = A.children[d].geometry.widthSegments),
                  (k = A.children[d].geometry.depthSegments));
              }
              for (var l = 0; l < a.length; l++)
                if (
                  A.children[d].name == a[l][3] &&
                  (("front" == a[l][2] && 1 == g.normal.z) ||
                    ("back" == a[l][2] && g.normal.z == -1) ||
                    ("left" == a[l][2] && 1 == g.normal.x) ||
                    ("right" == a[l][2] && g.normal.x == -1) ||
                    ("top" == a[l][2] && 1 == g.normal.y) ||
                    ("bottom" == a[l][2] && g.normal.y == -1))
                ) {
                  var m = h + a[l][0],
                    n = i + a[l][1];
                  a[l][4] && (n = 2 * (k / 2 - i) - 1 + a[l][1] + i),
                    a[l][5] && (m -= 2 * ((m % j) - j / 2) + 1),
                    b(m, n, g);
                }
              h++, h > j - 1 && ((h = 0), i++);
            }
        }
      }
      function p(a) {
        for (var b = 0; b < A.children.length; b++)
          for (var c = 0; c < A.children[b].geometry.faces.length; c++)
            a(A.children[b].geometry.faces[c], A.children[b], b, c);
      }
      function q(a) {
        for (var b = 0; b < A.children.length; b++) a(A.children[b]);
      }
      function r(a) {
        return z[a];
      }
      function s(a) {
        if (void 0 == a.offsetX)
          var b = a.pageX - K.left,
            c = a.pageY - K.top;
        else
          var b = a.offsetX,
            c = a.offsetY;
        return { left: b, top: c };
      }
      function t() {
        for (var a = 0; a < A.children.length; a++) {
          var b = A.children[a],
            c = new THREE.Vector3();
          c.getPositionFromMatrix(b.matrixWorld),
            (b.zBoost = c.distanceTo(D.position)),
            b.underlay && (b.zBoost += -0.05);
        }
        C.render(E, D);
      }
      function u() {
        y[0] = new THREE.MeshBasicMaterial({ visible: !1 });
      }
      var v = a.width(),
        w = a.height(),
        x = !1,
        y = [
          new THREE.MeshBasicMaterial({
            color: 4473924,
            wireframe: !0,
            wireframeLinewidth: 0.3,
          }),
          new THREE.MeshBasicMaterial({
            color: 16777215,
            vertexColors: THREE.FaceColors,
            overdraw: 0.5,
          }),
        ],
        z = {},
        A = new THREE.Object3D();
      c("hat", { width: 8, height: 8, depth: 8 }, { x: 0, y: 10, z: 0 }, 0.5),
        c(
          "torso2",
          { width: 8, height: 12, depth: 4 },
          { x: 0, y: 0, z: 0 },
          0.5
        ),
        c(
          "armR2",
          { width: 4, height: 12, depth: 4 },
          { x: -6, y: 0, z: 0 },
          0.5
        ),
        c(
          "armL2",
          { width: 4, height: 12, depth: 4 },
          { x: 6, y: 0, z: 0 },
          0.5
        ),
        c(
          "legR2",
          { width: 4, height: 12, depth: 4 },
          { x: -2, y: -12, z: 0 },
          0.5
        ),
        c(
          "legL2",
          { width: 4, height: 12, depth: 4 },
          { x: 2, y: -12, z: 0 },
          0.5
        ),
        c("head", { width: 8, height: 8, depth: 8 }, { x: 0, y: 10, z: 0 }),
        c("torso", { width: 8, height: 12, depth: 4 }, { x: 0, y: 0, z: 0 }),
        c("armR", { width: 4, height: 12, depth: 4 }, { x: -6, y: 0, z: 0 }),
        c("armL", { width: 4, height: 12, depth: 4 }, { x: 6, y: 0, z: 0 }),
        c("legR", { width: 4, height: 12, depth: 4 }, { x: -2, y: -12, z: 0 }),
        c("legL", { width: 4, height: 12, depth: 4 }, { x: 2, y: -12, z: 0 }),
        d("armR", "armL"),
        d("armR2", "armL2"),
        d("legR", "legL"),
        d("legR2", "legL2"),
        e("hat", "head"),
        e("torso2", "torso"),
        e("armR2", "armR"),
        e("armL2", "armL"),
        e("legL2", "legL"),
        e("legR2", "legR");
      var B = new THREE.Projector(),
        C = new THREE.CanvasRenderer();
      C.sortObjects = !1;
      var D = new THREE.PerspectiveCamera(70, v / w, 5, 100);
      (D.position.z = 30), (D.position.y = -1);
      var E = new THREE.Scene();
      E.add(A);
      for (var F = 0, G = 0; G < A.children.length; G++) {
        A.children[G].groupIndex = G;
        for (var H = 0; H < A.children[G].geometry.faces.length; H++) {
          var I = A.children[G].geometry.faces[H];
          (I.materialIndex = 0),
            (I.groupIndex = G),
            (I.faceIndex = H),
            (I.layers = {}),
            (I.topLayerId = void 0),
            (I.color = new THREE.Color().setAlpha()),
            (I.userData = { uid: F }),
            F++;
        }
      }
      var J = $(C.domElement);
      a.append(J), f();
      var K = J.offset();
      return {
        pingIntersets: g,
        rotateTo: h,
        getFaceColor: l,
        setFaceColor: k,
        getMirroredFace: n,
        getAdjacentFaces: m,
        loopOverFaces: p,
        loopOverMap: o,
        loopOverParts: q,
        getPart: r,
        $dom: J,
        offset: K,
        cursorOffset: s,
        render: t,
        turnOffGrid: u,
        animateTo: i,
      };
    }),
    (App.LayerModel = function (a) {
      "use strict";
      function b(a) {
        return s.layers[a];
      }
      function c() {
        return s.layers[s.activeLayerId];
      }
      function d(a) {
        var b = (Object.keys(s.layers), []);
        Object.keys(s.layers).forEach(function (a) {
          b.push(s.layers[a]);
        }),
          b.sort(function (a, b) {
            return a.order - b.order;
          });
        for (var c = 0; c < b.length; c++) if (a(b[c], c, b.length)) return !0;
      }
      function e(b) {
        d(function (a, b) {
          a.order++;
        });
        var c = {
          id: "i" + Math.random().toString(36).substr(2, 9),
          visible: !0,
          order: 0,
          selected: !0,
          skinId: b,
          faces: [],
        };
        return (
          a.model.loopOverFaces(function (a) {
            c.faces.push(new THREE.Color().setAlpha());
          }),
          (s.layers[c.id] = c),
          i(c),
          c
        );
      }
      function f() {
        var a = s.activeLayerId,
          b = s.layers[s.activeLayerId].order;
        b == Object.keys(s.layers).length - 1 && b--,
          delete s.layers[a],
          d(function (a, c) {
            b == c && i(a), (a.order = c);
          }),
          0 == Object.keys(s.layers).length && e(),
          p();
      }
      function g() {
        d(function (a) {
          f();
        });
      }
      function h(a, b) {
        (a.order = b - 0.5),
          d(function (a, b) {
            a.order = b;
          });
      }
      function i(a) {
        d(function (a, b) {
          a.selected = !1;
        }),
          (a.selected = !0),
          (s.activeLayerId = a.id);
      }
      function j(a) {
        (s.layers[a].visible = !s.layers[a].visible), p();
      }
      function k() {
        return JSON.stringify(s);
      }
      function l(a) {
        s = JSON.parse(a);
        for (var b = Object.keys(s.layers), c = 0; c < b.length; c++)
          for (var d = s.layers[b[c]], e = 0; e < d.faces.length; e++) {
            var f = d.faces[e];
            d.faces[e] = new THREE.Color().setRGB(f.r, f.g, f.b);
          }
      }
      function m(a) {
        return Math.round(1e3 * a) / 1e3;
      }
      function n(d, e) {
        (e.r = m(e.r)), (e.g = m(e.g)), (e.b = m(e.b));
        var f = parseInt(d.userData.uid);
        (c().faces[f] = e),
          c().visible &&
            ((!t[f] || c().order <= b(t[f]).order) &&
              (e.isAlpha() || ((t[f] = c().id), a.model.setFaceColor(d, e))),
            e.isAlpha() && t[f] && t[f] == c().id && o(d));
      }
      function o(b) {
        var c = parseInt(b.userData.uid),
          e = !1;
        d(function (d, f, g) {
          if (!q(b, d).isAlpha() && d.visible)
            return (
              (t[c] = d.id), a.model.setFaceColor(b, q(b, d)), (e = !0), !0
            );
        }),
          e ||
            ((t[c] = void 0),
            a.model.setFaceColor(b, new THREE.Color().setAlpha()));
      }
      function p() {
        a.model.loopOverFaces(function (a) {
          o(a);
        });
      }
      function q(a, b) {
        return (b = b || c()), b.faces[parseInt(a.userData.uid)];
      }
      function r(a) {
        var d = parseInt(a.userData.uid);
        return b(t[d]) || c();
      }
      var s = { activeLayerId: void 0, layers: {} },
        t = {};
      return {
        add: e,
        get: b,
        remove: f,
        removeAll: g,
        loop: d,
        select: i,
        changeOrder: h,
        active: c,
        toggleVisibility: j,
        renderModel: p,
        getFaceColor: q,
        setFaceColor: n,
        getTopLayerOf: r,
        parse: l,
        stringify: k,
      };
    }),
    $(function () {
      "use strict";
      function a(a, b) {
        for (var c = 0; c < a.data.length; c++) {
          var d = a.data[c],
            e = $(f);
          e.data("id", d.id),
            e.find("h2").text(d.name),
            e.find("a").attr("href", d.link),
            e.find("img").attr("src", d.images.thumbnail.http);
          var g = d.description.substring(0, 100);
          d.description.length >= 100 && (g += "..."),
            e.find("p").text($("<div/>").html(g).text()),
            b.append(e);
        }
      }
      var b = {},
        c = $(".model");
      (b.model = App.Model(c)),
        (b.transporter = App.Transporter(b)),
        (b.layerModel = new App.LayerModel(b)),
        b.transporter.setUVImage(c.data("local"), "skin").done(function () {
          !(function a() {
            requestAnimationFrame(a),
              b.model.rotateTo({ x: 0, y: 1.2 }),
              b.model.render();
          })();
        }),
        b.model.rotateTo({ x: 0, y: -30 }),
        b.model.turnOffGrid();
      var d = $(".more"),
        e = ($(".parts"), $(".related")),
        f = $("#skin-item").html();
      $.ajax({
        url: App.URL.root + "api/search",
        type: "get",
        data: {
          search: e.data("search"),
          exclude: c.data("id"),
          count: 3,
          fast: "yes",
        },
      }).done(function (b) {
        b.data && b.data.length > 0 ? a(b, e) : e.hide();
      }),
        $.ajax({
          url: App.URL.root + "api/author",
          type: "get",
          data: { user_id: c.data("user-id"), exclude: c.data("id"), count: 3 },
        }).done(function (b) {
          b.data && b.data.length > 0 ? a(b, d) : d.hide();
        }),
        $("button.edit").mouseup(function (a) {
          a.preventDefault(),
            (localStorage["edit-save-ref"] = c.data("save")),
            (localStorage["edit-id-ref"] = c.data("id")),
            (window.location = $(this).data("url"));
        }),
        $("button.minecraft").mouseup(function (a) {
          a.preventDefault(), b.transporter.minecraftNet();
        }),
        $("button.download").mouseup(function (a) {
          a.preventDefault(), b.transporter.download();
        }),
        $(".delete a").mouseup(function (a) {
          a.preventDefault(), $(this).parent().find(".confirm").show();
        }),
        $(".delete button").mouseup(function (a) {
          a.preventDefault(),
            $(this).find(".confirm").show(),
            $.ajax({
              url: App.URL.root + "api/delete",
              type: "post",
              data: { id: $(this).data("id") },
            }),
            $(".delete").text("Your skin will be deleted in 24 hours.");
        }),
        $("a.ban").mouseup(function (a) {
          a.preventDefault();
          var b = $('<input placeholder = "What is the reason?" >'),
            c = $("<button>Notify the Admins</button>");
          $(this).after(c).after(b).remove(),
            b.focus(),
            b.keypress(function (a) {
              13 == a.which && (a.preventDefault(), c.click());
            }),
            c.click(function (a) {
              var d = b.val().toLowerCase();
              d.length > 4 &&
                document.URL.length > 4 &&
                d.indexOf("stole") == -1 &&
                d.indexOf("steal") == -1 &&
                d.indexOf("copied") == -1 &&
                $.ajax({
                  url: App.URL.root + "api/ban",
                  type: "post",
                  data: { url: document.URL, reason: b.val() },
                }),
                b.after("<div>Thank you the admins have been notified</div>"),
                c.remove(),
                b.remove();
            });
        }),
        $(".admin-panel .decatorize").click(function (a) {
          a.preventDefault(),
            $.ajax({
              url: App.URL.root + "api/decatorize",
              type: "post",
              data: { id: $(this).data("id") },
            }),
            $(this)
              .text("Done!")
              .css("color", "black")
              .css("text-decoration", "none");
        });
    });
}

/* Custom Scripts by Moxvallix */

// https://stackoverflow.com/questions/3916191/download-data-url-file

function download(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}