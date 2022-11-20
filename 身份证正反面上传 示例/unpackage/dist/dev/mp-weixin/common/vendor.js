(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__3109405",
    appName: "身份证正反面上传 示例",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.4",
    uniRuntimeVersion: "3.6.4",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__3109405",
      appName: "身份证正反面上传 示例",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"身份证正反面上传 示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 23:
/*!***********************************************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/身份证正反面上传 示例/components/Rboy-upload-sfz/file.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  // 正面图片
  obverse: "data:image/png;base64,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",
  // 反面图片
  reverse: "data:image/png;base64,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",
  del: "data:image/png;base64,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" };

/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"身份证正反面上传 示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"身份证正反面上传 示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"身份证正反面上传 示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"身份证正反面上传 示例","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!***********************************************************************!*\
  !*** C:/Users/will/Documents/GitHub/reference/身份证正反面上传 示例/pages.json ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map