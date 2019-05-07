
CREATE TABLE if not exists users (
  id  int(11) NOT NULL auto_increment PRIMARY KEY,
  dni int(8) NOT NULL,
  name_user VARCHAR(56) NOT NULL,
  lastName VARCHAR(56),
  password VARCHAR(24) NOT NULL,
  UNIQUE (dni),
  created_at DATETIME,
  updated_at DATETIME
  );
  

CREATE TABLE if not exists categories (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  numCategory ENUM ('1','2','3','4','5','6'),
  created_at DATETIME,
  updated_at DATETIME
  );

CREATE TABLE if not exists levels (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  number_level ENUM ('1','2','3','4','5','6','7','8','9','10'),
  id_cat int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fklevel FOREIGN KEY (id_cat)
	REFERENCES categories (id)
  );
  

CREATE TABLE if not exists questions(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(140),
  id_cate int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fkquestion FOREIGN KEY (id_cate)
	REFERENCES categories (id)
  );
  

CREATE TABLE if not exists comments (
  id  int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(140),
  id_user int(11),
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fkcomment FOREIGN KEY (id_user)
	REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS options(
  id int(11) auto_increment PRIMARY KEY,
  description VARCHAR(50),
  type ENUM('CORRECT','INCORRECT') default 'INCORRECT',
  id_question int NOT NULL,
  CONSTRAINT fkoptions FOREIGN KEY (id_question) 
	REFERENCES questions (id), 
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS games(
  id int(11) auto_increment PRIMARY KEY,
  id_user int,
  CONSTRAINT fkgame FOREIGN KEY (id_user) 
  	REFERENCES users (id),
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS answers(
  id int(11) auto_increment PRIMARY KEY,
  id_option int NOT NULL,
  id_game int NOT NULL,
  CONSTRAINT fkanswer_1 FOREIGN KEY (id_option) 
  	REFERENCES options (id),
  CONSTRAINT fkanswer_2 FOREIGN KEY (id_game) 
  	REFERENCES games (id),
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stats(
  id int(11) auto_increment PRIMARY KEY,
  id_user int,
  CONSTRAINT fkstat FOREIGN KEY (id_user) 
  	REFERENCES users (id),
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;
