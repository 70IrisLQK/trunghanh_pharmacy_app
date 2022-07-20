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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` enum('Chờ xác nhận','Đã xác nhận','Đang giao','Đã giao','Đã hủy','Trả hàng') DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `date_ordered` varchar(255) DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `payment_id` char(36) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `debt_price` float DEFAULT NULL,
  `paid_price` float DEFAULT NULL,
  `discount_price` float DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('089ff3f3-bc11-46e8-82ba-1a44ce01b9f5','D3b Khu Pho 4 P. Tan Hiep Thành phố Biên Hòa Tỉnh Đồng Nai','0902436860','Chờ xác nhận',5741820,NULL,'53669c88-5b4a-463e-a323-197fd3a1ab22',NULL,'2022-04-20 20:02:27',NULL,0,0,117180,0),('1a028f94-4c24-407d-976a-5dfd685139b2','55a minh phụng, p.5,  quận 6','0908810305','Đang giao',173900,NULL,'79f56875-3fbc-44e5-8c27-2b662d8da101','cb888d36-40ec-4cbd-a60e-707de4326d30','2022-04-22 00:21:56',NULL,44444,129456,0,0),('951608e6-0c2c-49f6-9ad2-af5a5c72824d','122 Bui Thi Xuan Quận 1 TP. Hồ Chí Minh','0828432239','Đã giao',5266030,NULL,'79f56875-3fbc-44e5-8c27-2b662d8da121','cb888d36-40ec-4cbd-a60e-707de4326d30','2022-04-18 20:55:16',NULL,0,5266030,107470,70),('a5bf0b7f-5454-4f04-aaa9-f2e658e4366b','Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh','0862816100','Chờ xác nhận',432400,NULL,'53669c88-5b4a-463e-a323-197fd3a1ab22',NULL,NULL,NULL,0,0,0,0),('ee932f78-f35a-465c-87fb-332c50a0b1d6','508 nguyễn duy trinh p, bình trưng đông  quận 2',' ','Chờ xác nhận',7401350,NULL,'53669c88-5b4a-463e-a323-197fd3a1ab22',NULL,'2022-04-20 20:16:16',NULL,0,0,151048,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
