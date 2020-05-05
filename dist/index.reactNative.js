(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flagship"] = factory();
	else
		root["flagship"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: useFsActivate, useFsModifications, useFsSynchronize, useFlagship, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @flagship.io/react-sdk */ "./node_modules/@flagship.io/react-sdk/dist/index.js");
/* harmony import */ var _flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFsActivate", function() { return _flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1__["useFsActivate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFsModifications", function() { return _flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1__["useFsModifications"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFsSynchronize", function() { return _flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1__["useFsSynchronize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFlagship", function() { return _flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1__["useFlagship"]; });

/* harmony import */ var _lib_FSTools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/FSTools */ "./lib/FSTools.js");
/* harmony import */ var _lib_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/ErrorBoundary */ "./lib/ErrorBoundary.js");





const FlagshipProvider = ({
  children,
  ...otherProps
}) => {
  const {
    visitorData,
    envId,
    config,
    onInitStart,
    onInitDone,
    onUpdate,
    onError,
    loadingComponent
  } = otherProps; /// Check the Envid

  if (!Object(_lib_FSTools__WEBPACK_IMPORTED_MODULE_2__["checkValidityPatternForEnvId"])(envId)) {
    console.log('Flagship sdk - The format of your EnvId is not valid');

    if (onError) {
      onError();
    }

    return /*#__PURE__*/!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createElement(_lib_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__["default"], null, children);
  }

  return /*#__PURE__*/!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createElement(_flagship_io_react_sdk__WEBPACK_IMPORTED_MODULE_1__["FlagshipProvider"], {
    envId: envId,
    config: config,
    onInitStart: () => {
      console.log('Flagship SDK : Starting ....');

      if (onInitStart) {
        onInitStart();
      }
    },
    onInitDone: () => {
      console.log('Flagship SDK : Init is Done');

      if (onInitDone) {
        onInitDone();
      }
    },
    onUpdate: onUpdate,
    visitorData: {
      /// Check the visitor id is null ?
      id: visitorData.id == null ? Object(_lib_FSTools__WEBPACK_IMPORTED_MODULE_2__["generateFlagshipId"])() : visitorData.id,
      context: visitorData.context
    },
    loadingComponent: loadingComponent
  }, children);
}; /// Activate


 /// Provider

/* harmony default export */ __webpack_exports__["default"] = (FlagshipProvider);

/***/ }),

/***/ "./lib/ErrorBoundary.js":
/*!******************************!*\
  !*** ./lib/ErrorBoundary.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ErrorBoundary; });
!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
 ///  ErrorBoundary ///

class ErrorBoundary extends !(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {// You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return /*#__PURE__*/!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createElement(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).Fragment, null, /*#__PURE__*/!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createElement(Text, null, "Something went wrong."), /*#__PURE__*/!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createElement(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).Fragment, null, this.props.children));
    }

    return this.props.children;
  }

}

/***/ }),

/***/ "./lib/FSTools.js":
/*!************************!*\
  !*** ./lib/FSTools.js ***!
  \************************/
/*! exports provided: generateFlagshipId, checkValidityPatternForEnvId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFlagshipId", function() { return generateFlagshipId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkValidityPatternForEnvId", function() { return checkValidityPatternForEnvId; });
const XidLength = 20;
const XidPattern = '[0-9a-v]{20}';
function generateFlagshipId() {
  const id = Math.floor(Math.random() * Date.now());
  console.log('Flagship SDK generated Visitor ID: ', id);
  return id.toString();
}
function checkValidityPatternForEnvId(envId) {
  /// Check pattren for envId (xid)
  return envId.length === XidLength && envId.match(XidPattern);
}

/***/ }),

/***/ "./node_modules/@flagship.io/js-sdk/dist/index.browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/@flagship.io/js-sdk/dist/index.browser.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "is-buffer");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/class/flagship/flagship.ts":
/*!****************************************!*\
  !*** ./src/class/flagship/flagship.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var loggerHelper_1 = __webpack_require__(/*! ../../lib/loggerHelper */ "./src/lib/loggerHelper.ts");
var flagshipSdkHelper_1 = __webpack_require__(/*! ../../lib/flagshipSdkHelper */ "./src/lib/flagshipSdkHelper.ts");
var flagshipVisitor_1 = __webpack_require__(/*! ../flagshipVisitor/flagshipVisitor */ "./src/class/flagshipVisitor/flagshipVisitor.ts");
var default_1 = __webpack_require__(/*! ../../config/default */ "./src/config/default.ts");
var Flagship = /** @class */ (function () {
    function Flagship(envId, config) {
        if (config === void 0) { config = {}; }
        var _a = flagshipSdkHelper_1.default.checkConfig(config), cleanCustomConfig = _a.cleanConfig, ignoredConfig = _a.ignoredConfig;
        this.config = __assign(__assign({}, default_1.default), cleanCustomConfig);
        this.log = loggerHelper_1.default.getLogger(this.config);
        this.envId = envId;
        if (cleanCustomConfig) {
            this.log.info('Custom flagship SDK config attribute(s) detected');
        }
        flagshipSdkHelper_1.default.logIgnoredAttributesFromObject(ignoredConfig, this.log, 'custom flagship SDK config');
    }
    Flagship.prototype.createVisitor = function (id, context) {
        return this.newVisitor(id, context);
    };
    // deprecated
    Flagship.prototype.newVisitor = function (id, context) {
        var _this = this;
        this.log.info("Creating new visitor (id=\"" + id + "\")");
        var flagshipVisitorInstance = new flagshipVisitor_1.default(this.envId, this.config, id, context);
        if (this.config.fetchNow || this.config.activateNow) {
            this.log.info("new visitor (id=\"" + id + "\") calling decision API for initialization (waiting to be ready...)");
            flagshipVisitorInstance.getAllModifications(this.config.activateNow)
                .then(function () {
                _this.log.info("new visitor (id=\"" + id + "\") decision API finished (ready !)");
                flagshipVisitorInstance.emit('ready');
            }).catch(function (response) {
                _this.log.fatal("new visitor (id=\"" + id + "\") decision API failed during initialization with error " + (response && ((response.data && response.data.toString()) || response.toString())));
                flagshipVisitorInstance.emit('ready');
            });
        }
        else {
            // Before emit('ready'), make sure there is listener to it
            flagshipVisitorInstance.once('newListener', function (event, listener) {
                if (event === 'ready') {
                    listener();
                }
            });
        }
        return flagshipVisitorInstance;
    };
    return Flagship;
}());
exports.default = Flagship;


