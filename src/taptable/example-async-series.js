const {
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require("tapable");

/* 
异步串行钩子，支持tap/tapAsync/tapPromise三种注册用法
tapAsync：回调函数里最后一个参数为cb(回调)函数，若没有执行cb函数，则停止执行后续监听函数
tapPromise：回调函数需返回一个promise
示例1输出结果:
asyncSeriesHook_ 1 hxl tapable
asyncSeriesHook_ 2 hxl tapable
asyncSeriesHook_ 3 hxl tapable
asyncSeriesHook_ done
asyncSeriesHook_: 9.074ms

示例2输出结果:
asyncSeriesHook_async 1 hxl tapable
asyncSeriesHook_async 2 hxl tapable
asyncSeriesHook_async 3 hxl tapable
asyncSeriesHook_async done 333
asyncSeriesHook_async: 619.787ms

示例3输出结果:
asyncSeriesHook_promise 1 hxl tapable
asyncSeriesHook_promise 2 hxl tapable
asyncSeriesHook_promise 3 hxl tapable
syncSeriesHook_promise done undefined
asyncSeriesHook_promise: 714.160ms
*/

// 示例1
console.time("asyncSeriesHook_")
const asyncSeriesHook_ = new AsyncSeriesHook(["name", "course"]);
asyncSeriesHook_.tap("1", (name, course) => {
  console.log("asyncSeriesHook_ 1", name, course);
});
asyncSeriesHook_.tap("2", (name, course) => {
  console.log("asyncSeriesHook_ 2", name, course);
});
asyncSeriesHook_.tap("3", (name, course, cb) => {
  console.log("asyncSeriesHook_ 3", name, course);
});
// asyncSeriesHook_.callAsync("hxl", "tapable", () => {
//   console.log("asyncSeriesHook_ done");
//   console.timeEnd("asyncSeriesHook_");
// });

// 示例2
console.time("asyncSeriesHook_async")
const asyncSeriesHook_async = new AsyncSeriesHook(["name", "course"]);
asyncSeriesHook_async.tapAsync("1", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesHook_async 1", name, course);
    callback();  // 不可传参
  }, 300);
});
asyncSeriesHook_async.tapAsync("2", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesHook_async 2", name, course);
    callback();  // 不可传参
  }, 200);
});
asyncSeriesHook_async.tapAsync("3", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesHook_async 3", name, course);
    callback(333);  // 若callAsync没有callback函数，则不能调用callback(333);
  }, 100);
});
// asyncSeriesHook_async.callAsync("hxl", "tapable", (res) => {
//   console.log("asyncSeriesHook_async done", res);
//   console.timeEnd("asyncSeriesHook_async");
// });

// 示例3
console.time("asyncSeriesHook_promise")
const asyncSeriesHook_promise = new AsyncSeriesHook(["name", "course"]);
asyncSeriesHook_promise.tapPromise("1", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesHook_promise 1", name, course);
      resolve();
    }, 300);
  });
});
asyncSeriesHook_promise.tapPromise("2", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesHook_promise 2", name, course);
      resolve();
    }, 200);
  });
});
asyncSeriesHook_promise.tapPromise("3", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesHook_promise 3", name, course);
      resolve(333);  // 不会传递参数
    }, 200);
  });
});
// asyncSeriesHook_promise.promise("hxl", "tapable").then((res) => {
//   console.log("asyncSeriesHook_promise done", res);
//   console.timeEnd("asyncSeriesHook_promise");
// });

/* 
异步串行保险钩子，支持tap/tapAsync/tapPromise三种注册用法,若不返回undefined，则结束事件
tapAsync：回调函数里最后一个参数为cb(回调)函数，若没有执行cb函数，则停止执行后续监听函数
tapPromise：回调函数需返回一个promise
示例1输出结果:
asyncSeriesBailHook_ 1 hxl tapable
asyncSeriesBailHook_ 2 hxl tapable
asyncSeriesBailHook_ done
asyncSeriesBailHook_: 8.784ms

示例2输出结果:
asyncSeriesBailHook_async 1 hxl tapable
asyncSeriesBailHook_async 2 hxl tapable
asyncSeriesBailHook_async done 222
asyncSeriesBailHook_async: 518.018ms

示例3输出结果:
asyncSeriesBailHook_promise 1 hxl tapable
asyncSeriesBailHook_promise 2 hxl tapable
asyncSeriesBailHook_promise done 222
asyncSeriesBailHook_promise: 516.907ms
*/
// 示例1
console.time("asyncSeriesBailHook_")
const asyncSeriesBailHook_ = new AsyncSeriesBailHook(["name", "course"]);
asyncSeriesBailHook_.tap("1", (name, course) => {
  console.log("asyncSeriesBailHook_ 1", name, course);
});
asyncSeriesBailHook_.tap("2", (name, course) => {
  console.log("asyncSeriesBailHook_ 2", name, course);
  return 2;
});
asyncSeriesBailHook_.tap("3", (name, course, cb) => {
  console.log("asyncSeriesBailHook_ 3", name, course);
});
// asyncSeriesBailHook_.callAsync("hxl", "tapable", () => {
//   console.log("asyncSeriesBailHook_ done");
//   console.timeEnd("asyncSeriesBailHook_");
// });

