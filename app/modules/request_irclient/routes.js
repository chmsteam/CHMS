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
//-------------------------------------------------------------rendering pages
function renderhwprofile(req,res, next){
  if(req.valid==1)
    res.render('request_irclient/views/ownhouseholdwProfile',
            {
                usertab: req.user,
                hw1tab: req.hw1, hw2tab: req.hw2, 
                hw3tab: req.hw3
            });
    else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
  }
// -------------------------------------------------- INDEX PAGE
var renderFunctions =[
                        findcurrenthw, findincidentreport, findreportedhws, displayIncidentRep, //tanble report
                        findhw, findhweduc, findhwwork, //render Profile
                     ]
router.get('/', flog, renderFunctions, renderirclient)
function renderirclient(req,res){
    if(req.valid==1)
    res.render('request_irclient/views/index',
        {usertab: req.user, currenthwtab: req.currenthw, 
            irtab: req.ir, reportedtab: req.reported,
            reports: req.displayIncidentRep});
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
    db.query(`SELECT *, u.intID AS RecipientID, u.strFName AS RFName, u.strLName AS RLName, strName FROM tbluser As a INNER JOIN tblreport ON intID = intReporterID  INNER JOIN tbluser AS u ON u.intID = intRecipentID INNER JOIN tblmincidentreport as i ON i.intID = intTypeofReport WHERE intReporterID = ? AND strReportStatus NOT IN ('Hide')`,[req.session.user], function(err, results){
        console.log(err)
        req.reported = results;
        return next();
    })
}
//display report incident
function displayIncidentRep(req, res, next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tblreport r INNER JOIN tbluser u ON r.intRecipentID = u.intID 
                INNER JOIN tblmincidentreport i ON i.intID = r.intTypeofReport 
                INNER JOIN tblhouseholdworker thw ON thw.intHWID
                INNER JOIN tblmservice ts ON thw.intServiceID = ts.intID
                WHERE intReporterID = ?`,[req.session.user], function(err, results){
        console.log(err)
        req.displayIncidentRep = results;
        console.log(req.session.user)
        console.log(req.displayIncidentRep)
        return next();
    })
}
//render Profile
function findhw(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *, TIMESTAMPDIFF(YEAR, datBirthDay,CURDATE()) as age FROM tbluser INNER JOIN tblhouseholdworker on intID = intHWID INNER JOIN tblmservice AS a ON intServiceID=a.intID WHERE tbluser.intID =?",[req.params.hwOwnID], function (err, results) {
    console.log(''+req.params.hwid);
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw1 = results;
    for(var i = 0; i < req.hw1.length; i++){
        req.hw1[i].datBirthDay =  moment(results[i].datBirthDay).format("LL");
      }
    return next();
  });
}

function findhweduc(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblhw_educbg WHERE intHWID_educbg = ? ",[req.params.hwOwnID], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw2 = results;
    return next();
  });
}
function findhwwork(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblhw_workbg WHERE intHWID_workbg = ? ",[req.params.hwOwnID], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw3 = results;
    return next();
  });
}

// ----------------------------------------------- submit report 
router.post('/ir_client', flog, reporthw)
function reporthw(req, res){
    var db = require('../../lib/database')()
    var randomId= makeid();
    jpeg= "["+req.body.daterep+"]"+"-"+req.body.recipentid+"-"+req.session.user+('-'+randomId+'.jpg');
    req.files.postimage.mv('public/image/reports/'+jpeg, function(err) {
      db.query(`INSERT INTO tblreport (intReporterID, intRecipentID, intTypeofReport, strReason, strValidity, datDateReported, strReportStatus, strActionTaken, strEviPic)  VALUES(?,?,?,?,'',?,'','', ?)`,[req.session.user, req.body.recipentid, req.body.ir, req.body.reason, req.body.daterep, jpeg], function(err){
          console.log(err);
          res.send('success')
          // res.redirect('/request_irclient')
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
        res.redirect('/request_irclient')
    })
    else{
      db.query(`Update tblreport SET strReportStatus = 'Resolved (hid by client)' WHERE intReportID = ?`,[req.body.id], function(err){
        console.log(err);
        res.redirect('/request_irclient')
    })
    }
}
//-------------------------------------------------------------ROUTER GET
router.get('/profile_hw_:hwOwnID', flog, renderFunctions, renderhwprofile);


exports.request_irclient= router;