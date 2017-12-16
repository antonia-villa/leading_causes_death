
// Add event listeners to each cause in data set
function addCauseEventListeners() {
  var causes = $('.node');
  for(var i =0; i < causes.length; i++){
    causes[i].addEventListener('click', function(){
      var cause = this.id;
      $('#myModal').modal('show');
      $('#modalHeaderText').text('Take a guess');
      $('#text1').text('What percent of total deaths do you think ' + cause + ' account for?')  
      $('#guessInstructions').css('display','none');
      $('#text2').css('display','none');
      //$('#text3').css('display','none');
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
