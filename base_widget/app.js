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
    $('#error_dialog_content').html('<p>An unexpected error occurred<br/>' + textStatus + '<br/>' + errorThrown + '</p>');
    $.mobile.changePage($('#error_dialog'), {
            transition: 'pop',
            reverse: false,
            changeHash: false
    });
}