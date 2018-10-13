var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();

function render(req,res){
    if(req.valid==2)
      res.render('request_leave/views/index',{usertab: req.user, leavetab: req.leave, clientko: req.myclient});
    else if(req.valid==0)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }
// -----------------------------------------------------------------------------------------------

function findtypeofleave(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblmleave WHERE strStatus = 'Active'`, function(err, results){
    console.log(err);
    req.leave=results;
    return next();
  })
}
function client(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblcontract INNER JOIN tbltransaction on intConTransID = intTRequestID INNER JOIN tbluser ON
            intID = intTClientID WHERE intConHWID =? AND strCurStatus ='Current'`, [req.session.user], function (err, results) {
  if (err) return res.send(err);
  req.myclient = results;
  return next();
}); 
}
//request leave
router.post('/', validate, createleave);

function validate(req, res, next){
  var db = require('../../lib/database')();
    db.query("SELECT COUNT(*) AS ss FROM tblcontract WHERE intConHWID = ? AND strCurStatus = 'Current' ",[req.session.user], (err, results, fields)=>{
      console.log(err)
        if(results[0].ss == 0){
          res.send('wala client');
          // res.redirect('/request_leave?noCurrentClient') 
        }
        else
          return next();
    })
}
function createleave(req,res){
  var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  var db = require('../../lib/database')();
    db.query("SELECT intTClientID FROM tblcontract AS tc INNER JOIN tbltransaction AS tt  WHERE intConHWID = ? AND strCurStatus = 'Current' ",[req.session.user], (err, results, fields)=>{
      console.log(err)
      clID = results[0].intTClientID 
        db.query(`INSERT INTO tblfinalrequest (intRequest_ClientID, strRequestType,strRequestName, strRequestDesc, datRequestDate, strRequestStatus, datRequestNeedDate)  VALUES (?, 'Reliever', '${retVal}',"", ?, "Draft", ?)`, [clID, req.body.started, req.body.started],  function(err) {
          console.log(err)
          db.query(`SELECT * FROM tblfinalrequest WHERE strRequestName = '${retVal}' AND intRequest_ClientID = ?`,[clID], function(err, results2) {
            console.log(err)
            db.query("INSERT INTO tblleaverequest (intLeaveRequestID, intHouseholdID, intClientID, datDateCreated,  intTypeOfLeave,  strAddressOnLeave, strReason,  datDateFrom, datDateTo, strLeaveStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,'For Client Approval') ", [results2[0].intRequestID, req.session.user, clID, req.body.created, req.body.type, req.body.addLeave, req.body.reason, req.body.started, req.body.end], (err, results, fields)=>{
              if (err) console.log(err);
              db.query(`INSERT INTO tblreliever (intReq_RelID, intTobeRelievedID) VALUES (?,?)`, [results2[0].intRequestID, req.session.user], function(err){
                console.log(err)
              db.query(`SELECT * FROM tblhouseholdworker WHERE intHWID = ?`,[req.session.user], function(err, results3) {
                console.log(err)
                db.query(`INSERT INTO tblinitialrequest VALUES (?,'1', ?, '1', '18', '65', 'Any', 'Elementary', '0', '0')`, [results2[0].intRequestID, results3[0].intServiceID], function(err){
                  console.log(err)
                  res.send('success');
                  // res.redirect('/request_leave')
                })
              })
              })
            });
          }); 
        })
    })
}
// function findcurrentclient(req,res,next){
//   var db = require('../../lib/database')();
//   db.query(`SELECT * FROM tblcontract`, function(err, results){
//     console.log(err);
//     req.leave=results;
//     return next();
//   })
// }
// ----------------------------------------------------------------------------------------------- 


router.get('/', flog, findtypeofleave,client, render);
// -----------------------------------------------------------------------------------------------

exports.request_leave= router;
