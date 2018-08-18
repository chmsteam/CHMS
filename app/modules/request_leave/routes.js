var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();

function render(req,res){
    if(req.valid==2)
      res.render('request_leave/views/index',{usertab: req.user});
    else if(req.valid==0)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }
router.get('/', flog, render);

exports.request_leave= router;
