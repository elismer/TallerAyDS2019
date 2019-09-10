TRUNCATE `trivia_dev`.`games_options`;

UPDATE `trivia_dev`.`stats` 
SET	cant_total_questions=0, 
	cant_correct_questions=0, 
	cant_incorrect_questions=0, 
    cant_unknown_questions=0
WHERE id>0;