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
