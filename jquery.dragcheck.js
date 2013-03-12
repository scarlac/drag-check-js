/**
* jQuery.DragCheck - Click-and-drag over checkboxes to change their state.
* Copyright (c) 2013 Seph Soliman - scarlac(at)gmail(dot)com | http://seph.dk
* @author Seph Soliman
* @version 1.2
*
* https://github.com/scarlac/jquery-drag-check
*/
(function($) {
	var dragCheckClass = function(el, opts) {
		// Remember the initial checkbox state
		this.dragCheck_state = this.dragCheck_state || null;
		// Remember the initial checkbox (since click-drag outside-release action will not check initial checkbox)
		this.dragCheck_origin = this.dragCheck_origin || null;
		this.dragCheck_items = this.dragCheck_items || [];
		// Boolean indicating if onDragEnd should be called when user stops dragging
		this.dragCheck_triggerOnDragEnd = this.dragCheck_triggerOnDragEnd || false;
		this.opts = opts;

		this.dragEnd = function() {
			if(this.dragCheck_state !== null && this.dragCheck_triggerOnDragEnd) {
				this.dragCheck_items.push(this.dragCheck_origin);

				if(this.opts.onDragEnd) {
					this.opts.onDragEnd(this.dragCheck_items);
				} else {
					if(this.dragCheck_items.length > 0) {
						for(var i in this.dragCheck_items) {
							if(this.opts.onChange)
								this.opts.onChange.call(this.dragCheck_items[i]);
		 					else
		 						$(this.dragCheck_items[i]).trigger('change');
						}
					}
				}

				this.dragCheck_state = null;
				this.dragCheck_origin = null;
				this.dragCheck_triggerOnDragEnd = false;
				this.dragCheck_items = [];
			}
		}

		el.data('dragCheck', this)
		.mousedown(function() {
			var instance = $(this).data('dragCheck');
			instance.dragCheck_state = !this.checked;
			instance.dragCheck_origin = this;
		})
		.mouseup($.proxy(this.dragEnd, this))
		.mouseenter(function(e) {
			var instance = $(this).data('dragCheck');

			// When dragging on a new checkbox, set it's state to the state of the initial checkbox
			// Also set the initial checkbox' state to ensure it's checked when user finishes dragging
			if(instance.dragCheck_state !== null) {
				// onDragEnd should only trigger after 2nd checkbox has been changed
				instance.dragCheck_triggerOnDragEnd = true;

				instance.dragCheck_items.push(this);
				var item = $(this).add(instance.dragCheck_origin).prop('checked', instance.dragCheck_state);

				if(instance.opts.onChange) {
					instance.opts.onChange.call(instance.dragCheck_origin, e); // TODO: Only trigger change for origin box once
					instance.opts.onChange.call(this, e);
				} else {
					item.trigger('change', e); // Force the event to trigger "change", so live feedback can be given
				}
			}
		});

		// Mouse release should disable the functionality
		$(document.body).mouseup($.proxy(this.dragEnd, this));
	};

	$.fn.dragCheck = function (options) {
		var opts = $.extend({}, $.fn.dragCheck.defaults, options);
		return new dragCheckClass($(this), opts);
	}

	$.fn.dragCheck.defaults = {
		'deferChangeTrigger': false, // Should "change" be triggered WHILE user is drag-checking, or wait until user has released the mouse?
		'onDragEnd': undefined, // type: function. Instead of triggering change, what should happend when user releases cursor?
		'onChange': undefined  // type: function. instead of calling onChange on each checkbox, what callback should we use?
	};
})(jQuery);