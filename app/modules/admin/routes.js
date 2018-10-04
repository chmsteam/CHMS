var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');
// pdfupload
var http = require('http');
var multer = require('multer');
var formidable = require('formidable'); 
var upload =require('express-fileupload');
//nodemailer
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var mailer =  nodemailer.createTransport({
	service: 'gmail',
	port: 25,
	secure: true,
	auth:{
		user: 'testchms123@gmail.com',
		pass: 'wordpass123456' //pass ng email
	}
});
//----Terms And Conditions
function terms(req,res){
  if(req.valid==0)
    res.render('admin/views/terms');
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
//-----------------------------------------------------------------Rendering Transactions of CLIENTS Pages
//----pending requests
function renderClientsPending(req,res){
  if(req.valid==0)
    res.render('admin/views/client_maintenance/pending',
    {
      usertab: req.user,
      itemtab: req.displayPendingClient,
      requirementtab: req.requirement
    });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
//----Registered
function renderClientsRegistered(req,res){
  if(req.valid==0)
    res.render('admin/views/client_maintenance/registered',
    {
      usertab: req.user,
      itemtab: req.displayRegisteredClient,
      requirementtab: req.requirement
    });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
//----Rejected
function renderClientsRejected(req,res){
  if(req.valid==0)
    res.render('admin/views/client_maintenance/rejected',
    {
      usertab: req.user,
      itemtab: req.displayRejectedClient,
      requirementtab: req.requirement
    });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
//----Rejected
function renderClientsBanned(req,res){
  if(req.valid==0)
    res.render('admin/views/client_maintenance/banned',
    {
      usertab: req.user,
      itemtab: req.displayBannedClient,
      requirementtab: req.requirement
    });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
//-------------------------------------------------------------------Rendering Transactions Household Workers
//deployed
function renderHhwDeployed(req,res){
  if(req.valid==0)
    res.render('admin/views/household_maintenance/deployed',
      {
        usertab: req.user, 
        itemtab: req.displayDeployedHhworker, 
        HWreqtab: req.houseHoldReq
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//pending
function renderHhwPending(req,res){
  if(req.valid==0)
    res.render('admin/views/household_maintenance/pending',
      {
        usertab: req.user, 
        itemtab: req.displayPendingHhworker, 
        HWreqtab: req.houseHoldReq
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//registered
function renderHhwRegistered(req,res){
  if(req.valid==0)
    res.render('admin/views/household_maintenance/registered',
      {
        usertab: req.user, 
        itemtab: req.displayRegisteredHhworker, 
        HWreqtab: req.houseHoldReq
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//banned
function renderHhwBanned(req,res){
  if(req.valid==0)
    res.render('admin/views/household_maintenance/banned',
      {
        usertab: req.user, 
        itemtab: req.displayBannedHhworker, 
        HWreqtab: req.houseHoldReq
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//suspended
function renderHhwSuspended(req,res){
  if(req.valid==0)
    res.render('admin/views/household_maintenance/suspended',
      {
        usertab: req.user, 
        itemtab: req.displaySuspendedHhworker, 
        HWreqtab: req.houseHoldReq
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//Rejected
function renderHhwRejected(req,res){
  if(req.valid==0)
    res.render('admin/views/household_maintenance/rejected',
      {
        usertab: req.user, 
        itemtab: req.displayRejectedHhworker, 
        HWreqtab: req.houseHoldReq
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//-------------------------------------------------------------------function- auto-gen(code)
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function passwordgen() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvqxyz1234567890";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvqxyz1234567890";
  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
//----------------------------------------------------Clients Maintenance
//pending Clients
function displayPendingClient(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND strStatus = 'Unregistered' ", function (err, results) {
    if (err) return res.send(err);
    req.displayPendingClient = results;
    return next();
  });
}
//registered Clients
function displayRegisteredClient(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND strStatus = 'Registered' ", function (err, results) {
    if (err) return res.send(err);
    req.displayRegisteredClient = results;
    return next();
  });
}
//rejected Clients
function displayRejectedClient(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND strStatus = 'Rejected' ", function (err, results) {
    if (err) return res.send(err);
    req.displayRejectedClient = results;
    return next();
  });
}
//banned Clients
function displayBannedClient(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND strStatus = 'Banned' ", function (err, results) {
    if (err) return res.send(err);
    req.displayBannedClient = results;
    return next();
  });
}
//------------------------------------------------------Maintenance Household Workers
//pending
function displayPendingHhworker(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker' AND tbluser.strStatus = 'Unregistered' ", function (err, results) {
    if (err) return res.send(err);
    req.displayPendingHhworker = results;
    return next();
  });
}
//deployed
function displayDeployedHhworker(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker' AND tbluser.strStatus = 'Deployed' ", function (err, results) {
    if (err) return res.send(err);
    req.displayDeployedHhworker = results;
    return next();
  });
}
//registered
function displayRegisteredHhworker(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker' AND tbluser.strStatus = 'Registered' ", function (err, results) {
    if (err) return res.send(err);
    req.displayRegisteredHhworker = results;
    return next();
  });
}
//banned
function displayBannedHhworker(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker' AND tbluser.strStatus = 'Banned' ", function (err, results) {
    if (err) return res.send(err);
    req.displayBannedHhworker = results;
    return next();
  });
}
//suspended
function displaySuspendedHhworker(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker' AND tbluser.strStatus = 'Suspended' ", function (err, results) {
    if (err) return res.send(err);
    req.displaySuspendedHhworker = results;
    return next();
  });
}
//Rejected
function displayRejectedHhworker(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker' AND tbluser.strStatus = 'Rejected' ", function (err, results) {
    if (err) return res.send(err);
    req.displayRejectedHhworker = results;
    return next();
  });
}
//------------------------------------------------------Household Request (LEAVE)
//-render request Household - Leave
function hhReqLeave_render(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_hhRequest_leave',
      {
        usertab: req.user,
        leaveReq: req.displayLeaveReq
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//function display hhw Leave request
function displayLeaveReq(req, res, next){
  var db = require('../../lib/database')();
  db.query('SELECT * FROM tblleaverequest AS tl INNER JOIN tbluser AS ts ON tl.intHouseholdID = ts.intID INNER JOIN tblmleave AS lt ON tl.intTypeOfLeave = lt.intID', function (err, results, fields) {
      if (err) return res.send(err);
      req.displayLeaveReq = results;
      //moments submitted
      for(var i = 0; i < req.displayLeaveReq.length; i++){
        req.displayLeaveReq[i].datDateCreated =  moment(results[i].datDateCreated).format("LL");
      }
      //moments start
      for(var i = 0; i < req.displayLeaveReq.length; i++){
        req.displayLeaveReq[i].datDateFrom =  moment(results[i].datDateFrom).format("LL");
      }
      //moments end
      for(var i = 0; i < req.displayLeaveReq.length; i++){
        req.displayLeaveReq[i].datDateTo =  moment(results[i].datDateTo).format("LL");
      }
      return next();
  });
}
//Reject Household Request
router.post('/transaction_hhRequest_leave/reject', (req, res) =>{
  var db = require('../../lib/database')();
    db.query("UPDATE tblleaverequest SET strLeaveStatus = 'Rejected', strRejReas = ? WHERE intLeaveRequestID = ? ",
      [req.body.reason, req.body.id], (err, results, fields)=>{
        if (err) console.log(err);
      res.redirect('/admin/transaction_hhRequest_leave')
      });
})
//Accept Household Request
router.post('/transaction_hhRequest_leave/approve', (req, res) =>{
  var db = require('../../lib/database')();
    db.query("UPDATE tblleaverequest SET strLeaveStatus = 'For Client Approval' WHERE intLeaveRequestID = ? ",
      [req.body.id], (err, results, fields)=>{
        if (err) console.log(err);
      res.redirect('/admin/transaction_hhRequest_leave')
      });
})

//------------------------------------------------------Household Request (REPLACEMENT OF CLIENT)
function hhReqReplacementrender(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_replacement_of_client',{usertab: req.user, replacetab: req.replace});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

function findreplacementofclient(req,res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT *, u.intID AS clientid, u.strFName AS clientfname, u.strLName AS clientlname, uu.intID AS hwid, uu.strFName AS hwfname, uu.strLName AS hwlname FROM tblfinalrequest INNER JOIN tbluser as u on u.intID = intRequest_ClientID INNER JOIN tblreplacement ON intReplaceReqID = intRequestID INNER JOIN tbluser AS uu ON uu.intID = intReplaceOldHWID
  WHERE strRequestType='Replace Client'`, function(err,results) {
    console.log(err)
    for(var i = 0; i < results.length; i++){
      results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");   
    }
    req.hw5=results;
    req.replace = results
    return next();
  });
}
//Reject Household Request Replacement
router.post('/transaction_replacement_of_client/actions',flog, repofcliaction);
function repofcliaction (req,res){
  var db = require('../../lib/database')();
  if (req.body.name='accept'){
    db.query(`UPDATE tblfinalrequest SET strRequestStatus='Draft' WHERE intRequestID = ?`,[req.body.transid], function(err,results){
      db.query(`UPDATE tblcontract SET strCurStatus='To be replaced' WHERE strCurStatus='Current' AND intConHWID =?`,[req.body.hwid], function(err,results){
        res.redirect('/admin/transaction_replacement_of_client', flog, findreplacementofclient, hhReqReplacementrender)
      })
    })
  }
  else if (req.body.name='reject'){
    db.query(`UPDATE tblfinalrequest SET strRequestStatus='Rejected' WHERE intRequestID = ?`,[req.body.transid], function(err,results){
      res.redirect('/admin/transaction_replacement_of_client', flog, findreplacementofclient, hhReqReplacementrender)
    })
  }
}






//-------------------------------------------------------------------------------------DASHBOARD
function render(req,res){
  if(req.valid==0)
    res.render('admin/views/index',{usertab: req.user});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/', flog, render);

//--------------------------------------------------------------------------------------MAINTENANCE
router.get('/maintenance_contractofservices',flog,rendermaintcontractofservices)
function rendermaintcontractofservices(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_contractofservices',{usertab: req.user});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}




function rendermaintenanceIR(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_ir',{usertab: req.user, itemtab:req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmincidentreport(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmincidentreport ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}


function rendermaintenanceR(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_r',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmrequirements(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmrequirements ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

function rendermaintenanceTL(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_tl',{usertab: req.user, itemtab:req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmleave(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmleave ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

function rendermaintenanceTS(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_ts',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmservice(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmservice ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

function rendermaintenanceskills(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_householdworker_skills',{usertab: req.user, itemtab: req.item, itemtabs: req.items});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmskills(req, res, next){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query("SELECT a.intID AS skillID, a.strName AS skillName, a.strStatus AS skillStatus FROM tblmskills AS a", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
// function findms(req, res, next){
//   var db = require('../../lib/database')();
//   var db2 = require('../../lib/database')();
//   db.query("SELECT * FROM tblmservice", function (err, results) {
//     if (err) return res.send(err);
//     if (!results[0])
//     console.log('');
//     req.items = results;
//     return next();
//   });
// }
function rendermaintenancecity(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_c',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//------------------------Maintenance Reason Of Replacement
function renderReasonReplacement(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_reason_of_replacement',{usertab: req.user, reasons: req.displayReason});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.post('/add_repReason',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmreplacereason (strName, strStatus)  VALUES ("${req.body.reason}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_reason_of_replacement');
  });
});
router.post('/edit_repReason',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmreplacereason SET strName= ? WHERE intID = ?";
  db.query(sql,[req.body.reason,  req.body.repID],function (err) {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
function displayReason(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmreplacereason ", function (err, results) {
    if (err) return res.send(err);
    req.displayReason = results;
    return next();
  });
}
// Enable Reason
function enableReason(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmreplacereason SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_reason_of_replacement');
  });

}
// Disable Reason
function disableReason(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmreplacereason SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_reason_of_replacement');
});
}
//-------------------------------------------------
function findmcity(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmcity ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

// Enable requirement
function enableRequirement(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmrequirements SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_requirements');
  });

}
// Disable requirement
function disableRequirement(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmrequirements SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_requirements');
});
}

// Enable incident report
function enableIncidentreport(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmincidentreport SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_incident_report');
  });

}
// Disable incident report
function disableIncidentreport(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmincidentreport SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_incident_report');
});
}

// Enable leave
function enableLeave(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmleave SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_type_of_leave');
  });

}
// Disable leave
function disableLeave(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmleave SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_type_of_leave');
});
}

// Enable service
function enableService(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmservice SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_type_of_services');
  });

}
// Disable service
function disableService(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmservice SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_type_of_services');
});
}

// Enable skill
function enableskill(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmskills SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_householdworker_skills');
  });

}
// Disable skill
function disableskill(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmskills SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_householdworker_skills');
});
}

// Enable city
function enablecity(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmcity SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_city');
  });

}
// Disable city
function disablecity(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmcity SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_city');
});
}


router.get('/maintenance_incident_report', flog, findmincidentreport, rendermaintenanceIR);
router.get('/maintenance_requirements', flog, findmrequirements, rendermaintenanceR);
router.get('/maintenance_type_of_leave', flog, findmleave, rendermaintenanceTL);
router.get('/maintenance_type_of_services', flog, findmservice, rendermaintenanceTS);
router.get('/maintenance_householdworker_skills', flog, findmskills, rendermaintenanceskills);
router.get('/maintenance_city', flog, findmcity, rendermaintenancecity);

router.get('/enable_requirement/:userid',flog,enableRequirement);
router.get('/disable_requirement/:userid',flog,disableRequirement);
router.get('/enable_incidentreport/:userid',flog,enableIncidentreport);
router.get('/disable_incidentreport/:userid',flog,disableIncidentreport);
router.get('/enable_leave/:userid',flog,enableLeave);
router.get('/disable_leave/:userid',flog,disableLeave);
router.get('/enable_service/:userid',flog,enableService);
router.get('/disable_service/:userid',flog,disableService);
router.get('/enable_skill/:userid',flog,enableskill);
router.get('/disable_skill/:userid',flog,disableskill);
router.get('/enable_city/:userid',flog,enablecity);
router.get('/disable_city/:userid',flog,disablecity);
router.get('/enable_reas/:userid',flog,enableReason);
router.get('/disable_reas/:userid',flog,disableReason);


router.post('/add_requirement',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmrequirements (strName, strType, strStatus)  VALUES ("${req.body.requirementname}", "${req.body.reqtype}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_requirements');
    });
});
router.post('/edit_requirement',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmrequirements SET strName= ?, strType= ? WHERE intID = ?";
  db.query(sql,[req.body.requirementname, req.body.reqtype, req.body.requirementID],function (err) {
    res.redirect('/admin/maintenance_requirements');
    });
});

router.post('/add_incidentreport',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmincidentreport (strName, strDesc, strStatus)  VALUES ("${req.body.incidentname}", "${req.body.incidentdesc}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_incident_report');
    });
});
router.post('/edit_incidentreport',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmincidentreport SET strName= ?, strDesc=? WHERE intID = ?";
  db.query(sql,[req.body.incidentname, req.body.incidentdesc, req.body.incidentID],function (err) {
    res.redirect('/admin/maintenance_incident_report');
    });
});

router.post('/add_leave',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmleave (strName, intDays, strStatus)  VALUES ("${req.body.leavename}", "${req.body.leaveday}","Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_type_of_leave');
    });
});
router.post('/edit_leave',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmleave SET strName= ?, intDays=? WHERE intID = ?";
  db.query(sql,[req.body.leavename, req.body.leaveday, req.body.leaveID],function (err) {
    res.redirect('/admin/maintenance_type_of_leave');
    });
});

router.post('/add_service',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmservice (strName, strStatus)  VALUES ("${req.body.servicename}","Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_type_of_services');
  });
});
router.post('/edit_service',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmservice SET strName= ? WHERE intID = ?";
  db.query(sql,[req.body.servicename, req.body.serviceID],function (err) {
    res.redirect('/admin/maintenance_type_of_services');
    });
});

router.post('/add_skill',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmskills (strName, strStatus)  VALUES ("${req.body.skill}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_householdworker_skills');
  });
});
router.post('/edit_skill',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmskills SET strName= ?, intSkillID_intID=? WHERE intID = ?";
  db.query(sql,[req.body.skillname, req.body.serviceid, req.body.skillID],function (err) {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_householdworker_skills');
    });
});

router.post('/add_city',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmcity (strName, strStatus)  VALUES ("${req.body.cityname}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_city');
  });
});
router.post('/edit_city',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmcity SET strName= ? WHERE intID = ?";
  db.query(sql,[req.body.cityname,  req.body.cityID],function (err) {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_city');
    });
});
// ----------------------------------------------------------------------------------- INVOICE
router.get('/invoice_:requestid', flog, findclient, findagency, findtrans, finditems, findsubtotal, findotherfee, renderinvoice)
function renderinvoice(req,res){
  if(req.valid==0)
    res.render('admin/views/invoice',{usertab: req.user, clienttab: req.client, agencytab: req.agency, dctab: req.dc, itemtab: req.item, otherfeetab: req.otherfee, subtotaltab: req.subtotal});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findagency(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblagency", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.agency = results;
    return next();
  });
}
function findtrans (req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT datDateRequested, strInvoiceNum FROM tbltransaction WHERE intTRequestID = ?`,[req.params.requestid], function (err, results) {

    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    for(var i = 0; i < results.length; i++){
      results[i].datDateRequested =  moment(results[i].datDateRequested).format("LL");   
    }
    if (err) return res.send(err);
    req.dc = results;
    return next();
  });
}
function finditems(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT intServiceID,ta.strName, COUNT(intServiceID) AS service, fltFee, (COUNT(intServiceID)*fltfee) as subtotal FROM
          (SELECT * FROM tblresults INNER JOIN tblhouseholdworker ON intHWID = intRHWID INNER JOIN tblmservice ON intServiceID = intID WHERE strRClientStatus ='Approved' and intRRequestID=?) as ta,
          (SELECT * FROM tblfee WHERE intID=1) as tb 
          GROUP BY intServiceID `,[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function findsubtotal(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT (COUNT(intServiceID)*fltfee) as subtotal FROM
            (SELECT * FROM tblresults INNER JOIN tblhouseholdworker ON intHWID = intRHWID INNER JOIN tblmservice ON intServiceID = intID WHERE strRClientStatus ='Approved' and intRRequestID=?) as ta,
            (SELECT * FROM tblfee WHERE intID=1) as tb`, [req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.subtotal = results;
    return next();
  });
}
function findotherfee(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT intTypeofDeployment, strName, fltFee, intTRequestID FROM tblfee INNER JOIN tbltransaction ON intID = intTypeofDeployment WHERE intTRequestID = ?`,[req.params.requestid], function (err, results) {

    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.otherfee = results;
    return next();
  });
}


// ---------------------------------------------------------------------------------------TRANSACTION
//------------------------------------------------------------------------------------ TRANSACTION: Client Request
function rendertransclient(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_client_request',{usertab: req.user, requesttab: req.request});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclientrequest(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT CONCAT(b.strLName,', ', b.strFName) AS strName, strRequestType, datRequestDate, datRequestNeedDate, strRequestStatus, intRequestID, strRequestDesc FROM tblfinalrequest as a INNER JOIN tbluser as b ON a.intRequest_ClientID = b.intID WHERE a.strRequestStatus IN ('On process', 'On contract', 'Pending') ORDER BY intRequestID Desc`, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    for(var i = 0; i < results.length; i++){
      results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
      results[i].datRequestNeedDate =  moment(results[i].datRequestNeedDate).format("LL");   
    }
    req.request = results;
    return next();
  });

}
router.get('/transaction_client_request', flog, findclientrequest, rendertransclient);

router.post('/transactionrequestdecision',flog, clientrequestdecision);
function clientrequestdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1='approve'){
    db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Approved' WHERE intRequestID='${req.body.transid}'`, function (err) {
      console.log(err);
      res.redirect('/admin/transaction_client_request')
    });
  }
  else{

  }
}

