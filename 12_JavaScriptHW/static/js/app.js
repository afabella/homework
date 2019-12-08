// from data.js
var tableData = data;

//get a reference to the table body
var tbody = d3.select("tbody");

//loop throught the objects 

tableData.forEach(function(ufoSightings) {
	console.log(ufoSightings);
	var row = tbody.append("tr");
///extract the key of the objects 

	Object.entries(ufoSightings).forEach(function([key,value]) {
			console.log(key,value);
			var cell = tbody.append("td");
			cell.text(value);
	});
});

///event listener to filter

var button = d3.select("#filter-btn");
var clearInput = d3.select("tbody");
//complete handler
button.on("click", function(){
	clearInput.html("");
	d3.event.preventDefault();
	var inputField = d3.select("#datetime");
	var inputValue = inputField.property("value");
	console.log(inputValue);
	console.log(tableData);
	var filteredTime = tableData.filter(date => date.datetime === inputValue);
	console.log(filteredTime);

	filteredTime.forEach(function(timefilter){
		console.log(timefilter);
		var row = tbody.append("tr");

		Object.entries(timefilter).forEach(function([key,value]){
			console.log(key,value);
			var cell = tbody.append("td");
			cell.text(value);
		});
	});
	
});