/***/ }),

/***/ "./src/class/flagshipVisitor/flagshipVisitor.ts":
/*!******************************************************!*\
  !*** ./src/class/flagshipVisitor/flagshipVisitor.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
var events_1 = __webpack_require__(/*! events */ "events");
var loggerHelper_1 = __webpack_require__(/*! ../../lib/loggerHelper */ "./src/lib/loggerHelper.ts");
var flagshipSdkHelper_1 = __webpack_require__(/*! ../../lib/flagshipSdkHelper */ "./src/lib/flagshipSdkHelper.ts");
var FlagshipVisitor = /** @class */ (function (_super) {
    __extends(FlagshipVisitor, _super);
    function FlagshipVisitor(envId, config, id, context) {
        if (context === void 0) { context = {}; }
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.id = id;
        _this.log = loggerHelper_1.default.getLogger(_this.config, "visitorId:" + _this.id);
        _this.envId = envId;
        _this.context = _this.checkContext(context);
        _this.isAllModificationsFetched = false;
        _this.fetchedModifications = null;
        return _this;
    }
    FlagshipVisitor.prototype.checkContext = function (unknownContext) {
        var _this = this;
        var validContext = {};
        Object.entries(unknownContext).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (typeof value === 'object' && !Array.isArray(value)) {
                _this.log.warn("Context key \"" + key + "\" is type of \"" + typeof value + "\" which is not supported. This key will be ignored...");
            }
            else if (typeof value === 'object' && Array.isArray(value)) {
                var arrayLooksOkay_1 = true;
                // check there is no object inside the array
                value.forEach(function (element) {
                    if (typeof element === 'object') {
                        _this.log.warn("Context key \"" + key + "\" is type of \"Array<" + typeof element + ">\" which is not supported. This key will be ignored...");
                        arrayLooksOkay_1 = false;
                    }
                });
                if (arrayLooksOkay_1) {
                    validContext[key] = value;
                }
            }
            else {
                validContext[key] = value;
            }
        });
        return validContext;
    };
    FlagshipVisitor.prototype.activateCampaign = function (variationId, variationGroupId, customLogs) {
        var _this = this;
        return axios_1.default.post(this.config.flagshipApi + "activate", {
            vid: this.id,
            cid: this.envId,
            caid: variationId,
            vaid: variationGroupId,
        })
            .then(function (response) {
            var successLog = "VariationId \"" + variationId + "\" successfully activate with status code:" + response.status;
            if (customLogs && customLogs.success) {
                successLog = customLogs.success + "\nStatus code:" + response.status;
            }
            _this.log.debug(successLog);
        })
            .catch(function (error) {
            var failLog = "Trigger activate of variationId \"" + variationId + "\" failed with error:\n" + error;
            if (customLogs && customLogs.fail) {
                failLog = customLogs.fail + "\nFailed with error:\n" + error;
            }
            _this.log.fatal(failLog);
        });
    };
    // TODO: consider args "variationId" & "variationGroupId" and unit test them
    FlagshipVisitor.prototype.activateModifications = function (modifications) {
        var modificationsRequested = modifications.reduce(function (output, _a) {
            var key = _a.key;
            return __spreadArrays(output, [{ key: key, defaultValue: '', activate: true }]);
        }, []);
        if (this.fetchedModifications) {
            var detailsModifications = this.extractDesiredModifications(this.fetchedModifications, modificationsRequested).detailsModifications;
            this.triggerActivateIfNeeded(detailsModifications);
        }
    };
    FlagshipVisitor.prototype.triggerActivateIfNeeded = function (detailsModifications) {
        var _this = this;
        var campaignsActivated = [];
        Object.entries(detailsModifications).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value.isActivateNeeded) {
                if (campaignsActivated.includes(value.campaignId[0])) {
                    _this.log.debug("Skip trigger activate of \"" + key + "\" because the corresponding campaign already been triggered with another modification");
                }
                else {
                    campaignsActivated.push(value.campaignId[0]);
                    _this.activateCampaign(value.variationId[0], value.variationGroupId[0], {
                        success: "Modification key \"" + key + "\" successfully activate.",
                        fail: "Trigger activate of modification key \"" + key + "\" failed.",
                    });
                }
            }
        });
        // Logs unexpected behavior:
        var _a = this.checkCampaignsActivatedMultipleTimes(detailsModifications), activateKey = _a.activateKey, activateCampaign = _a.activateCampaign;
        Object.entries(activateKey).forEach(function (_a) {
            var key = _a[0], count = _a[1];
            if (count > 1) {
                _this.log.warn("Key \"" + key + "\" has been activated " + count + " times because it was in conflict in further campaigns (debug logs for more details)");
                _this.log.debug("Here the details:" + Object.entries(activateCampaign).map(function (_a) {
                    var campaignId = _a[0], _b = _a[1], directActivate = _b.directActivate, indirectActivate = _b.indirectActivate;
                    if (indirectActivate.includes(key)) {
                        return "\n- because key \"" + key + "\" is also include inside campaign id=\"" + campaignId + "\" where key(s) \"" + directActivate.map(function (item) { return item + " "; }) + "\" is/are also requested.";
                    }
                    return null;
                }));
            }
            else if (count !== 1) {
                _this.log.warn("Key \"" + key + "\" has unexpectedly been activated " + count + " times");
            }
            else {
                // everything good;
            }
        });
        // END of logs
    };
    FlagshipVisitor.prototype.checkCampaignsActivatedMultipleTimes = function (detailsModifications) {
        var _this = this;
        var output = { activateCampaign: {}, activateKey: {} };
        var requestedActivateKeys = Object.entries(detailsModifications).filter(function (_a) {
            var keyInfo = _a[1];
            return keyInfo.isActivateNeeded === true;
        });
        var extractModificationIndirectKeysFromCampaign = function (campaignId, directKey) {
            if (_this.fetchedModifications) {
                var campaignDataArray = _this.fetchedModifications.campaigns.filter(function (campaign) { return campaign.id === campaignId; });
                if (campaignDataArray.length === 1) {
                    return Object.keys(campaignDataArray[0].variation.modifications.value).filter(function (key) { return key !== directKey; });
                }
                _this.log.debug('extractModificationIndirectKeysFromCampaign: Error campaignDataArray.length has unexpectedly length bigger than 1');
                return [];
            }
            _this.log.debug('extractModificationIndirectKeysFromCampaign: Error this.fetchedModifications is empty');
            return [];
        };
        if (this.fetchedModifications) {
            requestedActivateKeys.forEach(function (_a) {
                var key = _a[0], keyInfos = _a[1];
                if (output.activateCampaign[keyInfos.campaignId[0]]) {
                    output.activateCampaign[keyInfos.campaignId[0]].directActivate.push(key);
                }
                else {
                    output.activateCampaign[keyInfos.campaignId[0]] = {
                        directActivate: [key],
                        indirectActivate: extractModificationIndirectKeysFromCampaign(keyInfos.campaignId[0], key),
                    };
                }
            });
            // then, clean indirect key which are also in direct
            Object.keys(output.activateCampaign).forEach(function (campaignId) {
                Object.values(output.activateCampaign[campaignId].directActivate).forEach(function (directKey) {
                    if (output.activateCampaign[campaignId].indirectActivate.includes(directKey)) {
                        output.activateCampaign[campaignId].indirectActivate.splice(output.activateCampaign[campaignId].indirectActivate.indexOf(directKey), 1);
                    }
                });
            });
            // then, fill "keyActivate"
            var extractNbTimesActivateCallForKey_1 = function (key) { return Object.values(output.activateCampaign).reduce(function (count, _a) {
                var directActivate = _a.directActivate, indirectActivate = _a.indirectActivate;
                return count + indirectActivate.filter(function (item) { return item === key; }).length + directActivate.filter(function (item) { return item === key; }).length;
            }, 0); };
            requestedActivateKeys.forEach(function (_a) {
                var key = _a[0];
                output.activateKey[key] = extractNbTimesActivateCallForKey_1(key);
            });
            // done
            return output;
        }
        this.log.debug('checkCampaignsActivatedMultipleTimes: Error this.fetchedModifications is empty');
        return output;
    };
    FlagshipVisitor.prototype.analyseModifications = function (_a, activate, modificationsRequested) {
        var campaigns = _a.campaigns;
        if (activate === void 0) { activate = false; }
        var detailsModifications = {};
        var mergedModifications = {};
        campaigns.forEach(function (campaign) {
            Object.entries(campaign.variation.modifications.value).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (mergedModifications[key]) {
                    // This modif already exist on a previous campaign
                    detailsModifications[key].value.push(value);
                    detailsModifications[key].type.push(campaign.variation.modifications.type);
                    detailsModifications[key].campaignId.push(campaign.id);
                    detailsModifications[key].variationId.push(campaign.variation.id);
                    detailsModifications[key].variationGroupId.push(campaign.variationGroupId);
                }
                else {
                    // New modif
                    mergedModifications[key] = value;
                    detailsModifications[key] = {
                        value: [value],
                        type: [campaign.variation.modifications.type],
                        campaignId: [campaign.id],
                        variationId: [campaign.variation.id],
                        variationGroupId: [campaign.variationGroupId],
                        isRequested: false,
                        isActivateNeeded: !!activate,
                    };
                    if (modificationsRequested) {
                        modificationsRequested.some(function (item) {
                            if (item.key === key) {
                                detailsModifications[key].isRequested = true;
                                if (!activate && !!item.activate) {
                                    detailsModifications[key].isActivateNeeded = item.activate;
                                }
                            }
                        });
                    }
                }
            });
            return null;
        });
        this.log.debug("detailsModifications:\n" + JSON.stringify(detailsModifications));
        return { detailsModifications: detailsModifications, mergedModifications: mergedModifications };
    };
    FlagshipVisitor.prototype.extractDesiredModifications = function (response, modificationsRequested, activateAllModifications) {
        var _this = this;
        if (activateAllModifications === void 0) { activateAllModifications = null; }
        var desiredModifications = {};
        // Extract all modifications from "normal" answer and put them in "mergedModifications" as "simple" mode would do but with additional info.
        var _a = this.analyseModifications(response, !!activateAllModifications, modificationsRequested), detailsModifications = _a.detailsModifications, mergedModifications = _a.mergedModifications;
        // Notify modifications which have campaign conflict
        Object.entries(detailsModifications).forEach(function (_a) {
            var key = _a[0];
            // log only if it's a requested keyw
            if (detailsModifications[key].value.length > 1 && detailsModifications.isRequested) {
                _this.log.warn("Modification \"" + key + "\" has further values because the modification is involved in campgains with:\nid=\"" + detailsModifications[key].campaignId.toString() + "\"\nModification value kept:\n" + key + "=\"" + detailsModifications[key].value[0] + "\"");
            }
        });
        // Check modifications requested (=modificationsRequested) match modifications fetched (=mergedModifications)
        modificationsRequested.forEach(function (modifRequested) {
            if (typeof mergedModifications[modifRequested.key] !== 'undefined'
                && mergedModifications[modifRequested.key] !== null) {
                desiredModifications[modifRequested.key] = mergedModifications[modifRequested.key];
            }
            else {
                var defaultValue = modifRequested.defaultValue;
                desiredModifications[modifRequested.key] = defaultValue;
                _this.log.debug("No value found for modification \"" + modifRequested.key + "\".\nSetting default value \"" + defaultValue + "\"");
                if (modifRequested.activate) {
                    _this.log.warn("Unable to activate modification \"" + modifRequested.key + "\" because it does not exist on any existing campaign...");
                }
            }
        });
        return { desiredModifications: desiredModifications, detailsModifications: detailsModifications };
    };
    FlagshipVisitor.prototype.getModificationsPostProcess = function (response, modificationsRequested, activateAllModifications) {
        if (activateAllModifications === void 0) { activateAllModifications = null; }
        var completeResponse = response;
        var responseData = completeResponse && completeResponse.data ? completeResponse.data : response;
        if (modificationsRequested && responseData && typeof responseData === 'object' && !Array.isArray(response)) {
            var _a = this.extractDesiredModifications(responseData, modificationsRequested, activateAllModifications), desiredModifications = _a.desiredModifications, detailsModifications = _a.detailsModifications;
            this.triggerActivateIfNeeded(detailsModifications);
            return (desiredModifications);
        }
        if (!modificationsRequested) {
            var errorMsg = 'No modificationsRequested specified...';
            this.log.error(errorMsg);
            return {};
        }
        this.log.warn('getModifications: no campaigns found...');
        return {};
    };
    FlagshipVisitor.prototype.getModifications = function (modificationsRequested, activateAllModifications) {
        if (activateAllModifications === void 0) { activateAllModifications = null; }
        return this.getModificationsCache(modificationsRequested, activateAllModifications);
    };
    // deprecated
    FlagshipVisitor.prototype.getModificationsCache = function (modificationsRequested, activateAllModifications) {
        if (activateAllModifications === void 0) { activateAllModifications = null; }
        if (!modificationsRequested) {
            this.log.error('getModificationsCache: No requested modifications defined...');
            return {};
        }
        if (!this.fetchedModifications) {
            this.log.warn('No modifications found in cache...');
            var desiredModifications = this.extractDesiredModifications({ visitorId: this.id, campaigns: [] }, modificationsRequested, activateAllModifications).desiredModifications;
            return desiredModifications;
        }
        var response = this.fetchAllModifications({ activate: !!activateAllModifications, loadFromCache: true });
        return this.getModificationsPostProcess(response, modificationsRequested, activateAllModifications);
    };
    // deprecated
    FlagshipVisitor.prototype.setContext = function (context) {
        this.context = context;
    };
    FlagshipVisitor.prototype.updateContext = function (context) {
        this.setContext(context);
    };
    FlagshipVisitor.prototype.synchronizeModifications = function (activate) {
        var _this = this;
        if (activate === void 0) { activate = false; }
        return new Promise(function (resolve, reject) {
            var fetchedModif = _this.fetchAllModifications({ activate: activate, force: true });
            fetchedModif.then(function (response) {
                var castResponse = response;
                _this.fetchedModifications = flagshipSdkHelper_1.default.checkDecisionApiResponseFormat(castResponse, _this.log);
                resolve(castResponse.status);
            })
                .catch(function (error) {
                _this.fetchedModifications = null;
                reject(error);
            });
        });
    };
    FlagshipVisitor.prototype.getModificationsForCampaign = function (campaignId, activate) {
        if (activate === void 0) { activate = false; }
        return this.fetchAllModifications({ activate: activate, campaignCustomID: campaignId });
    };
    FlagshipVisitor.prototype.getAllModifications = function (activate) {
        if (activate === void 0) { activate = false; }
        return this.fetchAllModifications({ activate: activate });
    };
    FlagshipVisitor.prototype.fetchAllModificationsPostProcess = function (response, _a) {
        var activate = _a.activate, campaignCustomID = _a.campaignCustomID;
        var completeResponse = response;
        var reshapeResponse = completeResponse.data ? completeResponse : { data: response };
        var responseData = completeResponse.data ? completeResponse.data : response;
        var output = { data: {} };
        var analysedModifications = {};
        var filteredCampaigns = [];
        // PART 1: Compute the data (if needed)
        if (responseData && responseData.campaigns) {
            if (campaignCustomID) {
                filteredCampaigns = responseData.campaigns.filter(function (item) { return item.id === campaignCustomID; });
                output = __assign(__assign({}, reshapeResponse), { data: {
                        visitorId: this.id,
                        campaigns: filteredCampaigns,
                    } });
            }
            else { // default behavior
                var detailsModifications = this.analyseModifications(responseData, !!activate).detailsModifications /* , mergedModifications */;
                analysedModifications = detailsModifications;
                output = __assign({}, reshapeResponse);
            }
        }
        else {
            var warningMsg = 'No modification(s) found';
            if (campaignCustomID) {
                warningMsg += " for campaignId=\"" + campaignCustomID + "\"";
                output = __assign(__assign({}, reshapeResponse), { data: { campaigns: [], visitorId: this.id } });
            }
            else {
                output = __assign({}, reshapeResponse);
            }
            this.log.warn(warningMsg);
        }
        // PART 2: Handle activate (if needed)
        if (activate) {
            if (filteredCampaigns.length > 0) {
                this.activateCampaign(filteredCampaigns[0].variation.id, filteredCampaigns[0].variationGroupId);
            }
            else {
                this.triggerActivateIfNeeded(analysedModifications);
            }
        }
        // PART 3: Return the data
        return output;
    };
    FlagshipVisitor.prototype.saveModificationsInCache = function (data) {
        var _this = this;
        var haveBeenCalled = false;
        var callback = function (arg) {
            if (arg === void 0) { arg = data; }
            haveBeenCalled = true;
            _this.fetchedModifications = arg;
        };
        this.emit('saveCache', {
            saveInCacheModifications: callback,
            modifications: {
                before: this.fetchedModifications,
                after: data,
            },
        });
        // if callback not used, do default behavior
        if (!haveBeenCalled) {
            this.fetchedModifications = data;
        }
        this.log.debug("Saving in cache those modifications:\n" + (this.fetchedModifications ? JSON.stringify(this.fetchedModifications) : 'null'));
    };
    FlagshipVisitor.prototype.fetchAllModifications = function (args) {
        var _this = this;
        var defaultArgs = {
            activate: false,
            campaignCustomID: null,
            force: false,
            loadFromCache: false,
        };
        var _a = __assign(__assign({}, defaultArgs), args), activate = _a.activate, force = _a.force, loadFromCache = _a.loadFromCache;
        var url = "" + this.config.flagshipApi + this.envId + "/campaigns?mode=normal";
        // check if need to return without promise
        if (loadFromCache) {
            if (this.fetchedModifications && !force) {
                this.log.debug('fetchAllModifications: loadFromCache enabled');
                return this.fetchAllModificationsPostProcess(this.fetchedModifications, __assign(__assign({}, defaultArgs), args)).data;
            }
            this.log.fatal('fetchAllModifications: loadFromCache enabled but no data in cache. Make sure you fetched at least once before.');
            return this.fetchedModifications;
        }
        // default: return a promise
        return new Promise(function (resolve, reject) {
            if (_this.fetchedModifications && !force) {
                _this.log.info('fetchAllModifications: no calls to the Decision API because it has already been fetched before');
                resolve(_this.fetchAllModificationsPostProcess(_this.fetchedModifications, __assign(__assign({}, defaultArgs), args)));
            }
            else {
                axios_1.default.post(url, {
                    visitor_id: _this.id,
                    trigger_hit: activate,
                    context: _this.context,
                })
                    .then(function (response) {
                    _this.saveModificationsInCache(response.data);
                    resolve(_this.fetchAllModificationsPostProcess(response, __assign(__assign({}, defaultArgs), args)));
                })
                    .catch(function (response) {
                    _this.saveModificationsInCache(null);
                    _this.log.fatal('fetchAllModifications: an error occurred while fetching...');
                    if (activate) {
                        _this.log.fatal('fetchAllModifications: activate canceled due to errors...');
                    }
                    reject(response);
                });
            }
        });
    };
    FlagshipVisitor.prototype.generateCustomTypeParamsOf = function (hitData) {
        var optionalAttributes = {};
        switch (hitData.type.toUpperCase()) {
            case 'SCREEN': {
                var _a = hitData.data, documentLocation = _a.documentLocation, pageTitle = _a.pageTitle;
                if (!documentLocation || !pageTitle) {
                    if (!documentLocation)
                        this.log.error('sendHits(Screen): failed because attribute "documentLocation" is missing...');
                    if (!pageTitle)
                        this.log.error('sendHits(Screen): failed because attribute "pageTitle" is missing...');
                    return null;
                }
                return {
                    t: 'SCREENVIEW',
                    dl: documentLocation,
                    pt: pageTitle,
                };
            }
            case 'TRANSACTION': {
                var _b = hitData.data, documentLocation = _b.documentLocation, pageTitle = _b.pageTitle, transactionId = _b.transactionId, affiliation = _b.affiliation, totalRevenue = _b.totalRevenue, shippingCost = _b.shippingCost, taxes = _b.taxes, currency = _b.currency, couponCode = _b.couponCode, paymentMethod = _b.paymentMethod, shippingMethod = _b.shippingMethod, itemCount = _b.itemCount;
                if (totalRevenue) {
                    optionalAttributes.tr = totalRevenue;
                }
                if (shippingCost) {
                    optionalAttributes.ts = shippingCost;
                }
                if (taxes) {
                    optionalAttributes.tt = taxes;
                }
                if (currency) {
                    optionalAttributes.tc = currency;
                }
                if (couponCode) {
                    optionalAttributes.tcc = couponCode;
                }
                if (paymentMethod) {
                    optionalAttributes.pm = paymentMethod;
                }
                if (shippingMethod) {
                    optionalAttributes.sm = shippingMethod;
                }
                if (itemCount) {
                    optionalAttributes.icn = itemCount;
                }
                if (documentLocation) {
                    optionalAttributes.dl = documentLocation;
                }
                if (pageTitle) {
                    optionalAttributes.pt = pageTitle;
                }
                if (!transactionId || !affiliation) {
                    if (!transactionId)
                        this.log.error('sendHits(Transaction): failed because attribute "transactionId" is missing...');
                    if (!affiliation)
                        this.log.error('sendHits(Transaction): failed because attribute "affiliation" is missing...');
                    return null;
                }
                return __assign({ t: 'TRANSACTION', tid: transactionId, ta: affiliation }, optionalAttributes);
            }
            case 'ITEM': {
                var _c = hitData.data, transactionId = _c.transactionId, name_1 = _c.name, documentLocation = _c.documentLocation, pageTitle = _c.pageTitle, price = _c.price, code = _c.code, category = _c.category, quantity = _c.quantity;
                if (category) {
                    optionalAttributes.iv = category;
                }
                if (code) {
                    optionalAttributes.ic = code;
                }
                if (quantity) {
                    optionalAttributes.iq = quantity;
                }
                if (price) {
                    optionalAttributes.ip = price;
                }
                if (documentLocation) {
                    optionalAttributes.dl = documentLocation;
                }
                if (pageTitle) {
                    optionalAttributes.pt = pageTitle;
                }
                if (!transactionId || !name_1) {
                    if (!transactionId)
                        this.log.error('sendHits(Item): failed because attribute "transactionId" is missing...');
                    if (!name_1)
                        this.log.error('sendHits(Item): failed because attribute "name" is missing...');
                    return null;
                }
                return __assign({ t: 'ITEM', tid: transactionId, in: name_1 }, optionalAttributes);
            }
            case 'EVENT': {
                var _d = hitData.data, label = _d.label, value = _d.value, documentLocation = _d.documentLocation, category = _d.category, pageTitle = _d.pageTitle, action = _d.action;
                if (label) {
                    optionalAttributes.el = label;
                }
                if (value) {
                    optionalAttributes.ev = value;
                }
                if (documentLocation) {
                    optionalAttributes.dl = documentLocation;
                }
                if (pageTitle) {
                    optionalAttributes.pt = pageTitle;
                }
                if (!category || !action) {
                    this.log.debug("sendHits(Event) this hits is missing attributes:\n" + JSON.stringify(hitData));
                    if (!category)
                        this.log.error('sendHits(Event): failed because attribute "category" is missing...');
                    if (!action)
                        this.log.error('sendHits(Event): failed because attribute "action" is missing...');
                    return null;
                }
                return __assign({ t: 'EVENT', ea: action, ec: category }, optionalAttributes);
            }
            default:
                this.log.error("sendHits: no type found for hit:\n" + JSON.stringify(hitData));
                return null;
        }
    };
    FlagshipVisitor.prototype.sendHits = function (hitsArray) {
        var _this = this;
        var payloads = [];
        var url = 'https://ariane.abtasty.com';
        return new Promise(function (resolve, reject) {
            try {
                var promises = Promise.all(hitsArray.map(function (hit) { return __awaiter(_this, void 0, void 0, function () {
                    var customParams, payload;
                    return __generator(this, function (_a) {
                        customParams = this.generateCustomTypeParamsOf(hit);
                        if (customParams) {
                            payload = __assign({ vid: this.id, cid: this.envId, ds: 'APP' }, customParams);
                            payloads.push(payload);
                            return [2 /*return*/, axios_1.default.post(url, payload)];
                        }
                        this.log.debug("sendHits: skip request to \"" + url + "\" because current hit not set correctly");
                        return [2 /*return*/, new Promise(function (resolveAuto) { return resolveAuto(); })]; // do nothing
                    });
                }); }));
                promises.then(function () {
                    _this.log.info('sendHits: success');
                    _this.log.debug("sendHits: with url " + url);
                    _this.log.debug("sendHits: with payload:\n" + payloads.map(function (p) { return JSON.stringify(p) + "\n"; }));
                    resolve();
                }).catch(function (error) {
                    _this.log.fatal('sendHits: fail');
                    reject(error);
                });
            }
            catch (error) {
                _this.log.fatal('sendHits: fail');
                reject(error);
            }
        });
    };
    FlagshipVisitor.prototype.sendHit = function (hitData) {
        return this.sendHits([hitData]);
    };
    return FlagshipVisitor;
}(events_1.EventEmitter));
exports.default = FlagshipVisitor;


