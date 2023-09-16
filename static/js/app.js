
// The url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Display the default plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of id names
        let names = data.names;

        // Iterate through the names Array
        names.forEach((name) => {
            // Append each name as an option to the drop down menu
            // This is adding each name to the html file as an option element with value = a name in the names array
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Assign the first name to name variable
        let name = names[0];

        // Call the functions to make the demographic panel, bar chart, and bubble chart
        // demo(name);
        bar(name);
        buildubbleChart(name)
        metatable(name);
        // gauge(name);
    });}
function optionChanged(subjectID) { 
    bar(subjectID)
    buildubbleChart(subjectID)
    metatable(subjectID);
    console.log(subjectID);
}


function initialise() {
    console.log("init");
}

// initialise();

// d3.append('select').attr('value', id).text(id);

// selector.append('option').attr('value', id).text(id);

init()

function bar(ID){
    d3.json(url).then((data) => {
        console.log(data);
        samples=data.samples
        results=samples.filter(samp=>samp.id===ID)[0]
        console.log(results)
        otu_ids=results.otu_ids.slice(0,10).reverse()
        otu_labels=results.otu_labels.slice(0,10).reverse()
        sample_values=results.sample_values.slice(0,10).reverse()
        let trace1 = {
            x:sample_values,
            y:otu_ids.map(id=>`OTU ${id}`),
            text: otu_labels,
            type: "bar",
            orientation: "h"
          };

          let traceData = [trace1];

          // Apply a title to the layout
          let layout = {
            title: "Top ten otu",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
          };
          
          // Render the plot to the div tag with id "plot"
          // Note that we use `traceData` here, not `data`
          Plotly.newPlot("bar", traceData, layout);
          
})}
// id given is going to filter based on whatever the imput is 
// copy above no slice or reverse. bubble chart. 84 you need tell it where to put the bubble chart.


// Function that builds the bubble chart
function buildubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);
        console.log(value)
        // Get the first index from the array
        let valueData = value[0];
        console.log(valueData);
        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria chart",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function that builds the metatable data
function metatable(sample) {
    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let metainfo = data.metadata;

        // Filter based on the value of the metadata
        let value = metainfo.filter(result => result.id == sample)[0];
        console.log(value)
        // Use D3 to select the dropdown menu
        let metatable = d3.select("#sample-metadata");
        metatable.html('')
        // Iterate through the names Array
        for (name in value) {
            // Append each value to the metadata
            // This is adding each value to the metadata table
            metatable.append("h6").text(`${name}; ${value[name]}`);
        };


})}