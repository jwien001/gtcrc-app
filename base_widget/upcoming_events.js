$(function() {
	$('#events_page').bind('pagebeforeshow',function(event, ui) {
        $(".event_list_row").remove();
        
        $.ajax({
            url: "api/upcoming_events/5",
            dataType: "json",
            async: false,
            success: function(data, textStatus, jqXHR) {
	            console.log(data);
	            $("#events_list").html(buildEventList(data));
	        },
		    error: ajaxError
	    });
        
        $('#events_list').listview('refresh');
	});	
});

function buildEventList(data) {
	var outString = "";
	
	for (var i=0; i<data.length; i++) {
		outString += '<li class="event_list_row">';
		outString += '<h1>' + data[i].Event_Name + '</h1>';
		outString += '<span class="ui-li-aside">'
		outString += new Date(data[i].Date + 'T23:00:00').toDateString();
		outString += '</span>';
		outString += '<p>' + data[i].Event_Description + '</p>';
		outString += '</li>';
	}
	
	return outString;
}