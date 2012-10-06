$(function() {
	$('#events_page').bind('pagebeforeshow',function(event, ui) {
		// Initially load 5 events
        loadEventList(5);
	});
	
	$('#showMoreEvents').bind('click', function(event, ui) {
		// Load up to 10 new events with each click
		var size = $(".eventListRow").length + 10;
		loadEventList(size);
	});
});

function loadEventList(size) {
	$(".eventListRow").remove();
    
    $.ajax({
        url: "api/upcoming_events/" + size,
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            $("#eventsList").html(buildEventList(data));
        },
	    error: ajaxError
    });
    
    $('#eventsList').listview('refresh');
}

function buildEventList(data) {
	var outString = "";
	
	for (var i=0; i<data.length; i++) {
		outString += '<li class="eventListRow">';
		outString += '<h1>' + data[i].Event_Name + '</h1>';
		outString += '<span class="ui-li-aside">'
		outString += new Date(data[i].Date + 'T23:00:00').toDateString();
		outString += '</span>';
		outString += '<p>' + data[i].Event_Description + '</p>';
		outString += '</li>';
	}
	
	return outString;
}