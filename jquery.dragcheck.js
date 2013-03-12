/**
* jQuery.DragCheck - Click-and-drag over checkboxes to change their state.
* Copyright (c) 2013 Seph Soliman - scarlac(at)gmail(dot)com | http://seph.dk
* @author Seph Soliman
* @version 1.1
*
* https://github.com/scarlac/jquery-drag-check
*/
(function($) {
	$.fn.dragCheck = function(options) {
		var settings = $.extend( {
			'deferChangeTrigger': false, // Should "change" be triggered WHILE user is drag-checking, or wait until user has released the mouse?
			'onDragEnd': undefined, // type: function. Instead of triggering change, what should happend when user releases cursor?
			'onChange': undefined  // type: function. instead of calling onChange on each checkbox, what callback should we use?
		}, options);

		// Remember the initial checkbox state
		window.dragCheck_state = window.dragCheck_state || null;
		// Remember the initial checkbox (since click-drag outside-release action will not check initial checkbox)
		window.dragCheck_origin = window.dragCheck_origin || null;
		window.dragCheck_items = window.dragCheck_items || [];

		var dragEnd = function() {
			if(window.dragCheck_state !== null) {
				window.dragCheck_state = null;
				window.dragCheck_origin = null;

				if(settings.onDragEnd) {
					settings.onDragEnd(window.dragCheck_items);
				} else {
					if(window.dragCheck_items.length > 0) {
						for(var i in window.dragCheck_items) {
							if(settings.onChange)
								settings.onChange.call(window.dragCheck_items[i]);
		 					else
		 						window.dragCheck_items[i].trigger('change');
						}
					}
				}

				window.dragCheck_items = [];
			}
		}

		this.mousedown(function() {
			window.dragCheck_state = !this.checked;
			window.dragCheck_origin = this;
		})
		.mouseup(dragEnd)
		.mouseenter(function(e) {
			// When dragging on a new checkbox, set it's state to the state of the initial checkbox
			// Also set the initial checkbox' state to ensure it's checked when user finishes dragging
			if(window.dragCheck_state !== null) {
				var item = $(this).add(window.dragCheck_origin).prop('checked', window.dragCheck_state);

				if(settings.deferChangeTrigger) {
					window.dragCheck_items.push(item);
				} else {
					if(settings.onChange)
						settings.onChange.call(item, e);
 					else
 						item.trigger('change', e); // Force the event to trigger "change", so live feedback can be given
 				}
			}
		});

		// Mouse release should disable the functionality
		$(document.body).mouseup(dragEnd);
	}
})(jQuery);