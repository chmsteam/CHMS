-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema CHMS
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CHMS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CHMS` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema new_schema1
-- -----------------------------------------------------
USE `CHMS` ;

-- -----------------------------------------------------
-- Table `CHMS`.`tbluser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tbluser`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tbluser` (
  `intID` INT NOT NULL auto_increment,
  `strFName` VARCHAR(45) NULL,
  `strMName` VARCHAR(45) Null,
  `strLName` VARCHAR(45) NULL,
  `strEmail` VARCHAR(45) NULL,
  `strPassword` VARCHAR(45) NULL,
  `strPicture` VARCHAR (100),
  `strType` VARCHAR(45) NULL,
  `strStatus` VARCHAR(45) NULL,
  PRIMARY KEY (`intID`))
ENGINE = InnoDB;

INSERT INTO `tbluser` VALUES 
('1','lance', 'luna', 'sanpablo','lance@xyz.com','pass', 'blank.jpg', 'Client','Registered'),('2','jeron', 'lun','pablo','jeron@xyz.com','pass', 'blank.jpg', 'Household Worker','Registered'),('3','lanz', 'lu','sanpabloz','lanz@xyz.com','pass', 'blank.jpg', 'Admin','Registered'),('4','lancer', 'lunar', 'sanpablor','lancer@xyz.com','pass', 'blank.jpg', 'Client','Unregistered'),('5','lancers', 'lunasr', 'sanpablors','lancers@xyz.com','pass', 'blank.jpg', 'Household Worker','Unregistered'),
('6', 'Jane', 'Saint', 'Doe', 'test@xyz.com', 'test',  'blank.jpg', 'Household Worker', 'Registered'),
('7', 'Jane7', 'Saint7', 'Doe7', 'test7@xyz.com', 'test7', 'blank.jpg',  'Household Worker', 'Registered');


-- client info table
DROP TABLE IF EXISTS `tblclient`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblclient` (
  `intClientID` int NOT NULL,
  `strContact` VARCHAR(45) NULL,
  `strCAHouseNo` VARCHAR(45) NULL,
  `strCAStreet` VARCHAR(45) NULL,
  `strCAProvince` VARCHAR(45) NULL,
  `strCity` VARCHAR(45) NULL,
  `strPAddress` VARCHAR(70) NULL,
  `strOAddress` VARCHAR(70) NULL,
  `strOContact` VARCHAR(45) NULL,
  KEY `intClientID_idx`(`intClientID`),
  PRIMARY KEY (intClientID),
  CONSTRAINT `intClientID` FOREIGN KEY (`intClientID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;

INSERT INTO `tblclient` VALUES
('1', '01234516742', '32', 'anonas', 'Manila', 'Manila', '32 anonas Manila, Manila', '69 A. santos Mgo Bldg.', '332-42422'),
('4', '01234516742', '32', 'anonas', 'Manila', 'Manila', '32 anonas Manila, Manila', '69 A. santos Mgo Bldg.', '332-42422');


-- household worker info tables
DROP TABLE IF EXISTS `tblhouseholdworker`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblhouseholdworker` (
  `intHWID` int NOT NULL,
  `intServiceID` int,
  `datBirthDay` DATE,
  `strGender` varchar(10),
  `strCivilStatus` varchar(20),
  `strCitizenship` varchar(30),
  `strReligion` varchar(20),
  `strHeight` varchar(10),
  `strWeight` varchar(10),
  `strCellNum` varchar(11),
  `strTelNum` varchar(11),
  `strCAHouseNo` VARCHAR(45) NULL,
  `strCAStreet` VARCHAR(45) NULL,
  `strCAMunicipality` VARCHAR(45) NULL,
  `strCity` VARCHAR(45) NULL,
  `strPAddress` VARCHAR(70) NULL,
  `strPofBirth` VARCHAR(70) NULL,
  `strOtherSkills` LONGTEXT,
  KEY `intHWID_idx`(`intHWID`),
  KEY `intServiceID_idx`(`intServiceID`),
  PRIMARY KEY (intHWID),
  CONSTRAINT `intServiceID` FOREIGN KEY (`intServiceID`) REFERENCES `tblMservice` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `intHWID` FOREIGN KEY (`intHWID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;
 INSERT INTO `tblhouseholdworker` (intHWID, intServiceID, datBirthday, strGender) VALUES
 ('6', '1', '1999-12-13', 'Female'),
 ('7', '1', '1999-12-14', 'Male');

