USE bettingApp;
SHOW TABLES;
SELECT * FROM USER;
SELECT * FROM bet;

SHOW TABLES;
DESCRIBE api_customuser;

SELECT * FROM api_customuser;
SELECT email, password FROM api_customuser;



DESCRIBE api_bet;
SELECT * FROM api_bet;

DESCRIBE api_leaderboard;
SELECT * FROM api_leaderboard;

SELECT * FROM api_leaderboard ORDER BY bet_count DESC;

DESCRIBE api_team;
SELECT * FROM api_team ORDER BY ranking ASC;

DESCRIBE api_match;
SELECT * FROM api_match;
















