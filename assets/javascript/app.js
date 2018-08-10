
//global variables including correct, incorrect, timePerQuestion, timeCount, 
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeCount;
var timer;
var index = 0;
$("#question").hide();
$("#answers").hide();
$("#results").hide();

//reset function that resets all variables, "start screen"
function reset() {
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  index = 0;
  $("#start-button").show();
}
//changeQuestion function that condition checks there are questions left in our object, changes html, calls start countdown
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
  $("#results").html($("<p>").text("Correct: " + correct));
  $("#results").append($("<p>").text("Incorrect: " + incorrect));
  $("#results").append($("<p>").text("Unanswered: " + unanswered));
    reset();
}

//start countdown function that clears interval, sets timeCount = timePerQuestion, calls decrement function, output to time-left div
function startCountdown() {
    timeCount = 15;
    $("#time-left").html("Time Left: " + timeCount);
    timer = setInterval(function() {
        timeCount --;
        $("#time-left").html("Time Left: " + timeCount);
        
        if (timeCount === 0) {
            
            if (index  >= allQuestions.length - 1) {
                console.log(index);
                //clearInterval(timer);
                endGame();
            }  
            
            else {
                clearInterval(timer);
                unanswered++;
                $("#question").empty();
                $("#answers").empty();
                $("#question-container").text("Time's Up! The correct answer was " + allQuestions[index].a);
                index++;
                setTimeout(function() {
                    $("#question-container").empty();
                    changeQuestion();
                    
                }, 3000);
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
//on click of answer, stores user input, calls changeQuestion function
 $("#answers").on("click", ".possible-answer", function() {
    console.log(index); 
    var userPick = $(this).attr("data-name");
        console.log(userPick);
        if (userPick === allQuestions[index].a) {
           correct++;
           index++;
           $("#question").empty();
           $("#answers").empty();
           $("#question-container").text("Out of this world!");
        }

        else {
            $("#question-container").text("INCORRECT! The correct answer was: " + allQuestions[index].a);
            incorrect++;
            index++;
        }

        if (index  > allQuestions.length - 1) {
            clearInterval(timer);
            endGame();
        }  
        
        else {
            clearInterval(timer);
            $("#question").empty();
            $("#answers").empty();
            //$("#question-container").text("Time's Up! The correct answer was " + allQuestions[index].a);
            
            setTimeout(function() {
                $("#question-container").empty();
                changeQuestion();
   
            }, 3000);
        
        }   
})
