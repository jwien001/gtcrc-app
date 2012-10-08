var dayOfWeek;

$(function() {
	$('#busyness_page').bind('pageshow', function(event, ui) {
		dayOfWeek = (new Date()).getDay();
		//Adjust the day of week to match the format used on the server (1 = Monday, 2 = Tuesday,..., 7 = Sunday)
		if (dayOfWeek === 0)
			dayOfWeek = 7;
		
		$('#busynessDay').html(days[dayOfWeek - 1]);
		updateGraph();
	});
	
	$('#busynessPrevDay').bind('click', function(event, ui) {
		dayOfWeek--;
		if (dayOfWeek === 0)
			dayOfWeek = 7;
		
		$('#busynessDay').html(days[dayOfWeek - 1]);
		updateGraph();
	});
	
	$('#busynessNextDay').bind('click', function(event, ui) {
		dayOfWeek++;
		if (dayOfWeek === 8)
			dayOfWeek = 1;
		
		$('#busynessDay').html(days[dayOfWeek - 1]);
		updateGraph();
	});
});

var ticks = ['12am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
             '12pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].reverse();

function updateGraph() {
	$.ajax({
        url: 'api/busyness/' + dayOfWeek,
		context: document.body,
        dataType: "json",
        async: true,
        success: function(data, textStatus, jqXHR) {
        	var busyness = [];
        	for (var i=0; i<data.length; i++) {
        		busyness[23 - i] = parseInt(data[i]['AVG(count)']);
        	}
        	
        	var firstTime = $('#chartdiv').children().length === 0;
        	var chart = $.jqplot('chartdiv',  [busyness], {
        		seriesDefaults: {
               	renderer: $.jqplot.BarRenderer,
                   rendererOptions: {
                       barDirection: 'horizontal',
                       shadow: false
                   }
               },
        		axes: {
        			xaxis: {
        				ticks: [[0, 'Empty'], [Math.max.apply(null, busyness) * 1.05, 'Very Busy']],
        				tickOptions: {showLabel: true}
        			},
                   // Use a category axis on the y axis and use custom ticks
                   yaxis: {
                       renderer: $.jqplot.CategoryAxisRenderer,
                       ticks: ticks
                   }
               }
        	});
        	
        	if (!firstTime)
        		chart.replot({clear: true, resetAxes:true});
        },
        error: ajaxError
	});	
}