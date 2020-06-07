// 简单的webpack-cli
const webpack = require("webpack");
// 步骤一，初始化参数：从配置文件(webpack.config.js)或Shell语句中读取并合并参数；
const opts = require("../../webpack.config");
const argv = process.argv;
argv.slice(2).forEach(arg => {
  if (arg.startsWith("--")) {
    const split = arg.slice(2).split("=");
    // 合并参数
    opts[split[0]] = split[1];
  }
});

// 步骤二，开始编译：用初始化好的参数传给webpack生成Compiler对象，加载所有配置的插件(Loader,Plugins)，执行对象的run方法开始执行编译；根据配置中的entry找出所有的入口文件；
const compile = webpack(opts);
// 打印钩子名称和方法，可以看出compile hooks继承于tapable库
// https://webpack.js.org/api/compiler-hooks/
/* 
0:"shouldEmit"
1:"done"
2:"additionalPass"
3:"beforeRun"
4:"run"
5:"emit"
6:"assetEmitted"
7:"afterEmit"
8:"thisCompilation"
9:"compilation"
10:"normalModuleFactory"
11:"contextModuleFactory"
12:"beforeCompile"
13:"compile"
14:"make"
15:"afterCompile"
16:"watchRun"
17:"failed"
18:"invalid"
19:"watchClose"
20:"infrastructureLog"
21:"environment"
22:"afterEnvironment"
23:"afterPlugins"
24:"afterResolvers"
25:"entryOption"
26:"infrastructurelog"
*/
console.log(Object.keys(compile.hooks));

console.log("start");
/*
钩子名称:beforeRun,钩子方法名称:AsyncSeriesHook，钩子方法参数:compiler
钩子名称:run,钩子方法名称:AsyncSeriesHook，钩子方法参数:compiler
钩子名称:normalModuleFactory,钩子方法名称:SyncHook，钩子方法参数:normalModuleFactory
钩子名称:contextModuleFactory,钩子方法名称:SyncHook，钩子方法参数:contextModulefactory
钩子名称:beforeCompile,钩子方法名称:AsyncSeriesHook，钩子方法参数:params
钩子名称:compile,钩子方法名称:SyncHook，钩子方法参数:params
钩子名称:thisCompilation,钩子方法名称:SyncHook，钩子方法参数:compilation,params
钩子名称:compilation,钩子方法名称:SyncHook，钩子方法参数:compilation,params
钩子名称:make,钩子方法名称:AsyncParallelHook，钩子方法参数:compilation
钩子名称:afterCompile,钩子方法名称:AsyncSeriesHook，钩子方法参数:compilation
钩子名称:shouldEmit,钩子方法名称:SyncBailHook，钩子方法参数:compilation
钩子名称:emit,钩子方法名称:AsyncSeriesHook，钩子方法参数:compilation
钩子名称:assetEmitted,钩子方法名称:AsyncSeriesHook，钩子方法参数:file,content
钩子名称:afterEmit,钩子方法名称:AsyncSeriesHook，钩子方法参数:compilation
钩子名称:done,钩子方法名称:AsyncSeriesHook，钩子方法参数:stats
*/
Object.keys(compile.hooks).forEach(hookName => {
  const hook = compile.hooks[hookName];
  hook.tap && hook.tap("watchFlow", () => {
    console.log(`钩子名称:${hookName},钩子方法名称:${Object.getPrototypeOf(hook).constructor.name}，钩子方法参数:${hook._args}`)
  }) && true;
});

// 开始编译
compile.run((err, stats) => {
  // 编译完成
  // https://webpack.js.org/api/stats/#structure
  // stats保存的是此次编译的结果信息
  // console.log(err, stats.toJson({
  //   entries: true,  /** Show entries count in progress message */
  //   reasons: true,  /** Add information about the reasons why modules are included */
  //   version: true,  /** Add webpack version information */
  //   usedExports: true,  /** Show which exports of a module are used */
  //   providedExports: true,  /** Show the exports of the modules */
  //   assets: true,  /** Add asset Information */
  // }));
  console.log("end")
});

