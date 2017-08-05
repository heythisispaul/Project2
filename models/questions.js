module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define("questions", {

      question_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 225]
        }
      },
      choiceOne: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 225]
        }
      },
      choiceTwo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 225]
        }
      },
      choiceThree: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 225]
        }
      },
      choiceFour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 225]
        }
      },
      choiceFive: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 225]
        }
      },
      question_category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 225]
        }
      },
      correct_Answer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
      user_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
      disclaimer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 11]
        }       
      }

  });
  return Questions;
};






