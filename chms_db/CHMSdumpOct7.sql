-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: chms
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblagency`
--

DROP TABLE IF EXISTS `tblagency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblagency` (
  `strName` varchar(100) DEFAULT NULL,
  `strAddress` varchar(200) DEFAULT NULL,
  `strTelNum` varchar(11) DEFAULT NULL,
  `strEmail` varchar(45) DEFAULT NULL,
  `strOwner` varchar(45) DEFAULT NULL,
  `strOIC` varchar(45) DEFAULT NULL,
  `strLogo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblagency`
--

INSERT INTO `tblagency` VALUES ('Mega Pacific Employment Services','Shaw Blvd, Mandaluyong 1552 Metro Manila','(02)5310618','mega@xyz.com', '', 'Benilda Lazaro','');

--
-- Table structure for table `tblclient`
--

DROP TABLE IF EXISTS `tblclient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblclient` (
  `intClientID` int(11) NOT NULL,
  `strContact` varchar(45) DEFAULT NULL,
  `strCAHouseNo` varchar(45) DEFAULT NULL,
  `strCAStreet` varchar(45) DEFAULT NULL,
  `strCAProvince` varchar(45) DEFAULT NULL,
  `strCity` varchar(45) DEFAULT NULL,
  `strPAddress` varchar(70) DEFAULT NULL,
  `strOAddress` varchar(70) DEFAULT NULL,
  `strOContact` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`intClientID`),
  KEY `intClientID_idx` (`intClientID`),
  CONSTRAINT `intClientID` FOREIGN KEY (`intClientID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblclient`
--

INSERT INTO `tblclient` VALUES (1,'01234516742','32','anonas','Manila','Manila','32 anonas Manila, Manila','69 A. santos Mgo Bldg.','332-42422'),(4,'01234516742','32','anonas','Manila','Manila','32 anonas Manila, Manila','69 A. santos Mgo Bldg.','332-42422');

--
-- Table structure for table `tblcontract`
--

DROP TABLE IF EXISTS `tblcontract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcontract` (
  `intConTransID` int(11) NOT NULL,
  `intConReqNo` int(11) NOT NULL,
  `intConHWID` int(11) DEFAULT NULL,
  `intConSalary` decimal(9,2) DEFAULT NULL,
  `strConStatus` varchar(20) DEFAULT NULL,
  `datDateStarted` date DEFAULT NULL,
  `strCurStatus` varchar(20) DEFAULT NULL,
  `intConReplacementLeft` int(11) DEFAULT NULL,
  `strConCopy` varchar(50),
  KEY `intConTransID` (`intConTransID`),
  CONSTRAINT `intConTransID` FOREIGN KEY (`intConTransID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcontract`
--

-- INSERT INTO `tblcontract` VALUES (1,1,6,5000,'Approved','2018-09-07','Current',3);

--
-- Table structure for table `tblfee`
--

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

--
-- Dumping data for table `tblfee`
--

INSERT INTO `tblfee` VALUES (1,'Agency Fee',8000.00,'Active'),(2,'Drop-off',600.00,'Active'),(3,'Pick-up',0.00,'Active'),(4,'Replacement Fee',1000.00,'Active'),(5,'Reliever Fee',0.00,'Active');

--
-- Table structure for table `tblfinalrequest`
--

DROP TABLE IF EXISTS `tblfinalrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfinalrequest` (
  `intRequestID` int(11) NOT NULL AUTO_INCREMENT,
  `intRequest_ClientID` int(11) NOT NULL,
  `strRequestType` varchar(15) DEFAULT NULL,
  `strRequestName` varchar(50) DEFAULT NULL,
  `strRequestDesc` varchar(250) DEFAULT NULL,
  `datRequestDate` date DEFAULT NULL,
  `strRequestStatus` varchar(15) DEFAULT NULL,
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

--
-- Table structure for table `tblfreereplacement`
--

DROP TABLE IF EXISTS `tblfreereplacement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblfreereplacement` (
  `intFreeReplacement` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblfreereplacement`
--

INSERT INTO `tblfreereplacement` VALUES (3,'Active');

--
-- Table structure for table `tblhouseholdworker`
--

DROP TABLE IF EXISTS `tblhouseholdworker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `strOtherSkills` longtext,
  PRIMARY KEY (`intHWID`),
  KEY `intHWID_idx` (`intHWID`),
  KEY `intServiceID_idx` (`intServiceID`),
  CONSTRAINT `intHWID` FOREIGN KEY (`intHWID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intServiceID` FOREIGN KEY (`intServiceID`) REFERENCES `tblmservice` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblhouseholdworker`
--

