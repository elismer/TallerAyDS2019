CREATE DATABASE IF NOT EXISTS trivia_dev;

CREATE TABLE if not exists users (
  id  int(11) NOT NULL auto_increment PRIMARY KEY,
  nick_name VARCHAR (56) NOT NULL,
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
  num_category ENUM ('1','2','3','4','5','6') NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
  );

CREATE TABLE if not exists levels (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  number_level ENUM ('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  category_id int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
  );
  

CREATE TABLE if not exists questions(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(140) NOT NULL,
  category_id int(11) NOT NULL,
  active BOOLEAN,
  answered BOOLEAN,
  created_at DATETIME,
  updated_at DATETIME
  );
  

CREATE TABLE if not exists comments (
  id  int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(140) NOT NULL,
  user_id int(11) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
  );

CREATE TABLE IF NOT EXISTS options(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  description VARCHAR(50),
  type ENUM('CORRECT','INCORRECT','UNKNOW') default 'UNKNOW',
  question_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS games(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  playing BOOLEAN default FALSE,
  user_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS games_options(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  option_id int NOT NULL,
  game_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stats(
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  user_id int NOT NULL,
  created_at DATETIME,
  updated_at DATETIME
)ENGINE=InnoDB;