//------------------------------------------------------------------------------------ TRANSACTION: Client Request(specific)
function rendertransclientspecific(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_client_requestlist',{usertab: req.user, listtab:req.list, requesttab: req.request, clienttab: req.client, selectedtab: req.selected, contracttab: req.contract, contractdetailstab: req.contractdetails});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclientlistspecific(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblinitialrequest INNER JOIN tblMservice ON intITypeOfService = intID WHERE intIRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.request = results;
    return next();
  });
}
function findclientrequestspecific(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfinalrequest WHERE intRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.list = results;
    return next();
  });
}

function findclient(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,CONCAT(strLName,', ', strFName) AS strName FROM tbluser INNER JOIN tblclient ON intID = intClientID INNER JOIN tblFinalRequest ON intID = intRequest_ClientID WHERE intRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.client = results;
    return next();
  });
}

function findselected(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) as age FROM tblmservice INNER JOIN tblhouseholdworker ON intID = intServiceID INNER JOIN tblresults ON intRHWID = intHWID  INNER JOIN tbluser ON tbluser.intID = intHWID WHERE intRRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.selected = results;
    return next();
  });
}
function findifthereiscontract(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) as contract FROM tbltransaction WHERE intTRequestID = '${req.params.requestid}'`, function(err, results){
    console.log('xxxxxxxxxxx'+req.params.requestID);
    req.contract = results;
    return next();
  })

}
function findthecontract(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tbltransaction WHERE intTRequestID = '${req.params.requestid}'`, function(err, results){
    console.log(err);
    for(var i = 0; i <results.length; i++){
     results[i].datDateofDeployment =  moment(results[i].datDateofDeployment).format("LL");
     results[i].timTimeofDeployment =  moment(results[i].timTimeofDeployment, 'HH:mm').format("hh:mm a");
    }
    req.contractdetails = results;
    return next();
  })
}
router.get('/transaction_client_request_:requestid', flog, findclientrequestspecific, findclientlistspecific, findifthereiscontract, findthecontract, findclient, findselected,  rendertransclientspecific);

