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
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `order_detail_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `order_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `product_id` (`product_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES ('0b48f46f-66c8-470d-b82c-e421fcf03d22','15','98700','HỘP','06CFDC4F-5E54-4625-9029-87D3BE07A0C0','089ff3f3-bc11-46e8-82ba-1a44ce01b9f5',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','DEPAKIN 200MG B/1TUBE X40TABS (SP)'),('0ee72b08-8a03-4f58-bd72-6952fa247acd','1','10000','HỘP','C8B7C3E7-DD7A-4EE2-AEA7-0C6305842357','1a028f94-4c24-407d-976a-5dfd685139b2',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650340566/image_TrungHanh/download_lvohfg.jpg','ZENTEN TAB 200MG 2\'S'),('31485b91-45a9-471d-8003-178795fd6342','1','30000','HỘP','0ACB532E-91BA-4B46-BF2D-BA9545B3D24E','a5bf0b7f-5454-4f04-aaa9-f2e658e4366b',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338732/image_TrungHanh/download_n1sszz.jpg','MAGNESI-B6'),('397cba06-b848-4a1b-9943-be6c8c5e5df3','1','21500','TUÝP','B1D589BD-4923-4628-911C-3881A582550A','1a028f94-4c24-407d-976a-5dfd685139b2',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650340407/image_TrungHanh/download_fgmkps.jpg','DIPOLAC G 15g (TUBE)'),('40a56543-469a-4069-91fd-de0b168f72c0','1','260000','HỘP','083582DF-DA01-4DAD-811E-DA1FD7AF44EE','a5bf0b7f-5454-4f04-aaa9-f2e658e4366b',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338675/image_TrungHanh/download_cy6v5l.jpg','SYMBICORT TURBUHALER 60 DOSE 160/4.5'),('48e05561-42d3-4c0b-a5f7-c6c80e850746','1','43700','CHAI','0338B01F-5399-4900-98F8-EE97C2C37B99','1a028f94-4c24-407d-976a-5dfd685139b2',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','MOTILIUM-60ML B/1'),('6efdc197-4845-44ff-8838-5ccca57870cb','23','260000','HỘP','083582DF-DA01-4DAD-811E-DA1FD7AF44EE','ee932f78-f35a-465c-87fb-332c50a0b1d6',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338675/image_TrungHanh/download_cy6v5l.jpg','SYMBICORT TURBUHALER 60 DOSE 160/4.5'),('7e3b06f2-a7a3-428c-850f-a0eb1de6d4bd','1','30000','HỘP','0ACB532E-91BA-4B46-BF2D-BA9545B3D24E','ee932f78-f35a-465c-87fb-332c50a0b1d6',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338732/image_TrungHanh/download_n1sszz.jpg','MAGNESI-B6'),('93217bb7-4df3-460d-8bc5-e89b44f78909','1','43700','CHAI','0338B01F-5399-4900-98F8-EE97C2C37B99','951608e6-0c2c-49f6-9ad2-af5a5c72824d',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','MOTILIUM-60ML B/1'),('94507e82-60e6-400e-bb17-8067882bafa7','1','98700','HỘP','06CFDC4F-5E54-4625-9029-87D3BE07A0C0','ee932f78-f35a-465c-87fb-332c50a0b1d6',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','DEPAKIN 200MG B/1TUBE X40TABS (SP)'),('a4efd300-f87e-422c-9ffa-171ee3397bf7','5','43700','CHAI','0338B01F-5399-4900-98F8-EE97C2C37B99','089ff3f3-bc11-46e8-82ba-1a44ce01b9f5',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','MOTILIUM-60ML B/1'),('b4f9869b-5127-4f03-8683-1abd9e89306d','14','100000','HỘP','0CE6FAB8-DBDA-420B-ACAE-A5002E6BFECB','ee932f78-f35a-465c-87fb-332c50a0b1d6',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338775/image_TrungHanh/download_qnxkli.jpg','SMECTA (ORANGE - VANILLA) 3GR B/30 SACH'),('c0707f97-33bf-4a4a-8dd2-68a913b9c57f','16','260000','HỘP','083582DF-DA01-4DAD-811E-DA1FD7AF44EE','089ff3f3-bc11-46e8-82ba-1a44ce01b9f5',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338675/image_TrungHanh/download_cy6v5l.jpg','SYMBICORT TURBUHALER 60 DOSE 160/4.5'),('c312afee-359c-4a5c-9fd1-89bb0a2ff4f7','1','43700','CHAI','0338B01F-5399-4900-98F8-EE97C2C37B99','ee932f78-f35a-465c-87fb-332c50a0b1d6',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','MOTILIUM-60ML B/1'),('e0754b0e-bb51-42d7-90a8-4b88c51604b3','1','98700','HỘP','06CFDC4F-5E54-4625-9029-87D3BE07A0C0','1a028f94-4c24-407d-976a-5dfd685139b2',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','DEPAKIN 200MG B/1TUBE X40TABS (SP)'),('ebff4150-0ed0-4767-a140-93aa6783f129','54','98700','HỘP','06CFDC4F-5E54-4625-9029-87D3BE07A0C0','951608e6-0c2c-49f6-9ad2-af5a5c72824d',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','DEPAKIN 200MG B/1TUBE X40TABS (SP)'),('f0761bcf-ff5e-49d6-b05e-43137f5f54a8','1','98700','HỘP','06CFDC4F-5E54-4625-9029-87D3BE07A0C0','a5bf0b7f-5454-4f04-aaa9-f2e658e4366b',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','DEPAKIN 200MG B/1TUBE X40TABS (SP)'),('f97efc41-0921-45a2-959c-9ea07c4b9eb9','1','43700','CHAI','0338B01F-5399-4900-98F8-EE97C2C37B99','a5bf0b7f-5454-4f04-aaa9-f2e658e4366b',NULL,NULL,'https://res.cloudinary.com/dx2zvlyry/image/upload/v1650338480/image_TrungHanh/download_oojovg.jpg','MOTILIUM-60ML B/1');
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-23 11:28:11
