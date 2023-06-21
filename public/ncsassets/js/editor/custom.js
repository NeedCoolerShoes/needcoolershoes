/* Custom Scripts by Moxvallix */

function setMinecraftSkin(variables, name) {
  $.get("api/mojang/users/profiles/minecraft/" + name, function (data) {
    getMinecraftPlayerData(variables, data);
  });
}

function getMinecraftPlayerData(variables, data) {
  $.get(
    "api/mojangsessions/session/minecraft/profile/" + data.id,
    function (data) {
      getMinecraftSkinURL(variables, data);
    }
  );
}

function getMinecraftSkinURL(variables, data) {
  var json = JSON.parse(atob(data.properties[0].value));
  var skin = json.textures.SKIN.url;
  var url = skin.replace("http://textures.minecraft.net/", "/api/minecraft/");
  updateMinecraftSkinViewer(variables, url);
}

function updateMinecraftSkinViewer(vars, url) {
  vars.b.transporter
    .setUVImage(url, "skin")
    .always(function () {
      vars.f.find("li").text(vars.a),
        vars.f.removeClass("loading"),
        vars.d && d();
    })
    .done(function () {
      vars.g.val(""),
        vars.b.toolbar && vars.b.toolbar.changeToDefault(),
        vars.b.layerPresenter && vars.b.layerPresenter.checkpoint(true),
        vars.b.colorPicker &&
          vars.b.toolbox.refs.colorPicker.addRecentColorsFromFaces();
      // vars.ga("send", "event", "editor", "import minecraft.net skin", vars.h);
    })
    .fail(function () {
      vars.e.text("Could not find a user with that name.").show();
    });
}

// https://stackoverflow.com/questions/3916191/download-data-url-file

function download(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
