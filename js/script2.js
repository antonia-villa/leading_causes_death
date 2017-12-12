
function causeVisual(){

  //Reformat Data
	var children = [];
	for( keys in causeData){
  	var child = {
  		'cause': keys,
  		'total': (causeData[keys]/1000)
  		}
	  	if(child.cause != 'All Causes'){
			children.push(child);
		}
	}

	// Create Tree Structure
	var tree = {
	    cause: "tree",
	    children: children
	};

	// Generate Random Colors
	var colors  = randomColor({
   		count: children.length,
   		hue: 'blue'
	});

	var random_color = colors[Math.floor(Math.random() * colors.length)];

	var usedColors = [];

	

var width = 800,
    height = 600,
    color = d3.scale.category20c(),
    div = d3.select("body").append("div")
       .style("position", "relative");

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.total; });
 
var node = div.datum(tree).selectAll(".node")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background-color", function(d) {
          return d.cause == 'tree' ? '#fff' : color(d.cause); })
      .append('div')
      .style("font-size", function(d) {
          // compute font size based on sqrt(area)
          return Math.max(8, 0.18*Math.sqrt(d.area))+'px'; })
      .text(function(d) { return d.children ? null : d.cause; })
      .style("text-align", "center");;

}

 
function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

