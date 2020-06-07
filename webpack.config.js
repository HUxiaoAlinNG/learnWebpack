const path = require("path");
const ExamplePlugin = require("./src/plugins/example-plugins");

module.exports = {
  entry: {
    // // commonJS加载commonJS模块
    // "import-commonjs-commonjs": "./src/sync-import/import-commonjs-commonjs.js",
    // // commonJS加载ES6模块
    // "import-commonjs-es6": "./src/sync-import/import-commonjs-es6.js",
    // // ES6加载ES6模块
    // "import-es6-es6": "./src/sync-import/import-es6-es6.js",
    // // ES6加载commonJS模块
    // "import-es6-commonjs": "./src/sync-import/import-es6-commonjs.js",
    // // 异步导出commonjs
    // "async-import": "./src/async-import/async-import.js",
    // loader
    // "loader-index": "./src/loader/index.js",
    "index": "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
  },
  devtool: "none",
  mode: "development",
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: ["@babel/preset-env", "@babel/preset-react"]
      //       }
      //     },
      //   ]
      // }
      // {
      //   loader: "hxl-loader"
      // }
      { loader: "loader3" },
      { loader: "loader2" },
      {
        loader: "loader1",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
      //   ]
      // }
      // {
      //   test: /\.js$/,
      //   use: ["normal-loader1", "normal-loader2"]
      // },
      // {
      //   test: /\.js$/,
      //   enforce: "pre",
      //   use: ["pre-loader1", "pre-loader2"]
      // },
      // {
      //   test: /\.js$/,
      //   enforce: "post",
      //   use: ["post-loader1", "post-loader2"]
      // }
    ]
  },
  // 自定义loader，从"src/loader/hxl-loader"路径查找hxl-loader
  // 两种写法：1.alias 2.modules
  resolveLoader: {
    // 针对少数的loader
    // alias: {
    //   "hxl-loader": path.resolve(__dirname, "src", "loader", "hxl-loader")
    // },
    // 针对大量的loader
    modules: [path.resolve(__dirname, "src", "loader"), path.resolve(__dirname, "src", "loader", "normal"), path.resolve(__dirname, "src", "loader", "type"), "node_modules"]
  },
  plugins: [new ExamplePlugin({ "test": "test ExamplePlugin" })]
}