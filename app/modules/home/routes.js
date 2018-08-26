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
          request2tab: req.request2
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
//-----------------hhwList
function renderhwlist(req,res){
  if(req.valid==1)
    res.render('home/views/householdworker_list',{usertab: req.user});
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
        db.query("UPDATE tblleaverequest SET strLeaveStatus = 'Approved' WHERE intLeaveRequestID= ? ",
          [req.body.id], (err, results, fields)=>{
            if (err) console.log(err);
          res.redirect('/home_client')
          });
      }
      else{
          var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
          for (var i = 0, n = charset.length; i < length; ++i) {
              retVal += charset.charAt(Math.floor(Math.random() * n));
          }
          db.query("UPDATE tblleaverequest SET strLeaveStatus = 'On-going' WHERE intLeaveRequestID= ? ",[req.body.id], (err)=>{
            if (err) console.log(err);
            // db.query(`INSERT INTO tblfinalrequest (intRequest_ClientID, strRequestType,strRequestName, strRequestDesc, datRequestDate, strRequestStatus, datRequestNeedDate)  VALUES ("${req.session.user}", 'Reliever', '${retVal}','Send a Reliever', "${req.body.reqdate}", "Draft", "${req.body.dateneed}")`, function(err) {
              // console.log(err);
              res.redirect('/home_client')
            // });
          });
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


//------------------------------------------------------- ROUTER GET
var renderFunctions = [displayLeaveReq, ]
router.get('/', flog, findreplacementofclient,findfinishedreq, myrequest, myrequest2, renderFunctions, render);
router.get('/request_leave', flog, renderFunctions, renderrequestleave);
router.get('/householdworker_list', flog, renderFunctions, renderhwlist);

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

function smp(req,res){
    res.render('home/views/smp');
}
router.get('/smp', smp);

exports.home_client= router;

                      