var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');

router.get('/', flog, findcurrenthw, renderreplacement)
function renderreplacement(req,res){
    if(req.valid==1)
    res.render('request_replacement_client/views/index',{usertab: req.user, currenthwtab: req.currenthw});
    else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
  }

function findcurrenthw(req,res,next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tblcontract INNER JOIN tblhouseholdworker ON intConHWID = intHWID INNER JOIN tblmservice ON tblmservice.intID = intServiceID INNER JOIN tbltransaction ON intTRequestID = intConTransID INNER JOIN tbluser ON tbluser.intID = intHWID
             WHERE strCurStatus='Current' AND intTClientID = '${req.session.user}'`, function(err,results){
        console.log(err);
        req.currenthw = results;
        return next();
    })
}

exports.request_replacement= router;