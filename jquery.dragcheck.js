/* Click-and-drag checkbox state plugin (aka "painting").
 * Useful for lists where you user wants to select many intervals, but not entire table
 */
(function($) {
	$.fn.dragCheck = function() {
		// Remember the initial checkbox state
		window.dragCheck_state = null;
		// Remember the initial checkbox (since click-drag outside-release action will not check initial checkbox)
		window.dragCheck_origin = null;

		this.mousedown(function() {
			window.dragCheck_state = !this.checked;
			window.dragCheck_origin = this;
		}).mouseup(function() {
			window.dragCheck_state = null;
			window.dragCheck_origin = null;
		}).mouseenter(function(e) {
			// When dragging on a new checkbox, set it's state to the state of the initial checkbox
			// Also set the initial checkbox' state to ensure it's checked when user finishes dragging
			if(window.dragCheck_state !== null) {
				$(this).add(window.dragCheck_origin)
				.prop('checked', window.dragCheck_state)
				.trigger('change', e); // Force the event to trigger "change", so live feedback can be given
			}
		});

		// Mouse release should disable the functionality
		$(document.body).mouseup(function() { 
			window.dragCheck_state = null;
			window.dragCheck_origin = null;
		});
	}
})(jQuery);