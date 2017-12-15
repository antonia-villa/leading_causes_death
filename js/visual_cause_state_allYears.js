
// Create State Year Specific Data
function stateYearDataVisual(stateSpecificData, state){

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
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.15);
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
    html =  '<div id="dynamicModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>'+state+'</h4>'
    html += '</div>';
    html += '<div class="modal-body" id="modalVisual">';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" data-dismiss="modal">Close</span>';
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // footer
    html += '</div>';  // modalWindow

    $('body').append(html);
    $("#dynamicModal").modal();
    $("#dynamicModal").modal('show');


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
      .attr("transform", "translate(10," + height + ")")
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
      .attr("y", 3)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Deaths");


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill","gray")
      .attr("x", function(d,i) { return (i*30)+10; })
      .attr("width", x.rangeBand())
      .attr( "y", function(d){ return y(d);})
      .attr("height", function(d) { return height - y(d); });

    // Remove Modal
    $('#dynamicModal').on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

}

