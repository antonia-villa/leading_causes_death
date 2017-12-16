// Create Data Distribution by State and Year for selected Cause
function causeByStateByYear(cause) {

  // Retrieve Data set based on cause clicked
  var data = stateCauseData(cause);

  // Hide Previous Data Visual
  $('#causeVisual').css("display","none");
  $('#visualHeading').text('Cause of Death: ' + cause);
  $('#subHeading').text("Distribution by state and year");
  $('#dataVisual').attr("width", "950px");
  $('#dataVisual').attr("width", "950px");

  // Create Back button
  var backButton = $('<input type="button" value="Back" class="btn btn-primary" id ="backButton"/>');
  backButton.appendTo($("#backButtonContainer"));
  goBack();

  // Set size of visual
  var margin = {top: 20, right: 160, bottom: 60, left: 40};
  var width = 1000 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  // Generate main SVG for visual
  var svg = d3
    .select("body")
    .append("svg")
    .attr("id", "stateCauseVisual")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+100)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // Transpose the data into layers
  var dataset = d3.layout.stack()(years.map(function(year) {
      return data.map(function(d) {
        return {x: d.state, y: +d[year]/d.total, z: year};
    });
  }));

  // Set x, y scale and generate colors for series
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) { return d.x; }))
    .rangeRoundBands([0, width], .05)

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height, 0]);

  // For percent distribution to create 100% bar chart
  var formatPercent = d3.format(".00%");

  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat(formatPercent);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(4, 2, 0)

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(18," + height + ")")
    .call(xAxis)      
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-1.55em")
    .attr("transform", "rotate(-90)" );

  // Create groups for each series
  var groups = svg.selectAll("g.total")
    .data(dataset)
    .enter().append("g")
    .attr("class", "total")
    .style("fill", function(d, i) { return colors[i]; });

  

   // Bar graph
  var rect = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .attr("width", x.rangeBand())
    .attr("class",  function(d) { return ("state "+ d.x)})
    .on('click', function(d){ addStateEventListeners(d, cause); })
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] - 15;
      var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
    });


  // Legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
   
  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});
   
  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) { 
        return years[i];
      });

// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");

}


// Add event listeners to each state in data set
function addStateEventListeners(d, cause) {

      // Retreieve State Name of Clicked State
      var state = d.x;
      // Create state and cause specific data set
      var stateSpecificData = stateYearDatabyCause(state);
      // Load pop-up visual 
      stateYearDataVisual(stateSpecificData, state, cause);
}


function goBack(){
  $('#backButton').click(function(e){
    e.preventDefault()
    loadCauseVisual();
    addCauseEventListeners();
    $('#myModal').modal('hide');
    $('#stateCauseVisual').css("display", "none");
    $('#causeVisual').css("display","block");
  })
}
