// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

var qBank = require("../public/js/questionBank2");

// Routes
// ============================================================= 
module.exports = function(app) {

  // GET route for getting all of the questions
  app.get("/api/questions", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Questions.findAll({}).then(function(dbQuestions) {
      res.json(dbQuestions);
    });
  });

  // POST route for saving a new question
  app.post("/api/questions", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. 
    db.Questions.create({
      question_text: req.body.question_text,
      choiceOne: req.body.choiceOne,
      choiceTwo: req.body.choiceTwo,
      choiceThree: req.body.choiceThree,
      choiceFour: req.body.choiceFour,
      choiceFive: req.body.choiceFive,
      question_category: req.body.question_category,
      user_score: req.body.user_score,
      disclaimer: req.body.disclaimer
    }).then(function(dbQuestions) {
      res.json(dbQuestions);
    });
  });

  // DELETE route for deleting questions. We can get the id of the question to be deleted from
  // req.params.id
  app.delete("/api/questions/:id", function(req, res) {
    // We just have to specify which question we want to destroy with "where"
    db.Questions.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuestions) {
      res.json(dbQuestions);
    });

  });

  // PUT route for updating questions. We can get the updated question data from req.body
  app.put("/api/questions", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Questions.update({
      question_text: req.body.question_text,
      complete: req.body.complete,
      choiceOne: req.body.choiceOne,
      choiceTwo: req.body.choiceTwo,
      choiceThree: req.body.choiceThree,
      choiceFour: req.body.choiceFour,
      choiceFive: req.body.choiceFive,
      question_category: req.body.question_category,
      user_score: req.body.user_score,
      disclaimer: req.body.disclaimer
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbQuestions) {
      res.json(dbQuestions);
    });
  });
};
