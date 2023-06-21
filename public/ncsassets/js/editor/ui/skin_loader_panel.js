App.SkinLoaderPanel = function (a, b) {
  a.append("<hr>");
  var c = new App.InputButton(a, b);
  a.append("<hr>");
  var d = new App.FileButton(a, b);
  a.append("<hr>");
  var e = new App.SearchPanel(a, b);
  return {
    beforeSkinLoad: function (a) {
      e.beforeSkinLoad(a), c.beforeSkinLoad(a), d.beforeSkinLoad(a);
    },
    afterSkinLoad: function (a) {
      e.afterSkinLoad(a), c.afterSkinLoad(a), d.afterSkinLoad(a);
    },
  };
};
