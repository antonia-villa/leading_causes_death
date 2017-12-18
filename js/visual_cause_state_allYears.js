
// Create State Year Specific Data
function stateYearDataVisual(stateSpecificData, state, cause){

  // Retrieve data values
  var data = Object.values(stateSpecificData).map(function(v) {
    return v;
  });

  // Retrieve data labels
  var label = Object.keys(stateSpecificData).map(function(v) {
    return v;
  });

  // Get Max Value in data set for y-axis scaling
  var margin = {top: 20, right: 20, bottom: 70, left: 60},
    width = 580 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.11);
  //var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // define axis
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);

  // Dynamically Build Modal to contain pop-up visual
    buildModal();
    buildVisualPopUpModal(state, cause);

  // add the SVG element to modal
  var svg = d3.select("#modalVisual")
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
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-90)" 
                });

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", function(d) {
    return "translate(" + -60 + "," + this.getBBox().height / 3 + ") rotate(-90)";
  })
      .attr("y", 3)
      .attr("dy", ".71em")

  // Style the axis lines
  svg.selectAll('path')
  .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '.5px'});


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill","gray")
      .attr("x", function(d,i) { return (i*29)+10; })
      .attr("width", x.rangeBand())
      .attr( "y", function(d){ return y(d);})
      .attr("height", function(d) { return height - y(d); });

    // Remove Modal
    $('#myModal').on('hidden.bs.modal', function (e) {
        $(this).remove();
    });


}

