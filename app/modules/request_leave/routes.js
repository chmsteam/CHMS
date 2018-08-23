var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();

function render(req,res){
    if(req.valid==2)
      res.render('request_leave/views/index',{usertab: req.user, leavetab: req.leave});
    else if(req.valid==0)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }
// -----------------------------------------------------------------------------------------------

function findtypeofleave(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblmleave`, function(err, results){
    console.log(err);
    req.leave=results;
    return next();
  })
}
//request leave
router.post('/', (req, res) =>{
  var db = require('../../lib/database')();
    db.query("SELECT intTClientID FROM tblcontract AS tc INNER JOIN tbltransaction AS tt  WHERE intConHWID = ? AND strCurStatus = 'Current' ",[req.session.user], (err, results, fields)=>{
      console.log(err)
      clID = results[0].intTClientID 
      db.query("SELECT COUNT(*) AS ss FROM tblcontract WHERE intConHWID = ? AND strCurStatus = 'Current' ",[req.session.user], (err, results, fields)=>{
          console.log(err)
            if(results[0].ss == 0){
              res.redirect('/request_leave?noCurrentClient') 
            }
            else{
              db.query("INSERT INTO tblleaverequest ( intHouseholdID, intClientID, datDateCreated,  intTypeOfLeave,  strAddressOnLeave, strReason,  datDateFrom, datDateTo, strLeaveStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?,'Pending') ",
                [ req.session.user, clID, req.body.created, req.body.type, req.body.addLeave, req.body.reason, req.body.started, req.body.end], (err, results, fields)=>{
                  if (err) console.log(err);
                res.redirect('/request_leave')
                });
              }
          })
      })
});
// function findcurrentclient(req,res,next){
//   var db = require('../../lib/database')();
//   db.query(`SELECT * FROM tblcontract`, function(err, results){
//     console.log(err);
//     req.leave=results;
//     return next();
//   })
// }
// ----------------------------------------------------------------------------------------------- 


router.get('/', flog, findtypeofleave, render);
// -----------------------------------------------------------------------------------------------

exports.request_leave= router;
