const {
  AsyncParallelHook,
  AsyncParallelBailHook,
} = require("tapable");

/* 
异步并行钩子，支持tap/tapAsync/tapPromise三种注册用法
tapAsync：回调函数里最后一个参数为cb(回调)函数，若没有执行cb函数，则停止执行后续监听函数
tapPromise：回调函数需返回一个promise
示例1输出结果:
asyncParallelHook_ 1 hxl tapable
asyncParallelHook_ 2 hxl tapable
asyncParallelHook_ 3 hxl tapable
asyncParallelHook_ done
asyncParallelHook_: 8.725ms

示例2输出结果:
asyncParallelHook_async 3 hxl tapable
asyncParallelHook_async 2 hxl tapable
asyncParallelHook_async done 222
asyncParallelHook_async: 213.272ms
asyncParallelHook_async 1 hxl tapable

示例3输出结果:
asyncParallelHook_promise 2 hxl tapable
asyncParallelHook_promise 3 hxl tapable
asyncParallelHook_promise 1 hxl tapable
asyncParallelHook_promise done undefined
asyncParallelHook_promise: 319.107ms
*/

// 示例1
console.time("asyncParallelHook_")
const asyncParallelHook_ = new AsyncParallelHook(["name", "course"]);
asyncParallelHook_.tap("1", (name, course) => {
  console.log("asyncParallelHook_ 1", name, course);
});
asyncParallelHook_.tap("2", (name, course) => {
  console.log("asyncParallelHook_ 2", name, course);
});
asyncParallelHook_.tap("3", (name, course, cb) => {
  console.log("asyncParallelHook_ 3", name, course);
});
// asyncParallelHook_.callAsync("hxl", "tapable", () => {
//   console.log("asyncParallelHook_ done");
//   console.timeEnd("asyncParallelHook_");
// });

// 示例2
console.time("asyncParallelHook_async")
const asyncParallelHook_async = new AsyncParallelHook(["name", "course"]);
asyncParallelHook_async.tapAsync("1", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncParallelHook_async 1", name, course);
    callback(null, 111);  // 第一个参数代表error，传null则表示没有错误
  }, 300);
});
asyncParallelHook_async.tapAsync("2", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncParallelHook_async 2", name, course);
    callback(222);  // 结束事件
  }, 200);
});
asyncParallelHook_async.tapAsync("3", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncParallelHook_async 3", name, course);
    callback();  // 若为callback(333),则停止事件
  }, 100);
});
// asyncParallelHook_async.callAsync("hxl", "tapable", (res) => {
//   console.log("asyncParallelHook_async done", res);
//   console.timeEnd("asyncParallelHook_async");
// });

// 示例3
console.time("asyncParallelHook_promise")
const asyncParallelHook_promise = new AsyncParallelHook(["name", "course"]);
asyncParallelHook_promise.tapPromise("1", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncParallelHook_promise 1", name, course);
      resolve();
    }, 300);
  });
});
asyncParallelHook_promise.tapPromise("2", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncParallelHook_promise 2", name, course);
      resolve();
    }, 200);
  });
});
asyncParallelHook_promise.tapPromise("3", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncParallelHook_promise 3", name, course);
      resolve(333);  // 不会传递参数
    }, 200);
  });
});
// asyncParallelHook_promise.promise("hxl", "tapable").then((res) => {
//   console.log("asyncParallelHook_promise done", res);
//   console.timeEnd("asyncParallelHook_promise");
// });

/* 
异步并行保险钩子，支持tap/tapAsync/tapPromise三种注册用法,若不返回undefined，则结束事件
tapAsync：回调函数里最后一个参数为cb(回调)函数，若没有执行cb函数，则停止执行后续监听函数
tapPromise：回调函数需返回一个promise
示例1输出结果:
asyncParallelBailHook_ 1 hxl tapable
asyncParallelBailHook_ 2 hxl tapable
asyncParallelBailHook_ done
asyncParallelBailHook_: 11.650ms

示例2输出结果:
asyncParallelBailHook_async 3 hxl tapable
asyncParallelBailHook_async 2 hxl tapable
asyncParallelBailHook_async 1 hxl tapable
asyncParallelBailHook_async done 222
asyncParallelBailHook_async: 309.031ms

示例3输出结果:
asyncParallelBailHook_promise 2 hxl tapable
asyncParallelBailHook_promise 3 hxl tapable
asyncParallelBailHook_promise 1 hxl tapable
asyncParallelBailHook_promise reject done 222
asyncParallelBailHook_promise: 306.581ms
*/
// 示例1
console.time("asyncParallelBailHook_")
const asyncParallelBailHook_ = new AsyncParallelBailHook(["name", "course"]);
asyncParallelBailHook_.tap("1", (name, course) => {
  console.log("asyncParallelBailHook_ 1", name, course);
});
asyncParallelBailHook_.tap("2", (name, course) => {
  console.log("asyncParallelBailHook_ 2", name, course);
  return 2;
});
asyncParallelBailHook_.tap("3", (name, course, cb) => {
  console.log("asyncParallelBailHook_ 3", name, course);
});
// asyncParallelBailHook_.callAsync("hxl", "tapable", () => {
//   console.log("asyncParallelBailHook_ done");
//   console.timeEnd("asyncParallelBailHook_");
// });

// 示例2
console.time("asyncParallelBailHook_async")
const asyncParallelBailHook_async = new AsyncParallelBailHook(["name", "course"]);
asyncParallelBailHook_async.tapAsync("1", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncParallelBailHook_async 1", name, course);
    callback();
  }, 300);
});
asyncParallelBailHook_async.tapAsync("2", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncParallelBailHook_async 2", name, course);
    callback(222);  // 返回222，结束事件
  }, 200);
});
asyncParallelBailHook_async.tapAsync("3", (name, course, callback) => {
  setTimeout(() => {
    console.log("asyncParallelBailHook_async 3", name, course);
    callback();
  }, 100);
});
// asyncParallelBailHook_async.callAsync("hxl", "tapable", (res) => {
//   console.log("asyncParallelBailHook_async done", res);
//   console.timeEnd("asyncParallelBailHook_async");
// });

// 示例3
console.time("asyncParallelBailHook_promise")
const asyncParallelBailHook_promise = new AsyncParallelBailHook(["name", "course"]);
asyncParallelBailHook_promise.tapPromise("1", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncParallelBailHook_promise 1", name, course);
      resolve();
    }, 300);
  });
});
asyncParallelBailHook_promise.tapPromise("2", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncParallelBailHook_promise 2", name, course);
      reject(222);
    }, 100);
  });
});
asyncParallelBailHook_promise.tapPromise("3", (name, course) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("asyncParallelBailHook_promise 3", name, course);
      resolve();
    }, 200);
  });
});
// asyncParallelBailHook_promise.promise("hxl", "tapable")
//   .then((res) => {
//     console.log("asyncParallelBailHook_promise resolve done", res);
//     console.timeEnd("asyncParallelBailHook_promise");
//   })
//   .catch((e) => {
//     console.log("asyncParallelBailHook_promise reject done", e);
//     console.timeEnd("asyncParallelBailHook_promise");
//   })

