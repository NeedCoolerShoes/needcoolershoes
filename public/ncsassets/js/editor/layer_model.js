App.LayerModel = function (a) {
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
}