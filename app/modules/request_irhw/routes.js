var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');

//--------------------------------------------------------------IDMAKE
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvqxyz1234567890";
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

function render(req,res){
    if(req.valid==2)
    res.render('request_irhw/views/index',{usertab: req.user, cctab: req.cc, irtab: req.ir, reportedtab: req.reported});
    else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}

function currentclient(req,res,next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tblcontract INNER JOIN tbltransaction ON intTRequestID = intContransID INNER JOIN tbluser ON intID = intTClientID WHERE intConHWID =? AND strCurStatus = 'Current'`, [req.session.user], function(err,results){
        console.log(err);
        req.cc = results;
        return next();
    })
}
function findreportedclient(req, res, next){
    var db = require('../../lib/database')();
    db.query(`SELECT *, u.intID AS RecipientID, u.strFName AS RFName, u.strLName AS RLName, strName FROM tbluser As a INNER JOIN tblreport ON intID = intReporterID  INNER JOIN tbluser AS u ON u.intID = intRecipentID INNER JOIN tblmincidentreport as i ON i.intID = intTypeofReport WHERE intReporterID = ? AND strReportStatus NOT IN ('Hide')`,[req.session.user], function(err, results){
        console.log(err)
        req.reported = results;
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


// ----------------------------- submit report
router.post('/ir_hw', flog, reporthw)
function reporthw(req, res){
    var db = require('../../lib/database')()
    var randomId= makeid();
    jpeg= "["+req.body.daterep+"]"+"-"+req.body.recipentid+"-"+req.session.user+('-'+randomId+'.jpg');
    req.files.postimage.mv('public/image/reports/'+jpeg, function(err) {
      db.query(`INSERT INTO tblreport (intReporterID, intRecipentID, intTypeofReport, strReason, strValidity, datDateReported, strReportStatus, strActionTaken, strEviPic)  VALUES(?,?,?,?,'',?,'','', ?)`,[req.session.user, req.body.recipentid, req.body.ir, req.body.reason, req.body.daterep, jpeg], function(err){
          console.log(err);
        //   res.send('success')
          res.redirect('/request_irhw')
      })
    console.log(err)
  });
}
router.post('/cancelremove', flog, cancelremove)
function cancelremove(req, res){
    var db = require('../../lib/database')()
    if(req.body.btn=='cancel')
    db.query(`DELETE FROM tblreport WHERE intReportID = ?`,[req.body.id], function(err){
        console.log(err);
        res.redirect('/request_irhw')
    })
    else{
      db.query(`Update tblreport SET strReportStatus = 'Resolved (hid by household worker)' WHERE intReportID = ?`,[req.body.id], function(err){
        console.log(err);
        res.redirect('/request_irhw')
    })
    }
}

router.get('/', flog, currentclient, findreportedclient, findincidentreport, render);

exports.request_irhw= router;
