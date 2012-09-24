$(function() {
	$('#home_page').bind('pagebeforeshow',function(event, ui) {
		$.ajax({
            url: 'api/busyness',
    		context: document.body,
            success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    $('#busyness_indicator').attr('class', 'notBusy');
                    $('#busyness_indicator').html('Not Busy');
            },
            error: ajaxError
		});
	});
});

function ajaxError(jqXHR, textStatus, errorThrown) {
    console.log('ajaxError ' + textStatus + ' ' + errorThrown);
    $('#error_message').remove();
    $("#error_message_template").tmpl({errorName: textStatus, errorDescription: errorThrown}).appendTo( "#error_dialog_content" );
    $.mobile.changePage($('#error_dialog'), {
            transition: 'pop',
            reverse: false,
            changeHash: false
    });
}