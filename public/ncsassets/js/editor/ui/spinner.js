App.Spinner = function (a) {
  "use strict";
  var b = $('<div class = "loading"><div class="spinner"></div></div>');
  return (
    a.append(b.hide()),
    {
      hide: function () {
        b.hide();
      },
      show: function () {
        b.show();
      },
    }
  );
};
