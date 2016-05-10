// Classic table/convenience example
$('.table-demo td')
.change(function(event) {
	// Add an interesting effect to showcase when events are triggered
	// Tip: Try setting 'deferChangeTrigger': true and see what happens
	var input = $(this).parent().find('input');
	$(this).parent().find('td').css('background-color', input.prop('checked') ? 'green' : '');
}).dragCheck({
	'deferChangeTrigger': false,
	'setChecked': function(el, state) { $(el).parent().find('input').prop('checked', state); },
	'getChecked': function(el) { return $(el).parent().find('input').prop('checked'); },
	'clickToToggle': true
});


// Drawing demo
$('.canvas-demo input').dragCheck({
	'deferChangeTrigger': false,
	'onChange': function(element) {
		element.style.transform = 'scale(2)';
	},
	'onDragEnd': function(items) {
		items.forEach(function(item, index) {
			setTimeout(function() {
				item.style.transform = ''
			}, index * 10);
		});
	}
});
