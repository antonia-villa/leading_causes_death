
// Build Main HTML structure for Changeable Modal
function buildModal(){
    html =  '<div class="modal fade" id ="myModal" role="dialog">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4 class="modal-title" id="modalHeaderText">';
    html += '</h4>';
    html += '</div>';
    html += '<div class="modal-body" id="modalVisual">';
    html += '<div id = "interactionInstructions">'
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" data-dismiss="modal">Close</span>';
    html += '</div>'; 
    html += '</div>'; 
    html += '</div>'; 
    html += '</div>'; 

    $('#visual').append(html);
    $("#myModal").modal();
    $("#myModal").modal('show');
}

// Instructional Modal for Visual All Causes
function buildModalInstructions(){
  $('#modalHeaderText').text('How to interact with the data:');
  $('#interactionInstructions').append('<p id="text1">The data displayed represents a distribution of the total number of deaths from 1999 - 2015 for all of the United States by cause. There is a lot of valuable knowledge to be gained viewing the data at high level and even more learnings at a granual level. Year and state have a casual effect on the distribution of deaths by cause.</p>');
  $('#interactionInstructions').append('<p id="text2">In order to understand more about a specific cause of death, follow these steps:</p>');
  $('<ul/>').appendTo('#interactionInstructions').attr("id", "guessInstructions")
  $("#guessInstructions").append($("<li>").text("CLICK on a specific cause"));
  $("#guessInstructions").append($("<li>").text("GUESS percent of the total it represents"));
  $("#guessInstructions").append($("<li>").text("LEARN more about the cause of death by state and year"));
}

// Guessing Modal for Visual All Causes
function buildModalGuessForm(cause){
    $('#modalHeaderText').text('Take a guess');
    $('#interactionInstructions').append('<p id="text1"> What percent of total deaths do you think ' + cause + ' account for?</p>');
    $('#interactionInstructions').append('<form id="guessForm"><input type="number" id ="guess" value="80"><input class="btn-default" type="submit" value="Submit" id="submit"></form>')
}

// Pop-Up Modal for Visual Cause State All Years
function buildVisualPopUpModal(state, cause){
    $('#interactionInstructions').remove();
    $('#modalHeaderText').text('Deaths caused by '+ cause + ' in ' + state);
    $('#modalHeaderText').css("text-transform", "none").css("text-align", "left");
    $('.modal-body').css("padding-left", "10px");
    $('.modal-footer').remove();
}

// Remove Modal and Data
function hideModal(){
  $(".modal").removeClass("in");
  $(".modal-backdrop").remove();
  $('body').removeClass('modal-open');
  $('body').css('padding-right', '');
  $("#myModal").remove();
}
