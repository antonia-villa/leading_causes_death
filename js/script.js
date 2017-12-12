//Global fuction to reformat numbers
var nf = new Intl.NumberFormat();

function stateVisual(){

  //Append Header
  $( "#visualHeading" ).append( "<h2>Distribution of Deaths by State</h2>" );

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

  var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 1000 - margin.left - margin.right,
      height = (max + 100) - margin.top - margin.bottom;

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

// Create tool tip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Deaths:</strong> <span style='color:red'>" + nf.format((d*10000)) + "</span>";
  })


// add the SVG element
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// call tooltip
  svg.call(tip);

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
      return (i*18)+10;})
      .attr( "y", function(d){
      return height - d; // Set y coordinate for each bar to height minus the data value
      })
      .attr( "width", barWidth )
      .attr( "height", function(d){
      return d; // Set height of rectangle to data value
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

}




  