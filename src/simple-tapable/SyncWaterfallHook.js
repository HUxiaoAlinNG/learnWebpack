const Hook = require("./Hook");

class SyncWaterfallHook extends Hook {
  constructor(args) {
    super(args)
  }

  compile(options) {
    const { taps, args } = options;
    this._x = taps.map(tap => tap.fn);
    const fn = new Function(
      this.joinArgs(),
      this.header() + this.content(taps, args)
    )
    console.log(fn.toString());
    /* 
    输出：
function anonymous(name,course
) {

      "use strict"
      var _context;
      var _x = this._x;
    
        var _fn0 = _x[0];
        var _result0 = _fn0(name,course);
        if(_result0 !== undefined) {
        name = _result0;
        }
      
        var _fn1 = _x[1];
        var _result1 = _fn1(name,course);
        if(_result1 !== undefined) {
        name = _result1;
        }
      
        var _fn2 = _x[2];
        var _result2 = _fn2(name,course);
        if(_result2 !== undefined) {
        name = _result2;
        }
      
        var _fn3 = _x[3];
        var _result3 = _fn3(name,course);
        if(_result3 !== undefined) {
        name = _result3;
        }
      
}
    */
    return fn;
  }

  content(taps, args) {
    let content = "";
    taps.forEach((tap, i) => {
      content += `
        var _fn${i} = _x[${i}];
        var _result${i} = _fn${i}(${this.joinArgs()});
        if(_result${i} !== undefined) {
        ${args[0]} = _result${i};
        }
      `
    });
    return content;
  }
}

const syncWaterfallHook = new SyncWaterfallHook(["name", "course"]);
syncWaterfallHook.tap("1", (name, course) => {
  console.log("syncWaterfallHook 1", name, course);
  return;
});
syncWaterfallHook.tap("2", (name, course) => {
  console.log("syncWaterfallHook 2", name, course);
  return 2;  // 返回不为undefined，传递给下一个监听函数
});
syncWaterfallHook.tap("3", (name, course) => {
  console.log("syncWaterfallHook 3", name, course);
  return;  // 返回undefined，则接着会传递tap2的返回值
});
syncWaterfallHook.tap("4", (name, course) => {
  console.log("syncWaterfallHook 4", name, course);
  return;
});
syncWaterfallHook.call("hxl", "tapable");

/*
输出：
syncWaterfallHook 1 hxl tapable
syncWaterfallHook 2 hxl tapable
syncWaterfallHook 3 2 tapable
syncWaterfallHook 4 2 tapable
*/