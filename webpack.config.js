const path = require("path");

module.exports = {
  entry: {
    // commonJS加载commonJS模块
    "import-commonjs-commonjs": "./src/sync-import/import-commonjs-commonjs.js",
    // commonJS加载ES6模块
    "import-commonjs-es6": "./src/sync-import/import-commonjs-es6.js",
    // ES6加载ES6模块
    "import-es6-es6": "./src/sync-import/import-es6-es6.js",
    // ES6加载commonJS模块
    "import-es6-commonjs": "./src/sync-import/import-es6-commonjs.js",
    // 异步导出commonjs
    "async-import": "./src/async-import/async-import.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
  },
  devtool: "none",
  mode: "development"
}