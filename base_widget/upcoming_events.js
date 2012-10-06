$(function() {
	$('#events_page').bind('pagebeforeshow',function(event, ui) {
        $(".event_list_row").remove();
        
        $.ajax({
            url: "api/upcoming_events/5",
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
                    console.log(data);
	                $("#event_list_row_template").tmpl(data).appendTo("#events_list");
	        },
		    error: ajaxError
	    });
        
        $('#comments_list').listview('refresh');
	});	
});