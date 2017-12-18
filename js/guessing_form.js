
// Add event listeners to each cause div container in data set
function addCauseEventListeners() {
  var causes = $('.node');
  for(var i =0; i < causes.length; i++){
    causes[i].addEventListener('click', function(){
      var cause = this.id;
      // Destroy previous modal
      hideModal();
      // Build and reformat modal for guess
      buildModal();
      buildModalGuessForm(cause);
      submitGuess(cause);
    });
  }
}

// Submit guess
function submitGuess(cause){
  $("#submit").click(function(e){
    e.preventDefault();
    var guess = $("#guess").val(); 
    evaluateGuess(guess, cause);
  });
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

  // Set Toastr timeout
  toastr.options.timeOut = 2000;

  // Check Guess for accuracy against correct percentage
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

