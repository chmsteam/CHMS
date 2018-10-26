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
function updateleavestatus(req, res, next){
  var db = require('../../lib/database')();
  db.query('SELECT * FROM tblleaverequest AS tl INNER JOIN tbluser AS ts ON tl.intHouseholdID = ts.intID INNER JOIN tblmleave AS lt ON tl.intTypeOfLeave = lt.intID', function (err, results, fields) {
    var x= moment().format('DD/MM/YYYY');
    var y = moment(results[0].datDateFrom).format('DD/MM/YYYY');
    if(x < y){
      console.log('Hindi pa po')
    }
    else if(x == y){
      console.log('Ngayon Na!')
    }
    else if(x > y){
      console.log('lagpas na')
    }
    console.log('date today: '+ x)
    console.log('date from: '+ y)
    return next();
  })
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
// leave effective
router.post('/transaction_hhRequest_leave/effective', (req,res) =>{
  var db = require('../../lib/database')();
    db.query("UPDATE tblleaverequest SET strLeaveStatus = 'Effective' WHERE intLeaveRequestID = ?", [req.body.id], (err, results, fields)=>{
        if (err) console.log(err);
      res.redirect('/admin/transaction_hhRequest_leave')
      });
})
//  leave finish
router.post('/transaction_hhRequest_leave/finish', (req, res) =>{
  var db = require('../../lib/database')();
  
    db.query(`SELECT *, COUNT(intRelieverID) as bato FROM tblreliever WHERE intReq_RelID =?`, [req.body.id], function(err,results){
      if (err){
        res.send(err);
      } 
      else{
        if(results[0].bato != 0){
          // var x= moment().format('YYYY-MM-DD');
          console.log('>>>>>>>>'+ req.body.date);
          console.log('Merong reliever')
          db.query(`UPDATE tblreliever SET strRelieverStatus = 'Finished' WHERE intReq_RelID = ?`, [req.body.id], function(err){
            if (err) res.send(err);
            db.query(`UPDATE tblcontract SET strCurStatus = 'Reliever Returned' WHERE intConHWID =? AND strCurStatus='Reliever'`, [results[0].intRelieverID], function(err){
              if (err) res.send(err);
              db.query(`UPDATE tbluser SET strStatus = 'Registered' WHERE intID =? AND strStatus='Deployed'`, [results[0].intRelieverID], function(err){
                if (err) res.send(err);
                db.query(`UPDATE tbltransaction SET strTStatus = 'Finished', datDateExpiry=? WHERE intTRequestID =?`, [req.body.thedate, req.body.id], function(err){
                  if (err) res.send(err);
                })
              })
            })
          })
        }
      }
      // req.item = results;
      db.query(`UPDATE tblcontract SET strCurStatus = 'Current' WHERE intConHWID = ? AND strCurStatus = 'On leave'`, [results[0].intTobeRelievedID], function(err){
        if (err) res.send(err);
      db.query("UPDATE tblleaverequest SET strLeaveStatus = 'Finished' WHERE intLeaveRequestID = ? ",
        [req.body.id], (err)=>{
          if (err) console.log(err);
          else{
                res.redirect('/admin/transaction_hhRequest_leave')  
          }
      });
      })
    })
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
    res.render('admin/views/index',
      {
        usertab: req.user,
        clPending: req.PendingCL,
        hwPending: req.PendingHHW,
        clReq: req.clientReq,
        clIr: req.clientIr,
        hwIr: req.hhwIr,
        clSet: req.clientSet
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
var dashRender = [ cntPendingCL, cntPendingHHW, clientReq, clientIr, hhwIr, clientSet];

router.get('/', flog, dashRender, render);

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
  db.query("SELECT * FROM tblmreplacereason WHERE strName = ?",[req.body.reason], (err, results)=>{
    console.log(err);
    var reasons = results[0];
    console.log(reasons);
    if(!reasons){
      db.query(`INSERT INTO tblmreplacereason (strName, strStatus)  VALUES ("${req.body.reason}", "Active")`, (err) => {
        if (err) console.log(err);
        res.send('added');
        // res.redirect('/admin/maintenance_reason_of_replacement');
      });
    }
    else
      res.send('already exist');
  });
});
router.post('/edit_repReason',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmreplacereason SET strName= ? WHERE intID = ?";
  db.query("SELECT * FROM tblmreplacereason WHERE strName = ?",[req.body.reason], (err, results)=>{
    console.log(err);
    var reasons = results[0];
    console.log(reasons);
    if(!reasons){
      db.query(sql,[req.body.reason, req.body.repID],function (err) {
        if (err) console.log(err);
        res.send('updated');
        // res.redirect('/admin/maintenance_reason_of_replacement');
        });
      }
    else
      res.send('already exist');
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
  db.query("SELECT * FROM tblmrequirements WHERE strName = ? AND strType = ?",[req.body.requirementname,req.body.reqtype], (err, results)=>{
    console.log(err);
    var requirements = results[0];
    console.log(requirements);
    if(!requirements){
      db.query(`INSERT INTO tblmrequirements (strName, strType, strStatus)  VALUES ("${req.body.requirementname}", "${req.body.reqtype}", "Active")`, (err) => {
        if (err) console.log(err);
        res.send('added');
        // res.redirect('/admin/maintenance_requirements');
      });
    }
    else
      res.send('already exist');
  });
});
router.post('/edit_requirement',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmrequirements SET strName= ?, strType= ? WHERE intID = ?";
  db.query("SELECT * FROM tblmrequirements WHERE strName = ? AND strType = ?",[req.body.requirementname,req.body.reqtype], (err, results)=>{
    console.log(err);
    var requirements = results[0];
    console.log(requirements);
    if(!requirements){
      db.query(sql,[req.body.requirementname, req.body.reqtype, req.body.requirementID],function (err) {
        console.log(err);
        res.send('updated');
        // res.redirect('/admin/maintenance_requirements');
        });
    }
    else
    res.send('already exist');
  });
});

router.post('/add_incidentreport',(req, res) => {
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmincidentreport WHERE strName = ? AND strLevel = ?",[req.body.incidentname,req.body.incidentlvl], (err, results)=>{
    console.log(err);
    var incidentReport = results[0];
    console.log(incidentReport);
    if(!incidentReport){
      db.query(`INSERT INTO tblmincidentreport (strName, strDesc, strLevel, strStatus)  VALUES ("${req.body.incidentname}", "${req.body.incidentdesc}", '${req.body.incidentlvl}', "Active")`, (err) => {
        if (err) console.log(err);
        res.send('added');
        // res.redirect('/admin/maintenance_incident_report');
        });
      }
    else
      res.send('already exist');
    });
});
router.post('/edit_incidentreport',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmincidentreport SET strName= ?, strDesc=?, strlevel=? WHERE intID = ?";
  db.query("SELECT * FROM tblmincidentreport WHERE strName = ? AND strLevel = ?",[req.body.incidentname,req.body.incidentlvl], (err, results)=>{
    console.log(err);
    var incidentReport = results[0];
    console.log(incidentReport);
    if(!incidentReport){
      db.query(sql,[req.body.incidentname, req.body.incidentdesc, req.body.incidentlvl, req.body.incidentID],function (err) {
        res.send('updated');
        // res.redirect('/admin/maintenance_incident_report');
        });
      }
    else
      res.send('already exist');
    });
});