//----------------------------------------------------------------------------------------------------- 
function rendertransclientno(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_client_request_result',{usertab: req.user, listtab:req.list, requesttab: req.request, resultatab:req.resulta, otherresultatab: req.otherresulta});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclientrequestspecific2(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfinalrequest WHERE intRequestID=?",[req.params.requestidd], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.list = results;
    return next();
  });
}
function findclientlistno(req,res,next){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query(`SELECT * FROM tblinitialrequest WHERE intIRequestID=? AND intIRequest_No=?`,[req.params.requestid, req.params.requestno], function (err, results) {
    if (err) return res.send(err);
    req.request=results;
    console.log('');
    return next();
  });
}
function resultquery(req,res,next){
  console.log('ID=='+ req.params.requestid);
  console.log('No.=='+req.params.requestno);
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query(`SELECT * FROM tblinitialrequest WHERE intIRequestID=? AND intIRequest_No=?`,[req.params.requestid, req.params.requestno], function (err, results) {
    if (!results[0])
    if (err) return res.send(err);
    console.log('');
    console.log(req.params.requestid);
    console.log(req.params.requestno);
      if (results[0].strIRequestGender == 'Any'){
        db2.query(`SELECT *
                    FROM
                        (SELECT a.intHWID, b.strType, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                        FROM tblhouseholdworker as a INNER JOIN tblhw_educbg as b on a.intHWID= b.intHWID_educbg  inner join tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID
                        ) as ta INNER JOIN
                        (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                          FROM tblhw_workbg
                          Group by intHWID_workbg) as tb 
                    ON tb.intHWID_workbg =  ta.intHWID
                    WHERE ((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService}) AND (age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2})
                            AND (strGender IN ('Male', 'Female')) AND (strType="${results[0].strIRequestEduc}")) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid} )
                    HAVING Work_exp >= ${results[0].intIRequestExp} `,function(err,results2){
          console.log('query1');
          if (err) return res.send(err);
          req.resulta = results2; 
          return next();
        })
      }
      else {
        db2.query(`SELECT *
                    FROM
                        (SELECT a.intHWID, b.strType, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                        FROM tblhouseholdworker as a INNER JOIN tblhw_educbg as b on a.intHWID= b.intHWID_educbg  inner join tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID
                        ) as ta INNER JOIN
                        (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                          FROM tblhw_workbg
                          Group by intHWID_workbg) as tb 
                    ON tb.intHWID_workbg =  ta.intHWID
                    WHERE ((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService}) AND (age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2})
                            AND (strGender = '${results[0].strIRequestGender}') AND (strType="${results[0].strIRequestEduc}")) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid})
                    HAVING Work_exp >= ${results[0].intIRequestExp} `,function(err,results2){
          console.log('query2');
          if (err) return res.send(err);
          req.resulta = results2; 
          return next();
        })

      }
  });
}
function resultothers(req,res,next){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query(`SELECT * FROM tblinitialrequest WHERE intIRequestID=? AND intIRequest_No=?`,[req.params.requestid, req.params.requestno], function (err, results) {
    if (!results[0])
    if (err) return res.send(err);
    console.log('');
      if (results[0].strIRequestGender == 'Any'){
        db2.query(`SELECT *
                    FROM
                        (SELECT a.intHWID, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                        FROM tblhouseholdworker as a INNER JOIN tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID
                        ) as ta INNER JOIN
                        (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                          FROM tblhw_workbg
                          Group by intHWID_workbg) as tb 
                    ON tb.intHWID_workbg =  ta.intHWID
                    WHERE (((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService})) AND ((age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2})
                            OR (strGender IN ('Male', 'Female')))) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid})
                    HAVING Work_exp >= ${results[0].intIRequestExp} `,function(err,results2){
          console.log('query1');
          if (err) return res.send(err);
          req.otherresulta = results2; 
          return next();
        })
      }
      else {
        db2.query(`SELECT *
                    FROM
                        (SELECT a.intHWID, b.strType, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                        FROM tblhouseholdworker as a INNER JOIN tblhw_educbg as b on a.intHWID= b.intHWID_educbg  inner join tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID
                        ) as ta INNER JOIN
                        (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                          FROM tblhw_workbg
                          Group by intHWID_workbg) as tb 
                    ON tb.intHWID_workbg =  ta.intHWID
                    WHERE (((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService})) AND ((age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2})
                            OR (strGender = '${results[0].strIRequestGender}') OR (strType="${results[0].strIRequestEduc}"))) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid})
                    HAVING Work_exp >= ${results[0].intIRequestExp} `,function(err,results2){
          console.log('query2');
          if (err) return res.send(err);
          req.otherresulta = results2; 
          return next();
        })

      }
  });

}
router.get('/transaction_result_/-/:requestid/-/:requestno', flog, findclientrequestspecific2, resultquery, resultothers, findclientlistno, rendertransclientno);

// --------------------------------------------------------------------------------TRANSACTIONS ADD TO LIST
router.post('/transaction_add_to_list_/-/:requestid/-/:requestno/-/:requesthw', flog, findclientrequestspecific2, resultquery, findclientlistno, addtolist);
function addtolist(req,res){
  var db = require('../../lib/database')();
  var db2  = require('../../lib/database')();
  db2.query(`SELECT * FROM tblresults WHERE intRRequestID = ${req.params.requestid} AND intRRequest_No =${req.params.requestno} AND intRHWID=${req.params.requesthw}`, function (err, results2) {
    if (err) return res.send(err);
      if (!results2[0]){
        console.log('wala pa laman kaya inadd')
        db.query(`INSERT INTO tblresults VALUES (?,?,?,'','')`, [req.params.requestid, req.params.requestno, req.params.requesthw], function (err) {
          res.redirect('/admin/transaction_result_/-/'+ req.params.requestid +'/-/'+ req.params.requestno)
        }) 
      }
      else{
        // db.query(`INSERT INTO tblresults VALUES (?,?,?,'','')`, [req.params.requestid, req.params.requestno, req.params.requesthw], function (err, results) {
        //   if (err) return res.send(err);
          console.log('di pa naka add kaya inadd');
          res.redirect('/admin/transaction_result_/-/'+ req.params.requestid +'/-/'+  req.params.requestno)
        // })
      }
    
  })
}

