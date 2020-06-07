// 插件是一个类，apply方法必不可少，参数为compiler
module.exports = class ExamplePlugin {
  constructor(opts) {
    this.opts = opts;
    console.log(this.opts);
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tapAsync('ExamplePlugin', (compiler, cb) => {
      console.log("ExamplePlugin beforeRun");
      cb();
    })
  }
}