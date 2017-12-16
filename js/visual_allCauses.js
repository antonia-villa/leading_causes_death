
// Cause Visual Data  
var causeDataSet = [];


// Cause Data Visual
function causeVisual(){

  // Append Sub-Heading
  $('#visualHeading').text('Distribution by Cause of Death');
  $('#subHeading').text('Data represents all states from 1999-2015');

  // BuildModal
  buildModal();
  buildModalInstructions();


  // create Grandtotal of deaths for % distribution
  var grandTotal = 0;
  for (var keys in causeData) {
    if(keys != 'All Causes'){
      grandTotal += causeData[keys];
    }
  }

  //Reformat Data for tree structure
  for(keys in causeData){
    var child = {
      'cause': keys,
      'percent': Math.round(((causeData[keys]/grandTotal)*100)),
      'total': causeData[keys]
    }
      if(child.cause != 'All Causes'){
      causeDataSet.push(child);
    }
  }

  // Create Tree Structure
  var tree = {
      cause: "tree",
      children: causeDataSet
  };

  // Set Overall Visual size
  var width = 960,
      height = 500,
      color = d3.scale.category20c(),
      div = d3.select("body")
          .append("div")
          .attr("id", "causeVisual")
          .style("position", "relative");
  
  //Append Tooltip
  var tool = d3.select("body").append("div").attr("class", "toolTip");
  
  // Extract data
  var treemap = d3.layout
    .treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.total; });

  // Define individual node
  var node = div.datum(tree)
      .selectAll(".node")
      .data(treemap.nodes)
      .enter()
      .append("div")
      .attr("class", "node")
      .attr("id", function(d) { return d.cause; })
      .style("background-color", function(d, i){
          return colors[i];
        })
      .call(position)
      .append('div')
      .style("font-size", function(d) {
          // compute font size based on sqrt(area)
          return Math.max(6, 0.14*Math.sqrt(d.area))+'px'; })
        .text(function(d) { return d.children ? null : d.cause; })
        .style("text-align", "center")
       .on("mousemove", function (d) {
          tool.style("left", d3.event.pageX + 10 + "px")
          tool.style("top", d3.event.pageY - 20 + "px")
          tool.style("display", "inline-block");
          tool.html(d.children ? null : d.cause)
      }).on("mouseout", function (d) {
          tool.style("display", "none");
      });

  return causeDataSet;
}
  
// To set position and area of boxes based on distribution for Cause Data Visual
function position() {

  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; })
}