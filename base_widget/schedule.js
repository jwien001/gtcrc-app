var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var gfClasses = [new Class("Indoor Cycling", "Monday"),
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
                new Class("Vinyasa/ Posture Focus Yoga", "Friday")];

function injectGITFitClasses() {
    for(i = 0; i < gfClasses.length; i++) {
        var cl = gfClasses[i];
        document.write('<li data-theme="a"> <a href="#Dialog" data-transition="slide">' + cl.name + '</a> </li>');
    }
}

function injectGITFitClassesForDay(gfDay) {
        for(gf = 0; gf < gfClasses.length; gf++) {
        var gfcl = gfClasses[gf];
        if(gfcl.day == gfDay) {
            document.write('<li data-theme="a"> <a href="#Dialog" data-rel="dialog" data-transition="slide">' + gfcl.name + '</a> </li>');
        }
    }
}

function injectInstructionalClasses() {
    for(i = 0; i < instClasses.length; i++) {
        var cl = instClasses[i];
        document.write('<li data-theme="a"> <a href="#Dialog" data-rel="dialog" data-transition="slide">' + cl.name + '</a> </li>');
    }
}

function injectInstructionalClassesForDay(instDay) {
    for(ic = 0; ic < instClasses.length; ic++) {
        var instcl = instClasses[ic];
        if(instcl.day == instDay) {
            document.write('<li data-theme="a"> <a href="#Dialog" data-transition="slide">' + instcl.name + '</a> </li>');
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

function Class(name, day) {
    this.name = name;
    this.day = day;
}

//Need to reload tables.
function switchToScheduleView() {
    alert("Change to Schedule View.");
    element = document.getElementById('PageHeader');
    element.innerHTML = "<h3>Does this work?</h3>";
}

function switchToClassView() {
    alert("switch to class view");
}