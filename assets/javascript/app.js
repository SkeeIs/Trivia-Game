
//global variables including correct, incorrect, timePerQuestion, timeCount, 
var correct = 0;
var incorrect = 0;
var timeCount = 3;
var timer;
var index = 0;
$("#question").hide();
$("#answers").hide();
$("#results").hide();
//start countdown function that clears interval, sets timeCount = timePerQuestion, calls decrement function, output to time-left div
function startCountdown() {
    timeCount = 3;
    $("#time-left").html("Time Left: " + timeCount);
    timer = setInterval(function(){
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
//stop countdown function that clears interval
function stopCountdown() {
    clearInterval(timer);
    //add alert or .html letting user know time is up
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
        $("#answers").append(allQuestions[index].p[i]);
    }
    index++;

}
//endGame function that calculates questions answered correctly vs incorrectly vs unanswered & returns to html for x amount of time, then changes to start button for replayability
function endGame() {
    stopCountdown();
    $("#question").empty();
    $("#answers").empty();
    $("#results").show();
    $("#incorrect").html("Incorrect: " + incorrect);
    $("#correct").html("Correct: " + correct);
}

//on click of start button "start screen" gone & first question + timer displays instead
$("#start-button").on("click", function() {
    changeQuestion();
    $("#start-button").hide();
    $("#question").show();
    $("#answers").show();
})
//on click of answer, stores user input, calls changeQuestion function

