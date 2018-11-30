//File by Paul Roberts
//Based off of code by Evin Ugur

window.makeSchedule = function(){
	
 
	var ddtable = document.getElementsByClassName("datadisplaytable");
	var filename = "error";

	if (ddtable.length <= 0) return;

	window.cal= ics();

	//loop through tables
	for (var i = 0; i < ddtable.length; i++) {

		var course;
		var description;
		var location;
		var startTime;
		var endTime;
		var byDayStr;
		

		aTable = ddtable[i];



		if (aTable.getAttribute("summary") == "This layout table is used to present the schedule course detail") {
			//console.log("Class Found");
			var className = aTable.children[0].innerHTML;
			if (filename == "error"){
				filename = aTable.children[1].children[0].children[1].innerHTML;
				filename = filename.replace(" ", "_");
				filename = filename + "_Calendar"
				//console.log(filename);
			}

			var nameParts = className.split(" - ");
			var courseNum = nameParts[1] + " " + nameParts[2];
			//description = nameParts[0];
			description = "";


		}
		else if (aTable.getAttribute("summary") == "This table lists the scheduled meeting times and assigned instructors for this class..") {
			
			var classes = aTable.children[1];

			//console.log(classes.children.length);
			for (var j = 1; j < classes.children.length; j++){

				var classInfo = classes.children[j];

				var badTime = classInfo.children[1].innerHTML;
				var badDays = classInfo.children[2].innerHTML;
				location = classInfo.children[3].innerHTML;
				var dateRangeBad = classInfo.children[4].innerHTML;
				course = courseNum + " " + classInfo.children[5].innerHTML;
				//description = description +" with " + classInfo.children[6].innerHTML.split(" (")[0];

				//console.log(description);

				var dates = dateRangeBad.split(" - ");
				var startDay = dates[0];//new Date(dates[0]);

				//fix for issue of term starting on a thrusday for a class only on firdays.
				var fixStart = new Date(startDay);
				var weekday = new Array(7);
				weekday[0]=  "U";
				weekday[1] = "M";
				weekday[2] = "T";
				weekday[3] = "W";
				weekday[4] = "R";
				weekday[5] = "F";
				weekday[6] = "S";

				var dayStart = weekday[fixStart.getDay()];
				var counter = 0;
				while (badDays.search(dayStart) == -1 && counter < 7) {
					fixStart.setDate(fixStart.getDate() + 1); //move forward 1 day
					dayStart = weekday[fixStart.getDay()];
					counter++

				}

				if (counter != 0) {
					var curr_date = fixStart.getDate();
    				var curr_month = fixStart.getMonth() + 1;
    				var curr_year = fixStart.getFullYear();
    				startDay = curr_month + "/" + curr_date + "/" + curr_year;
				}


				var endDay = dates[1];


				//change the date format from one letter to 2 letter.
				var times = badTime.split(" - ");
				startTime = startDay + " " + times[0];
				endTime = startDay + " " + times[1];

				var days = badDays.split("");
				badDays = badDays.replace("M", "MO,");
				badDays = badDays.replace("S", "SA,");
				badDays = badDays.replace("U", "SU,");
				badDays = badDays.replace("T", "TU,");
				badDays = badDays.replace("W", "WE,");
				badDays = badDays.replace("R", "TH,");
				badDays = badDays.replace("F", "FR,");
				
				
				byDayStr = badDays.slice(0,-1);

				// take wpi course data and build an ICS object 
				var rrule = {
					freq: "WEEKLY",
					until: endDay,
					byday: byDayStr,
					interval: 1 // repeat every week... setting to 2 would do 2 weeks... etc
				};
				// now that we have everything in place, add it to cal
				cal.addEvent(course, description, location, startTime, endTime, rrule);
			}
		}
	}

	cal.download(filename);

}

window.makeSchedule();