/***/ }),

/***/ "./src/config/default.ts":
/*!*******************************!*\
  !*** ./src/config/default.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaultConfig = {
    fetchNow: false,
    activateNow: false,
    logPathName: 'flagshipNodeSdkLogs',
    enableConsoleLogs: false,
    nodeEnv: 'production',
    flagshipApi: 'https://decision-api.flagship.io/v1/',
};
exports.default = defaultConfig;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var flagship_1 = __webpack_require__(/*! ./class/flagship/flagship */ "./src/class/flagship/flagship.ts");
exports.flagship = {
    initSdk: function (envId, config) { return new flagship_1.default(envId, config); },
    start: function (envId, config) { return new flagship_1.default(envId, config); },
};
exports.default = exports.flagship;


/***/ }),

/***/ "./src/lib/flagshipSdkHelper.ts":
/*!**************************************!*\
  !*** ./src/lib/flagshipSdkHelper.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = __webpack_require__(/*! ../config/default */ "./src/config/default.ts");
var flagshipSdkHelper = {
    logIgnoredAttributesFromObject: function (obj, log, objectName) {
        if (objectName === void 0) { objectName = ''; }
        var hasDirtyValues = false;
        Object.entries(obj).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            hasDirtyValues = true;
            log.warn("Unknown key \"" + key + "\" detected (with value=\"" + value + "\"). This key has been ignored... - " + objectName);
        });
        if (!hasDirtyValues) {
            log.debug("No unknown key detected :) - " + objectName);
        }
    },
    checkConfig: function (unknownConfig) {
        var cleanObject = {};
        var dirtyObject = {};
        var validAttributesList = [];
        Object.entries(default_1.default).forEach(function (_a) {
            var key = _a[0];
            return validAttributesList.push(key);
        });
        Object.entries(unknownConfig).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (validAttributesList.includes(key)) {
                cleanObject[key] = value;
            }
            else {
                dirtyObject[key] = value;
            }
        });
        return { cleanConfig: __assign({}, cleanObject), ignoredConfig: __assign({}, dirtyObject) };
    },
    checkDecisionApiResponseFormat: function (response, log) {
        if (!response.status || !response.data || !response.data.campaigns) {
            log.warn('Unknow Decision Api response received or error happened'); // TODO: can be improved according status value
            return null;
        }
        return response.data;
    },
};
exports.default = flagshipSdkHelper;


