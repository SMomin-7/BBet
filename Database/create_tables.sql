-- Create the database
CREATE DATABASE IF NOT EXISTS bettingApp;

-- Use the newly created database
USE bettingApp;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;



-- Create tables in the correct order
CREATE TABLE ADMIN (
    admin_id INT PRIMARY KEY,
    task VARCHAR(255)
);

CREATE TABLE LEADERBOARD (
    Ranking INT PRIMARY KEY,
    user_name VARCHAR(100),
    last_updated TIMESTAMP
);

CREATE TABLE CLIENT (
    client_id INT PRIMARY KEY,
    History VARCHAR(255)
);

CREATE TABLE USER (
    User_Id INT PRIMARY KEY,
    DOB DATE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
    deposit DECIMAL(10, 2),
    balance DECIMAL(10, 2),
    Ranking INT,
    admin_id INT,
    client_id INT,
    FOREIGN KEY (admin_id) REFERENCES ADMIN(admin_id),
    FOREIGN KEY (client_id) REFERENCES CLIENT(client_id),
    FOREIGN KEY (Ranking) REFERENCES LEADERBOARD(Ranking)
);

-- Updated table name from MATCH to GAME
CREATE TABLE GAME (
    game_Id INT PRIMARY KEY,
    date DATE,
    time TIME,
    stadium VARCHAR(100)
);

CREATE TABLE ODDS (
    Odds_Id INT PRIMARY KEY,
    Team1 VARCHAR(100),
    Team2 VARCHAR(100),
    game_id INT, -- Updated reference to GAME
    latest DECIMAL(5, 2),
    FOREIGN KEY (game_id) REFERENCES GAME(game_Id)
);

CREATE TABLE BET (
    bet_Id INT,
    Odds_Id INT,
    User_Id INT,
    time TIMESTAMP,
    payout DECIMAL(10, 2),
    game_id INT, -- Updated reference to GAME
    result VARCHAR(10),
    PRIMARY KEY (User_Id, Odds_Id, bet_Id),
    FOREIGN KEY (User_Id) REFERENCES USER(User_Id),
    FOREIGN KEY (Odds_Id) REFERENCES ODDS(Odds_Id),
    FOREIGN KEY (game_id) REFERENCES GAME(game_Id)
);

CREATE TABLE TEAM (
    name VARCHAR(100) PRIMARY KEY,
    coach VARCHAR(100),
    ranking INT,
    year_established YEAR
);

CREATE TABLE PLAYERS (
    player_Id INT PRIMARY KEY,
    f_name VARCHAR(100),
    l_name VARCHAR(100),
    team_name VARCHAR(100),
    Contract_Length INT,
    FOREIGN KEY (team_name) REFERENCES TEAM(name)
);

CREATE TABLE STATISTICS (
    Stat_Id INT PRIMARY KEY,
    overall_rating INT,
    player_name VARCHAR(100),
    Shots INT,
    Assists INT,
    Points INT,
    player_Id INT,
    FOREIGN KEY (player_Id) REFERENCES PLAYERS(player_Id)
);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
