"use strict";

function DragCheck(options) {
	this.options = options || {};
	this.triggerChangeOnDragEnd = false;
	this.checkState = null;
	// Array passed is a shorthand for appling drag check to a list of checboxes
	this.selectionList = Array.isArray(options) ? options : [];

	// Constructor {{{
	// Should "change" be triggered WHILE user is drag-checking, or wait until user has released the mouse?
	if(this.options.checkboxes !== undefined)
		this.selectionList = this.options.checkboxes;

	this.attachEvents(this.selectionList);

	// Mouse release should disable the functionality
	document.body.addEventListener('mouseup', this.dragEnd.bind(this));
	// }}}
}

DragCheck.prototype.attachEvents = function(checkboxes) { 
	checkboxes.forEach(function(item) {
		item.addEventListener('mousedown', this.mouseDown.bind(this));
		item.addEventListener('mouseup', this.dragEnd.bind(this));
		item.addEventListener('mouseenter', this.mouseEnter.bind(this));

		// For custom (non-checkbox) elements there is no concept of switching state on click
		// So provide an easy onclick-toggle feature by setting clickToToggle: true
		if(this.options.clickToToggle) {
			item.addEventListener('click', function(event) {
				var flippedState = !this.getChecked(item);
				this.setChecked(item, flippedState);
			}.bind(this));
		}
	}, this);
};


DragCheck.prototype.mouseDown = function(event) {
	this.checkState = !this.getChecked(event.target);
	this.selectionList = [event.target];
};


DragCheck.prototype.dragEnd = function(event) {
	if(this.options.deferChangeTrigger) {
		this.selectionList.forEach(this.triggerChange);
	}

	if(this.options.onDragEnd) {
		this.options.onDragEnd(this.selectionList);
	}

	this.checkState = null;
	this.selectionList = [];
};


DragCheck.prototype.triggerChange = function(item) {
	if(this.options.onChange !== undefined)
		this.options.onChange(item);
	else
		item.dispatchEvent(new Event('change')); // Force the event to trigger "change", so live feedback can be given
};


// Default to checkboxes which have a 'checked' property.
// Can be customized to work with table cells or other custom elements
DragCheck.prototype.setChecked = function(item, state) {
	if(this.options.setChecked) {
		this.options.setChecked(item, state);
	} else {
		item.checked = state;
	}

	// Unless requested, we dispatch an 'onchange' event
	// now that we've changed the element
	if(!this.options.deferChangeTrigger)
		this.triggerChange(item);
}


DragCheck.prototype.getChecked = function(item) {
	return this.options.getChecked ? this.options.getChecked(item) : item.checked;
}


DragCheck.prototype.mouseEnter = function(event) {
	if (this.checkState !== null) {
		this.selectionList.push(event.target);
		
		this.selectionList.forEach(function(item) {
			// Set checked state of checkbox (or custom element)
			this.setChecked(item, this.checkState);
		}, this);
	}
};

exports.DragCheck = DragCheck;
