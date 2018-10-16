var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');

//------------------------------RENDERING PAGES
function render(req,res){
    if(req.valid==1)
      res.render('home/views/index',
        {
          usertab: req.user,
          leaveReq: req.displayLeaveReq,
          replacetab: req.replace,
          finreqtab: req.finreq,
          requesttab: req.request,
          request2tab: req.request2,
          myreqtab: req.myreq,
          totalirtab: req.totalir,
          historytab: req.history,
          totalirtab: req.totalir
        });
    else if(req.valid==0)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }
//-----------------Leave Page
function renderrequestleave(req,res){
  if(req.valid==1)
    res.render('home/views/request_leave',{usertab: req.user});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
//---------------------------------------------------------------------
//function display hhw Leave request
function displayLeaveReq(req, res, next){
  var db = require('../../lib/database')();
  db.query('SELECT * FROM tblleaverequest AS tl INNER JOIN tbluser AS ts ON tl.intHouseholdID = ts.intID INNER JOIN tblmleave AS lt ON tl.intTypeOfLeave = lt.intID WHERE intClientID = ? AND strLeaveStatus IN ("For Client Approval", "On-going", "Approved")', [req.session.user], function (err, results, fields) {
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
  //accept leave request
  router.post('/', (req, res) =>{
    var db = require('../../lib/database')();
    var relie = req.body.reliever;
    if(relie === "No"){
      db.query("UPDATE tblleaverequest SET strLeaveStatus = 'Approved', strReliever='No' WHERE intLeaveRequestID= ? ",
      [req.body.id], (err, results, fields)=>{
        if (err) console.log(err);
        res.redirect('/home_client')
      });
    }
    else{
      db.query("UPDATE tblleaverequest SET strLeaveStatus = 'On-going', strReliever='Yes' WHERE intLeaveRequestID= ? ",[req.body.id], (err)=>{
        if (err) console.log(err);  
      });
      db.query(`UPDATE tblfinalrequest SET strRequestStatus = 'On process' WHERE intRequestID = ?`, [req.body.id], function(err){
        console.log(err);
      })
      res.redirect('/request_reliever/reliever_list_/-/'+req.body.id+'/-/'+req.body.hwid)  
    }
  })
  
  // function display finished Request
  function findfinishedreq(req,res,next){
    var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfinalrequest WHERE strRequestStatus IN ('Finished', 'Rejected', 'Cancelled') AND intRequest_ClientID = ?`, [req.session.user], function(err,results){
    console.log(err);
    for(var i = 0; i < results.length; i++){
      results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
    }
    req.finreq = results;
    return next();
  })
}

// My request tab ADD
function myrequest(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfinalrequest WHERE intRequest_ClientID = ?`, [req.session.user], function(err, results){
    console.log(err);
    for(var i = 0; i < results.length; i++){
      results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
    }
    req.request = results;
    return next();
  })
}
function myrequest2(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfinalrequest INNER JOIN tblreplacement ON intRequestID=intReplaceReqID WHERE intRequest_ClientID = ?`, [req.session.user], function(err, results){
    console.log(err);
    for(var i = 0; i < results.length; i++){
     results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
    }
    req.request2 = results;
    return next();
  })
}


//-----------------hhwList
function myhw(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblcontract INNER JOIN tbluser AS u ON intConHWID = u.intID INNER JOIN tblhouseholdworker ON intHWID = u.intID INNER JOIN
  tblmservice s ON s.intID = intServiceID INNER JOIN tblfinalrequest ON intRequestID = intConTransID WHERE intRequest_ClientID = ?`, [req.session.user], function (err,results){
    console.log(err);
    req.myhw = results;
    return next();
  })
}
function renderhwlist(req,res){
  if(req.valid==1)
    res.render('home/views/householdworker_list',{usertab: req.user, myhwtab: req.myhw});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/householdworker_list', flog, myhw, renderhwlist);

function countmyrequest(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS myrequest FROM tblfinalrequest WHERE intRequest_ClientID=? AND strRequestStatus IN ('Draft', 'On process', 'Pending') AND strRequestType NOT IN('Replace Client')`, [req.session.user], function(err,results){
    console.log(err);
    req.myreq=results;
    return next();
  })
}
function counthistory(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS history FROM tblfinalrequest WHERE intRequest_ClientID=? AND strRequestStatus IN ('Finished', 'Rejected', 'Cancelled')`, [req.session.user], function(err,results){
    console.log(err);
    req.history=results;
    return next();
  })
}
function countirequest(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT count(*) as totallr FROM tblleaverequest AS tl INNER JOIN tbluser AS ts ON tl.intHouseholdID = ts.intID INNER JOIN tblmleave AS lt ON tl.intTypeOfLeave = lt.intID WHERE intClientID = ? AND strLeaveStatus IN ("For Client Approval", "On-going", "Approved")`,[req.session.user], function(err,results){
    if (err){
      console.log(err)
    }
    else{
      req.totallr = results;
      console.log('total leave req:'+ results[0].totallr)
      db.query(`SELECT count(*) as totalrep, u.intID AS clientid, u.strFName AS clientfname, u.strLName AS clientlname, uu.intID AS hwid, uu.strFName AS hwfname, uu.strLName AS hwlname 
      FROM tblfinalrequest INNER JOIN tbluser as u on u.intID = intRequest_ClientID INNER JOIN tblreplacement ON intReplaceReqID = intRequestID INNER JOIN tbluser AS uu ON uu.intID = intReplaceOldHWID
      WHERE strRequestType='Replace Client' AND intRequest_ClientID=?`,[req.session.user], function(err,results2){
        if (err){
          console.log(err)
        }
        else{
          req.totalrep = results2;
          var totalir = [{
            totalir:  results[0].totallr + results2[0].totalrep
          }]
          req.totalir = totalir;
          console.log('total rep ='+ results2[0].totalrep);
          console.log('total IR: '+ req.totalir);
          return next();
        }
      })

    }
  })
}

//------------------------------------------------------- ROUTER GET
var renderFunctions = [displayLeaveReq, ]
router.get('/', flog, findreplacementofclient,findfinishedreq, myrequest, myrequest2, renderFunctions, countmyrequest, countirequest, counthistory, render);
router.get('/request_leave', flog, renderFunctions, renderrequestleave);


// -----------function display hhw replacement of client request
function findreplacementofclient(req,res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT *, u.intID AS clientid, u.strFName AS clientfname, u.strLName AS clientlname, uu.intID AS hwid, uu.strFName AS hwfname, uu.strLName AS hwlname 
  FROM tblfinalrequest INNER JOIN tbluser as u on u.intID = intRequest_ClientID INNER JOIN tblreplacement ON intReplaceReqID = intRequestID INNER JOIN tbluser AS uu ON uu.intID = intReplaceOldHWID
  WHERE strRequestType='Replace Client' AND intRequest_ClientID=? `,[req.session.user], function(err,results) {
    console.log(err)
    req.replace = results;
    return next();
  });
}
// ------------------------------------------------------------------------------- HW PROFILE
router.get('/hw_profile_:hwid', flog, findhw, findhweduc, findhwwork,findhwreports, renderhwprofile)
function renderhwprofile(req,res){
  if(req.valid==1)
    res.render('home/views/hw_profile',{usertab: req.user, hw1tab: req.hw1, hw2tab: req.hw2, hw3tab: req.hw3, hw5tab: req.hw5});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
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
function findhw(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser INNER JOIN tblhouseholdworker on intID = intHWID INNER JOIN tblmservice AS a ON intServiceID=a.intID WHERE tbluser.intID =?",[req.params.hwid], function (err, results) {
    console.log(''+req.params.hwid);
    if (err) return res.send(err);
    if (!results[0])
    console.log('???'+req.params.userid);
    for(var i = 0; i < results.length; i++){
      results[i].datBirthDay =  moment(results[i].datBirthDay).format("LL");   
    }
    req.hw1 = results;
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

// ---------------------------------------------------------------------------Client Profile
router.get('/profile',flog, findclient, renderprofile)
function renderprofile(req,res){
  if(req.valid==1)
    res.render('home/views/profile',{usertab: req.user, clienttab: req.client});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclient(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,CONCAT(strLName,', ', strFName) AS strName FROM tbluser INNER JOIN tblclient ON intID = intClientID WHERE intID=?",[req.session.user], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.client = results;
    return next();
  });
}









function smp(req,res){
    res.render('home/views/smp');
}
router.get('/smp', smp);

exports.home_client= router;

                      