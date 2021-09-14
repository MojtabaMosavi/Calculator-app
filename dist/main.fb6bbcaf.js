// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/theme-menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuSwitch = /*#__PURE__*/function () {
  function MenuSwitch() {
    _classCallCheck(this, MenuSwitch);

    // dom caching 
    this._body = document.getElementsByTagName("body")[0];
    this._darkThemeBtn = this._body.querySelector(".toggle__menu-input--dark-theme");
    this._lightThemeBtn = this._body.querySelector(".toggle__menu-input--light-theme");
    this._violetThemeBtn = this._body.querySelector(".toggle__menu-input--violet-theme");
    this._toggleCircle = this._body.querySelector(".toggle__menu-circle"); // render 

    this.render();
  } // bindint events


  _createClass(MenuSwitch, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;

      // theming 
      this._darkThemeBtn.addEventListener("click", function () {
        _this.changeTheme("dark-theme");
      });

      this._lightThemeBtn.addEventListener("click", function () {
        _this.changeTheme("light-theme");
      });

      this._violetThemeBtn.addEventListener("click", function () {
        _this.changeTheme("violet-theme");
      });
    } // rendering 

  }, {
    key: "render",
    value: function render() {
      this.bindEvents();
      this.loadTheme();
      this.checkUserDefaultTheme();
    } // setting the theme accordingly to user preference

  }, {
    key: "loadTheme",
    value: function loadTheme() {
      var preferenceTheme = localStorage.getItem("preference-theme") || '';
      var theme = localStorage.getItem("theme") || "";
      preferenceTheme ? this.changeTheme(preferenceTheme) : "";
      theme ? this.changeTheme(theme) : "";
    }
    /**
     * prograssive enhancement 
     * adjusting the thme to user's system level theme setting
     */

  }, {
    key: "checkUserDefaultTheme",
    value: function checkUserDefaultTheme() {
      var lightTheme = window.matchMedia("preference-color-scheme:light;");
      localStorage.setItem("preference-theme", "light-theme");
    } // change theme and locate toggle correctly 

  }, {
    key: "changeTheme",
    value: function changeTheme(theme) {
      if (theme === "dark-theme") {
        this._body.classList = theme;
        this._toggleCircle.classList = "toggle__menu-circle";
        localStorage.setItem("theme", "dark-theme"); // updating state 

        this._darkThemeBtn.setAttribute("aria-checked", "true");

        this._lightThemeBtn.setAttribute("aria-checked", "false");

        this._violetThemeBtn.setAttribute("aria-checked", "false");
      } else if (theme === "light-theme") {
        this._body.classList = theme;
        this._toggleCircle.classList = "toggle__menu-circle toggle__menu-circle--light-theme";
        localStorage.setItem("theme", "light-theme");

        this._darkThemeBtn.setAttribute("aria-checked", "false");

        this._lightThemeBtn.setAttribute("aria-checked", "true");

        this._violetThemeBtn.setAttribute("aria-checked", "false");
      } else if (theme === "violet-theme") {
        this._body.classList = theme;
        this._toggleCircle.classList = "toggle__menu-circle toggle__menu-circle--violet-theme";
        localStorage.setItem("theme", "violet-theme");

        this._darkThemeBtn.setAttribute("aria-checked", "false");

        this._lightThemeBtn.setAttribute("aria-checked", "false");

        this._violetThemeBtn.setAttribute("aria-checked", "true");
      }
    }
  }]);

  return MenuSwitch;
}();

