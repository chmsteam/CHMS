var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();


function render(req,res){
  if(req.valid==2)
    res.render('request_replacement_hw/views/index',{usertab: req.user, myclienttab: req.myclient, myclientreplacetab: req.myclientreplace});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclient(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblcontract INNER JOIN tbltransaction on intConTransID = intTRequestID INNER JOIN tbluser ON
            intID = intTClientID WHERE intConHWID =? AND strCurStatus ='Current'`, [req.session.user], function (err, results) {
  if (err) return res.send(err);
  if (!results[0])
  console.log('');
  req.myclient = results;
  return next();
}); 
}

function findclientreplace(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblcontract INNER JOIN tbltransaction on intConTransID = intTRequestID INNER JOIN tbluser ON 
          intID = intTClientID  INNER JOIN tblreplacement ON intReplaceOldHWID = intConHWID INNER JOIN tblfinalrequest ON intRequestID = intReplaceReqID WHERE intConHWID =? AND strCurStatus ='Current'`, [req.session.user], function (err, results) {
  if (err) return res.send(err);
  if (!results[0])
  console.log('');
  req.myclientreplace = results;
  return next();
}); 
}

router.post('/replace', flog, createreplacement)
function createreplacement(req,res){
  var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblfinalrequest (intRequest_ClientID, strRequestType,strRequestName, strRequestDesc, datRequestDate, strRequestStatus, datRequestNeedDate)  VALUES (?, 'Replace Client', '${retVal}',"${req.body.reqdesc}", "${req.body.reqdate}", "", "${req.body.dateneed}")`, [req.body.id],  function(err) {
    console.log(err)
    db.query(`SELECT intRequestID FROM tblfinalrequest WHERE strRequestName = '${retVal}' AND intRequest_ClientID = '${req.body.id}'`, function(err, results) {
      console.log(results[0].intRequestID)
      db.query(`INSERT INTO tblreplacement VALUES ("${results[0].intRequestID}", "${req.body.hwid}", NULL)`, function(err) {
        console.log(err)
        // db.query(`UPDATE tblcontract SET strCurStatus = 'To be replaced' WHERE intConHWID =${req.body.hwid}`, function(err) {
          console.log(err)
          res.send('success');
            // res.redirect('/request_replacement_hw',flog, render);
            // res.redirect('/request_replacement')
        // });
      });
    });
  });
}


router.get('/', flog, findclient, findclientreplace, render);

exports.request_replacement_hw= router;