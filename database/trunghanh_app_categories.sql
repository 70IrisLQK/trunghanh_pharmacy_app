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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('5C22A5AD-07FB-4896-902A-E2BF6C2FC8E6','Thực phẩm chức năng',NULL,NULL,NULL,'https://res.cloudinary.com/dlgr81fs7/image/upload/v1650279121/category/thuc-pham-bo-sung-sat_kydi1i.jpg'),('A7C26463-0E85-4BB9-A722-4F2C71515A83','Mỹ Phẩm',NULL,NULL,NULL,'https://res.cloudinary.com/dlgr81fs7/image/upload/v1650280562/category/unnamed_zhcwls.jpg'),('B6FA74F9-499F-43FC-9611-9678938F5B5C','Dược phẩm',NULL,NULL,NULL,'https://res.cloudinary.com/dlgr81fs7/image/upload/v1650280607/category/800px_COLOURBOX37561459_l6y6a6.jpg'),('CC382F7F-522A-4291-9827-E99BFB1FF1C6','Dược Mỹ Phẩm',NULL,NULL,NULL,'https://res.cloudinary.com/dlgr81fs7/image/upload/v1650280676/category/60dduoc-my-pham-han-quoc-cuskin_ajnb4g.jpg'),('F2DD5C6E-7D8C-449D-B963-4F193E2E97D6','Thiết bị y tế',NULL,NULL,NULL,'https://res.cloudinary.com/dlgr81fs7/image/upload/v1650280727/category/dieu-kien-san-xuat-trang-thiet-bi-y-te_wa0ha9.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
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
