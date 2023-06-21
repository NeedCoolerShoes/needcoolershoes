// App.Keys = function (a) {
//   function b(a, b) {
//     c(a)
//       ? console.log(`!!! WARNING: DUPLICATE KEY BINDINGS !!! ${a}`)
//       : (Mousetrap.bind(a, b), (d = d.concat(a)));
//   }
//   function c(a) {
//     console.log(d)
//     for (var b = 0; b < d.length; b++)
//       console.log(`${d[b]} -> ${a[c]}`)
//       for (var c = 0; c < a.length; c++) if (d[b] == a[c]) return true;
//     return false;
//   }
//   var d = [];
//   return { bind: b };
// };

App.Keys = function (a) {
  function b(a, b) {
    Mousetrap.bind(a, b);
  }
  return { bind: b };
};