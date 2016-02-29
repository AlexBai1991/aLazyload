/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var ALazyload = (function (win, doc, undefined) {
	  /**
	    opts = {
	      element: '#wrapper',
	      itemClass: '.lazy-img',
	      dataSrc: 'data-img',
	      offset: 100
	    }
	  */
	  var slice = [].slice, WAIT_TIME = 200;
	  var extend = function (target, source, isOverwrite) {
	    isOverwrite = typeof isOverwrite == 'undefined' ? false : Boolean(isOverwrite);
	    for (var key in source) {
	      if (isOverwrite || !(key in target)) {
	        target[key] = source[key];
	      }
	    }
	    return target;
	  };
	  function _now() {
	    return +new Date();
	  }
	  var throttle = function (fn, wait) {
	    var timer = null, previous = 0, context, args, ret;
	    var later = function () {
	      previous = _now();
	      timer = null;
	      ret = fn.apply(context, args);
	      args = null;
	    };
	    return function (ctx) {
	      var now = _now();
	      context = ctx, args = slice.call(arguments, 1);
	      if (!previous) previous = now;
	      var remaining = wait - (now - previous);
	      if (remaining <= 0 || remaining > wait) {
	        timer && clearTimeout(timer);
	        timer = null;
	        previous = now;
	        ret = fn.apply(context, args);
	        args = null;
	      } else {
	        timer = setTimeout(later, remaining);
	      }
	    };
	  };
	  var Lazyload = function (element, opts) {
	    var len = slice.call(arguments, 1);
	    var defaultOpts = {
	      item: '.lazy-img',
	      dataSrc: 'data-img',
	      offset: 0
	    };
	    if (!len) {
	      if (typeof element !== 'object' || element === null) {
	        throw new Error('need opts arguments here.');
	      }
	      opts = element;
	      element = null;
	    }
	    this.opts = extend(opts, defaultOpts);
	    this.element = typeof (element = element || opts.element) === 'string' ? doc.querySelector(element) : element;
	    this.items = this.element.querySelectorAll(this.opts.itemClass);

	    // initial & bind event
	    this.init();
	  };
	  Lazyload.prototype = {
	    constructor: Lazyload,
	    init: function () {
	      var self = this;
	      // initial load images within viewport
	      this._loadImgsWithinView();
	      var optimizedLoadImgsWithinView = throttle(this._loadImgsWithinView, WAIT_TIME);
	      this._optimizedLoadImgsWithinView = function (e) {
	        optimizedLoadImgsWithinView.call(this, self);
	      };
	      // load images when scrolling into viewport
	      this._addScrollHandler();
	    },
	    _loadImgsWithinView: function () {
	      var offset = typeof (offset = this.opts.offset) !== 'number' ? parseInt(offset, 10) : offset;
	      var W = window.innerWidth || doc.documentElement.clientWidth,
	        H = window.innerHeight || doc.documentElement.clientHeight,
	        viewport = {
	          top: -offset,
	          left: -offset,
	          bottom: H + offset,
	          right: W + offset
	        };
	      this.items = slice.call(this.items);
	      var i = 0, len = this.items.length, imgRect, imgItem, isInViewport;
	      for (; i < len; i++) {
	        imgItem = this.items[i];
	        imgRect = imgItem.getBoundingClientRect();
	        isInViewport = (
	          imgRect.top <= viewport.bottom &&
	          imgRect.bottom >= viewport.top &&
	          imgRect.left <= viewport.right &&
	          imgRect.right >= viewport.left
	        );
	        console.log('isInViewport: ', isInViewport);
	        // load img within viewport
	        if (isInViewport) {
	          console.log('load img: ', imgItem);
	          this._loadImgItem(imgItem);
	          this.items.splice(i, 1);
	          i--;
	          len--;
	        }
	      }
	      if (len === 0) {
	        // remove scroll event handler
	        this._removeScrollHandler();
	      }
	    },
	    _loadImgItem: function (img) {
	      var dataSrc = this.opts.dataSrc,
	        imgSrc = img.getAttribute(dataSrc);
	      img.removeAttribute(dataSrc);
	      if (imgSrc) {
	        img.setAttribute('src', imgSrc);
	      }
	    },
	    _removeScrollHandler: function () {
	      doc.removeEventListener('scroll', this._optimizedLoadImgsWithinView);
	    },
	    _addScrollHandler: function () {
	      doc.addEventListener('scroll', this._optimizedLoadImgsWithinView);
	    }
	  };
	  return Lazyload;
	})(window, window.document, void 0);

	// cmd/window output
	if (typeof module === 'object' && module.exports) {
	  module.exports = ALazyload;
	} else {
	  window.ALazyload = ALazyload;
	}

/***/ }
/******/ ]);