var ALazyload = (function (win, doc, undefined) {
  /**
    opts = {
      element: '#wrapper',
      itemClass: '.lazy-img',
      dataSrc: 'data-img',
      offset: 100
    }
  */
  var slice = [].slice, WAIT_TIME = 30;
  var extend = function (target, source, isOverwrite) {
    isOverwrite = typeof isOverwrite == 'undefined' ? false : Boolean(isOverwrite);
    for (var key in source) {
      if (isOverwrite || !(key in target)) {
        target[key] = source[key];
      }
    }
    return target;
  };
  var debounce = function (fn, wait, immediate) {
    var timer = null;
    return function (context) {
      context = context || this,
      args = slice.call(arguments, 1);
      var callNow = immediate && !timer;
      if (callNow) {
        // handle immediate call fn
        fn.apply(context, args);
      } else {
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
          timer = null;
          fn.apply(context, args);
        }, wait);
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
      if (typeof element === 'string') {
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
      // load images when scrolling into viewport
      var optimizedLoadImgsWithinView = debounce(this._loadImgsWithinView, WAIT_TIME);
      doc.addEventListener('scroll', function (e) {
        optimizedLoadImgsWithinView(self);
      });
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
        console.log(isInViewport);
        // load img within viewport
        if (isInViewport) {
          console.log('load img: ', imgItem);
          this._loadImgItem(imgItem);
          this.items.splice(i, 1);
          i--;
          len--;
        }
      }
    },
    _loadImgItem: function (img) {
      var dataSrc = this.opts.dataSrc,
        imgSrc = img.getAttribute(dataSrc);
      img.removeAttribute(dataSrc);
      if (imgSrc) {
        img.setAttribute('src', imgSrc);
      }
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