/***/ }),

/***/ "./src/lib/loggerHelper.ts":
/*!*********************************!*\
  !*** ./src/lib/loggerHelper.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/*
Available logs:
    - debug()
    - info()
    - warn()
    - error()
    - fatal()
*/
var loggerHelper = {
    getLogger: function (config, name) {
        if (name === void 0) { name = 'Flagship SDK'; }
        var enableConsoleLogs = config.enableConsoleLogs;
        var timestamp = "[" + new Date().toISOString().slice(11, -5) + "] - ";
        return {
            warn: function (str) { return (enableConsoleLogs ? console.warn("" + timestamp + name + " - " + str) : null); },
            error: function (str) { return (enableConsoleLogs ? console.error("" + timestamp + name + " - " + str) : null); },
            info: function (str) { return (enableConsoleLogs ? console.log("" + timestamp + name + " - " + str) : null); },
            fatal: function (str) { return (enableConsoleLogs ? console.error("" + timestamp + name + " - Fatal: " + str) : null); },
            debug: function (str) { return (config.nodeEnv !== 'production' && enableConsoleLogs ? console.log("" + timestamp + name + " - Debug: " + str) : null); },
        };
    },
};
exports.default = loggerHelper;


/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __webpack_require__(/*! events */ "./node_modules/events/events.js");

