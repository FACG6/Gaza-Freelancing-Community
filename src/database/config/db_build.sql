BEGIN; 

DROP TABLE IF EXISTS field, specialization, users, proposal, requirement CASCADE;

CREATE TABLE field (
	id  SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL
);

CREATE TABLE specialization (
	id SERIAL PRIMARY KEY,
	name varchar(30) NOT NULL,
	field_id INT REFERENCES field(id)
);

CREATE TABLE users (
	id SERIAL  PRIMARY KEY,
	firstname VARCHAR(20) NOT NULL,
	lastname VARCHAR(20) NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  freelancer_url varchar NOT NULL,
	photo_url VARCHAR NOT NULL,
	birthday TIMESTAMP ,
	mobile_number INT NOT NULL UNIQUE,
	specalization_id INT REFERENCES specialization(id),
  city VARCHAR(20),
	password VARCHAR NOT NULL
);

CREATE TABLE proposal (
	id SERIAL PRIMARY KEY ,
	title varchar(50) NOT NULL,
	description varchar NOT NULL,
	user_id INT REFERENCES users(id),
	specalization_id int REFERENCES specialization(id),
	contact_me VARCHAR NOT NULL
);

CREATE TABLE requirement (
	id SERIAL  PRIMARY KEY ,
	text VARCHAR NOT NULL ,
	prop_id INT REFERENCES proposal(id)
);

INSERT INTO users(firstname, lastname, email, freelancer_url, photo_url, mobile_number, password)
VALUES ('a', 'b', 'a.gmail.com', 'https://github.com/angham', 'https://www.iconspng.com/image/36709/face-avatar-man-male-handsome-3', '0097234567', '1234');

COMMIT;

