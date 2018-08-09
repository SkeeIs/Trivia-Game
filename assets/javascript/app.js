
//global variables including correct, incorrect, timePerQuestion, timeCount, 
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeCount = 15;
var timer;
var timesUp;
var index = 0;
$("#question").hide();
$("#answers").hide();
$("#results").hide();

//stop countdown function that clears interval
function stopCountdown() {
    clearInterval(timer);
    unanswered++;
    //add timer for below text to display for 3 sec before changeQuestion is called
    
    timer = setInterval(function() {
        timeCount --;
        if (timeCount === 0) {
        //    timesUp = setInterval(function() {
        //         $("#question-container").val("Time's Up! Get ready for the next question!");
        //     }, 3000);
            changeQuestion();
            if (index  > allQuestions.length) {
                clearInterval(timer);
                endGame();
            }  
        }
    }, 1000);
}

//reset function that resets all variables, "start screen"
function reset() {
    correct = 0;
    incorrect = 0;
    $("#start-button").show();
}
//changeQuestion function that condition checks there are questions left in our object, changes html, calls start countdown
function changeQuestion() {
    startCountdown();
    $("#question").empty();
    $("#answers").empty();
    $("#question").html(allQuestions[index].q);
    for (var i = 0; i < allQuestions[index].p.length; i++) {
      $("#answers").append($("<div>")).text(allQuestions[index].p[i]);
      console.log(allQuestions[index].p[i]);
      //newAnswerDiv.attr("data-name", allQuestions[index].p[i]);
      //newAnswerDiv.text(allQuestions[index].p[i]);
      //$("#answers").append(newAnswerDiv);
      //console.log(newAnswerDiv);
    }
    index++;

}
//endGame function that calculates questions answered correctly vs incorrectly vs unanswered & returns to html for x amount of time, then changes to start button for replayability
function endGame() {
    stopCountdown();
    $("#question").empty();
    $("#answers").empty();
    $("#results").show();
    $("#results").append($("<p>").text("Correct: " + correct));
    $("#results").append($("<p>").text("Incorrect: " + incorrect));
    $("#results").append($("<p>").text("Unanswered: " + unanswered));
}

//start countdown function that clears interval, sets timeCount = timePerQuestion, calls decrement function, output to time-left div
function startCountdown() {
    timeCount = 3;
    $("#time-left").html("Time Left: " + timeCount);
    timer = setInterval(function() {
        timeCount --;
        $("#time-left").html("Time Left: " + timeCount);
        if (timeCount === 0) {
            stopCountdown();
            changeQuestion();
            incorrect ++;
            console.log(index);
            console.log(allQuestions.length);
            if (index  > allQuestions.length) {
                clearInterval(timer);
                endGame();
            }  
        }
    }, 1000);
}

//on click of start button "start screen" gone & first question + timer displays instead
$("#start-button").on("click", function() {
    changeQuestion();
    $("#start-button").hide();
    $("#question").show();
    $("#answers").show();
})
//on click of answer, stores user input, calls changeQuestion function
// $("#answers").on("click", function() {
//     var userPick = value from selected answer;

        //if (userPick === allQuestions[index].a) {
          //correct++;
          //$("#question-container").val("CORRECT!");
        //}

        //else if (userPick !== allQuestions[index].a) {
            //incorrect++;
            //$("#question-container").val("INCORRECT! The correct answer was: " + allQuestions[index].a);
        //}
// })