/***/ }),

/***/ "is-buffer":
/*!****************************!*\
  !*** external "is-buffer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.browser.js.map

/***/ }),

/***/ "./node_modules/@flagship.io/react-sdk/dist/FlagshipContext.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@flagship.io/react-sdk/dist/FlagshipContext.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var js_sdk_1 = __importDefault(__webpack_require__(/*! @flagship.io/js-sdk */ "./node_modules/@flagship.io/js-sdk/dist/index.browser.js"));
var FlagshipErrorBoundary_1 = __importDefault(__webpack_require__(/*! ./FlagshipErrorBoundary */ "./node_modules/@flagship.io/react-sdk/dist/FlagshipErrorBoundary.js"));
var loggerHelper_1 = __importDefault(__webpack_require__(/*! ./lib/loggerHelper */ "./node_modules/@flagship.io/react-sdk/dist/lib/loggerHelper.js"));
exports.initState = {
    fsVisitor: null,
    log: null,
    fsModifications: null,
    status: {
        isLoading: true,
        firstInitSuccess: null,
        lastRefresh: null,
        hasError: false
    }
};
var FlagshipContext = react_1.default.createContext({ state: __assign({}, exports.initState), setState: null, hasError: false });
exports.FlagshipProvider = function (_a) {
    var children = _a.children, envId = _a.envId, config = _a.config, visitorData = _a.visitorData, loadingComponent = _a.loadingComponent, initialModifications = _a.initialModifications, onSavingModificationsInCache = _a.onSavingModificationsInCache, onInitStart = _a.onInitStart, onInitDone = _a.onInitDone, onUpdate = _a.onUpdate;
    var id = visitorData.id, context = visitorData.context;
    var _b = react_1.useState(__assign(__assign({}, exports.initState), { log: loggerHelper_1.default.getLogger(config) })), state = _b[0], setState = _b[1];
    var _c = react_1.useState({ hasError: false, error: null }), errorData = _c[0], setError = _c[1];
    var _d = state.status, isLoading = _d.isLoading, firstInitSuccess = _d.firstInitSuccess, fsVisitor = state.fsVisitor;
    var tryCatchCallback = function (callback) {
        try {
            callback();
        }
        catch (error) {
            setError({ error: error, hasError: true });
        }
    };
    react_1.useEffect(function () {
        var fsSdk = js_sdk_1.default.start(envId, config);
        var visitorInstance = fsSdk.createVisitor(id, context);
        setState(__assign(__assign({}, state), { status: __assign(__assign({}, state.status), { isLoading: true }), fsVisitor: visitorInstance }));
        if (initialModifications) {
            visitorInstance.fetchedModifications = {
                visitorId: id,
                campaigns: __spreadArrays(initialModifications)
            };
            if (onUpdate) {
                tryCatchCallback(function () {
                    onUpdate({
                        fsModifications: __spreadArrays(initialModifications)
                    }, visitorInstance);
                });
            }
        }
        if (onInitStart) {
            tryCatchCallback(onInitStart);
        }
        visitorInstance.on('saveCache', function (args) {
            if (onSavingModificationsInCache) {
                tryCatchCallback(function () { return onSavingModificationsInCache(args); });
            }
        });
        visitorInstance.on('ready', function () {
            setState(__assign(__assign({}, state), { status: __assign(__assign({}, state.status), { isLoading: false, lastRefresh: new Date().toISOString(), firstInitSuccess: state.status.firstInitSuccess ||
                        new Date().toISOString() }), fsVisitor: visitorInstance, fsModifications: (visitorInstance.fetchedModifications &&
                    visitorInstance.fetchedModifications.campaigns) ||
                    null }));
            if (onInitDone) {
                tryCatchCallback(onInitDone);
            }
        });
    }, [envId, id, JSON.stringify(config) + JSON.stringify(context)]);
    react_1.useEffect(function () {
        if (!isLoading) {
            if (onUpdate) {
                tryCatchCallback(function () {
                    onUpdate({
                        fsModifications: state.fsModifications
                    }, state.fsVisitor);
                });
            }
        }
    }, [state]);
    var handleDisplay = function () {
        var isFirstInit = !fsVisitor || !firstInitSuccess;
        if (isLoading && loadingComponent && isFirstInit) {
            return react_1.default.createElement(react_1.default.Fragment, null, loadingComponent);
        }
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    };
    var handleError = function (error) {
        setError({ error: error, hasError: !!error });
    };
    return (react_1.default.createElement(FlagshipContext.Provider, { value: { state: state, setState: setState, hasError: errorData.hasError } },
        react_1.default.createElement(FlagshipErrorBoundary_1.default, { customerChildren: children, onError: handleError, error: errorData.error, sdkSettings: config, log: state.log }, handleDisplay())));
};
exports.FlagshipProvider.defaultProps = {
    config: {
        enableErrorLayout: false
    },
    loadingComponent: undefined,
    initialModifications: undefined,
    onInitStart: function () {
    },
    onInitDone: function () {
    },
    onSavingModificationsInCache: function () {
    },
    onUpdate: function () {
    }
};
exports.FlagshipConsumer = FlagshipContext.Consumer;
exports.default = FlagshipContext;
exports.useFlagshipContext = function () { return react_1.useContext(FlagshipContext); };
//# sourceMappingURL=FlagshipContext.js.map

