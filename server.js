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

// Preloaded questions:
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

  db.Questions.create({
  question_text: "Busiest Airports in the United States",
  choiceOne: "Hartsfield-Jackson (Atlanta)",
  choiceTwo: "Los Angeles International",
  choiceThree: "O'Hare International (Chicago)",
  choiceFour: "Dallas/Fortworth International",
  choiceFive: "JFK International (NYC)",
  question_category: "Category 1",
  user_score: 0,
  disclaimer: "Data from 2015, total number of passengers enplaned and deplaned."
})

  db.Questions.create({
  question_text: "Highest Grossing Movies (Inflation Unadjusted)",
  choiceOne: "Avatar",
  choiceTwo: "Titanic",
  choiceThree: "Star Wars: The Force Awakens",
  choiceFour: "Jurassic World",
  choiceFive: "The Avengers",
  question_category: "Category 1",
  user_score: 0,
  disclaimer: "From May, 2017. Total worldwide Gross"
})

  db.Questions.create({
  question_text: "Most Populated Countries",
  choiceOne: "China",
  choiceTwo: "India",
  choiceThree: "United States",
  choiceFour: "Indonesia",
  choiceFive: "Brazil",
  question_category: "Category 1",
  user_score: 0,
  disclaimer: "Includes territories - As of June, 2017"
})

  db.Questions.create({
  question_text: "Restaurant Chains with Most Locations",
  choiceOne: "Subway",
  choiceTwo: "McDonald's",
  choiceThree: "Starbucks",
  choiceFour: "Pizza Hut",
  choiceFive: "Burger King",
  question_category: "Category 1",
  user_score: 0,
  disclaimer: "Worldwide as of 2016."
})

  db.Questions.create({
  question_text: "NBA Player with Most MVP Awards",
  choiceOne: "Kareem Abdul-Jabbar",
  choiceTwo: "Bill Russell",
  choiceThree: "Michael Jordan",
  choiceFour: "Wilt Chamberlain",
  choiceFive: "Lebron James",
  question_category: "Category 1",
  user_score: 0,
  disclaimer: "Regular season only - Ties broken by first to accomplish."
})


  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
