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
    i = $("<button>Download to Computer (PNG)</button>").mousedown(function (a) {
      b.transporter.download();
    }),
    ii = $("<button>Export Layers (NCRS)</button>").mousedown(function (a) {
      b.transporter.downloadLayers();
    }),
    j = $("<button>Share to Gallery</button>").mousedown(function (
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
              c = b.transporter.getUVImage(App.UVMAP.current, true),
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
    f.append(ii),
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
