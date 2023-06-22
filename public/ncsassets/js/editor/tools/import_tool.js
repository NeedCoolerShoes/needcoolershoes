App.ImportTool = function (a, b) {
  "use strict";
  var c = false,
    d = $('<div id = "import" ></div>'),
    e = $('<div class = "panel" ></div>'),
    f = $('<div class = "square" ></div>'),
    g =
      ($('<div class = "loading"><div class="spinner"></div></div>'),
      new App.ColorPanel(e, b)),
    h = new App.SearchPanel(e, b);
  f.append($("<h2>Choose an option for import</h2>"));
  var i = new App.InputButton(f, b);
  f.append(
    $("<button>A Solid Color</button>").mousedown(function () {
      g.show(), h.hide();
    })
  );

  // Disable randomiser button, as it no longer functions
  var j =
    (new App.FileButton(f, b),
    $("<button disabled>Generate Random</button>").mousedown(function () {
      function a(a) {
        var c = Math.floor(Math.random() * a.length),
          d = a[c].split(",");
        return (
          i.push(d[0]),
          b.transporter.setUVImage(
            App.config.s3.prefix.aws +
              App.config.s3.suffix.file +
              "/save/" +
              d[1] +
              ".png",
              App.UVMAP.current,
            d[0]
          )
        );
      }
      function c() {
        for (var a = 0; a < i.length; a++)
          b.layerModel.loop(function (c) {
            c.skinId == i[a] && b.layerModel.changeOrder(c, 9999);
          });
        b.layerModel.loop(function (a, c) {
          0 == c && b.layerModel.select(a);
        }),
          b.layerModel.renderModel(),
          b.layerPresenter.checkpoint(true),
          b.toolbar.changeToDefault(),
          b.toolbox.refs.colorPicker.addRecentColorsFromFaces(),
          d.removeClass("loading");
      }
      var d = $(this),
        e = [
          "39134,gt9/my-base",
          "35127,f06/unfinished",
          "35712,fcm/girl-base",
          "34428,dKG/mudkip",
          "32040,cRL/jabu-jabu-baby",
          "29273,bQx/male-base",
          "29225,bPC/fakeface039s-base-fixed",
          "28992,bK7/pikaychuu",
          "27747,bgb/mrqwertz112-the-blue-raccon",
          "27272,b53/ggirl1234-base",
          "25895,9zz/stone-creeper",
          "17807,6B2/just-a-random-base",
          "7782,2Tf/bear-bear",
          "9802,3D5/skin-de-mrcrackhd",
          "4195,1yg/white-beard-man-base",
          "409,7Y/baseforstheskini039mdoing",
          "1766,Fy/simple-smiley-skin-with-creeper-face",
          "1812,Gr/pedobear",
          "2109,N8/nude-man",
          "2271,Rg/red-panda",
          "2310,S1/noob",
          "962,lB/pig-man",
          "948,lk/starbound-avian",
          "1617,BH/robot-guy",
          "1439,xg/hulk-18-skin",
          "1409,wH/super-sonic",
          "1390,wk/cyan-slime",
          "1371,vY/the-devil",
          "1316,tV/stickman",
          "1255,sK/naked-angel",
          "1092,p5/cat-skin",
          "3172,19B/robotsteveorange",
          "3146,195/josh-base",
          "3140,18Z/bubblekinz",
          "3126,18J/werk",
          "3100,18c/paddler",
          "3088,17Z/cookieman",
          "3031,16T/anime-cat",
          "3017,16C/jamie",
          "3007,16q/stupidcupid",
          "2933,150/poulet",
          "2874,13S/bmo",
        ],
        f = [
          "10105,3KW/t-shirt-ghost",
          "11523,4gb/green-shirt",
          "12822,4L9/requests",
          "18413,6PH/white-tee-shirt",
          "18413,6PH/white-tee-shirt",
          "26020,9CZ/spider-jacket",
          "25946,9By/nice-creeper-sweater-for-boys",
          "26046,9Dt/shirt",
          "27433,b88/space-armor",
          "29156,bNh/hoodie-with-hood-on",
          "29793,c1x/green-lined-black-jacket",
          "31774,cLD/pull-redstone",
          "32689,d5d/dirt-shirt",
          "32683,d56/creeper-shirt",
          "36141,fmC/enchanting-jacket",
          "36228,fph/fluttershy-hoodie",
          "36230,fpk/rarity-hoodie",
          "36232,fpm/pinkie-pie-hoodie",
          "36570,fwS/applejack-hoodie",
          "36579,fx2/dr-whooves-hoodie",
          "37220,fMm/dj-pon3-hoodie",
          "37887,g1b/vinyl-scratch-hoodie",
          "37906,g1y/cactus-thorn-hoodie",
          "37977,g2W/gold-cuff-jacket",
          "38996,gqw/pirate-shirt",
          "37010,fHk/barbarian-body-armor",
          "2506,WN/golden-boobplate",
          "2336,Sw/sweatshirt",
          "2103,N2/sweatshirt",
          "2100,MZ/sweatshirt",
          "2062,Mf/jaquette",
          "2064,Mh/blouse",
          "2065,Mj/military-shirt",
          "2061,Md/blue-shirt",
          "2060,Mc/military-shirt",
          "2059,Mb/jaquette",
          "2058,M9/shirt",
          "1675,CP/rainbow",
          "1875,HF/vest",
          "1275,t6/sweater-lavender",
          "1273,t4/sweater-mint",
          "1198,rD/grey-amp-terqoiuse-hoodie",
          "1202,rJ/hoodie-grey-amp-black",
          "1260,sQ/steve-shirt",
          "1049,ng/basic",
          "377,7l/red-hoodie-accessory",
          "1737,F0/bear-skin",
          "2530,Xf/golden-rugged-armor",
          "1480,y3/3d-diamond-armour",
          "67,1j/reactive-armor",
          "1702,Dk/armour",
          "2264,R7/hoodie-with-shades",
          "3111,18q/gtnerd30039s-hoodie",
          "3081,17R/karate-gi-with-hood",
          "2057,M8/costume",
          "294,5L/green-cloak",
          "183,3C/ash039s-outfit",
          "166,3c/a-short-tuxedo",
        ],
        g = [
          "36708,fzw/survey-corps-cloak",
          "35662,fbp/lord-part-1",
          "33475,dnl/jacket-layer-bag",
          "32690,d5f/survivalpvp-gear",
          "28952,bJm/survey-corps-cloak",
          "id/slug: 25219,9kz/pokemon-trainer-hat-and-pack",
          "25375,9nz/diamond-gogglesglasses",
          "18400,6Pr/dual-diamond-swords",
          "17853,6BW/bow",
          "19216,767/robot-arm",
          "20385,7xC/infection",
          "21351,7Vb/sly-shirthoodie",
          "18666,6Vy/scarf",
          "31989,cQM/the-waterbender039s-arsenal",
          "437,8v/gold-seeker-glasses",
          "2465,W0/future-army-helmet",
          "2379,Tl/headphones-pink-speckled1",
          "2374,Tf/graduation-cap",
          "1110,pX/wehrmacht-general039s-cap",
          "1108,pV/wehrmacht-infantry-officer039s-cap",
          "1019,mH/top-hat",
          "380,7p/crown-2",
          "65,1g/3d-bling",
          "64,1f/robot-arm-18",
          "184,3D/basic-sash",
          "381,7q/back-pack",
          "828,j1/quiver",
          "822,hV/diamond-sword",
          "676,f5/pink-sword",
          "1687,D2/sun-glasses",
          "1852,Hc/headphones",
          "1895,J2/bow-with-daimond-arrow",
          "2049,M0/backpack",
          "2156,P3/angel-wings",
          "1955,Kb/gray-stripes",
        ],
        h = [
          "32272,cXc/green-pants-with-shoes",
          "25200,9kc/camo-pants-v1",
          "21346,7V5/boxers",
          "6048,2dV/timber-overalls",
          "6163,2h6/suspenders",
          "5891,29T/pink-fluffies",
          "8914,3j1/cobalt-man-mk-3-dif-color-leggings",
          "34235,dFY/stripey-shorts",
          "1052,nk/basic",
          "706,fG/pants",
          "319,6d/blue-pants",
          "1219,s2/terqouise-amp-black-short-shorts",
          "1543,zg/shorts",
          "1547,zl/shorts",
          "2053,M4/jean",
          "2052,M3/jean",
          "1555,zv/shorts",
          "1553,zs/shorts",
          "2054,M5/caleccedilon",
          "2055,M6/jean",
          "2056,M7/jean",
        ],
        i = [];
      b.layerModel.removeAll(),
        d.hasClass("loading") ||
          (d.addClass("loading"),
          $.when(
            $.Deferred(function (a) {
              setTimeout(a.resolve, 1e3);
            }),
            a(g),
            a(f),
            a(h),
            a(e)
          ).always(c));
    }));
  return (
    f.append(j),
    d.append(e),
    d.append(f),
    a.append(d),
    {
      isEnabled: function () {
        return c;
      },
      hide: function () {
        d.hide();
      },
      show: function () {
        d.show(), g.hide(), h.show(), i.reset();
      },
    }
  );
};
