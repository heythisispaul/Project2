$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBo2iJfTMTmZk2QVZun4OsVTUQGfkB5Ks",
    authDomain: "battlefeud.firebaseapp.com",
    databaseURL: "https://battlefeud.firebaseio.com",
    projectId: "battlefeud",
    storageBucket: "battlefeud.appspot.com",
    messagingSenderId: "351121516171"
  };
  firebase.initializeApp(config);

var database = firebase.database();
// var pushFolder = database.child("pushedResponse"); -- I would eventually like the data pushes and game scores to be stored in different folders.
var randomQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
var strikeCount = 0;

// Function that displays the question information on the main screen and sets everything to unanswered:
function setQuestion(question) {
	$("#qDisplay").html("<h1><strong>" + question.title + "</strong></h1>");
	$("#display1").html("<h2 class='unanswered' id='space1'>" + question.answerOne + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
	$("#display2").html("<h2 class='unanswered' id='space2'>" + question.answerTwo + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
	$("#display3").html("<h2 class='unanswered' id='space3'>" + question.answerThree + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
	$("#display4").html("<h2 class='unanswered' id='space4'>" + question.answerFour + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
	$("#display5").html("<h2 class='unanswered' id='space5'>" + question.answerFive + "</h2>").removeClass("btn-warning").addClass("btn-primary").val("");
	$("#questionNumber").text("Question #" + question.number);
	$("#strikeDisplay").html("");
	strikeCount = 0;
}

//displays a question on load:
setQuestion(randomQuestion);

	// Reruns setQuestion to display a new question when "Random Question" button is pressed:
	$("#randomQuestion").on("click", function(){
		setQuestion(randomQuestion);
		randomQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
	});

	//Callback function that runs when a number is entered in the "Question Number" box and "Go" is pressed:
	$("#submit").on("click", function() {
		let selected = $("#qNumber").val();
		setQuestion(questionBank[selected - 1]);
	});

	//Will also run if 'Enter' is pressed in the text box:
	$('#qNumber').bind("enterKey",function(){
		let selected = $("#qNumber").val();
		setQuestion(questionBank[selected - 1]);
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
		if(this.value != "clicked"){
			firebaseSend(this);
		}
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

	// Function that sends the clicked button's info (ID) to Firebase:
	function firebaseSend(clicked){
		database.ref().push({
			clicked: clicked.id
		});
	};

	// GAME HOST SCREEN:

	function questionDisplay() {
		//Runs through the length of the array, and injects this HTML and information for each question:
		for (let i = 0; i <= questionBank.length; i++) {
			console.log(questionBank[i].title);
			$("#displayZone").append('<div class="panel panel-primary"><div class="panel-heading text-center"><h4><strong>' + questionBank[i].title + '</strong></h4></div><div class="panel panel-body"><button class="btn btn-primary btn-block">' +questionBank[i].answerOne + '</button><button class="btn btn-primary btn-block">' +questionBank[i].answerTwo + '</button><button class="btn btn-primary btn-block">' +questionBank[i].answerThree + '</button><button class="btn btn-primary btn-block">' + questionBank[i].answerFour + '</button><button class="btn btn-primary btn-block">' + questionBank[i].answerFive + '</button><h4>Question Number: ' + questionBank[i].number + '</h4><h4>Disclaiming information: ' +questionBank[i].disclaimers + '</div></div>');
		}
	}

	questionDisplay();

	database.ref().on("child_added", function(snapshot) {
		console.log(snapshot.val().clicked);
		answerClick(snapshot.val().clicked);
	})
});