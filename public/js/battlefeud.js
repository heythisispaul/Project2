$(document).ready(function() {

// console.log(questionArr);
// var database = firebase.database();

// var randomQuestion = quest[Math.floor(Math.random() * quest.length)];
// var strikeCount = 0;
var questions;
var questID;
var questionArr;
var strikeCount;

function getAllQuests(category) {
	$.get("/api/questions", function(data) {
		questionArr = data;
		// console.log(questionArr);
		// return questionArr;
	}).then(function() {
		console.log(questionArr);
	});
}

getAllQuests();

// console.log(questionArr);

// getAllQuests();

// console.log(questionArr);

// console.log(questionArr);

function getQuestID(category) {
    $.get("/api/questions/1", function(data) {
      // console.log("questions", data[0]);
	  questions = data[0];
	  console.log(questions);
	  setQuestion(questions);
      });
  	}
getQuestID();  	

	// Function that displays the question information on the main screen and sets everything to unanswered:
	function setQuestion(questions) {
		$("#qDisplay").html("<h1><strong>" + questions.question_text + "</strong></h1>");
		$("#display1").html("<h2 class='unanswered' id='space1'>" + questions.choiceOne + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
		$("#display2").html("<h2 class='unanswered' id='space2'>" + questions.choiceTwo + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
		$("#display3").html("<h2 class='unanswered' id='space3'>" + questions.choiceThree + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
		$("#display4").html("<h2 class='unanswered' id='space4'>" + questions.choiceFour + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
		$("#display5").html("<h2 class='unanswered' id='space5'>" + questions.choiceFive + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
		$("#questionNumber").text("Question #" + questions.id);
		$("#strikeDisplay").html("");
		strikeCount = 0;
	}


			//displays a question on load:
			// setQuestion(questID);

				// Reruns setQuestion to display a new question when "Random Question" button is pressed:
				$("#randomQuestion").on("click", function(){
					questID = questionArr[Math.floor(Math.random() * questionArr.length)];
					setQuestion(questID);
					console.log(questID);
				});

				//Callback function that runs when a number is entered in the "Question Number" box and "Go" is pressed:
				$("#submit").on("click", function() {
					questID = $("#qNumber").val();
					console.log(questID);
					setQuestion(questionArr[questID - 1]);
				});

				//Will also run if 'Enter' is pressed in the text box:
				$('#qNumber').bind("enterKey",function(){
					questID = $("#qNumber").val();
					console.log(questID);
					setQuestion(questionArr[questID - 1]);
				});
				$('#qNumber').keyup(function(e){
					if(e.keyCode == 13) {
					$(this).trigger("enterKey");
					}
				});

				// Passes through the clicked div, applies the appropriate class and checks which answer number to reveal
				function answerClick(answer){
					$(answer).removeClass("btn-primary").addClass("btn-warning");
					if(answer.id === "display1"){
						$("#space1").removeClass("unanswered");
						audioCorrect(answer);
					} else if(answer.id === "display2"){
						$("#space2").removeClass("unanswered");
						audioCorrect(answer);
					} else if(answer.id === "display3"){
						$("#space3").removeClass("unanswered");
						audioCorrect(answer);
					} else if(answer.id === "display4"){
						$("#space4").removeClass("unanswered");
						audioCorrect(answer);
					} else if(answer.id === "display5"){
						$("#space5").removeClass("unanswered");
						audioCorrect(answer);
					} else {
					// alert("uh oh, something went wrong. Please try again.");
					}
				};
					// Play the chime sound unless the button has already been clicked:
				function audioCorrect(clicked) {
					let correctSound = document.getElementById("correctAudio");
					correctSound.currentTime = 0;
					console.log("value of clicked div:" + clicked.value)
					if(clicked.value === ""){
						correctSound.play();
						$(clicked).val("clicked");
					}
				}

				// Displays the text, plays the chime sound, and changes the color of the answer when clicked. Also pushes response to firebase if not previously clicked:
				$("#display1, #display2, #display3, #display4, #display5").on("click", function(){
					// if(this.value != "clicked"){
					// }
					answerClick(this);
				});

				// Will perform count answer as clicked if corresponding number on keyboard is pressed:
				document.addEventListener("keydown", function(e){
					let wrongSound = document.getElementById("wrongAudio");
					wrongSound.currentTime = 0;
					if (e.keyCode === 49 || e.keyCode === 97) {
						answerClick(display1);
					} else if (e.keyCode === 50 || e.keyCode ===  98) {
						answerClick(display2);
					} else if (e.keyCode === 51 || e.keyCode === 99) {
						answerClick(display3);
					} else if (e.keyCode === 52 || e.keyCode === 100) {
						answerClick(display4);
					} else if (e.keyCode === 53 || e.keyCode === 101) {
						answerClick(display5);
					} else if (e.keyCode === 32) {
						strikeCount++;
						if (strikeCount < 4) {
						$("#strikeDisplay").append("<h2 id='strike'>X</h2>");
						wrongSound.play();
						}
					}
				});

				// Function that sends the clicked button's info (ID) to the API:
				// function apiSend(clicked){
				// 	this.ref().push({
				// 		clicked: clicked.id
				// 	});
				// };

				// GAME HOST SCREEN:

				// function questionDisplay() {
				// 	//Runs through the length of the array, and injects this HTML and information for each question:
				// 	for (let i = 0; i <= this.length; i++) {
				// 		console.log(this[i].question_text);
				// 		$("#displayZone").append('<div class="panel panel-primary"><div class="panel-heading text-center"><h4><strong>' + 
				// 			this[i].question_text + '</strong></h4></div><div class="panel panel-body"><button class="btn btn-primary btn-block">' + 
				// 			this[i].choiceOne + '</button><button class="btn btn-primary btn-block">' + 
				// 			this[i].choiceTwo + '</button><button class="btn btn-primary btn-block">' + 
				// 			this[i].choiceThree + '</button><button class="btn btn-primary btn-block">' + 
				// 			this[i].choiceFour + '</button><button class="btn btn-primary btn-block">' + 
				// 			this[i].choiceFive + '</button><h4>Question Number: ' + 
				// 			this[i].id + '</h4><h4>Disclaiming information: ' + 
				// 			this[i].disclaimers + '</div></div>');
				// 	}
				// }

				// questionDisplay();

				// this.ref().on("child_added", function(snapshot) {
				// 	console.log(snapshot.val().clicked);
				// 	answerClick(snapshot.val().clicked);
				// })
})