use trivia_dev;
INSERT INTO questions (description, category_id, active,answered)
VALUES ('La posología de Enrofloxacina es:', '2',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('1,25 a 2,5 mg./Kg. cada 24 Hs. I.M.', '1', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('6 mg./Kg. cada 12 Hs. I.M', '1', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('7,5 mg./Kg. cada 12 Hs. I.M.', '1', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('2,5 a 5 mg./Kg. cada 24 Hs. I.M.', '1', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '1', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('Diarrea es signo clínico característico de:', '1',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Hemoncosis', '2', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Hidatidosis', '2', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Cenurosis', '2', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Esofagostomiasis', '2', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '2', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('Haemonchus spp ejerce su acción patógena en', '3',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('INtestino grueso', '3', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Intestino delgado', '3', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Omaso', '3', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Abomaso', '3', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '3', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('La ostertagiasis se trata con', '3',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Fipronil', '4', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Fluazuron', '4', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Toltrazuril', '4', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Albendazol', '4', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '4', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('Los signos clínicos de fascioliasis pueden ser', '3',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Ascitis', '5', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Pérdida de peso', '5', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Edema', '5', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Todas las opciones anteriores son correctas', '5', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '5', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('La fascioliasis se trata con', '4',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Albendazol', '6', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Rafoxanida', '6', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Clorsulon', '6', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Todas las opciones anteriores son correctas', '6', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '6', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('Anemia y edema son característicos de:', '4',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Cooperiasis', '7', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Dictiocaulosis', '7', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Oestrosis', '7', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Hemoncosis', '7', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '7', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('Es signo característico de dictiocaulosis:', '5',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Diarrea', '8', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Cólico', '8', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Ataxia', '8', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Tos', '8', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '8', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('Albendazol es eficaz para tratar:', '5',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Fascioliasis', '9', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Ostertagiasis', '9', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Hemoncosis', '9', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Todas son correctas', '9', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '9', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('La dosis de Ivermectina al 1% es:', '6',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('0,10 mg./Kg', '10', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('0,315 mg./Kg.', '10', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('0.630 mg./Kg', '10', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('0,20 mg./Kg', '10', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '10', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('La posología de Clorhidrato de Oxitetraciclina es:', '6',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('20 mg./Kg. cada 72 Hs. I.M.', '11', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('20 mg./Kg. cada 24 Hs. I.M', '11', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('15 mg./Kg. cada 48 Hs. S.C.', '11', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('7 a 11 mg./Kg. cada 8 a 12 Hs. E.V', '11', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '11', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('La dosis y vía de Metescopolamina es:', '2',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('0,5 mg./Kg. E.V.', '12', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('1 mg./Kg. I.M.', '12', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('2 mg./Kg.S.C.', '12', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('0,1 mg./Kg. I.M.', '12', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '12', 'UNKNOW');

INSERT INTO questions (description, category_id, active,answered)
VALUES ('Para infecciones oculares está/n indicado/s:', '1',true,false);
INSERT INTO options (description, question_id, type)
VALUES ('Oxitetraciclina ', '13', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Tilmicosina', '13', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Gentamicina', '13', 'INCORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('Todas las opciones anteriores son correctas', '13', 'CORRECT');
INSERT INTO options (description, question_id, type)
VALUES ('UNKNOW', '13', 'UNKNOW');



