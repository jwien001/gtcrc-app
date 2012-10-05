var gfClasses = [];
var instClasses = [];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


//Getting JSON from the schedule php API
$(document).ready(function(){
    $.getJSON("api/schedule", function(data) {
    
    	//For each object in JSON data, parse into a class and add
    	//to corresponding list.
        $.each(data, function(){
            var newClass = new Class(this.ClassName, this.Instructor, 
                this.StartDate, this.EndDate, 
                this.DayOfWeek, this.Time, 
                this.NumOfHours, this.Location, 
                this.Description, this.Cost, this.ClassType);
                
            if(newClass.type == "GITFit")
            {
            	window.gfClasses.push(newClass);
            }
            else
            {
            	window.instClasses.push(newClass);
            }
        });
        
        //gfClasses.sort(ClassSortFunction);
        //instClasses.sort(ClassSortFunction);
        switchToScheduleView();
    });
});

//Class List Building Code Section

function buildClassListTable() {
	
	var outString = "";
	
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
	
		outString += '<li data-theme="a"> <a data-rel="dialog" data-transition="slide" onclick="showDialog();" return true;>';
		outString += classesOnDay[cod].name;
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
			console.log("Day " + day + " " + tClass.name);
		}
	}
	
	var iClass = 0;
	for(iClass = 0; iClass < instClasses.length; iClass++) {
		var tClass = instClasses[iClass];
		if(tClass.dayOfWeek == day) {
			classesOnDay.push(tClass);
			console.log("Day " + day + " " + tClass.name);
		}
	}
	
	console.log("Return classes size: " + classesOnDay.length);
	return classesOnDay;
}
//End Schedule Code Section

/* = [new Class("Indoor Cycling", "Monday"),
                new Class("Indoor Cycling", "Friday"), 
                new Class("Zumba", "Wednesday"),
                new Class("Urban Dance Grooves", "Tuesday"),
                new Class("Cardio Kickboxing", "Monday"), 
                new Class("Cycling/Abs", "Wednesday"),
                new Class("TreadFit", "Thursday"),
                new Class("Cycle/Yoga", "Friday"),
                new Class("Ripped Extreme", "Saturday"), 
                new Class("Weekend Ride", "Sunday")];

var instClasses = [new Class("H.E.A.T Boxing", "Sunday"), 
                new Class("Advanced Boxing", "Monday"),
                new Class("Hatha Yoga", "Thursday"),
                new Class("Pilates", "Saturday"), 
                new Class("Vinyasa/ Posture Focus Yoga", "Friday")];*/

function injectGITFitClasses() {
    var out;
    out='<ul data-role="listview" data-divider-theme="b" data-inset="true">';
    for(i = 0; i < gfClasses.length; i++) {
        var cl = gfClasses[i];
        out+='<li data-theme="a"> <a data-transition="slide" onclick="showDialog()"; return true;>' + cl.name + '</a> </li>';
    }
    out+= '</ul>';
    return out;
}

function injectGITFitClassesForDay(gfDay) {
        for(gf = 0; gf < gfClasses.length; gf++) {
        var gfcl = gfClasses[gf];
        if(gfcl.day == gfDay) {
            document.write('<li data-theme="a"> <a data-rel="dialog" data-transition="slide" onclick=showDialog(); return true;>' + gfcl.name + '</a> </li>');
        }
    }
}

function injectInstructionalClasses() {
    for(i = 0; i < instClasses.length; i++) {
        var cl = instClasses[i];
        document.write('<li data-theme="a"> <a data-rel="dialog" data-transition="slide onclick=showDialog(); return true;">' + cl.name + '</a> </li>');
    }
}

function injectInstructionalClassesForDay(instDay) {
    for(ic = 0; ic < instClasses.length; ic++) {
        var instcl = instClasses[ic];
        if(instcl.day == instDay) {
            document.write('<li data-theme="a"> <a data-transition="slide onclick=showDialog(); return true;">' + instcl.name + '</a> </li>');
        }
    }
}

function injectSchedule() {
    document.write('<ul data-role="listview" data-divider-theme="b" data-inset="true">');
    for(d = 0; d < days.length; d++) {
        var day = days[d];
        document.write('<li data-role="list-divider" role="heading">');
        document.write(day);
        document.write('</li>');
        injectClassesForDay(day);
    }
    document.write('</ul>');
}

function injectClassesForDay(day) {
    injectGITFitClassesForDay(day);
    injectInstructionalClassesForDay(day);
}

function Class(name, instructor, startDate, endDate, dayOfWeek, time, numOfHours, location, description, cost, type) {
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
}

function ClassSortFunction(a,b) {
	return (a.name).compareTo(b.name);
}

//Need to reload tables.
function switchToScheduleView() {
    element = document.getElementById('ClassTable');
    element.innerHTML = buildScheduleTable();
}

function switchToClassView() {
    element = document.getElementById('ClassTable');
    element.innerHTML = buildClassListTable();
}

function showDialog(name) {
    element = document.getElementById('CNameHeader');
    element.innerHTML = "<h3>"+name+"</h3>";
    element = document.getElementById('DialogData');
    element.innerHTML = "Class details here";
    $.mobile.changePage("#Dialog", "pop", true, true);
}