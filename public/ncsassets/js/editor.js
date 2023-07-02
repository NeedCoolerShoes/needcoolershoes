var App = App || {};
var drawingPanel = document.getElementById("drawing");

$(function () {
  App.Editor($("#drawing"), $("#toolbar"), $("#toolbox")),
    $("body").addClass("loaded");
});

App.affines = App.affines || {};