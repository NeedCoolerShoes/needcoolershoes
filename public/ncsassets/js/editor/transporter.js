App.Transporter = function (a) {
  "use strict";
  function getUVCanvas(b, c, d) {
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
          f = f || new THREE.Color().setRGB(0, 0, 0);
          f.isAlpha() || o.setPixelColor(b, d, f);
        },
        d
      ),
      o
    );
  }
  function getUVImage(a, c, d) {
    return getUVCanvas(a, c, d).getImage();
  }
  function d(b, c, d) {
    var e = $.Deferred(),
      f = new THREE.ImageLoader(),
      g = App.UVMAP[c];
    f.setCrossOrigin(!0);
    var h = function (b) {
        if (
          (32 == b.height && App.UVMAP.current == c && (g = App.UVMAP.skinLT18),
          a.layerModel && a.layerModel.add)
        )
        o.setImage(b);
        let id = getWatermarkData(o.context) || d;
        var f = a.layerModel.add(id);
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
          App.URL.root + "ncsassets/ieproxy.php?url=" + encodeURIComponent(b)),
      f.load(b, h, i, j),
      e.promise()
    );
  }
  function e() {
    if (localStorage.getItem("layerJson")) {
      localStorage.setItem("layerJson-skin", localStorage.getItem("layerJson"))
      localStorage.removeItem("layerJson")
    }
    if (localStorage.getItem(`layerJson-${App.UVMAP.current}`)) {
      var b = localStorage.getItem(`layerJson-${App.UVMAP.current}`);
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
            App.UVMAP.current,
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
        h.load(App.URL.root + "ncsassets/" + a.img, d, e, f);
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
  function dataURL() {
    return getUVImage("skin", true).src;
  }
  function j() {
    var a = window.open(
      "https://minecraft.net/profile/skin/remote?url=" +
      getUVImage("skin", true).src,
        // App.config.s3.prefix.aws +
        // App.config.s3.suffix.file +
        // "/loading.png",
      "popup",
      "left=20,top=20,width=1200,height=600,toolbar=0,resizable=1"
    );
    // return $.ajax({
    //   url: App.URL.root + "api/temp",
    //   type: "post",
    //   data: { upload: c("skin", !0).src },
    // }).done(function (b) {
    //   a.location =
    //     "https://minecraft.net/profile/skin/remote?url=" +
    //     b.message;
    // });
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
    // k(App.URL.root + "download", { upload: c("skin", !0).src });
    download(getUVImage(App.UVMAP.current, true).src, "download.png");
  }
  function downloadLayers() {
    let data = JSON.stringify(
      {version: 2, model: App.UVMAP.current, data: localStorage.getItem(`layerJson-${App.UVMAP.current}`), blendPalette: localStorage.getItem("blendPalette")}
    );
    download(`data:text/json;,${data}`, "download.ncrs");
  }
  function m() {
    window.open(App.URL.root + "product/print3d/picnic");
  }
  function importLayers(file) {
    file.text().then( (text) => {
      let data = {}
      try {
        data = JSON.parse(text);
      } catch {
        window.alert("Invalid file format (JSON Parse Error)")
        return false;
      }
      if (!data.version) {
        window.alert("Invalid file format (NCRS Parse Error)")
        return false;
      }
      let warning = "You are about to import a project from your computer.\n" +
      "This will override any " + (data.model == "skinAlex" ? "slim" : "classic") +
      " model skins you are currently working on. Proceed?";
      if (window.confirm(warning)) {
        localStorage.setItem(`layerJson-${data.model}`, data.data);
        localStorage.setItem("model", data.model);
        if (data.blendPalette) {
          localStorage.setItem("blendPalette", data.blendPalette);
        }
        location.reload();
      }
    })
  }
  function n() {}

  // NCRS Additions
  function bytesToString(bytea) {
    let i = 0;
    return bytea.map(byte => {
      i ++;
      if (byte == 0 || i % 4 == 0) {
        return '';
      }
      return String.fromCharCode(byte);
    }).join('');
  }

  function getWatermarkData(context) {
    let imgData = context.getImageData(0, 0, 8, 8);
    console.log(imgData)
    let str = bytesToString(Array.from(imgData.data));
    if (/https?/.test(str)) {
      return str;
    } else {
      return false;
    }
  }
  
  var o = new App.Canvas(),
    p = {};
  return {
    loadFromLocalStorage: e,
    minecraftNet: j,
    download: l,
    downloadLayers: downloadLayers,
    shirt: n,
    print3d: m,
    getUVCanvas: getUVCanvas,
    getUVImage: getUVImage,
    setUVImage: d,
    getAffineCanvas: f,
    drawTexturedTriangle: i,
    submitter: k,
    importLayers: importLayers,
  };
};