var ALazyload = (function (win, doc, undefined) {
	var Lazyload = function (opts) {

	};
	Lazyload.prototype = {
		constructor: Lazyload,
		init: function () {

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