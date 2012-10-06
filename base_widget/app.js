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

	$('#Dialog').bind('pagebeforeshow', function() {
		if(gfClasses.length == 0 && 
			instClasses.length == 0) {
			$.mobile.changePage('#SchedulePage', 'pop', true, true);
		}
	});

	$('#SchedulePage').bind('pagebeforeshow',function(event, ui) {
	$.mobile.changePage("#DisplayPage", "pop", true, true);
	gfClasses = [];
	instClasses = [];
    $.getJSON("api/schedule", function(data) {
    
    	//For each object in JSON data, parse into a class and add
    	//to corresponding list.
    	var index = 0;
        $.each(data, function(){
            var newClass = new Class(this.ClassName, this.InstructorName, 
                this.StartDate, this.EndDate, 
                this.DayOfWeek, this.Time, 
                this.NumOfHours, this.Location, 
                this.Description, this.Cost, 
                this.ClassType,index);
            index++;
                
            if(newClass.type == "GITFit")
            {
            	window.gfClasses.push(newClass);
            }
            else
            {
            	window.instClasses.push(newClass);
            }
        });
        
        gfClasses.sort(ClassSortFunction);
        instClasses.sort(ClassSortFunction);
        switchToScheduleView();
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


var gfClasses = [];
var instClasses = [];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var crcBuildings = [];

//Class List Building Code Section

function buildClassListTable() {
	
	var outString = '<ul data-role="listview" data-divider-theme="b" data-inset="true">';
	
	outString += buildGitFitClasses();
	outString += buildInstClasses();
	
	outString += '</li>';
	
	return outString;
}

function buildGitFitClasses() {
	var outString = "";
	outString += '<li data-role="list-divider" role="heading">G.I.TFit classes</li>';
	
	for(instC = 0; instC < instClasses.length; instC++) {
		var tClass = gfClasses[instC];
		outString += '<li data-theme="a"> <a data-rel="dialog" data-transition="slide" onclick="showDialog('+tClass.id+');" return true;>';
		outString += tClass.name;
		outString += '</a> </li>';
	}
	return outString;
}

function buildInstClasses() {
	var outString = "";
	outString += '<li data-role="list-divider" role="heading">Instructional classes</li>';
	
	for(instC = 0; instC < instClasses.length; instC++) {
		var tClass = instClasses[instC];
		outString += '<li data-theme="a"> <a data-rel="dialog" data-transition="slide" onclick="showDialog('+tClass.id+');" return true;>';
		outString += tClass.name;
		outString += '</a> </li>';
	}
	return outString;
}

//Schedule Building Code Section

//Builds string table of GitFit and Inst. Classes.
function buildScheduleTable() {
	
	var outString = '<ul data-role="listview" data-divider-theme="b" data-inset="true">';
	for(day = 0; day < days.length; day++) {	
		
		outString += '<li data-role="list-divider" role="heading">';
        outString += days[day];
        outString += '</li>';
        
        outString += buildDaySchedule(day+1);
	}
	
	outString += '</ul>';
	return outString;
}

//Builds a string list of classes for the day specified.
function buildDaySchedule(day) {

	var classesOnDay = getClassesForDay(day);

	var outString = "";
	for(cod = 0; cod < classesOnDay.length; cod++) {
		var tClass = classesOnDay[cod];
		outString += '<li data-theme="a"> <a data-rel="dialog" data-transition="slide" onclick="showDialog('+tClass.id+');" return true;>';
		outString += tClass.name;
		outString += '</a> </li>';
	
	}
	return outString;
}

//Returns an array of classes on the specified day index.
function getClassesForDay(day) {

	var classesOnDay = [];
	
	var gClass = 0;
	for(gClass = 0; gClass < gfClasses.length; gClass++) {
		
		var tClass = gfClasses[gClass];
		if(tClass.dayOfWeek == day) {
			classesOnDay.push(tClass);
		}
	}
	
	var iClass = 0;
	for(iClass = 0; iClass < instClasses.length; iClass++) {
		var tClass = instClasses[iClass];
		if(tClass.dayOfWeek == day) {
			classesOnDay.push(tClass);
		}
	}
	return classesOnDay;
}
//End Schedule Code Section

function Class(name, instructor, startDate, endDate, dayOfWeek, time, numOfHours, location, description, cost, type, id) {
    this.name = name;
    this.instructor = instructor;
    this.startDate = startDate;
    this.endDate = endDate;
    this.dayOfWeek = dayOfWeek;
    this.time = time;
    this.numOfHours = numOfHours;
    this.location = location;
    this.description = description;
    this.cost = cost;
    this.type = type;
    this.id = id;
}

function ClassSortFunction(a,b) {
	var lowerA = a.name.toLowerCase();
	var lowerB = b.name.toLowerCase();
	if(lowerA < lowerB) {
		return -1;
	}
	else if(lowerA > lowerB) {
		return 1;
	}
	return 0;
}

//Need to switch and reload tables.
function switchToScheduleView() {
    element = document.getElementById('ClassTable');
    element.innerHTML = buildScheduleTable();
    
    $('#ClassTable').html(buildScheduleTable()).trigger('create');
}

function switchToClassView() {
    element = document.getElementById('ClassTable');
    element.innerHTML = buildClassListTable();

	$('#ClassTable').html(buildClassListTable()).trigger('create');
}

function findClassByIndex(index) {
	var found = null;
	
	for(i = 0; i < gfClasses.length; i++) {
		var tClass = gfClasses[i];
		if(index == tClass.id) {
			found = tClass;
			break;
		}
	}
	
	for(j = 0; j < instClasses.length; j++) {
		var tClass = instClasses[j];
		if(index == tClass.id) {
			found = tClass;
			break;
		}
	}
	return found;
}

//Dialog Code
function showDialog(index) {

	var tClass = findClassByIndex(index);
	
	$('#DialogData').html("<h4>Name: " + tClass.name + "</h4>");
	$('#DialogData').append("<h4>Instructor: " + tClass.instructor + "</h4>");
	$('#DialogData').append("<h4>Dates: " + tClass.startDate+ " to " + tClass.endDate + "</h4>");
	
	var day = days[tClass.dayOfWeek];
	$('#DialogData').append("<h4>Day: " + day + "</h4>");
	
	$('#DialogData').append("<h4>Time: " + tClass.time + "</h4>");
	$('#DialogData').append("<h4>Location: " + tClass.location + "</h4>");	
	$('#DialogData').append("<h4>Cost: $" + tClass.cost + "</h4>");
	$('#DialogData').append("<h4>Description: </br>" + tClass.description + "</h4>");
	
	$('#CNameHeader').trigger('create');
	$('#DialogData').trigger('create');
	
    $.mobile.changePage("#Dialog", "pop", true, true);
}

function Building(name, hours) {
	this.name = name;
	this.hours = hours;
}

function buildBuildingHours() {
	var string = '<textarea name="" rows="'+crcBuildings.length*10+'"	 id="BuildingHoursData" placeholder="">';
	for(i = 0; i < crcBuildings.length; i++) {
		string += crcBuildings[i].name;
		string += '\n\t';
		string += crcBuildings[i].hours;
		string += '\n';
	}
	string += '</textarea>';
	$('#BuildingHours').html(string).trigger('create');
}
