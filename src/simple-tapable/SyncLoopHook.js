const Hook = require("./Hook");

class SyncLoopHook extends Hook {
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
    
      var _loop;
        _loop = false;
    
        var _fn0 = _x[0];
        var _result0 = _fn0(name,course);
        if(_result0 !== undefined) {
        _loop = true;
        } else {
      
        var _fn1 = _x[1];
        var _result1 = _fn1(name,course);
        if(_result1 !== undefined) {
        _loop = true;
        } else {
      
        var _fn2 = _x[2];
        var _result2 = _fn2(name,course);
        if(_result2 !== undefined) {
        _loop = true;
        } else {
      
      if(!_loop) {
      }
    }}}
    
}
    */
    return fn;
  }

  content(taps) {
    let content = `
      var _loop;
      do {
        _loop = false;
    `;
    taps.forEach((tap, i) => {
      content += `
        var _fn${i} = _x[${i}];
        var _result${i} = _fn${i}(${this.joinArgs()});
        if(_result${i} !== undefined) {
        _loop = true;
        } else {
      `
    });
    content += `
      if(!_loop) {
      }
    `;
    content += "}".repeat(taps.length);
    content += `
      } while(_loop);
    `;
    return content;
  }
}

let count1 = 0;
let count2 = 0;
let count3 = 0
const syncLoopHook = new SyncLoopHook(["name", "course"]);
syncLoopHook.tap("1", (name, course) => {
  count1++;
  console.log("syncLoopHook 1", name, course, count1, count2, count3);
  if (count1 >= 1) {
    return;
  }
  return "loop";
});
syncLoopHook.tap("2", (name, course) => {
  count2++;
  console.log("syncLoopHook 2", name, course, count1, count2, count3);
  if (count2 >= 2) {
    return;
  }
  return "loop";
});
syncLoopHook.tap("3", (name, course) => {
  count3++;
  console.log("syncLoopHook 3", name, course, count1, count2, count3);
  if (count3 >= 3) {
    return;
  }
  return "loop";
});
syncLoopHook.call("hxl", "tapable");

/*
输出：
syncLoopHook 1 hxl tapable 1 0 0
syncLoopHook 2 hxl tapable 1 1 0
syncLoopHook 1 hxl tapable 2 1 0
syncLoopHook 2 hxl tapable 2 2 0
syncLoopHook 3 hxl tapable 2 2 1
syncLoopHook 1 hxl tapable 3 2 1
syncLoopHook 2 hxl tapable 3 3 1
syncLoopHook 3 hxl tapable 3 3 2
syncLoopHook 1 hxl tapable 4 3 2
syncLoopHook 2 hxl tapable 4 4 2
syncLoopHook 3 hxl tapable 4 4 3
*/