router.post('/add_leave',(req, res) => {
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmleave WHERE strName = ? AND intDays = ?",[req.body.leavename,req.body.leaveday], (err, results)=>{
    console.log(err);
    var leave = results[0];
    console.log(leave);
    if(!leave){
      db.query(`INSERT INTO tblmleave (strName, intDays, intDaysForFile, strStatus)  VALUES ("${req.body.leavename}", "${req.body.leaveday}", "${req.body.leavefileday}", "Active")`, (err) => {
        if (err) console.log(err);
        res.send('added');
        // res.redirect('/admin/maintenance_type_of_leave');
        });
      }
    else
      res.send('already exist');
    });
});
router.post('/edit_leave',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmleave SET strName= ?, intDays=?, intDaysForFile=? WHERE intID = ?";
  db.query("SELECT * FROM tblmleave WHERE strName = ? AND intDays = ? AND intDaysForFile=?",[req.body.leavename,req.body.leaveday, req.body.leavefileday], (err, results)=>{
    console.log(err);
    var leave = results[0];
    console.log(leave);
    if(!leave){
      db.query(sql,[req.body.leavename, req.body.leaveday, req.body.leavefileday,req.body.leaveID],function (err) {
        res.send('updated');
        // res.redirect('/admin/maintenance_type_of_leave');
        });
      }
    else
      res.send('already exist');
    });
});

router.post('/add_service',(req, res) => {
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmservice WHERE strName = ? ",[req.body.servicename], (err, results)=>{
    console.log(err);
    var services = results[0];
    console.log(services);
    if(!services){
      db.query(`INSERT INTO tblmservice (strName, strStatus)  VALUES ("${req.body.servicename}","Active")`, (err) => {
        if (err) console.log(err);
        res.send('added');
        // res.redirect('/admin/maintenance_type_of_services');
      });
    }
    else
      res.send('already exist');
  });
});
router.post('/edit_service',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmservice SET strName= ? WHERE intID = ?";
  db.query("SELECT * FROM tblmservice WHERE strName = ? ",[req.body.servicename], (err, results)=>{
    console.log(err);
    var services = results[0];
    console.log(services);
    if(!services){
      db.query(sql,[req.body.servicename, req.body.serviceID],function (err) {
        console.log(err);
        res.send('updated');
        // res.redirect('/admin/maintenance_type_of_services');
        });
      }
    else
      res.send('already exist');
  });
});

router.post('/add_skill',(req, res) => {
  var db = require('../../lib/database')();
  db.query("SELECT strName FROM tblmskills WHERE strName = ? ",[req.body.skill], (err, results)=>{
    console.log(err);
    var skills = results[0];
    console.log(skills);
    if(!skills){
      db.query(`INSERT INTO tblmskills (strName, strStatus)  VALUES ("${req.body.skill}", "Active")`, (err) => {
        if (err) console.log(err);
        res.send('added');
        // res.redirect('/admin/maintenance_householdworker_skills');
      });
    }
    else
      res.send('already exist');
  });
});
router.post('/edit_skill',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmskills SET strName= ?, intSkillID_intID=? WHERE intID = ?";
  db.query("SELECT strName FROM tblmskills WHERE strName = ? ",[req.body.skillname], (err, results)=>{
    console.log(err);
    var skills = results[0];
    console.log(skills);
    if(!skills){
      db.query(sql,[req.body.skillname, req.body.serviceid, req.body.skillID],function (err) {
        if (err) console.log(err);
        res.send('updated');
        // res.redirect('/admin/maintenance_householdworker_skills');
        });
      }
    else
      res.send('already exist');
  });
});