// ------------------------------------------------------------------------------------------------------TRANSACTION: SEND TO HW, SEND TO CLIENT
function addfunctions(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'sendtohw'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Waiting' WHERE strRHWStatus='' AND intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
      res.send('success')
      // res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
  else if(req.body.btn1 == 'cancelsendtohw'){
    db.query(`UPDATE tblresults SET strRHWStatus= '' WHERE strRHWStatus='Waiting' AND intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
      res.send('cancel')
    // res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
  else if(req.body.btn1 == 'sendtoclient'){
    db.query(`UPDATE tblresults SET strRClientStatus= 'Waiting' WHERE strRClientStatus='' AND intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
    res.send('sentclient')
      // res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
  else if(req.body.btn1 == 'removefromlist'){
    db.query(`DELETE FROM tblresults WHERE intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
    res.send('removed')
      // res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
}
router.post('/tr_add_actions_:requestid',flog, addfunctions);

// ------------------------------------------------------------------------------------------------------------------TRANSACTION: Re-send Rejected Contract
router.post('/re-send_contract',flog, resendcon, updatefilename);
function resendcon(req,res,next){
 if (req.files){
   console.log(req.files);
   var file = req.files.filename,
        filename = file.name;
    file.mv('public/pdfs/'+filename, function(err){
      if (err){
        console.log(err)
      }
      else{      
        // res.redirect('/admin/transaction_client_request_'+req.body.transid);
        return next();
      }
    })

 }
}
function updatefilename(req,res){
  var db = require('../../lib/database')();
  db.query(`UPDATE tbltransaction SET strContract=?, strContractStatus='Client Confirmation' WHERE intTRequestID = ?`,[req.body.nameoffile, req.body.transid], function(err){
    if (err){
      res.send(err);
    }
    else{
      res.redirect('/admin/transaction_client_request_'+req.body.transid);
    }
  })
}
router.post('/cancel_re-send_contract', flog, cancelresend)
function cancelresend(req,res){
  var db = require('../../lib/database')();
  db.query(`UPDATE tbltransaction SET strContractStatus='Rejected' WHERE intTRequestID = ?`,[req.body.transid], function(err){
  if (err){
    console.log(err)
  }
  else{
     res.redirect('/admin/transaction_client_request_'+req.body.transid);
  }
  })
}


// ------------------------------------------------------------------------------------------------------------------View HW Profile
function renderhwprofile(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_hw_profile',{usertab: req.user, hw1tab: req.hw1, hw2tab: req.hw2, hw3tab: req.hw3, listtab: req.list});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findhw(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,tbluser.strStatus AS stat FROM tbluser INNER JOIN tblhouseholdworker on intID = intHWID INNER JOIN tblmservice AS a ON intServiceID=a.intID WHERE tbluser.intID =?",[req.params.hwid], function (err, results) {
    console.log(''+req.params.hwid);
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw1 = results;
    for(var i = 0; i < req.hw1.length; i++){
      req.hw1[i].datBirthDay =  moment(results[i].datBirthDay).format("LL");
    }
    return next();
  });
}

function findhweduc(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblhw_educbg WHERE intHWID_educbg = ? ",[req.params.hwid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw2 = results;
    return next();
  });
}
function findhwwork(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblhw_workbg WHERE intHWID_workbg = ? ",[req.params.hwid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw3 = results;
    return next();
  });
}
router.get('/hw_profile_:requestid:hwid', flog, findhw, findhweduc, findhwwork,  findclientrequestspecific, renderhwprofile)




// --------------------------------------------------------------------------------TRANSACTIONS SETTLEMENT
router.get('/transaction_settle', flog, findtranssettle, rendertranssettle);
function rendertranssettle(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_settle',{usertab: req.user, listtab: req.list});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findtranssettle(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT CONCAT(b.strLName,', ', b.strFName) AS strName, strRequestType, datRequestDate, datRequestNeedDate, strRequestStatus, intRequestID FROM tblfinalrequest as a INNER JOIN tbluser as b ON a.intRequest_ClientID = b.intID WHERE a.strRequestStatus IN ('Approved') ORDER BY intRequestID Desc`, function (err, results) {
    console.log(err)
    for(var i = 0; i < results.length; i++){
      results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
      results[i].datRequestNeedDate =  moment(results[i].datRequestNeedDate).format("LL");   
    }
    req.list = results;
    return next();
  });
}

router.post('/transaction_settledecision',flog, clientsettledecision, contractexpiry);
function clientsettledecision(req,res,next){
  var db = require('../../lib/database')();
  // var db2 = require('../../lib/database')();
  if(req.body.btn1='settle'){
    var randomId= makeid();
    jpeg= req.body.transid+('-'+randomId+'.jpg');
    req.files.postimage.mv('public/image/orpic/'+jpeg, function(err) {
      db.query(`UPDATE tbltransaction SET strORNumber=?, datDateSettled=?, strORPicture=?, strTStatus='On-going' WHERE intTRequestID='${req.body.transid}'`,[req.body.ornum, req.body.datesettled, jpeg], function (err) {
        console.log(err);
        db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Finished' WHERE intRequestID='${req.body.transid}'`, function (err) {
          console.log(err);
          db.query(`SELECT * FROM tblfreereplacement`, function (err,result) {
            console.log(err);
            db.query(`UPDATE tblcontract SET datDateStarted ='${req.body.datesettled}', strCurStatus='Current', intConReplacementLeft='${result[0].intFreeReplacement}' WHERE intConTransID='${req.body.transid}'`, function (err) {
              console.log(err);
              db.query(`UPDATE tbluser u INNER JOIN tblcontract c ON u.intID = c.intConHWID SET u.strStatus ='Deployed' WHERE u.strType = 'Household Worker' AND c.intConTransID = '${req.body.transid}'`, function (err) {
                console.log(err);
                // res.redirect('/admin/transaction_settle')
                return next();
                
              });
            });
            });
          });
        });
        console.log(err)
      });
      
    }
  
  else{
    
  }
}
function contractexpiry(req,res){
  var db = require('../../lib/database')();
  db.query(`SELECT DATE_ADD(datDateSettled, INTERVAL 6 MONTH) AS dateexpire FROM tbltransaction WHERE intTRequestID =?`, [req.body.transid], function (err,results){
    console.log(err);
    db.query(`UPDATE tbltransaction SET datDateExpiry =? WHERE intTRequestID = ?`,[results[0].dateexpire, req.body.transid], function(err){
      console.log(err);
      res.redirect('/admin/transaction_settle')
    })
  })
}

router.post('/transaction_settledecision_replacementclient',flog, clientsettledecisionreplacement, clientsettledecisionreplacementleft);
function clientsettledecisionreplacement(req,res, next){
  var db = require('../../lib/database')();
  // var db2 = require('../../lib/database')();
  if(req.body.btn1='settle'){
    db.query(`UPDATE tbltransaction SET strORNumber=?, datDateSettled=?, strTStatus='On-going' WHERE intTRequestID='${req.body.transid}'`,[req.body.ornum, req.body.datesettled], function (err) {
      console.log(err);
      db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Finished' WHERE intRequestID='${req.body.transid}'`, function (err) {
        console.log(err);
        db.query(`SELECT * FROM tblfreereplacement`, function (err,result) {
          console.log(err);
          db.query(`UPDATE tblcontract SET datDateStarted ='${req.body.datesettled}', strCurStatus='Current', intConReplacementLeft='${result[0].intFreeReplacement}' WHERE intConTransID='${req.body.transid}'`, function (err) {
            console.log(err);
            db.query(`UPDATE tbluser u INNER JOIN tblcontract c ON u.intID = c.intConHWID SET u.strStatus ='Deployed' WHERE u.strType = 'Household Worker' AND c.intConTransID = '${req.body.transid}'`, function (err) {
              console.log(err);
              db.query(`UPDATE tblreplacement SET intReplaceNewHWID =(SELECT intConHWID FROM tblcontract WHERE intConTransID = ?) WHERE intReplaceReqID = ?`, [req.body.transid, req.body.transid],function (err) {
                console.log(err);
                db.query(`UPDATE tblreplacement SET intReplaceNewHWID =(SELECT intConHWID FROM tblcontract WHERE intConTransID = ?) WHERE intReplaceReqID = ?`, [req.body.transid, req.body.transid],function (err) {
                  console.log(err);
                  return next();
                  // res.redirect('/admin/transaction_settle')
                });
              });
            });
          });
        });
      });
    });
  }
  else{
    
  }
}

router.post('/transaction_settledecision_replaceclient',flog, clientsettledecisionreplaceclient, clientsettledecisionreplacementleft2);
function clientsettledecisionreplaceclient(req,res, next){
  var db = require('../../lib/database')();
  // var db2 = require('../../lib/database')();
  if(req.body.btn1='settle'){
    db.query(`UPDATE tbltransaction SET strORNumber=?, datDateSettled=?, strTStatus='On-going' WHERE intTRequestID='${req.body.transid}'`,[req.body.ornum, req.body.datesettled], function (err) {
      console.log(err);
      db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Finished' WHERE intRequestID='${req.body.transid}'`, function (err) {
        console.log(err);
        db.query(`SELECT * FROM tblfreereplacement`, function (err,result) {
          console.log(err);
          db.query(`UPDATE tblcontract SET datDateStarted ='${req.body.datesettled}', strCurStatus='Current', intConReplacementLeft='${result[0].intFreeReplacement}' WHERE intConTransID='${req.body.transid}'`, function (err) {
            console.log(err);
            db.query(`UPDATE tbluser u INNER JOIN tblcontract c ON u.intID = c.intConHWID SET u.strStatus ='Deployed' WHERE u.strType = 'Household Worker' AND c.intConTransID = '${req.body.transid}'`, function (err) {
              console.log(err);
              db.query(`UPDATE tblreplacement SET intReplaceNewHWID =(SELECT intConHWID FROM tblcontract WHERE intConTransID = ?) WHERE intReplaceReqID = ?`, [req.body.transid, req.body.transid],function (err) {
                console.log(err);
                db.query(`UPDATE tblreplacement SET intReplaceNewHWID =(SELECT intConHWID FROM tblcontract WHERE intConTransID = ?) WHERE intReplaceReqID = ?`, [req.body.transid, req.body.transid],function (err) {
                  console.log(err);
                  return next();
                  // res.redirect('/admin/transaction_settle')
                });
              });
            });
          });
        });
      });
    });
  }
  else{
    
  }
}

