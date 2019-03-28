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
	mobile_number TEXT NOT NULL UNIQUE,
	specalization_id INT REFERENCES specialization(id),
  city VARCHAR(20),
	password VARCHAR NOT NULL
);

CREATE TABLE proposal (
	id SERIAL PRIMARY KEY ,
	title varchar(50) NOT NULL,
	description varchar NOT NULL,
	user_id INT REFERENCES users(id),
	specalization_id int REFERENCES specialization(id)
);

CREATE TABLE requirement (
	id SERIAL  PRIMARY KEY ,
	text VARCHAR NOT NULL ,
	prop_id INT REFERENCES proposal(id)
);

INSERT INTO field (name) 
values ('Developer');

INSERT INTO specialization (name,field_id) 
values ('Front develpoer',1), ('Back-end',1);

INSERT INTO users (firstname,lastname,email,freelancer_url,photo_url,mobile_number,specalization_id,password)
values('fatma','siam','f.siam@gmail.com','https://mm.mm.mmmmm','https://mm.mm.mmmmm','0599999999',1,'$2a$10$5.WmgQhO5eYGiB48vkZJvum.J0HEAH3lToyGD8sdIUEjt8xRK2QOW');

INSERT INTO proposal (title,description,user_id,specalization_id)
values ('front-end develpoer','we need a front-end developer to working at project',1,1),
('front-end develpoer','we need a front-end developer to working at project',1,1);

INSERT INTO requirement(text,prop_id) 
values ('full time' ,1), ('react',1);

INSERT INTO users(firstname, lastname, email, freelancer_url, photo_url, mobile_number, password)
VALUES ('a', 'b', 'a.gmail.com', 'https://github.com/angham', 'https://www.iconspng.com/image/36709/face-avatar-man-male-handsome-3', '0097234567', '$2a$10$Kf96cHKp/OU.1mNElX7a5OBJ8MImBPVu6B3yQnQqwIgBiAII1jZLa');

COMMIT ;

