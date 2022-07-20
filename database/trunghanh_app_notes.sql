-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: trunghanh_app
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `note_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `reply_note` varchar(255) DEFAULT NULL,
  `image` json DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `note_type_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` enum('Chờ xử lý','Hoàn thành') DEFAULT NULL,
  `pharmacy_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES ('00fa00fc-c84c-41bd-9fc9-3acef12733fd','new new',NULL,'[\"http://res.cloudinary.com/dukdctwfd/image/upload/v1650615500/xpjwdtbo8afkvnzb6k4v.jpg\"]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0caadd3-8112-47e1-abc0-eda7ed3bdaa9','2022-04-21 20:18:19',NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('0905841b-ba9e-4663-a46c-24086b189a52','New2',NULL,'[\"http://res.cloudinary.com/dukdctwfd/image/upload/v1650615183/jckpdptxlcv3xfyjuqxd.jpg\"]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0caadd3-8112-47e1-abc0-eda7ed3bdaa9','2022-04-21 20:13:03',NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('39519738-b572-48a4-a8bb-35556b857d03','ád',NULL,'[{\"fileName\": \"C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/imagesa26410fe-b827-44e6-9f14-6400e0cd77a1-809561385.jpg\"}]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0ff190d-1d56-405c-9961-10ce2036029e','2022-04-20 23:09:35',NULL,'Chờ xử lý','004C92C4-B804-405E-BAFF-DE9FC9D2774D'),('876ff375-afb6-47af-9a5a-cc3f0b3f6ce1','Kháchanahang can hoi gia',NULL,'[]','53669c88-5b4a-463e-a323-197fd3a1ab22','b1b80b38-212e-4374-850f-b29621a4970a','2022-04-20 23:15:46',NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('9feeace4-43d0-47d2-be2d-e067988d59f2','Đến hiệu thuốc để trả lời','Đến hiệu thuốc để trả lời A','[\"http://res.cloudinary.com/dukdctwfd/image/upload/v1650435283/we9yqaci97kw0peb9kie.png\", \"http://res.cloudinary.com/dukdctwfd/image/upload/v1650435283/we9yqaci97kw0peb9kie.png\"]','53669c88-5b4a-463e-a323-197fd3a1ab22','','2022-04-19 18:14:43',NULL,'Chờ xử lý',''),('a090fe75-0171-4d8c-b3a5-bc56f0c7236f','New3',NULL,'[\"http://res.cloudinary.com/dukdctwfd/image/upload/v1650615313/i89zbpkcgols8xz0ewnt.jpg\"]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0caadd3-8112-47e1-abc0-eda7ed3bdaa9','2022-04-21 20:15:12',NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('acc1b878-c503-4b5b-a219-47a90d5b60bd','New',NULL,'[{\"fileName\": \"C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/images05da5030-c1a9-43d2-907b-b8a2ba0cacd9-989703438.jpg\"}]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0caadd3-8112-47e1-abc0-eda7ed3bdaa9','2022-04-21 20:09:20',NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('e102dc63-8e6e-4650-adb0-2fca437a047e','helo',NULL,'[{\"fileName\": \"C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/images0ff53d68-fad8-4a7b-8d8b-d9cd8779fecd-769054982.jpg\"}]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0caadd3-8112-47e1-abc0-eda7ed3bdaa9',NULL,NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('e1bc5b20-bc59-4eb2-a3bc-fe0ad75a13de','',NULL,'[{\"fileName\": \"C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/imagesd29d5eaf-411c-4cdc-8cd1-58fbb330a860-950770326.jpg\"}, {\"fileName\": \"C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/imagesc85214c3-cfdb-4a79-beb7-7988695bb231-668497655.jpg\"}]','53669c88-5b4a-463e-a323-197fd3a1ab22','b1b80b38-212e-4374-850f-b29621a4970a',NULL,NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('e4858521-2884-4e10-b2c7-3393a54a5109','ád',NULL,'[{\"fileName\": \"C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/images4b4f230e-5285-430d-8f5b-310573f02ad1-633610705.jpg\"}]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0caadd3-8112-47e1-abc0-eda7ed3bdaa9','2022-04-21 20:04:27',NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4'),('e753adfb-b55c-47a7-bb46-1239cd41dfec','Co doi thu o cua hang',NULL,'[{\"fileName\": \"C:/Users/ryuk2/Documents/trunghanhpharma/server_customer/images08c161c3-98c6-492d-b42d-9a625a738894-476877184.jpg\"}]','53669c88-5b4a-463e-a323-197fd3a1ab22','b0caadd3-8112-47e1-abc0-eda7ed3bdaa9','2022-04-21 01:45:16',NULL,'Chờ xử lý','0022B45B-1E1C-49F6-A65A-205F2F0294E4');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-23 11:28:10