function clientsettledecisionreplacementleft(req,res){
  var db = require('../../lib/database')();
  db.query(`SELECT  (intConReplacementLeft-1) AS Remain, datDateExpiry as dateexpire  FROM tblreplacement INNER JOIN tblcontract ON intReplaceOldHWID=intConHWID INNER JOIN tbltransaction on intTRequestID = intConTransID  WHERE intReplaceReqID= ? ORDER BY datDateofDeployment DESC LIMIT 1`,[req.body.transid] ,function (err, results) {
    console.log(err)
    db.query(`UPDATE tblcontract SET intConReplacementLeft = ${results[0].Remain} WHERE intConTransID='${req.body.transid}'`)
    db.query(`UPDATE tblcontract c INNER JOIN tblreplacement r ON c.intConHWID = r.intReplaceOldHWID INNER JOIN tbluser ON intID = r.intReplaceOldHWID SET c.strCurStatus ='Replaced', strStatus='Registered' WHERE  c.strCurStatus ='To be replaced' AND strStatus='Deployed' AND r.intReplaceReqID = '${req.body.transid}'`)
    // db.query(`SELECT DATE_ADD(datDateSettled, INTERVAL 6 MONTH) AS dateexpire FROM tbltransaction WHERE intTRequestID =?`, [req.body.transid], function (err,results2){
      // console.log(err);
      db.query(`UPDATE tbltransaction SET datDateExpiry =? WHERE intTRequestID = ?`,[results[0].dateexpire, req.body.transid], function(err){
        console.log(err);
        res.redirect('/admin/transaction_settle')
      })
    // })
  });
}
function clientsettledecisionreplacementleft2(req,res){
  var db = require('../../lib/database')();
  db.query(`SELECT (intConReplacementLeft) AS Remain, datDateExpiry as dateexpire  FROM tblreplacement INNER JOIN tblcontract ON intReplaceOldHWID=intConHWID INNER JOIN tbltransaction on intTRequestID = intConTransID WHERE intReplaceReqID='${req.body.transid}' ORDER BY datDateofDeployment DESC LIMIT 1`, function (err, results) {
    console.log(err)
    db.query(`UPDATE tblcontract SET intConReplacementLeft = ${results[0].Remain} WHERE intConTransID='${req.body.transid}'`)
    db.query(`UPDATE tblcontract c INNER JOIN tblreplacement r ON c.intConHWID = r.intReplaceOldHWID INNER JOIN tbluser ON intID = r.intReplaceOldHWID SET c.strCurStatus ='Replaced', strStatus='Registered' WHERE  c.strCurStatus ='To be replaced' AND strStatus='Deployed' AND r.intReplaceReqID = '${req.body.transid}'`)
    db.query(`UPDATE tbltransaction SET datDateExpiry =? WHERE intTRequestID = ?`,[results[0].dateexpire, req.body.transid], function(err){
      console.log(err);
      res.redirect('/admin/transaction_settle')
    })
  });
}


router.post('/transaction_settledecision_reliever',flog, clientsettledecisionreliever, clientsettledecisionreplacementleft3);
function clientsettledecisionreliever(req,res, next){
  var db = require('../../lib/database')();
  // var db2 = require('../../lib/database')();
  if(req.body.btn1='settle'){
    db.query(`UPDATE tbltransaction SET strORNumber=?, datDateSettled=?, strTStatus='On-going' WHERE intTRequestID='${req.body.transid}'`,[req.body.ornum, req.body.datesettled], function (err) {
      console.log(err);
      db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Finished' WHERE intRequestID='${req.body.transid}'`, function (err) {
        console.log(err);
        db.query(`SELECT * FROM tblfreereplacement`, function (err,result) {
          console.log(err);
          db.query(`UPDATE tblcontract SET datDateStarted ='${req.body.datesettled}', strCurStatus='Current', intConReplacementLeft='${result[0].intFreeReplacement}' WHERE intConTransID='${req.body.transid}'`, function (err) {
            console.log(err);
            db.query(`UPDATE tbluser u INNER JOIN tblcontract c ON u.intID = c.intConHWID SET u.strStatus ='Deployed' WHERE u.strType = 'Household Worker' AND c.intConTransID = '${req.body.transid}'`, function (err) {
              console.log(err);
              db.query(`UPDATE tblreliever SET intRelieverID =(SELECT intConHWID FROM tblcontract WHERE intConTransID = ?), strRelieverStatus='Deployed' WHERE intReq_RelID = ?`, [req.body.transid, req.body.transid],function (err) {
                console.log(err);
                // db.query(`UPDATE tblreplacement SET intReplaceNewHWID =(SELECT intConHWID FROM tblcontract WHERE intConTransID = ?) WHERE intReplaceReqID = ?`, [req.body.transid, req.body.transid],function (err) {
                //   console.log(err);
                  return next();
                  // res.redirect('/admin/transaction_settle')
                // });
              });
            });
          });
        });
      });
    });
  }
  else{
    
  }
}
function clientsettledecisionreplacementleft3(req,res){
  var db = require('../../lib/database')();
  db.query(`SELECT datDateTo AS dateexpire,  (intConReplacementLeft) AS Remain FROM tblreliever INNER JOIN tblcontract ON intTobeRelievedID = intConHWID INNER JOIN tblleaverequest ON intLeaveRequestID = intReq_RelID
            	ORDER BY datDateTo DESC LIMIT 1`, function (err, results) {
    console.log(err)
    db.query(`UPDATE tblcontract SET intConReplacementLeft = ${results[0].Remain} WHERE intConTransID='${req.body.transid}'`)
    db.query(`UPDATE tblcontract c INNER JOIN tblreliever r ON c.intConHWID = r.intTobeRelievedID INNER JOIN tbluser ON intID = r.intTobeRelievedID SET c.strCurStatus ='On leave' WHERE  c.strCurStatus ='Current' AND strStatus='Deployed' AND r.intReq_RelID = '${req.body.transid}'`)
    db.query(`UPDATE tbltransaction SET datDateExpiry =? WHERE intTRequestID = ?`,[results[0].dateexpire, req.body.transid], function(err){
      console.log(err);
      res.redirect('/admin/transaction_settle')
    })
  });
}

// --------------------------------------------------------------------------------- TRANSACTIONS SETTLE VIEW
router.get('/transaction_settle_:transid', flog, findtransaction, findcontractstatusforhw, rendertranssettleview); 
function rendertranssettleview(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_settle_view',{usertab: req.user, transtab: req.trans, hwtab: req.hw});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

//----------------------------------------------------------------------------------TRANSACTIONS SETTLED
router.get('/transaction_settled', flog, findtranssettled, rendertranssettled); 
function rendertranssettled(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_settled',{usertab: req.user, listtab: req.list});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

function findtranssettled (req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT CONCAT(b.strLName,', ', b.strFName) AS strName, intTRequestID, datDateSettled, strTStatus, datDateExpiry AS dateexpire, strRequestType FROM tbltransaction AS A INNER JOIN tblfinalrequest ON intRequestID = intTRequestID INNER JOIN tbluser AS b ON intID = intRequest_ClientID
     WHERE a.strTStatus IN ('On-going') ORDER BY datDateSettled Desc`, function (err, results) {
    console.log(err)
    for(var i = 0; i < results.length; i++){
      results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL");
      results[i].dateexpire =  moment(results[i].dateexpire).format("LL");   
    }
    req.list = results;
    return next();
  });
}
//----------------------------------------------------------------------------------TRANSACTIONS SETTLED VIEW
router.get('/transaction_settled_:transid', flog, findtransaction,  findcontractstatusforhw, rendertranssettledview);
function rendertranssettledview(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_settled_view',{usertab: req.user, transtab: req.trans, hwtab: req.hw});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findtransaction(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT *, c.intID AS clientid, c.strFName AS clientFName, c.strLName AS clientLName, f.strName as deployment FROM tbltransaction INNER JOIN tbluser AS c ON c.intID = intTClientID INNER JOIN tblfee as f ON f.intID = intTypeofDeployment WHERE intTRequestID =  ?`, [req.params.transid], function(err,results){
    console.log(err)
    console.log('xxxxxx'+req.params.transid);
    for(var i = 0; i < results.length; i++){
      results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL");
      results[i].datDateExpiry =  moment(results[i].datDateExpiry).format("LL");     
    }
    req.trans = results;
    return next();
  })
}
function findcontractstatusforhw(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT a.*, strName, strFName, strLName FROM tblcontract AS a INNER JOIN tblhouseholdworker as b on a.intConHWID = b.intHWID INNER JOIN tblmservice as c on c.intID = b.intServiceID INNER JOIN tbluser as d on d.intID = b.intHWID WHERE intConTransID = '${req.params.transid}'`, function(err, results){
    console.log('error: '+err);
    req.hw = results;
    return next();
  })
}


// --------------------------------------------------------------------------------TRANSACTION INCIDENT REPORT: Client
router.get('/transaction_ir_client', flog, findclient_ir, rendertrans_irclient)
function rendertrans_irclient(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_incidentreport_client',{usertab: req.user, reptab: req.rep});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

function findclient_ir(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT *,a.strFName AS repFName, a.strLName AS repLName , u.intID AS RecipientID, u.strFName AS RFName, u.strLName AS RLName, strName FROM tbluser As a INNER JOIN tblreport ON intID = intReporterID  INNER JOIN tbluser AS u ON u.intID = intRecipentID INNER JOIN tblmincidentreport as i ON i.intID = intTypeofReport WHERE a.strType ='Client' `, function(err, results){
    console.log(err)
    req.rep = results;
    for(var i = 0; i < req.rep.length; i++){
      req.rep[i].datDateReported =  moment(req.rep[i].datDateReported).format("LL");   
    }
    return next();
  })
}

