
// Data Visualizations 
var children = [];

function addCauseEventListeners() {
	var causes = document.querySelectorAll('.node');
	console.log(children);
	for(var i =0; i < causes.length; i++){
		causes[i].addEventListener('click', function(){
			var cause = this.id;
			$('#myModal').modal('show');
			$('#interactionInstructions').css("display","none");
			$('#guessForm').css("display","block");
			$('#modalHeaderText').text('What percentage of total deaths does ' + cause + ' account for:');
			// document.getElementById('guessForm').style.display = 'visible';
			
			evaluateGuess(cause);
	})

	}
}

// Evaluate Guess

function evaluateGuess(cause){
	$("#submit").click(function(e){

		e.preventDefault();
        var guess = $("#guess").val(); 
        var correctPercent =0; 

        for(var i = 0; i< children.length; i++){
        	if(children[i].cause === cause){
        		correctPercent = children[i].percent
        	}
		}

		if((guess >= correctPercent-5) && (guess <= correctPercent+5)){
			$('#myModal').modal('hide');
			console.log('test case');
			nodeClicked(cause);
		} else {
			alert('try again');
		}
	})
}


// Cause Data Visual
function causeVisual(){

	// Append Sub-Heading
	document.getElementById('visualHeading').innerHTML = "<strong>Percent Distribution by cause:</strong> For all states from 1999 through 2015";
    //document.getElementById('guessForm').style.display = 'none';
    $('#guessForm').css("display","none");
    $('#myModal').modal('show');
    
    $('#modalHeaderText').text('How to interact with this visual and reveal more data:');
    $("#interactionInstructions").append('<p id="text1">The data displayed represents a distribution of the total number of deaths from 1999 - 2015 for all of the United States by cause. There is a lot of valuable knowledge to be gained viewing the data at high level and even more learnings at a granual level. Year and state have a casual effect. </p>');
    $("#interactionInstructions").append('<p id="text2"><span style="text-transform: uppercase; font-weight: bold; font-size: 20px">Click</span> on a cause and guess the approximate percentage it accounts for within the total distribution.</p>');
    $("#interactionInstructions").append('<p id="text3">If you guess within a 5.0% margin of the true distribution, the distribution of deaths of the selected cause will be displayed by year and state.</p>');


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
			children.push(child);
		}
	}

	// Create Tree Structure
	var tree = {
	    cause: "tree",
	    children: children
	};

	// Set Overall Visual size
	var width = 950,
	    height = 500,
	    color = d3.scale.category20c(),
	    div = d3.select("body")
	    		.append("div")
	    		.attr("id", "causeVisual")
	       		.style("position", "relative");

	// Extract data
	var treemap = d3.layout
		.treemap()
	    .size([width, height])
	    .sticky(true)
	    .value(function(d) { return d.total; });

	// Define function that returns color for data point
	var colors = ['#9CABB4', '#2D3234', '#B4B4B4', '#343434', '#707B81', '#0A1934', '#173773', '#C5C6C2', '#464645', '#929390', '#6F7376', '#F37A4D', '#C0603D', '#735347', '#0D10A6', '#A2C8F3', '#475873', '#96B9F3', '#202734']
	
	// Define individual node
	var node = div.datum(tree)
			.selectAll(".node")
	      	.data(treemap.nodes)
	    	.enter()
	    	.append("div")
	      	.attr("class", "node")
	      	.attr("id", function(d) { return d.cause; })
	      	.call(position)
	      	// .style("background-color", function(d) {
	       //    return d.cause == 'tree' ? '#fff' : color(d.cause); })

	       //.style("background-color",colors[i])
	      	.append('div')
	      	.style("font-size", function(d) {
	          // compute font size based on sqrt(area)
	          return Math.max(8, 0.15*Math.sqrt(d.area))+'px'; })
	      	.text(function(d) { return d.children ? null : d.cause; })
	      	.style("text-align", "center");

	return children;
}

// To set positions for Cause Data Visual main style 
function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}




function nodeClicked(cause) {
	// Retrieve Data set based on cause clicked

	var data = stateCauseData(cause);
	console.log(data);

	// Hide Previous Data Visual
	document.getElementById('causeVisual').style.display = 'none';
	document.getElementById('visualHeading').innerHTML = "Cause of Death " + cause;
	document.getElementById('subHeading').innerHTML = "By State and Year";


	var margin = {top: 20, right: 160, bottom: 60, left: 40};

	var width = 1000 - margin.left - margin.right,
    	height = 600 - margin.top - margin.bottom;

	var svg = d3
	  .select("body")
	  .append("svg")
	  .attr("id", "stateCauseVisual")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom+100)
	  .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	years.sort(function(a, b) {
  		return a - b;
	});


	  // Transpose the data into layers
	var dataset = d3.layout.stack()(years.map(function(year) {
  		return data.map(function(d) {
    		return {x: d.state, y: +d[year]/d.total, z: year};
 		});
	}));

	// Set x, y and colors
	var x = d3.scale.ordinal()
	  .domain(dataset[0].map(function(d) { return d.x; }))
	  .rangeRoundBands([0, width], .05)

	var y = d3.scale.linear()
	  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
	  .range([height, 0]);

	var colors  = randomColor({
   		count: years.length,
   		hue: 'blue'
	});

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

	// Create groups for each series, rects for each segment 
	var groups = svg.selectAll("g.total")
	  .data(dataset)
	  .enter().append("g")
	  .attr("class", "total")
	  .style("fill", function(d, i) { return colors[i]; });

	 // Draw Bar graph
	var rect = groups.selectAll("rect")
	  .data(function(d) { return d; })
	  .enter()
	  .append("rect")
	  .attr("x", function(d) { return x(d.x); })
	  .attr("y", function(d) { return y(d.y0 + d.y); })
	  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
	  .attr("width", x.rangeBand())
	  .on("mouseover", function() { tooltip.style("display", null); })
	  .on("mouseout", function() { tooltip.style("display", "none"); })
	  .on("mousemove", function(d) {
	    var xPosition = d3.mouse(this)[0] - 15;
	    var yPosition = d3.mouse(this)[1] - 25;
	    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
	    tooltip.select("text").html("Year: " + d.z + "  " + (d.y*100).toFixed(2)+ " %");
	  	tooltip.select("text").attr("data-html", "true")
	  });

	  // Draw legend
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
		  .attr("x",15)
		  .attr("dy", "1.2em")
		  .style("text-anchor", "middle")
		  .attr("font-size", "12px")
		  .attr("font-weight", "bold");

}







