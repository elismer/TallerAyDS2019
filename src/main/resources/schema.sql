CREATE DATABASE IF NOT EXISTS trivia_dev;

use trivia_dev;

CREATE TABLE IF NOT EXISTS users (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  username VARCHAR(56) NOT NULL,
  password VARCHAR(56),
  admin BOOLEAN,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS questions (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  user_id int(11),
  description VARCHAR(255) NOT NULL,
  active BOOLEAN,
  created_at DATETIME,
  updated_at DATETIME
);


CREATE TABLE IF NOT EXISTS options (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  question_id int(11),
  description VARCHAR(255) NOT NULL,
  correct BOOLEAN,
  created_at DATETIME,
  updated_at DATETIME
);
