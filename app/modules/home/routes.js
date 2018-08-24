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
          leaveReq: req.displayLeaveReq
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
  db.query('SELECT * FROM tblleaverequest AS tl INNER JOIN tbluser AS ts ON tl.intHouseholdID = ts.intID INNER JOIN tblmleave AS lt ON tl.intTypeOfLeave = lt.intID WHERE intClientID = ? AND strLeaveStatus = "For Client Approval"', [req.session.user], function (err, results, fields) {
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
        db.query("UPDATE tblleaverequest SET strLeaveStatus = 'On-going' WHERE intLeaveRequestID= ? ",
          [req.body.id], (err, results, fields)=>{
            if (err) console.log(err);
          res.redirect('/home_client')
          });
      }
})

//------------------------------------------------------- ROUTER GET
var renderFunctions = [displayLeaveReq, ]
router.get('/', flog, renderFunctions, render);
router.get('/request_leave', flog, renderFunctions, renderrequestleave);
router.get('/householdworker_list', flog, renderFunctions, renderhwlist);


function smp(req,res){
    res.render('home/views/smp');
}
router.get('/smp', smp);
exports.home_client= router;

                      