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
