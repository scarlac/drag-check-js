Drag Check JS
=================

Lightweight Vanilla JS library & jQuery plugin (~1.9 kB without gzip) for ticking multiple checkboxes by click-dragging over them. Huge time-saver for systems where you need to work with a lot of items at once.

Takes the pain out of working with long tables. Simply click-and-drag over the checkboxes you want to check and it's done! Check out the examples for a demo. Once you've worked this way you'll never want to go back.

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

Or CommonJS use
---------------
1&period; Install via NPM: `npm install --save drag-check-js`

2&period; Require the library:

    var DragCheck = require('dragcheck').DragCheck;
    
3&period; Start using it as shown in vanilla js step 2 above:
    
    new DragCheck({ checkboxes: Array.from(document.querySelectorAll('.my-table input[type=checkbox]')) });


Options:
------------

* `checkboxes` (default: [], type: `array`, **required** for non-jquery): Specify an array of checkboxes that should get drag-check behaviour. You may also specify non-checkbox elements but you'll want to write your own `setChecked` and `getChecked` functions and probably enable `clickToToggle` as well.
* `clickToToggle` (default: `false`): When `true`, checked state will toggle on a simple click. Checkboxes do this by default so it's mostly useful for custom elements (ie. when used in conjunction with `setChecked` and `getChecked`).
* `deferChangeTrigger` (default: `false`): When `true`, `onChange` events are postponed until user stops dragging. Useful if checking boxes have heavy or expensive updates attached to them and continuous onChange events could cause problems or slowdowns. See also: `onDragEnd`.
* `setChecked`(default: `undefined`, type: `function(element, state)`): Specify a function to set the state of a checkbox or element. First argument is the element that needs its state set, second argument is the state it should be set to (`true` or `false`). Default behaviour is to set the `checked` property which works for checkboxes.
* `getChecked`(default: `undefined`, type: `function(element)`): Specify a function that determines if an element or checkbox is checked. Default behaviour is to return `element.checked` which works for checkboxes.
* `onDragEnd` (default: `undefined`, type: `function(array)`): Specify a function to be called once the user stops dragging. First argument is the list of changed elements.
* `onChange` (default: `undefined`, type: `function(element)`): Callback for 'change' event. Default behaviour is to dispatch a 'change' event.


See a demo and more complex example here - view source:
https://www.seph.dk/dragcheck/examples/jquery/index.html

License
=======
Creative Commons, CC BY 4.0 (modification + commercial use is fine)
https://creativecommons.org/licenses/by/4.0/
