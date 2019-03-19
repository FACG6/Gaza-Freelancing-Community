BEGIN; 
DROP TABLE IF EXISTS field, specialization, users, proposal, requirement;

CREATE TABLE field (
	id  SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL
);

CREATE TABLE specialization (
	id SERIAL PRIMARY KEY,
	name varchar(30) NOT NULL,
	fied_id INT REFERENCES field(id)
);

CREATE TABLE users (
	id SERIAL  PRIMARY KEY,
	firstname VARCHAR(20) NOT NULL,
	lastname VARCHAR(20) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  freelancer_url VARCHAR(50) NOT NULL,
	photo_url VARCHAR(70) NOT NULL,
	birthday DATE NOT NULL,
	mobile_number INT NOT NULL UNIQUE,
	specalization_id INT REFERENCES specialization(id),
  city VARCHAR(20),
	password VARCHAR NOT NULL
);

CREATE TABLE proposal (
	id SERIAL NOT NULL PRIMARY KEY ,
	title varchar(50) NOT NULL,
	description varchar NOT NULL,
	user_id INT REFERENCES users(id),
	specalization_id int REFERENCES specialization(id),
	contact_me TEXT NOT NULL
);

CREATE TABLE requirement (
	id SERIAL NOT NULL PRIMARY KEY ,
	text TEXT NOT NULL ,
	prop_id INT REFERENCES proposal(id)
);

COMMIT ;
