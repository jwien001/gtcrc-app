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
	
	$('#busyness_page').bind('pagebeforeshow', function(event, ui) {
		//TODO Get data from server
		var data = [[0, 0, 0, 0, 0, 1, 1, 3, 4, 6, 7, 6,
		             6, 5, 9, 8, 9, 6, 5, 7, 8, 6, 4, 3]];
		var ticks = ['12am', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
		             '12pm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
		$.jqplot('chartdiv',  data, {
			seriesDefaults: {
	        	renderer:$.jqplot.BarRenderer,
	        	rendererOptions: {
	        		barDirection: 'horizontal'
	        	},
	        	pointLabels: {show: true}
	        },
			axes: {
	            // Use a category axis on the x axis and use custom ticks
	            yaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: ticks
	            }
	        }
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