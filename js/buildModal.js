function buildModal(){

  // Dynamically Build Modal to contain pop-up visual
    html =  '<div class="modal fade" id ="myModal" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
    html += '<h4 class="modal-title" id="modalHeaderText">''</h4>'
    html += '</div>';
    html += '<div class="modal-body">';
    html += '</div>';
    html += '<div id = "interactionInstructions">'
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" data-dismiss="modal">Close</span>';
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // footer
    html += '</div>';  // modalWindow

    $('#visual').append(html);
    $("#myModal").modal();
    $("#myModal").modal('show');
}

function buildModalInstructions(){

// Modal Content
  $('#modalHeaderText').text('How to interact with the data:');
  $('#interactionInstructions').append('<p id="text1">The data displayed represents a distribution of the total number of deaths from 1999 - 2015 for all of the United States by cause. There is a lot of valuable knowledge to be gained viewing the data at high level and even more learnings at a granual level. Year and state have a casual effect on the distribution of deaths by cause.</p>');
  $('#interactionInstructions').append('<p id="text2">In order to understand more about a specific cause of death, follow these steps:</p>');
  $('<ul/>').appendTo('#interactionInstructions').attr("id", "guessInstructions")
  $("#guessInstructions").append($("<li>").text("CLICK on a specific cause"));
  $("#guessInstructions").append($("<li>").text("GUESS percent of the total it represents"));
  $("#guessInstructions").append($("<li>").text("LEARN more about the cause of death by state and year"));

}

function buildModalGuessForm(){

    html += '<form id="guessForm">'
    html += '<input type="number" id ="guess" value="80">'
    html += '<input type="submit" value="Submit" id="submit">'
    html += '</form>'

    $('#interactionInstructions').append(html);
    // $("#myModal").modal();
    // $("#myModal").modal('show');

}