/***/ }),

/***/ "./node_modules/@flagship.io/react-sdk/dist/FlagshipErrorBoundary.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@flagship.io/react-sdk/dist/FlagshipErrorBoundary.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
var btnStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    border: '1px solid transparent',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: 1.5,
    borderRadius: '0.25rem',
    marginLeft: '16px',
    transition: "background-color 0.15s ease-in-out,\n        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
};
var FlagshipErrorBoundary = (function (_super) {
    __extends(FlagshipErrorBoundary, _super);
    function FlagshipErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            error: _this.props.error,
            errorInfo: null,
            isCollapse: false
        };
        return _this;
    }
    FlagshipErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.props.log.fatal("An error occurred. The SDK is switching into safe mode:\n" + error.stack);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    };
    FlagshipErrorBoundary.getDerivedStateFromError = function (error) {
        return {
            error: error
        };
    };
    FlagshipErrorBoundary.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.error !== prevState.error) {
            this.props.onError(this.state.error);
        }
        if (this.props.error !== prevProps.error) {
            this.props.log.fatal("An error occurred. The SDK is switching into safe mode:\n" + this.props.error.stack);
        }
    };
    FlagshipErrorBoundary.prototype.render = function () {
        var _this = this;
        var _a = this.state, error = _a.error, isCollapse = _a.isCollapse;
        var _b = this.props, children = _b.children, customerChildren = _b.customerChildren, errorProp = _b.error, _c = _b.sdkSettings, nodeEnv = _c.nodeEnv, enableErrorLayout = _c.enableErrorLayout;
        if (errorProp || error) {
            var errorCopy = errorProp || error;
            return (react_1.default.createElement(react_1.default.Fragment, null,
                nodeEnv !== 'production' && enableErrorLayout && (react_1.default.createElement("div", { className: "fsErrorDebugContainer", style: {
                        backgroundColor: 'red',
                        minHeight: '6vh',
                        position: 'fixed',
                        zIndex: 9999,
                        bottom: 0,
                        width: '100%',
                        opacity: isCollapse ? 1 : 0.4,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0px 16px',
                        transition: 'opacity 0.5s ease-in-out'
                    } },
                    react_1.default.createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: '8px',
                            marginTop: '8px'
                        } },
                        react_1.default.createElement("h3", { style: { color: 'white' } }, "Flagship React SDK has crashed."),
                        react_1.default.createElement("button", { style: __assign({}, btnStyle), onClick: function () {
                                _this.setState(__assign(__assign({}, _this.state), { isCollapse: !isCollapse }));
                            } }, isCollapse
                            ? 'Hide details'
                            : 'Show details')),
                    errorCopy && (react_1.default.createElement("div", { style: {
                            maxHeight: isCollapse ? 200 : 0,
                            overflow: 'auto',
                            color: 'wheat',
                            whiteSpace: 'pre-line',
                            transition: 'max-height 0.5s ease-in-out'
                        } }, "" + errorCopy.stack)))),
                react_1.default.createElement("div", { id: "flagshipSafeModeContainer" }, customerChildren)));
        }
        return children;
    };
    return FlagshipErrorBoundary;
}(react_1.default.Component));
exports.default = FlagshipErrorBoundary;
//# sourceMappingURL=FlagshipErrorBoundary.js.map

