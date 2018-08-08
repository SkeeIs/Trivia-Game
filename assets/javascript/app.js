//global variables including correct, incorrect, timePerQuestion, timeCount, 
var correct = 0;
var incorrect = 0;
var timePerQuestion = 10;
var timeCount;
//start countdown function that clears interval, sets timeCount = timePerQuestion, calls decrement function, output to time-left div
function startCountdown() {
    clearInterval(timeCount);
    timeCount = timePerQuestion;
}
//stop countdown function that clears interval
function stopCountdown() {
    clearInterval(timeCount);
}
//decrement function that reduces timeCount, ???
function decrement() {
    timeCount --;
}
//reset function that resets all variables, "start screen"

//changeQuestion function that condition checks there are questions left in our object, changes html, calls start countdown

//endGame function that calculates questions answered correctly vs incorrectly vs unanswered & returns to html for x amount of time, then changes to start button for replayability

//document.ready

//reset game

//on click of start button "start screen" gone & first question + timer displays instead

//on click of answer, stores user input, calls changeQuestion function

