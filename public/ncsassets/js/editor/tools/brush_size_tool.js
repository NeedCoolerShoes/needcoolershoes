App.BrushSizeTool = function (a) {
  "use strict";
  var b = "size1",
    c = $(
      '<ul title = "Brush Sizes" class = "button-group sizes"><li class = "size1 active"></li><li class = "size2"></li><li class = "size3"></li></ul>'
    );
  return (
    a.append(c),
    c.children().mousedown(function (a) {
      c.children().removeClass("active"),
        (b = $(this).attr("class")),
        $(this).addClass("active"),
        a.preventDefault();
    }),
    {
      getSize: function () {
        return b;
      },
      hide: function () {
        c.hide();
      },
      show: function () {
        c.show();
      },
    }
  );
};
