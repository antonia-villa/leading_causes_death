
// Cause Visual Data  
var causeDataSet = [];


// Cause Data Visual
function causeVisual(){

  // Append Sub-Heading
  $('#visualHeading').text('Distribution by Cause of Death');
  $('#subHeading').text('Data represents all states from 1999-2015');
  $('#guessForm').css("display","none");
  $('#myModal').modal('show');
  
  // Modal Content
  $('#modalHeaderText').text('How to interact with the data:');
  $('#interactionInstructions').append('<p id="text1">The data displayed represents a distribution of the total number of deaths from 1999 - 2015 for all of the United States by cause. There is a lot of valuable knowledge to be gained viewing the data at high level and even more learnings at a granual level. Year and state have a casual effect on the distribution of deaths by cause.</p>');
  $('#interactionInstructions').append('<p id="text2">In order to understand more about a specific cause of death, follow these steps:</p>');
  $('<ul/>').appendTo('#interactionInstructions').attr("id", "guessInstructions")
  $("#guessInstructions").append($("<li>").text("CLICK on a specific cause"));
  $("#guessInstructions").append($("<li>").text("GUESS percent of the total it represents"));
  $("#guessInstructions").append($("<li>").text("LEARN more about the cause of death by state and year"));


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

  console.log(causeDataSet);

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
      //.style("line-height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}