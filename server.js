// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var db = require("./models");
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


  
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  db.Questions.create({
  question_text: "Smallest United States by Land Mass",
  choiceOne: "Rhode Island",
  choiceTwo: "Delware",
  choiceThree: "Connecticut",
  choiceFour: "New Jersey",
  choiceFive: "New Hampshire",
  question_category: "Category 1",
  user_score: 0,
  disclaimer: "N/A"
})

  db.Questions.create({
  question_text: "Largest Militaries in the World (by Expenditure)",
  choiceOne: "United States",
  choiceTwo: "China",
  choiceThree: "Saudi Arabia",
  choiceFour: "United Kingdom (Britain)",
  choiceFive: "Russia",
  question_category: "Category 1",
  user_score: 0,
  disclaimer: "Based of national military budgets of 2015"
})
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
