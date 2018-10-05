<<<<<<< HEAD
-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2018 at 02:32 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

=======
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: chms
-- ------------------------------------------------------
-- Server version	5.7.19-log
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
<<<<<<< HEAD
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chms`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(10) NOT NULL,
  `comment_subject` varchar(250) NOT NULL,
  `comment_text` varchar(250) NOT NULL,
  `comment_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_subject`, `comment_text`, `comment_status`) VALUES
(1, 'JHO', 'hi', 1),
(2, 'alexis', 'hello', 0);

-- --------------------------------------------------------
=======
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblagency`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblagency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblagency` (
  `strName` varchar(100) DEFAULT NULL,
  `strAddress` varchar(200) DEFAULT NULL,
  `strTelNum` varchar(11) DEFAULT NULL,
  `strEmail` varchar(45) DEFAULT NULL,
<<<<<<< HEAD
  `strOwner` varchar(45) DEFAULT NULL,
  `strOIC` varchar(45) DEFAULT NULL,
  `strLogo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `strOwner` varchar(45),
  `strOIC` VARCHAR(45),
  `strLogo` VARCHAR(45)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblagency`
--

<<<<<<< HEAD
INSERT INTO `tblagency` (`strName`, `strAddress`, `strTelNum`, `strEmail`, `strOwner`, `strOIC`, `strLogo`) VALUES
('Mega Pacific Employment Services', 'Shaw Blvd, Mandaluyong 1552 Metro Manila', '(02)5310618', 'mega@xyz.com', '', 'Benilda Lazaro', '');

-- --------------------------------------------------------
=======
INSERT INTO `tblagency` VALUES ('Mega Pacific Employment Services','Shaw Blvd, Mandaluyong 1552 Metro Manila','(02)5310618','mega@xyz.com', '', 'Benilda Lazaro','');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblclient`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblclient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblclient` (
  `intClientID` int(11) NOT NULL,
  `strContact` varchar(45) DEFAULT NULL,
  `strCAHouseNo` varchar(45) DEFAULT NULL,
  `strCAStreet` varchar(45) DEFAULT NULL,
  `strCAProvince` varchar(45) DEFAULT NULL,
  `strCity` varchar(45) DEFAULT NULL,
  `strPAddress` varchar(70) DEFAULT NULL,
  `strOAddress` varchar(70) DEFAULT NULL,
<<<<<<< HEAD
  `strOContact` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `strOContact` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intClientID`),
  KEY `intClientID_idx` (`intClientID`),
  CONSTRAINT `intClientID` FOREIGN KEY (`intClientID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblclient`
--

<<<<<<< HEAD
INSERT INTO `tblclient` (`intClientID`, `strContact`, `strCAHouseNo`, `strCAStreet`, `strCAProvince`, `strCity`, `strPAddress`, `strOAddress`, `strOContact`) VALUES
(1, '01234516742', '32', 'anonas', 'Manila', 'Manila', '32 anonas Manila, Manila', '69 A. santos Mgo Bldg.', '332-42422'),
(4, '01234516742', '32', 'anonas', 'Manila', 'Manila', '32 anonas Manila, Manila', '69 A. santos Mgo Bldg.', '332-42422');

-- --------------------------------------------------------
=======
INSERT INTO `tblclient` VALUES (1,'01234516742','32','anonas','Manila','Manila','32 anonas Manila, Manila','69 A. santos Mgo Bldg.','332-42422'),(4,'01234516742','32','anonas','Manila','Manila','32 anonas Manila, Manila','69 A. santos Mgo Bldg.','332-42422');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblcontract`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblcontract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblcontract` (
  `intConTransID` int(11) NOT NULL,
  `intConReqNo` int(11) NOT NULL,
  `intConHWID` int(11) DEFAULT NULL,
  `intConSalary` decimal(9,2) DEFAULT NULL,
  `strConStatus` varchar(20) DEFAULT NULL,
  `datDateStarted` date DEFAULT NULL,
  `strCurStatus` varchar(20) DEFAULT NULL,
  `intConReplacementLeft` int(11) DEFAULT NULL,
<<<<<<< HEAD
  `strConCopy` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `strConCopy` varchar(50),
  KEY `intConTransID` (`intConTransID`),
  CONSTRAINT `intConTransID` FOREIGN KEY (`intConTransID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcontract`
--

-- INSERT INTO `tblcontract` VALUES (1,1,6,5000,'Approved','2018-09-07','Current',3);
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblfee`
--

<<<<<<< HEAD
CREATE TABLE `tblfee` (
  `intID` int(11) NOT NULL,
  `strName` varchar(30) DEFAULT NULL,
  `fltFee` decimal(9,2) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblfee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfee` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(30) DEFAULT NULL,
  `fltFee` decimal(9,2) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblfee`
--

<<<<<<< HEAD
INSERT INTO `tblfee` (`intID`, `strName`, `fltFee`, `strStatus`) VALUES
(1, 'Agency Fee', '8000.00', 'Active'),
(2, 'Drop-off', '600.00', 'Active'),
(3, 'Pick-up', '0.00', 'Active'),
(4, 'Replacement Fee', '1000.00', 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblfee` VALUES (1,'Agency Fee',8000.00,'Active'),(2,'Drop-off',600.00,'Active'),(3,'Pick-up',0.00,'Active'),(4,'Replacement Fee',1000.00,'Active'),(5,'Reliever Fee',0.00,'Active');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblfinalrequest`
--

<<<<<<< HEAD
CREATE TABLE `tblfinalrequest` (
  `intRequestID` int(11) NOT NULL,
=======
DROP TABLE IF EXISTS `tblfinalrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfinalrequest` (
  `intRequestID` int(11) NOT NULL AUTO_INCREMENT,
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
  `intRequest_ClientID` int(11) NOT NULL,
  `strRequestType` varchar(15) DEFAULT NULL,
  `strRequestName` varchar(50) DEFAULT NULL,
  `strRequestDesc` varchar(250) DEFAULT NULL,
  `datRequestDate` date DEFAULT NULL,
  `strRequestStatus` varchar(15) DEFAULT NULL,
<<<<<<< HEAD
  `datRequestNeedDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `datRequestNeedDate` date DEFAULT NULL,
  PRIMARY KEY (`intRequestID`),
  KEY `intRequest_ClientID_idx` (`intRequest_ClientID`),
  CONSTRAINT `intRequest_ClientID` FOREIGN KEY (`intRequest_ClientID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfinalrequest`
--

-- INSERT INTO `tblfinalrequest` VALUES (1,1,'Add','List 1','Tsst\r\n','2018-09-07','Finished','2018-09-08'),(2,1,'Add','Batch One','','2018-09-07','On process','2018-09-15');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblfreereplacement`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblfreereplacement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblfreereplacement` (
  `intFreeReplacement` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
<<<<<<< HEAD
=======
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblfreereplacement`
--

<<<<<<< HEAD
INSERT INTO `tblfreereplacement` (`intFreeReplacement`, `strStatus`) VALUES
(3, 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblfreereplacement` VALUES (3,'Active');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblhouseholdworker`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblhouseholdworker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblhouseholdworker` (
  `intHWID` int(11) NOT NULL,
  `intServiceID` int(11) DEFAULT NULL,
  `datBirthDay` date DEFAULT NULL,
  `strGender` varchar(10) DEFAULT NULL,
  `strCivilStatus` varchar(20) DEFAULT NULL,
  `strCitizenship` varchar(30) DEFAULT NULL,
  `strReligion` varchar(20) DEFAULT NULL,
  `strHeight` varchar(10) DEFAULT NULL,
  `strWeight` varchar(10) DEFAULT NULL,
  `strCellNum` varchar(11) DEFAULT NULL,
  `strTelNum` varchar(11) DEFAULT NULL,
  `strCAHouseNo` varchar(45) DEFAULT NULL,
  `strCAStreet` varchar(45) DEFAULT NULL,
  `strCAMunicipality` varchar(45) DEFAULT NULL,
  `strCity` varchar(45) DEFAULT NULL,
  `strPAddress` varchar(70) DEFAULT NULL,
  `strPofBirth` varchar(70) DEFAULT NULL,
<<<<<<< HEAD
  `strOtherSkills` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `strOtherSkills` longtext,
  PRIMARY KEY (`intHWID`),
  KEY `intHWID_idx` (`intHWID`),
  KEY `intServiceID_idx` (`intServiceID`),
  CONSTRAINT `intHWID` FOREIGN KEY (`intHWID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intServiceID` FOREIGN KEY (`intServiceID`) REFERENCES `tblmservice` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblhouseholdworker`
--

<<<<<<< HEAD
INSERT INTO `tblhouseholdworker` (`intHWID`, `intServiceID`, `datBirthDay`, `strGender`, `strCivilStatus`, `strCitizenship`, `strReligion`, `strHeight`, `strWeight`, `strCellNum`, `strTelNum`, `strCAHouseNo`, `strCAStreet`, `strCAMunicipality`, `strCity`, `strPAddress`, `strPofBirth`, `strOtherSkills`) VALUES
(6, 1, '1999-12-13', 'Female', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, '1999-12-14', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------
=======
INSERT INTO `tblhouseholdworker` VALUES (6,1,'1999-12-13','Female',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,1,'1999-12-14','Male',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblhw_educbg`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblhw_educbg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblhw_educbg` (
  `intHWID_educbg` int(11) NOT NULL,
  `strType` varchar(15) DEFAULT NULL,
  `strSchoolName` varchar(50) DEFAULT NULL,
  `strSchoolAdd` varchar(250) DEFAULT NULL,
  `intSchoolGrad` int(11) DEFAULT NULL,
<<<<<<< HEAD
  `strSchoolSkill` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `strSchoolSkill` varchar(50) DEFAULT NULL,
  KEY `intHWID_educbg_idx` (`intHWID_educbg`),
  CONSTRAINT `intHWID_educbg` FOREIGN KEY (`intHWID_educbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblhw_educbg`
--

<<<<<<< HEAD
INSERT INTO `tblhw_educbg` (`intHWID_educbg`, `strType`, `strSchoolName`, `strSchoolAdd`, `intSchoolGrad`, `strSchoolSkill`) VALUES
(6, 'Elementary', 'PUers', 'Manila', 2011, 'none'),
(7, 'Elementary', 'PUsers', 'Manila', 2011, 'none'),
(7, 'High School', 'PUP', 'Manila', 2019, 'none');

-- --------------------------------------------------------
=======
INSERT INTO `tblhw_educbg` VALUES (6,'Elementary','PUers','Manila',2011,'none'),(7,'Elementary','PUsers','Manila',2011,'none'),(7,'High School','PUP','Manila',2019,'none');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblhw_ref`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblhw_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblhw_ref` (
  `intHWID_ref` int(11) NOT NULL,
  `strType` varchar(15) DEFAULT NULL,
  `strName` varchar(50) DEFAULT NULL,
  `strAddress` varchar(100) DEFAULT NULL,
  `strOccupation` varchar(20) DEFAULT NULL,
<<<<<<< HEAD
  `strTelNo` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `strTelNo` varchar(15) DEFAULT NULL,
  KEY `intHWID_ref_idx` (`intHWID_ref`),
  CONSTRAINT `intHWID_ref` FOREIGN KEY (`intHWID_ref`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblhw_ref`
--

<<<<<<< HEAD
INSERT INTO `tblhw_ref` (`intHWID_ref`, `strType`, `strName`, `strAddress`, `strOccupation`, `strTelNo`) VALUES
(6, 'Relative', 'John Doe', 'Manila', 'Construction Worker', 'none');

-- --------------------------------------------------------
=======
INSERT INTO `tblhw_ref` VALUES (6,'Relative','John Doe','Manila','Construction Worker','none');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblhw_workbg`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblhw_workbg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblhw_workbg` (
  `intHWID_workbg` int(11) NOT NULL,
  `strWorkName` varchar(50) DEFAULT NULL,
  `strWorkAdd` varchar(250) DEFAULT NULL,
  `strWorkPosition` varchar(50) DEFAULT NULL,
  `intWorkStart` int(11) DEFAULT NULL,
<<<<<<< HEAD
  `intWorkEnd` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `intWorkEnd` int(11) DEFAULT NULL,
  KEY `intHWID_workbg_idx` (`intHWID_workbg`),
  CONSTRAINT `intHWID_workbg` FOREIGN KEY (`intHWID_workbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblhw_workbg`
--

<<<<<<< HEAD
INSERT INTO `tblhw_workbg` (`intHWID_workbg`, `strWorkName`, `strWorkAdd`, `strWorkPosition`, `intWorkStart`, `intWorkEnd`) VALUES
(6, 'Kainderya', 'Cook', 'Manila', 2016, 2017),
(6, 'Kainderya', 'Cook', 'Manila', 2017, 2018),
(7, 'Daycare Center', 'caregiver', 'Manila', 2017, 2018),
(7, 'Daycare Center', 'caregiver', 'Manila', 2016, 2019);

-- --------------------------------------------------------
=======
INSERT INTO `tblhw_workbg` VALUES (6,'Kainderya','Cook','Manila',2016,2017),(6,'Kainderya','Cook','Manila',2017,2018),(7,'Daycare Center','caregiver','Manila',2017,2018),(7,'Daycare Center','caregiver','Manila',2016,2019);
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblinitialrequest`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblinitialrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblinitialrequest` (
  `intIRequestID` int(11) NOT NULL,
  `intIRequest_No` int(11) DEFAULT NULL,
  `intITypeOfService` int(11) DEFAULT NULL,
  `intIQuantity` int(11) DEFAULT NULL,
  `intIRequestAge1` int(11) DEFAULT NULL,
  `intIRequestAge2` int(11) DEFAULT NULL,
  `strIRequestGender` varchar(10) DEFAULT NULL,
  `strIRequestEduc` varchar(20) DEFAULT NULL,
  `intIRequestExp` int(11) DEFAULT NULL,
<<<<<<< HEAD
  `deciRequestSalary` decimal(9,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `deciRequestSalary` decimal(9,2) DEFAULT NULL,
  KEY `intIRequest_No` (`intIRequest_No`),
  KEY `intIRequestID_idx` (`intIRequestID`),
  CONSTRAINT `intIRequestID` FOREIGN KEY (`intIRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblinitialrequest`
--

-- INSERT INTO `tblinitialrequest` VALUES (1,1,1,1,18,18,'Any','Elementary',0,5000.00),(2,1,1,1,18,18,'Any','Elementary',0,5000.00);
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblleaverequest`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblleaverequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblleaverequest` (
  `intLeaveRequestID` int(11) NOT NULL,
  `intHouseholdID` int(11) DEFAULT NULL,
  `intClientID` int(11) DEFAULT NULL,
  `datDateCreated` date DEFAULT NULL,
  `intTypeOfLeave` int(11) DEFAULT NULL,
  `strAddressOnLeave` varchar(100) DEFAULT NULL,
  `strReason` varchar(250) DEFAULT NULL,
  `datDateFrom` date DEFAULT NULL,
  `datDateTo` date DEFAULT NULL,
  `strReliever` varchar(10) DEFAULT NULL,
  `strLeaveStatus` varchar(50) DEFAULT NULL,
<<<<<<< HEAD
  `strRejReas` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `strRejReas` longtext,
  KEY `intTypeOfLeave` (`intTypeOfLeave`),
  KEY `intLeaveRequestID` (`intLeaveRequestID`),
  CONSTRAINT `intLeaveRequestID` FOREIGN KEY (`intLeaveRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `intTypeOfLeave` FOREIGN KEY (`intTypeOfLeave`) REFERENCES `tblmleave` (`intID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblleaverequest`
--

>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblmcity`
--

<<<<<<< HEAD
CREATE TABLE `tblmcity` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblmcity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmcity` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblmcity`
--

<<<<<<< HEAD
INSERT INTO `tblmcity` (`intID`, `strName`, `strStatus`) VALUES
(1, 'Caloocan', 'Active'),
(2, 'Makati', 'Active'),
(3, 'Las Piñas', 'Active'),
(4, 'Malabon', 'Active'),
(5, 'Mandaluyong', 'Active'),
(6, 'Manila', 'Active'),
(7, 'Marikina', 'Active'),
(8, 'Muntinlupa', 'Active'),
(9, 'Navotas', 'Active'),
(10, 'Parañaque', 'Active'),
(11, 'Pasay', 'Active'),
(12, 'Pasig', 'Active'),
(13, 'Quezon City', 'Active'),
(14, 'San Juan', 'Active'),
(15, 'Taguig', 'Active'),
(16, 'Valenzuela', 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblmcity` VALUES (1,'Caloocan','Active'),(2,'Makati','Inactive');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblmincidentreport`
--

<<<<<<< HEAD
CREATE TABLE `tblmincidentreport` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strDesc` varchar(250) DEFAULT NULL,
  `strLevel` varchar(20) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblmincidentreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmincidentreport` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(100) DEFAULT NULL,
  `strDesc` varchar(250) DEFAULT NULL,
  `strLevel` varchar(20) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblmincidentreport`
--

<<<<<<< HEAD
INSERT INTO `tblmincidentreport` (`intID`, `strName`, `strDesc`, `strLevel`, `strStatus`) VALUES
(1, 'Personal Injury', 'Physical injury inflicted on a person\'s body.', 'Low', 'Active'),
(2, 'Hazard', 'Something causing unavoidable danger, peril, risk, or difficulty.', NULL, 'Active'),
(3, 'Security/Violence', 'Behaviour involving physical force intended to hurt, damage,\r\nor kill someone or something, strength of emotion or of a destructive.', NULL, 'Active'),
(4, 'Workplace Illness', 'an illness or disease brought on, or caused by exposure \r\nin the workplace, to a physical, chemical, or biological agent\r\nto the extent that the health of a staff member is impaired.', NULL, 'Active'),
(5, 'Fire Alarm', 'An undesirable event which emits heat, smoke and/or flame,\r\nwhich has the potential to cause damage.', NULL, 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblmincidentreport` VALUES (1,'Personal Injury','Physical injury inflicted on a person\'s body.','Low','Active');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblmleave`
--

<<<<<<< HEAD
CREATE TABLE `tblmleave` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `intDays` int(11) DEFAULT NULL,
  `intDaysForFile` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblmleave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmleave` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(100) DEFAULT NULL,
  `intDays` int(11) DEFAULT NULL,
  `intDaysForFile` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblmleave`
--

<<<<<<< HEAD
INSERT INTO `tblmleave` (`intID`, `strName`, `intDays`, `intDaysForFile`, `strStatus`) VALUES
(1, 'Vacation Leave', 5, 7, 'Active'),
(2, 'Sick Leave', 1, 1, 'Active'),
(3, 'Maternity Leave', 40, NULL, 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblmleave` VALUES (1,'Vacation Leave',5,7,'Active'),(2,'Sick Leave',1,1,'Inactive');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblmreplacereason`
--

<<<<<<< HEAD
CREATE TABLE `tblmreplacereason` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblmreplacereason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmreplacereason` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblmreplacereason`
--

<<<<<<< HEAD
INSERT INTO `tblmreplacereason` (`intID`, `strName`, `strStatus`) VALUES
(2, 'rude behaviour', 'Active'),
(3, 'Can\'t able to do the household chores', 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblmreplacereason` VALUES (2,'rude behaviour','Active');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblmrequirements`
--

<<<<<<< HEAD
CREATE TABLE `tblmrequirements` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strType` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblmrequirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmrequirements` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(100) DEFAULT NULL,
  `strType` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblmrequirements`
--

<<<<<<< HEAD
INSERT INTO `tblmrequirements` (`intID`, `strName`, `strType`, `strStatus`) VALUES
(1, 'NBI', 'Client', 'Active'),
(2, '2 Valid ID', 'Client', 'Active'),
(3, '2x2 picture ( 2 copies )', 'Client', 'Active'),
(4, '2x2 picture ( 2 copies )', 'Household Worker', 'Active'),
(5, 'Birth Certificate (PSA)', 'Household Worker', 'Active'),
(6, 'NBI', 'Household Worker', 'Active'),
(7, 'Medical Certificate', 'Household Worker', 'Active'),
(8, 'SSS', 'Household Worker', 'Active'),
(9, 'Pag-ibig', 'Household Worker', 'Active'),
(10, 'Philhealth', 'Household Worker', 'Active'),
(11, 'Diploma/Certificate ( for college/vocational degree )', 'Household Worker', 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblmrequirements` VALUES (1,'NBI','Client','Active'),(2,'2 Valid ID','Client','Inactive');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblmservice`
--

<<<<<<< HEAD
CREATE TABLE `tblmservice` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `deciRate` decimal(9,2) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblmservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmservice` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(100) DEFAULT NULL,
  `deciRate` decimal(9,2) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblmservice`
--

<<<<<<< HEAD
INSERT INTO `tblmservice` (`intID`, `strName`, `deciRate`, `strStatus`) VALUES
(1, 'Housemaid', '3000.00', 'Active'),
(2, 'Cook', '3000.00', 'Active'),
(3, 'Driver', '3000.00', 'Active'),
(4, 'Nanny', '3000.00', 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblmservice` VALUES (1,'Housemaid',3000.00,'Active'),(2,'Cook',3000.00,'Active'),(3,'Driver',3000.00,'Active'),(4,'Nanny',3000.00,'Active');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblmskills`
--

<<<<<<< HEAD
CREATE TABLE `tblmskills` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `intSkillID_intID` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
DROP TABLE IF EXISTS `tblmskills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmskills` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(100) DEFAULT NULL,
  `intSkillID_intID` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  KEY `intSkillID_idx` (`intID`),
  KEY `intSkillID_intID` (`intSkillID_intID`),
  CONSTRAINT `intSkillID_intID` FOREIGN KEY (`intSkillID_intID`) REFERENCES `tblmservice` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tblmskills`
--

<<<<<<< HEAD
INSERT INTO `tblmskills` (`intID`, `strName`, `intSkillID_intID`, `strStatus`) VALUES
(1, 'Can international course.', 2, 'Active'),
(2, 'Knows how to iron clothes', 1, 'Active'),
(3, 'Can operate washing machine.', NULL, 'Active'),
(4, 'Can operate microwave.', NULL, 'Active'),
(5, 'Can handle pets.', NULL, 'Active'),
(6, 'Can wash car.', NULL, 'Active'),
(7, 'Can do general house keeping.', NULL, 'Active'),
(8, 'Willing to take care of baby.', NULL, 'Active'),
(9, 'Know how to bath baby.', NULL, 'Active'),
(10, 'Know how to sterilize feeding bottle.', NULL, 'Active'),
(11, 'Willing to handle special child.', NULL, 'Active'),
(12, 'Willing to handle toddlers.', NULL, 'Active'),
(13, 'Willing to do my personal laundry by hand.', NULL, 'Active'),
(14, 'Willing to work for foreigner employee.', NULL, 'Active'),
(15, 'Can promise NOT to use make-up while working.', NULL, 'Active'),
(16, 'Can be left alone at night.', NULL, 'Active'),
(17, 'Can operate vacuum cleaner.', NULL, 'Active'),
(18, 'Can do simple sewing.', NULL, 'Active'),
(19, 'Can do gardening.', NULL, 'Active'),
(20, 'Can cook Filipino food.', NULL, 'Active'),
(21, 'Can cook international food.', NULL, 'Active'),
(22, 'Know how to feed a baby.', NULL, 'Active'),
(23, 'Know how to cook baby food.', NULL, 'Active'),
(24, 'Know how to dress a baby.', NULL, 'Active'),
(25, 'Willing to handle special child with disability.', NULL, 'Active'),
(26, 'Can promise NOT to use employer\'s telephone/cellphone.', NULL, 'Active'),
(27, 'Can promise NOT to use cellphone during working hours.', NULL, 'Active'),
(28, 'Can work during day-off with compensation.', NULL, 'Active'),
(29, 'Have long patience.', NULL, 'Active'),
(30, 'Willing to sleep late.', NULL, 'Active');

-- --------------------------------------------------------
=======
INSERT INTO `tblmskills` VALUES (1,'Can international course.',2,'Active'),(2,'Knows how to iron clothes',1,'Inactive');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblreliever`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblreliever`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblreliever` (
  `intReq_RelID` int(11) NOT NULL,
  `intTobeRelievedID` int(11) DEFAULT NULL,
  `intRelieverID` int(11) DEFAULT NULL,
<<<<<<< HEAD
  `strRelieverStatus` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `strRelieverStatus` varchar(30) DEFAULT NULL,
  KEY `intReq_RelID` (`intReq_RelID`),
  CONSTRAINT `intReq_RelID` FOREIGN KEY (`intReq_RelID`) REFERENCES `tblleaverequest` (`intLeaveRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblreliever`
--

>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblreplacement`
--

<<<<<<< HEAD
CREATE TABLE `tblreplacement` (
  `intReplaceReqID` int(11) NOT NULL,
  `intReplaceOldHWID` int(11) NOT NULL,
  `intReplaceNewHWID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
DROP TABLE IF EXISTS `tblreplacement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblreplacement` (
  `intReplaceReqID` int(11) NOT NULL,
  `intReplaceOldHWID` int(11) NOT NULL,
  `intReplaceNewHWID` int(11) DEFAULT NULL,
  KEY `intReplaceReqID` (`intReplaceReqID`),
  KEY `intReplaceOldHWID` (`intReplaceOldHWID`),
  CONSTRAINT `intReplaceOldHWID` FOREIGN KEY (`intReplaceOldHWID`) REFERENCES `tblhouseholdworker` (`intHWID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `intReplaceReqID` FOREIGN KEY (`intReplaceReqID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblreplacement`
--

>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblreport`
--

<<<<<<< HEAD
CREATE TABLE `tblreport` (
  `intReportID` int(11) NOT NULL,
=======
DROP TABLE IF EXISTS `tblreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblreport` (
  `intReportID` int(11) NOT NULL AUTO_INCREMENT,
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
  `intReporterID` int(11) DEFAULT NULL,
  `intRecipentID` int(11) DEFAULT NULL,
  `intTypeofReport` int(11) DEFAULT NULL,
  `strReason` varchar(250) DEFAULT NULL,
  `strPicture` varchar(45) DEFAULT NULL,
  `strValidity` varchar(50) DEFAULT NULL,
  `datDateReported` date DEFAULT NULL,
  `strReportStatus` varchar(50) DEFAULT NULL,
<<<<<<< HEAD
  `strActionTaken` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `strActionTaken` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`intReportID`),
  KEY `intTypeofReport` (`intTypeofReport`),
  CONSTRAINT `intTypeofReport` FOREIGN KEY (`intTypeofReport`) REFERENCES `tblmincidentreport` (`intID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblreport`
--

>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tblresults`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tblresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tblresults` (
  `intRRequestID` int(11) NOT NULL,
  `intRRequest_No` int(11) DEFAULT NULL,
  `intRHWID` int(11) DEFAULT NULL,
  `strRHWStatus` varchar(20) DEFAULT NULL,
<<<<<<< HEAD
  `strRClientStatus` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `strRClientStatus` varchar(20) DEFAULT NULL,
  KEY `intRRequestID` (`intRRequestID`),
  KEY `intRHWID` (`intRHWID`),
  CONSTRAINT `intRHWID` FOREIGN KEY (`intRHWID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intRRequestID` FOREIGN KEY (`intRRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblresults`
--

-- INSERT INTO `tblresults` VALUES (1,1,6,'Approved','Approved'),(2,1,7,'Waiting','');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tbltransaction`
--

<<<<<<< HEAD
=======
DROP TABLE IF EXISTS `tbltransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
CREATE TABLE `tbltransaction` (
  `intTRequestID` int(11) NOT NULL,
  `intTClientID` int(11) DEFAULT NULL,
  `datDateRequested` date DEFAULT NULL,
  `intTypeofDeployment` int(11) DEFAULT NULL,
  `datDateofDeployment` date DEFAULT NULL,
  `timTimeofDeployment` time DEFAULT NULL,
  `strContract` varchar(100) DEFAULT NULL,
  `strContractStatus` varchar(20) DEFAULT NULL,
  `datDateSettled` date DEFAULT NULL,
  `datDateExpiry` date DEFAULT NULL,
  `strTStatus` varchar(20) DEFAULT NULL,
  `strORNumber` varchar(20) DEFAULT NULL,
  `strInvoiceNum` varchar(20) DEFAULT NULL,
  `strORPicture` varchar(45) DEFAULT NULL,
<<<<<<< HEAD
  `strConRemarks` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
=======
  `strConRemarks` longtext,
  KEY `intTRequestID` (`intTRequestID`),
  CONSTRAINT `intTRequestID` FOREIGN KEY (`intTRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltransaction`
--

-- INSERT INTO `tbltransaction` VALUES (1,1,'2018-09-07',2,'2018-09-14','14:22:00','','Accepted','2018-09-07','2019-03-07','On-going','1001','20181','1-J0RpL6Gnk5.jpg');
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Table structure for table `tbluser`
--

<<<<<<< HEAD
CREATE TABLE `tbluser` (
  `intID` int(11) NOT NULL,
=======
DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
  `strFName` varchar(45) DEFAULT NULL,
  `strMName` varchar(45) DEFAULT NULL,
  `strLName` varchar(45) DEFAULT NULL,
  `strEmail` varchar(45) DEFAULT NULL,
  `strPassword` varchar(45) DEFAULT NULL,
  `strPicture` varchar(100) DEFAULT NULL,
  `strType` varchar(45) DEFAULT NULL,
<<<<<<< HEAD
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
=======
  `strStatus` varchar(45) DEFAULT NULL,
  `datDateRegistered` date DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700

--
-- Dumping data for table `tbluser`
--

<<<<<<< HEAD
INSERT INTO `tbluser` (`intID`, `strFName`, `strMName`, `strLName`, `strEmail`, `strPassword`, `strPicture`, `strType`, `strStatus`) VALUES
(1, 'lance', 'luna', 'sanpablo', 'lance@xyz.com', 'pass', 'blank.jpg', 'Client', 'Registered'),
(2, 'jeron', 'lun', 'pablo', 'jeron@xyz.com', 'pass', 'blank.jpg', 'Household Worker', 'Registered'),
(3, 'lanz', 'lu', 'sanpabloz', 'lanz@xyz.com', 'pass', 'blank.jpg', 'Admin', 'Registered'),
(4, 'lancer', 'lunar', 'sanpablor', 'lancer@xyz.com', 'pass', 'blank.jpg', 'Client', 'Unregistered'),
(5, 'lancers', 'lunasr', 'sanpablors', 'lancers@xyz.com', 'pass', 'blank.jpg', 'Household Worker', 'Unregistered'),
(6, 'Jane', 'Saint', 'Doe', 'test@xyz.com', 'test', 'blank.jpg', 'Household Worker', 'Registered'),
(7, 'Jane7', 'Saint7', 'Doe7', 'test7@xyz.com', 'test7', 'blank.jpg', 'Household Worker', 'Registered');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `tblclient`
--
ALTER TABLE `tblclient`
  ADD PRIMARY KEY (`intClientID`),
  ADD KEY `intClientID_idx` (`intClientID`);

--
-- Indexes for table `tblcontract`
--
ALTER TABLE `tblcontract`
  ADD KEY `intConTransID` (`intConTransID`);

--
-- Indexes for table `tblfee`
--
ALTER TABLE `tblfee`
  ADD PRIMARY KEY (`intID`);

--
-- Indexes for table `tblfinalrequest`
--
ALTER TABLE `tblfinalrequest`
  ADD PRIMARY KEY (`intRequestID`),
  ADD KEY `intRequest_ClientID_idx` (`intRequest_ClientID`);

--
-- Indexes for table `tblhouseholdworker`
--
ALTER TABLE `tblhouseholdworker`
  ADD PRIMARY KEY (`intHWID`),
  ADD KEY `intHWID_idx` (`intHWID`),
  ADD KEY `intServiceID_idx` (`intServiceID`);

--
-- Indexes for table `tblhw_educbg`
--
ALTER TABLE `tblhw_educbg`
  ADD KEY `intHWID_educbg_idx` (`intHWID_educbg`);

--
-- Indexes for table `tblhw_ref`
--
ALTER TABLE `tblhw_ref`
  ADD KEY `intHWID_ref_idx` (`intHWID_ref`);

--
-- Indexes for table `tblhw_workbg`
--
ALTER TABLE `tblhw_workbg`
  ADD KEY `intHWID_workbg_idx` (`intHWID_workbg`);

--
-- Indexes for table `tblinitialrequest`
--
ALTER TABLE `tblinitialrequest`
  ADD KEY `intIRequest_No` (`intIRequest_No`),
  ADD KEY `intIRequestID_idx` (`intIRequestID`);

--
-- Indexes for table `tblleaverequest`
--
ALTER TABLE `tblleaverequest`
  ADD KEY `intTypeOfLeave` (`intTypeOfLeave`),
  ADD KEY `intLeaveRequestID` (`intLeaveRequestID`);

--
-- Indexes for table `tblmcity`
--
ALTER TABLE `tblmcity`
  ADD PRIMARY KEY (`intID`);

--
-- Indexes for table `tblmincidentreport`
--
ALTER TABLE `tblmincidentreport`
  ADD PRIMARY KEY (`intID`);

--
-- Indexes for table `tblmleave`
--
ALTER TABLE `tblmleave`
  ADD PRIMARY KEY (`intID`);

--
-- Indexes for table `tblmreplacereason`
--
ALTER TABLE `tblmreplacereason`
  ADD PRIMARY KEY (`intID`);

--
-- Indexes for table `tblmrequirements`
--
ALTER TABLE `tblmrequirements`
  ADD PRIMARY KEY (`intID`);

--
-- Indexes for table `tblmservice`
--
ALTER TABLE `tblmservice`
  ADD PRIMARY KEY (`intID`);

--
-- Indexes for table `tblmskills`
--
ALTER TABLE `tblmskills`
  ADD KEY `intSkillID_idx` (`intID`),
  ADD KEY `intSkillID_intID` (`intSkillID_intID`);

--
-- Indexes for table `tblreliever`
--
ALTER TABLE `tblreliever`
  ADD KEY `intReq_RelID` (`intReq_RelID`);

--
-- Indexes for table `tblreplacement`
--
ALTER TABLE `tblreplacement`
  ADD KEY `intReplaceReqID` (`intReplaceReqID`),
  ADD KEY `intReplaceOldHWID` (`intReplaceOldHWID`);

--
-- Indexes for table `tblreport`
--
ALTER TABLE `tblreport`
  ADD PRIMARY KEY (`intReportID`),
  ADD KEY `intTypeofReport` (`intTypeofReport`);

--
-- Indexes for table `tblresults`
--
ALTER TABLE `tblresults`
  ADD KEY `intRRequestID` (`intRRequestID`),
  ADD KEY `intRHWID` (`intRHWID`);

--
-- Indexes for table `tbltransaction`
--
ALTER TABLE `tbltransaction`
  ADD KEY `intTRequestID` (`intTRequestID`);

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`intID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblfee`
--
ALTER TABLE `tblfee`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tblfinalrequest`
--
ALTER TABLE `tblfinalrequest`
  MODIFY `intRequestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblmcity`
--
ALTER TABLE `tblmcity`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tblmincidentreport`
--
ALTER TABLE `tblmincidentreport`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tblmleave`
--
ALTER TABLE `tblmleave`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tblmreplacereason`
--
ALTER TABLE `tblmreplacereason`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tblmrequirements`
--
ALTER TABLE `tblmrequirements`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tblmservice`
--
ALTER TABLE `tblmservice`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tblmskills`
--
ALTER TABLE `tblmskills`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tblreport`
--
ALTER TABLE `tblreport`
  MODIFY `intReportID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `intID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblclient`
--
ALTER TABLE `tblclient`
  ADD CONSTRAINT `intClientID` FOREIGN KEY (`intClientID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblcontract`
--
ALTER TABLE `tblcontract`
  ADD CONSTRAINT `intConTransID` FOREIGN KEY (`intConTransID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblfinalrequest`
--
ALTER TABLE `tblfinalrequest`
  ADD CONSTRAINT `intRequest_ClientID` FOREIGN KEY (`intRequest_ClientID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblhouseholdworker`
--
ALTER TABLE `tblhouseholdworker`
  ADD CONSTRAINT `intHWID` FOREIGN KEY (`intHWID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `intServiceID` FOREIGN KEY (`intServiceID`) REFERENCES `tblmservice` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblhw_educbg`
--
ALTER TABLE `tblhw_educbg`
  ADD CONSTRAINT `intHWID_educbg` FOREIGN KEY (`intHWID_educbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblhw_ref`
--
ALTER TABLE `tblhw_ref`
  ADD CONSTRAINT `intHWID_ref` FOREIGN KEY (`intHWID_ref`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblhw_workbg`
--
ALTER TABLE `tblhw_workbg`
  ADD CONSTRAINT `intHWID_workbg` FOREIGN KEY (`intHWID_workbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblinitialrequest`
--
ALTER TABLE `tblinitialrequest`
  ADD CONSTRAINT `intIRequestID` FOREIGN KEY (`intIRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblleaverequest`
--
ALTER TABLE `tblleaverequest`
  ADD CONSTRAINT `intLeaveRequestID` FOREIGN KEY (`intLeaveRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `intTypeOfLeave` FOREIGN KEY (`intTypeOfLeave`) REFERENCES `tblmleave` (`intID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblmskills`
--
ALTER TABLE `tblmskills`
  ADD CONSTRAINT `intSkillID_intID` FOREIGN KEY (`intSkillID_intID`) REFERENCES `tblmservice` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tblreliever`
--
ALTER TABLE `tblreliever`
  ADD CONSTRAINT `intReq_RelID` FOREIGN KEY (`intReq_RelID`) REFERENCES `tblleaverequest` (`intLeaveRequestID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblreplacement`
--
ALTER TABLE `tblreplacement`
  ADD CONSTRAINT `intReplaceOldHWID` FOREIGN KEY (`intReplaceOldHWID`) REFERENCES `tblhouseholdworker` (`intHWID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `intReplaceReqID` FOREIGN KEY (`intReplaceReqID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblreport`
--
ALTER TABLE `tblreport`
  ADD CONSTRAINT `intTypeofReport` FOREIGN KEY (`intTypeofReport`) REFERENCES `tblmincidentreport` (`intID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblresults`
--
ALTER TABLE `tblresults`
  ADD CONSTRAINT `intRHWID` FOREIGN KEY (`intRHWID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `intRRequestID` FOREIGN KEY (`intRRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbltransaction`
--
ALTER TABLE `tbltransaction`
  ADD CONSTRAINT `intTRequestID` FOREIGN KEY (`intTRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
=======
INSERT INTO `tbluser` VALUES (1,'lance','luna','sanpablo','lance@xyz.com','pass','blank.jpg','Client','Registered','2017-02-13'),(2,'jeron','lun','pablo','jeron@xyz.com','pass','blank.jpg','Household Worker','Registered',NULL),(3,'lanz','lu','sanpabloz','lanz@xyz.com','pass','blank.jpg','Admin','Registered',NULL),(4,'lancer','lunar','sanpablor','lancer@xyz.com','pass','blank.jpg','Client','Unregistered',NULL),(5,'lancers','lunasr','sanpablors','lancers@xyz.com','pass','blank.jpg','Household Worker','Unregistered',NULL),(6,'Jane','Saint','Doe','test@xyz.com','test','blank.jpg','Household Worker','Registered','2018-02-13'),(7,'Jane7','Saint7','Doe7','test7@xyz.com','test7','blank.jpg','Household Worker','Registered','2018-05-13');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
>>>>>>> dc28be7cc32348306a7e24b370748fb025f4d700
