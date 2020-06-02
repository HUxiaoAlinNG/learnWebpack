const babelCore = require("@babel/core");
const {
  getOptions,
  // parseQuery,
  // stringifyRequest,
  // getRemainingRequest,
  // getCurrentRequest,
  // isUrlRequest,
  // parseString,
  // urlToRequest,
  interpolateName,
  // getHashDigest,
} = require("loader-utils");

// 传入原内容，解析出新内容
function loader(source) {
  // 获取配置
  console.log("===getOptions===", getOptions(this));
  // 转成新的文件名
  console.log("===interpolateName===", interpolateName(this, "[hash].[ext]", { content: source }));
  console.log("===source===", source)
  console.log("===this.data===", this.data);  // 在 pitch 阶段和正常阶段之间共享的 data 对象
  console.log("===this.context===", this.context);  // 模块所在的目录
  console.log("===this.request===", this.request);  // 被解析出来的 request 字符串
  console.log("===this.loaders===", this.loaders);  // 所有 loader 组成的数组
  console.log("===this.loaderIndex===", this.loaderIndex);  // 当前 loader 在 loader 数组中的索引
  console.log("===this.resource===", this.resource);  // request 中的资源部分，包括 query 参数
  console.log("===this.resourcePath===", this.resourcePath);  // 资源文件的路径
  console.log("===this.resourceQuery===", this.resourceQuery);  // 资源的 query 参数
  console.log("===this.target===", this.target);  // 编译的目标。从配置选项中传递过来的  "web", "node"
  console.log("===this.sourceMap===", this.sourceMap);  // 生成一个 source map
  console.log("===this.emitWarning===", this.emitWarning);  // 发出一个警告
  console.log("===this.emitError===", this.emitError);  // 发出一个错误
  // 解析给定的 request 到一个模块，应用所有配置的 loader ，并且在回调函数中传入生成的 source 、sourceMap 和 模块实例（通常是 NormalModule 的一个实例）
  console.log("===this.loadModule===", this.loadModule);  //loadModule(request: string, callback: function(err, source, sourceMap, module))
  // 像 require 表达式一样解析一个 reques
  console.log("===this.resolve===", this.resolve);  // resolve(context: string, request: string, callback: function(err, result: string))
  // 加入一个文件作为产生 loader 结果的依赖，使它们的任何变化可以被监听到
  console.log("===this.addDependency===", this.addDependency);  // addDependency(file: string)  / dependency(file: string)
  // 把文件夹作为 loader 结果的依赖加入
  console.log("===this.addContextDependency===", this.addContextDependency);  // addContextDependency(directory: string)
  // 移除 loader 结果的所有依赖。甚至自己和其它 loader 的初始依赖。考虑使用 pitch。
  console.log("===this.clearDependencies===", this.clearDependencies);  // clearDependencies()
  // 产生一个文件
  console.log("===this.emitFile===", this.emitFile);  // emitFile(name: string, content: Buffer|string, sourceMap: {...})
  console.log("===this.fs===", this.fs);  // 用于访问 compilation 的 inputFileSystem 属性

  const { ast, code, ignored, map, metadata } = babelCore.transform(source, {
    ast: true,
    code: true,
    inputSourceMap: true,
    sourceMaps: true,
    comments: true,
  });
  // console.log("===ast===", ast);
  // console.log("===code===", code);
  // console.log("===ignored===", ignored);
  // console.log("===map===", map);
  // console.log("===metadata===", metadata);
  this.callback(null, code.replace("1;", '"hxl";'), map, ast);
}
/* 
@remainingReq:剩余的请求
@previousReq：以前的请求
@data: 当前loader的数据，与上面的loader函数共享数据
*/
loader.pitch = function (remainingReq, previousReq, data) {
  console.log("===loader remainingReq", remainingReq);
  console.log("===loader previousReq", previousReq);
  console.log("===loader data", data);
  data.value = "value";
}
// 默认webpack会将模块内容转为字符串，raw等于true时，转为buffer
loader.raw = true;
module.exports = loader;