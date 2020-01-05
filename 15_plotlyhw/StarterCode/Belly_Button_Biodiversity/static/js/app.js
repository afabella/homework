function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;

    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(url).then(function(sample){
    var metaData= d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata

    metaData.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(function([key,value]){
         var row = metaData.append("p");
         row.text(`${key}: ${value}`)
          });
  
        });
  };
 //-------------------------------------------------------------------
function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var sampleData = `/samples/${sample}`;
  // @TODO: Build a Bubble Chart using the sample data
  d3.json(sampleData).then(function(data){
    var xValues = data.otu_ids;
    var yValues = data.sample_values;
    var markerSize = data.sample_values;
    var markerColor = data.otu_ids;
    var markerText = data.otu_labels;
  
    var trace1 = {
      x: xValues,
      y: yValues,
      text: markerText,
      mode: 'markers',
      marker: {
        size: markerSize,
        color: markerColor
      }
    };

    var data = [trace1];

    var layout = {
      title: "Belly Button Bacteria",
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot('bubble', data, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    d3.json(sampleData).then(function(data){
      var values = data.sample_values.slice(0,10);
      var labels = data.otu_ids.slice(0,10);
      var hoverText = data.otu_labels.slice(0,10);

      var data = [{
        values: values,
        lables: labels,
        hovertext: hoverText,
        type: "pie"
      }];
      
      var layout = {
        title:"Belly Button Bacteria"
      }
      Plotly.newPlot('pie',data, layout)
    });
  });
};

    //-----------------------------------------------------

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
