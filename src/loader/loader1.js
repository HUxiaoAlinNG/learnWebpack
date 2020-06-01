function loader(source) {
  console.log("loader1");
  return source + "// loader1";
}
/* 
@remainingReq:剩余的请求
@previousReq：以前的请求
@data: 当前loader的数据，与上面的loader函数共享数据
*/
loader.pitch = function (remainingReq, previousReq, data) {
  console.log("===loader1 remainingReq", remainingReq);
  console.log("===loader1 previousReq", previousReq);
  console.log("===loader1 data", data);
  return "loader1"
}

module.exports = loader;