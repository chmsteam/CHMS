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


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
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

--
-- Table structure for table `tblagency`
--

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

INSERT INTO `tblagency` (`strName`, `strAddress`, `strTelNum`, `strEmail`, `strOwner`, `strOIC`, `strLogo`) VALUES
('Mega Pacific Employment Services', 'Shaw Blvd, Mandaluyong 1552 Metro Manila', '(02)5310618', 'mega@xyz.com', '', 'Benilda Lazaro', '');

-- --------------------------------------------------------

--
-- Table structure for table `tblclient`
--

CREATE TABLE `tblclient` (
  `intClientID` int(11) NOT NULL,
  `strContact` varchar(45) DEFAULT NULL,
  `strCAHouseNo` varchar(45) DEFAULT NULL,
  `strCAStreet` varchar(45) DEFAULT NULL,
  `strCAProvince` varchar(45) DEFAULT NULL,
  `strCity` varchar(45) DEFAULT NULL,
  `strPAddress` varchar(70) DEFAULT NULL,
  `strOAddress` varchar(70) DEFAULT NULL,
  `strOContact` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblclient`
--

INSERT INTO `tblclient` (`intClientID`, `strContact`, `strCAHouseNo`, `strCAStreet`, `strCAProvince`, `strCity`, `strPAddress`, `strOAddress`, `strOContact`) VALUES
(1, '01234516742', '32', 'anonas', 'Manila', 'Manila', '32 anonas Manila, Manila', '69 A. santos Mgo Bldg.', '332-42422'),
(4, '01234516742', '32', 'anonas', 'Manila', 'Manila', '32 anonas Manila, Manila', '69 A. santos Mgo Bldg.', '332-42422');

-- --------------------------------------------------------

--
-- Table structure for table `tblcontract`
--

CREATE TABLE `tblcontract` (
  `intConTransID` int(11) NOT NULL,
  `intConReqNo` int(11) NOT NULL,
  `intConHWID` int(11) DEFAULT NULL,
  `intConSalary` decimal(9,2) DEFAULT NULL,
  `strConStatus` varchar(20) DEFAULT NULL,
  `datDateStarted` date DEFAULT NULL,
  `strCurStatus` varchar(20) DEFAULT NULL,
  `intConReplacementLeft` int(11) DEFAULT NULL,
  `strConCopy` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblfee`
--

CREATE TABLE `tblfee` (
  `intID` int(11) NOT NULL,
  `strName` varchar(30) DEFAULT NULL,
  `fltFee` decimal(9,2) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblfee`
--

INSERT INTO `tblfee` (`intID`, `strName`, `fltFee`, `strStatus`) VALUES
(1, 'Agency Fee', '8000.00', 'Active'),
(2, 'Drop-off', '600.00', 'Active'),
(3, 'Pick-up', '0.00', 'Active'),
(4, 'Replacement Fee', '1000.00', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblfinalrequest`
--

CREATE TABLE `tblfinalrequest` (
  `intRequestID` int(11) NOT NULL,
  `intRequest_ClientID` int(11) NOT NULL,
  `strRequestType` varchar(15) DEFAULT NULL,
  `strRequestName` varchar(50) DEFAULT NULL,
  `strRequestDesc` varchar(250) DEFAULT NULL,
  `datRequestDate` date DEFAULT NULL,
  `strRequestStatus` varchar(15) DEFAULT NULL,
  `datRequestNeedDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblfreereplacement`
--

CREATE TABLE `tblfreereplacement` (
  `intFreeReplacement` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblfreereplacement`
--

INSERT INTO `tblfreereplacement` (`intFreeReplacement`, `strStatus`) VALUES
(3, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblhouseholdworker`
--

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
  `strOtherSkills` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblhouseholdworker`
--

INSERT INTO `tblhouseholdworker` (`intHWID`, `intServiceID`, `datBirthDay`, `strGender`, `strCivilStatus`, `strCitizenship`, `strReligion`, `strHeight`, `strWeight`, `strCellNum`, `strTelNum`, `strCAHouseNo`, `strCAStreet`, `strCAMunicipality`, `strCity`, `strPAddress`, `strPofBirth`, `strOtherSkills`) VALUES
(6, 1, '1999-12-13', 'Female', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, '1999-12-14', 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblhw_educbg`
--

CREATE TABLE `tblhw_educbg` (
  `intHWID_educbg` int(11) NOT NULL,
  `strType` varchar(15) DEFAULT NULL,
  `strSchoolName` varchar(50) DEFAULT NULL,
  `strSchoolAdd` varchar(250) DEFAULT NULL,
  `intSchoolGrad` int(11) DEFAULT NULL,
  `strSchoolSkill` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblhw_educbg`
--

INSERT INTO `tblhw_educbg` (`intHWID_educbg`, `strType`, `strSchoolName`, `strSchoolAdd`, `intSchoolGrad`, `strSchoolSkill`) VALUES
(6, 'Elementary', 'PUers', 'Manila', 2011, 'none'),
(7, 'Elementary', 'PUsers', 'Manila', 2011, 'none'),
(7, 'High School', 'PUP', 'Manila', 2019, 'none');

-- --------------------------------------------------------

--
-- Table structure for table `tblhw_ref`
--

CREATE TABLE `tblhw_ref` (
  `intHWID_ref` int(11) NOT NULL,
  `strType` varchar(15) DEFAULT NULL,
  `strName` varchar(50) DEFAULT NULL,
  `strAddress` varchar(100) DEFAULT NULL,
  `strOccupation` varchar(20) DEFAULT NULL,
  `strTelNo` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblhw_ref`
--

INSERT INTO `tblhw_ref` (`intHWID_ref`, `strType`, `strName`, `strAddress`, `strOccupation`, `strTelNo`) VALUES
(6, 'Relative', 'John Doe', 'Manila', 'Construction Worker', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `tblhw_workbg`
--

CREATE TABLE `tblhw_workbg` (
  `intHWID_workbg` int(11) NOT NULL,
  `strWorkName` varchar(50) DEFAULT NULL,
  `strWorkAdd` varchar(250) DEFAULT NULL,
  `strWorkPosition` varchar(50) DEFAULT NULL,
  `intWorkStart` int(11) DEFAULT NULL,
  `intWorkEnd` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblhw_workbg`
--

INSERT INTO `tblhw_workbg` (`intHWID_workbg`, `strWorkName`, `strWorkAdd`, `strWorkPosition`, `intWorkStart`, `intWorkEnd`) VALUES
(6, 'Kainderya', 'Cook', 'Manila', 2016, 2017),
(6, 'Kainderya', 'Cook', 'Manila', 2017, 2018),
(7, 'Daycare Center', 'caregiver', 'Manila', 2017, 2018),
(7, 'Daycare Center', 'caregiver', 'Manila', 2016, 2019);

-- --------------------------------------------------------

--
-- Table structure for table `tblinitialrequest`
--

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
  `deciRequestSalary` decimal(9,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblleaverequest`
--

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
  `strRejReas` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblmcity`
--

CREATE TABLE `tblmcity` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblmcity`
--

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

--
-- Table structure for table `tblmincidentreport`
--

CREATE TABLE `tblmincidentreport` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strDesc` varchar(250) DEFAULT NULL,
  `strLevel` varchar(20) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblmincidentreport`
--

INSERT INTO `tblmincidentreport` (`intID`, `strName`, `strDesc`, `strLevel`, `strStatus`) VALUES
(1, 'Personal Injury', 'Physical injury inflicted on a person\'s body.', 'Low', 'Active'),
(2, 'Hazard', 'Something causing unavoidable danger, peril, risk, or difficulty.', NULL, 'Active'),
(3, 'Security/Violence', 'Behaviour involving physical force intended to hurt, damage,\r\nor kill someone or something, strength of emotion or of a destructive.', NULL, 'Active'),
(4, 'Workplace Illness', 'an illness or disease brought on, or caused by exposure \r\nin the workplace, to a physical, chemical, or biological agent\r\nto the extent that the health of a staff member is impaired.', NULL, 'Active'),
(5, 'Fire Alarm', 'An undesirable event which emits heat, smoke and/or flame,\r\nwhich has the potential to cause damage.', NULL, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblmleave`
--

CREATE TABLE `tblmleave` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `intDays` int(11) DEFAULT NULL,
  `intDaysForFile` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblmleave`
--

INSERT INTO `tblmleave` (`intID`, `strName`, `intDays`, `intDaysForFile`, `strStatus`) VALUES
(1, 'Vacation Leave', 5, 7, 'Active'),
(2, 'Sick Leave', 1, 1, 'Active'),
(3, 'Maternity Leave', 40, NULL, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblmreplacereason`
--

CREATE TABLE `tblmreplacereason` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblmreplacereason`
--

INSERT INTO `tblmreplacereason` (`intID`, `strName`, `strStatus`) VALUES
(2, 'rude behaviour', 'Active'),
(3, 'Can\'t able to do the household chores', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblmrequirements`
--

CREATE TABLE `tblmrequirements` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `strType` varchar(100) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblmrequirements`
--

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

--
-- Table structure for table `tblmservice`
--

CREATE TABLE `tblmservice` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `deciRate` decimal(9,2) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tblmservice`
--

INSERT INTO `tblmservice` (`intID`, `strName`, `deciRate`, `strStatus`) VALUES
(1, 'Housemaid', '3000.00', 'Active'),
(2, 'Cook', '3000.00', 'Active'),
(3, 'Driver', '3000.00', 'Active'),
(4, 'Nanny', '3000.00', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblmskills`
--

CREATE TABLE `tblmskills` (
  `intID` int(11) NOT NULL,
  `strName` varchar(100) DEFAULT NULL,
  `intSkillID_intID` int(11) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(26, 'Can promise NOT to use employer\'s telephone/cellphone.', NULL, 'Active'),
(27, 'Can promise NOT to use cellphone during working hours.', NULL, 'Active'),
(28, 'Can work during day-off with compensation.', NULL, 'Active'),
(29, 'Have long patience.', NULL, 'Active'),
(30, 'Willing to sleep late.', NULL, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tblreliever`
--

CREATE TABLE `tblreliever` (
  `intReq_RelID` int(11) NOT NULL,
  `intTobeRelievedID` int(11) DEFAULT NULL,
  `intRelieverID` int(11) DEFAULT NULL,
  `strRelieverStatus` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblreplacement`
--

CREATE TABLE `tblreplacement` (
  `intReplaceReqID` int(11) NOT NULL,
  `intReplaceOldHWID` int(11) NOT NULL,
  `intReplaceNewHWID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblreport`
--

CREATE TABLE `tblreport` (
  `intReportID` int(11) NOT NULL,
  `intReporterID` int(11) DEFAULT NULL,
  `intRecipentID` int(11) DEFAULT NULL,
  `intTypeofReport` int(11) DEFAULT NULL,
  `strReason` varchar(250) DEFAULT NULL,
  `strPicture` varchar(45) DEFAULT NULL,
  `strValidity` varchar(50) DEFAULT NULL,
  `datDateReported` date DEFAULT NULL,
  `strReportStatus` varchar(50) DEFAULT NULL,
  `strActionTaken` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tblresults`
--

CREATE TABLE `tblresults` (
  `intRRequestID` int(11) NOT NULL,
  `intRRequest_No` int(11) DEFAULT NULL,
  `intRHWID` int(11) DEFAULT NULL,
  `strRHWStatus` varchar(20) DEFAULT NULL,
  `strRClientStatus` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbltransaction`
--

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
  `strConRemarks` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
  `intID` int(11) NOT NULL,
  `strFName` varchar(45) DEFAULT NULL,
  `strMName` varchar(45) DEFAULT NULL,
  `strLName` varchar(45) DEFAULT NULL,
  `strEmail` varchar(45) DEFAULT NULL,
  `strPassword` varchar(45) DEFAULT NULL,
  `strPicture` varchar(100) DEFAULT NULL,
  `strType` varchar(45) DEFAULT NULL,
  `strStatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbluser`
--

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
