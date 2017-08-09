$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?question_id=23)
  var url = window.location.search;
  var question_id;
  // Sets a flag for whether or not we're updating a question to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the question id from the url
  // In localhost:8080/add?question_id=1, question Id is 1
  if (url.indexOf("?question_id=") !== -1) {
    question_id = url.split("=")[1];
    getQuestData(question_id);
  }

  // Getting jQuery references to the post a1....a5, title, add form, ca and category select
  var titleInput = $("#title");
  var a1_Input = $("#a1");
  var a2_Input = $("#a2");
  var a3_Input = $("#a3");
  var a4_Input = $("#a4");
  var a5_Input = $("#a5");
  var ca_Input = $("#answer");
  var addForm = $("#add");
  var disclaimer_Input = $("#cya");
  var questCategorySelect = $("#category");
  // Giving the questCategorySelect a default value
  questCategorySelect.val("Category 1");
  // correctAnswer.val("Need Answer");
  // Adding an event listener for when the form is submitted
  $(addForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the question if we are missing a1...a5, ca or a title
    if (!titleInput.val().trim() || !a1_Input.val().trim() || !a2_Input.val().trim() || !a3_Input.val().trim() || !a4_Input.val().trim() || !a5_Input.val().trim() || 
      !ca_Input.val().trim() || !questCategorySelect.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newQuest = {
      question_text: titleInput.val().trim(),
      choiceOne: a1_Input.val().trim(),
      choiceTwo: a2_Input.val().trim(),
      choiceThree: a3_Input.val().trim(),
      choiceFour: a4_Input.val().trim(), 
      choiceFive: a5_Input.val().trim(),
      correctAnswer: ca_Input.val(),
      question_category: questCategorySelect.val(),
      disclaimer: disclaimer_Input.val().trim()
    };

    console.log(newQuest);

    // If we're updating a question run updateQuest to update a post
    // Otherwise run submitQuest to create a whole new question
    if (updating) {
      newQuest.id = question_id;
      updateQuest(newQuest);
    }
    else {
      submitQuest(newQuest);
    }
  });

  // Submits a new question and brings user to ?? page upon completion
  function submitQuest(Question) {
    $.post("/api/questions/", Question, function() {
      window.location.href = "/allquestions";
    });
  }

  // Gets question data for a particular question if we're editing
  function getQuestData(id) {
    $.get("/api/questions/" + id, function(data) {
      if (data) {
        // If this question exists, prefill our add form with its data
        titleInput.val(data.question_text);
        a1_Input.val(data.choiceOne);
        a2_Input.val(data.choiceTwo);
        a3_Input.val(data.choiceThree);
        a4_Input.val(data.choiceFour);
        a5_Input.val(data.choiceFive);
        ca_Input.val(data.correctAnswer);
        questCategorySelect.val(data.question_category);
        disclaimer_Input.val(data.disclaimer);
        // If we have a question with this id, set a flag for us to know to update the question
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given question, bring user to the ?? page when done
  function updateQuest(question) {
    $.ajax({
      method: "PUT",
      url: "/api/questions",
      // data: questions
      data: question
    })
    .done(function() {
      window.location.href = "/allquestions";
    });
  }
});