INSERT INTO `tblhouseholdworker` VALUES (6,1,'1999-12-13','Female',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,1,'1998-12-14','Male',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

--
-- Table structure for table `tblhw_educbg`
--

DROP TABLE IF EXISTS `tblhw_educbg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblhw_educbg` (
  `intHWID_educbg` int(11) NOT NULL,
  `strType` varchar(15) DEFAULT NULL,
  `strSchoolName` varchar(50) DEFAULT NULL,
  `strSchoolAdd` varchar(250) DEFAULT NULL,
  `intSchoolGrad` int(11) DEFAULT NULL,
  `strSchoolSkill` varchar(50) DEFAULT NULL,
  KEY `intHWID_educbg_idx` (`intHWID_educbg`),
  CONSTRAINT `intHWID_educbg` FOREIGN KEY (`intHWID_educbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblhw_educbg`
--

INSERT INTO `tblhw_educbg` VALUES (6,'Elementary','PUers','Manila',2011,'none'),(7,'Elementary','PUsers','Manila',2011,'none'),(7,'High School','PUP','Manila',2019,'none');

--
-- Table structure for table `tblhw_ref`
--

DROP TABLE IF EXISTS `tblhw_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblhw_ref` (
  `intHWID_ref` int(11) NOT NULL,
  `strType` varchar(15) DEFAULT NULL,
  `strName` varchar(50) DEFAULT NULL,
  `strAddress` varchar(100) DEFAULT NULL,
  `strOccupation` varchar(20) DEFAULT NULL,
  `strTelNo` varchar(15) DEFAULT NULL,
  KEY `intHWID_ref_idx` (`intHWID_ref`),
  CONSTRAINT `intHWID_ref` FOREIGN KEY (`intHWID_ref`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblhw_ref`
--

INSERT INTO `tblhw_ref` VALUES (6,'Relative','John Doe','Manila','Construction Worker','none');

--
-- Table structure for table `tblhw_workbg`
--

DROP TABLE IF EXISTS `tblhw_workbg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblhw_workbg` (
  `intHWID_workbg` int(11) NOT NULL,
  `strWorkName` varchar(50) DEFAULT NULL,
  `strWorkAdd` varchar(250) DEFAULT NULL,
  `strWorkPosition` varchar(50) DEFAULT NULL,
  `intWorkStart` int(11) DEFAULT NULL,
  `intWorkEnd` int(11) DEFAULT NULL,
  KEY `intHWID_workbg_idx` (`intHWID_workbg`),
  CONSTRAINT `intHWID_workbg` FOREIGN KEY (`intHWID_workbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblhw_workbg`
--

INSERT INTO `tblhw_workbg` VALUES (6,'Kainderya','Cook','Manila',2016,2017),(6,'Kainderya','Cook','Manila',2017,2018),(7,'Daycare Center','caregiver','Manila',2017,2018),(7,'Daycare Center','caregiver','Manila',2016,2019);

--
-- Table structure for table `tblinitialrequest`
--

DROP TABLE IF EXISTS `tblinitialrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

--
-- Table structure for table `tblleaverequest`
--

DROP TABLE IF EXISTS `tblleaverequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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


--
-- Table structure for table `tblmcity`
--

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

--
-- Dumping data for table `tblmcity`
--

INSERT INTO `tblmcity` VALUES
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

--
-- Table structure for table `tblmincidentreport`
--

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

--
-- Dumping data for table `tblmincidentreport`
--

INSERT INTO `tblmincidentreport` VALUES
(1, 'Personal Injury', 'Physical injury inflicted on a person\s body.', 'Low', 'Active'),
(2, 'Hazard', 'Something causing unavoidable danger, peril, risk, or difficulty.', NULL, 'Active'),
(3, 'Security/Violence', 'Behaviour involving physical force intended to hurt, damage,\r\nor kill someone or something, strength of emotion or of a destructive.', NULL, 'Active'),
(4, 'Workplace Illness', 'an illness or disease brought on, or caused by exposure \r\nin the workplace, to a physical, chemical, or biological agent\r\nto the extent that the health of a staff member is impaired.', NULL, 'Active'),
(5, 'Fire Alarm', 'An undesirable event which emits heat, smoke and/or flame,\r\nwhich has the potential to cause damage.', NULL, 'Active');

-- --------------------------------------------------------
-- INSERT INTO `tblmincidentreport` VALUES (1,'Personal Injury','Physical injury inflicted on a person\'s body.','Low','Active');

--
-- Table structure for table `tblmleave`
--

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

--
-- Dumping data for table `tblmleave`
--

INSERT INTO `tblmleave` VALUES
(1, 'Vacation Leave', 5, 7, 'Active'),
(2, 'Sick Leave', 1, 1, 'Active'),
(3, 'Maternity Leave', 40, NULL, 'Active');

-- --------------------------------------------------------
-- INSERT INTO `tblmleave` VALUES (1,'Vacation Leave',5,7,'Active'),(2,'Sick Leave',1,1,'Inactive');

--
-- Table structure for table `tblmreplacereason`
--

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

--
-- Dumping data for table `tblmreplacereason`
--

INSERT INTO `tblmreplacereason` VALUES
(2, 'rude behaviour', 'Active'),
(3, 'Cant able to do the household chores', 'Active');

-- --------------------------------------------------------
-- INSERT INTO `tblmreplacereason` VALUES (2,'rude behaviour','Active');

--
-- Table structure for table `tblmrequirements`
--

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

--
-- Dumping data for table `tblmrequirements`
--

INSERT INTO `tblmrequirements` VALUES
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

--
-- Table structure for table `tblmservice`
--

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

--
-- Dumping data for table `tblmservice`
--

INSERT INTO `tblmservice` VALUES (1,'Housemaid',3000.00,'Active'),(2,'Cook',3000.00,'Active'),(3,'Driver',3000.00,'Active'),(4,'Nanny',3000.00,'Active');

--
-- Table structure for table `tblmskills`
--

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

--
-- Dumping data for table `tblmskills`
--

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
(26, 'Can promise NOT to use employers telephone/cellphone.', NULL, 'Active'),
(27, 'Can promise NOT to use cellphone during working hours.', NULL, 'Active'),
(28, 'Can work during day-off with compensation.', NULL, 'Active'),
(29, 'Have long patience.', NULL, 'Active'),
(30, 'Willing to sleep late.', NULL, 'Active');

-- --------------------------------------------------------
-- INSERT INTO `tblmskills` VALUES (1,'Can international course.',2,'Active'),(2,'Knows how to iron clothes',1,'Inactive');

--
-- Table structure for table `tblreliever`
--

DROP TABLE IF EXISTS `tblreliever`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblreliever` (
  `intReq_RelID` int(11) NOT NULL,
  `intTobeRelievedID` int(11) DEFAULT NULL,
  `intRelieverID` int(11) DEFAULT NULL,
  `strRelieverStatus` varchar(30) DEFAULT NULL,
  KEY `intReq_RelID` (`intReq_RelID`),
  CONSTRAINT `intReq_RelID` FOREIGN KEY (`intReq_RelID`) REFERENCES `tblleaverequest` (`intLeaveRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblreliever`
--


--
-- Table structure for table `tblreplacement`
--

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


--
-- Table structure for table `tblreport`
--

DROP TABLE IF EXISTS `tblreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblreport` (
  `intReportID` int(11) NOT NULL AUTO_INCREMENT,
  `intReporterID` int(11) DEFAULT NULL,
  `intRecipentID` int(11) DEFAULT NULL,
  `intTypeofReport` int(11) DEFAULT NULL,
  `strReason` varchar(250) DEFAULT NULL,
  `strPicture` varchar(45) DEFAULT NULL,
  `strValidity` varchar(50) DEFAULT NULL,
  `datDateReported` date DEFAULT NULL,
  `strReportStatus` varchar(50) DEFAULT NULL,
  `strActionTaken` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`intReportID`),
  KEY `intTypeofReport` (`intTypeofReport`),
  CONSTRAINT `intTypeofReport` FOREIGN KEY (`intTypeofReport`) REFERENCES `tblmincidentreport` (`intID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblreport`
--


--
-- Table structure for table `tblresults`
--

DROP TABLE IF EXISTS `tblresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblresults` (
  `intRRequestID` int(11) NOT NULL,
  `intRRequest_No` int(11) DEFAULT NULL,
  `intRHWID` int(11) DEFAULT NULL,
  `strRHWStatus` varchar(20) DEFAULT NULL,
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

--
-- Table structure for table `tbltransaction`
--

DROP TABLE IF EXISTS `tbltransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `strConRemarks` longtext,
  KEY `intTRequestID` (`intTRequestID`),
  CONSTRAINT `intTRequestID` FOREIGN KEY (`intTRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltransaction`
--

-- INSERT INTO `tbltransaction` VALUES (1,1,'2018-09-07',2,'2018-09-14','14:22:00','','Accepted','2018-09-07','2019-03-07','On-going','1001','20181','1-J0RpL6Gnk5.jpg');

--
-- Table structure for table `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbluser` (
  `intID` int(11) NOT NULL AUTO_INCREMENT,
  `strFName` varchar(45) DEFAULT NULL,
  `strMName` varchar(45) DEFAULT NULL,
  `strLName` varchar(45) DEFAULT NULL,
  `strEmail` varchar(45) DEFAULT NULL,
  `strPassword` varchar(45) DEFAULT NULL,
  `strPicture` varchar(100) DEFAULT NULL,
  `strType` varchar(45) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL,
  `datDateRegistered` date DEFAULT NULL,
  PRIMARY KEY (`intID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` VALUES (1,'lance','luna','sanpablo','lance@xyz.com','pass','blank.jpg','Client','Registered','2017-02-13'),(2,'jeron','lun','pablo','jeron@xyz.com','pass','blank.jpg','Household Worker','Registered',NULL),(3,'lanz','lu','sanpabloz','lanz@xyz.com','pass','blank.jpg','Admin','Registered',NULL),(4,'lancer','lunar','sanpablor','lancer@xyz.com','pass','blank.jpg','Client','Unregistered',NULL),(5,'lancers','lunasr','sanpablors','lancers@xyz.com','pass','blank.jpg','Household Worker','Unregistered',NULL),(6,'Jane','Saint','Doe','test@xyz.com','test','blank.jpg','Household Worker','Registered','2018-02-13'),(7,'Jennifer','Wang','Abcedee','test7@xyz.com','test7','blank.jpg','Household Worker','Registered','2018-05-13');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
