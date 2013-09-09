$(document).ready(function() {
runProgram();
function runProgram(){
var scoreAry = [];
var questions = [
{ q: "What is the name of the Paranoid Android in Douglas Adams’ ‘Hitchhiker’s Guide to the Galaxy’?", s: ["Andy", "Bob", "Susan", "Marvin"], a: "Marvin", correct: 0 },
{ q: "In Monopoly, the green set consists of Pacific Avenue, North Carolina Avenue and which other?", s: ["Oxford Street", "Pennsylvania Avenue", "Park Place", "New York Avenue"], a: "Pennsylvania Avenue", correct: 0 },
{ q: "3. Who created Snoopy?", s: ["George Herriman", "Charles M. Schulz", "Jim Davis", " Garry Trudeau"], a: "Charles M. Schulz", correct: 0 },
{ q: "What was the name of the tallest Warner brother in Animaniacs?", s: ["Dot", "Yakko", "Wacko", "Pinky"], a: "Yakko", correct: 0 },
{ q: "After how many years would you celebrate your crystal anniversary?", s: ["5", "10", "15", "20"], a: "15", correct: 0 }
{ q: "Which sign of the zodiac would you be if your birthday was on October 18?", s: ["Virgo", "Cancer", "Libra", "Pices"], a: "Libra", correct: 0 }
{ q: "Which birthstone is associated with the month of May?", s: ["Diamond", "Peridot", "Sapphire", "Emerald"], a: "Emerald", correct: 0 }
{ q: "What is the capital city of Afghanistan?", s: ["Istanbul", "Constantinople", "Kabul", "Ghazni"], a: "Kabul", correct: 0 }
{ q: "In which country is Mount Everest?", s: ["The Himalayas", "Nepal", "Tibet", "India"], a: "Nepal", correct: 0 }
{ q: "What is the abbreviation for Potassium in the Periodic Table of Elements?", s: ["Po", "Pa", "K", "Ps"], a: "K", correct: 0 }
];

var counter = questions.length;

//This grabs the question and answer data from the questions array and appends it to the content container:
function setUp(dataSet) {
for (var i = 0; i < dataSet.length; i++) {
$("#questions").append('<form id="'+i+'"><h3>'+dataSet[i].q+'</h3>'+formatRadioButtons(dataSet[i].s, i)+'<button type="submit" class="next">NEXT QUESTION &#8594;</button></form>');
}
//This hides all the newly created questions:
for (var i=dataSet.length; i > 0; i--) {
$('#'+i).hide();
}
}
//This grabs the answer choices from the questions array and returns them to setUp() on line 19:
function formatRadioButtons(ary, qNum) { //Example of ary would be ["Robert Downey, Jr.", "Sarah Palin", "Elon Musk"] from line 7
var answers = [];
for (i=0; i < ary.length; i++) {
answers.push('<label><input type="radio" name="'+qNum+'" value="'+ary[i]+'">'+ary[i]+'</label>');
}
return answers.join(" ");
}
//This sums the correct values in the questions array:
function addUpScore(dataSet) {
return scoreAry.reduce(function(previousValue, currentValue, index, array){ //scoreAry was initialized on line 5.
return previousValue + currentValue;
});
}
//This checks the user's answer and updates his or her score:
function checkAnswer(answer, qNum, dataSet) {
if (answer == dataSet[qNum].a) {
dataSet[qNum].correct = 1;
scoreAry.push(dataSet[qNum].correct); //scoreAry was initialized on line 5. This pushes the value of 1 to the array.
$(".instruction-text").text('You\'re score is: ' + addUpScore(dataSet) + ' correct out of '+ dataSet.length + '.');
}
else {
scoreAry.push(dataSet[qNum].correct); //scoreAry was initialized on line 5. This pushes the value of 0 to the array.
$(".instruction-text").text('You\'re score is: ' + addUpScore(dataSet) + ' correct out of '+ dataSet.length + '.');
}
}
//This returns your final score:
function scoreMsg(percentage){
var msg = null;
$("header").removeClass("normal");
$(".title").css("color", "white");
if (percentage <=100 && percentage >= 80) {
msg = "Great job!";
$("header").addClass("great-job");
return msg;
}
else if (percentage <=79 && percentage >= 50) {
msg = "Not bad!";
$("header").addClass("not-bad");
return msg;
}
else {
msg = "You don't get out much do you?";
$("header").addClass("get-out-more");
return msg;
}
}
setUp(questions);
$(".next").click(function(event){
event.preventDefault(); //This stops the form from submitting
var qNum = $(this).closest("form").attr("id"); //This gives us the question number
var userInput = $('input[name='+qNum+']:radio:checked').val(); //This grabs the user's selected answer
if (counter > 1) {
checkAnswer(userInput, qNum, questions);
$("#"+qNum).hide();
$("#"+qNum).next().show();
counter--;
}
else if (counter == 1) {
checkAnswer(userInput, qNum, questions);
var percentage = (100/questions.length)*addUpScore(questions);
$(".instruction-text").text('You\'re final score is: '+percentage+'%');
$("#question-block").find("form").remove();
$(".content-container").append('<section class="final-score center-text"><p>'+scoreMsg(percentage)+'</p><br/><form><button class="start-over">&#8635;</button></form></section>');
}
else {
return false;
}
});
}
});
