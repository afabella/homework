// Define SVG area dimensions 
var svgWidth = 960;
var svgHeight = 500; 

//Define the chart's margins as an object 
var margin = {
  top: 20,
  right: 40, 
  bottom: 80, 
  left: 100
};

// Define dimensions of the chart area 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//append to the scatter element

var chart = d3.select('#scatter')
  .append('div')
  .classed('chart', true);

// Creating SVG wrapper and appending SVG group that will hold charts
// and shift margins

var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  
var chartGroup = svg.append("g")
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//import data 

d3.csv("../assets/data/data.csv").then(function(healthData) {
//step 1: Parse the data  
//smokes vs age
  
  healthData.forEach(function(data){
    data.age = +data.age;
    data.smokes = +data.smokes;
});

//step 2: Create scale functions 

  var xLinearScale = d3.scaleLinear()
    .domain([30, d3.max(healthData, d => d.age)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.smokes)])
    .range([height, 0]);

//step 3: create axis functioncs
  
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

//step 4: append Axes to the chart

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

//step 5: create circles 

  var circlesGroup = chartGroup.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.age))
  .attr("cy", d => yLinearScale(d.smokes))
  .attr("r", "10")
  .attr("fill", "hotpink")
  .attr("opacity", "2");

//get abbr onto circles
  var textCircle = chartGroup.selectAll('.stateText')
    .data(healthData)
    .enter()
    .append('text')
    .classed('stateText', true)
    .attr('x', d => xLinearScale(d.age))
    .attr('y', d => yLinearScale(d.smokes))
    .attr('dy', 3)
    .attr('font-size', '8px')
    .text(function(d){return d.abbr});

//step 6: initialize tool tip 

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>Age: ${d.age}<br>Smoke Percent: ${d.smokes}`);

    });

//step 7: create tooltip in the chart

  chartGroup.call(toolTip);

//step 8: create event listeners to disply and hide the tooltip

  circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })
      // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Smoke (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Age");
})  .catch(function(error) {
    console.log(error);
});
