const babelCore = require("@babel/core");

// 传入原内容，解析出新内容
module.exports = function loader(...source) {
  console.log("===source===", source);
  const { ast, code, ignored, map, metadata } = babelCore.transform(source, {
    ast: true,
    code: true,
    inputSourceMap: true,
    sourceMaps: true,
    comments: true,
  });
  console.log("===ast===", ast);
  console.log("===code===", code);
  console.log("===ignored===", ignored);
  console.log("===map===", map);
  console.log("===metadata===", metadata);
  return this.callback(null, code, map, ast);
}