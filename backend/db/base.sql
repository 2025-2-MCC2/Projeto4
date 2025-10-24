CREATE DATABASE db_empathize;
USE db_empathize;

CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT,
    RA INT NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    course VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE mentor(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name_mentor VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE edition(
	id INT PRIMARY KEY AUTO_INCREMENT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE team(
	id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
	id_mentor INT,
    pontuation INT DEFAULT 0,
	FOREIGN KEY(id_mentor) REFERENCES mentor(id)
);

CREATE TABLE team_student(
	id_student INT,
    id_edition INT,
    id_group INT,
    FOREIGN KEY(id_student) REFERENCES student(id),
    FOREIGN KEY(id_edition) REFERENCES edition(id),
    FOREIGN KEY(id_group) REFERENCES team(id)
);

CREATE TABLE adm(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name_adm VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE collection(
	id INT PRIMARY KEY AUTO_INCREMENT,
    food VARCHAR(255) NOT NULL,
    quantity_kg FLOAT NOT NULL,
    proof VARCHAR(255) NOT NULL,
    jus_reject VARCHAR(255),
    status VARCHAR(100) NOT NULL,
    id_group INT,
    FOREIGN KEY(id_group) REFERENCES team(id)
);

CREATE TABLE project(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name_project VARCHAR(100) NOT NULL,
    description_project VARCHAR(255),
    id_group INT,
    FOREIGN KEY(id_group) REFERENCES team(id)
);