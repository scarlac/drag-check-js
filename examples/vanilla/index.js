// Classic table/convenience example
var tableCheckboxes = Array.from(document.querySelectorAll('.table-demo input'));

// Add an interesting effect to showcase when events are triggered
// Tip: Try setting 'deferChangeTrigger': true and see what happens
tableCheckboxes.forEach(function(item) {
    item.addEventListener('change', function(event) {
        event.target.parentNode.parentNode.style.backgroundColor = event.target.checked ? 'green' : '';
    });
});

new DragCheck({
    'checkboxes': tableCheckboxes,
    'deferChangeTrigger': false
});


// Drawing demo
var drawingCheckboxes = Array.from(document.querySelectorAll('.canvas-demo input'));

new DragCheck({
    'checkboxes': drawingCheckboxes,
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
