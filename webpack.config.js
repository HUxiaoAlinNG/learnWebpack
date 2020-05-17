const path = require("path");

module.exports = {
  entry: {
    "import-commonjs-commonjs": "./src/import-commonjs-commonjs.js",
    "import-commonjs-es6": "./src/import-commonjs-es6.js",
    "import-es6-es6": "./src/import-es6-es6.js",
    "import-es6-commonjs": "./src/import-es6-commonjs.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
  },
  mode: "development"
}