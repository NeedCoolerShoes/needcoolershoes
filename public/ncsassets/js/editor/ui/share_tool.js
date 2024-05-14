App.ShareTool = function (a, b) {
  "use strict";
  var share = $('<div id = "share" ></div>'),
    panel = $('<div class = "panel" ></div>'),
    message = $('<div class = "message"></div>'),
    square = $('<div class = "square" ></div>'),
    downloadButton = $("<button>Download to Computer (PNG)</button>").mousedown(function (a) {
      b.transporter.download();
    }),
    downloadLayersButton = $("<button>Export with Layers (NCRS)</button>").mousedown(function (a) {
      b.transporter.downloadLayers();
    }),
    form = $("<div></div>"),
    buttonGroup = $('<div class="button-group"></div>');
  window.addEventListener("load", _ => {
    form.html($("#sharegalleryform").html());
  })
  return (
    square.append($("<h2> Choose an option for export</h2>")),
    // f.append(h), Disable "Change Minecraft.Net Skin" button
    square.append(buttonGroup),
    buttonGroup.append(downloadButton),
    buttonGroup.append(downloadLayersButton),
    panel.append(message.hide()),
    panel.append(form),
    share.append(panel),
    share.append(square),
    a.append(share),
    {
      hide: function () {
        share.hide();
      },
      show: function () {
        share.show(), message.hide();
      },
    }
  );
};