router.post('/add_city',(req, res) => {
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmcity WHERE strName = ? ",[req.body.cityname], (err, results)=>{
    console.log(err);
    var city = results[0];
    console.log(city);
    if(!city){
      db.query(`INSERT INTO tblmcity (strName, strStatus)  VALUES ("${req.body.cityname}", "Active")`, (err) => {
        if (err) console.log(err);
        res.send('added');
        // res.redirect('/admin/maintenance_city');
      });
    }
    else
      res.send('already exist');
  });
});
router.post('/edit_city',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmcity SET strName= ? WHERE intID = ?";
  db.query("SELECT * FROM tblmcity WHERE strName = ? ",[req.body.cityname], (err, results)=>{
    console.log(err);
    var city = results[0];
    console.log(city);
    if(!city){
      db.query(sql,[req.body.cityname,  req.body.cityID],function (err) {
        if (err) console.log(err);
        res.send('updated');
        // res.redirect('/admin/maintenance_city');
        });
      }
    else
      res.send('already exist');
    });
});
//==============================
//=====INVOICE REPLACAMENT
router.get('/replacementInvoice_:requestid', flog, findclient, findagency, findtrans, finditemsRep, findsubtotalRep, findotherfee, renderinvoiceReplace)
function renderinvoiceReplace(req,res){
  if(req.valid==0)
    res.render('admin/views/repInvoice',{usertab: req.user, clienttab: req.client, agencytab: req.agency, dctab: req.dc, itemtabs: req.itemRep, otherfeetab: req.otherfee, subtotaltab: req.subtotalRep});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function finditemsRep(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT intServiceID,ta.strName, COUNT(intServiceID) AS service, fltFee, (COUNT(intServiceID)*fltfee) as subtotal FROM
          (SELECT * FROM tblresults INNER JOIN tblhouseholdworker ON intHWID = intRHWID INNER JOIN tblmservice ON intServiceID = intID WHERE strRClientStatus ='Approved' and intRRequestID=?) as ta,
          (SELECT * FROM tblfee WHERE intID=4) as tb 
          GROUP BY intServiceID `,[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.itemRep = results;
    return next();
  });
}
function findsubtotalRep(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT (COUNT(intServiceID)*fltfee) as subtotal FROM
            (SELECT * FROM tblresults INNER JOIN tblhouseholdworker ON intHWID = intRHWID INNER JOIN tblmservice ON intServiceID = intID WHERE strRClientStatus ='Approved' and intRRequestID=?) as ta,
            (SELECT * FROM tblfee WHERE intID=4) as tb`, [req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.subtotalRep = results;
    return next();
  });
}
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
  if(req.body.btn1=='approve'){
    db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Approved' WHERE intRequestID='${req.body.transid}'`, function (err) {
      console.log(err);
      res.redirect('/admin/transaction_client_request')
    });
  }
  else{
    db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Rejected' WHERE intRequestID='${req.body.transid}'`, function (err) {
      console.log(err);
      res.redirect('/admin/transaction_client_request')
    });
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
                   FROM (SELECT *
                         FROM (SELECT a.intHWID, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                               FROM tblhouseholdworker as a INNER JOIN tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID) as ta 
                              INNER JOIN (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                                          FROM tblhw_workbg
                          Group by intHWID_workbg) as tb 
                      ON tb.intHWID_workbg =  ta.intHWID
                      WHERE (((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService})) AND ((age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2}) OR (strGender IN ('Male', 'Female')))) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID =${req.params.requestid})
                      HAVING Work_exp >= ${results[0].intIRequestExp}) as thetable                                 
                  WHERE intHWID NOT IN (SELECT intHWID
                              FROM (SELECT a.intHWID, b.strType, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                                  FROM tblhouseholdworker as a INNER JOIN tblhw_educbg as b on a.intHWID= b.intHWID_educbg  inner join tblmservice as g on a.intServiceID=g.intID 
                                      inner join tbluser as f on a.intHWID = f.intID) as ta 
                                                          INNER JOIN (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                                              FROM tblhw_workbg
                                              Group by intHWID_workbg) as tb 
                                  ON tb.intHWID_workbg =  ta.intHWID
                              WHERE ((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService}) AND (age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2}) AND (strGender IN ('Male', 'Female')) AND (strType="${results[0].strIRequestEduc}")) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid}) )`,function(err,results2){
          console.log('query1');
          if (err) return res.send(err);
          req.otherresulta = results2; 
          return next();
        })
      }
      else {
        db2.query(`SELECT *
        FROM (SELECT *
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
            HAVING Work_exp >= ${results[0].intIRequestExp} ) as angtable
        WHERE intHWID NOT IN (SELECT intHWID
                            FROM
                                (SELECT a.intHWID, b.strType, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                                FROM tblhouseholdworker as a INNER JOIN tblhw_educbg as b on a.intHWID= b.intHWID_educbg  inner join tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID
                                ) as ta INNER JOIN
                                (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                                  FROM tblhw_workbg
                                  Group by intHWID_workbg) as tb 
                            ON tb.intHWID_workbg =  ta.intHWID
                            WHERE ((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService}) AND (age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2})
                                    AND (strGender = '${results[0].strIRequestGender}') AND (strType="${results[0].strIRequestEduc}")) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid}))`,function(err,results2){
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
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  console.log(req.body.hwid);
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
  db.query("SELECT *,tbluser.strStatus AS stat, TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) as age FROM tbluser INNER JOIN tblhouseholdworker on intID = intHWID INNER JOIN tblmservice AS a ON intServiceID=a.intID WHERE tbluser.intID =?",[req.params.hwid], function (err, results) {
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
    });
  }
  else{
    
  }
}

router.post('/transaction_settledecision_replaceclient',flog, clientsettledecisionreplaceclient, clientsettledecisionreplacementleft2);
function clientsettledecisionreplaceclient(req,res, next){
  var db = require('../../lib/database')();
  
  if(req.body.btn1='settle'){
    var randomId= makeid();
    jpeg= req.body.transid+('-'+randomId+'.jpg');
    req.files.postimage.mv('public/image/orpic/'+jpeg, function(err) {
      db.query(`UPDATE tbltransaction SET strORNumber=?, datDateSettled=?, strTStatus='On-going', strORPicture=? WHERE intTRequestID='${req.body.transid}'`,[req.body.ornum, req.body.datesettled, jpeg], function (err) {
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
    })
  }
  else{
    
  }
}

function clientsettledecisionreplacementleft(req,res){
  var db = require('../../lib/database')();
  db.query(`SELECT  (intConReplacementLeft-1) AS Remain, datDateExpiry as dateexpire  FROM tblreplacement INNER JOIN tblcontract ON intReplaceOldHWID=intConHWID INNER JOIN tbltransaction on intTRequestID = intConTransID  WHERE intReplaceReqID= ? ORDER BY datDateofDeployment DESC LIMIT 1`,[req.body.transid] ,function (err, results) {
    console.log(err)
    db.query(`UPDATE tblcontract SET intConReplacementLeft = ${results[0].Remain} WHERE intConTransID='${req.body.transid}'`)
    db.query(`UPDATE tblcontract c INNER JOIN tblreplacement r ON c.intConHWID = r.intReplaceOldHWID INNER JOIN tbluser ON intID = r.intReplaceOldHWID SET c.strCurStatus ='Replaced', strStatus IN ('Registered', 'Banned') WHERE  c.strCurStatus ='To be replaced' AND strStatus='Deployed' AND r.intReplaceReqID = '${req.body.transid}'`)
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
    db.query(`UPDATE tblcontract c INNER JOIN tblreplacement r ON c.intConHWID = r.intReplaceOldHWID INNER JOIN tbluser ON intID = r.intReplaceOldHWID SET c.strCurStatus ='Replaced', strStatus ('Registered', 'Banned') WHERE  c.strCurStatus ='To be replaced' AND strStatus='Deployed' AND r.intReplaceReqID = '${req.body.transid}'`)
    db.query(`UPDATE tbltransaction SET datDateExpiry =? WHERE intTRequestID = ?`,[results[0].dateexpire, req.body.transid], function(err){
      console.log(err);
      res.redirect('/admin/transaction_settle')
    })
  });
}


router.post('/transaction_settledecision_reliever',flog, clientsettledecisionreliever, clientsettledecisionreplacementleft3);
function clientsettledecisionreliever(req,res, next){
  var db = require('../../lib/database')();
  if(req.body.btn1='settle'){
    var randomId= makeid();
    jpeg= req.body.transid+('-'+randomId+'.jpg');
    req.files.postimage.mv('public/image/orpic/'+jpeg, function(err) {

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
      }) 
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
    db.query(`UPDATE tblcontract c INNER JOIN tblreliever r ON c.intConHWID = r.intTobeRelievedID INNER JOIN tbluser ON intID = r.intTobeRelievedID SET c.strCurStatus ='On leave' WHERE  c.strCurStatus ='Current' AND strStatus ('Registered', 'Banned') AND r.intReq_RelID = '${req.body.transid}'`)
    db.query(`UPDATE tbltransaction SET datDateExpiry =? WHERE intTRequestID = ?`,[results[0].dateexpire, req.body.transid], function(err){
      console.log(err);
      res.redirect('/admin/transaction_settle')
    })
  });
}

// --------------------------------------------------------------------------------- TRANSACTIONS SETTLE VIEW
router.get('/transaction_settle_:transid', flog, noofcontract, findtransaction, contractdetails, findcontractstatusforhw, rendertranssettleview); 
function rendertranssettleview(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_settle_view',{usertab: req.user, transtab: req.trans, hwtab: req.hw, settletab: req.settle, contractdetailstab: req.contractdetails});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.post('/upload_hwcon',flog, uploadhwcon, updatehwfilename);
function uploadhwcon(req,res,next){
//  if (req.files){
   console.log(req.files);
   var file = req.files.filename,
        filename = req.body.hwid+'-'+file.name;
    file.mv('public/pdfs/'+filename, function(err){
      if (err){
        console.log(err)
      }
      else{      
        // res.redirect('/admin/transaction_client_request_'+req.body.transid);
        return next();
      }
    })

//  }
}
function updatehwfilename(req,res){
  var db = require('../../lib/database')();
  console.log('strConCopy: '+ req.body.nameoffile);
  console.log('intConTransID: '+ req.body.transid);
  console.log('intConHWID: '+ req.body.hwid);
  db.query(`UPDATE tblcontract SET strConCopy=? WHERE intConTransID = ? AND intConHWID = ?`,[req.body.hwid+'-'+req.body.nameoffile, req.body.transid, req.body.hwid], function(err){
    if (err){
      res.send(err);
    }
    else{
      res.redirect('/admin/transaction_settle_'+req.body.transid);
    }
  })
}
function noofcontract(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM
  (SELECT COUNT(*) lahat FROM tblcontract WHERE intConTransID = ?) as ta JOIN 
  (SELECT COUNT(*) ngayon FROM tblcontract WHERE intConTransID = ? AND strConCopy NOT IN ('')) as tb`,[req.params.transid, req.params.transid], function(err, results){
    console.log('error: '+err);
    req.settle = results;
    return next();
  })
}
function contractdetails(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tbltransaction WHERE intTRequestID = '${req.params.transid}'`, function(err, results){
    console.log(err);
    for(var i = 0; i <results.length; i++){
     results[i].datDateofDeployment =  moment(results[i].datDateofDeployment).format("LL");
     results[i].timTimeofDeployment =  moment(results[i].timTimeofDeployment, 'HH:mm').format("hh:mm a");
    }
    req.contractdetails = results;
    return next();
  })
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
     WHERE a.strTStatus IN ('On-going', 'Finished', 'Terminated') ORDER BY datDateSettled Desc`, function (err, results) {
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
  db.query(`SELECT *, c.intID AS clientid, c.strFName AS clientFName, c.strLName AS clientLName, f.strName as deployment, datDateExpiry AS datdat FROM tbltransaction INNER JOIN tbluser AS c ON c.intID = intTClientID INNER JOIN tblfee as f ON f.intID = intTypeofDeployment INNER JOIN tblfinalrequest on intRequestID = intTRequestID WHERE intTRequestID =  ?`, [req.params.transid], function(err,results){
    console.log(err)
    console.log('xxxxxx'+req.params.transid);
    for(var i = 0; i < results.length; i++){
      results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL");
      results[i].datDateExpiry =  moment(results[i].datDateExpiry).format("LL"); 
      results[i].datdat =  moment(results[i].datdat).format("YYYY-MM-DD");    
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
    res.send('success');
    // res.redirect('/admin/transaction_ir_client')
  })
}
router.post('/tr_ir_hw',flog, irc_actions2);
function irc_actions2(req,res){
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
  db.query(`SELECT * FROM tblmrequirements WHERE strType='Client' AND strStatus ='Active' `, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.requirement = results;
    return next();
  });
}


// Approve client and reject client2
function approveClient2(req,res){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  if(req.body.btn1 == 'approve'){
    var sql = "UPDATE tbluser SET strStatus= 'Registered', datDateRegistered=? WHERE strStatus='Unregistered' AND intID = ?";
    db.query(sql,[req.body.dateregistered, req.body.clientID],function (err) {
    if (err) return res.send(err)
    // res.send('approved');
    res.redirect('/admin/transactions/clients/pending');
    })
  }
  else if (req.body.btn1 == 'reject'){
    var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
    db2.query(sql,[req.body.clientID],function (err) {
    if (err) return res.send(err);
    // res.send('rejected');
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
  db.query(`SELECT * FROM tblmrequirements WHERE strType = 'Household Worker' AND strStatus = 'Active' `, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.houseHoldReq = results;
    console.log(req.houseHoldReq);
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
    var sql = "UPDATE tbluser SET strStatus= 'Registered', strPassword = ?, datDateRegistered=? WHERE strStatus='Unregistered' AND intID = ?";
    db.query(sql,[code , req.body.dateregistered, req.body.hwID],function (err) {
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
router.get('/profile_client_:userid',flog, findprofclient, findclientcurrenthw, findclientreports, renderprofclient);
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
function findclientcurrenthw(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tbluser INNER JOIN tblcontract ON intID = intConHWID
                                  INNER JOIN tbltransaction ON intTRequestID = intConTransID
                      WHERE intTClientID = ? AND strCurStatus IN ('Current')`, [req.params.userid], function(err,results){
    if(err) res.send(err);
    else
    for(var i = 0; i < results.length; i++){
      results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL");
      results[i].datDateExpiry =  moment(results[i].datDateExpiry).format("LL");      
    }
    req.hw=results;
    return next();
  })
}
function findclientreports(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * , a.intID AS ReporterID, a.strFName AS RFName, a.strLName AS RLName, strName FROM tbluser As a INNER JOIN tblreport ON intID = intReporterID  INNER JOIN tblmincidentreport as i ON i.intID = intTypeofReport WHERE intRecipentID =? AND strValidity ='Valid'`, [req.params.userid], function(err,results){
    console.log(err);
    for(var i = 0; i < results.length; i++){
      results[i].datDateReported =  moment(results[i].datDateReported).format("LL");   
    }
    req.hw2=results;
    return next();
  })
}
function renderprofclient(req,res){
  if(req.valid==0)
  res.render('admin/views/profile_client',{usertab: req.user, clienttab: req.client, hwtab: req.hw, hw2tab: req.hw2});
  else if(req.valid==1)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}

router.post('/profile_client_banreinstate',flog, clientbanreinstate)
function clientbanreinstate(req,res){
  var db = require('../../lib/database')();
  if (req.body.btn1 == 'ban'){
    db.query(`UPDATE tbluser SET strStatus ='Banned', datDateRegistered=? WHERE intID=?`, [req.body.thedate, req.body.id], function(err){
      if (err) res.send(err);
      else
        res.redirect('/admin/profile_client_'+req.body.id)
    })
  }
  else if (req.body.btn1 == 'reinstate'){
    db.query(`UPDATE tbluser SET strStatus ='Registered', datDateRegistered=? WHERE intID=?`, [req.body.thedate, req.body.id], function(err){
      if (err) res.send(err);
      else
        res.redirect('/admin/profile_client_'+req.body.id)
    })
  }
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

router.post('/profile_hw_banreinstate',flog, hwbanreinstate)
function hwbanreinstate(req,res){
  var db = require('../../lib/database')();
  if (req.body.btn1 == 'ban'){
    db.query(`UPDATE tbluser SET strStatus ='Banned', datDateRegistered=? WHERE intID=?`, [req.body.thedate, req.body.id], function(err){
      if (err) res.send(err);
      else
        res.redirect('/admin/profile_hw_'+req.body.id)
    })
  }
  else if (req.body.btn1 == 'reinstate'){
    db.query(`SELECT COUNT(*) as hw FROM tbluser INNER JOIN tblcontract ON intID = intConHWID WHERE strCurStatus IN ('Current', 'Reliever', 'On leave') AND intID =?`, [req.body.id], function(err,results){
      if(err) res.send(err);
      else{
        if(results[0].hw == 0){
          db.query(`UPDATE tbluser SET strStatus ='Registered', datDateRegistered=? WHERE intID=?`, [req.body.thedate, req.body.id], function(err){
            if (err) res.send(err);
            else
              res.redirect('/admin/profile_hw_'+req.body.id)
          })  
        }
        else{
          db.query(`UPDATE tbluser SET strStatus ='Deployed' WHERE intID=?`, [req.body.id], function(err){
            if (err) res.send(err);
            else
              res.redirect('/admin/profile_hw_'+req.body.id)
          })  
        }
      }
    })
  }
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
  db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus, datDateRegistered) VALUES ('${req.body.fname}', '${req.body.mname}', '${req.body.lname}', '${req.body.eaddress}', ?, 'blank.jpg', 'Household Worker', 'Unregistered', NULL)`,[retVal], (err) => {
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
      
      res.send('success');
      // res.redirect('/admin/registration_household_worker');
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
    if(req.body.password === req.body.conpassword && req.body.password != ""){
      db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus, datDateRegistered) VALUES ("${req.body.firstname}", "${req.body.middlename}", "${req.body.lastname}","${req.body.email}", "${req.body.password}", 'blank.jpg', "Client", "Unregistered", NULL)`, (err) => {
        if (err) console.log(err);
        db.query(`SELECT * FROM tbluser WHERE strEmail=? and strPassword=?`,[req.body.email, req.body.password], (err, results)=>{
          if (err) console.log(err);
            db.query(`INSERT INTO tblClient VALUES ("${results[0].intID}", "${req.body.contactnum}", "${req.body.housenum}", "${req.body.streetnum}","${req.body.province}", "${req.body.city}", "${req.body.permanentadd}", "${req.body.ofcaddress}", "${req.body.ofcnum}")`,(err) =>{
              if (err) console.log(err);
          })
        })
      });
      res.send('success');
    }
    else{
      res.send('notmatch');
    }
    
  });


//----------------------------------------------------------------------------------UTILITIES
//==================================UPDATE
//name
router.post('/updateAgencyName',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblagency SET strName= ? ";
  db.query(sql,[req.body.agencyName],function (err) {
      if (err) console.log(err);
      res.send('updated');
      // res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
//Address
router.post('/updateAgencyAdd',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblagency SET strAddress= ? ";
  db.query(sql,[req.body.agencyAdd],function (err) {
      if (err) console.log(err);
      res.send('updated');
      // res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
//tel
router.post('/updateAgencyTel',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblagency SET strTelNum= ? ";
  db.query(sql,[req.body.agencyT],function (err) {
      if (err) console.log(err);
      res.send('updated');
      // res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
//Email
router.post('/updateAgencyEmail',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblagency SET strEmail= ? ";
  db.query(sql,[req.body.agencyEmail],function (err) {
      if (err) console.log(err);
      res.send('updated');
      // res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
//Owner
router.post('/updateAgencyOwner',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblagency SET strOwner= ? ";
  db.query(sql,[req.body.agencyOwner],function (err) {
      if (err) console.log(err);
      res.send('updated');
      // res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
//Owner
router.post('/updateAgencyOic',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblagency SET strOIC= ? ";
  db.query(sql,[req.body.agencyOic],function (err) {
      if (err) console.log(err);
      res.send('updated');
      // res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
//Fees
router.post('/updateFees',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblfee SET fltFee = ? WHERE intID = ? ";
  db.query(sql,[req.body.fee, req.body.feeid],function (err) {
      if (err) console.log(err);
      res.send('updated');
      // res.redirect('/admin/maintenance_reason_of_replacement');
    });
});
//Replacement Count
router.post('/updateRep',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblfreereplacement SET intFreeReplacement = ? ";
  db.query(sql,[req.body.replacement],function (err) {
      if (err) console.log(err);
      // res.send('updated');
      res.redirect('/admin/utilities_agency');
    });
});
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
  db.query(`INSERT INTO tbluser (strFName, strMName, strLName, strEmail, strPassword, strType, strStatus, datDateRegistered)  VALUES ("${req.body.firstname}", "${req.body.middlename}", "${req.body.lastname}", "${req.body.email}", "${req.body.password}", "${req.body.type}", "Registered", NULL)`, (err) => {
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

router.get('/utilities_agency', flog,findagency,findfreereplacement, renderutilagency);
function renderutilagency(req,res){
  if(req.valid==0)
    res.render('admin/views/utilities_agency',{usertab: req.user, agencytab: req.agency, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//-----------------------------------------------------DASHBOARD
//regitration client
function cntPendingCL(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(*) AS CNT FROM tbluser WHERE strStatus = 'Unregistered' AND strType = 'Client' ", function (err, results, fields) {
      if (err) return res.send(err);
      req.PendingCL = results;
      return next();
  });
}
//registration HHW
function cntPendingHHW(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(*) AS CNT FROM tbluser WHERE strStatus = 'Unregistered' AND strType = 'Household Worker'", function (err, results, fields) {
      if (err) return res.send(err);
      req.PendingHHW = results;
      return next();
  });
}
//client requests
function clientReq(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestStatus IN ('On process', 'Pending')", function (err, results, fields) {
      if (err) return res.send(err);
      req.clientReq = results;
      return next();
  });
}
//indcident Report CL
function clientIr(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(*) AS CNT FROM tbluser tbu INNER JOIN tblreport tbr ON tbu.intID = tbr.intReporterID WHERE strType = 'Client' AND tbr.strReportStatus NOT IN ('Resolved', 'Hid by client')" , function (err, results, fields) {
      if (err) return res.send(err);
      req.clientIr = results;
      return next();
  });
}
//indcident Report HHW
function hhwIr(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(*) AS CNT FROM tbluser tbu INNER JOIN tblreport tbr ON tbu.intID = tbr.intReporterID WHERE strType = 'Household Worker' AND tbr.strReportStatus NOT IN ('Resolved', 'Hid by Household Worker')", function (err, results, fields) {
      if (err) return res.send(err);
      req.hhwIr = results;
      return next();
  });
}
//settled CLIENT
function clientSet(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(*) AS CNT FROM tbltransaction tbt INNER JOIN tbluser tbu ON tbt.intTClientID = tbu.intID WHERE strTStatus = 'On-going' AND strType = 'Client'", function (err, results, fields) {
      if (err) return res.send(err);
      req.clientSet = results;
      return next();
  });
}



// -----------------------------------------------------------------REPORTS
counters = [hwPenCnt, hwRegCnt, hwDepCnt, hwBanCnt, clBanCnt, clPenCnt, clRegCnt, hwleavereq, hwreplacereq,
   clientaddreq, clientreplacereq, clientrelieverreq, irclient, irhw, 
   transpending, transapproved, transrejected, transongoing, transfinished, transterminated];
router.get('/reports',flog, counters, renderreports);
function renderreports(req,res){
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  if(req.valid==0)
    res.render('admin/views/reports',
      {
        usertab: req.user,
        hwPCount: req.hwPenCount,
        hwCount: req.hwRegCount,
        hwRCount: req.hwDepCount,
        hwBCount: req.hwBanCount,
        clRCount: req.clRegCount,
        clPCount: req.clPenCount,
        clBCount: req.clBanCount,
        hwleavereqtab: req.hwleavereq,
        hwreplacereqtab: req.hwreplacereq,
        clientaddreqtab: req.clientaddreq,
        clientreplacereqtab: req.clientreplacereq,
        clientrelieverreqtab: req.clientrelieverreq,
        irclienttab: req.irclient,
        irhwtab: req.irhw,
        transpendingtab: req.transpending, 
        transapprovedtab: req.transapproved, 
        transrejectedtab: req.transrejected, 
        transongoingtab: req.transongoing, 
        transfinishedtab: req.transfinished, 
        transterminatedtab: req.transterminated,
        thequerytab: req.thequery
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//Pending WH
function hwPenCnt(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Household Worker' AND strStatus = 'Unregistered' AND (datDateRegistered BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwPenCount = results;
      return next();
  });
}
//Registered HW
function hwRegCnt(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Household Worker' AND strStatus = 'Registered' AND (datDateRegistered BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwRegCount = results;
      return next();
  });
}
//Deployed HW
function hwDepCnt(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser INNER JOIN tblcontract ON intID = intConHWID  WHERE strType = 'Household Worker' AND strStatus = 'Deployed' AND (datDateStarted BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwDepCount = results;
      return next();
  });
}
// Banned HW
function hwBanCnt(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Household Worker' AND strStatus = 'Banned' AND (datDateRegistered BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwBanCount = results;
      return next();
  });
}

//Pending CLients
function clPenCnt(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Client' AND strStatus = 'Unregistered' AND (datDateRegistered BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.clPenCount = results;
      return next();
  });
}
//Registered CLients
function clRegCnt(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Client' AND strStatus = 'Registered' AND (datDateRegistered BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.clRegCount = results;
      return next();
  });
}
//Banned CLients
function clBanCnt(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Client' AND strStatus = 'Banned' AND (datDateRegistered BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.clBanCount = results;
      return next();
  });
}

// HW Leave Request 
function hwleavereq(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tblleaverequest WHERE datDateCreated BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}'`, function (err, results) {
      if (err) return res.send(err);
      req.hwleavereq = results;
      return next();
  });
}
// HW Replacement of Client Request 
function hwreplacereq(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Replace Client' AND (datRequestDate BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.hwreplacereq = results;
      return next();
  });
}

