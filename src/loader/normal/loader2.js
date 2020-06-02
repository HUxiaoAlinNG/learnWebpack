function loader(source) {
  console.log("loader2");
  return source + "// loader2";
}

loader.pitch = function (remainingReq, previousReq, data) {
  console.log("===loader2 remainingReq", remainingReq);
  console.log("===loader2 previousReq", previousReq);
  console.log("===loader2 data", data);
}

module.exports = loader;