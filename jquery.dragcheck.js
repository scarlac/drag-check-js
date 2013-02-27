/* Click-and-drag checkbox state plugin (aka "painting").
 * Useful for lists where you user wants to select many intervals, but not entire table
 */
(function($) {
	$.fn.checkDrag = function() {
		// Remember the initial checkbox state
		window.checkDrag_state = null;
		// Remember the initial checkbox (since click-drag outside-release action will not check initial checkbox)
		window.checkDrag_origin = null;

		this.mousedown(function() {
			window.checkDrag_state = !this.checked;
			window.checkDrag_origin = this;
		}).mouseup(function() {
			window.checkDrag_state = null;
			window.checkDrag_origin = null;
		}).mouseenter(function(e) {
			// When dragging on a new checkbox, set it's state to the state of the initial checkbox
			// Also set the initial checkbox' state to ensure it's checked when user finishes dragging
			if(window.checkDrag_state !== null) {
				$(this).add(window.checkDrag_origin)
				.prop('checked', window.checkDrag_state)
				.trigger('change', e); // Force the event to trigger "change", so live feedback can be given
			}
		});

		// Mouse release should disable the functionality
		$(document.body).mouseup(function() { 
			window.checkDrag_state = null;
			window.checkDrag_origin = null;
		});
	}
})(jQuery);