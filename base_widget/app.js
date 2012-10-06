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
	
	$('#busyness_page').bind('pageshow', function(event, ui) {
		var dayOfWeek = (new Date()).getDay();
		//Adjust the day of week to match the format used on the server (1 = Monday, 2 = Tuesday,..., 7 = Sunday)
		if (dayOfWeek === 0)
			dayOfWeek = 7;
		//Select the button for the current day
		$('input:radio[name=busynessDate]').filter('[value=' + dayOfWeek + ']').next().click();		
	});
	
	$('input:radio[name=busynessDate]').bind("change", function(event, ui) {		
		var dayOfWeek = $('input:radio[name=busynessDate]:checked').val();
		//TODO Get data from server
		var data = [0, 0, 0, 0, 0, 1, 1, 3, 4, 6, 7, 6,
		             6, 5, 9, dayOfWeek, 9, 6, 5, 7, 8, 6, 4, 3];
		var ticks = ['12am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
		             '12pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
		var firstTime = $('#chartdiv').children().length === 0;
		var chart = $.jqplot('chartdiv',  [data.reverse()], {
			animate: true,
			seriesDefaults: {
	        	renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barDirection: 'horizontal',
                    shadow: false
                }
	        },
			axes: {
				xaxis: {
					ticks: [[0, 'Empty'], [Math.max.apply(null, data) * 1.2, 'Very Busy']],
					tickOptions: {showLabel: true}
				},
	            // Use a category axis on the y axis and use custom ticks
	            yaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: ticks.reverse()
	            }
	        }
		});
		
		if (!firstTime)
			chart.replot({clear: true, resetAxes:true});
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