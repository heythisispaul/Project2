$(document).ready(function() {
  /* global moment */
  // question Container holds all of our questions
  var questContainer = $(".question-container");
  var questCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleQuestDelete);
  $(document).on("click", "button.edit", handleQuestEdit);
  questCategorySelect.on("change", handleCategoryChange);
  var questions;

  // This function grabs questions from the database and updates the view
  function getQuestions(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/questions" + categoryString, function(data) {
      console.log("Questions", data);
      questions = data;
      if (!questions || !questions.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete questions var id = $(this).data("id");
  function deleteQuestion(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/questions/" + id
    })
    .done(function() {
      getQuestions(questCategorySelect.val());
    });
  }

  // Getting the initial list of questions
  getQuestions();
  // InitializeRows handles appending all of our constructed question inside HTML
  // questContainer
  function initializeRows() {
    questContainer.empty();
    var questionsToAdd = [];
    for (var i = 0; i < questions.length; i++) {
      questionsToAdd.push(createNewRow(questions[i]));
    }
    questContainer.append(questionsToAdd);
  }

  // This function constructs a question's HTML
  function createNewRow(questions) {
    var newQuestPanel = $("<div>");
    newQuestPanel.addClass("panel panel-default");
    var newQuestPanelHeading = $("<div>");
    newQuestPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newQuestTitle = $("<h3>");
    var newQuestDate = $("<small>");
    var newQuestCategory = $("<h3>");
    newQuestCategory.text(questions.question_category);
    newQuestCategory.css({
      // float: "right",
      "font-weight": "700",
      "margin-top":
      "10px"
    });
    var newQuestPanelBody = $("<div>");
    newQuestPanelBody.addClass("panel-body");
    newQuestTitle.text(questions.question_text + " ");
    
    var newQuest_a1 = $("<p>");
    newQuest_a1.text(questions.choiceOne);
    var newQuest_a2 = $("<p>");
    newQuest_a2.text(questions.choiceTwo);
    var newQuest_a3 = $("<p>");
    newQuest_a3.text(questions.choiceThree);
    var newQuest_a4 = $("<p>");
    newQuest_a4.text(questions.choiceFour);
    var newQuest_a5 = $("<p>");
    newQuest_a5.text(questions.choiceFive);
    var newQuest_ca = $("<p>");
    newQuest_ca.text(questions.correctAnswer);
    var newQuest_score = $("<p>");
    newQuest_score.text(questions.user_score);
    var newQuest_disc = $("<p>");
    newQuest_disc.text(questions.disclaimer);
    
    var formattedDate = new Date(questions.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newQuestDate.text(formattedDate);
    newQuestTitle.append(newQuestDate);
    newQuestPanelHeading.append(deleteBtn);
    newQuestPanelHeading.append(editBtn);
    newQuestPanelHeading.append(newQuestTitle);
    newQuestPanelHeading.append(newQuestCategory);

    newQuestPanelBody.append(newQuest_a1);
    newQuestPanelBody.append(newQuest_a2);
    newQuestPanelBody.append(newQuest_a3);
    newQuestPanelBody.append(newQuest_a4);
    newQuestPanelBody.append(newQuest_a5);
    newQuestPanelBody.append(newQuest_ca);
    newQuestPanelBody.append(newQuest_score);
    newQuestPanelBody.append(newQuest_disc);

    newQuestPanel.append(newQuestPanelHeading);
    newQuestPanel.append(newQuestPanelBody);
    newQuestPanel.data("Question", questions);
    return newQuestPanel;
  }

  // This function figures out which question we want to delete and then calls
  // deleteQuestion
  function handleQuestDelete() {
    var currentQuest = $(this)
      .parent()
      .parent()
      .data("Question");
    deleteQuestion(currentQuest.id);
  }

  // This function figures out which question we want to edit and takes it to the
  // Appropriate url
  function handleQuestEdit() {
    var currentQuest = $(this)
      .parent()
      .parent()
      .data("Question");
    window.location.href = "/add?question_id=" + currentQuest.id;
  }

  // This function displays a message when there are no questions
  function displayEmpty() {
    questContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No questions yet for this category, navigate <a href='/add'>here</a> in order to create a new question.");
    questContainer.append(messageh2);
  }

  // This function handles reloading new questions when the category changes
  function handleCategoryChange() {
    var newQuestCategory = $(this).val();
    getQuestions(newQuestCategory);
  }

});
