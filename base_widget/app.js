$(function() {
	$('#home_page').bind('pagebeforeshow',function(event, ui) {
		$.ajax({
            url: 'api/busyness',
    		context: document.body,
            success: function(data, textStatus, jqXHR) {
                    console.log(data);
                    $('.busyness_indicator').attr('class', 'busyness_indicator notBusy');
                    $('.busyness_indicator').html('Not Busy');
            },
            error: ajaxError
		});
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		var dateToken = yyyy+"-"+mm+"-"+dd;
		crcBuildings = [];
		$.getJSON("api/building_hours/"+dateToken, function(data) { 
			$.each(data, function(){
				var building = new Building(this.Section_Name, this.Hours);
				crcBuildings.push(building);
			});
			buildBuildingHours();
		});
	});
});

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