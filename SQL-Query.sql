DROP DATABASE IF EXISTS `pocket`;
CREATE DATABASE `pocket`;
USE `pocket`;



CREATE TABLE `area` (
    `id` INT AUTO_INCREMENT primary key,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) not null
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `person` (
    `id` INT AUTO_INCREMENT primary key,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `area_id` int,
    foreign key (area_id) references Area(id) on delete set null
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `project` (
    `id` INT AUTO_INCREMENT primary key,
    `name` VARCHAR(100) NOT NULL,
    `start_date` datetime not null default current_timestamp,
    `end_date` DATE NOT NULL,    
    `area_id` INT not null,
    foreign key (area_id) references Area(id) on delete cascade
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `person_project` (
    `person_id` INT NOT NULL,
    `project_id` INT NOT NULL,
    PRIMARY KEY (`person_id`, `project_id`),
    foreign key (person_id) references Person(id) on delete cascade,
    foreign key (project_id) references Project(id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users_type` (
`user_type_id` int AUTO_INCREMENT primary key,
`user_type_name` varchar(50) not null unique
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
`user_id` int Auto_Increment primary key,
`email` varchar(100) not null unique,
`password` varchar(255) not null,
`user_type_id` int not null,
FOREIGN KEY (`user_type_id`) REFERENCES `users_type` (`user_type_id`) ON DELETE RESTRICT
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO user_types (user_type_id, user_type_name)
VALUES
    (1, 'ROLE_ADMIN'),
    (3, 'ROLE_EMPLOYEE'),
    (2, 'ROLE_MANAGER');
