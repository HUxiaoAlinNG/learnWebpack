const Hook = require("./Hook");

class SyncHook extends Hook {
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
        _fn0(name,course);
      
        var _fn1 = _x[1];
        _fn1(name,course);
      
        var _fn2 = _x[2];
        _fn2(name,course);
      
}
    */
    return fn;
  }

  content(taps) {
    let content = "";
    taps.forEach((tap, i) => {
      content += `
        var _fn${i} = _x[${i}];
        _fn${i}(${this.joinArgs()});
      `
    });
    return content;
  }
}

const syncHook = new SyncHook(["name", "course"]);
syncHook.tap("1", (name, course) => {
  console.log("syncHook 1", name, course);
  return 1;
});
syncHook.tap("2", (name, course) => {
  console.log("syncHook 2", name, course);
  return;
});
syncHook.tap("3", (name, course) => {
  console.log("syncHook 3", name, course);
  return 3;
});
syncHook.call("hxl", "tapable");

/*
输出：
syncHook 1 hxl tapable
syncHook 2 hxl tapable
syncHook 3 hxl tapable
*/