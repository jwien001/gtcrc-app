$(function() {
	$('#home_page').bind('pagebeforeshow',function(event, ui) {
		$.ajax({
            url: 'api/busyness',
    		context: document.body,
            dataType: "json",
            async: true,
            success: function(data, textStatus, jqXHR) {
            		var cls;
            		var text;
                    if (data.count > 90) {
                    	cls = 'veryBusy';
                    	text = 'Very Busy';
                    } else if (data.count > 45) {
                    	cls = 'busy';
                    	text = 'Busy';
                    } else if (data.count >= 0) {
                    	cls = 'notBusy';
                    	text = 'Not Busy';
                    } else {
                    	cls = 'unavailable';
                    	text = 'Unavailable';
                    }
                    $('.busyness_indicator').attr('class', 'busyness_indicator ' + cls);
                    $('.busyness_indicator').html(text);
            },
            error: ajaxError
		});
		
		updateBuildingHours();
	});
	
	$('#hoursPrevDay').bind('click', function(event, ui) {
		hoursDate.setDate(hoursDate.getDate() - 1);
		updateBuildingHours();
	});
	
	$('#hoursNextDay').bind('click', function(event, ui) {
		hoursDate.setDate(hoursDate.getDate() + 1);
		updateBuildingHours();
	});
});

var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var hoursDate = new Date();

function formatDate(date) {
	var dd = date.getDate();
	var mm = date.getMonth()+1;
	var yyyy = date.getFullYear();
	return yyyy+"-"+mm+"-"+dd;
}

function formatDatePretty(date) {
	var today = new Date();
	if (date.getFullYear() == today.getFullYear() 
			&& date.getMonth() == today.getMonth()
            && date.getDate() == today.getDate()) {
		return "Today";
	}
	
	return days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

function updateBuildingHours() {
	$('#hoursDate').html(formatDatePretty(hoursDate)).trigger('create');
	$.getJSON("api/building_hours/" + formatDate(hoursDate), function(data) {
		var outString = '';
		
		for(i = 0; i < data.length; i++) {
			outString += '<tr>';
			outString += '<th scope="row">' + data[i].Section_Name + '</th>';
			outString += '<td>' + data[i].Hours + '</td>';
			outString += '</tr>';
		}
		
		$('#buildingHoursBody').html(outString).trigger('create');
	});
}

function ajaxError(jqXHR, textStatus, errorThrown) {
	console.log('ajaxError ' + textStatus + ' ' + errorThrown);
	// The code below works, but is commented out for testing so that you can still navigate the page if there's an error
    /*$('#error_dialog_content').html('<p>An unexpected error occurred<br/>' + textStatus + '<br/>' + errorThrown + '</p>');
    $.mobile.changePage($('#error_dialog'), {
            transition: 'pop',
            reverse: false,
            changeHash: false
    });*/
}