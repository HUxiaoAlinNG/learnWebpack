## 同步加载

#### 打包文件分析[basic-sync-bundle.js](../dist/basic-sync-bundle.js)
```js
(function (modules) {
  // The module cache
  var installedModules = {};
  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,   // 存放 模块id
      l: false,      // 是否已经加载
      exports: {}    // 存放 导出内容
    };
    // Execute the module function
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__,
    );
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  // 存放整个模块对象
  __webpack_require__.m = modules;

  // expose the module cache
  // 存放 加载过的模块
  __webpack_require__.c = installedModules;

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  // 为ES6导出模块增加__esModule属性(为了区分commonjs导出模块)
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  // 采用二进制，目的为 减少内存
  __webpack_require__.t = function (value, mode) {
    // 判断二进制第一位是否为1，如0001,为true，value为模块id，直接用__webpack_require__加载
    if (mode & 1) value = __webpack_require__(value);
    // 判断二进制第四位是否为1，如1000
    if (mode & 8) return value;
    // 判断二进制第三位是否为1，如0100，为true，表示已经是命名空间(__esModule=true)，直接返回值
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    // 定义命名空间ns
    var ns = Object.create(null);
    // 增加__esModule属性
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    // 判断二进制第二位是否为1，如0010，为true，将所有属性定义到ns上
    if (mode & 2 && typeof value != 'string') {
      for (var key in value) {
        __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
      }
    }
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  // 获取默认导出
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  /********************************传入解析后的对象****************************************/
  ({
    // key:文件路径 value:执行函数
    "./src/index.js":
      (function (module, exports) {
        console.log(1)
      })
  });
```

#### webpack.config.js
```js
const path = require("path");
module.exports = {
  entry: {
    // commonJS加载commonJS模块
    "import-commonjs-commonjs": "./src/import-commonjs-commonjs.js",
    // commonJS加载ES6模块
    "import-commonjs-es6": "./src/import-commonjs-es6.js",
    // ES6加载ES6模块
    "import-es6-es6": "./src/import-es6-es6.js",
    // ES6加载commonJS模块
    "import-es6-commonjs": "./src/import-es6-commonjs.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
  },
  mode: "development"
}
```

### 4种加载方式

#### 1.commonJS加载commonJS模块
##### 1.1 [import-commonjs-commonjs.js](../src/import-commonjs-commonjs.js)
```js
const commonjs = require("./export-commonjs");
// 输出 {a: "commonjs_a", b: "commonjs_b"} commonjs_a commonjs_b
console.log("===commonjs导出commonjs===", commonjs, commonjs.a, commonjs.b); 
```
##### 1.2 [export-commonjs.js](../src/export-commonjs.js)
```js
exports.a = "commonjs_a";
exports.b = "commonjs_b";
```
##### 1.3 [bundle.js](../dist/import-commonjs-commonjs.bundle.js)
```js
// 只展示编译后的参数(经过处理)
{
 "./src/export-commonjs.js":(function(module, exports) {
    exports.a = "commonjs_a";
    exports.b = "commonjs_b";
  }),
"./src/import-commonjs-commonjs.js":(function(module, exports, __webpack_require__) {
    const commonjs = __webpack_require__("./src/export-commonjs.js");
    console.log("===commonjs导出commonjs===", commonjs, commonjs.a, commonjs.b);
  })
}
```

#### 2.commonJS加载ES6模块
##### 2.1 [import-commonjs-es6.js](../src/import-commonjs-es6.js)
```js
const es6 = require("./export-es6");
// 输出 Module:{ b: "es6_b", default: "es6_a", Symbol(Symbol.toStringTag): "Module" ,__esModule: true } undefined es6_b
console.log("===commonjs导出es6===", es6, es6.a, es6.b);
```
##### 2.2 [export-es6.js](../src/export-es6.js)
```js
const a = "es6_a";
export default a;
export const b = "es6_b";
```
##### 2.3 [bundle.js](../dist/import-commonjs-es6.bundle.js)
```js
// 只展示编译后的参数(经过处理)
{
  "./src/export-es6.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "b", function() { return b; });
    const a = "es6_a";
    __webpack_exports__["default"] = (a);
    const b = "es6_b";
  }),
  "./src/import-commonjs-es6.js": (function(module, exports, __webpack_require__) {
  const es6 = __webpack_require__("./src/export-es6.js");
  console.log("===commonjs导出es6===", es6, es6.a, es6.b);
  })
}
```

#### 3.ES6加载ES6模块
##### 3.1 [import-es6-es6.js](../src/import-es6-es6.js)
```js
import a, { b } from "./export-es6";
console.log("===es6导出es6===", a, b);
```
##### 3.2 [export-es6.js](../src/export-es6.js)
```js
const a = "es6_a";
export default a;
export const b = "es6_b";
```
##### 3.3 [bundle.js](../dist/import-es6-es6.bundle.js)
```js
// 只展示编译后的参数(经过处理)
{
  "./src/export-es6.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "b", function() { return b; });
    const a = "es6_a";
    __webpack_exports__["default"] = (a);
    const b = "es6_b";
  }),
  "./src/import-es6-es6.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    _export_es6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/export-es6.js");
    console.log("===es6导出es6===", _export_es6__WEBPACK_IMPORTED_MODULE_0__["default"], _export_es6__WEBPACK_IMPORTED_MODULE_0__["b"]);
  })
}
```

#### 4.ES6加载commonJS模块
##### 4.1 [import-es6-commonjs.js](../src/import-es6-commonjs.js)
```js
import commonjs from "./export-commonjs";
console.log("===es6导出commonjs===", commonjs, commonjs.a, commonjs.b); 
```
##### 4.2 [export-commonjs.js](../src/export-commonjs.js)
```js
exports.a = "commonjs_a";
exports.b = "commonjs_b";
```
##### 4.3 [bundle.js](../dist/import-es6-commonjs.bundle.js)
```js
// 只展示编译后的参数(经过处理)
{
  "./src/export-commonjs.js": (function(module, exports) {
    exports.a = "commonjs_a";
    exports.b = "commonjs_b";
  }),
  "./src/import-es6-commonjs.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__);
    var _export_commonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/export-commonjs.js");
    var _export_commonjs__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_export_commonjs__WEBPACK_IMPORTED_MODULE_0__);
    console.log("===es6导出commonjs===", _export_commonjs__WEBPACK_IMPORTED_MODULE_0___default.a, _export_commonjs__WEBPACK_IMPORTED_MODULE_0___default.a.a, _export_commonjs__WEBPACK_IMPORTED_MODULE_0___default.a.b); 
  })
}
```



