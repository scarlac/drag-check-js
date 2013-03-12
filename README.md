jquery-drag-check
=================

jQuery plugin for checking multiple checkboxes by click-dragging over them.

## Initialize with default behaviour:
    $(':checkbox').dragCheck();

## If you want to avoid triggering the 'change' event, and add your own code instead:
    $(':checkbox').dragCheck({
        onChange: function(event) {
            $(this).closest('tr').toggleClass('highlighted', this.value);
        }
    });

## If you want to wait for the user to finish before doing something (e.g. a heavy UI update/selector)
    $(':checkbox').dragCheck({
        deferChangeTrigger: true,
        onDragEnd: function() {
            $('span.checkbox-count').text($(':checkbox:checked').size());
        }
    });

## Sometimes, it's ok to update if user manually selects one checkbox at a time, but drag-checking should be handled in 1 swoop.
    var triggerChange = function() {
        $(this).closest('tr').toggleClass('highlighted', this.value);
    }
    var heavyUpdate = function() {
        // For demonstration purpose this operation relies on UI being up-to-date (triggerChange has been called with all checked boxes)
        $('span.checkbox-count').text($('tr.highlighted').size());
    }
    
    $(':checkbox').change(function() {
        triggerChange.call(this);
        heavyUpdate();
    });

    $(':checkbox').dragCheck({
        deferChangeTrigger: true,
        onDragEnd: function(items) {
            // Call change event to make sure UI reflects selection
            for(var i in items) {
                triggerChange.call(items[i]);
            };

            heavyUpdate();
        }
    });

See a demo here:
http://www.seph.dk/jquery-dragcheck/demo.html
