function loader(source) {
  console.log("loader3");
  return source + "// loader3";
}

loader.pitch = function (remainingReq, previousReq, data) {
  console.log("===loader3 remainingReq", remainingReq);
  console.log("===loader3 previousReq", previousReq);
  console.log("===loader3 data", data);
}

module.exports = loader;