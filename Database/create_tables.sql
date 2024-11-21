-- Create the database
CREATE DATABASE IF NOT EXISTS bettingApp;

-- Use the newly created database
USE bettingApp;

-- Create the User table
CREATE TABLE IF NOT EXISTS User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Balance DECIMAL(10,2) DEFAULT 0
);

-- Create the Match table (using backticks because Match is a reserved keyword)
CREATE TABLE IF NOT EXISTS `Match` (
    MatchID INT AUTO_INCREMENT PRIMARY KEY,
    Team1 VARCHAR(100),
    Team2 VARCHAR(100),
    MatchDate DATE,
    Odds DECIMAL(4,2)
);

-- Create the Bet table
CREATE TABLE IF NOT EXISTS Bet (
    BetID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    MatchID INT,
    Amount DECIMAL(10,2),
    Status ENUM('Pending', 'Won', 'Lost') DEFAULT 'Pending',
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (MatchID) REFERENCES `Match`(MatchID) ON DELETE CASCADE
);