/***/ }),

/***/ "./node_modules/@flagship.io/react-sdk/dist/FlagshipHooks.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@flagship.io/react-sdk/dist/FlagshipHooks.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'react'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var FlagshipContext_1 = __importDefault(__webpack_require__(/*! ./FlagshipContext */ "./node_modules/@flagship.io/react-sdk/dist/FlagshipContext.js"));
var reportNoVisitor = function (log) {
    if (log) {
        log.error('sdk not correctly initialized... Make sure fsVisitor is ready.');
    }
};
var safeModeLog = function (log, functionName) {
    if (log) {
        log.error(functionName + " is disabled because the SDK is in safe mode.");
    }
};
exports.useFsActivate = function (modificationKeys, applyEffectScope) {
    if (applyEffectScope === void 0) { applyEffectScope = []; }
    var _a = react_1.useContext(FlagshipContext_1.default), state = _a.state, hasError = _a.hasError;
    react_1.useEffect(function () {
        var fsVisitor = state.fsVisitor;
        if (hasError) {
            return safeModeLog(state.log, 'UseFsActivate');
        }
        if (!fsVisitor) {
            reportNoVisitor(state.log);
        }
        else {
            fsVisitor.activateModifications(modificationKeys.map(function (key) { return ({ key: key }); }));
        }
        return undefined;
    }, applyEffectScope);
};
exports.useFsSynchronize = function (applyEffectScope, activateAllModifications) {
    if (applyEffectScope === void 0) { applyEffectScope = []; }
    if (activateAllModifications === void 0) { activateAllModifications = false; }
    var _a = react_1.useContext(FlagshipContext_1.default), state = _a.state, setState = _a.setState, hasError = _a.hasError;
    react_1.useEffect(function () {
        var fsVisitor = state.fsVisitor;
        if (hasError) {
            return safeModeLog(state.log, 'UseFsSynchronize');
        }
        if (!fsVisitor) {
            reportNoVisitor(state.log);
        }
        else {
            fsVisitor
                .synchronizeModifications(activateAllModifications)
                .then(function () {
                if (setState) {
                    setState(__assign(__assign({}, state), { fsVisitor: fsVisitor, status: __assign(__assign({}, state.status), { isLoading: false, lastRefresh: new Date().toISOString() }) }));
                }
                else {
                    throw new Error('Error: useFsSynchronize > useEffect, setState is undefined');
                }
            });
        }
        return undefined;
    }, applyEffectScope);
};
var safeMode_getCacheModifications = function (modificationsRequested, activateAllModifications) {
    if (activateAllModifications === void 0) { activateAllModifications = false; }
    return modificationsRequested.reduce(function (reducer, modifRequested) {
        var newReducer = __assign({}, reducer);
        newReducer[modifRequested.key] = modifRequested.defaultValue;
        return newReducer;
    }, {});
};
var getCacheModifications = function (fsVisitor, modificationsRequested, activateAllModifications, log) {
    if (activateAllModifications === void 0) { activateAllModifications = false; }
    if (!fsVisitor) {
        if (log) {
            log.warn('fsVisitor not initialized, returns default value');
        }
        return safeMode_getCacheModifications(modificationsRequested, activateAllModifications);
    }
    return fsVisitor.getModifications(modificationsRequested, activateAllModifications);
};
exports.useFsModifications = function (modificationsRequested, activateAllModifications) {
    if (activateAllModifications === void 0) { activateAllModifications = false; }
    var _a = react_1.useContext(FlagshipContext_1.default), _b = _a.state, fsVisitor = _b.fsVisitor, log = _b.log, hasError = _a.hasError;
    if (hasError) {
        return safeMode_getCacheModifications(modificationsRequested, activateAllModifications);
    }
    return getCacheModifications(fsVisitor, modificationsRequested, activateAllModifications, log);
};
exports.useFlagship = function (options) {
    var computedOptions = options
        ? options
        : {
            modifications: { requested: [], activateAll: false }
        };
    var _a = computedOptions.modifications, modificationsRequested = _a.requested, _b = _a.activateAll, activateAllModifications = _b === void 0 ? false : _b;
    var _c = react_1.useContext(FlagshipContext_1.default), hasError = _c.hasError, _d = _c.state, fsVisitor = _d.fsVisitor, status = _d.status, log = _d.log;
    if (hasError) {
        return {
            modifications: safeMode_getCacheModifications(modificationsRequested, activateAllModifications),
            status: status,
            hit: {
                send: function () {
                    safeModeLog(log, 'send hit');
                },
                sendMultiple: function () {
                    safeModeLog(log, 'send multiple hits');
                }
            }
        };
    }
    var logSdkNotReady = function () {
        if (log) {
            log.error('SDK not ready yet.');
        }
    };
    var send = function (hit) {
        if (fsVisitor && fsVisitor.sendHit) {
            fsVisitor.sendHit(hit);
        }
        else {
            logSdkNotReady();
        }
    };
    var sendMultiple = function (hits) {
        if (fsVisitor && fsVisitor.sendHits) {
            fsVisitor.sendHits(hits);
        }
        else {
            logSdkNotReady();
        }
    };
    send.bind(fsVisitor);
    sendMultiple.bind(fsVisitor);
    return {
        modifications: getCacheModifications(fsVisitor, modificationsRequested, activateAllModifications, log),
        status: status,
        hit: {
            send: send,
            sendMultiple: sendMultiple
        }
    };
};
//# sourceMappingURL=FlagshipHooks.js.map