// --------------------------------------------------------------------------------TRANSACTION INCIDENT REPORT: household worker
router.get('/transaction_ir_hw', flog, findhw_ir, rendertrans_irhw)
function rendertrans_irhw(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_incidentreport_hw',{usertab: req.user, reptab: req.rep});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

function findhw_ir(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT *,a.strFName AS repFName, a.strLName AS repLName , u.intID AS RecipientID, u.strFName AS RFName, u.strLName AS RLName, strName FROM tbluser As a INNER JOIN tblreport ON intID = intReporterID  INNER JOIN tbluser AS u ON u.intID = intRecipentID INNER JOIN tblmincidentreport as i ON i.intID = intTypeofReport WHERE a.strType ='Household Worker' `, function(err, results){
    console.log(err)
    req.rep = results;
    for(var i = 0; i < req.rep.length; i++){
      req.rep[i].datDateReported =  moment(req.rep[i].datDateReported).format("LL");   
    }
    return next();
  })
}

// ----------------------------------------------------------------Incident Report Action
router.post('/tr_ir',flog, irc_actions);
function irc_actions(req,res){
  var db = require('../../lib/database')();
  db.query(`UPDATE tblreport SET strValidity =?, strReportStatus= ?, strActionTaken=? WHERE intReportID =?`,[req.body.validity, req.body.stat, req.body.action, req.body.reportid],function (err){
    console.log( req.body.action)
    console.log(req.body.reportid)
    res.redirect('/admin/transaction_ir_client')
  })
}
router.post('/tr_ir_hw',flog, irc_actions);
function irc_actions(req,res){
  var db = require('../../lib/database')();
  db.query(`UPDATE tblreport SET strValidity =?, strReportStatus= ?, strActionTaken=? WHERE intReportID =?`,[req.body.validity, req.body.stat, req.body.action, req.body.reportid],function (err){
    console.log( req.body.action)
    console.log(req.body.reportid)
    res.redirect('/admin/transaction_ir_hw')
  })
}


//=--------------------------------------------------------------------------------TRANSACTION CLIENT LIST
router.get('/client_list', flog, regifindclientlist, findmrequirementscl, renderregiclientlist);
function renderregiclientlist(req,res){
  if(req.valid==0)
    res.render('admin/views/client_list',{usertab: req.user, itemtab: req.item, requirementtab: req.requirement});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
function regifindclientlist(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client'", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function findmrequirementscl(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblmrequirements WHERE strType='Client' `, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.requirement = results;
    return next();
  });
}

// function pik(req, res, next){
//   var storage = multer.diskStorage({
//     destination: function(cb){
//       cb(null,'public/image/clientrequirements/');
//     },
//     filename: function(req, cb){
//       cb(null, '[' + req.body.clientID + ']' + '-' + '[' + req.body.fullname + ']' + '-' + '(' + req.body.requiname +')' + '.jpg' );
//     }
//   });
//   var upload = multer({storage:storage}).array({ name: 'postimage', maxCount: 15 });
//   upload(req,res,function(err) { 
//     console.log(err)
//   });
//   return next();
// }
// Approve client and reject client2
function approveClient2(req,res){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  if(req.body.btn1 == 'approve'){
    var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Unregistered' AND intID = ?";
    db.query(sql,[req.body.clientID],function (err) {
    if (err) return res.send(err)
    res.redirect('/admin/transactions/clients/pending');
    })
  }
  else if (req.body.btn1 == 'reject'){
    var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
    db2.query(sql,[req.body.clientID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/transactions/clients/pending');
    })
  }
  else if(req.body.btn1 == 'revert'){
    var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
    db.query(sql,[req.body.clientID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/transactions/clients/rejected');
    })
  }
}
router.post('/tr_approve_client',flog, approveClient2);





// ---------------------------------------------------------------------------------TRANSACTION HWLIST
function findhwlist(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker'", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function houseHoldReq(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblmrequirements WHERE strType='Household Worker' `, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.houseHoldReq = results;
    return next();
  });
}
function renderhwlist(req,res){
  if(req.valid==0)
    res.render('admin/views/householdworker_list',{usertab: req.user, itemtab: req.item, HWreqtab: req.houseHoldReq});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//list 
router.get('/householdworker_list', flog, findhwlist, houseHoldReq, renderhwlist);
//-------------------------------------------------------------------------
//function- auto-gen(code)
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
function passwordgen() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvqxyz1234567890";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
//-------
// HW APPROVE/REJECT/REVERT
function hwoptions(req,res){
  var autogen= passwordgen();
  code = autogen;
  fullname =(req.body.fname +" "+ req.body.lname);
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  console.log('xxxxxxxxxxxxx'+req.body.hwID)
  if(req.body.btn1 == 'approve'){
    var sql = "UPDATE tbluser SET strStatus= 'Registered', strPassword = ? WHERE strStatus='Unregistered' AND intID = ?";
    db.query(sql,[code , req.body.hwID],function (err) {
    if (err) return res.send(err)
        else{
          mailer.sendMail({
              from: 'testchms123@gmail.com',
              to: req.body.email,
              subject: 'User Password',
              html:
                  "<center>"+
                  "<h2 style='font-size:28px;'> CHMS </h2> </center>"+ "<hr>"+
                  "<p>Good Day " +fullname+ ", your user password is "+
                  "<b style='font-size:15px;'>" +code+ "</b></p>"+
                  "<p> You may change your password in your dashboard account </p>",
              template: 'send', //name ng html file na irerender
              },
              function(err, response){
                  if(err){
                      console.log("Bad email");
                      console.log(err);
                  }
                  else{
                      console.log("passcode sent");
                      }
                  }
              );
          res.redirect('/admin/transactions/household_workers/pending');
          }
    })
  }
  else if (req.body.btn1 == 'reject'){
    var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
    db2.query(sql,[req.body.hwID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/transactions/household_workers/pending');
    })
  }
  else if(req.body.btn1 == 'revert'){
    var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
    db.query(sql,[req.body.hwID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/transactions/household_workers/rejected');
    })
  }
}
router.post('/tr_approve_hw',flog,hwoptions);


// ------------------------------------------------------------------------------------------------------CLIENT PROFILE
router.get('/profile_client_:userid',flog, findprofclient, renderprofclient);
function renderprofclient(req,res){
  if(req.valid==0)
  res.render('admin/views/profile_client',{usertab: req.user, clienttab: req.client});
  else if(req.valid==1)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}
function findprofclient(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,CONCAT(strLName,', ', strFName) AS strName FROM tbluser INNER JOIN tblclient ON intID = intClientID WHERE intID=?",[req.params.userid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    console.log(results[0].intID+'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    req.client = results;
    console.log(req.client)
    return next();
  });
}
//Update Picture - CLient
router.post('/profile_client_:userid/updatePic',(req, res) =>{
  var db = require('../../lib/database')();
  var randomId= makeid();
  jpeg= req.body.id+('-'+randomId+'.jpg');
  req.files.postimage.mv('public/images/'+jpeg, function(err) {
    db.query("UPDATE tbluser SET strPicture = ? WHERE intID = ?",[jpeg, req.body.id], (err, results, fields)=>{
        if (err) console.log(err);
        return res.redirect('/admin/profile_client_'+req.body.id,flog, findprofclient, renderprofclient);
      });
    });
});

// ----------------------------------------------------------------------------------------------------HOUSEHOLD WORKER PROFILE
router.get('/profile_hw_:hwid',flog, findhw, findhweduc, findhwwork, findhwref, findhwreports, renderprofhw);
function renderprofhw(req,res){
  if(req.valid==0)
  res.render('admin/views/profile_hw',{usertab: req.user, hw1tab: req.hw1, hw2tab: req.hw2, hw3tab: req.hw3, hw4tab: req.hw4, hw5tab: req.hw5});
  else if(req.valid==1)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}
