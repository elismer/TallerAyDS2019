CREATE TABLE users (
  id_user  int(11) NOT NULL auto_increment PRIMARY KEY,
  dni int(8) NOT NULL,
  name_user VARCHAR(56) NOT NULL,
  lastName VARCHAR(56),
  UNIQUE (dni),
  created_at DATETIME,
  updated_at DATETIME,
  );

CREATE TABLE levels (
  id_level int(11) NOT NULL auto_increment PRIMARY KEY,
  number_level ENUM (1,2,3,4,5,6,7,8,9,10),
  id_category int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fkcategory FOREIGN KEY (id_category)
	REFERENCES categories,
  );
  
CREATE TABLE categories (
  id_category int(11) NOT NULL auto_increment PRIMARY KEY,
  numCategory ENUM (1,2,3,4,5,6),
  created_at DATETIME,
  updated_at DATETIME,
  );
  
CREATE TABLE questions(
  id_questio int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(140),
  id_category int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fkcategory FOREIGN KEY (id_category)
	REFERENCES categories,
  );
  
CREATE TABLE comments (
  id_comment  int(11) NOT NULL auto_increment PRIMARY KEY,
  descriptions VARCHAR(140),
  id_user int(11),
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fkuser FOREIGN KEY (id_user)
	REFERENCES users,
);

CREATE TABLE IF NOT EXISTS answers(
  id int(11) auto_increment PRIMARY KEY,
  id_option int NOT NULL,
  id_game int NOT NULL,
  KEY FK_answers_1 (id_option),
  KEY FK_answers_2 (id_game),
  CONSTRAINT FK_answers_1 foreign key(id_option) REFERENCES options (id),
  CONSTRAINT FK_answers_2 foreign key(id_game) REFERENCES games (id),
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS options(
  id int(11) auto_increment PRIMARY KEY,
  descrip VARCHAR(50),
  tipo ENUM('CORRECT','INCORRECT','UNKNOW') default 'UNKNOW',
  id_question int NOT NULL,
  KEY FK_options_1 (id_question),
  constraint FK_options_1 foreign key(id_question) references questions (id), 
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS games(
  id int(11) auto_increment PRIMARY KEY,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stasts(
  id int(11) auto_increment PRIMARY KEY,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
)ENGINE=InnoDB;