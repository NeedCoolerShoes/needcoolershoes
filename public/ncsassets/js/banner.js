var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

  function init() {
    (_canvas = document.getElementById("canvas")),
      (_layers = document.getElementById("layers")),
      (_preview = document.getElementById("preview")),
      (_url = document.getElementById("url")),
      (_urlGal = document.getElementById("url-gal")),
      (_code = document.getElementById("code")),
      (_craft = document.getElementById("craft")),
      (_savedCont = document.getElementById("saved")),
      (_savedGal = document.getElementById("saved-gal")),
      (_total = document.getElementById("total")),
      (_layers.firstElementChild.onmousedown = function (a) {
        layerHandler(a);
      }),
      new Sortable(document.getElementById("layers"), {
        draggable: ".dgbl",
        handle: ".layer-drag",
        onUpdate: function () {
          updSortableLayers();
        },
      }),
      supports_html5_storage()
        ? (loadLocal(), setUrlGal())
        : _savedCont.classList.add("off"),
      readUrl(),
      (document.getElementById("hidey").className = "hidey");
  }
  function newPattern(a, b) {
    if (
      !(
        "undefined" == typeof a ||
        "undefined" == typeof b ||
        _patterns.indexOf(a) > 39 ||
        "base" == a
      )
    ) {
      var c, d, a;
      (c = document.createElement("i")),
        c.setAttribute("ptn", a),
        c.setAttribute("clr", b),
        _canvas.appendChild(c),
        (d = document.createElement("div")),
        (d.className = "layer vis dgbl"),
        (d.innerHTML +=
          '<div class="layer-color"></div><div class="layer-vis sel"></div><div class="layer-pattern"><div class="layer-hover"><div class="layer-color-container"><div class="tb-color black" title="black"></div><div class="tb-color dark_gray" title="dark_gray"></div><div class="tb-color gray" title="gray"></div><div class="tb-color white" title="white"></div><div class="tb-color pink" title="pink"></div><div class="tb-color magenta" title="magenta"></div><div class="tb-color purple" title="purple"></div><div class="tb-color blue" title="blue"></div><div class="tb-color cyan" title="cyan"></div><div class="tb-color light_blue" title="light_blue"></div><div class="tb-color green" title="green"></div><div class="tb-color lime" title="lime"></div><div class="tb-color yellow" title="yellow"></div><div class="tb-color orange" title="orange"></div><div class="tb-color brown" title="brown"></div><div class="tb-color red" title="red"></div></div><div class="layer-pattern-container"><div class="tbc"><i class="tb-ptn" ptn="gra" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="gru" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="bri" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="hh" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="hhb" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="vh" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="vhr" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="ts" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="bs" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="ls" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="rs" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="ld" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="rud" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="lud" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="rd" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="cr" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="dls" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="drs" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="sc" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="cs" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="ms" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="tl" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="bl" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="tr" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="br" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="tt" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="bt" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="mr" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="mc" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="bts" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="tts" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="ss" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="bo" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="cbo" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="flo" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="cre" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="sku" clr="15"></i></div><div class="tbc"><i class="tb-ptn" ptn="moj" clr="15"></i></div></div></div></div><div class="layer-craft"></div><div class="layer-del"></div><div class="layer-drag"></div><div class="layer-move"><div class="layer-up"></div><div class="layer-down"></div></div>'),
        (c = document.createElement("i")),
        c.setAttribute("ptn", a),
        c.setAttribute("clr", b),
        c.classList.add("tb-ptn"),
        d.getElementsByClassName("layer-pattern")[0].appendChild(c),
        d.getElementsByClassName("layer-color")[0].classList.add(_colorsInv[b]),
        (d.getElementsByClassName("layer-color")[0].title = _colorsInv[b]);
      var e = d.getElementsByTagName("i");
      for (i = 0; i < e.length; i++) e[i].setAttribute("clr", b);
      d
        .getElementsByClassName("layer-craft")[0]
        .appendChild(craftPattern(a, b)),
        _layers.appendChild(d),
        (_layers.lastElementChild.onmousedown = function (a) {
          layerHandler(a);
        }),
        layerMoveRedraw();
    }
  }
  function updateLayer(a, b, c) {
    var d,
      e = Array.prototype.indexOf.call(_layers.children, c);
    "" === a && (a = _canvas.children[e].getAttribute("ptn")),
      "" === b
        ? (b = _canvas.children[e].getAttribute("clr"))
        : "string" == typeof b &&
          (b.length < 3 ? (crl = parseInt(b, 10)) : (b = _colors[b])),
      _canvas.children[e].setAttribute("ptn", a),
      _canvas.children[e].setAttribute("clr", b),
      (c.getElementsByClassName("layer-color")[0].className =
        "layer-color " + _colorsInv[b]),
      (c.getElementsByClassName("layer-color")[0].title = _colorsInv[b]),
      (d = c.getElementsByClassName("layer-craft")[0]),
      (d.innerHTML = ""),
      d.appendChild(craftPattern(a, b));
    var f = c.getElementsByTagName("i");
    if (f[f.length - 1].getAttribute("clr") != b)
      for (i = 0; i < f.length; i++) f[i].setAttribute("clr", b);
    f[f.length - 1].setAttribute("ptn", a);
  }
  function updSortableLayers() {
    for (var a = 1; a < _layers.children.length; a++)
      updateLayer(
        _layers.children[a]
          .getElementsByClassName("layer-pattern")[0]
          .lastElementChild.getAttribute("ptn"),
        _layers.children[a]
          .getElementsByClassName("layer-pattern")[0]
          .lastElementChild.getAttribute("clr"),
        _layers.children[a]
      ),
        _layers.children[a].classList.contains("vis")
          ? _canvas.children[a].classList.remove("hidden")
          : _canvas.children[a].classList.add("hidden");
    layerMoveRedraw(), updateOutput();
  }
  function patternsHandler(a) {
    if ("I" == a.target.tagName) {
      var b = a.target.getAttribute("ptn"),
        c = _colors[_color];
      newPattern(b, c), (_preview.innerHTML = ""), updateOutput();
    } else if ("I" == a.target.children[0].tagName) {
      var b = a.target.children[0].getAttribute("ptn"),
        c = _colors[_color];
      newPattern(b, c), (_preview.innerHTML = ""), updateOutput();
    }
  }
  function showPreview(a) {
    if ("I" == a.target.tagName) {
      var b = a.target.getAttribute("ptn"),
        c = _colors[_color];
      (img = document.createElement("i")),
        img.setAttribute("ptn", b),
        img.setAttribute("clr", c),
        _preview.appendChild(img);
    } else if ("I" == a.target.children[0].tagName) {
      var b = a.target.children[0].getAttribute("ptn"),
        c = _colors[_color];
      (img = document.createElement("i")),
        img.setAttribute("ptn", b),
        img.setAttribute("clr", c),
        _preview.appendChild(img);
    }
  }
  function hidePreview(a) {
    _preview.innerHTML = "";
  }
  function colorsHandler(a) {
    var b;
    if ("tb-color" == a.target.classList[0]) {
      for (b = 0; b < a.target.parentNode.childElementCount; b++)
        a.target.parentNode.children[b].classList.remove("sel");
      a.target.classList.add("sel"), (_color = a.target.classList[1]);
      var c = document
        .getElementById("toolbar-patterns")
        .getElementsByTagName("i");
      for (b = 0; b < c.length; b++) c[b].setAttribute("clr", _colors[_color]);
    }
  }
  function layerHandler(a) {
    var b, c, d;
    switch (a.target.classList[0]) {
      case "tb-color":
        (c = a.target.parentNode.parentNode.parentNode.parentNode),
          (d = a.target.classList[1]),
          updateLayer("", d, c);
        break;
      case "tb-ptn":
        (c = a.target.parentNode.parentNode.parentNode.parentNode.parentNode),
          "layer-hover" != a.target.parentNode &&
            updateLayer(a.target.getAttribute("ptn"), "", c);
        break;
      case "layer-del":
        (c = a.target.parentNode),
          (b = Array.prototype.indexOf.call(_layers.children, c)),
          _layers.removeChild(_layers.children[b]),
          _canvas.removeChild(_canvas.children[b]),
          layerMoveRedraw();
        break;
      case "layer-up":
        (c = a.target.parentNode.parentNode),
          (b = Array.prototype.indexOf.call(_layers.children, c)),
          b > 1 &&
            (_layers.children[b].parentNode.insertBefore(
              _layers.children[b],
              _layers.children[b - 1]
            ),
            _canvas.children[b].parentNode.insertBefore(
              _canvas.children[b],
              _canvas.children[b - 1]
            ),
            layerMoveRedraw());
        break;
      case "layer-down":
        (c = a.target.parentNode.parentNode),
          (b = Array.prototype.indexOf.call(_layers.children, c)),
          b < _layers.children.length - 1 &&
            (_layers.children[b + 1].parentNode.insertBefore(
              _layers.children[b + 1],
              _layers.children[b]
            ),
            _canvas.children[b + 1].parentNode.insertBefore(
              _canvas.children[b + 1],
              _canvas.children[b]
            ),
            layerMoveRedraw());
        break;
      case "layer-vis":
        (c = a.target.parentNode),
          (b = Array.prototype.indexOf.call(_layers.children, c)),
          a.target.classList.toggle("sel"),
          _canvas.children[b].classList.toggle("hidden"),
          c.classList.toggle("vis");
    }
    updateOutput();
  }
  function layerMoveRedraw() {
    var a = _layers.getElementsByClassName("layer-move");
    if (a.length > 1)
      for (i = 0; i < a.length; i++)
        i < a.length - 1 && a[i + 1].children[0].classList.remove("hidden"),
          i > 0 && a[i - 1].children[1].classList.remove("hidden");
    a.length > 0 &&
      (a[0].children[0].classList.add("hidden"),
      a[a.length - 1].children[1].classList.add("hidden"));
  }
  function getNBT() {
    var a = {};
    (a.Base = _canvas.children[0].getAttribute("clr")), (a.Patterns = []);
    for (var b = 1; b < _canvas.children.length; b++)
      _canvas.children[b].classList.contains("hidden") ||
        a.Patterns.push({
          Pattern: _canvas.children[b].getAttribute("ptn"),
          Color: _canvas.children[b].getAttribute("clr"),
        });
    return a;
  }
  function jsonOutput(a) {
    var b;
    _jsonMode = a;
    var c = getNBT();
    switch (_jsonMode) {
      case 0:
        b =
          "/give @p minecraft:banner 1 0 " +
          JSON.stringify({ BlockEntityTag: c });
        break;
      case 1:
        b =
          "/setblock ~ ~1 ~ minecraft:standing_banner 0 replace " +
          JSON.stringify(c);
        break;
      case 2:
        b =
          "/replaceitem entity @p slot.armor.head minecraft:banner 1 0 " +
          JSON.stringify({ BlockEntityTag: c });
        break;
      case 3:
        b = JSON.stringify({ BlockEntityTag: c }, "", 1);
    }
    (b = b.replace(/"/g, "")), (_code.value = b);
  }
  function jsonInput() {
    var i,
      elem,
      val = document.getElementById("code").value;
    val = val.replace(/[\r\n\s\t]+?/g, "");
    var rgx = /{(.*)}/g;
    (val = rgx.exec(val)[0]), (val = val.toLowerCase());
    var obj = eval("(" + val + ")");
    for (
      "undefined" != typeof obj.blockentitytag && (obj = obj.blockentitytag),
        void 0 == obj.base && (obj.base = 15),
        clearAll(),
        updateLayer("base", obj.base, _layers.firstElementChild),
        i = 0;
      i < obj.patterns.length;
      i++
    )
      newPattern(obj.patterns[i].pattern, obj.patterns[i].color);
    updateOutput();
  }
  function clearAll() {
    for (var a = 1; a < _canvas.children.length; a++)
      a--,
        _canvas.removeChild(_canvas.children[1]),
        _layers.removeChild(_layers.children[1]);
    updateLayer("base", 15, _layers.firstElementChild), updateOutput();
  }
  function updateTip() {
    for (
      var a = _layers.getElementsByClassName("vis"), b = 1;
      b < _layers.children.length;
      b++
    )
      _layers.children[b].classList.remove("tip");
    void 0 !== a[7] && a[7].classList.add("tip");
  }
  function updateTotals() {
    var a,
      b,
      c,
      d,
      e,
      f,
      g = "";
    for (_totals = {}, a = _canvas.children, e = 0; e < a.length; e++)
      for (
        d = a[e].getAttribute("ptn"),
          b = _crafting[d],
          c = a[e].getAttribute("clr"),
          k = 0;
        k < b.length;
        k++
      )
        ("bri" != d &&
          "flo" != d &&
          "moj" != d &&
          "cbo" != d &&
          "cre" != d &&
          "sku" != d) ||
          0 != c ||
          (black = !0),
          "" != b[k] &&
            "bn" != b[k] &&
            (1 == b[k]
              ? "base" == d
                ? (_totals["~" + _colorsInv[c]] =
                    (_totals["~" + _colorsInv[c]] || 0) + 1)
                : black ||
                  (_totals[_colorsInv[c]] = (_totals[_colorsInv[c]] || 0) + 1)
              : (_totals[b[k]] = (_totals[b[k]] || 0) + 1)),
          (black = !1);
    for (e in _totals)
      (f = document.createElement("div")),
        (f.className =
          "~" == e[0] ? e.substr(1) + " craft-u craft-base" : e + " craft-u"),
        (g += "<div><span>" + _totals[e] + "</span>" + f.outerHTML + "</div>");
    _total.innerHTML = g;
  }
  function updateOutput() {
    var a,
      b = "",
      c = getNBT();
    if (
      (updateTip(),
      updateTotals(),
      "undefined" != typeof _jsonMode && jsonOutput(_jsonMode),
      (b += encPair(c.Base, "base")),
      c.Patterns.length > 0)
    ) {
      for (a = 0; a < c.Patterns.length; a++)
        b += encPair(c.Patterns[a].Color, c.Patterns[a].Pattern);
      (_url.value =
        window.location.protocol +
        "//" +
        window.location.hostname +
        window.location.pathname +
        "?=" +
        b),
        window.history.pushState &&
          window.history.pushState(
            "Minecraft Banner Generator",
            "Minecraft Banner Generator",
            window.location.pathname + "?=" + b
          );
    } else
      (_url.value = ""),
        (b = ""),
        window.history.pushState &&
          window.history.pushState(
            "Minecraft Banner Generator",
            "Minecraft Banner Generator",
            window.location.pathname
          );
  }
  function setUrlGal() {
    if (supports_html5_storage() && null != localStorage.getObject("bn")) {
      var a,
        b,
        c = "",
        b = localStorage.getObject("bn");
      if (b.length > 0) {
        for (a = 0; a < b.length; a++)
          if (b[a].Patterns.length > 0) {
            c += encPair(b[a].Base, "base");
            for (var d = 0; d < b[a].Patterns.length; d++)
              c += encPair(b[a].Patterns[d].Color, b[a].Patterns[d].Pattern);
            a != b.length - 1 && (c += "_");
          }
        _urlGal.value =
          window.location.protocol +
          "//" +
          window.location.hostname +
          window.location.pathname +
          "?=" +
          c;
      } else _urlGal.value = "";
    }
  }
  function readUrl() {
    var a,
      b,
      c,
      d = window.location.search,
      e = {};
    if (d.length < 3)
      return void updateLayer("base", 15, _layers.firstElementChild);
    if (((d = d.substr(2)), (a = d.split("_")), a[0].indexOf(".") !== -1))
      for (b = 0; b < a.length; b++) {
        for (a[b] = a[b].split("."), c = 0; c < a[b].length; c++)
          a[b][c] = a[b][c].split("-");
        a[b][0][1] = "base";
      }
    else
      for (b = 0; b < a.length; b++)
        for (a[b] = a[b].match(/.{2}/g), c = 0; c < a[b].length; c++)
          a[b][c] = decPair(a[b][c]);
    for (
      _savedTemp = a,
        e.base = a[0][0][0],
        e.patterns = a[0],
        updateLayer("base", e.base, _layers.firstElementChild),
        b = 1;
      b < a[0].length;
      b++
    )
      newPattern(a[0][b][1], a[0][b][0]);
    if (a.length > 0) {
      (document.getElementById("saved-gal-cont").className = ""),
        document.getElementById("saved-addall").classList.remove("hidden");
      for (var b = 0; b < a.length; b++) {
        var f = document.createElement("div");
        f.className = "saved-unit";
        var g = document.createElement("i");
        (g.className = "tb-ptn"),
          g.setAttribute("ptn", "base"),
          g.setAttribute("clr", a[b][0][0]),
          f.appendChild(g);
        for (var c = 0; c < a[b].length; c++) {
          var g = document.createElement("i");
          (g.className = "tb-ptn"),
            g.setAttribute("ptn", a[b][c][1]),
            g.setAttribute("clr", a[b][c][0]),
            f.appendChild(g);
        }
        _savedGal.appendChild(f);
      }
    }
    updateTip(), updateTotals();
  }
  function chaosInt(a, b) {
    return Math.floor(Math.random() * (b + 1 - a)) + a;
  }
  function chaos() {
    var a;
    clearAll();
    var b = chaosInt(0, 15);
    updateLayer("base", b, _layers.firstElementChild);
    var c = document
      .getElementById("toolbar-patterns")
      .getElementsByTagName("i");
    for (a = 0; a < 6; a++)
      newPattern(
        c[chaosInt(0, c.length - 1)].getAttribute("ptn"),
        chaosInt(0, 15)
      );
    updateOutput();
  }
  function craftPattern(a, b) {
    var c, d;
    if ("undefined" != typeof _crafting[a]) {
      var e = _crafting[a].slice();
      "number" == typeof b && (b = _colorsInv[b]),
        b.length < 3 && (b = _colorsInv[b]);
      for (var f = 0; f < e.length; f++)
        1 == e[f] &&
          (!(
            e.indexOf("brick") > -1 ||
            e.indexOf("vine") > -1 ||
            e.indexOf("creeper") > -1 ||
            e.indexOf("wither") > -1 ||
            e.indexOf("flower") > -1 ||
            e.indexOf("apple") > -1
          ) ||
          ("black" != b && "0" != b)
            ? (e[f] = b)
            : (e[f] = ""));
      (c = document.createElement("div")), (c.className = "craft-t");
      for (var f = 0; f < e.length; f++)
        (d = document.createElement("div")),
          (d.className = "base" == a ? "craft-u craft-base" : "craft-u"),
          "" != e[f] && d.classList.add(e[f]),
          c.appendChild(d);
      return c;
    }
  }
  function screenshot() {
    var a = document.getElementById("layers-cont");
    console.log(a),
      html2canvas(a, {
        onrendered: function (a) {
          window.open(a.toDataURL("image/png"));
        },
      });
  }
  function savedGalHandler(a) {
    if ("tb-ptn" == a.target.className) {
      (index = Array.prototype.indexOf.call(
        _savedGal.children,
        a.target.parentNode
      )),
        clearAll(),
        updateLayer("base", _savedTemp[index][0][0], _layers.firstElementChild);
      for (var b = 1; b < _savedTemp[index].length; b++)
        newPattern(_savedTemp[index][b][1], _savedTemp[index][b][0]);
      updateOutput();
    }
  }
  function loadLocal() {
    if (null != localStorage.getObject("bn")) {
      _saved = localStorage.getObject("bn");
      for (var a = 0; a < _saved.length; a++) newSaved(_saved[a]);
      "on" == localStorage.compact &&
        (document.getElementById("bcompact").classList.add("on"),
        document
          .getElementById("bcompact")
          .parentNode.classList.add("compact")),
        "on" == localStorage.epic &&
          (document.getElementById("bepic").classList.add("on"),
          document
            .getElementsByClassName("canvas-cont")[0]
            .classList.add("epic"));
    }
  }
  function newSaved(a) {
    var b = document.createElement("div");
    (b.className = "saved-unit"),
      (b.innerHTML =
        '<div class="saved-unit-tool"><div class="saved-unit-del"></div></div>');
    var c = document.createElement("i");
    (c.className = "tb-ptn"),
      c.setAttribute("ptn", "base"),
      c.setAttribute("clr", a.Base),
      b.appendChild(c);
    for (var d = 0; d < a.Patterns.length; d++)
      (c = document.createElement("i")),
        (c.className = "tb-ptn"),
        c.setAttribute("ptn", a.Patterns[d].Pattern),
        c.setAttribute("clr", a.Patterns[d].Color),
        b.appendChild(c);
    _savedCont.insertBefore(b, document.getElementById("saved-add"));
  }
  function addLocal(a) {
    var b = "undefined" != typeof a ? a : getNBT();
    _saved.push(b), localStorage.setObject("bn", _saved), newSaved(b);
  }
  function delLocal(a) {
    _saved.splice(a, 1),
      localStorage.setObject("bn", _saved),
      _savedCont.removeChild(_savedCont.children[a]);
  }
  function savedHandler(a) {
    var b;
    switch (a.target.className) {
      case "saved-add":
        addLocal();
        break;
      case "saved-unit-del":
        delLocal(
          Array.prototype.indexOf.call(
            _savedCont.children,
            a.target.parentNode.parentNode
          )
        );
        break;
      case "tb-ptn":
        (index = Array.prototype.indexOf.call(
          _savedCont.children,
          a.target.parentNode
        )),
          clearAll(),
          updateLayer("base", _saved[index].Base, _layers.firstElementChild);
        for (var b = 0; b < _saved[index].Patterns.length; b++)
          newPattern(
            _saved[index].Patterns[b].Pattern,
            _saved[index].Patterns[b].Color
          );
        break;
      case "saved-addall":
        for (obj = [], b = 0; b < _savedTemp.length; b++)
          for (
            obj.push({ Base: _savedTemp[b][0][0], Patterns: [] }), k = 1;
            k < _savedTemp[b].length;
            k++
          )
            obj[b].Patterns.push({
              Color: _savedTemp[b][k][0],
              Pattern: _savedTemp[b][k][1],
            });
        for (b = 0; b < obj.length; b++) addLocal(obj[b]);
    }
    setUrlGal(), updateOutput();
  }
  function clearSaved() {
    var a = confirm("Are you sure?");
    a &&
      ((_saved = []),
      localStorage.setObject("bn", _saved),
      (_savedCont.innerHTML =
        '<div class="saved-add" id="saved-add">+</div><div class="saved-addall" id="saved-addall">+</div>'));
  }
  function exportChest(a) {
    var b, c, d, e;
    if (
      ((e = "/setblock ~0 ~1 ~0 minecraft:chest 0 replace {Items:["),
      0 == a && 1 == supports_html5_storage())
    ) {
      if (
        localStorage.getObject("bn").length < 1 ||
        null == localStorage.getObject("bn")
      )
        return void alert("Nothing to export.");
      d = localStorage.getObject("bn");
      for (var b = 0; b < d.length; b++)
        e +=
          "{id:minecraft:banner,Count:1,Slot:" +
          b +
          ",tag:{BlockEntityTag:" +
          JSON.stringify(d[b]) +
          "}},";
      e += "]}";
    } else {
      for (d = [], b = 0; b < _savedTemp.length; b++)
        for (
          d.push({ Base: _savedTemp[b][0][0], Patterns: [] }), c = 1;
          c < _savedTemp[b].length;
          c++
        )
          d[b].Patterns.push({
            Color: _savedTemp[b][c][0],
            Pattern: _savedTemp[b][c][1],
          });
      for (var b = 0; b < d.length; b++)
        e +=
          "{id:minecraft:banner,Count:1,Slot:" +
          b +
          ",tag:{BlockEntityTag:" +
          JSON.stringify(d[b]) +
          "}},";
      e += "]}";
    }
    (e = e.replace(/"/g, "")),
      prompt(
        "Your chest code is below. Copy this to a command block and activate it!",
        e
      );
  }
  function encPair(a, b) {
    b = _patterns.indexOf(b);
    var c = ((b >> 6) << 4) | (15 & a),
      d = 63 & b;
    return base64dict[c] + base64dict[d];
  }
  function decPair(a) {
    var b = base64dict.indexOf(a.charAt(0)),
      c = base64dict.indexOf(a.charAt(1)),
      d = 15 & b,
      e = _patterns[((b >> 4) << 6) | c];
    return [d, e];
  }
  function compact(a) {
    a.target.classList.contains("on")
      ? (a.target.parentNode.classList.remove("compact"),
        a.target.classList.remove("on"),
        supports_html5_storage() && (localStorage.compact = "off"))
      : (a.target.parentNode.classList.add("compact"),
        a.target.classList.add("on"),
        supports_html5_storage() && (localStorage.compact = "on"));
  }
  function epic(a) {
    a.target.classList.contains("on")
      ? (document
          .getElementsByClassName("canvas-cont")[0]
          .classList.remove("epic"),
        a.target.classList.remove("on"),
        supports_html5_storage() && (localStorage.epic = "off"))
      : (document
          .getElementsByClassName("canvas-cont")[0]
          .classList.add("epic"),
        a.target.classList.add("on"),
        supports_html5_storage() && (localStorage.epic = "on"));
  }
  function donatePopup() {
    document.getElementsByClassName("donate-w")[0].classList.remove("hidden"),
      (document.onmousedown = function (a) {
        a.target.classList.contains("donate-w") ||
          a.target.classList.contains("no") ||
          (document
            .getElementsByClassName("donate-w")[0]
            .classList.add("hidden"),
          (document.onmousedown = ""));
      });
  }
  function halp() {
    document.getElementById("halp").classList.remove("hidden"),
      document.getElementById("halp2").classList.remove("hidden"),
      (document.onmousedown = function () {
        document.getElementById("halp").classList.add("hidden"),
          document.getElementById("halp2").classList.add("hidden"),
          (document.onmousedown = "");
      });
  }
  function supports_html5_storage() {
    try {
      return "localStorage" in window && null !== window.localStorage;
    } catch (a) {
      return !1;
    }
  }
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
          "https://web.archive.org/web/20221208085528/http://localhost:35729/livereload.js"
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
    }),
    "document" in self &&
      !("classList" in document.createElement("_")) &&
      !(function (a) {
        "use strict";
        if ("Element" in a) {
          var b = "classList",
            c = "prototype",
            d = a.Element[c],
            e = Object,
            f =
              String[c].trim ||
              function () {
                return this.replace(/^\s+|\s+$/g, "");
              },
            g =
              Array[c].indexOf ||
              function (a) {
                for (var b = 0, c = this.length; b < c; b++)
                  if (b in this && this[b] === a) return b;
                return -1;
              },
            h = function (a, b) {
              (this.name = a),
                (this.code = DOMException[a]),
                (this.message = b);
            },
            i = function (a, b) {
              if ("" === b)
                throw new h(
                  "SYNTAX_ERR",
                  "An invalid or illegal string was specified"
                );
              if (/\s/.test(b))
                throw new h(
                  "INVALID_CHARACTER_ERR",
                  "String contains an invalid character"
                );
              return g.call(a, b);
            },
            j = function (a) {
              for (
                var b = f.call(a.getAttribute("class") || ""),
                  c = b ? b.split(/\s+/) : [],
                  d = 0,
                  e = c.length;
                d < e;
                d++
              )
                this.push(c[d]);
              this._updateClassName = function () {
                a.setAttribute("class", this.toString());
              };
            },
            k = (j[c] = []),
            l = function () {
              return new j(this);
            };
          if (
            ((h[c] = Error[c]),
            (k.item = function (a) {
              return this[a] || null;
            }),
            (k.contains = function (a) {
              return (a += ""), i(this, a) !== -1;
            }),
            (k.add = function () {
              var a,
                b = arguments,
                c = 0,
                d = b.length,
                e = !1;
              do (a = b[c] + ""), i(this, a) === -1 && (this.push(a), (e = !0));
              while (++c < d);
              e && this._updateClassName();
            }),
            (k.remove = function () {
              var a,
                b = arguments,
                c = 0,
                d = b.length,
                e = !1;
              do {
                a = b[c] + "";
                var f = i(this, a);
                f !== -1 && (this.splice(f, 1), (e = !0));
              } while (++c < d);
              e && this._updateClassName();
            }),
            (k.toggle = function (a, b) {
              a += "";
              var c = this.contains(a),
                d = c ? b !== !0 && "remove" : b !== !1 && "add";
              return d && this[d](a), !c;
            }),
            (k.toString = function () {
              return this.join(" ");
            }),
            e.defineProperty)
          ) {
            var m = { get: l, enumerable: !0, configurable: !0 };
            try {
              e.defineProperty(d, b, m);
            } catch (n) {
              n.number === -2146823252 &&
                ((m.enumerable = !1), e.defineProperty(d, b, m));
            }
          } else e[c].__defineGetter__ && d.__defineGetter__(b, l);
        }
      })(self),
    (function (a, b, c) {
      "use strict";
      function d(a, b, c) {
        var d,
          e = a.runtimeStyle && a.runtimeStyle[b],
          f = a.style;
        return (
          !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(c) &&
            /^-?\d/.test(c) &&
            ((d = f.left),
            e && (a.runtimeStyle.left = a.currentStyle.left),
            (f.left = "fontSize" === b ? "1em" : c || 0),
            (c = f.pixelLeft + "px"),
            (f.left = d),
            e && (a.runtimeStyle.left = e)),
          /^(thin|medium|thick)$/i.test(c)
            ? c
            : Math.round(parseFloat(c)) + "px"
        );
      }
      function e(a) {
        return parseInt(a, 10);
      }
      function f(a, b, e, f) {
        if (
          ((a = (a || "").split(",")),
          (a = a[f || 0] || a[0] || "auto"),
          (a = l.Util.trimText(a).split(" ")),
          "backgroundSize" !== e || (a[0] && !a[0].match(/cover|contain|auto/)))
        ) {
          if (
            ((a[0] = a[0].indexOf("%") === -1 ? d(b, e + "X", a[0]) : a[0]),
            a[1] === c)
          ) {
            if ("backgroundSize" === e) return (a[1] = "auto"), a;
            a[1] = a[0];
          }
          a[1] = a[1].indexOf("%") === -1 ? d(b, e + "Y", a[1]) : a[1];
        } else;
        return a;
      }
      function g(a, b, c, d, e, f) {
        var g,
          h,
          i,
          j,
          k = l.Util.getCSS(b, a, e);
        if (
          (1 === k.length && ((j = k[0]), (k = []), (k[0] = j), (k[1] = j)),
          k[0].toString().indexOf("%") !== -1)
        )
          (i = parseFloat(k[0]) / 100),
            (h = c.width * i),
            "backgroundSize" !== a && (h -= (f || d).width * i);
        else if ("backgroundSize" === a)
          if ("auto" === k[0]) h = d.width;
          else if (/contain|cover/.test(k[0])) {
            var m = l.Util.resizeBounds(
              d.width,
              d.height,
              c.width,
              c.height,
              k[0]
            );
            (h = m.width), (g = m.height);
          } else h = parseInt(k[0], 10);
        else h = parseInt(k[0], 10);
        return (
          "auto" === k[1]
            ? (g = (h / d.width) * d.height)
            : k[1].toString().indexOf("%") !== -1
            ? ((i = parseFloat(k[1]) / 100),
              (g = c.height * i),
              "backgroundSize" !== a && (g -= (f || d).height * i))
            : (g = parseInt(k[1], 10)),
          [h, g]
        );
      }
      function h(a, b) {
        var c = [];
        return {
          storage: c,
          width: a,
          height: b,
          clip: function () {
            c.push({ type: "function", name: "clip", arguments: arguments });
          },
          translate: function () {
            c.push({
              type: "function",
              name: "translate",
              arguments: arguments,
            });
          },
          fill: function () {
            c.push({ type: "function", name: "fill", arguments: arguments });
          },
          save: function () {
            c.push({ type: "function", name: "save", arguments: arguments });
          },
          restore: function () {
            c.push({ type: "function", name: "restore", arguments: arguments });
          },
          fillRect: function () {
            c.push({
              type: "function",
              name: "fillRect",
              arguments: arguments,
            });
          },
          createPattern: function () {
            c.push({
              type: "function",
              name: "createPattern",
              arguments: arguments,
            });
          },
          drawShape: function () {
            var a = [];
            return (
              c.push({ type: "function", name: "drawShape", arguments: a }),
              {
                moveTo: function () {
                  a.push({ name: "moveTo", arguments: arguments });
                },
                lineTo: function () {
                  a.push({ name: "lineTo", arguments: arguments });
                },
                arcTo: function () {
                  a.push({ name: "arcTo", arguments: arguments });
                },
                bezierCurveTo: function () {
                  a.push({ name: "bezierCurveTo", arguments: arguments });
                },
                quadraticCurveTo: function () {
                  a.push({ name: "quadraticCurveTo", arguments: arguments });
                },
              }
            );
          },
          drawImage: function () {
            c.push({
              type: "function",
              name: "drawImage",
              arguments: arguments,
            });
          },
          fillText: function () {
            c.push({
              type: "function",
              name: "fillText",
              arguments: arguments,
            });
          },
          setVariable: function (a, b) {
            return c.push({ type: "variable", name: a, arguments: b }), b;
          },
        };
      }
      function i(a) {
        return { zindex: a, children: [] };
      }
      var j,
        k,
        l = {};
      (l.Util = {}),
        (l.Util.log = function (b) {
          l.logging && a.console && a.console.log && a.console.log(b);
        }),
        (l.Util.trimText = (function (a) {
          return function (b) {
            return a ? a.apply(b) : ((b || "") + "").replace(/^\s+|\s+$/g, "");
          };
        })(String.prototype.trim)),
        (l.Util.asFloat = function (a) {
          return parseFloat(a);
        }),
        (function () {
          var a = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,
            b = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
          l.Util.parseTextShadows = function (c) {
            if (!c || "none" === c) return [];
            for (var d = c.match(a), e = [], f = 0; d && f < d.length; f++) {
              var g = d[f].match(b);
              e.push({
                color: g[0],
                offsetX: g[1] ? g[1].replace("px", "") : 0,
                offsetY: g[2] ? g[2].replace("px", "") : 0,
                blur: g[3] ? g[3].replace("px", "") : 0,
              });
            }
            return e;
          };
        })(),
        (l.Util.parseBackgroundImage = function (a) {
          var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j = " \r\n\t",
            k = [],
            l = 0,
            m = 0,
            n = function () {
              b &&
                ('"' === c.substr(0, 1) && (c = c.substr(1, c.length - 2)),
                c && i.push(c),
                "-" === b.substr(0, 1) &&
                  (e = b.indexOf("-", 1) + 1) > 0 &&
                  ((d = b.substr(0, e)), (b = b.substr(e))),
                k.push({
                  prefix: d,
                  method: b.toLowerCase(),
                  value: f,
                  args: i,
                })),
                (i = []),
                (b = d = c = f = "");
            };
          n();
          for (var o = 0, p = a.length; o < p; o++)
            if (((g = a[o]), !(0 === l && j.indexOf(g) > -1))) {
              switch (g) {
                case '"':
                  h ? h === g && (h = null) : (h = g);
                  break;
                case "(":
                  if (h) break;
                  if (0 === l) {
                    (l = 1), (f += g);
                    continue;
                  }
                  m++;
                  break;
                case ")":
                  if (h) break;
                  if (1 === l) {
                    if (0 === m) {
                      (l = 0), (f += g), n();
                      continue;
                    }
                    m--;
                  }
                  break;
                case ",":
                  if (h) break;
                  if (0 === l) {
                    n();
                    continue;
                  }
                  if (1 === l && 0 === m && !b.match(/^url$/i)) {
                    i.push(c), (c = ""), (f += g);
                    continue;
                  }
              }
              (f += g), 0 === l ? (b += g) : (c += g);
            }
          return n(), k;
        }),
        (l.Util.Bounds = function (a) {
          var b,
            c = {};
          return (
            a.getBoundingClientRect &&
              ((b = a.getBoundingClientRect()),
              (c.top = b.top),
              (c.bottom = b.bottom || b.top + b.height),
              (c.left = b.left),
              (c.width = a.offsetWidth),
              (c.height = a.offsetHeight)),
            c
          );
        }),
        (l.Util.OffsetBounds = function (a) {
          var b = a.offsetParent
            ? l.Util.OffsetBounds(a.offsetParent)
            : { top: 0, left: 0 };
          return {
            top: a.offsetTop + b.top,
            bottom: a.offsetTop + a.offsetHeight + b.top,
            left: a.offsetLeft + b.left,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        }),
        (l.Util.getCSS = function (a, c, d) {
          j !== a && (k = b.defaultView.getComputedStyle(a, null));
          var g = k[c];
          if (/^background(Size|Position)$/.test(c)) return f(g, a, c, d);
          if (/border(Top|Bottom)(Left|Right)Radius/.test(c)) {
            var h = g.split(" ");
            return h.length <= 1 && (h[1] = h[0]), h.map(e);
          }
          return g;
        }),
        (l.Util.resizeBounds = function (a, b, c, d, e) {
          var f,
            g,
            h = c / d,
            i = a / b;
          return (
            e && "auto" !== e
              ? (h < i) ^ ("contain" === e)
                ? ((g = d), (f = d * i))
                : ((f = c), (g = c / i))
              : ((f = c), (g = d)),
            { width: f, height: g }
          );
        }),
        (l.Util.BackgroundPosition = function (a, b, c, d, e) {
          var f = g("backgroundPosition", a, b, c, d, e);
          return { left: f[0], top: f[1] };
        }),
        (l.Util.BackgroundSize = function (a, b, c, d) {
          var e = g("backgroundSize", a, b, c, d);
          return { width: e[0], height: e[1] };
        }),
        (l.Util.Extend = function (a, b) {
          for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
          return b;
        }),
        (l.Util.Children = function (a) {
          var b;
          try {
            b =
              a.nodeName && "IFRAME" === a.nodeName.toUpperCase()
                ? a.contentDocument || a.contentWindow.document
                : (function (a) {
                    var b = [];
                    return (
                      null !== a &&
                        !(function (a, b) {
                          var d = a.length,
                            e = 0;
                          if ("number" == typeof b.length)
                            for (var f = b.length; e < f; e++) a[d++] = b[e];
                          else for (; b[e] !== c; ) a[d++] = b[e++];
                          return (a.length = d), a;
                        })(b, a),
                      b
                    );
                  })(a.childNodes);
          } catch (d) {
            l.Util.log(
              "html2canvas.Util.Children failed with exception: " + d.message
            ),
              (b = []);
          }
          return b;
        }),
        (l.Util.isTransparent = function (a) {
          return "transparent" === a || "rgba(0, 0, 0, 0)" === a;
        }),
        (l.Util.Font = (function () {
          var a = {};
          return function (b, d, e) {
            if (a[b + "-" + d] !== c) return a[b + "-" + d];
            var f,
              g,
              h,
              i = e.createElement("div"),
              j = e.createElement("img"),
              k = e.createElement("span"),
              l = "Hidden Text";
            return (
              (i.style.visibility = "hidden"),
              (i.style.fontFamily = b),
              (i.style.fontSize = d),
              (i.style.margin = 0),
              (i.style.padding = 0),
              e.body.appendChild(i),
              (j.src =
                "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs="),
              (j.width = 1),
              (j.height = 1),
              (j.style.margin = 0),
              (j.style.padding = 0),
              (j.style.verticalAlign = "baseline"),
              (k.style.fontFamily = b),
              (k.style.fontSize = d),
              (k.style.margin = 0),
              (k.style.padding = 0),
              k.appendChild(e.createTextNode(l)),
              i.appendChild(k),
              i.appendChild(j),
              (f = j.offsetTop - k.offsetTop + 1),
              i.removeChild(k),
              i.appendChild(e.createTextNode(l)),
              (i.style.lineHeight = "normal"),
              (j.style.verticalAlign = "super"),
              (g = j.offsetTop - i.offsetTop + 1),
              (h = { baseline: f, lineWidth: 1, middle: g }),
              (a[b + "-" + d] = h),
              e.body.removeChild(i),
              h
            );
          };
        })()),
        (function () {
          function a(a) {
            return function (b) {
              try {
                a.addColorStop(b.stop, b.color);
              } catch (d) {
                c.log(["failed to add color stop: ", d, "; tried to add: ", b]);
              }
            };
          }
          var c = l.Util,
            d = {};
          l.Generate = d;
          var e = [
            /^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,
            /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,
            /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,
            /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
          ];
          (d.parseGradient = function (a, b) {
            var c,
              d,
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
              p = e.length;
            for (d = 0; d < p && !(f = a.match(e[d])); d += 1);
            if (f)
              switch (f[1]) {
                case "-webkit-linear-gradient":
                case "-o-linear-gradient":
                  if (
                    ((c = {
                      type: "linear",
                      x0: null,
                      y0: null,
                      x1: null,
                      y1: null,
                      colorStops: [],
                    }),
                    (h = f[2].match(/\w+/g)))
                  )
                    for (i = h.length, d = 0; d < i; d += 1)
                      switch (h[d]) {
                        case "top":
                          (c.y0 = 0), (c.y1 = b.height);
                          break;
                        case "right":
                          (c.x0 = b.width), (c.x1 = 0);
                          break;
                        case "bottom":
                          (c.y0 = b.height), (c.y1 = 0);
                          break;
                        case "left":
                          (c.x0 = 0), (c.x1 = b.width);
                      }
                  if (
                    (null === c.x0 &&
                      null === c.x1 &&
                      (c.x0 = c.x1 = b.width / 2),
                    null === c.y0 &&
                      null === c.y1 &&
                      (c.y0 = c.y1 = b.height / 2),
                    (h = f[3].match(
                      /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g
                    )))
                  )
                    for (
                      i = h.length, j = 1 / Math.max(i - 1, 1), d = 0;
                      d < i;
                      d += 1
                    )
                      (k = h[d].match(
                        /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/
                      )),
                        k[2]
                          ? ((g = parseFloat(k[2])),
                            (g /= "%" === k[3] ? 100 : b.width))
                          : (g = d * j),
                        c.colorStops.push({ color: k[1], stop: g });
                  break;
                case "-webkit-gradient":
                  if (
                    ((c = {
                      type: "radial" === f[2] ? "circle" : f[2],
                      x0: 0,
                      y0: 0,
                      x1: 0,
                      y1: 0,
                      colorStops: [],
                    }),
                    (h = f[3].match(
                      /(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/
                    )),
                    h &&
                      ((c.x0 = (h[1] * b.width) / 100),
                      (c.y0 = (h[2] * b.height) / 100),
                      (c.x1 = (h[3] * b.width) / 100),
                      (c.y1 = (h[4] * b.height) / 100)),
                    (h = f[4].match(
                      /((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g
                    )))
                  )
                    for (i = h.length, d = 0; d < i; d += 1)
                      (k = h[d].match(
                        /(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/
                      )),
                        (g = parseFloat(k[2])),
                        "from" === k[1] && (g = 0),
                        "to" === k[1] && (g = 1),
                        c.colorStops.push({ color: k[3], stop: g });
                  break;
                case "-moz-linear-gradient":
                  if (
                    ((c = {
                      type: "linear",
                      x0: 0,
                      y0: 0,
                      x1: 0,
                      y1: 0,
                      colorStops: [],
                    }),
                    (h = f[2].match(/(\d{1,3})%?\s(\d{1,3})%?/)),
                    h &&
                      ((c.x0 = (h[1] * b.width) / 100),
                      (c.y0 = (h[2] * b.height) / 100),
                      (c.x1 = b.width - c.x0),
                      (c.y1 = b.height - c.y0)),
                    (h = f[3].match(
                      /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g
                    )))
                  )
                    for (
                      i = h.length, j = 1 / Math.max(i - 1, 1), d = 0;
                      d < i;
                      d += 1
                    )
                      (k = h[d].match(
                        /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/
                      )),
                        k[2]
                          ? ((g = parseFloat(k[2])), k[3] && (g /= 100))
                          : (g = d * j),
                        c.colorStops.push({ color: k[1], stop: g });
                  break;
                case "-webkit-radial-gradient":
                case "-moz-radial-gradient":
                case "-o-radial-gradient":
                  if (
                    ((c = {
                      type: "circle",
                      x0: 0,
                      y0: 0,
                      x1: b.width,
                      y1: b.height,
                      cx: 0,
                      cy: 0,
                      rx: 0,
                      ry: 0,
                      colorStops: [],
                    }),
                    (h = f[2].match(/(\d{1,3})%?\s(\d{1,3})%?/)),
                    h &&
                      ((c.cx = (h[1] * b.width) / 100),
                      (c.cy = (h[2] * b.height) / 100)),
                    (h = f[3].match(/\w+/)),
                    (k = f[4].match(/[a-z\-]*/)),
                    h && k)
                  )
                    switch (k[0]) {
                      case "farthest-corner":
                      case "cover":
                      case "":
                        (l = Math.sqrt(Math.pow(c.cx, 2) + Math.pow(c.cy, 2))),
                          (m = Math.sqrt(
                            Math.pow(c.cx, 2) + Math.pow(c.y1 - c.cy, 2)
                          )),
                          (n = Math.sqrt(
                            Math.pow(c.x1 - c.cx, 2) + Math.pow(c.y1 - c.cy, 2)
                          )),
                          (o = Math.sqrt(
                            Math.pow(c.x1 - c.cx, 2) + Math.pow(c.cy, 2)
                          )),
                          (c.rx = c.ry = Math.max(l, m, n, o));
                        break;
                      case "closest-corner":
                        (l = Math.sqrt(Math.pow(c.cx, 2) + Math.pow(c.cy, 2))),
                          (m = Math.sqrt(
                            Math.pow(c.cx, 2) + Math.pow(c.y1 - c.cy, 2)
                          )),
                          (n = Math.sqrt(
                            Math.pow(c.x1 - c.cx, 2) + Math.pow(c.y1 - c.cy, 2)
                          )),
                          (o = Math.sqrt(
                            Math.pow(c.x1 - c.cx, 2) + Math.pow(c.cy, 2)
                          )),
                          (c.rx = c.ry = Math.min(l, m, n, o));
                        break;
                      case "farthest-side":
                        "circle" === h[0]
                          ? (c.rx = c.ry =
                              Math.max(c.cx, c.cy, c.x1 - c.cx, c.y1 - c.cy))
                          : ((c.type = h[0]),
                            (c.rx = Math.max(c.cx, c.x1 - c.cx)),
                            (c.ry = Math.max(c.cy, c.y1 - c.cy)));
                        break;
                      case "closest-side":
                      case "contain":
                        "circle" === h[0]
                          ? (c.rx = c.ry =
                              Math.min(c.cx, c.cy, c.x1 - c.cx, c.y1 - c.cy))
                          : ((c.type = h[0]),
                            (c.rx = Math.min(c.cx, c.x1 - c.cx)),
                            (c.ry = Math.min(c.cy, c.y1 - c.cy)));
                    }
                  if (
                    (h = f[5].match(
                      /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g
                    ))
                  )
                    for (
                      i = h.length, j = 1 / Math.max(i - 1, 1), d = 0;
                      d < i;
                      d += 1
                    )
                      (k = h[d].match(
                        /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/
                      )),
                        k[2]
                          ? ((g = parseFloat(k[2])),
                            (g /= "%" === k[3] ? 100 : b.width))
                          : (g = d * j),
                        c.colorStops.push({ color: k[1], stop: g });
              }
            return c;
          }),
            (d.Gradient = function (c, d) {
              if (0 !== d.width && 0 !== d.height) {
                var e,
                  f,
                  g = b.createElement("canvas"),
                  h = g.getContext("2d");
                if (
                  ((h.mozImageSmoothingEnabled = !1),
                  (h.oImageSmoothingEnabled = !1),
                  (h.webkitImageSmoothingEnabled = !1),
                  (h.imageSmoothingEnabled = !1),
                  (g.width = d.width),
                  (g.height = d.height),
                  (e = l.Generate.parseGradient(c, d)))
                )
                  switch (e.type) {
                    case "linear":
                      (f = h.createLinearGradient(e.x0, e.y0, e.x1, e.y1)),
                        e.colorStops.forEach(a(f)),
                        (h.fillStyle = f),
                        h.fillRect(0, 0, d.width, d.height);
                      break;
                    case "circle":
                      (f = h.createRadialGradient(
                        e.cx,
                        e.cy,
                        0,
                        e.cx,
                        e.cy,
                        e.rx
                      )),
                        e.colorStops.forEach(a(f)),
                        (h.fillStyle = f),
                        h.fillRect(0, 0, d.width, d.height);
                      break;
                    case "ellipse":
                      var i = b.createElement("canvas"),
                        j = i.getContext("2d"),
                        k = Math.max(e.rx, e.ry),
                        m = 2 * k;
                      (i.width = i.height = m),
                        (f = j.createRadialGradient(
                          e.rx,
                          e.ry,
                          0,
                          e.rx,
                          e.ry,
                          k
                        )),
                        e.colorStops.forEach(a(f)),
                        (j.fillStyle = f),
                        j.fillRect(0, 0, m, m),
                        (h.fillStyle =
                          e.colorStops[e.colorStops.length - 1].color),
                        h.fillRect(0, 0, g.width, g.height),
                        h.drawImage(
                          i,
                          e.cx - e.rx,
                          e.cy - e.ry,
                          2 * e.rx,
                          2 * e.ry
                        );
                  }
                return g;
              }
            }),
            (d.ListAlpha = function (a) {
              var b,
                c = "";
              do (b = a % 26), (c = String.fromCharCode(b + 64) + c), (a /= 26);
              while (26 * a > 26);
              return c;
            }),
            (d.ListRoman = function (a) {
              var b,
                c = [
                  "M",
                  "CM",
                  "D",
                  "CD",
                  "C",
                  "XC",
                  "L",
                  "XL",
                  "X",
                  "IX",
                  "V",
                  "IV",
                  "I",
                ],
                d = [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
                e = "",
                f = c.length;
              if (a <= 0 || a >= 4e3) return a;
              for (b = 0; b < f; b += 1)
                for (; a >= d[b]; ) (a -= d[b]), (e += c[b]);
              return e;
            });
        })(),
        (l.Parse = function (d, e) {
          function f() {
            return Math.max(
              Math.max(ka.body.scrollWidth, ka.documentElement.scrollWidth),
              Math.max(ka.body.offsetWidth, ka.documentElement.offsetWidth),
              Math.max(ka.body.clientWidth, ka.documentElement.clientWidth)
            );
          }
          function g() {
            return Math.max(
              Math.max(ka.body.scrollHeight, ka.documentElement.scrollHeight),
              Math.max(ka.body.offsetHeight, ka.documentElement.offsetHeight),
              Math.max(ka.body.clientHeight, ka.documentElement.clientHeight)
            );
          }
          function j(a, b) {
            var c = parseInt(pa(a, b), 10);
            return isNaN(c) ? 0 : c;
          }
          function k(a, b, c, d, e, f) {
            "transparent" !== f &&
              (a.setVariable("fillStyle", f),
              a.fillRect(b, c, d, e),
              (ja += 1));
          }
          function m(a, b, c) {
            if (a.length > 0) return b + c.toUpperCase();
          }
          function n(a, b) {
            switch (b) {
              case "lowercase":
                return a.toLowerCase();
              case "capitalize":
                return a.replace(/(^|\s|:|-|\(|\))([a-z])/g, m);
              case "uppercase":
                return a.toUpperCase();
              default:
                return a;
            }
          }
          function o(a) {
            return /^(normal|none|0px)$/.test(a);
          }
          function p(a, b, c, d) {
            null !== a &&
              la.trimText(a).length > 0 &&
              (d.fillText(a, b, c), (ja += 1));
          }
          function q(a, b, c, d) {
            var e = !1,
              f = pa(b, "fontWeight"),
              g = pa(b, "fontFamily"),
              h = pa(b, "fontSize"),
              i = la.parseTextShadows(pa(b, "textShadow"));
            switch (parseInt(f, 10)) {
              case 401:
                f = "bold";
                break;
              case 400:
                f = "normal";
            }
            if (
              (a.setVariable("fillStyle", d),
              a.setVariable(
                "font",
                [pa(b, "fontStyle"), pa(b, "fontVariant"), f, h, g].join(" ")
              ),
              a.setVariable("textAlign", e ? "right" : "left"),
              i.length &&
                (a.setVariable("shadowColor", i[0].color),
                a.setVariable("shadowOffsetX", i[0].offsetX),
                a.setVariable("shadowOffsetY", i[0].offsetY),
                a.setVariable("shadowBlur", i[0].blur)),
              "none" !== c)
            )
              return la.Font(g, h, ka);
          }
          function r(a, b, c, d, e) {
            switch (b) {
              case "underline":
                k(
                  a,
                  c.left,
                  Math.round(c.top + d.baseline + d.lineWidth),
                  c.width,
                  1,
                  e
                );
                break;
              case "overline":
                k(a, c.left, Math.round(c.top), c.width, 1, e);
                break;
              case "line-through":
                k(
                  a,
                  c.left,
                  Math.ceil(c.top + d.middle + d.lineWidth),
                  c.width,
                  1,
                  e
                );
            }
          }
          function s(a, b, c, d, e) {
            var f;
            if (ma.rangeBounds && !e)
              ("none" === c && 0 === la.trimText(b).length) ||
                (f = t(b, a.node, a.textOffset)),
                (a.textOffset += b.length);
            else if (a.node && "string" == typeof a.node.nodeValue) {
              var g = d ? a.node.splitText(b.length) : null;
              (f = u(a.node, e)), (a.node = g);
            }
            return f;
          }
          function t(a, b, c) {
            var d = ka.createRange();
            return (
              d.setStart(b, c),
              d.setEnd(b, c + a.length),
              d.getBoundingClientRect()
            );
          }
          function u(a, b) {
            var c = a.parentNode,
              d = ka.createElement("wrapper"),
              e = a.cloneNode(!0);
            d.appendChild(a.cloneNode(!0)), c.replaceChild(d, a);
            var f = b ? la.OffsetBounds(d) : la.Bounds(d);
            return c.replaceChild(e, d), f;
          }
          function v(a, b, c) {
            var d,
              f,
              g = c.ctx,
              h = pa(a, "color"),
              i = pa(a, "textDecoration"),
              j = pa(a, "textAlign"),
              k = { node: b, textOffset: 0 };
            la.trimText(b.nodeValue).length > 0 &&
              ((b.nodeValue = n(b.nodeValue, pa(a, "textTransform"))),
              (j = j.replace(["-webkit-auto"], ["auto"])),
              (f =
                !e.letterRendering &&
                /^(left|right|justify|auto)$/.test(j) &&
                o(pa(a, "letterSpacing"))
                  ? b.nodeValue.split(/(\b| )/)
                  : b.nodeValue.split("")),
              (d = q(g, a, i, h)),
              e.chinese &&
                f.forEach(function (a, b) {
                  /.*[\u4E00-\u9FA5].*$/.test(a) &&
                    ((a = a.split("")), a.unshift(b, 1), f.splice.apply(f, a));
                }),
              f.forEach(function (a, b) {
                var e = s(k, a, i, b < f.length - 1, c.transform.matrix);
                e && (p(a, e.left, e.bottom, g), r(g, i, e, d, h));
              }));
          }
          function w(a, b) {
            var c,
              d,
              e = ka.createElement("boundelement");
            return (
              (e.style.display = "inline"),
              (c = a.style.listStyleType),
              (a.style.listStyleType = "none"),
              e.appendChild(ka.createTextNode(b)),
              a.insertBefore(e, a.firstChild),
              (d = la.Bounds(e)),
              a.removeChild(e),
              (a.style.listStyleType = c),
              d
            );
          }
          function x(a) {
            var b = -1,
              c = 1,
              d = a.parentNode.childNodes;
            if (a.parentNode) {
              for (; d[++b] !== a; ) 1 === d[b].nodeType && c++;
              return c;
            }
            return -1;
          }
          function y(a, b) {
            var c,
              d = x(a);
            switch (b) {
              case "decimal":
                c = d;
                break;
              case "decimal-leading-zero":
                c =
                  1 === d.toString().length
                    ? (d = "0" + d.toString())
                    : d.toString();
                break;
              case "upper-roman":
                c = l.Generate.ListRoman(d);
                break;
              case "lower-roman":
                c = l.Generate.ListRoman(d).toLowerCase();
                break;
              case "lower-alpha":
                c = l.Generate.ListAlpha(d).toLowerCase();
                break;
              case "upper-alpha":
                c = l.Generate.ListAlpha(d);
            }
            return c + ". ";
          }
          function z(a, b, c) {
            var d,
              e,
              f,
              g = b.ctx,
              h = pa(a, "listStyleType");
            if (
              /^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(
                h
              )
            ) {
              if (
                ((e = y(a, h)),
                (f = w(a, e)),
                q(g, a, "none", pa(a, "color")),
                "inside" !== pa(a, "listStylePosition"))
              )
                return;
              g.setVariable("textAlign", "left"),
                (d = c.left),
                p(e, d, f.bottom, g);
            }
          }
          function A(a) {
            var b = d[a];
            return !(!b || b.succeeded !== !0) && b.img;
          }
          function B(a, b) {
            var c = Math.max(a.left, b.left),
              d = Math.max(a.top, b.top),
              e = Math.min(a.left + a.width, b.left + b.width),
              f = Math.min(a.top + a.height, b.top + b.height);
            return { left: c, top: d, width: e - c, height: f - d };
          }
          function C(a, b, c) {
            var d,
              e = "static" !== b.cssPosition,
              f = e ? pa(a, "zIndex") : "auto",
              g = pa(a, "opacity"),
              h = "none" !== pa(a, "cssFloat");
            (b.zIndex = d = i(f)),
              (d.isPositioned = e),
              (d.isFloated = h),
              (d.opacity = g),
              (d.ownStacking = "auto" !== f || g < 1),
              (d.mozImageSmoothingEnabled = !1),
              (d.oImageSmoothingEnabled = !1),
              (d.webkitImageSmoothingEnabled = !1),
              (d.imageSmoothingEnabled = !1),
              c && c.zIndex.children.push(b);
          }
          function D(a, b, c, d, e) {
            var f = j(b, "paddingLeft"),
              g = j(b, "paddingTop"),
              h = j(b, "paddingRight"),
              i = j(b, "paddingBottom");
            P(
              a,
              c,
              0,
              0,
              c.width,
              c.height,
              d.left + f + e[3].width,
              d.top + g + e[0].width,
              d.width - (e[1].width + e[3].width + f + h),
              d.height - (e[0].width + e[2].width + g + i)
            );
          }
          function E(a) {
            return ["Top", "Right", "Bottom", "Left"].map(function (b) {
              return {
                width: j(a, "border" + b + "Width"),
                color: pa(a, "border" + b + "Color"),
              };
            });
          }
          function F(a) {
            return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(
              function (b) {
                return pa(a, "border" + b + "Radius");
              }
            );
          }
          function G(a, b, c, d) {
            var e = function (a, b, c) {
              return { x: a.x + (b.x - a.x) * c, y: a.y + (b.y - a.y) * c };
            };
            return {
              start: a,
              startControl: b,
              endControl: c,
              end: d,
              subdivide: function (f) {
                var g = e(a, b, f),
                  h = e(b, c, f),
                  i = e(c, d, f),
                  j = e(g, h, f),
                  k = e(h, i, f),
                  l = e(j, k, f);
                return [G(a, g, j, l), G(l, k, i, d)];
              },
              curveTo: function (a) {
                a.push(["bezierCurve", b.x, b.y, c.x, c.y, d.x, d.y]);
              },
              curveToReversed: function (d) {
                d.push(["bezierCurve", c.x, c.y, b.x, b.y, a.x, a.y]);
              },
            };
          }
          function H(a, b, c, d, e, f, g) {
            b[0] > 0 || b[1] > 0
              ? (a.push(["line", d[0].start.x, d[0].start.y]),
                d[0].curveTo(a),
                d[1].curveTo(a))
              : a.push(["line", f, g]),
              (c[0] > 0 || c[1] > 0) &&
                a.push(["line", e[0].start.x, e[0].start.y]);
          }
          function I(a, b, c, d, e, f, g) {
            var h = [];
            return (
              b[0] > 0 || b[1] > 0
                ? (h.push(["line", d[1].start.x, d[1].start.y]),
                  d[1].curveTo(h))
                : h.push(["line", a.c1[0], a.c1[1]]),
              c[0] > 0 || c[1] > 0
                ? (h.push(["line", f[0].start.x, f[0].start.y]),
                  f[0].curveTo(h),
                  h.push(["line", g[0].end.x, g[0].end.y]),
                  g[0].curveToReversed(h))
                : (h.push(["line", a.c2[0], a.c2[1]]),
                  h.push(["line", a.c3[0], a.c3[1]])),
              b[0] > 0 || b[1] > 0
                ? (h.push(["line", e[1].end.x, e[1].end.y]),
                  e[1].curveToReversed(h))
                : h.push(["line", a.c4[0], a.c4[1]]),
              h
            );
          }
          function J(a, b, c) {
            var d = a.left,
              e = a.top,
              f = a.width,
              g = a.height,
              h = b[0][0],
              i = b[0][1],
              j = b[1][0],
              k = b[1][1],
              l = b[2][0],
              m = b[2][1],
              n = b[3][0],
              o = b[3][1],
              p = f - j,
              q = g - m,
              r = f - l,
              s = g - o;
            return {
              topLeftOuter: sa(d, e, h, i).topLeft.subdivide(0.5),
              topLeftInner: sa(
                d + c[3].width,
                e + c[0].width,
                Math.max(0, h - c[3].width),
                Math.max(0, i - c[0].width)
              ).topLeft.subdivide(0.5),
              topRightOuter: sa(d + p, e, j, k).topRight.subdivide(0.5),
              topRightInner: sa(
                d + Math.min(p, f + c[3].width),
                e + c[0].width,
                p > f + c[3].width ? 0 : j - c[3].width,
                k - c[0].width
              ).topRight.subdivide(0.5),
              bottomRightOuter: sa(d + r, e + q, l, m).bottomRight.subdivide(
                0.5
              ),
              bottomRightInner: sa(
                d + Math.min(r, f + c[3].width),
                e + Math.min(q, g + c[0].width),
                Math.max(0, l - c[1].width),
                Math.max(0, m - c[2].width)
              ).bottomRight.subdivide(0.5),
              bottomLeftOuter: sa(d, e + s, n, o).bottomLeft.subdivide(0.5),
              bottomLeftInner: sa(
                d + c[3].width,
                e + s,
                Math.max(0, n - c[3].width),
                Math.max(0, o - c[2].width)
              ).bottomLeft.subdivide(0.5),
            };
          }
          function K(a, b, c, d, e) {
            var f = pa(a, "backgroundClip"),
              g = [];
            switch (f) {
              case "content-box":
              case "padding-box":
                H(
                  g,
                  d[0],
                  d[1],
                  b.topLeftInner,
                  b.topRightInner,
                  e.left + c[3].width,
                  e.top + c[0].width
                ),
                  H(
                    g,
                    d[1],
                    d[2],
                    b.topRightInner,
                    b.bottomRightInner,
                    e.left + e.width - c[1].width,
                    e.top + c[0].width
                  ),
                  H(
                    g,
                    d[2],
                    d[3],
                    b.bottomRightInner,
                    b.bottomLeftInner,
                    e.left + e.width - c[1].width,
                    e.top + e.height - c[2].width
                  ),
                  H(
                    g,
                    d[3],
                    d[0],
                    b.bottomLeftInner,
                    b.topLeftInner,
                    e.left + c[3].width,
                    e.top + e.height - c[2].width
                  );
                break;
              default:
                H(
                  g,
                  d[0],
                  d[1],
                  b.topLeftOuter,
                  b.topRightOuter,
                  e.left,
                  e.top
                ),
                  H(
                    g,
                    d[1],
                    d[2],
                    b.topRightOuter,
                    b.bottomRightOuter,
                    e.left + e.width,
                    e.top
                  ),
                  H(
                    g,
                    d[2],
                    d[3],
                    b.bottomRightOuter,
                    b.bottomLeftOuter,
                    e.left + e.width,
                    e.top + e.height
                  ),
                  H(
                    g,
                    d[3],
                    d[0],
                    b.bottomLeftOuter,
                    b.topLeftOuter,
                    e.left,
                    e.top + e.height
                  );
            }
            return g;
          }
          function L(a, b, c) {
            var d,
              e,
              f,
              g,
              h,
              i,
              j = b.left,
              k = b.top,
              l = b.width,
              m = b.height,
              n = F(a),
              o = J(b, n, c),
              p = { clip: K(a, o, c, n, b), borders: [] };
            for (d = 0; d < 4; d++)
              if (c[d].width > 0) {
                switch (((e = j), (f = k), (g = l), (h = m - c[2].width), d)) {
                  case 0:
                    (h = c[0].width),
                      (i = I(
                        {
                          c1: [e, f],
                          c2: [e + g, f],
                          c3: [e + g - c[1].width, f + h],
                          c4: [e + c[3].width, f + h],
                        },
                        n[0],
                        n[1],
                        o.topLeftOuter,
                        o.topLeftInner,
                        o.topRightOuter,
                        o.topRightInner
                      ));
                    break;
                  case 1:
                    (e = j + l - c[1].width),
                      (g = c[1].width),
                      (i = I(
                        {
                          c1: [e + g, f],
                          c2: [e + g, f + h + c[2].width],
                          c3: [e, f + h],
                          c4: [e, f + c[0].width],
                        },
                        n[1],
                        n[2],
                        o.topRightOuter,
                        o.topRightInner,
                        o.bottomRightOuter,
                        o.bottomRightInner
                      ));
                    break;
                  case 2:
                    (f = f + m - c[2].width),
                      (h = c[2].width),
                      (i = I(
                        {
                          c1: [e + g, f + h],
                          c2: [e, f + h],
                          c3: [e + c[3].width, f],
                          c4: [e + g - c[3].width, f],
                        },
                        n[2],
                        n[3],
                        o.bottomRightOuter,
                        o.bottomRightInner,
                        o.bottomLeftOuter,
                        o.bottomLeftInner
                      ));
                    break;
                  case 3:
                    (g = c[3].width),
                      (i = I(
                        {
                          c1: [e, f + h + c[2].width],
                          c2: [e, f],
                          c3: [e + g, f + c[0].width],
                          c4: [e + g, f + h],
                        },
                        n[3],
                        n[0],
                        o.bottomLeftOuter,
                        o.bottomLeftInner,
                        o.topLeftOuter,
                        o.topLeftInner
                      ));
                }
                p.borders.push({ args: i, color: c[d].color });
              }
            return p;
          }
          function M(a, b) {
            var c = a.drawShape();
            return (
              b.forEach(function (a, b) {
                c[0 === b ? "moveTo" : a[0] + "To"].apply(null, a.slice(1));
              }),
              c
            );
          }
          function N(a, b, c) {
            "transparent" !== c &&
              (a.setVariable("fillStyle", c),
              M(a, b),
              a.fill(),
              a.translate(0.2, 0.01),
              (ja += 1));
          }
          function O(a, b, c) {
            var d,
              e,
              f = ka.createElement("valuewrap"),
              g = [
                "lineHeight",
                "textAlign",
                "fontFamily",
                "color",
                "fontSize",
                "paddingLeft",
                "paddingTop",
                "width",
                "height",
                "border",
                "borderLeftWidth",
                "borderTopWidth",
              ];
            g.forEach(function (b) {
              try {
                f.style[b] = pa(a, b);
              } catch (c) {
                la.log(
                  "html2canvas: Parse: Exception caught in renderFormValue: " +
                    c.message
                );
              }
            }),
              (f.style.borderColor = "black"),
              (f.style.borderStyle = "solid"),
              (f.style.display = "block"),
              (f.style.position = "absolute"),
              (/^(submit|reset|button|text|password)$/.test(a.type) ||
                "SELECT" === a.nodeName) &&
                (f.style.lineHeight = pa(a, "height")),
              (f.style.top = b.top + "px"),
              (f.style.left = b.left + "px"),
              (d =
                "SELECT" === a.nodeName
                  ? (a.options[a.selectedIndex] || 0).text
                  : a.value),
              d || (d = a.placeholder),
              (e = ka.createTextNode(d)),
              f.appendChild(e),
              oa.appendChild(f),
              v(a, e, c),
              oa.removeChild(f);
          }
          function P(a) {
            a.drawImage.apply(a, Array.prototype.slice.call(arguments, 1)),
              (ja += 1);
          }
          function Q(c, d) {
            var e = a.getComputedStyle(c, d);
            if (
              e &&
              e.content &&
              "none" !== e.content &&
              "-moz-alt-content" !== e.content &&
              "none" !== e.display
            ) {
              var f = e.content + "",
                g = f.substr(0, 1);
              g === f.substr(f.length - 1) &&
                g.match(/'|"/) &&
                (f = f.substr(1, f.length - 2));
              var h = "url" === f.substr(0, 3),
                i = b.createElement(h ? "img" : "span");
              return (
                (i.className = qa + "-before " + qa + "-after"),
                Object.keys(e)
                  .filter(R)
                  .forEach(function (a) {
                    try {
                      i.style[a] = e[a];
                    } catch (b) {
                      la.log([
                        "Tried to assign readonly property ",
                        a,
                        "Error:",
                        b,
                      ]);
                    }
                  }),
                h
                  ? (i.src = la.parseBackgroundImage(f)[0].args[0])
                  : (i.innerHTML = f),
                i
              );
            }
          }
          function R(b) {
            return isNaN(a.parseInt(b, 10));
          }
          function S(a, b) {
            var c = Q(a, ":before"),
              d = Q(a, ":after");
            (c || d) &&
              (c &&
                ((a.className += " " + qa + "-before"),
                a.parentNode.insertBefore(c, a),
                fa(c, b, !0),
                a.parentNode.removeChild(c),
                (a.className = a.className.replace(qa + "-before", "").trim())),
              d &&
                ((a.className += " " + qa + "-after"),
                a.appendChild(d),
                fa(d, b, !0),
                a.removeChild(d),
                (a.className = a.className.replace(qa + "-after", "").trim())));
          }
          function T(a, b, c, d) {
            var e = Math.round(d.left + c.left),
              f = Math.round(d.top + c.top);
            a.createPattern(b),
              a.translate(e, f),
              a.fill(),
              a.translate(-e, -f);
          }
          function U(a, b, c, d, e, f, g, h) {
            var i = [];
            i.push(["line", Math.round(e), Math.round(f)]),
              i.push(["line", Math.round(e + g), Math.round(f)]),
              i.push(["line", Math.round(e + g), Math.round(h + f)]),
              i.push(["line", Math.round(e), Math.round(h + f)]),
              M(a, i),
              a.save(),
              a.clip(),
              T(a, b, c, d),
              a.restore();
          }
          function V(a, b, c) {
            k(a, b.left, b.top, b.width, b.height, c);
          }
          function W(a, b, c, d, e) {
            var f = la.BackgroundSize(a, b, d, e),
              g = la.BackgroundPosition(a, b, d, e, f),
              h = pa(a, "backgroundRepeat").split(",").map(la.trimText);
            switch (((d = Y(d, f)), (h = h[e] || h[0]))) {
              case "repeat-x":
                U(c, d, g, b, b.left, b.top + g.top, 99999, d.height);
                break;
              case "repeat-y":
                U(c, d, g, b, b.left + g.left, b.top, d.width, 99999);
                break;
              case "no-repeat":
                U(
                  c,
                  d,
                  g,
                  b,
                  b.left + g.left,
                  b.top + g.top,
                  d.width,
                  d.height
                );
                break;
              default:
                T(c, d, g, {
                  top: b.top,
                  left: b.left,
                  width: d.width,
                  height: d.height,
                });
            }
          }
          function X(a, b, c) {
            for (
              var d,
                e = pa(a, "backgroundImage"),
                f = la.parseBackgroundImage(e),
                g = f.length;
              g--;

            )
              if (((e = f[g]), e.args && 0 !== e.args.length)) {
                var h = "url" === e.method ? e.args[0] : e.value;
                (d = A(h)),
                  d
                    ? W(a, b, c, d, g)
                    : la.log("html2canvas: Error loading background:", e);
              }
          }
          function Y(a, b) {
            if (a.width === b.width && a.height === b.height) return a;
            var c,
              d = ka.createElement("canvas");
            return (
              (d.width = b.width),
              (d.height = b.height),
              (c = d.getContext("2d")),
              (c.mozImageSmoothingEnabled = !1),
              (c.oImageSmoothingEnabled = !1),
              (c.webkitImageSmoothingEnabled = !1),
              (c.imageSmoothingEnabled = !1),
              P(c, a, 0, 0, a.width, a.height, 0, 0, b.width, b.height),
              d
            );
          }
          function Z(a, b, c) {
            return a.setVariable(
              "globalAlpha",
              pa(b, "opacity") * (c ? c.opacity : 1)
            );
          }
          function $(a) {
            return a.replace("px", "");
          }
          function _(a, b) {
            var c =
                pa(a, "transform") ||
                pa(a, "-webkit-transform") ||
                pa(a, "-moz-transform") ||
                pa(a, "-ms-transform") ||
                pa(a, "-o-transform"),
              d =
                pa(a, "transform-origin") ||
                pa(a, "-webkit-transform-origin") ||
                pa(a, "-moz-transform-origin") ||
                pa(a, "-ms-transform-origin") ||
                pa(a, "-o-transform-origin") ||
                "0px 0px";
            d = d.split(" ").map($).map(la.asFloat);
            var e;
            if (c && "none" !== c) {
              var f = c.match(ta);
              if (f)
                switch (f[1]) {
                  case "matrix":
                    e = f[2].split(",").map(la.trimText).map(la.asFloat);
                }
            }
            return { origin: d, matrix: e };
          }
          function aa(a, b, c, d) {
            var i = h(b ? c.width : f(), b ? c.height : g()),
              j = {
                ctx: i,
                opacity: Z(i, a, b),
                cssPosition: pa(a, "position"),
                borders: E(a),
                transform: d,
                clip: b && b.clip ? la.Extend({}, b.clip) : null,
              };
            return (
              C(a, j, b),
              e.useOverflow === !0 &&
                /(hidden|scroll|auto)/.test(pa(a, "overflow")) === !0 &&
                /(BODY)/i.test(a.nodeName) === !1 &&
                (j.clip = j.clip ? B(j.clip, c) : c),
              j
            );
          }
          function ba(a, b, c) {
            var d = {
              left: b.left + a[3].width,
              top: b.top + a[0].width,
              width: b.width - (a[1].width + a[3].width),
              height: b.height - (a[0].width + a[2].width),
            };
            return c && (d = B(d, c)), d;
          }
          function ca(a, b) {
            var c = b.matrix ? la.OffsetBounds(a) : la.Bounds(a);
            return (b.origin[0] += c.left), (b.origin[1] += c.top), c;
          }
          function da(a, b, c, d) {
            var e,
              f = _(a, b),
              g = ca(a, f),
              h = aa(a, b, g, f),
              i = h.borders,
              j = h.ctx,
              k = ba(i, g, h.clip),
              l = L(a, g, i),
              m = na.test(a.nodeName) ? "#efefef" : pa(a, "backgroundColor");
            switch (
              (M(j, l.clip),
              j.save(),
              j.clip(),
              k.height > 0 && k.width > 0 && !d
                ? (V(j, g, m), X(a, k, j))
                : d && (h.backgroundColor = m),
              j.restore(),
              l.borders.forEach(function (a) {
                N(j, a.args, a.color);
              }),
              c || S(a, h),
              a.nodeName)
            ) {
              case "IMG":
                (e = A(a.getAttribute("src")))
                  ? D(j, a, e, g, i)
                  : la.log(
                      "html2canvas: Error loading <img>:" +
                        a.getAttribute("src")
                    );
                break;
              case "INPUT":
                /^(text|url|email|submit|button|reset)$/.test(a.type) &&
                  (a.value || a.placeholder || "").length > 0 &&
                  O(a, g, h);
                break;
              case "TEXTAREA":
                (a.value || a.placeholder || "").length > 0 && O(a, g, h);
                break;
              case "SELECT":
                (a.options || a.placeholder || "").length > 0 && O(a, g, h);
                break;
              case "LI":
                z(a, h, k);
                break;
              case "CANVAS":
                D(j, a, a, g, i);
            }
            return h;
          }
          function ea(a) {
            return (
              "none" !== pa(a, "display") &&
              "hidden" !== pa(a, "visibility") &&
              !a.hasAttribute("data-html2canvas-ignore")
            );
          }
          function fa(a, b, c) {
            ea(a) &&
              ((b = da(a, b, c, !1) || b), na.test(a.nodeName) || ga(a, b, c));
          }
          function ga(a, b, c) {
            la.Children(a).forEach(function (d) {
              d.nodeType === d.ELEMENT_NODE
                ? fa(d, b, c)
                : d.nodeType === d.TEXT_NODE && v(a, d, b);
            });
          }
          function ha() {
            var a = pa(b.documentElement, "backgroundColor"),
              c = la.isTransparent(a) && ia === b.body,
              d = da(ia, null, !1, c);
            return (
              ga(ia, d),
              c && (a = d.backgroundColor),
              oa.removeChild(ra),
              { backgroundColor: a, stack: d }
            );
          }
          a.scroll(0, 0);
          var ia = e.elements === c ? b.body : e.elements[0],
            ja = 0,
            ka = ia.ownerDocument,
            la = l.Util,
            ma = la.Support(e, ka),
            na = new RegExp("(" + e.ignoreElements + ")"),
            oa = ka.body,
            pa = la.getCSS,
            qa = "___html2canvas___pseudoelement",
            ra = ka.createElement("style");
          (ra.innerHTML =
            "." +
            qa +
            '-before:before { content: "" !important; display: none !important; }.' +
            qa +
            '-after:after { content: "" !important; display: none !important; }'),
            oa.appendChild(ra),
            (d = d || {});
          var sa = (function (a) {
              return function (b, c, d, e) {
                var f = d * a,
                  g = e * a,
                  h = b + d,
                  i = c + e;
                return {
                  topLeft: G(
                    { x: b, y: i },
                    { x: b, y: i - g },
                    { x: h - f, y: c },
                    { x: h, y: c }
                  ),
                  topRight: G(
                    { x: b, y: c },
                    { x: b + f, y: c },
                    { x: h, y: i - g },
                    { x: h, y: i }
                  ),
                  bottomRight: G(
                    { x: h, y: c },
                    { x: h, y: c + g },
                    { x: b + f, y: i },
                    { x: b, y: i }
                  ),
                  bottomLeft: G(
                    { x: h, y: i },
                    { x: h - f, y: i },
                    { x: b, y: c + g },
                    { x: b, y: c }
                  ),
                };
              };
            })(4 * ((Math.sqrt(2) - 1) / 3)),
            ta = /(matrix)\((.+)\)/;
          return ha();
        }),
        (l.Preload = function (d) {
          function e(a) {
            (A.href = a), (A.href = A.href);
            var b = A.protocol + A.host;
            return b === p;
          }
          function f() {
            u.log(
              "html2canvas: start: images: " +
                t.numLoaded +
                " / " +
                t.numTotal +
                " (failed: " +
                t.numFailed +
                ")"
            ),
              !t.firstRun &&
                t.numLoaded >= t.numTotal &&
                (u.log(
                  "Finished loading images: # " +
                    t.numTotal +
                    " (failed: " +
                    t.numFailed +
                    ")"
                ),
                "function" == typeof d.complete && d.complete(t));
          }
          function g(b, e, g) {
            var h,
              i,
              j = d.proxy;
            (A.href = b),
              (b = A.href),
              (h = "html2canvas_" + v++),
              (g.callbackname = h),
              (j += j.indexOf("?") > -1 ? "&" : "?"),
              (j += "url=" + encodeURIComponent(b) + "&callback=" + h),
              (i = x.createElement("script")),
              (a[h] = function (b) {
                "error:" === b.substring(0, 6)
                  ? ((g.succeeded = !1), t.numLoaded++, t.numFailed++, f())
                  : (o(e, g), (e.src = b)),
                  (a[h] = c);
                try {
                  delete a[h];
                } catch (d) {}
                i.parentNode.removeChild(i),
                  (i = null),
                  delete g.script,
                  delete g.callbackname;
              }),
              i.setAttribute("type", "text/javascript"),
              i.setAttribute("src", j),
              (g.script = i),
              a.document.body.appendChild(i);
          }
          function h(b, c) {
            var d = a.getComputedStyle(b, c),
              e = d.content;
            "url" === e.substr(0, 3) &&
              q.loadImage(l.Util.parseBackgroundImage(e)[0].args[0]),
              m(d.backgroundImage, b);
          }
          function i(a) {
            h(a, ":before"), h(a, ":after");
          }
          function j(a, b) {
            var d = l.Generate.Gradient(a, b);
            d !== c &&
              ((t[a] = { img: d, succeeded: !0 }),
              t.numTotal++,
              t.numLoaded++,
              f());
          }
          function k(a) {
            return a && a.method && a.args && a.args.length > 0;
          }
          function m(a, b) {
            var d;
            l.Util.parseBackgroundImage(a)
              .filter(k)
              .forEach(function (a) {
                "url" === a.method
                  ? q.loadImage(a.args[0])
                  : a.method.match(/\-?gradient$/) &&
                    (d === c && (d = l.Util.Bounds(b)), j(a.value, d));
              });
          }
          function n(a) {
            var b = !1;
            try {
              u.Children(a).forEach(n);
            } catch (d) {}
            try {
              b = a.nodeType;
            } catch (e) {
              (b = !1),
                u.log(
                  "html2canvas: failed to access some element's nodeType - Exception: " +
                    e.message
                );
            }
            if (1 === b || b === c) {
              i(a);
              try {
                m(u.getCSS(a, "backgroundImage"), a);
              } catch (d) {
                u.log(
                  "html2canvas: failed to get background-image - Exception: " +
                    d.message
                );
              }
              m(a);
            }
          }
          function o(b, e) {
            (b.onload = function () {
              e.timer !== c && a.clearTimeout(e.timer),
                t.numLoaded++,
                (e.succeeded = !0),
                (b.onerror = b.onload = null),
                f();
            }),
              (b.onerror = function () {
                if (
                  "anonymous" === b.crossOrigin &&
                  (a.clearTimeout(e.timer), d.proxy)
                ) {
                  var c = b.src;
                  return (
                    (b = new Image()),
                    (e.img = b),
                    (b.src = c),
                    void g(b.src, b, e)
                  );
                }
                t.numLoaded++,
                  t.numFailed++,
                  (e.succeeded = !1),
                  (b.onerror = b.onload = null),
                  f();
              });
          }
          var p,
            q,
            r,
            s,
            t = { numLoaded: 0, numFailed: 0, numTotal: 0, cleanupDone: !1 },
            u = l.Util,
            v = 0,
            w = d.elements[0] || b.body,
            x = w.ownerDocument,
            y = w.getElementsByTagName("img"),
            z = y.length,
            A = x.createElement("a"),
            B = (function (a) {
              return a.crossOrigin !== c;
            })(new Image());
          for (
            A.href = a.location.href,
              p = A.protocol + A.host,
              q = {
                loadImage: function (a) {
                  var b, f;
                  a &&
                    t[a] === c &&
                    ((b = new Image()),
                    a.match(/data:image\/.*;base64,/i)
                      ? ((b.src = a.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, "")),
                        (f = t[a] = { img: b }),
                        t.numTotal++,
                        o(b, f))
                      : e(a) || d.allowTaint === !0
                      ? ((f = t[a] = { img: b }),
                        t.numTotal++,
                        o(b, f),
                        (b.src = a))
                      : B && !d.allowTaint && d.useCORS
                      ? ((b.crossOrigin = "anonymous"),
                        (f = t[a] = { img: b }),
                        t.numTotal++,
                        o(b, f),
                        (b.src = a))
                      : d.proxy &&
                        ((f = t[a] = { img: b }), t.numTotal++, g(a, b, f)));
                },
                cleanupDOM: function (e) {
                  var g, h;
                  if (!t.cleanupDone) {
                    e && "string" == typeof e
                      ? u.log("html2canvas: Cleanup because: " + e)
                      : u.log(
                          "html2canvas: Cleanup after timeout: " +
                            d.timeout +
                            " ms."
                        );
                    for (h in t)
                      if (
                        t.hasOwnProperty(h) &&
                        ((g = t[h]),
                        "object" == typeof g &&
                          g.callbackname &&
                          g.succeeded === c)
                      ) {
                        a[g.callbackname] = c;
                        try {
                          delete a[g.callbackname];
                        } catch (i) {}
                        g.script &&
                          g.script.parentNode &&
                          (g.script.setAttribute("src", "about:blank"),
                          g.script.parentNode.removeChild(g.script)),
                          t.numLoaded++,
                          t.numFailed++,
                          u.log(
                            "html2canvas: Cleaned up failed img: '" +
                              h +
                              "' Steps: " +
                              t.numLoaded +
                              " / " +
                              t.numTotal
                          );
                      }
                    a.stop !== c
                      ? a.stop()
                      : b.execCommand !== c && b.execCommand("Stop", !1),
                      b.close !== c && b.close(),
                      (t.cleanupDone = !0),
                      (e && "string" == typeof e) || f();
                  }
                },
                renderingDone: function () {
                  s && a.clearTimeout(s);
                },
              },
              d.timeout > 0 && (s = a.setTimeout(q.cleanupDOM, d.timeout)),
              u.log("html2canvas: Preload starts: finding background-images"),
              t.firstRun = !0,
              n(w),
              u.log("html2canvas: Preload: Finding images"),
              r = 0;
            r < z;
            r += 1
          )
            q.loadImage(y[r].getAttribute("src"));
          return (
            (t.firstRun = !1),
            u.log("html2canvas: Preload: Done."),
            t.numTotal === t.numLoaded && f(),
            q
          );
        }),
        (l.Renderer = function (a, d) {
          function e(a) {
            function b(a) {
              Object.keys(a)
                .sort()
                .forEach(function (c) {
                  var d = [],
                    f = [],
                    g = [],
                    h = [];
                  a[c].forEach(function (a) {
                    a.node.zIndex.isPositioned || a.node.zIndex.opacity < 1
                      ? g.push(a)
                      : a.node.zIndex.isFloated
                      ? f.push(a)
                      : d.push(a);
                  }),
                    (function i(a) {
                      a.forEach(function (a) {
                        h.push(a), a.children && i(a.children);
                      });
                    })(d.concat(f, g)),
                    h.forEach(function (a) {
                      a.context ? b(a.context) : e.push(a.node);
                    });
                });
            }
            var d,
              e = [];
            return (
              (d = (function (a) {
                function b(a, d, e) {
                  var f =
                      "auto" === d.zIndex.zindex ? 0 : Number(d.zIndex.zindex),
                    g = a,
                    h = d.zIndex.isPositioned,
                    i = d.zIndex.isFloated,
                    j = { node: d },
                    k = e;
                  d.zIndex.ownStacking
                    ? ((g = j.context = { "!": [{ node: d, children: [] }] }),
                      (k = c))
                    : (h || i) && (k = j.children = []),
                    0 === f && e
                      ? e.push(j)
                      : (a[f] || (a[f] = []), a[f].push(j)),
                    d.zIndex.children.forEach(function (a) {
                      b(g, a, k);
                    });
                }
                var d = {};
                return b(d, a), d;
              })(a)),
              b(d),
              e
            );
          }
          function f(a) {
            var b;
            if ("string" == typeof d.renderer && l.Renderer[a] !== c)
              b = l.Renderer[a](d);
            else {
              if ("function" != typeof a) throw new Error("Unknown renderer");
              b = a(d);
            }
            if ("function" != typeof b)
              throw new Error("Invalid renderer defined");
            return b;
          }
          return f(d.renderer)(a, d, b, e(a.stack), l);
        }),
        (l.Util.Support = function (a, b) {
          function d() {
            var a = new Image(),
              d = b.createElement("canvas"),
              e = d.getContext !== c && d.getContext("2d");
            if (e === !1) return !1;
            (d.width = d.height = 10),
              (a.src = [
                "data:image/svg+xml,",
                "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>",
                "<foreignObject width='10' height='10'>",
                "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>",
                "sup",
                "</div>",
                "</foreignObject>",
                "</svg>",
              ].join(""));
            try {
              e.drawImage(a, 0, 0), d.toDataURL();
            } catch (f) {
              return !1;
            }
            return (
              l.Util.log("html2canvas: Parse: SVG powered rendering available"),
              !0
            );
          }
          function e() {
            var a,
              c,
              d,
              e,
              f = !1;
            return (
              b.createRange &&
                ((a = b.createRange()),
                a.getBoundingClientRect &&
                  ((c = b.createElement("boundtest")),
                  (c.style.height = "123px"),
                  (c.style.display = "block"),
                  b.body.appendChild(c),
                  a.selectNode(c),
                  (d = a.getBoundingClientRect()),
                  (e = d.height),
                  123 === e && (f = !0),
                  b.body.removeChild(c))),
              f
            );
          }
          return { rangeBounds: e(), svgRendering: a.svgRendering && d() };
        }),
        (a.html2canvas = function (b, c) {
          b = b.length ? b : [b];
          var d,
            e,
            f = {
              logging: !1,
              elements: b,
              background: "#fff",
              proxy: null,
              timeout: 0,
              useCORS: !1,
              allowTaint: !1,
              svgRendering: !1,
              ignoreElements: "IFRAME|OBJECT|PARAM",
              useOverflow: !0,
              letterRendering: !1,
              chinese: !1,
              width: null,
              height: null,
              taintTest: !0,
              renderer: "Canvas",
            };
          return (
            (f = l.Util.Extend(c, f)),
            (l.logging = f.logging),
            (f.complete = function (a) {
              ("function" == typeof f.onpreloaded && f.onpreloaded(a) === !1) ||
                ((d = l.Parse(a, f)),
                ("function" == typeof f.onparsed && f.onparsed(d) === !1) ||
                  ((e = l.Renderer(d, f)),
                  "function" == typeof f.onrendered && f.onrendered(e)));
            }),
            a.setTimeout(function () {
              l.Preload(f);
            }, 0),
            {
              render: function (a, b) {
                return l.Renderer(a, l.Util.Extend(b, f));
              },
              parse: function (a, b) {
                return l.Parse(a, l.Util.Extend(b, f));
              },
              preload: function (a) {
                return l.Preload(l.Util.Extend(a, f));
              },
              log: l.Util.log,
            }
          );
        }),
        (a.html2canvas.log = l.Util.log),
        (a.html2canvas.Renderer = { Canvas: c }),
        (l.Renderer.Canvas = function (a) {
          function d(a, b) {
            a.beginPath(),
              b.forEach(function (b) {
                a[b.name].apply(a, b.arguments);
              }),
              a.closePath();
          }
          function e(a) {
            if (h.indexOf(a.arguments[0].src) === -1) {
              j.drawImage(a.arguments[0], 0, 0);
              try {
                j.getImageData(0, 0, 1, 1);
              } catch (b) {
                return (
                  (i = g.createElement("canvas")), (j = i.getContext("2d")), !1
                );
              }
              h.push(a.arguments[0].src);
            }
            return !0;
          }
          function f(b, c) {
            switch (c.type) {
              case "variable":
                b[c.name] = c.arguments;
                break;
              case "function":
                switch (c.name) {
                  case "createPattern":
                    if (c.arguments[0].width > 0 && c.arguments[0].height > 0)
                      try {
                        b.fillStyle = b.createPattern(c.arguments[0], "repeat");
                      } catch (f) {
                        k.log(
                          "html2canvas: Renderer: Error creating pattern",
                          f.message
                        );
                      }
                    break;
                  case "drawShape":
                    d(b, c.arguments);
                    break;
                  case "drawImage":
                    c.arguments[8] > 0 &&
                      c.arguments[7] > 0 &&
                      (!a.taintTest || (a.taintTest && e(c))) &&
                      b.drawImage.apply(b, c.arguments);
                    break;
                  default:
                    b[c.name].apply(b, c.arguments);
                }
            }
          }
          a = a || {};
          var g = b,
            h = [],
            i = b.createElement("canvas"),
            j = i.getContext("2d"),
            k = l.Util,
            m = a.canvas || g.createElement("canvas");
          return function (a, b, d, e, g) {
            var h,
              i,
              j,
              l = m.getContext("2d"),
              n = a.stack;
            return (
              (l.mozImageSmoothingEnabled = !1),
              (l.oImageSmoothingEnabled = !1),
              (l.webkitImageSmoothingEnabled = !1),
              (l.imageSmoothingEnabled = !1),
              (m.width = m.style.width = b.width || n.ctx.width),
              (m.height = m.style.height = b.height || n.ctx.height),
              (j = l.fillStyle),
              (l.fillStyle =
                k.isTransparent(n.backgroundColor) && b.background !== c
                  ? b.background
                  : a.backgroundColor),
              l.fillRect(0, 0, m.width, m.height),
              (l.fillStyle = j),
              e.forEach(function (a) {
                (l.textBaseline = "bottom"),
                  l.save(),
                  a.transform.matrix &&
                    (l.translate(a.transform.origin[0], a.transform.origin[1]),
                    l.transform.apply(l, a.transform.matrix),
                    l.translate(
                      -a.transform.origin[0],
                      -a.transform.origin[1]
                    )),
                  a.clip &&
                    (l.beginPath(),
                    l.rect(
                      a.clip.left,
                      a.clip.top,
                      a.clip.width,
                      a.clip.height
                    ),
                    l.clip()),
                  a.ctx.storage &&
                    a.ctx.storage.forEach(function (a) {
                      f(l, a);
                    }),
                  l.translate(-0.5, 0),
                  l.restore();
              }),
              k.log(
                "html2canvas: Renderer: Canvas renderer done - returning canvas obj"
              ),
              1 === b.elements.length &&
              "object" == typeof b.elements[0] &&
              "BODY" !== b.elements[0].nodeName
                ? ((i = g.Util.Bounds(b.elements[0])),
                  (h = d.createElement("canvas")),
                  (h.width = Math.floor(i.width)),
                  (h.height = Math.floor(i.height)),
                  (l = h.getContext("2d")),
                  l.translate(-0.5, 0),
                  (l.mozImageSmoothingEnabled = !1),
                  (l.oImageSmoothingEnabled = !1),
                  (l.webkitImageSmoothingEnabled = !1),
                  (l.imageSmoothingEnabled = !1),
                  l.drawImage(
                    m,
                    i.left,
                    i.top,
                    i.width,
                    i.height,
                    0,
                    0,
                    i.width,
                    i.height
                  ),
                  (m = null),
                  h)
                : m
            );
          };
        });
    })(window, document);
  var _canvas,
    _layers,
    _preview,
    _url,
    _code,
    _craft,
    _jsonMode,
    _saved,
    _savedTemp,
    _total,
    _totals;
  (_saved = []), (_savedTemp = []), (_totals = {});
  var base64dict =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/",
    _color = "black",
    _patterns = [
      "base",
      "bl",
      "bo",
      "br",
      "bri",
      "bs",
      "bt",
      "bts",
      "cbo",
      "cr",
      "cre",
      "cs",
      "dls",
      "drs",
      "flo",
      "gra",
      "hh",
      "ld",
      "ls",
      "mc",
      "moj",
      "mr",
      "ms",
      "rd",
      "rs",
      "sc",
      "sku",
      "ss",
      "tl",
      "tr",
      "ts",
      "tt",
      "tts",
      "vh",
      "lud",
      "rud",
      "gru",
      "hhb",
      "vhr",
    ],
    _colors = {
      black: 0,
      red: 1,
      green: 2,
      brown: 3,
      blue: 4,
      purple: 5,
      cyan: 6,
      gray: 7,
      dark_gray: 8,
      pink: 9,
      lime: 10,
      yellow: 11,
      light_blue: 12,
      magenta: 13,
      orange: 14,
      white: 15,
    },
    _colorsInv = [
      "black",
      "red",
      "green",
      "brown",
      "blue",
      "purple",
      "cyan",
      "gray",
      "dark_gray",
      "pink",
      "lime",
      "yellow",
      "light_blue",
      "magenta",
      "orange",
      "white",
    ],
    _crafting = {
      base: [1, 1, 1, 1, 1, 1, "", "stick", ""],
      gra: [1, "bn", 1, "", 1, "", "", 1, ""],
      bri: ["", "", "", "", "bn", 1, "", "brick", ""],
      hh: [1, 1, 1, 1, 1, 1, "", "bn", ""],
      vh: [1, 1, "", 1, 1, "bn", 1, 1, ""],
      ts: [1, 1, 1, "", "bn", "", "", "", ""],
      bs: ["", "", "", "", "bn", "", 1, 1, 1],
      ls: [1, "", "", 1, "bn", "", 1, "", ""],
      rs: ["", "", 1, "", "bn", 1, "", "", 1],
      ld: [1, 1, "", 1, "", "", "", "bn", ""],
      rud: ["", 1, 1, "", "", 1, "", "bn", ""],
      dls: ["", "", 1, "", 1, "", 1, "bn", ""],
      drs: [1, "", "", "", 1, "", "", "bn", 1],
      cr: [1, "", 1, "", 1, "", 1, "bn", 1],
      sc: ["", 1, "", 1, 1, 1, "bn", 1, ""],
      cs: ["", 1, "", "", 1, "bn", "", 1, ""],
      ms: ["", "", "", 1, 1, 1, "", "bn", ""],
      tl: [1, "", "", "", "", "", "", "bn", ""],
      bl: ["", "", "", "", "", "", 1, "bn", ""],
      tr: ["", "", 1, "", "", "", "", "bn", ""],
      br: ["", "", "", "", "", "", "", "bn", 1],
      tt: [1, "bn", 1, "", 1, "", "", "", ""],
      bt: ["", "", "", "", 1, "", 1, "bn", 1],
      mr: ["", 1, "", 1, "bn", 1, "", 1, ""],
      mc: ["", "", "", "", 1, "", "", "bn", ""],
      bts: ["", "", "", 1, "bn", 1, "", 1, ""],
      tts: ["", 1, "", 1, "bn", 1, "", "", ""],
      ss: [1, "", 1, 1, "bn", 1, "", "", ""],
      bo: [1, 1, 1, 1, "bn", 1, 1, 1, 1],
      cbo: ["", "", "", "", "vine", 1, "", "bn", ""],
      flo: ["", "", "", "", "bn", 1, "", "flower", ""],
      cre: ["", "", "", "", "bn", 1, "", "creeper", ""],
      sku: ["", "", "", "", "bn", 1, "", "wither", ""],
      moj: ["", "", "", "", "bn", 1, "", "apple", ""],
      lud: ["", "bn", "", 1, "", "", 1, 1, ""],
      rd: ["", "bn", "", "", "", 1, "", 1, 1],
      gru: ["", 1, "", "", 1, "", 1, "bn", 1],
      hhb: ["", "bn", "", 1, 1, 1, 1, 1, 1],
      vhr: ["", 1, 1, "bn", 1, 1, "", 1, 1],
    };
  (base = "base"),
    (bl = "bl"),
    (bo = "bo"),
    (br = "br"),
    (bri = "bri"),
    (bs = "bs"),
    (bt = "bt"),
    (bts = "bts"),
    (cbo = "cbo"),
    (cr = "cr"),
    (cre = "cre"),
    (cs = "cs"),
    (dls = "dls"),
    (drs = "drs"),
    (flo = "flo"),
    (gra = "gra"),
    (hh = "hh"),
    (ld = "ld"),
    (ls = "ls"),
    (mc = "mc"),
    (moj = "moj"),
    (mr = "mr"),
    (ms = "ms"),
    (rd = "rd"),
    (rs = "rs"),
    (sc = "sc"),
    (sku = "sku"),
    (ss = "ss"),
    (tl = "tl"),
    (tr = "tr"),
    (ts = "ts"),
    (tt = "tt"),
    (tts = "tts"),
    (vh = "vh"),
    (lud = "lud"),
    (rud = "rud"),
    (gru = "gru"),
    (hhb = "hhb"),
    (vhr = "vhr"),
    $(function () {
      init(), updateOutput();
    });
  var _scrlazy = "";
  supports_html5_storage() &&
    ((Storage.prototype.setObject = function (a, b) {
      this.setItem(a, JSON.stringify(b));
    }),
    (Storage.prototype.getObject = function (a) {
      var b = this.getItem(a);
      return b && JSON.parse(b);
    })),
    (function (a) {
      "use strict";
      "function" == typeof define && define.amd
        ? define(a)
        : "undefined" != typeof module && "undefined" != typeof module.exports
        ? (module.exports = a())
        : (window.Sortable = a());
    })(function () {
      "use strict";
      function a(a, c) {
        (this.el = a),
          (this.options = c = c || {}),
          (c.group = c.group || Math.random()),
          (c.store = c.store || null),
          (c.handle = c.handle || null),
          (c.draggable =
            c.draggable ||
            (a.children[0] && a.children[0].nodeName) ||
            (/[uo]l/i.test(a.nodeName) ? "li" : "*")),
          (c.ghostClass = c.ghostClass || "sortable-ghost"),
          (c.ignore = c.ignore || "a, img"),
          "onAdd onUpdate onRemove onStart onEnd"
            .split(" ")
            .forEach(function (a) {
              c[a] = b(this, c[a] || E);
            }),
          (a[x] = c.group);
        for (var d in this) "_" === d.charAt(0) && (this[d] = b(this, this[d]));
        e(a, "add", c.onAdd),
          e(a, "update", c.onUpdate),
          e(a, "remove", c.onRemove),
          e(a, "start", c.onStart),
          e(a, "stop", c.onEnd),
          e(a, "mousedown", this._onTapStart),
          e(a, "touchstart", this._onTapStart),
          B && e(a, "selectstart", this._onTapStart),
          e(a, "dragover", this._onDragOver),
          e(a, "dragenter", this._onDragOver),
          G.push(this._onDragOver),
          c.store && this.sort(c.store.get(this));
      }
      function b(a, b) {
        var c = F.call(arguments, 2);
        return b.bind
          ? b.bind.apply(b, [a].concat(c))
          : function () {
              return b.apply(a, c.concat(F.call(arguments)));
            };
      }
      function c(a, b, c) {
        if ("*" === b) return a;
        if (a) {
          (c = c || z), (b = b.split("."));
          var d = b.shift().toUpperCase(),
            e = new RegExp("\\s(" + b.join("|") + ")\\s", "g");
          do
            if (
              !(
                ("" !== d && a.nodeName != d) ||
                (b.length &&
                  ((" " + a.className + " ").match(e) || []).length != b.length)
              )
            )
              return a;
          while (a !== c && (a = a.parentNode));
        }
        return null;
      }
      function d(a) {
        (a.dataTransfer.dropEffect = "move"), a.preventDefault();
      }
      function e(a, b, c) {
        a.addEventListener(b, c, !1);
      }
      function f(a, b, c) {
        a.removeEventListener(b, c, !1);
      }
      function g(a, b, c) {
        if (a)
          if (a.classList) a.classList[c ? "add" : "remove"](b);
          else {
            var d = (" " + a.className + " ")
              .replace(/\s+/g, " ")
              .replace(" " + b + " ", "");
            a.className = d + (c ? " " + b : "");
          }
      }
      function h(a, b, c) {
        if (a && a.style) {
          if (void 0 === c)
            return (
              z.defaultView && z.defaultView.getComputedStyle
                ? (c = z.defaultView.getComputedStyle(a, ""))
                : a.currentStyle && (c = a.currentStyle),
              void 0 === b ? c : c[b]
            );
          a.style[b] = c + ("string" == typeof c ? "" : "px");
        }
      }
      function i(a, b, c) {
        if (a) {
          var d = a.getElementsByTagName(b),
            e = 0,
            f = d.length;
          if (c) for (; e < f; e++) c(d[e], e);
          return d;
        }
        return [];
      }
      function j(a) {
        return (a.draggable = !1);
      }
      function k() {
        C = !1;
      }
      function l(a, b) {
        var c = a.lastElementChild.getBoundingClientRect();
        return b.clientY - (c.top + c.height) > 5;
      }
      function m(a) {
        for (
          var b = a.innerHTML + a.className + a.src, c = b.length, d = 0;
          c--;

        )
          d += b.charCodeAt(c);
        return d.toString(36);
      }
      var n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x = "Sortable" + new Date().getTime(),
        y = window,
        z = y.document,
        A = y.parseInt,
        B = !!z.createElement("div").dragDrop,
        C = !1,
        D = function (a, b) {
          var c = z.createEvent("Event");
          return c.initEvent(a, !0, !0), (c.item = b), c;
        },
        E = function () {},
        F = [].slice,
        G = [];
      return (
        (a.prototype = {
          constructor: a,
          _applyEffects: function () {
            g(n, this.options.ghostClass, !0);
          },
          _onTapStart: function (a) {
            var b = a.touches && a.touches[0],
              f = (b || a).target,
              g = this.options,
              h = this.el;
            if (
              (g.handle && (f = c(f, g.handle, h)),
              (f = c(f, g.draggable, h)),
              f &&
                "selectstart" == a.type &&
                "A" != f.tagName &&
                "IMG" != f.tagName &&
                f.dragDrop(),
              f && !n && f.parentNode === h)
            ) {
              (v = a),
                (p = this.el),
                (n = f),
                (q = n.nextSibling),
                (u = this.options.group),
                (n.draggable = !0),
                g.ignore.split(",").forEach(function (a) {
                  i(f, a.trim(), j);
                }),
                b &&
                  ((v = { target: f, clientX: b.clientX, clientY: b.clientY }),
                  this._onDragStart(v, !0),
                  a.preventDefault()),
                e(z, "mouseup", this._onDrop),
                e(z, "touchend", this._onDrop),
                e(z, "touchcancel", this._onDrop),
                e(this.el, "dragstart", this._onDragStart),
                e(this.el, "dragend", this._onDrop),
                e(z, "dragover", d);
              try {
                z.selection
                  ? z.selection.empty()
                  : window.getSelection().removeAllRanges();
              } catch (k) {}
              n.dispatchEvent(D("start", n));
            }
          },
          _emulateDragOver: function () {
            if (w) {
              h(o, "display", "none");
              var a = z.elementFromPoint(w.clientX, w.clientY),
                b = a,
                c = this.options.group,
                d = G.length;
              if (b)
                do {
                  if (b[x] === c) {
                    for (; d--; )
                      G[d]({
                        clientX: w.clientX,
                        clientY: w.clientY,
                        target: a,
                        rootEl: b,
                      });
                    break;
                  }
                  a = b;
                } while ((b = b.parentNode));
              h(o, "display", "");
            }
          },
          _onTouchMove: function (a) {
            if (v) {
              var b = a.touches[0],
                c = b.clientX - v.clientX,
                d = b.clientY - v.clientY,
                e = "translate3d(" + c + "px," + d + "px,0)";
              (w = b),
                h(o, "webkitTransform", e),
                h(o, "mozTransform", e),
                h(o, "msTransform", e),
                h(o, "transform", e),
                a.preventDefault();
            }
          },
          _onDragStart: function (a, b) {
            var c = a.dataTransfer;
            if ((this._offUpEvents(), b)) {
              var d,
                f = n.getBoundingClientRect(),
                g = h(n);
              (o = n.cloneNode(!0)),
                h(o, "top", f.top - A(g.marginTop, 10)),
                h(o, "left", f.left - A(g.marginLeft, 10)),
                h(o, "width", f.width),
                h(o, "height", f.height),
                h(o, "opacity", "0.8"),
                h(o, "position", "fixed"),
                h(o, "zIndex", "100000"),
                p.appendChild(o),
                (d = o.getBoundingClientRect()),
                h(o, "width", 2 * f.width - d.width),
                h(o, "height", 2 * f.height - d.height),
                e(z, "touchmove", this._onTouchMove),
                e(z, "touchend", this._onDrop),
                e(z, "touchcancel", this._onDrop),
                (this._loopId = setInterval(this._emulateDragOver, 150));
            } else
              (c.effectAllowed = "move"),
                c.setData("Text", n.textContent),
                e(z, "drop", this._onDrop);
            setTimeout(this._applyEffects);
          },
          _onDragOver: function (a) {
            if (
              !C &&
              u === this.options.group &&
              (void 0 === a.rootEl || a.rootEl === this.el)
            ) {
              var b = this.el,
                d = c(a.target, this.options.draggable, b);
              if (
                0 === b.children.length ||
                b.children[0] === o ||
                (b === a.target && l(b, a))
              )
                b.appendChild(n);
              else if (d && d !== n && void 0 !== d.parentNode[x]) {
                r !== d &&
                  ((r = d), (s = h(d)), (t = d.getBoundingClientRect()));
                var e,
                  f = t,
                  g = f.right - f.left,
                  i = f.bottom - f.top,
                  j = /left|right|inline/.test(s.cssFloat + s.display),
                  m = d.offsetWidth > n.offsetWidth,
                  p = d.offsetHeight > n.offsetHeight,
                  q =
                    (j ? (a.clientX - f.left) / g : (a.clientY - f.top) / i) >
                    0.5,
                  v = d.nextElementSibling;
                (C = !0),
                  setTimeout(k, 30),
                  (e = j
                    ? (d.previousElementSibling === n && !m) || (q && m)
                    : (v !== n && !p) || (q && p)),
                  e && !v
                    ? (b.appendChild(n), layerMoveRedraw(), updateTip())
                    : (d.parentNode.insertBefore(n, e ? v : d),
                      layerMoveRedraw(),
                      updateTip());
              }
            }
          },
          _offUpEvents: function () {
            f(z, "mouseup", this._onDrop),
              f(z, "touchmove", this._onTouchMove),
              f(z, "touchend", this._onDrop),
              f(z, "touchcancel", this._onDrop);
          },
          _onDrop: function (a) {
            clearInterval(this._loopId),
              f(z, "drop", this._onDrop),
              f(z, "dragover", d),
              f(this.el, "dragend", this._onDrop),
              f(this.el, "dragstart", this._onDragStart),
              f(this.el, "selectstart", this._onTapStart),
              this._offUpEvents(),
              a &&
                (a.preventDefault(),
                a.stopPropagation(),
                o && o.parentNode.removeChild(o),
                n &&
                  (j(n),
                  g(n, this.options.ghostClass, !1),
                  p.contains(n)
                    ? n.nextSibling !== q && n.dispatchEvent(D("update", n))
                    : (p.dispatchEvent(D("remove", n)),
                      n.dispatchEvent(D("add", n))),
                  n.dispatchEvent(D("stop", n))),
                (p = n = o = q = v = w = r = s = u = null),
                this.options.store && this.options.store.set(this));
          },
          toArray: function () {
            for (
              var a, b = [], c = this.el.children, d = 0, e = c.length;
              d < e;
              d++
            )
              (a = c[d]), b.push(a.getAttribute("data-id") || m(a));
            return b;
          },
          sort: function (a) {
            var b = {},
              c = this.el;
            this.toArray().forEach(function (a, d) {
              b[a] = c.children[d];
            }),
              a.forEach(function (a) {
                b[a] && (c.removeChild(b[a]), c.appendChild(b[a]));
              });
          },
          destroy: function () {
            var a = this.el,
              b = this.options;
            f(a, "add", b.onAdd),
              f(a, "update", b.onUpdate),
              f(a, "remove", b.onRemove),
              f(a, "start", b.onStart),
              f(a, "stop", b.onEnd),
              f(a, "mousedown", this._onTapStart),
              f(a, "touchstart", this._onTapStart),
              f(a, "selectstart", this._onTapStart),
              f(a, "dragover", this._onDragOver),
              f(a, "dragenter", this._onDragOver),
              Array.prototype.forEach.call(
                a.querySelectorAll("[draggable]"),
                function (a) {
                  a.removeAttribute("draggable");
                }
              ),
              G.splice(G.indexOf(this._onDragOver), 1),
              this._onDrop(),
              (this.el = null);
          },
        }),
        (a.utils = {
          on: e,
          off: f,
          css: h,
          find: i,
          bind: b,
          closest: c,
          toggleClass: g,
        }),
        (a.version = "0.4.1"),
        a
      );
    });
}
/*
     FILE ARCHIVED ON 08:55:28 Dec 08, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:33:57 Apr 24, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 101.424
  exclusion.robots: 0.075
  exclusion.robots.policy: 0.065
  cdx.remote: 0.057
  esindex: 0.01
  LoadShardBlock: 72.041 (3)
  PetaboxLoader3.datanode: 114.153 (4)
  load_resource: 106.704
  PetaboxLoader3.resolve: 52.677
*/
