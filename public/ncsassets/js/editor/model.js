App.Model = function (canvas, _deps) {
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
      skinObject.add(z[a]),
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
    (v = canvas.width()), (w = canvas.height()), canvasRenderer.setSize(v, w);
  }
  function pingIntersects(offset) {
    var vector = new THREE.Vector3(
      (offset.left / v) * 2 - 1,
      2 * -(offset.top / w) + 1,
      0.5
    );
    projector.unprojectVector(vector, perspectiveCamera);
    for (
      var raycast = new THREE.Raycaster(
          perspectiveCamera.position,
          vector.sub(perspectiveCamera.position).normalize()
        ),
        objects = [],
        iteration = 0;
      iteration < skinObject.children.length;
      iteration++
    )
    skinObject.children[iteration].visible && objects.push(skinObject.children[iteration]);
    var intersectingObjects = raycast.intersectObjects(objects);
    return intersectingObjects;
  }
  function rotateTo(a) {
    (skinObject.rotation.y -= 0.02 * a.y), (skinObject.rotation.x -= 0.02 * a.x);
  }
  function animateTo(a) {
    if (!x) {
      new TWEEN.Tween({ x: skinObject.rotation.x, y: skinObject.rotation.y })
        .to({ x: skinObject.rotation.x + a.x, y: skinObject.rotation.y + a.y }, 250)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function () {
          (skinObject.rotation.x = this.x), (skinObject.rotation.y = this.y), render();
        })
        .onComplete(function () {
          x = !1;
        })
        .start();
      (x = !0), j();
    }
  }
  function addScale(amount) {
    scale(perspectiveCamera.fov + amount);
  }
  function scale(amount) {
    (perspectiveCamera.fov = amount), perspectiveCamera.updateProjectionMatrix(), render();
  }
  function addPosition(x, y) {
    position(perspectiveCamera.position.x + x, perspectiveCamera.position.y + y)
  }
  function position(x, y) {
    (perspectiveCamera.position.x = x), (perspectiveCamera.position.y = y), perspectiveCamera.updateProjectionMatrix(), render();
  }
  function animateExact(a) {
    if (!x) {
      new TWEEN.Tween({ x: skinObject.rotation.x, y: skinObject.rotation.y })
        .to({ x: a.x, y: a.y }, 250)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function () {
          (skinObject.rotation.x = this.x), (skinObject.rotation.y = this.y), render();
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
  function setFaceColor(a, b) {
    (a.materialIndex = 1),
      b.isAlpha() && (a.materialIndex = 0),
      (a.color = b);
  }
  function getFaceColor(a) {
    return a.color;
  }
  function getAdjacentFaces(a, b) {
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
  function getMirroredFace(a) {
    var b = a.object;
    if (a.object.mirrorPart) var b = a.object.mirrorPart;
    var c = b.geometry.widthSegments,
      d = b.geometry.heightSegments;
    // Fix for Alex skins, with mirroring
    if (App.UVMAP.current == "skinAlex" && a.faceIndex <= 95 && ["armR", "armR2", "armL", "armL2"].includes(a.object.name)) {
      c += 1
    }
    if (
      (("torso" != b.name && "torso2" != b.name )||
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
  function loopOverMap(a, b, c) {
    for (var d = skinObject.children.length - 1; d >= 0; d--) {
      var e = {};
      if (!c || c == skinObject.children[d])
        for (var f = 0; f < skinObject.children[d].geometry.faces.length; f++) {
          var g = skinObject.children[d].geometry.faces[f];
          if (JSON.stringify(e) != JSON.stringify(g.normal)) {
            e = g.normal;
            var h = 0,
              i = 0,
              j = skinObject.children[d].geometry.depthSegments,
              k = skinObject.children[d].geometry.heightSegments;
            (Math.abs(e.z) > 0 || Math.abs(e.y) > 0) &&
              ((j = skinObject.children[d].geometry.widthSegments),
              (k = skinObject.children[d].geometry.depthSegments));
          }
          for (var l = 0; l < a.length; l++)
            if (
              skinObject.children[d].name == a[l][3] &&
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
  function loopOverFaces(a) {
    for (var b = 0; b < skinObject.children.length; b++)
      for (var c = 0; c < skinObject.children[b].geometry.faces.length; c++)
        a(skinObject.children[b].geometry.faces[c], skinObject.children[b], b, c);
  }
  function loopOverParts(a) {
    for (var b = 0; b < skinObject.children.length; b++) a(skinObject.children[b]);
  }
  function getPart(a) {
    return z[a];
  }
  function cursorOffset(mouseEvent) {
    if (mouseEvent.offsetX == void 0) {
      var b = mouseEvent.pageX - canvasOffset.left,
      c = mouseEvent.pageY - canvasOffset.top;
    } else {
      var b = mouseEvent.offsetX,
      c = mouseEvent.offsetY;
    }
    return { left: b, top: c };
  }
  function render() {
    for (var a = 0; a < skinObject.children.length; a++) {
      var b = skinObject.children[a],
        c = new THREE.Vector3();
      c.getPositionFromMatrix(b.matrixWorld),
        (b.zBoost = c.distanceTo(perspectiveCamera.position)),
        b.underlay && (b.zBoost += -0.05);
    }
    canvasRenderer.render(E, perspectiveCamera);
  }
  function turnOffGrid() {
    y[0] = new THREE.MeshBasicMaterial({ visible: !1 });
  }
  var v = canvas.width(),
    w = canvas.height(),
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
    skinObject = new THREE.Object3D();
  var armWidth = App.UVMAP.current == "skinAlex" ? 3 : 4
  var armOffset = App.UVMAP.current == "skinAlex" ? 5.65 : 6
  c("hat", { width: 8, height: 8, depth: 8 }, { x: 0, y: 10, z: 0 }, 0.5),
    c(
      "torso2",
      { width: 8, height: 12, depth: 4 },
      { x: 0, y: 0, z: 0 },
      0.5
    ),
    c(
      "armR2",
      { width: armWidth, height: 12, depth: 4 },
      { x: -armOffset, y: 0, z: 0 },
      0.5
    ),
    c(
      "armL2",
      { width: armWidth, height: 12, depth: 4 },
      { x: armOffset, y: 0, z: 0 },
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
    c("armR", { width: armWidth, height: 12, depth: 4 }, { x: -armOffset, y: 0, z: 0 }),
    c("armL", { width: armWidth, height: 12, depth: 4 }, { x: armOffset, y: 0, z: 0 }),
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
  var projector = new THREE.Projector(),
    canvasRenderer = new THREE.CanvasRenderer();
  canvasRenderer.sortObjects = !1;
  var perspectiveCamera = new THREE.PerspectiveCamera(70, v / w, 5, 100);
  (perspectiveCamera.position.z = 30), (perspectiveCamera.position.y = -1);
  var E = new THREE.Scene();
  E.add(skinObject);
  for (var F = 0, G = 0; G < skinObject.children.length; G++) {
    skinObject.children[G].groupIndex = G;
    for (var H = 0; H < skinObject.children[G].geometry.faces.length; H++) {
      var I = skinObject.children[G].geometry.faces[H];
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
  var J = $(canvasRenderer.domElement);
  canvas.append(J), f();
  var canvasOffset = J.offset();
  return {
    pingIntersects: pingIntersects,
    rotateTo: rotateTo,
    getFaceColor: getFaceColor,
    setFaceColor: setFaceColor,
    getMirroredFace: getMirroredFace,
    getAdjacentFaces: getAdjacentFaces,
    loopOverFaces: loopOverFaces,
    loopOverMap: loopOverMap,
    loopOverParts: loopOverParts,
    getPart: getPart,
    $dom: J,
    offset: canvasOffset,
    cursorOffset: cursorOffset,
    render: render,
    turnOffGrid: turnOffGrid,
    animateTo: animateTo,
    animateExact: animateExact,
    scale: scale,
    addScale: addScale,
    addPosition: addPosition,
    position: position,
  };
};
