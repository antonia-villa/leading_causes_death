function visualtest(){

	//var data = Object.values(stateData);

	//var arr = ["1", 2, 3, 4];

	var data = Object.values(stateData).map(function(v) {
	  return v/10000;
	});

	var label = Object.keys(stateData).map(function(v) {
	  return v;
	});

	// Get Max Value in data set for scalability
	let max = data.reduce(function(a, b) {return Math.max(a, b);});

	console.log(data);
	console.log(label);
	console.log(max);

	//Width and height of SVG
	var w = 800;
	var h = max + 100;

	var barWidth = w / data.length;



	//Create SVG element
	var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	// Select and generate rectangle elements
	svg.selectAll( "rect" )
		.data(data)
		.enter()
		.append("rect")
		.attr( "x", function(d,i){
			return i*25 + 30; // Set x coordinate of rectangle to index of data value (i)*25.
			// Add 30 to account for our left margin.
		})
		.attr( "y", function(d){
			return h - d; // Set y coordinate for each bar to height minus the data value
		})
		.attr( "width", 20 )
		.attr( "height", function(d){
			return d; // Set height of rectangle to data value
		})
		.attr( "fill", "steelblue");

	  svg.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });
		// console.log(Object.values(stateData));
};




//console.log(Object.values(stateData));


	