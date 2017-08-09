// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads instructions
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Route to the game host page
  app.get("/gamehost", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gamemaster.html"));
  });

  // Route to main display page 
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/maindisplay.html"));
  });

  // Route to add a question 
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addQuestion.html"));
  });

  // Route to show all question 
  app.get("/allquestions", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/showQuestions.html"));
  });



};
