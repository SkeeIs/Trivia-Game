
//global variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeCount;
var timer;
var index = 0;
$("#question").hide();
$("#answers").hide();
$("#results").hide();

//reset function that resets all variables, brings back "start screen"
function reset() {
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  index = 0;
  $("#start-button").show();
}
//changeQuestion function that iterates through the answers within our questions objects within our allQuestions array & creates divs for the possible answers
function changeQuestion() {
  startCountdown();
  $("#question").empty();
  $("#answers").empty();
  $("#question").html(allQuestions[index].q);
  
  for (var i = 0; i < allQuestions[index].p.length; i++) {
      var newAnswerDiv = $("<div>");
      newAnswerDiv.attr("data-name", allQuestions[index].p[i]);
      newAnswerDiv.attr("class", "possible-answer");
      newAnswerDiv.text(allQuestions[index].p[i]);
      $("#answers").append(newAnswerDiv);
      console.log(newAnswerDiv);
    }
    
}
//endGame function that shows user their results
function endGame() {
  clearInterval(timer);
  $("#question").hide();
  $("#answers").hide();
  $("#time-left").hide();
  $("#question-container").empty();
  $("#results").show();
  $("#results").html($("<div class=col justify-content-center>").text("Correct: " + correct));
  $("#results").append($("<div class=col justify-content-center>").text("Incorrect: " + incorrect));
  $("#results").append($("<div class=col justify-content-center>").text("Unanswered: " + unanswered));
  reset();
}

//start countdown function sets our timeCount for each question & displays the countdown, also condition checks when the time runs out if we need to go to endgame (if all indexes have been iterated through) or increments the unanswered variable & calls on changeQuestion
function startCountdown() {
  timeCount = 15;
  $("#time-left").html("Time Left: " + timeCount);
  timer = setInterval(function() {
    timeCount --;
    $("#time-left").html("Time Left: " + timeCount);
        
    if (timeCount === 0) {
            
      if (index  >= allQuestions.length - 1) {
        endGame();
      }  
            
      else {
        clearInterval(timer);
        unanswered++;
        $("#question").empty();
        $("#answers").empty();
        $("#question-container").text("Time's Up! The correct answer was: " + allQuestions[index].a);
        index++;
        setTimeout(function() {
          $("#question-container").empty();
          changeQuestion();
        }, 2500);
      }      
    }
  }, 1000);
}

//on click of start button "start screen" gone & first question + timer displays instead
$("#start-button").on("click", function() {
    $("#start-button").hide();
    $("#results").hide();
    $("#question-container").empty();
    $("#question").show();
    $("#answers").show();
    $("#time-left").show();
    changeQuestion();
})
//on click of answer, stores user pick, checks if user was right or wrong, calls changeQuestion function
$("#answers").on("click", ".possible-answer", function() { 
  console.log(index);
  var userPick = $(this).attr("data-name");
  console.log(userPick);
  //condition checks if user got the correct answer displays "out of this world", counts correct++, advances question index
  if (userPick === allQuestions[index].a) {
    correct++;
    index++;
    $("#question").empty();
    $("#answers").empty();
    $("#question-container").text("CORRECT! Out of this world!");
  }
  //if incorrect displays message, counts incorrect++, advances question index
  else {
    $("#question-container").text("INCORRECT! The correct answer was: " + allQuestions[index].a);
    incorrect++;
    index++;
  }
  //after click checks if user is on last question then advances game to endgame
  if (index  > allQuestions.length - 1) {
    clearInterval(timer);
    endGame();
  }  
  //not last question we continue on      
  else {
    clearInterval(timer);
    $("#question").empty();
    $("#answers").empty();
    setTimeout(function() {
      $("#question-container").empty();
      changeQuestion();
    }, 2500);   
  }   
})
