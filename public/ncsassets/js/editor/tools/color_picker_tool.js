App.ColorPickerTool = function (a, b) {
  "use strict";
  var shiftHeld = false;
  function handleShift(e) { shiftHeld = e.shiftKey }
  document.addEventListener("keydown", handleShift, true);
  document.addEventListener("keyup", handleShift, true);
  function c() {
    o.addClass("active"), (m = true);
  }
  function d(a) {
    (m = false),
      o.removeClass("active"),
      n.removeClass("transparent-active"),
      a && f(a);
  }
  function addPaletteColor(color) {
    if (blendPalette.includes(color)) { return; }
    blendPalette.push(color);
    localStorage.blendPalette = JSON.stringify(blendPalette);
    t.append('<div data-color = "' + color + '" style = "background:#' + color + '"></div>' )
  }
  function getPaletteColor() {
    if (blendPalette.length < 1 || k.isAlpha()) { return k; }
    var colorPool = [];
    blendPalette.forEach(e => {
      var rgb = $.fn.wheelColorPicker.strToColor(e);
      colorPool.push(new THREE.Color().setRGB(rgb.r, rgb.g, rgb.b));
    })
    return colorPool[Math.floor(Math.random() * colorPool.length)];
  }
  function e(a, fromPalette) {
    var color = (fromPalette ? getPaletteColor() : k);
    if (!a || color.isAlpha()) return color;
    var b = color.getHSL();
    return b.l >= 0.5
      ? new THREE.Color(color).setHSL(b.h, b.s, b.l - Math.random() / 8)
      : new THREE.Color(color).setHSL(b.h, b.s, b.l + Math.random() / 10);
  }
  function f(a) {
    a.isAlpha()
      ? k.isAlpha() || n.addClass("transparent-active")
      : (r.wheelColorPicker("setValue", a.getHexString()),
        k.isAlpha() && n.removeClass("transparent-active")),
      (k = a.clone()),
      (localStorage.currentColor = JSON.stringify(k));
      r[0].value = `#${a.getHexString()}`;
      r[0].style.backgroundColor = `#${a.getHexString()}`;
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
  function showBlendPalette() {
    if (null === localStorage.getItem("blendPalette")) { return; }
    var colors = JSON.parse(localStorage.blendPalette)
    colors.forEach( e => {
      addPaletteColor(e)
    })
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
  function toggleTransparent () {
    if (k.isAlpha()) {
      var a = r.wheelColorPicker("getColor");
      f(new THREE.Color().setRGB(a.r, a.g, a.b));
    } else f(new THREE.Color().setAlpha());
  }
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
    p = $('<div class = "absolute z-50 top-2 left-2 p-1 btn-ncs w-6 h-6 cursor-pointer" title = "eraser" ></div>'),
    q = $('<div class = "recent" ></div>'),
    r = $('<input class="hex-input" type="text" value="#ff0000">'),
    s = $('<img src="/ncsassets/img/eraser.svg">'),
    t = $('<div class = "recent blend empty:hidden" ></div>');
  var blendPalette = [];
  return (
    n.append(p),
    n.append(o),
    n.append(r),
    n.append(q),
    n.append(t),
    a.append(n),
    p.append(s),
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
    r.on("sliderup", function (e) {
      if (shiftHeld) {
        var color = $(this).wheelColorPicker('getValue');
        addPaletteColor(color.replace("#", ""));
      }
      var a = r.wheelColorPicker("getColor"),
        b = new THREE.Color().setRGB(a.r, a.g, a.b);
      b.protectAlpha(), f(b);
    }),
    r.on("change", function () {
      if (shiftHeld) {
        var color = $(this).wheelColorPicker('getValue');
        addPaletteColor(color.replace("#", ""));
      }
      var a = r.wheelColorPicker("getColor"),
        b = new THREE.Color().setRGB(a.r, a.g, a.b);
      b.protectAlpha(), f(b);
    }),
    p.click(function () { toggleTransparent() }),
    o.mouseup(function () {
      c();
    }),
    q.on("click", "div", function (event) {
      var color = $(this).attr("data-color");
      var a = parseInt("0x" + color, 16);
      f(new THREE.Color(a).protectAlpha());
      if (event.shiftKey) {
        addPaletteColor(color)
      }
    }),
    t.on("click", "div", function () {
      var color = $(this).attr("data-color");
      var index = blendPalette.indexOf(color);
      if (index > -1) {
        blendPalette.splice(index, 1);
        localStorage.blendPalette = JSON.stringify(blendPalette);
      }
      this.remove();
    }),
    h(),
    showBlendPalette(),
    f(new THREE.Color().setRGB(1, 0, 0)),
    console.log(a),
    $(".jQWCP-wWidget").width(a.width()),
    {
      enableDropper: c,
      toggleTransparent: toggleTransparent,
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
      previewColor: i,
      addRecentColorsFromFaces: j,
    }
  );
};
