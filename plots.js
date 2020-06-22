function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    optionChanged('940')

})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
d3.json("samples.json").then((data) => {
  var metadata = data.metadata;
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  var result = resultArray[0];
  var PANEL = d3.select("#sample-metadata");

  PANEL.html("");
  PANEL.append("h6").text("ID: " + result.id);
  PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
  PANEL.append("h6").text("GENDER: " + result.gender);
  PANEL.append("h6").text("AGE: " + result.age);
  PANEL.append("h6").text("LOCATION: " + result.location);
  PANEL.append("h6").text("BBTYPE: " + result.bbtype);
  PANEL.append("h6").text("WFREQ: " + result.wfreq);

});
}

function buildCharts(sample) {
d3.json("samples.json").then((data) => {
  var samples = data.samples;
  var samplesResultArray = samples.filter(sampleObj => sampleObj.id == sample);
  var sampleResult = samplesResultArray[0];
  var sampleValues = sampleResult.sample_values;

  var sampleLabels = sampleResult.otu_labels;

  var sampleId = sampleResult.otu_ids;

  var otuId = sampleId.map(otu => "OTU " + otu);

  var trace = {
    x: sampleValues.slice(0, 10),
    y: sampleLabels.slice(0, 10),
    text: otuId.slice(0, 10),
    type: "bar",
    orientation: 'h'
  };

  var data = [trace];

  var layout = {
    title: "Top 10 Bacteria in Samples",
    xaxis: { title: "Amount"},
    yaxis: { title: "Sample ID"}

  };
  Plotly.newPlot("bar", data, layout);
  
  var bubble = {
    x: sampleId,
    y: sampleValues,
    mode: 'markers',
    marker:{
      size: sampleValues,
      color: sampleId
    }
  }

  var data2 = [bubble]

  var layout2 = {
    title: "Frequency of Bacteria"
  }

  Plotly.newPlot("bubble", data2, layout2);

var gauge = {
          type: "indicator",
          mode:"gauge",
          gauge:{
            axis: 
            {
            range: [0, 9],
            tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            ticks: "outside"
            },
            steps: 
            [
              {range: [0,1], color:"#F9EBEA"},
              {range: [1,2], color:"#F2D7D5"},
              {range: [2,3], color:"#E6B0AA"},
              {range: [3,4], color:"#D98880"},
              {range: [4,5], color:"#CD6155"},
              {range: [5,6], color:"#C0392B"},
              {range: [6,7], color:"#A93226"},
              {range: [7,8], color:"#922B21"},
              {range: [8,9], color:"#7B241C"}
              ],
            threshold: 
            {
              line: { color: "black", width: 6 },
                      thickness: 2,
                      value: 2
                    }
        }
      };
      
      var data3 = [gauge];

      var Layout3 = {
          title: "Belly Button Washing <br> Scrubs per Week",
      };

      Plotly.newPlot("gauge", data3, Layout3);
});
}


