class Hook {
  constructor(args) {
    if (!Array.isArray(args)) {
      args = [];
    }
    this.x = undefined;
    this.taps = [];
    this.args = args;
  }

  tap(name, fn) {
    this.taps.push({
      name,
      fn,
    });
  }

  joinArgs() {
    return this.args.join(",");
  }

  header() {
    return `
      "use strict"
      var _context;
      var _x = this._x;
    `;
  }

  call(...args) {
    const callMethod = this._createCall();
    return callMethod.apply(this, args);
  }

  _createCall() {
    // 动态编译，在子类实现该方法
    return this.compile({
      taps: this.taps,
      args: this.args,
    })
  }
}

module.exports = Hook;