// 示例2
console.time("asyncSeriesBailHook_async")
const asyncSeriesBailHook_async = new AsyncSeriesBailHook(["name", "course"]);
asyncSeriesBailHook_async.tapAsync("1", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesBailHook_async 1", name, course);
    callback();
  }, 300);
});
asyncSeriesBailHook_async.tapAsync("2", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesBailHook_async 2", name, course);
    callback(222);  // 返回222，结束事件
  }, 200);
});
asyncSeriesBailHook_async.tapAsync("3", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesBailHook_async 3", name, course);
    callback();
  }, 100);
});
// asyncSeriesBailHook_async.callAsync("hxl", "tapable", (res) => {
//   console.log("asyncSeriesBailHook_async done", res);
//   console.timeEnd("asyncSeriesBailHook_async");
// });

// 示例3
console.time("asyncSeriesBailHook_promise")
const asyncSeriesBailHook_promise = new AsyncSeriesBailHook(["name", "course"]);
asyncSeriesBailHook_promise.tapPromise("1", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesBailHook_promise 1", name, course);
      resolve();
    }, 300);
  });
});
asyncSeriesBailHook_promise.tapPromise("2", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesBailHook_promise 2", name, course);
      resolve(222); // 返回222，结束事件
    }, 200);
  });
});
asyncSeriesBailHook_promise.tapPromise("3", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesBailHook_promise 3", name, course);
      resolve();
    }, 200);
  });
});
// asyncSeriesBailHook_promise.promise("hxl", "tapable").then((res) => {
//   console.log("asyncSeriesBailHook_promise done", res);
//   console.timeEnd("asyncSeriesBailHook_promise");
// });

/* 
异步串行瀑布流钩子，支持tap/tapAsync/tapPromise三种注册用法,只要监听函数中有返回值（除了undefined），该返回值会作为下一个监听函数的参数，下一监听函数没有返回值的话，返回值会层层传递
tapAsync：回调函数里最后一个参数为cb(回调)函数，若没有执行cb函数，则停止执行后续监听函数
tapPromise：回调函数需返回一个promise
示例1输出结果:
asyncSeriesWaterfallHook_ 1 hxl tapable
asyncSeriesWaterfallHook_ 2 hxl tapable
asyncSeriesWaterfallHook_ 3 2 tapable
asyncSeriesWaterfallHook_ done null
asyncSeriesWaterfallHook_: 9.613ms

示例2输出结果:
asyncSeriesWaterfallHook_async 1 hxl tapable
asyncSeriesWaterfallHook_async 2 hxl tapable
asyncSeriesWaterfallHook_async done 222
asyncSeriesWaterfallHook_async: 517.751ms

示例3输出结果:
asyncSeriesWaterfallHook_promise 1 hxl tapable
asyncSeriesWaterfallHook_promise 2 hxl tapable
asyncSeriesWaterfallHook_promise reject done 222
asyncSeriesWaterfallHook_promise: 519.157ms
*/
// 示例1
console.time("asyncSeriesWaterfallHook_")
const asyncSeriesWaterfallHook_ = new AsyncSeriesWaterfallHook(["name", "course"]);
asyncSeriesWaterfallHook_.tap("1", (name, course) => {
  console.log("asyncSeriesWaterfallHook_ 1", name, course);
});
asyncSeriesWaterfallHook_.tap("2", (name, course) => {
  console.log("asyncSeriesWaterfallHook_ 2", name, course);
  return 2;
});
asyncSeriesWaterfallHook_.tap("3", (name, course, cb) => {
  console.log("asyncSeriesWaterfallHook_ 3", name, course);
});
// asyncSeriesWaterfallHook_.callAsync("hxl", "tapable", (res) => {
//   console.log("asyncSeriesWaterfallHook_ done", res);
//   console.timeEnd("asyncSeriesWaterfallHook_");
// });

// 示例2
console.time("asyncSeriesWaterfallHook_async")
const asyncSeriesWaterfallHook_async = new AsyncSeriesWaterfallHook(["name", "course"]);
asyncSeriesWaterfallHook_async.tapAsync("1", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesWaterfallHook_async 1", name, course);
    callback();
  }, 300);
});
asyncSeriesWaterfallHook_async.tapAsync("2", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesWaterfallHook_async 2", name, course);
    callback(222);  // 返回222，结束事件
  }, 200);
});
asyncSeriesWaterfallHook_async.tapAsync("3", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncSeriesWaterfallHook_async 3", name, course);
    callback();
  }, 100);
});
// asyncSeriesWaterfallHook_async.callAsync("hxl", "tapable", (res) => {
//   console.log("asyncSeriesWaterfallHook_async done", res);
//   console.timeEnd("asyncSeriesWaterfallHook_async");
// });

// 示例3
console.time("asyncSeriesWaterfallHook_promise")
const asyncSeriesWaterfallHook_promise = new AsyncSeriesWaterfallHook(["name", "course"]);
asyncSeriesWaterfallHook_promise.tapPromise("1", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesWaterfallHook_promise 1", name, course);
      resolve();
    }, 300);
  });
});
asyncSeriesWaterfallHook_promise.tapPromise("2", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesWaterfallHook_promise 2", name, course);
      reject(222); // 返回222，若是resolve，不会结束事件，会将222作为下个监听函数的参数
    }, 200);
  });
});
asyncSeriesWaterfallHook_promise.tapPromise("3", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncSeriesWaterfallHook_promise 3", name, course);
      resolve();
    }, 200);
  });
});
asyncSeriesWaterfallHook_promise.promise("hxl", "tapable")
  .then((res) => {
    console.log("asyncSeriesWaterfallHook_promise resolve done", res);
    console.timeEnd("asyncSeriesWaterfallHook_promise");
  })
  .catch(e => {
    console.log("asyncSeriesWaterfallHook_promise reject done", e);
    console.timeEnd("asyncSeriesWaterfallHook_promise");
  })