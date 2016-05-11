"use strict";

function DragCheck(options) {
	this.options = options || {};
	this.triggerChangeOnDragEnd = false;
	this.checkState = null;
	// Array passed is a shorthand for appling drag check to a list of checboxes
	this.selectionList = [];
	this.checkboxes = Array.isArray(options) ? options : options.checkboxes;

	this.attachEvents(this.checkboxes);

	// Mouse release should disable the functionality
	document.body.addEventListener('mouseup', this.dragEnd.bind(this));
}

DragCheck.prototype.attachEvents = function(checkboxes) { 
	checkboxes.forEach(function(item) {
		item.addEventListener('mousedown', this.mouseDown.bind(this, item));
		item.addEventListener('mouseup', this.dragEnd.bind(this, item));
		item.addEventListener('mouseenter', this.mouseEnter.bind(this, item));

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


DragCheck.prototype.mouseDown = function(element) {
	this.checkState = !this.getChecked(element);
	this.selectionList = [element];
};


DragCheck.prototype.dragEnd = function(element) {
	if(this.options.deferChangeTrigger) {
		this.selectionList.forEach(this.triggerChange.bind(this));
	}

	if(this.options.onDragEnd) {
		this.options.onDragEnd(this.selectionList);
	}

	this.checkState = null;
	this.selectionList = [];
};


DragCheck.prototype.triggerChange = function(item) {
	// TODO: Should we implement states comparison
	//       and only trigger change event in case of a real change?
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


DragCheck.prototype.mouseEnter = function(element) {
	if (this.checkState !== null) {
		// Dragging from 1st -> 2nd checkbox initiates drag-check
		// In which case we should retroactively check the 1st box
		if(this.selectionList.length === 1)
			this.setChecked(this.selectionList[0], this.checkState);

		this.selectionList.push(element);
		this.setChecked(element, this.checkState);
	}
};

exports.DragCheck = DragCheck;
