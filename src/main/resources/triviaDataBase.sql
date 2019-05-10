
CREATE TABLE if not exists users (
  id  int(11) NOT NULL auto_increment PRIMARY KEY,
  dni int(8) NOT NULL,
  name_user VARCHAR(56) NOT NULL,
  last_name VARCHAR(56) NOT NULL,
  password VARCHAR(24) NOT NULL,
  admin BOOLEAN default FALSE,
  year ENUM ('1','2','3','4','5','6','graduated','noStudent') default NULL,
  UNIQUE (dni),
  created_at DATETIME,
  updated_at DATETIME
);
  

CREATE TABLE if not exists categories (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  numCategory ENUM ('1','2','3','4','5','6') NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
  );

CREATE TABLE if not exists levels (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  number_level ENUM ('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  categories_id int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  );
  

CREATE TABLE if not exists questions(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(140) NOT NULL,
  categories_id int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  );
  

CREATE TABLE if not exists comments (
  id  int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(140) NOT NULL,
  users_id int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,

CREATE TABLE IF NOT EXISTS options(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(50),
  type ENUM('CORRECT','INCORRECT','UNKNOW') default 'UNKNOW',
  questions_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS games(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  users_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS answers(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  options_id int NOT NULL,
  games_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stats(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  users_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;
