$(function() {	
	$('#announcements_page').bind('pageshow',function(event, ui) {
        $('#showLessAnnouncements').closest('.ui-btn').hide();
		$('#showAllAnnouncements').closest('.ui-btn').show();
        loadAnnouncements(0);
	});
	
	$('#showAllAnnouncements').bind('click', function(event, ui) {
		$('#showAllAnnouncements').closest('.ui-btn').hide();
		$('#showLessAnnouncements').closest('.ui-btn').show();
		loadAnnouncements(1);
	});
	
	$('#showLessAnnouncements').bind('click', function(event, ui) {
		$('#showLessAnnouncements').closest('.ui-btn').hide();
		$('#showAllAnnouncements').closest('.ui-btn').show();
		loadAnnouncements(0);
	});
});

function loadAnnouncements(showAll) {
	$(".announcementRow").remove();
    
    $.ajax({
        url: "api/announcements/" + showAll,
        dataType: "json",
        async: false,
        success: function(data, textStatus, jqXHR) {
            $("#announcementList").html(buildAnnouncementList(data));
        },
	    error: ajaxError
    });
    
    $('#announcementList').listview('refresh');
}

function buildAnnouncementList(data) {
	var outString = "";
	
	for (var i=0; i<data.length; i++) {
		outString += '<li class="announcementRow">';
		outString += '<h1>' + data[i].Title + '</h1>';
		outString += '<span class="ui-li-aside">'
		outString += new Date(data[i].StartDate + 'T23:00:00').toDateString();
		outString += '</span>';
		outString += '<p>' + data[i].Details + '</p>';
		outString += '</li>';
	}
	
	return outString;
}