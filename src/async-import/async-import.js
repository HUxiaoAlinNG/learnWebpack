setTimeout(() => {
  import("../export/export-commonjs").then((commonjs) => {
    console.log("===异步导出commonjs===", commonjs, commonjs.a, commonjs.b); // Module:{ b: "commonjs_b", default: "commonjs_a", Symbol(Symbol.toStringTag): "Module" ,__esModule: true } commonjs_a commonjs_b
  });
}, 10000);