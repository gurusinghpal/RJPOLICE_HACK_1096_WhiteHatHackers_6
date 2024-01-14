-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: gt_numbers
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `access_email_db`
--

DROP TABLE IF EXISTS `access_email_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_email_db` (
  `EmailId` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_email_db`
--

LOCK TABLES `access_email_db` WRITE;
/*!40000 ALTER TABLE `access_email_db` DISABLE KEYS */;
INSERT INTO `access_email_db` VALUES ('akashkapoor7887@gmail.com'),('deepsinghjashan1313@gmail.com'),('namanrao400@gmail.com'),('gurusingh2585@gmail.com');
/*!40000 ALTER TABLE `access_email_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camera_information`
--

DROP TABLE IF EXISTS `camera_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camera_information` (
  `Location_name` varchar(255) DEFAULT NULL,
  `Camera_IPaddress` varchar(15) NOT NULL,
  `Camera_model` varchar(255) DEFAULT NULL,
  `Resolutions` varchar(255) DEFAULT NULL,
  `Visibility_range` int DEFAULT NULL,
  `Latitude` float DEFAULT NULL,
  `Longitude` float DEFAULT NULL,
  `Contact_No` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Camera_IPaddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camera_information`
--

LOCK TABLES `camera_information` WRITE;
/*!40000 ALTER TABLE `camera_information` DISABLE KEYS */;
INSERT INTO `camera_information` VALUES ('Ajmer','192.168.1.101','Hikvision DS-2CD2143G0-I','4MP (2688 x 1520)',30,26.45,74.7,'+91 6397664401'),('Alwar','192.168.1.102','Dahua IPC-HDW2431RP-ZS','2MP (1920 x 1080)',50,27.5667,76.6333,'+91 9053893373'),('Bikaner','192.168.1.103','Axis Communications M3045-V','1080p (1920 x 1080)',45,28.0167,73.3667,'+91 9335500009'),('Jaipur','192.168.1.104','Vivotek FD836BA-EHTV','5MP (2560 x 1920)',35,26.9167,75.8667,'+91 8307026632'),('Kota','192.168.1.105','Bosch Flexidome IP Starlight 8000i','4K (3840 x 2160)',55,25.1667,75.8667,'+91 7982192248'),('Udaipur','192.168.1.106','Hanwha Techwin Wisenet XNV-6085R','2MP (1920 x 1080)',40,27.7,75.55,'+91 9711042223'),('Shahadara','192.168.1.107','Honeywell H4W2PRV2','4K (3840 x 2160)',20,28.0667,77.0333,'+91 8791751443'),('Ambala','192.168.1.108','Pelco GFC Professional 4K','4K (3840 x 2160)',30,30.35,76.8667,'+91 9417017652'),('Ayodhaya','192.168.1.109','Panasonic WV-S2131L','5MP (2560 x 1920)',50,26.8,82.2333,'+91 9034390005'),('Ludhiana','192.168.1.110','Sony SNC-EB630','3MP (2048 x 1536)',40,30.9167,75.9,'+91 7887485850'),('Mumbai','192.168.1.111','Avigilon H5A-HD Pro','5MP (2560 x 1920)',25,18.9167,72.9,'+91 8979681582'),('Hyderabad','192.168.1.112','Arecont Vision AV3556DN-F','3MP (2048 x 1536)',30,17.3333,78.5,'+91 8707309604');
/*!40000 ALTER TABLE `camera_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_information`
--

DROP TABLE IF EXISTS `owner_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_information` (
  `Owner_name` varchar(255) DEFAULT NULL,
  `House_No` varchar(255) DEFAULT NULL,
  `Camera_IPaddress` varchar(15) DEFAULT NULL,
  `Contact_No` varchar(15) DEFAULT NULL,
  KEY `fk_camera_information` (`Camera_IPaddress`),
  CONSTRAINT `fk_camera_information` FOREIGN KEY (`Camera_IPaddress`) REFERENCES `camera_information` (`Camera_IPaddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_information`
--

LOCK TABLES `owner_information` WRITE;
/*!40000 ALTER TABLE `owner_information` DISABLE KEYS */;
INSERT INTO `owner_information` VALUES ('Akash Kapoor','A-123','192.168.1.101','+916397664401'),('Jashandeep Singh','HN-456','192.168.1.102','+919053893373'),('Guru Singh Pal','B-789','192.168.1.103','+919335500009'),('Naman Raj','H-234','192.168.1.104','+918307026632'),('Divyanshi Bhatia','AC-567','192.168.1.105','+917982192248'),('Avni Chauhan','J-890','192.168.1.106','+919711042223'),('Aman Kapoor','K-1234','192.168.1.107','+918791751443'),('Rohitashav Gautam','L-5678','192.168.1.108','+919417017652'),('Tejasvi Singh Pal','U-91011','192.168.1.109','+919034390005'),('Pawan Saini','P-1213','192.168.1.110','+917887485850'),('Sonakshi Bhatia','I-1415','192.168.1.111','+918979681582'),('Anushka Mishra','UG-1617','192.168.1.112','+918707309604');
/*!40000 ALTER TABLE `owner_information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-14  5:17:33
