var jsFrame = new JSFrame({
  parentElement:document.body,//Set the parent element to which the jsFrame is attached here
});
var App = App || {};
var drawingPanel = document.getElementById("drawing");

$(function () {
  App.Editor($("#drawing"), $("#toolbar"), $("#toolbox")),
    $("body").addClass("loaded");
});

App.affines = App.affines || {};