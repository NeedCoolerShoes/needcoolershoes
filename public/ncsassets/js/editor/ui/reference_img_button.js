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
        frame.setHTML('<div class="ref w-full h-full" style="overflow:clip; image-rendering: crisp-edges"><canvas></canvas></div>');

        let ref = frame.$('.ref');
        let canvas = frame.$('canvas');
        let pz = panzoom(canvas, {
          bounds: true,
          smoothScroll: false
        });
        let image = new Image;
        
        image.addEventListener('load', event => {
          canvas.width = event.target.naturalWidth;
          canvas.height = event.target.naturalHeight;

          let ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(image, 0, 0);


          let offsetX = (ref.clientWidth / 2)
          let offsetY = (ref.clientHeight / 2)
          let offsetZoom = ref.clientHeight / canvas.height

          pz.moveTo(
            -(canvas.width / 2) + offsetX,
            -(canvas.height / 2) + offsetY
          )
          pz.zoomAbs(offsetX, offsetY, offsetZoom)
        })

        ref.addEventListener('mouseover', () => {
          if (b.toolbox.refs.colorPicker.isDropperActive()) {
            ref.classList.add("cursor-crosshair")
          } else {
            ref.classList.remove("cursor-crosshair")
          }
        })

        canvas.addEventListener('click', event => {
          if (!b.toolbox.refs.colorPicker.isDropperActive()) { return; }
          let ctx = canvas.getContext('2d');
          let imgData = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data
          let color = new THREE.Color().setRGB(imgData[0] / 255, imgData[1] / 255, imgData[2] / 255)
          b.toolbox.refs.colorPicker.dropperDeactivate(color)
        })

        image.src = e.target.result;
        frame.show();
      }
      reader.readAsDataURL(file);
    }),
    button
  );
}; 
