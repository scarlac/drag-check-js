var DragCheck = require('./dragcheck').DragCheck;

(function($) {
	$.fn.dragCheck = function (options) {
		options = options || {};
		options.checkboxes = $(this).toArray();
		return new DragCheck(options);
	}
})(window.jQuery);