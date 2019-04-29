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