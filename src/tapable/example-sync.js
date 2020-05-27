const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
} = require("tapable");

/* 
普通同步钩子，不关心监听函数的返回值
输出结果:
syncHook 1 hxl tapable
syncHook 2 hxl tapable
syncHook 3 hxl tapable
*/
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
// syncHook.call("hxl", "tapable");

/* 
保险同步钩子，只要监听函数中有返回值（除了undefined），结束事件
输出结果:
syncBailHook 1 hxl tapable
syncBailHook 2 hxl tapable
*/
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
// syncBailHook.call("hxl", "tapable");

/* 
瀑布流同步钩子，只要监听函数中有返回值（除了undefined），该返回值会作为下一个监听函数的参数，下一监听函数没有返回值的话，返回值会层层传递
输出结果:
syncWaterfallHook 1 hxl tapable
syncWaterfallHook 2 hxl tapable
syncWaterfallHook 3 2 tapable
syncWaterfallHook 4 2 tapable
*/
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
// syncWaterfallHook.call("hxl", "tapable");

/* 
循环同步钩子，不断循环执行直到监听函数的返回值不为undefined，且每次循环都是从头开始执行
输出结果:
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