function findhwref(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblhw_ref WHERE intHWID_ref =?`, [req.params.hwid], function(err,results){
    console.log(err);
    req.hw4=results;
    return next();
  })
}
function findhwreports(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * , a.intID AS ReporterID, a.strFName AS RFName, a.strLName AS RLName, strName FROM tbluser As a INNER JOIN tblreport ON intID = intReporterID  INNER JOIN tblmincidentreport as i ON i.intID = intTypeofReport WHERE intRecipentID =? AND strValidity ='Valid'`, [req.params.hwid], function(err,results){
    console.log(err);
    for(var i = 0; i < results.length; i++){
      results[i].datDateReported =  moment(results[i].datDateReported).format("LL");   
    }
    req.hw5=results;
    return next();
  })
}
//Update Picture
router.post('/profile_hw_:hwid/updatePic',(req, res) =>{
  var db = require('../../lib/database')();
  var randomId= makeid();
  jpeg= req.body.id+('-'+randomId+'.jpg');
  req.files.postimage.mv('public/images/'+jpeg, function(err) {
    db.query("UPDATE tbluser SET strPicture = ? WHERE intID = ?",[jpeg, req.body.id], (err, results, fields)=>{
        if (err) console.log(err);
        return res.redirect('/admin/profile_hw_'+req.body.id, flog, findhw, findhweduc, findhwwork, renderprofhw);
      });
    });
});



//---------------------------------------------------------------------------------HOUSEHOLD WORKER REGISTRATION
//dropdown(other skills)
function dropSkills(req, res, next){
  var db = require('../../lib/database')();
  db.query('SELECT * FROM tblmskills WHERE strStatus = "Active" ', function (err, results, fields) {
      if (err) return res.send(err);
      req.dropSkills = results;
      return next();
  });
}
function renderregistrationHW(req,res){
  // var educelem = ['hey', req.body.elemname, req.body.elemadd, req.body.elemyear];
  // console.log('xxxxxxxxxxxxx'+educelem[0]);
  if(req.valid==0)
    res.render('admin/views/registration_household_worker',{usertab: req.user, itemtab: req.item, dropskills: req.dropSkills});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/registration_household_worker', flog, findmservice, dropSkills,  renderregistrationHW);


router.post('/register_householdworker',(req, res) => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    // console.log('xxxxxxxxxxxxx'+educelem);
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  var db3 = require('../../lib/database')();
  var db41 = require('../../lib/database')();
  var db421 = require('../../lib/database')();
  var db422 = require('../../lib/database')();
  var db431 = require('../../lib/database')();
  var db432 = require('../../lib/database')();
  var db433 = require('../../lib/database')();
  var db441 = require('../../lib/database')();
  var db442 = require('../../lib/database')();
  var db443 = require('../../lib/database')();
  var db451 = require('../../lib/database')();
  var db452 = require('../../lib/database')();
  var db453 = require('../../lib/database')();
  var db454 = require('../../lib/database')();
  var db511 = require('../../lib/database')();
  var db512 = require('../../lib/database')();
  var db513 = require('../../lib/database')();
  var db514 = require('../../lib/database')();
  var db521 = require('../../lib/database')();
  var db522 = require('../../lib/database')();
  var db523 = require('../../lib/database')();
  var db531 = require('../../lib/database')();
  var db532 = require('../../lib/database')();
  var db541 = require('../../lib/database')();
  var db61 = require('../../lib/database')();
  var db62 = require('../../lib/database')();
  var db63 = require('../../lib/database')();
  var db64 = require('../../lib/database')();
  var db65 = require('../../lib/database')();
  var db66 = require('../../lib/database')();
  //tbl user
  db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus) VALUES ('${req.body.fname}', '${req.body.mname}', '${req.body.lname}', '${req.body.eaddress}', ?, 'blank.jpg', 'Household Worker', 'Unregistered')`,[retVal], (err) => {
    //find hw
    db2.query(`SELECT intID from tbluser WHERE strPassword=?`, [retVal], (err,results) => {
      if (err) console.log(err);
    //   // tbl hw
      db3.query(`INSERT INTO tblhouseholdworker VALUES 
                ('${results[0].intID}', 
                 '${req.body.service}', 
                 '${req.body.bday}',
                 '${req.body.gender}',

                 '${req.body.civilstatus}',  
                 '${req.body.citizenship}',
                 '${req.body.religion}',
                 '${req.body.height}',
                 '${req.body.weight}',
                 '${req.body.cellnum}',
                 '${req.body.telnum}',
                 '${req.body.housenum}',
                 '${req.body.street}',
                 '${req.body.municipality}',
                 '${req.body.city}',
                 '${req.body.paddress}',
                 '${req.body.baddress}',
                 '${req.body.skills}')`, (err) => {
                  if (err) console.log(err);

        if(req.body.elemname==''){
          console.log('hindi nakapag elem');
        }
        else if(req.body.elemname!='' && req.body.secondname==''){
          console.log('nakapag elem')
          db41.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername=='' && req.body.vocname==''){
          console.log('nakapag hs')
          db421.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db422.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername!='' && req.body.vocname==''){
          console.log('nakapag college')
          db431.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db432.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
          db433.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type3}', '${req.body.tername}', '${req.body.teradd}', '${req.body.teryear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername=='' && req.body.vocname!=''){
          console.log('nakapag voc')
          db441.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db442.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
          db443.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type4}', '${req.body.vocname}', '${req.body.vocadd}', '${req.body.vocyear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername!='' && req.body.vocname!=''){
          console.log('all')
          db451.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db452.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
          db453.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type4}', '${req.body.vocname}', '${req.body.vocadd}', '${req.body.vocyear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
          db454.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type3}', '${req.body.tername}', '${req.body.teradd}', '${req.body.teryear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
        }
        
        });
      if(req.body.workfrom1 !='' && req.body.workfrom2 !='' && req.body.workfrom3 !='' && req.body.workfrom4 !=''){
        db511.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
        db512.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp2}', '${req.body.workadd2}', '${req.body.workpos2}', '${req.body.workfrom2}', '${req.body.workto2}')`, (err) =>{
          console.log(err);
        })
        db513.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp3}', '${req.body.workadd3}', '${req.body.workpos3}', '${req.body.workfrom3}', '${req.body.workto3}')`, (err) =>{
          console.log(err);
        })
        db514.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp4}', '${req.body.workadd4}', '${req.body.workpos4}', '${req.body.workfrom4}', '${req.body.workto4}')`, (err) =>{
          console.log(err);
        })
      }
      else if(req.body.workfrom1 !='' && req.body.workfrom2 !='' && req.body.workfrom3 !='' && req.body.workfrom4 ==''){
        db521.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
        db522.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp2}', '${req.body.workadd2}', '${req.body.workpos2}', '${req.body.workfrom2}', '${req.body.workto2}')`, (err) =>{
          console.log(err);
        })
        db523.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp3}', '${req.body.workadd3}', '${req.body.workpos3}', '${req.body.workfrom3}', '${req.body.workto3}')`, (err) =>{
          console.log(err);
        })
      }
      else if(req.body.workfrom1 !='' && req.body.workfrom2 !='' && req.body.workfrom3 =='' && req.body.workfrom4 ==''){
        db531.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
        db532.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp2}', '${req.body.workadd2}', '${req.body.workpos2}', '${req.body.workfrom2}', '${req.body.workto2}')`, (err) =>{
          console.log(err);
        })
      }
      else if(req.body.workfrom1 !='' && req.body.workfrom2 =='' && req.body.workfrom3 =='' && req.body.workfrom4 ==''){
        db541.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
      }
      else{
        db511.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '0', '0')`, (err) =>{
          console.log(err);
        })
      }
        db61.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Relative', '${req.body.name1}', '${req.body.add1}', '${req.body.occ1}', '${req.body.contact1}')`, (err) => {
          console.log(err);
        })
        db62.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Relative', '${req.body.name2}', '${req.body.add2}', '${req.body.occ2}', '${req.body.contact2}')`, (err) => {
          console.log(err);
        })
        db63.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Relative', '${req.body.name3}', '${req.body.add3}', '${req.body.occ3}', '${req.body.contact3}')`, (err) => {
          console.log(err);
        })
        db64.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Non-relative', '${req.body.name4}', '${req.body.add4}', '${req.body.occ4}', '${req.body.contact4}')`, (err) => {
          console.log(err);
        })
        db65.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Non-relative', '${req.body.name5}', '${req.body.add5}', '${req.body.occ5}', '${req.body.contact5}')`, (err) => {
          console.log(err);
        })
        db66.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Non-relative', '${req.body.name6}', '${req.body.add6}', '${req.body.occ6}', '${req.body.contact6}')`, (err) => {
          console.log(err);
        })

      res.redirect('/admin/registration_household_worker');
      });
    });
});

