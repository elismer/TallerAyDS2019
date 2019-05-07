use trivia_dev;

-- CREATE ADMIN USER
INSERT INTO users (id, username, password, admin)
SELECT * FROM (SELECT 1, 'aturing', 'turing', true) AS tmp
WHERE NOT EXISTS (
    SELECT username FROM users WHERE username = 'aturing'
) LIMIT 1;


-- CREATE QUESTIONS
INSERT INTO questions (id, description, user_id, active)
SELECT * FROM (SELECT 2, 'Q1', 1, true) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM questions WHERE description = 'Q1'
) LIMIT 1;

INSERT INTO questions (id, description, user_id, active)
SELECT * FROM (SELECT 3, 'Q2', 1, true) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM questions WHERE description = 'Q2'
) LIMIT 1;

INSERT INTO questions (id, description, user_id, active)
SELECT * FROM (SELECT 4, 'Q3', 1, true) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM questions WHERE description = 'Q3'
) LIMIT 1;

-- CREATE OPTIONS
INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 5, 'O11', 1, true) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O11'
) LIMIT 1;

INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 6, 'O12', 1, false) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O12'
) LIMIT 1;

INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 7, 'O13', 1, false) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O13'
) LIMIT 1;


INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 8, 'O21', 1, false) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O21'
) LIMIT 1;

INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 9, 'O22', 1, true) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O22'
) LIMIT 1;

INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 10, 'O23', 1, false) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O23'
) LIMIT 1;


INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 11, 'O31', 1, false) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O31'
) LIMIT 1;

INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 12, 'O32', 1, false) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O32'
) LIMIT 1;

INSERT INTO options (id, description, question_id, correct)
SELECT * FROM (SELECT 13, 'O33', 1, true) AS tmp
WHERE NOT EXISTS (
    SELECT description FROM options WHERE description = 'O33'
) LIMIT 1;