// Client Add Request
function clientaddreq(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Add' AND (datRequestDate BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.clientaddreq = results;
      return next();
  });
}
// Client Replacement Request
function clientreplacereq(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Replacement'  AND (datRequestDate BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.clientreplacereq = results;
      return next();
  });
}
// Client Reliever Request
function clientrelieverreq(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Reliever'  AND (datRequestDate BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.clientrelieverreq = results;
      return next();
  });
}

// Incident Report na ginawa ni Client
function irclient(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tblreport INNER JOIN tbluser ON intReporterID = intID WHERE strType = 'Client' AND (datDateReported BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.irclient = results;
      return next();
  });
}
// Incident Report na ginawa ni HW
function irhw(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tblreport INNER JOIN tbluser ON intReporterID = intID WHERE strType = 'Household Worker' AND (datDateReported BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.irhw = results;
      return next();
  });
}

// transactions pending
function transpending(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Pending' AND (datDateRequested BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.transpending = results;
      return next();
  });
}
// transactions approved
function transapproved(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Approved' AND (datDateRequested BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.transapproved = results;
      return next();
  });
}
// transactions rejected
function transrejected(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Rejected' AND (datDateRequested BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.transrejected = results;
      return next();
  });
}
// transactions ongoing
function transongoing(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'On-going' AND (datDateRequested BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.transongoing = results;
      return next();
  });
}
// transactions finished
function transfinished(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Finished' AND (datDateRequested BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.transfinished = results;
      return next();
  });
}
// transactions terminated
function transterminated(req, res, next){
  var db = require('../../lib/database')();
  var thequery = [{
    date1 : '2012-01-01',
    date2: '2018-10-17'
  }]
  req.thequery = thequery;
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Terminated' AND (datDateRequested BETWEEN '${thequery[0].date1}' AND '${thequery[0].date2}')`, function (err, results) {
      if (err) return res.send(err);
      req.transterminated = results;
      return next();
  });
}