DROP TABLE IF EXISTS `tblhw_educbg`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblhw_educbg` (
  `intHWID_educbg` int NOT NULL,
  `strType` varchar(15),
  `strSchoolName` varchar(50),
  `strSchoolAdd` varchar(250),
  `intSchoolGrad` int,
  `strSchoolSkill` varchar(50),
  KEY `intHWID_educbg_idx`(`intHWID_educbg`),
  CONSTRAINT `intHWID_educbg` FOREIGN KEY (`intHWID_educbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;
INSERT INTO `tblhw_educbg` VALUES
('6', 'High School', 'PUP', 'Manila', '2015', 'none'),
('6', 'Elementary', 'PUers', 'Manila', '2011', 'none'),
('7', 'Elementary', 'PUsers', 'Manila', '2011', 'none'),
('7', 'High School', 'PUsers', 'Manila', '2011', 'none');

DROP TABLE IF EXISTS `tblhw_workbg`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblhw_workbg` (
  `intHWID_workbg` int NOT NULL,
  `strWorkName` varchar(50),
  `strWorkAdd` varchar(250),
  `strWorkPosition` varchar(50),
  `intWorkStart` int,
  `intWorkEnd` int,
  KEY `intHWID_workbg_idx`(`intHWID_workbg`),
  CONSTRAINT `intHWID_workbg` FOREIGN KEY (`intHWID_workbg`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;
INSERT INTO `tblhw_workbg` VALUES
('6', 'Kainderya', 'Cook', 'Manila', '2016', '2017'),
('6', 'Kainderya', 'Cook', 'Manila', '2017', '2018'),
('7', 'Daycare Center', 'caregiver', 'Manila', '2017', '2018'),
('7', 'Daycare Center', 'caregiver', 'Manila', '2016', '2019');

DROP TABLE IF EXISTS `tblhw_ref`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblhw_ref` (
  `intHWID_ref` int NOT NULL,
  `strType` varchar(15),
  `strName` varchar(50),
  `strAddress` varchar(100),
  `strOccupation` varchar(20),
  `strTelNo` varchar(15),
  KEY `intHWID_ref_idx`(`intHWID_ref`),
  CONSTRAINT `intHWID_ref` FOREIGN KEY (`intHWID_ref`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;
INSERT INTO `tblhw_ref` VALUES
('6', 'Relative', 'John Doe', 'Manila', 'Construction Worker', 'none');

-- maintenance tables
DROP TABLE IF EXISTS `tblMincidentreport`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblMincidentreport` (
	`intID` INT NOT NULL auto_increment,
    `strName` VARCHAR(100) NULL,
    `strDesc` VARCHAR(250) NULL,
    `strLevel` varchar(20) NULL,
    `strStatus` VARCHAR(45) NULL,
    PRIMARY KEY (`intID`))
ENGINE = InnoDB;

INSERT INTO `tblMincidentreport` VALUES
('1','Personal Injury',"Physical injury inflicted on a person's body.", 'Low','Active');


DROP TABLE IF EXISTS `tblMrequirements`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblMrequirements` (
	`intID` INT NOT NULL auto_increment,
    `strName` VARCHAR(100) NULL,
	`strType` VARCHAR(100) NULL,
    `strStatus` VARCHAR(45) NULL,
    PRIMARY KEY (`intID`))
ENGINE = InnoDB;

INSERT INTO `tblMrequirements` VALUES
('1','NBI', 'Client', 'Active'),('2','2 Valid ID', 'Client', 'Inactive');

DROP TABLE IF EXISTS `tblMleave`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblMleave` (
	`intID` INT NOT NULL auto_increment,
    `strName` VARCHAR(100) NULL,
    `intDays` INT,
    `intDaysForFile` INT,
    `strStatus` VARCHAR(45) NULL,
    PRIMARY KEY (`intID`))
ENGINE = InnoDB;

INSERT INTO `tblMleave` VALUES
('1','Vacation Leave', '5', '7', 'Active'),('2','Sick Leave', '1', '1', 'Inactive');

DROP TABLE IF EXISTS `tblMservice`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblMservice` (
	`intID` INT NOT NULL auto_increment,
    `strName` VARCHAR(100) NULL,
    `deciRate` DECIMAL(9,2),
    `strStatus` VARCHAR(45) NULL,
    PRIMARY KEY (`intID`))
ENGINE = InnoDB;

INSERT INTO `tblMservice` VALUES
('1','Housemaid', '3000.00', 'Active'),('2','Cook', '3000.00', 'Active'), ('3','Driver', '3000.00','Active'), ('4','Nanny', '3000.00','Active');

DROP TABLE IF EXISTS `tblMskills`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblMskills` (
	`intID` INT NOT NULL auto_increment,
    `strName` VARCHAR(100) NULL,
    `intSkillID_intID` int NULL,
    `strStatus` VARCHAR(45) NULL,
    KEY `intSkillID_idx`(`intID`),
    CONSTRAINT `intSkillID_intID` FOREIGN KEY (`intSkillID_intID`) REFERENCES `tblMservice` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;
INSERT INTO `tblMskills` VALUES
('1','Can international course.','2','Active'),('2','Knows how to iron clothes','1','Inactive');

DROP TABLE IF EXISTS `tblmcity`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblmcity` (
	`intID` INT NOT NULL auto_increment,
    `strName` VARCHAR(100) NULL,
    `strStatus` VARCHAR(45) NULL,
    PRIMARY KEY (`intID`)
)
ENGINE = InnoDB;
INSERT INTO `tblmcity` VALUES
('1','Caloocan','Active'),('2','Makati','Inactive');

DROP TABLE IF EXISTS `tblfee`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblfee` (
	`intID` INT NOT NULL auto_increment,
    `strName` VARCHAR(30) NULL,
    `fltFee` DECIMAL(9,2) NULL,
    `strStatus` VARCHAR(45) NULL,
    PRIMARY KEY (`intID`)
)
ENGINE = InnoDB;
INSERT INTO `tblfee` VALUES
('1','Agency Fee', '8000.00', 'Active'),('2','Drop-off', '600.00', 'Active'), ('3','Pick-up', '0.00', 'Active'), ('4','Replacement Fee', '1000.00', 'Active');

DROP TABLE IF EXISTS `tblagency`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblagency` (
    `strName` VARCHAR(100) NULL,
    `strAddress` VARCHAR(200) NULL,
    `strTelNum` VARCHAR(11) NULL,
    `strEmail` VARCHAR(45) NULL
)
ENGINE = InnoDB;
INSERT INTO `tblagency` VALUES 
('Mega Pacific Employment Services','Shaw Blvd, Mandaluyong 1552 Metro Manila', '(02)5310618', 'mega@xyz.com');

DROP TABLE IF EXISTS `tblfreereplacement`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblfreereplacement` (
    `intFreeReplacement` INT,
    `strStatus` VARCHAR(45)
)
ENGINE = InnoDB;
INSERT INTO `tblfreereplacement` VALUES (3,'Active');



-- Request ADD
DROP TABLE IF EXISTS `tblfinalrequest`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblfinalrequest` (
	`intRequestID` INT NOT NULL auto_increment,
    `intRequest_ClientID` INT NOT NULL,
    `strRequestType` varchar(15),
    `strRequestName` varchar(50),
    `strRequestDesc` VARCHAR(250) NULL,
    `datRequestDate` date,
    `strRequestStatus` varchar(15),
    `datRequestNeedDate` date,
    PRIMARY KEY(`intRequestID`),
    KEY `intRequest_ClientID_idx`(`intRequest_ClientID`),
    CONSTRAINT `intRequest_ClientID` FOREIGN KEY (`intRequest_ClientID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `tblinitialrequest`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblinitialrequest` (
	`intIRequestID` INT NOT NULL,
    `intIRequest_No` INT,
    `intITypeOfService` INT,
    `intIQuantity` INT,
    `intIRequestAge1` INT,
    `intIRequestAge2` INT,
    `strIRequestGender` varchar(10),
    `strIRequestEduc` varchar(20),
    `intIRequestExp`INT,
    `deciRequestSalary` decimal (9,2),
    KEY (`intIRequest_No`),
    KEY `intIRequestID_idx`(`intIRequestID`),
    CONSTRAINT `intIRequestID` FOREIGN KEY (`intIRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `tblresults`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblresults` (
	`intRRequestID` INT NOT NULL,
    `intRRequest_No` INT,
    `intRHWID` INT,
    `strRHWStatus` VARCHAR (20),
    `strRClientStatus` VARCHAR (20),
    KEY (`intRRequestID`),
    KEY (`intRHWID`),
    CONSTRAINT `intRRequestID` FOREIGN KEY (`intRRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `intRHWID` FOREIGN KEY (`intRHWID`) REFERENCES `tbluser` (`intID`) ON DELETE NO ACTION ON UPDATE NO ACTION

)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `tbltransaction`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tbltransaction` (
	`intTRequestID` INT NOT NULL,
    `intTClientID` INT,
    `datDateRequested` DATE,
    `intTypeofDeployment` INT,
    `datDateofDeployment` DATE,
    `timTimeofDeployment` TIME,
    `strContract` VARCHAR(100),
    `strContractStatus` VARCHAR(20),
    `datDateSettled` DATE,
    `strTStatus` VARCHAR(20),
    `strORNumber` VARCHAR(20),
    `strInvoiceNum` VARCHAR(20),
    KEY (`intTRequestID`),
    CONSTRAINT `intTRequestID` FOREIGN KEY (`intTRequestID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `tblcontract`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblcontract` (
	`intConTransID` INT NOT NULL,
    `intConReqNo`INT NOT NULL,
    `intConHWID` INT,
    `intConSalary` INT,
    `strConStatus` VARCHAR(20),
    `datDateStarted` DATE NULL,
    `strCurStatus` VARCHAR(20),
    `intConReplacementLeft` INT,
    KEY (intConTransID),
    CONSTRAINT `intConTransID` FOREIGN KEY (`intConTransID`) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;


DROP TABLE IF EXISTS `tblreplacement`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblreplacement` (
	`intReplaceReqID` INT,
    `intReplaceOldHWID` INT,
    `intReplaceNewHWID` INT,
    KEY (intReplaceReqID),
    KEY (intReplaceOldHWID),
    CONSTRAINT `intReplaceOldHWID` FOREIGN KEY (intReplaceOldHWID) REFERENCES `tblhouseholdworker` (`intHWID`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `intReplaceReqID` FOREIGN KEY (intReplaceReqID) REFERENCES `tblfinalrequest` (`intRequestID`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `tblreport`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblreport` (
	`intReporterID` INT,
    `intRecipentID` INT,
    `intTypeofReport` INT,
    `strReason` VARCHAR(250),
    `strValidity` VARCHAR(50),
    `datDateReported` DATE,
    KEY (intTypeofReport),
    CONSTRAINT `intTypeofReport` FOREIGN KEY (intTypeofReport) REFERENCES `tblmincidentreport` (`intID`) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `tblreport`;
CREATE TABLE IF NOT EXISTS `CHMS`.`tblreport` (
	`intReportID` INT auto_increment,
	`intReporterID` INT,
    `intRecipentID` INT,
    `intTypeofReport` INT,
    `strReason` VARCHAR(250),
    `strValidity` VARCHAR(50),
    `datDateReported` DATE,
    `strReportStatus` VARCHAR(50),
    `strActionTaken` VARCHAR(50),
    PRIMARY KEY (intReportID),
    KEY (intTypeofReport),
    CONSTRAINT `intTypeofReport` FOREIGN KEY (intTypeofReport) REFERENCES `tblmincidentreport` (`intID`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
