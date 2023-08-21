App.ReferenceImgButton = function (a, b) {
  "use strict";
  var button = $("<button>Add Reference Image</button>"),
    input = $('<input style="display:none" id="ref-files" type="file" accept="image/*" />');
  return (
    button.mousedown(function () {
      input.click();
    }),
    input.change(function (event) {
      let file = event.target.files[0];
      let frame = jsFrame.create({
        title: 'Reference',
        left: 20, top: 20, width: 320, height: 220,
        movable: true,//Enable to be moved by mouse
        resizable: true,//Enable to be resized by mouse
        style: {
          zIndex: 500
        }
      });
      let reader = new FileReader();
      reader.onload = function(e) {
        frame.setHTML(`<div class="w-full h-full bg-center bg-contain bg-no-repeat z-100" style="background-image: url('${e.target.result}')"></div>`)
        frame.show();
      }
      reader.readAsDataURL(file);
    }),
    button
  );
};