DROP DATABASE IF EXISTS Questions_db;

CREATE DATABASE Questions_db;
USE Questions_db;

id INT AUTO_INCREMENT NOT NULL,
question_text VARCHAR(225),
choiceOne VARCHAR(225),
choiceTwo VARCHAR(225),
choiceThree VARCHAR(225),
choiceFour VARCHAR(225),
questionFive VARCHAR(225),
question_category VARCHAR(225),
user_score INT NOT NULL,
disclaimer VARCHAR(225),
createdAt TIMESTAMP NOT NULL,
PRIMARY KEY (id)
);

USE ???;


SELECT * FROM questions;

ALTER TABLE questions MODIFY COLUMN createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;