//--------------------------------------------------------------------------------CLIENT REGISTRATION
function renderregistrationClient(req,res){
  if(req.valid==0)
    res.render('admin/views/registration_client',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/registration_client', flog, renderregistrationClient);

router.post('/register_client',(req, res) => {
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  var db3 = require('../../lib/database')();
  db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus) VALUES ("${req.body.firstname}", "${req.body.middlename}", "${req.body.lastname}","${req.body.email}", "${req.body.password}", 'blank.jpg', "Client", "Unregistered")`, (err) => {
    if (err) console.log(err);
    db2.query(`SELECT * FROM tbluser WHERE strEmail=? and strPassword=?`,[req.body.email, req.body.password], (err, results)=>{
      if (err) console.log(err);
        db3.query(`INSERT INTO tblClient VALUES ("${results[0].intID}", "${req.body.contactnum}", "${req.body.housenum}", "${req.body.streetnum}","${req.body.province}", "${req.body.city}", "${req.body.permanentadd}", "${req.body.ofcaddress}", "${req.body.ofcnum}")`,(err) =>{
          if (err) console.log(err);
      })
    })
  });
  res.redirect('/admin/registration_client');
});


// 
// --------------------------------------------------------------------------------CLIENT
// Reinstate client
// function reinstateClient(req,res){
//   var db = require('../../lib/database')();
//   var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Banned' AND intID = ?";
//   db.query(sql,[req.params.userid],function (err) {
//     if (err) return res.send(err);
//     res.redirect('/admin/client_list');
//   });
// }
// // Ban Client
// function banClient(req,res){
// var db = require('../../lib/database')();
// var sql = "UPDATE tbluser SET strStatus= 'Banned' WHERE strStatus='Registered' AND intID = ?";
// db.query(sql,[req.params.userid],function (err) {
//   if (err) return res.send(err);
//   res.redirect('/admin/client_list');
// });
// }
// router.get('/reinstate_client/:userid',flog,reinstateClient);
// router.get('/ban_client/:userid',flog,banClient);

// function findclientlist(req, res, next){
//   var db = require('../../lib/database')();
//   db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND (strStatus='Registered' OR strStatus='Banned')", function (err, results) {
//     if (err) return res.send(err);
//     if (!results[0])
//     console.log('');
//     req.item = results;
//     return next();
//   });
// }
// function renderclientlist(req,res){
//   if(req.valid==0)
//     res.render('admin/views/client_list',{usertab: req.user, itemtab: req.item});
//   else if(req.valid==1)
//     res.render('admin/views/invalidpages/normalonly');
//   else
//     res.render('login/views/invalid');

// }
// router.get('/client_list', flog, findclientlist, renderclientlist);

// -------------------------------------------------------------------------------ClIENT PENDING REGISTRATION
// Approve client
// // // // function approveClient(req,res){
// // // //   var db = require('../../lib/database')();
// // // //   var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Unregistered' AND intID = ?";
// // // //   db.query(sql,[req.params.userid],function (err) {
// // // //     if (err) return res.send(err);
// // // //     res.redirect('/admin/client_pending_registration');
// // // //   });
// // // // }
// // // // // Revert client
// // // // function revertClient(req,res){
// // // //   var db = require('../../lib/database')();
// // // //   var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
// // // //   db.query(sql,[req.params.userid],function (err) {
// // // //     if (err) return res.send(err);
// // // //     res.redirect('/admin/client_pending_registration');
// // // //   });
// // // // }
// // // // reject Client
// // // function rejectClient(req,res){
// // //   var db = require('../../lib/database')();
// // //   var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
// // //   db.query(sql,[req.params.userid],function (err) {
// // //     if (err) return res.send(err);
// // //     res.redirect('/admin/client_pending_registration');
// // //   });
// // // }
// // // router.get('/approve_client/:userid',flog,approveClient);
// // // router.get('/revert_client/:userid',flog,revertClient);
// // // router.get('/reject_client/:userid',flog,rejectClient);

// // function findclientregi(req, res, next){
// //   var db = require('../../lib/database')();
// //   db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND (strStatus='Unregistered' OR strStatus='Rejected') ", function (err, results) {
// //     if (err) return res.send(err);
// //     if (!results[0])
// //     console.log('');
// //     req.item = results;
// //     return next();
// //   });
// // }
// // function renderclientregi(req,res){
// //   if(req.valid==0)
// //     res.render('admin/views/client_pending_registration',{usertab: req.user, itemtab: req.item});
// //   else if(req.valid==1)
// //     res.render('admin/views/invalidpages/normalonly');
// //   else
// //     res.render('login/views/invalid');

// // }
// // router.get('/client_pending_registration', flog, findclientregi, renderclientregi);


// // ---------------------------------------------------------------------------------HOUSEHOLD WORKER
// // Reinstate Household Worker
// function reinstateHW(req,res){
//   var db = require('../../lib/database')();
//   var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Banned' AND intID = ?";
//   db.query(sql,[req.params.userid],function (err) {
//     if (err) return res.send(err);
//     res.redirect('/admin/householdworker_list');
//   });
// }
// // Ban Household Worker
// function banHW(req,res){
// var db = require('../../lib/database')();
// var sql = "UPDATE tbluser SET strStatus= 'Banned' WHERE strStatus='Registered' AND intID = ?";
// db.query(sql,[req.params.userid],function (err) {
//   if (err) return res.send(err);
//   res.redirect('/admin/householdworker_list');
// });
// }
// router.get('/reinstate_householdworker/:userid',flog,reinstateHW);
// router.get('/ban_householdworker/:userid',flog,banHW);




// // -------------------------------------------------------------------------------Household Worker PENDING REGISTRATION
// // Approve HW
// function approveHW(req,res){
//   var db = require('../../lib/database')();
//   var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Unregistered' AND intID = ?";
//   db.query(sql,[req.params.userid],function (err) {
//     if (err) return res.send(err);
//     res.redirect('/admin/householdworker_pending_registration');
//   });
// }
// // Revert HW
// function revertHW(req,res){
//   var db = require('../../lib/database')();
//   var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
//   db.query(sql,[req.params.userid],function (err) {
//     if (err) return res.send(err);
//     res.redirect('/admin/householdworker_pending_registration');
//   });
// }
// // reject hw
// function rejectHW(req,res){
//   var db = require('../../lib/database')();
//   var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
//   db.query(sql,[req.params.userid],function (err) {
//     if (err) return res.send(err);
//     res.redirect('/admin/householdworker_pending_registration');
//   });
// }
// router.get('/approve_householdworker/:userid',flog,approveHW);
// router.get('/revert_householdworker/:userid',flog,revertHW);
// router.get('/reject_householdworker/:userid',flog,rejectHW);

// function findhwregi(req, res, next){
//   var db = require('../../lib/database')();
//   db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Household Worker' AND (strStatus='Unregistered' OR strStatus='Rejected') ", function (err, results) {
//     if (err) return res.send(err);
//     if (!results[0])
//     console.log('');
//     req.item = results;
//     return next();
//   });
// }
// function renderhwregi(req,res){
//   if(req.valid==0)
//     res.render('admin/views/householdworker_pending_registration',{usertab: req.user, itemtab: req.item});
//   else if(req.valid==1)
//     res.render('admin/views/invalidpages/normalonly');
//   else
//     res.render('login/views/invalid');

// }
// router.get('/householdworker_pending_registration', flog, findhwregi, renderhwregi);

//----------------------------------------------------------------------------------UTILITIES
function findustaff(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Admin' ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

function renderutilitiesStaff(req,res){
  if(req.valid==0)
    res.render('admin/views/utilities_staff',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/utilities_staff', flog, findustaff, renderutilitiesStaff);

router.post('/add_staff',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tbluser (strFName, strMName, strLName, strEmail, strPassword, strType, strStatus)  VALUES ("${req.body.firstname}", "${req.body.middlename}", "${req.body.lastname}", "${req.body.email}", "${req.body.password}", "${req.body.type}", "Registered")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/utilities_staff');
    });
});

router.get('/utilities_fees', flog, findfees, renderutilfees);
function renderutilfees(req,res){
  if(req.valid==0)
    res.render('admin/views/utilities_fees',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findfees(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfee", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

router.get('/utilities_freereplacement', flog, findfreereplacement, renderutilfreereplacement);
function renderutilfreereplacement(req,res){
  if(req.valid==0)
    res.render('admin/views/utilities_freereplacement',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findfreereplacement(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfreereplacement", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
//-------------------------------------------Router.get(household request)
var leaveReqFunc = [displayLeaveReq]
router.get('/transaction_hhRequest_leave', flog, leaveReqFunc, hhReqLeave_render );
router.get('/transaction_replacement_of_client', flog, findreplacementofclient, hhReqReplacementrender)
//------------------------------------------ROUTER.get Client Maintenance 
var clientMaintenance = [
                          displayPendingClient, findmrequirementscl, //pending
                          displayRegisteredClient,  // Registered 
                          displayRejectedClient, // Rejected
                          displayBannedClient // Banned
                        ]
//pending
router.get('/transactions/clients/pending', flog, clientMaintenance ,renderClientsPending);
//registered
router.get('/transactions/clients/registered', flog, clientMaintenance ,renderClientsRegistered);
//rejected
router.get('/transactions/clients/rejected', flog, clientMaintenance ,renderClientsRejected);
//banned
router.get('/transactions/clients/banned', flog, clientMaintenance ,renderClientsBanned);


//------------------------------------------ROUTER.get Client Maintenance 
var hhworkertMaintenance = [ displayPendingHhworker, houseHoldReq, //pending
                             displayDeployedHhworker,  //deployed
                             displayRegisteredHhworker, //registered
                             displayBannedHhworker, //banned
                             displaySuspendedHhworker, //suspended
                             displayRejectedHhworker //banned               
                            ]
//pending
router.get('/transactions/household_workers/pending', flog, hhworkertMaintenance ,renderHhwPending);
//deployed
router.get('/transactions/household_workers/deployed', flog, hhworkertMaintenance ,renderHhwDeployed);
//Rregistered
router.get('/transactions/household_workers/registered', flog, hhworkertMaintenance ,renderHhwRegistered);
//banned
router.get('/transactions/household_workers/banned', flog, hhworkertMaintenance ,renderHhwBanned);
//suspended
router.get('/transactions/household_workers/suspended', flog, hhworkertMaintenance ,renderHhwSuspended);
//Rejected
router.get('/transactions/household_workers/rejected', flog, hhworkertMaintenance ,renderHhwRejected);


//terms
router.get('/registration/Terms_and_Conditions', flog, terms);

//maintenance City
router.get('/maintenance_reason_of_replacement', flog, displayReason, renderReasonReplacement );
exports.admin= router;