exports.default = MenuSwitch;
},{}],"js/calculator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    // dom caching 
    this._calculator = document.querySelector(".calculator");
    this._calculatorKeys = this._calculator.querySelectorAll(".calculator__keyboard-key");
    this._calculatorScreen = this._calculator.querySelector(".calculator__screen-input");
    this._calculatorDisplay = this._calculator.querySelector(".calculator__screen-display");
    this._firstOperand = "";
    this._secondOperand = "";
    this._operation;
    this._regex = /\d{1,20}$/; // rendering 

    this.render();
  } // event binding 


  _createClass(Calculator, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;

      // linking the keys to keyboard 
      document.addEventListener("keypress", function (event) {
        _this._calculatorKeys.forEach(function (key) {
          if (key.dataset.value === event.key) {
            key.classList.add("calculator__keyboard-key--active");
            setTimeout(function () {
              key.classList.remove("calculator__keyboard-key--active");
            }, 100);

            _this.runOperation(key.dataset.input, key.dataset.value);
          }
        });
      }); // responding to key inteaction 

      this._calculatorKeys.forEach(function (key) {
        key.addEventListener("click", function (event) {
          var keyInput = key.dataset.input;
          var keyValue = key.dataset.value;

          _this.runOperation(keyInput, keyValue);
        });
      });
    } // rendering 

  }, {
    key: "render",
    value: function render() {
      this.clearScreen();
      this.bindEvents();
    }
  }, {
    key: "runOperation",
    value: function runOperation() {
      var _this2 = this;

      var keyInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var keyValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      // if the keyInput is a operand 
      if (keyInput === "operand") {
        this._calculatorScreen.value += "".concat(keyValue); // if the keyInput is a operator
      } else if (keyInput === "operator") {
        var input = this._calculatorScreen.value; // validate input 

        if (this.validateInput(input)) {
          keyValue === "=" ? this.calculateResult() : this.startCalculation(input, keyValue);
        } else {
          // invalid input, notify the user and reset calculator
          var message = "Invalid input";
          this.outputErorrMessage(message);
          setTimeout(function () {
            _this2.resetCalculator();
          }, 2000);
        } // if the keyInput is a setting 

      } else if (keyInput === "setting") {
        if (keyValue === "reset") {
          this.resetCalculator();
        } else {
          this.clearScreen();
          this.updateDisplay();
        }
      } else {
        throw Error("Invalid operation".concat(keyInput));
      }
    }
  }, {
    key: "startCalculation",
    value: function startCalculation() {
      var operand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      this._firstOperand = parseFloat(operand);
      this._operation = operator;
      this.updateDisplay();
      this.clearScreen();
    }
  }, {
    key: "clearDisplay",
    value: function clearDisplay() {
      this._calculatorDisplay.textContent = "";
    } // reset the calculator 

  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      !content ? this._calculatorDisplay.textContent = "".concat(this._firstOperand, " ").concat(this._operation, " ").concat(this._secondOperand) : this._calculatorDisplay.textContent = content;
    }
  }, {
    key: "validateInput",
    value: function validateInput(input) {
      return this._regex.test(input) ? input : "";
    }
  }, {
    key: "resetCalculator",
    value: function resetCalculator() {
      this._firstOperand = "";
      this._secondOperand = "";
      this._operation = "";
      this.clearDisplay();
      this.clearScreen();
    } // completing calculation

  }, {
    key: "calculateResult",
    value: function calculateResult() {
      this._secondOperand = parseFloat(this._calculatorScreen.value);
      this.updateDisplay();
      this.clearScreen();
      var operationValue = eval("".concat(this._firstOperand, " ").concat(this._operation, " ").concat(this._secondOperand));
      this.setScreenValue(operationValue);
      this.resetSecondOperand();
    }
  }, {
    key: "outputErorrMessage",
    value: function outputErorrMessage() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "invalid input";
      this._calculatorScreen.value = "".concat(message);
    }
  }, {
    key: "resetFirstOperand",
    value: function resetFirstOperand() {
      this._firstOperand = "";
    }
  }, {
    key: "resetSecondOperand",
    value: function resetSecondOperand() {
      this._secondOperand = "";
    }
  }, {
    key: "setScreenValue",
    value: function setScreenValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      this._calculatorScreen.value += value;
    }
  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this._calculatorScreen.value = "";
    }
  }]);

  return Calculator;
}();

exports.default = Calculator;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _themeMenu = _interopRequireDefault(require("./theme-menu"));

var _calculator = _interopRequireDefault(require("./calculator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  document.addEventListener("DOMContentLoaded", function () {
    var Calculator1 = new _calculator.default();
    var MenuSwitch1 = new _themeMenu.default();
  });
}();
},{"./theme-menu":"js/theme-menu.js","./calculator":"js/calculator.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51355" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map