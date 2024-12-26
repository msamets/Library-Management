-- Create the database
CREATE DATABASE IF NOT EXISTS `library_db`
CHARACTER SET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

-- Use the database
USE `library_db`;

-- Create the `users` table
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('CUSTOMER', 'LIBRARY_MANAGER') NOT NULL DEFAULT 'CUSTOMER',
  `name` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create the `books` table
CREATE TABLE `books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `publishedYear` INT DEFAULT NULL,
  `averageScore` FLOAT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create the `borrows` table
CREATE TABLE `borrows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `borrowedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `returnedAt` TIMESTAMP NULL,
  `score` FLOAT DEFAULT NULL,
  `userId` INT DEFAULT NULL,
  `bookId` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_334b88778ded92ea179e2b1bfce` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_43e09073c8aa2ba20a669c465dc` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
