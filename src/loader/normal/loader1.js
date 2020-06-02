function loader(source) {
  console.log("loader1");
  return source + "// loader1";
}

loader.pitch = function (remainingReq, previousReq, data) {
  console.log("===loader1 remainingReq", remainingReq);
  console.log("===loader1 previousReq", previousReq);
  console.log("===loader1 data", data);
}

module.exports = loader;