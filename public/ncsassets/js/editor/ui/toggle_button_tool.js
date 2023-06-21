App.ToggleButtonTool = function (a, b, c) {
  "use strict";
  var d = false,
    e = $(
      '<button title = "' +
        c +
        '"class = "toggle" id = "' +
        b +
        '" ></button>'
    );
  return (
    a.append(e),
    e.click(function (a) {
      e.toggleClass("active"), (d = !d), a.preventDefault();
    }),
    {
      toggle: function () {
        e.toggleClass("active"), (d = !d);
      },
      isEnabled: function () {
        return d;
      },
      hide: function () {
        e.hide();
      },
      show: function () {
        e.show();
      },
    }
  );
};
