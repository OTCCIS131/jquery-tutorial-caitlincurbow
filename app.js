$(document).ready(function () {
    
        //  creating the variable data and setting the cost to its price.
        var data = {
            cost: 9.99
        };
    
        // getting the number of people that will be attending
        function getAttendeeCount() {
            return $('.attendee-list .row.attendee').length;
        }
    
        // creating the add attendee option
        function addAttendee() {
            $('.attendee-list').append(
                $('script[data-template="attendee"]').text()
            );
    
            syncRemoveButtons();
        }
    
        // creating a function to sync the remove button
        function syncRemoveButtons() {
            // If only one attendee, hide the first remove button
            // otherwise, show all remove buttons
            if (getAttendeeCount() === 1) {
                $('.attendee-list .attendee .remove-attendee').first().hide();
            } else {
                $('.attendee-list .attendee .remove-attendee').show();
            }
        }
    
        // creating a function to sync the purchase button
        function syncPurchaseButton() {
            // Total up the count for the checkout button total
            $('#checkout-button span.amount').html(
                '$' + data.cost * getAttendeeCount()
            );
        }
    
        //  adds the attendee when the button is clicked
        $('.add-attendee').on('click', function (event) {
            event.preventDefault();
            addAttendee();
            $(this).trigger('attendee:add');
        }).on('attendee:add', function () {
            syncPurchaseButton();
            syncRemoveButtons();
        });
    
        // Attach an event handler to the dynamic row remove button
        $('#app').on('click', '.attendee .remove-attendee', function (event) {
            event.preventDefault();
            var $row = $(event.target).closest('.attendee.row');
            
            // removing the row
            $row.remove();
            $('#app').trigger('attendee:remove');
        });
    
        // syncing the buttons so that the purchase button and remove button will coincide
        $('#app').on('attendee:remove', function () {
            syncPurchaseButton();
            syncRemoveButtons();
        });
    
        //
        // Initialize the form
        //
    
        // Set up the unit cost of one ticket
        $('#unit-price').html('$' + data.cost + ' ea.');
    
        // Add one attendee by default on init
        addAttendee();
        syncPurchaseButton();
    });