// ------------------------------------------------POST report
counters2=[hwPenCnt2, hwRegCnt2, hwDepCnt2, hwBanCnt2, clBanCnt2, clPenCnt2, clRegCnt2, hwleavereq2, hwreplacereq2,
  clientaddreq2, clientreplacereq2, clientrelieverreq2, irclient2, irhw2, 
  transpending2, transapproved2, transrejected2, transongoing2, transfinished2, transterminated2]
router.post('/reports',flog, counters2, queryreports);
function queryreports(req,res){
  var thequery = [{
    date1 : req.body.datefrom,
    date2: req.body.dateto
  }]
  req.thequery = thequery;
  if(req.valid==0)
    res.render('admin/views/reports',
      {
        usertab: req.user,
        hwPCount: req.hwPenCount,
        hwCount: req.hwRegCount,
        hwRCount: req.hwDepCount,
        hwBCount: req.hwBanCount,
        clRCount: req.clRegCount,
        clPCount: req.clPenCount,
        clBCount: req.clBanCount,
        hwleavereqtab: req.hwleavereq,
        hwreplacereqtab: req.hwreplacereq,
        clientaddreqtab: req.clientaddreq,
        clientreplacereqtab: req.clientreplacereq,
        clientrelieverreqtab: req.clientrelieverreq,
        irclienttab: req.irclient,
        irhwtab: req.irhw,
        transpendingtab: req.transpending, 
        transapprovedtab: req.transapproved, 
        transrejectedtab: req.transrejected, 
        transongoingtab: req.transongoing, 
        transfinishedtab: req.transfinished, 
        transterminatedtab: req.transterminated,
        thequerytab: req.thequery
      });
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//Pending WH
function hwPenCnt2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Household Worker' AND strStatus = 'Unregistered' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwPenCount = results;
      return next();
  });
}
//Registered HW
function hwRegCnt2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Household Worker' AND strStatus = 'Registered' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwRegCount = results;
      return next();
  });
}
//Deployed HW
function hwDepCnt2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser INNER JOIN tblcontract ON intID = intConHWID  WHERE strType = 'Household Worker' AND strStatus = 'Deployed' AND (datDateStarted BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwDepCount = results;
      return next();
  });
}
// Banned HW
function hwBanCnt2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Household Worker' AND strStatus = 'Banned' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.hwBanCount = results;
      return next();
  });
}

