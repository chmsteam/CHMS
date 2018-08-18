var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();

function render(req,res){
    if(req.valid==1)
      res.render('home/views/index',{usertab: req.user});
    else if(req.valid==0)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }
router.get('/', flog, render);
//-------------------------------------------------------------------------REQUEST LEAVE
function renderrequestleave(req,res){
  if(req.valid==1)
    res.render('home/views/request_leave',{usertab: req.user});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/request_leave', flog, renderrequestleave);


//-------------------------------------------------------------------------HOUSHOLD WORKER LIST
function renderhwlist(req,res){
  if(req.valid==1)
    res.render('home/views/householdworker_list',{usertab: req.user});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/householdworker_list', flog, renderhwlist);






function smp(req,res){
    res.render('home/views/smp');
}
router.get('/smp', smp);
exports.home_client= router;

                      