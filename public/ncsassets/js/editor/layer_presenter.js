App.LayerPresenter = function (toolbar, app) {
  "use strict";
  function render() {
    var element = "";
    app.layerModel.loop(function (layer) {
      var active = "";
      layer.selected && (active = "active");
      var close = "";
      layer.visible || (close = "close");
      var imageURL = "";
      images[layer.id] && (imageURL = "background-image:url(" + images[layer.id] + ") "),
        (element +=
          '<li style = "' +
          imageURL +
          '"  data-id = "' +
          layer.id +
          '" class = "' +
          active +
          '" ><div title = "Toggle layer visibility" class = "eye ' +
          close +
          '"></div></li>');
    }),
      n.html(element);
  }
  function d(a) {
    (a = a || app.layerModel.active()),
      (images[a.id] = app.transporter.getUVImage("frontBack", a).src);
  }
  function updateAllLayerThumbnails() {
    render(),
      app.layerModel.loop(function (a) {
        d(a, true);
      });
  }
  function f(a) {
    a === true
      ? app.layerPresenter.updateLayerThumbnail()
      : a && app.layerPresenter.updateLayerThumbnail(a),
      a && app.layerPresenter.render(),
      app.model.render();
    var c = app.layerModel.stringify();
    localStorage.setItem(`layerJson-${App.UVMAP.current}`, c), h.push(c), r.push(c);
  }
  function undo() {
    h.length > 1 &&
      (r.push(h.pop()),
      app.layerModel.parse(h[h.length - 1]),
      app.layerPresenter && app.layerPresenter.updateAllLayerThumbnails(),
      app.layerModel.renderModel(),
      app.model.render());
  }
  function redo() {
    r.length > 1 &&
      (r.pop(),
     // console.log(h),
     // console.log(r),
      app.layerModel.parse(r[r.length - 1]),
      app.layerPresenter && app.layerPresenter.updateAllLayerThumbnails(),
      app.layerModel.renderModel(),
      app.model.render());
  }
  var h = [],
      r = [],
    images = {},
    j = $('<div id = "layers" ></div>'),
    k = $('<li title="Add a new layer" class= "add"></li>'),
    l = $('<li title="Delete this layer" class= "delete"></li></ul>'),
    m = $('<ul class = "button-group top-heavy" ></ul>'),
    o = $('<div class="max-h-[220px] overflow-auto"></div>'),
    n = $('<ul class="flex flex-col justify-end"></ul>');
  return (
    j.append(o),
    o.append(n),
    m.append(k),
    m.append(l),
    j.append(m),
    toolbar &&
      (toolbar.append(j),
      n.sortable({
        axis: "y",
        distance: 10,
        stop: function () {
          n.data("dropped") ||
            (n
              .find("li")
              .not(".ui-sortable-placeholder")
              .each(function (a) {
                app.layerModel.get($(this).attr("data-id")).order = a;
              }),
            app.layerModel.renderModel(),
            app.layerPresenter.checkpoint(true)),
            n.data("dropped", false);
        },
      }),
      n.on("click", "li", function () {
        app.layerModel.select(app.layerModel.get($(this).attr("data-id"))), render();
      }),
      k.click(function () {
        app.layerModel.add(), app.layerPresenter.checkpoint(true);
      }),
      l.click(function () {
        n.find("li[data-id='" + app.layerModel.active().id + "']").slideUp(
          500,
          function () {
            app.layerModel.remove(), render(), app.layerPresenter.checkpoint(false);
          }
        );
      }),
      n.on("click", ".eye", function () {
        app.layerModel.toggleVisibility($(this).parent().attr("data-id")),
          render(),
          app.layerModel.renderModel(),
          app.model.render();
      })),
    {
      updateAllLayerThumbnails: updateAllLayerThumbnails,
      render: render,
      undo: undo,
      redo: redo,
      checkpoint: f,
      updateLayerThumbnail: d,
    }
  );
};