//Pending CLients
function clPenCnt2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Client' AND strStatus = 'Unregistered' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.clPenCount = results;
      return next();
  });
}
//Registered CLients
function clRegCnt2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Client' AND strStatus = 'Registered' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.clRegCount = results;
      return next();
  });
}
//Banned CLients
function clBanCnt2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbluser WHERE strType = 'Client' AND strStatus = 'Banned' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.clBanCount = results;
      return next();
  });
}

// HW Leave Request 
function hwleavereq2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tblleaverequest WHERE datDateCreated BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}'`, function (err, results) {
      if (err) return res.send(err);
      req.hwleavereq = results;
      return next();
  });
}
// HW Replacement of Client Request 
function hwreplacereq2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Replace Client' AND (datRequestDate BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.hwreplacereq = results;
      return next();
  });
}

// Client Add Request
function clientaddreq2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Add' AND (datRequestDate BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.clientaddreq = results;
      return next();
  });
}
// Client Replacement Request
function clientreplacereq2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Replacement'  AND (datRequestDate BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.clientreplacereq = results;
      return next();
  });
}
// Client Reliever Request
function clientrelieverreq2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tblfinalrequest WHERE strRequestType='Reliever'  AND (datRequestDate BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strRequestStatus NOT IN('Draft', 'Cancelled', 'Deleted')`, function (err, results) {
      if (err) return res.send(err);
      req.clientrelieverreq = results;
      return next();
  });
}

// Incident Report na ginawa ni Client
function irclient2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tblreport INNER JOIN tbluser ON intReporterID = intID WHERE strType = 'Client' AND (datDateReported BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.irclient = results;
      return next();
  });
}
// Incident Report na ginawa ni HW
function irhw2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tblreport INNER JOIN tbluser ON intReporterID = intID WHERE strType = 'Household Worker' AND (datDateReported BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.irhw = results;
      return next();
  });
}

// transactions pending
function transpending2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Pending' AND (datDateRequested BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.transpending = results;
      return next();
  });
}
// transactions approved
function transapproved2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Approved' AND (datDateRequested BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.transapproved = results;
      return next();
  });
}
// transactions rejected
function transrejected2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Rejected' AND (datDateRequested BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.transrejected = results;
      return next();
  });
}
// transactions ongoing
function transongoing2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'On-going' AND (datDateRequested BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.transongoing = results;
      return next();
  });
}
// transactions finished
function transfinished2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Finished' AND (datDateRequested BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.transfinished = results;
      return next();
  });
}
// transactions terminated
function transterminated2(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS CNT FROM tbltransaction WHERE strTStatus = 'Terminated' AND (datDateRequested BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`, function (err, results) {
      if (err) return res.send(err);
      req.transterminated = results;
      return next();
  });
}
// -----------------------------------------------------------------QUERIES
// -----------------------------------------------------------CLIENT
function queryclient(req,res,next){
  var db = require('../../lib/database')();
  var resultdates = [{
    date1 : req.body.datefrom,
    date2: req.body.dateto,
    status: req.body.thestatus,
    location: req.body.residence,
    city: req.body.city
  }]
  for(var i = 0; i < resultdates.length; i++){
    resultdates[i].date1 =  moment(resultdates[i].date1).format("LL");
    resultdates[i].date2 =  moment(resultdates[i].date2).format("LL"); 
  }
  req.resultdates = resultdates;
  if(req.body.residence == 'All'){
    db.query(`SELECT * FROM tbluser INNER JOIN tblclient ON intID=intClientID WHERE strStatus='${req.body.thestatus}' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`,function(err,results){
      if(err){
        res.send(err);
      }
      else{
        for(var i = 0; i < results.length; i++){
          results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
        }
        req.theresults=results;
        res.render('admin/views/queries_client',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
      }
    })
  }
  else if(req.body.residence == 'Outside Metro Manila'){
    db.query(`SELECT * FROM tbluser INNER JOIN tblclient ON intID=intClientID WHERE (strStatus='${req.body.thestatus}') AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strCity NOT IN (SELECT strName FROM tblmcity)`,function(err,results){
      if(err){
        res.send(err);
      }
      else{
        for(var i = 0; i < results.length; i++){
          results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
        }
        req.theresults=results;
        res.render('admin/views/queries_client',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
      }
    })
  }
  else if(req.body.residence == 'In Metro Manila'){
    if(req.body.city == 'All'){
      db.query(`SELECT * FROM tbluser INNER JOIN tblclient ON intID=intClientID WHERE (strStatus='${req.body.thestatus}') AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strCity IN (SELECT strName FROM tblmcity)`,function(err,results){
        if(err){
          res.send(err);
        }
        else{
          for(var i = 0; i < results.length; i++){
            results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
          }
          req.theresults=results;
          res.render('admin/views/queries_client',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
        }
      })
    }
    else{
      db.query(`SELECT * FROM tbluser INNER JOIN tblclient ON intID=intClientID WHERE (strStatus='${req.body.thestatus}') AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strCity = '${req.body.city}'`,function(err,results){
        if(err){
          res.send(err);
        }
        else{
          for(var i = 0; i < results.length; i++){
            results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
          }
          req.theresults=results;
          res.render('admin/views/queries_client',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
        }
      })

    }
  }
}
router.post('/queries_client',flog, findmcity, queryclient)

function renderqueriesclient(req,res,next){
  var db = require('../../lib/database')();
  var resultdates = [{
    date1 : 'January 1, 2012',
    date2: 'October 17, 2018',
    status: 'Registered',
    location: 'All',
    city: 'All'
  }]
  req.resultdates = resultdates;
  console.log(resultdates);
  if(req.valid==0)
  db.query(`SELECT * FROM tbluser INNER JOIN tblclient ON intID=intClientID WHERE datDateRegistered BETWEEN '2012-01-01' AND '2018-05-17'`,function(err,results){
    for(var i = 0; i < results.length; i++){
      results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
    }
    req.theresults=results;
    console.log(results);
    res.render('admin/views/queries_client',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
  })
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/queries_client',flog, findmcity, renderqueriesclient);


function renderquerieshw(req,res,next){
  var db = require('../../lib/database')();
  var resultdates = [{
    date1 : 'January 1, 2012',
    date2: 'October 17, 2018',
    status: 'Registered',
    location: 'All',
    city: 'All'
  }]
  req.resultdates = resultdates;
  if(req.valid==0)
  db.query(`SELECT *,TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) as age FROM tbluser INNER JOIN tblhouseholdworker ON intID=intHWID INNER JOIN tblmservice AS tser ON tser.intID = intServiceID 
            WHERE datDateRegistered BETWEEN '2012-01-01' AND '2018-10-17' AND tbluser.strStatus='Registered'`,function(err,results){
    for(var i = 0; i < results.length; i++){
      results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
    }
    req.theresults=results;
    console.log(results);
    res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
  })
  else if(req.valid==1)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}
router.get('/queries_hw',flog, findmcity, renderquerieshw);

function queryhw(req,res,next){
  var db = require('../../lib/database')();
  var resultdates = [{
    date1 : req.body.datefrom,
    date2: req.body.dateto,
    status: req.body.thestatus,
    location: req.body.residence,
    city: req.body.city
  }]
  for(var i = 0; i < resultdates.length; i++){
    resultdates[i].date1 =  moment(resultdates[i].date1).format("LL");
    resultdates[i].date2 =  moment(resultdates[i].date2).format("LL"); 
  }
  req.resultdates = resultdates;
  if(req.body.thestatus =='dawfgsd'){
    if(req.body.residence == 'All'){
      db.query(`SELECT  * FROM tbluser as hw INNER JOIN tblcontract ON hw.intID = intConHWID 
                                INNER JOIN tbltransaction ON intTRequestID = intConTransID
                                INNER JOIN tblhouseholdworker ON intHWID = hw.intID
                                INNER JOIN tblclient as cl ON intClientID = intTClientID
                          WHERE strStatus = 'Deployed' AND (datDateSettled BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`,function(err,results){
        if(err){
          res.send(err);
        }
        else{
          for(var i = 0; i < results.length; i++){
            results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL"); 
          }
          req.theresults=results;
          res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
        }
      })
    }
    else if(req.body.residence == 'Outside Metro Manila'){
      db.query(`SELECT  hw.*, cl.*, t.*  FROM tbluser as hw INNER JOIN tblcontract ON hw.intID = intConHWID 
                                INNER JOIN tbltransaction as t ON intTRequestID = intConTransID
                                INNER JOIN tblhouseholdworker ON intHWID = hw.intID
                                INNER JOIN tblclient as cl ON intClientID = intTClientID
                          WHERE strStatus = 'Deployed' AND (datDateSettled BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND cl.strCity NOT IN (SELECT strName FROM tblmcity)`,function(err,results){
        if(err){
          res.send(err);
        }
        else{
          for(var i = 0; i < results.length; i++){
            results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL"); 
          }
          req.theresults=results;
          res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
        }
      })
    }
    else if(req.body.residence == 'In Metro Manila'){
      if(req.body.city == 'All'){
        db.query(`SELECT  hw.*, cl.*, t.*  FROM tbluser as hw INNER JOIN tblcontract ON hw.intID = intConHWID 
                                                INNER JOIN tbltransaction as t ON intTRequestID = intConTransID
                                                INNER JOIN tblhouseholdworker ON intHWID = hw.intID
                                                INNER JOIN tblclient as cl ON intClientID = intTClientID
                                          WHERE strStatus = 'Deployed' AND (datDateSettled BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND cl.strCity IN (SELECT strName FROM tblmcity)`,function(err,results){
          if(err){
            res.send(err);
          }
          else{
            for(var i = 0; i < results.length; i++){
              results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL"); 
            }
            req.theresults=results;
            res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
          }
        })
      }
      else{
        db.query(`SELECT  hw.*, cl.*, t.*  FROM tbluser as hw INNER JOIN tblcontract ON hw.intID = intConHWID 
                                                INNER JOIN tbltransaction as t ON intTRequestID = intConTransID
                                                INNER JOIN tblhouseholdworker ON intHWID = hw.intID
                                                INNER JOIN tblclient as cl ON intClientID = intTClientID
                                          WHERE strStatus = 'Deployed' AND (datDateSettled BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND cl.strCity = '${req.body.city}'`,function(err,results){
          if(err){
            res.send(err);
          }
          else{
            for(var i = 0; i < results.length; i++){
              results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL"); 
            }
            req.theresults=results;
            res.render('admin/views/queries_client',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
          }
        })
  
      }
    }

  }
  else{
    if(req.body.residence == 'All'){
    db.query(`SELECT *,TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) as age FROM tbluser INNER JOIN tblhouseholdworker ON intID=intHWID INNER JOIN tblmservice AS tser ON tser.intID = intServiceID 
              WHERE tbluser.strStatus='${req.body.thestatus}' AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}')`,function(err,results){
      if(err){
        res.send(err);
      }
      else{
        for(var i = 0; i < results.length; i++){
          results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
        }
        req.theresults=results;
        res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
      }
    })
  }
  else if(req.body.residence == 'Outside Metro Manila'){
    db.query(`SELECT *,TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) as age FROM tbluser INNER JOIN tblhouseholdworker ON intID=intHWID INNER JOIN tblmservice AS tser ON tser.intID = intServiceID 
                      WHERE (tbluser.strStatus='${req.body.thestatus}') AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strCity NOT IN (SELECT strName FROM tblmcity)`,function(err,results){
      if(err){
        res.send(err);
      }
      else{
        for(var i = 0; i < results.length; i++){
          results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
        }
        req.theresults=results;
        res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
      }
    })
  }
  else if(req.body.residence == 'In Metro Manila'){
    if(req.body.city == 'All'){
      db.query(`SELECT *,TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) as age FROM tbluser INNER JOIN tblhouseholdworker ON intID=intHWID INNER JOIN tblmservice AS tser ON tser.intID = intServiceID 
                        WHERE (tbluser.strStatus='${req.body.thestatus}') AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strCity IN (SELECT strName FROM tblmcity)`,function(err,results){
        if(err){
          res.send(err);
        }
        else{
          for(var i = 0; i < results.length; i++){
            results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
          }
          req.theresults=results;
          res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
        }
      })
    }
    else{
      db.query(`SELECT *,TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) as age FROM tbluser INNER JOIN tblhouseholdworker ON intID=intHWID INNER JOIN tblmservice AS tser ON tser.intID = intServiceID 
                        WHERE (strStatus='${req.body.thestatus}') AND (datDateRegistered BETWEEN '${req.body.datefrom}' AND '${req.body.dateto}') AND strCity = '${req.body.city}'`,function(err,results){
        if(err){
          res.send(err);
        }
        else{
          for(var i = 0; i < results.length; i++){
            results[i].datDateRegistered =  moment(results[i].datDateRegistered).format("LL"); 
          }
          req.theresults=results;
          res.render('admin/views/queries_hw',{usertab: req.user, theresultstab: req.theresults, itemtab: req.item, resultdateslist: resultdates});
        }
      })

    }
  }
  }
  
}
router.post('/queries_hw',flog, findmcity, queryhw)

// ---------------------------------------------------------------------Terminate Contract
router.post('/terminatecontract',flog, terminatecontract)
function terminatecontract(req,res,next){
  var db = require('../../lib/database')();
  db.query(`UPDATE tblcontract SET strCurStatus ='Terminated', strConReason=? WHERE intConHWID=? AND intConTransID=?`, [req.body.reason, req.body.hwid, req.body.transid], function(err){
    if (err) res.send(err);
    else{
      db.query(`UPDATE tbluser SET strStatus='Registered' WHERE intID=?`, [req.body.hwid], function(err){
        if (err) res.send(err);
        else{
          db.query(`SELECT COUNT(*) as totalcon FROM tblcontract WHERE intConTransID = ? AND strCurStatus IN('Current', 'On leave')`, [req.body.transid], function(err,result){
            if (err) res.send(err);
            else{
              if(result[0].totalcon == 0){
                db.query(`UPDATE tbltransaction set strTStatus ='Terminated', datDateExpiry=? WHERE intTRequestID=? AND strTStatus='On-going'`, [req.body.thedate, req.body.transid], function(err){
                  if (err) res.send(err);
                  else res.redirect('/admin/transaction_settled_'+req.body.transid);
                })
              }
              else{
                res.redirect('/admin/transaction_settled_'+req.body.transid);
              }
            }
          })
        }
      })
    }
  })
}
// ---------------------------------------------------------------------finish contract
router.post('/finishcontract',flog, finishcontract)
function finishcontract(req,res,next){
  var db = require('../../lib/database')();
  db.query(`UPDATE tbltransaction set strTStatus ='Finished', datDateExpiry=? WHERE intTRequestID=? AND strTStatus='On-going'`, [req.body.thedate, req.body.transid], function(err){
    if (err) res.send(err);
    else{
      db.query(`UPDATE tblcontract set intConReplacementLeft = 0 WHERE intConTransID=? AND strCurStatus IN ('Current', 'Reliever')`, [req.body.transid], function(err){
        if (err) res.send(err);
        else{
          res.redirect('/admin/transaction_settled_'+req.body.transid);
        }
      })
    }
  })
}






//-------------------------------------------Router.get(household request)
var leaveReqFunc = [displayLeaveReq, updateleavestatus]
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