/***/ }),

/***/ "./node_modules/@flagship.io/react-sdk/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@flagship.io/react-sdk/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./FlagshipContext */ "./node_modules/@flagship.io/react-sdk/dist/FlagshipContext.js"));
__export(__webpack_require__(/*! ./FlagshipHooks */ "./node_modules/@flagship.io/react-sdk/dist/FlagshipHooks.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@flagship.io/react-sdk/dist/lib/loggerHelper.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@flagship.io/react-sdk/dist/lib/loggerHelper.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var loggerHelper = {
    getLogger: function (config, name) {
        if (config === void 0) { config = { enableConsoleLogs: false, nodeEnv: 'unknown' }; }
        if (name === void 0) { name = 'Flagship React SDK'; }
        var enableConsoleLogs = config.enableConsoleLogs;
        var timestamp = "[" + new Date().toISOString().slice(11, -5) + "] - ";
        return {
            warn: function (str) {
                return enableConsoleLogs
                    ? console.warn("" + timestamp + name + " - " + str)
                    : null;
            },
            error: function (str) {
                return enableConsoleLogs
                    ? console.error("" + timestamp + name + " - " + str)
                    : null;
            },
            info: function (str) {
                return enableConsoleLogs
                    ? console.log("" + timestamp + name + " - " + str)
                    : null;
            },
            fatal: function (str) {
                return enableConsoleLogs
                    ? console.error("" + timestamp + name + " - Fatal: " + str)
                    : null;
            },
            debug: function (str) {
                return config.nodeEnv !== 'production' && enableConsoleLogs
                    ? console.log("" + timestamp + name + " - Debug: " + str)
                    : null;
            }
        };
    }
};
exports.default = loggerHelper;
//# sourceMappingURL=loggerHelper.js.map

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.reactNative.js.map