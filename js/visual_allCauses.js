
// Cause Visual Data  
var causeDataSet = [];


// Cause Data Visual
function causeVisual(){

  // Append Sub-Heading
  $('#visualHeading').text('Percent Distribution by Cause of Death');
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


  // Extract data
  var treemap = d3.layout
    .treemap()
      .size([width, height])
      .sticky(true)
      .value(function(d) { return d.total; });


    var colors = ['#9CABB4', '#2D3234', '#B4B4B4', '#343434', '#707B81', '#0A1934', '#173773', '#C5C6C2', '#464645', '#929390', '#6F7376', '#F37A4D', '#C0603D', '#735347', '#0D10A6', '#A2C8F3', '#475873', '#96B9F3', '#202734']
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
          .style("text-align", "center");

  return causeDataSet;
}
  
  // var colorcount = 0;
// To set position and area of boxes based on distribution for Cause Data Visual
function position() {

  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

// Add event listeners to each cause in data set
function addCauseEventListeners() {
  var causes = $('.node');
  for(var i =0; i < causes.length; i++){
    causes[i].addEventListener('click', function(){
      var cause = this.id;
      $('#myModal').modal('show');
      $('#modalHeaderText').text('Take a guess to see more data');
      $('#text1').text('What percent of total deaths do you think ' + cause + ' account for?')  
      $('#text2').css('display','none');
      $('#text3').css('display','none');
      $('#guessForm').css('display','block');
      
      submitGuess(cause);
  })
  }
}

// Submit guess
function submitGuess(cause){
  $("#submit").click(function(e){
    e.preventDefault();
        var guess = $("#guess").val(); 
    evaluateGuess(guess, cause);
  })
}

// Evaluate guess for correctness
function evaluateGuess(guess, cause){

  // Retrieve correct percent distribution for selected cause
    var correctPercent = 0; 
    for(var i = 0; i< causeDataSet.length; i++){
      if(causeDataSet[i].cause === cause){
        correctPercent = causeDataSet[i].percent;
      }
  }

  // Calculate Margin in guess and correct distribution
  var margin = guess - correctPercent

  // Set ToastR timeout
  toastr.options.timeOut = 2000;

  if((guess >= correctPercent-5) && (guess <= correctPercent+5)){
      toastr.success('Success messages');
    hideModal();
    causeByStateByYear(cause);
  } else {
    if(margin > -10 && margin < 10){
      toastr.warning('Try again! Your guess is within 10%!');
    } else {
      toastr.error('Try again! Your guess was >10% off!');
    }
  }
}

// Hide Modal upon correct guess
function hideModal(){
  $(".modal").removeClass("in");
  $(".modal-backdrop").remove();
  $('body').removeClass('modal-open');
  $('body').css('padding-right', '');
  $("#myModal").remove();
}
