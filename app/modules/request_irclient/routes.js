var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');

// -------------------------------------------------- INDEX PAGE
router.get('/', flog, findcurrenthw,findincidentreport, findreportedhws, renderirclient)
function renderirclient(req,res){
    if(req.valid==1)
    res.render('request_irclient/views/index',{usertab: req.user, currenthwtab: req.currenthw, irtab: req.ir, reportedtab: req.reported});
    else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
  }

function findcurrenthw(req,res,next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tblcontract INNER JOIN tblhouseholdworker ON intConHWID = intHWID INNER JOIN tblmservice ON tblmservice.intID = intServiceID INNER JOIN tbltransaction ON intTRequestID = intConTransID INNER JOIN tbluser ON tbluser.intID = intHWID
             WHERE strCurStatus IN ('Current') AND intTClientID = '${req.session.user}'`, function(err,results){
        console.log(err);
        req.currenthw = results;
        return next();
    })
}
function findincidentreport(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblmincidentreport`, function(err,results){
      console.log(err);
      req.ir = results;
      return next();
  })
}
function findreportedhws(req, res, next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tblreport WHERE intReporterID = ? AND strReportStatus NOT IN ('Hide')`,[req.session.user], function(err, results){
        console.log(err)
        req.reported = results;
        return next();
    })
}
// ----------------------------------------------- submit report 
router.post('/ir_client', flog, reporthw)
function reporthw(req, res){
    var db = require('../../lib/database')()
    db.query(`INSERT INTO tblreport (intReporterID, intRecipentID, intTypeofReport, strReason, strValidity, datDateReported, strReportStatus, strActionTaken)  VALUES(?,?,?,?,'',?,'','')`,[req.session.user, req.body.recipentid, req.body.ir, req.body.reason, req.body.daterep], function(err){
        console.log(err);
        res.redirect('/request_irclient')
    })
}

exports.request_irclient= router;