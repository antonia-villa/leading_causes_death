function visualtest(){

  // Retrieve data values
  var data = Object.values(stateData).map(function(v) {
    return v/10000;
  });

  // Retrieve data labels
  var label = Object.keys(stateData).map(function(v) {
    return v;
  });

  // Get Max Value in data set for y-axis scaling
  let max = data.reduce(function(a, b) {return Math.max(a, b);});

  console.log(data);
  console.log(label);
  console.log(max);

  var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 1000 - margin.left - margin.right,
      height = (max + 100) - margin.top - margin.bottom;

  //Width and height of SVG
  //var width = 800;
  //var height = max + 100;

  var barWidth = (width-100) / data.length;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.4);
//var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// define axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(4, 2, 0)

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  x.domain(label.map(function(d) { return d; }));
  y.domain([0, d3.max(data, function(d) { return d; })]);

  //add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Deaths (000s)");


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr( "x", function(d,i){
      return (i*18)+10; // Set x coordinate of rectangle to index of data value (i)*25.
      // Add 30 to account for our left margin.
      })
      .attr( "y", function(d){
      return height - d; // Set y coordinate for each bar to height minus the data value
      })
      .attr( "width", barWidth )
      .attr( "height", function(d){
      return d; // Set height of rectangle to data value
      })

  }




  