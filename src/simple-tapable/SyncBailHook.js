const Hook = require("./Hook");

class SyncBailHook extends Hook {
  constructor(args) {
    super(args)
  }

  compile(options) {
    const { taps } = options;
    this._x = taps.map(tap => tap.fn);
    const fn = new Function(
      this.joinArgs(),
      this.header() + this.content(taps)
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
          return _result0;
        } else {
      
        var _fn1 = _x[1];
        var _result1 = _fn1(name,course);
        if(_result1 !== undefined) {
          return _result1;
        } else {
      
        var _fn2 = _x[2];
        var _result2 = _fn2(name,course);
        if(_result2 !== undefined) {
          return _result2;
        } else {
      }}}
}
    */
    return fn;
  }

  content(taps) {
    let content = "";
    taps.forEach((tap, i) => {
      content += `
        var _fn${i} = _x[${i}];
        var _result${i} = _fn${i}(${this.joinArgs()});
        if(_result${i} !== undefined) {
          return _result${i};
        } else {
      `
    });
    content += "}".repeat(taps.length);
    return content;
  }
}

const syncBailHook = new SyncBailHook(["name", "course"]);
syncBailHook.tap("1", (name, course) => {
  console.log("syncBailHook 1", name, course);
  return;
});
syncBailHook.tap("2", (name, course) => {
  console.log("syncBailHook 2", name, course);
  return 2;  // 返回不为undefined，不再执行后续事件
});
syncBailHook.tap("3", (name, course) => {
  console.log("syncBailHook 3", name, course);
  return 3;
});
syncBailHook.call("hxl", "tapable");

/*
输出：
syncBailHook 1 hxl tapable
syncBailHook 2 hxl tapable
*/