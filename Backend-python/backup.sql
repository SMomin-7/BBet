-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: bettingApp
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL,
  `task` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_bet`
--

DROP TABLE IF EXISTS `api_bet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_bet` (
  `game` varchar(255) NOT NULL,
  `selected_team` varchar(100) NOT NULL,
  `bet_amount` decimal(10,2) NOT NULL,
  `payout` decimal(10,2) NOT NULL,
  `result` varchar(50) NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  `bet_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`bet_id`),
  KEY `api_bet_user_id_d82ef89b_fk_api_customuser_user_id` (`user_id`),
  CONSTRAINT `api_bet_user_id_d82ef89b_fk_api_customuser_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_bet`
--

LOCK TABLES `api_bet` WRITE;
/*!40000 ALTER TABLE `api_bet` DISABLE KEYS */;
INSERT INTO `api_bet` VALUES ('Team A vs Team B','Team A',100.00,150.00,'Pending','2024-11-25 21:50:28.801787',1,1),('Team A vs Team B','Team A',50.00,75.00,'Pending','2024-11-25 22:16:08.628127',1,2),('Team E vs Team F','Team E',120.00,240.00,'Pending','2024-11-25 22:30:05.691157',5,3),('Team A vs Team B','Team A',50.00,75.00,'Pending','2024-11-26 01:11:32.884666',1,4),('Team A vs Team B','Team B',10.00,23.00,'Pending','2024-11-26 02:23:48.084877',2,5),('Team E vs Team F','Team E',40.00,80.00,'Pending','2024-11-26 02:32:30.958245',2,6),('Team A vs Team B','Team B',30.00,69.00,'Pending','2024-11-26 19:57:50.893407',5,7),('Team E vs Team F','Team E',20.00,40.00,'Pending','2024-11-26 19:58:01.687341',5,8),('Team A vs Team B','Team A',10.00,15.00,'Pending','2024-11-26 20:04:57.950310',5,9),('Team A vs Team B','Team A',10.00,15.00,'Pending','2024-11-26 20:09:36.483945',2,10),('Team C vs Team D','Team C',20.00,36.00,'Pending','2024-11-26 20:09:47.502260',2,11),('Team E vs Team F','Team E',50.00,100.00,'Pending','2024-11-26 20:09:57.875272',2,12),('Team A vs Team B','Team A',20.00,30.00,'Pending','2024-11-26 21:35:40.290182',5,13),('Team A vs Team B','Team A',10.00,15.00,'Pending','2024-11-26 21:35:52.278038',5,14),('Team E vs Team F','Team E',10.00,20.00,'Pending','2024-11-26 21:39:34.633222',5,15),('Team A vs Team B','Team A',18.00,27.00,'Pending','2024-11-26 21:40:59.571230',5,16),('Team A vs Team B','Team A',62.00,93.00,'Pending','2024-11-26 21:49:56.893063',5,17);
/*!40000 ALTER TABLE `api_bet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_customuser`
--

DROP TABLE IF EXISTS `api_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_customuser` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `dob` date NOT NULL,
  `email` varchar(254) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deposit` decimal(10,2) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `ranking` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_customuser`
--

LOCK TABLES `api_customuser` WRITE;
/*!40000 ALTER TABLE `api_customuser` DISABLE KEYS */;
INSERT INTO `api_customuser` VALUES (1,'1995-05-15','testuser@example.com','testuser','pbkdf2_sha256$870000$dC2ksqGK5woWlWPr2Spef4$F9uJxBtcCUIbyT6XZ9aq4/SJfeBWVUP8I+YWrkieBhk=',100.00,0.00,0,NULL,NULL),(2,'2004-04-20','Momin@gmail.com','Shaim','pbkdf2_sha256$870000$P0Gj6mGHAhN8hzNZrch5sg$1llZtDrQXiS5NUHG6j7V/PFc4TI3+FElBfPWYxMJkfc=',600.00,470.00,0,NULL,NULL),(3,'2004-04-15','riyanmomin@gmail.com','Riyan','pbkdf2_sha256$870000$yEt6OYcn2bqS84QVxfTsbt$Hnf16nj12wt+ejH0TP76o93N6bFn+UihkTrOkNEnfqo=',500.00,500.00,0,NULL,NULL),(5,'2002-11-09','rabil@gmail.com','Rabil','pbkdf2_sha256$870000$zvE29D9k84TLncObppG3ig$6HQKuCP+zJ+ePMPs4fAjG+zkEHA13Gpp5PiyL86S0O0=',700.00,400.00,0,NULL,NULL);
/*!40000 ALTER TABLE `api_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_leaderboard`
--

DROP TABLE IF EXISTS `api_leaderboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_leaderboard` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bet_count` int NOT NULL,
  `user_id` int NOT NULL,
  `rank` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `api_leaderboard_user_id_70d9a000_fk_api_customuser_user_id` FOREIGN KEY (`user_id`) REFERENCES `api_customuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_leaderboard`
--

LOCK TABLES `api_leaderboard` WRITE;
/*!40000 ALTER TABLE `api_leaderboard` DISABLE KEYS */;
INSERT INTO `api_leaderboard` VALUES (1,3,1,3),(2,5,2,2),(3,9,5,1),(4,0,3,4);
/*!40000 ALTER TABLE `api_leaderboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_match`
--

DROP TABLE IF EXISTS `api_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_match` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `timestamp` datetime(6) NOT NULL,
  `team1_score` int DEFAULT NULL,
  `team2_score` int DEFAULT NULL,
  `team1_id` varchar(100) NOT NULL,
  `team2_id` varchar(100) NOT NULL,
  `winner_id` varchar(100) DEFAULT NULL,
  `stadium` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `api_match_team1_id_c0d7f6bf_fk_api_team_name` (`team1_id`),
  KEY `api_match_team2_id_9ce830ed_fk_api_team_name` (`team2_id`),
  KEY `api_match_winner_id_ef7449f8_fk_api_team_name` (`winner_id`),
  CONSTRAINT `api_match_team1_id_c0d7f6bf_fk_api_team_name` FOREIGN KEY (`team1_id`) REFERENCES `api_team` (`name`),
  CONSTRAINT `api_match_team2_id_9ce830ed_fk_api_team_name` FOREIGN KEY (`team2_id`) REFERENCES `api_team` (`name`),
  CONSTRAINT `api_match_winner_id_ef7449f8_fk_api_team_name` FOREIGN KEY (`winner_id`) REFERENCES `api_team` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_match`
--

LOCK TABLES `api_match` WRITE;
/*!40000 ALTER TABLE `api_match` DISABLE KEYS */;
INSERT INTO `api_match` VALUES (1,'2024-11-28 00:40:20.451496',NULL,NULL,'Golden State Warriors','Detroit Pistons',NULL,'McMahon Stadium'),(2,'2024-11-28 00:40:20.470915',NULL,NULL,'Houston Rockets','Toronto Raptors',NULL,'McMahon Stadium'),(3,'2024-11-28 00:40:20.479786',NULL,NULL,'Boston Celtics','Miami Heat',NULL,'McMahon Stadium'),(4,'2024-11-28 00:40:20.490220',NULL,NULL,'New York Knicks','Brooklyn Nets',NULL,'McMahon Stadium'),(5,'2024-11-28 00:40:20.498880',NULL,NULL,'Chicago Bulls','Los Angeles Lakers',NULL,'McMahon Stadium'),(6,'2024-11-27 12:00:00.000000',NULL,NULL,'Houston Rockets','New York Knicks',NULL,'Rogers Centre'),(7,'2024-11-27 15:00:00.000000',NULL,NULL,'Los Angeles Lakers','Toronto Raptors',NULL,'McMahon Stadium'),(8,'2024-11-27 18:00:00.000000',NULL,NULL,'Boston Celtics','Chicago Bulls',NULL,'BC Place'),(9,'2024-11-28 12:00:00.000000',NULL,NULL,'Miami Heat','Golden State Warriors',NULL,'Tim Hortons Field'),(10,'2024-11-28 15:00:00.000000',NULL,NULL,'Brooklyn Nets','Detroit Pistons',NULL,'Commonwealth Stadium');
/*!40000 ALTER TABLE `api_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_team`
--

DROP TABLE IF EXISTS `api_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_team` (
  `name` varchar(100) NOT NULL,
  `coach` varchar(100) NOT NULL,
  `ranking` int NOT NULL,
  `year_founded` int NOT NULL,
  `points` int NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_team`
--

LOCK TABLES `api_team` WRITE;
/*!40000 ALTER TABLE `api_team` DISABLE KEYS */;
INSERT INTO `api_team` VALUES ('Boston Celtics','Joe Mazzulla',2,1946,0),('Brooklyn Nets','Jordi Fernandez',8,1967,0),('Chicago Bulls','Billy Donovan',7,1966,0),('Detroit Pistons','J.B. Bickerstaff',10,1941,0),('Golden State Warriors','Steve Kerr',3,1946,0),('Houston Rockets','Ime Udoka',9,1967,0),('Los Angeles Lakers','JJ Redick',5,1946,0),('Miami Heat','Erik Spoelstra',6,1988,0),('New York Knicks','Tom Thibodeau',4,1946,0),('Toronto Raptors','Darko Rajakovic',1,1995,0);
/*!40000 ALTER TABLE `api_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add custom user',7,'add_customuser'),(26,'Can change custom user',7,'change_customuser'),(27,'Can delete custom user',7,'delete_customuser'),(28,'Can view custom user',7,'view_customuser'),(29,'Can add bet',8,'add_bet'),(30,'Can change bet',8,'change_bet'),(31,'Can delete bet',8,'delete_bet'),(32,'Can view bet',8,'view_bet'),(33,'Can add leaderboard',9,'add_leaderboard'),(34,'Can change leaderboard',9,'change_leaderboard'),(35,'Can delete leaderboard',9,'delete_leaderboard'),(36,'Can view leaderboard',9,'view_leaderboard'),(37,'Can add team',10,'add_team'),(38,'Can change team',10,'change_team'),(39,'Can delete team',10,'delete_team'),(40,'Can view team',10,'view_team'),(41,'Can add match',11,'add_match'),(42,'Can change match',11,'change_match'),(43,'Can delete match',11,'delete_match'),(44,'Can view match',11,'view_match');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bet`
--

DROP TABLE IF EXISTS `bet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bet` (
  `bet_Id` int NOT NULL,
  `Odds_Id` int NOT NULL,
  `User_Id` int NOT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `payout` decimal(10,2) DEFAULT NULL,
  `game_id` int DEFAULT NULL,
  `result` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`User_Id`,`Odds_Id`,`bet_Id`),
  KEY `Odds_Id` (`Odds_Id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `bet_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `user` (`User_Id`),
  CONSTRAINT `bet_ibfk_2` FOREIGN KEY (`Odds_Id`) REFERENCES `odds` (`Odds_Id`),
  CONSTRAINT `bet_ibfk_3` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bet`
--

LOCK TABLES `bet` WRITE;
/*!40000 ALTER TABLE `bet` DISABLE KEYS */;
/*!40000 ALTER TABLE `bet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` int NOT NULL,
  `History` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(8,'api','bet'),(7,'api','customuser'),(9,'api','leaderboard'),(11,'api','match'),(10,'api','team'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-11-25 00:44:40.592333'),(2,'auth','0001_initial','2024-11-25 00:44:42.451762'),(3,'admin','0001_initial','2024-11-25 00:44:42.806741'),(4,'admin','0002_logentry_remove_auto_add','2024-11-25 00:44:42.818127'),(5,'admin','0003_logentry_add_action_flag_choices','2024-11-25 00:44:42.835052'),(6,'contenttypes','0002_remove_content_type_name','2024-11-25 00:44:43.008048'),(7,'auth','0002_alter_permission_name_max_length','2024-11-25 00:44:43.155634'),(8,'auth','0003_alter_user_email_max_length','2024-11-25 00:44:43.191875'),(9,'auth','0004_alter_user_username_opts','2024-11-25 00:44:43.213299'),(10,'auth','0005_alter_user_last_login_null','2024-11-25 00:44:43.345218'),(11,'auth','0006_require_contenttypes_0002','2024-11-25 00:44:43.349738'),(12,'auth','0007_alter_validators_add_error_messages','2024-11-25 00:44:43.368751'),(13,'auth','0008_alter_user_username_max_length','2024-11-25 00:44:43.557937'),(14,'auth','0009_alter_user_last_name_max_length','2024-11-25 00:44:43.702559'),(15,'auth','0010_alter_group_name_max_length','2024-11-25 00:44:43.753929'),(16,'auth','0011_update_proxy_permissions','2024-11-25 00:44:43.769807'),(17,'auth','0012_alter_user_first_name_max_length','2024-11-25 00:44:43.958101'),(18,'sessions','0001_initial','2024-11-25 00:44:44.029108'),(19,'api','0001_initial','2024-11-25 01:07:32.534956'),(20,'api','0002_bet','2024-11-25 21:04:50.389373'),(21,'api','0003_alter_bet_bet_id','2024-11-25 21:23:26.284390'),(22,'api','0004_alter_bet_bet_id','2024-11-25 21:40:23.394335'),(23,'api','0005_alter_bet_bet_amount_alter_bet_payout_and_more','2024-11-26 00:56:11.818251'),(24,'api','0006_leaderboard','2024-11-26 20:33:29.486569'),(25,'api','0007_remove_leaderboard_updated_at_leaderboard_rank_and_more','2024-11-26 21:10:15.697015'),(26,'api','0008_team','2024-11-27 21:33:26.636348'),(27,'api','0009_alter_team_ranking','2024-11-27 22:02:22.282701'),(28,'api','0010_match','2024-11-28 00:36:22.195930'),(29,'api','0011_match_stadium','2024-11-28 01:24:59.165434');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `game_Id` int NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `stadium` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`game_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaderboard`
--

DROP TABLE IF EXISTS `leaderboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaderboard` (
  `Ranking` int NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Ranking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaderboard`
--

LOCK TABLES `leaderboard` WRITE;
/*!40000 ALTER TABLE `leaderboard` DISABLE KEYS */;
/*!40000 ALTER TABLE `leaderboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odds`
--

DROP TABLE IF EXISTS `odds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `odds` (
  `Odds_Id` int NOT NULL,
  `Team1` varchar(100) DEFAULT NULL,
  `Team2` varchar(100) DEFAULT NULL,
  `game_id` int DEFAULT NULL,
  `latest` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`Odds_Id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `odds_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odds`
--

LOCK TABLES `odds` WRITE;
/*!40000 ALTER TABLE `odds` DISABLE KEYS */;
/*!40000 ALTER TABLE `odds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `player_Id` int NOT NULL,
  `f_name` varchar(100) DEFAULT NULL,
  `l_name` varchar(100) DEFAULT NULL,
  `team_name` varchar(100) DEFAULT NULL,
  `Contract_Length` int DEFAULT NULL,
  PRIMARY KEY (`player_Id`),
  KEY `team_name` (`team_name`),
  CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team_name`) REFERENCES `team` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistics` (
  `Stat_Id` int NOT NULL,
  `overall_rating` int DEFAULT NULL,
  `player_name` varchar(100) DEFAULT NULL,
  `Shots` int DEFAULT NULL,
  `Assists` int DEFAULT NULL,
  `Points` int DEFAULT NULL,
  `player_Id` int DEFAULT NULL,
  PRIMARY KEY (`Stat_Id`),
  KEY `player_Id` (`player_Id`),
  CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`player_Id`) REFERENCES `players` (`player_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `name` varchar(100) NOT NULL,
  `coach` varchar(100) DEFAULT NULL,
  `ranking` int DEFAULT NULL,
  `year_established` year DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `User_Id` int NOT NULL,
  `DOB` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `deposit` decimal(10,2) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `Ranking` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  PRIMARY KEY (`User_Id`),
  UNIQUE KEY `email` (`email`),
  KEY `admin_id` (`admin_id`),
  KEY `client_id` (`client_id`),
  KEY `Ranking` (`Ranking`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`Ranking`) REFERENCES `leaderboard` (`Ranking`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-27 18:38:50
