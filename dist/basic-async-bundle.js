(function (modules) { // webpackBootstrap
  // install a JSONP callback for chunk loading
  function webpackJsonpCallback(data) {
    // 代码块Id
    var chunkIds = data[0];
    // key-value,key为文件路径，value为执行函数，编译后的代码
    var moreModules = data[1];

    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      // 判断是否经过__webpack_require__.e处理过
      // installedChunks[chunkId] = [resolve,reject,promise];
      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      // 等待promise执行
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    // push到window["webpackJsonp"],同时触发push方法，往上追溯执行
    if (parentJsonpFunction) parentJsonpFunction(data);

    // 执行resolve
    while (resolves.length) {
      resolves.shift()();
    }
  };

  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  // 存放 已经加载过的 代码块,0表示已经加载过
  var installedChunks = {
    "async-import": 0
  };

  // script path function
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + ({}[chunkId] || chunkId) + ".bundle.js"
  }

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

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  // 返回promise
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    // JSONP chunk loading for javascript
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) { // 0 means "already installed".
      // a Promise means "currently loading".
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        // installedChunkData = [resolve, reject, promise];
        promises.push(installedChunkData[2] = promise);

        // start chunk loading
        // 给header加入script标签，下载js
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        // 暂时忽略
        // if (__webpack_require__.nc) {
        //   script.setAttribute("nonce", __webpack_require__.nc);
        // }
        script.src = jsonpScriptSrc(chunkId);

        // create error before stack unwound to get useful stacktrace later
        var error = new Error();
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              // 执行reject
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

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

  // on error function for async loading
  __webpack_require__.oe = function (err) { console.error(err); throw err; };

  // 全局对象window["webpackJsonp"]，用来存模块
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  // oldJsonpFunction绑定jsonpArray的push
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  // 替换数组方法
  jsonpArray.push = webpackJsonpCallback;
  // 浅拷贝
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) {
    // 合并window["webpackJsonp"]到modules，保证该modules拥有其他bundle文件的modules,避免重复加载
    webpackJsonpCallback(jsonpArray[i]);
  }
  var parentJsonpFunction = oldJsonpFunction;

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/async-import.js");

})
  /************************************************************************/
  ({
    "./src/async-import.js": (function (module, exports, __webpack_require__) {
      setTimeout(() => {
        __webpack_require__.e(0)
          .then(__webpack_require__.t.bind(null, "./src/export-commonjs.js", 7))
          .then((commonjs) => {
            console.log("===异步导出commonjs===", commonjs, commonjs.a, commonjs.b);
          });
      })
    })
  });