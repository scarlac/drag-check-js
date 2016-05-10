Drag Check JS
=================

Vanilla JS library & jQuery plugin for checking multiple checkboxes by click-dragging over them. Huge time-saver for system where you need to work with a lot of items at once. 

Takes the pain out of selecting multiple items. Simply click-and-drag over the checkboxes you want to check and it's done! Check out the examples for a demo.

jQuery plugin use
-----------------
1&period; Include jQuery and then the plugin in the `dist` folder like this:

    <script src="dist/jquery.dragcheck.js"></script>

2&period; Initialize DragCheck where you need it, on the checkboxes you want to be "drag-checkable" like this:

    $('.my-table :checkbox').dragCheck();

That's it. 

You can customize it further by specifying options to `.dragCheck(...)` as an object:

    $('.my-table :checkbox').dragCheck({
        onChange: function(element) {
            $(element).closest('tr').css('background-color', element.checked ? 'green' : '');
        }
    });

For simple checkboxes you could also just attach directly to the `change` event using `$(':checkbox').change(function() { ... }).dragCheck(...)`.

Or vanilla js library use
-----------------
1&period; Include the library in the `dist` folder like this:

    <script src="dist/dragcheck.js"></script>

2&period; Initialize DragCheck where you need it, on the checkboxes you want to be "drag-checkable" like this:

    new DragCheck({ checkboxes: Array.from(document.querySelectorAll('.my-table input[type=checkbox]')) });


Options:
------------

* `clickToToggle` (default: `false`): When `true`, checked state will toggle on a simple click. Checkboxes do this by default so it's mostly useful for custom elements (ie. when used in conjunction with `setChecked` and `getChecked`).
* `deferChangeTrigger` (default: `false`): When `true`, `onChange` events are postponed until user stops dragging. Useful if checking boxes have heavy or expensive updates attached to them and continuous onChange events could cause problems or slowdowns. See also: `onDragEnd`.
* `setChecked`(default: `undefined`, type: `function(element, state)`): Specify a function to set the state of a checkbox or element. First argument is the element that needs its state set, second argument is the state it should be set to (`true` or `false`).
* `getChecked`(default: `undefined`, type: `function(element)`): Specify a function that determines if an element or checkbox is checked. Default behaviour is to return `element.checked` which works for checkboxes.
* `onDragEnd` (default: `undefined`, type: `function(array)`): Specify a function to be called once the user stops dragging. First argument is the list of changed elements.
* `onChange` (default: `undefined`, type: `function(element)`): Override default change behaviour. Default behaviour is to set the `checked` property which works for checkboxes.
* `checkboxes` (default: [], type: `array`): Specify an array of checkboxes that should get drag-check behaviour. You may also specify non-checkbox elements but you'll want to write your own `setChecked` and `getChecked` functions and probably enable `clickToToggle` as well.


See a demo here:
https://www.seph.dk/dragcheck/examples/jquery/index.html
