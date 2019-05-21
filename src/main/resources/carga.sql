-- create categories
use trivia_dev;
INSERT INTO trivia_dev.categories (num_category) VALUES ('1');
INSERT INTO trivia_dev.categories (num_category) VALUES ('2');
INSERT INTO trivia_dev.categories (num_category) VALUES ('3');
INSERT INTO trivia_dev.categories (num_category) VALUES ('4');
INSERT INTO trivia_dev.categories (num_category) VALUES ('5');
INSERT INTO trivia_dev.categories (num_category) VALUES ('6');

SELECT * FROM trivia_dev.games;
SELECT * FROM trivia_dev.users;
SELECT * FROM trivia_dev.questions;
SELECT * FROM trivia_dev.options;
SELECT * FROM trivia_dev.answers;