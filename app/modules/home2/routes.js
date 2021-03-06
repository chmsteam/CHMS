var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment')

router.get('/', flog, findjoboffers, noofincomingrequests, countcontract, findcontract, ircount, render);
function render(req,res){
    if(req.valid==2)
      res.render('home2/views/index',{usertab: req.user, offertab: req.offer, irtab: req.ir, conttab: req.cont, counttab: req.count, ircounttab: req.ircount});
    else if(req.valid==0)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }
function noofincomingrequests(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) AS NoIR from tblresults WHERE intRHWID = ${req.session.user}`, function(err,results){
    if (err) return res.send(err);
    console.log(''+req.session.user);
    req.ir = results;
    return next();
  })
}
function findjoboffers(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM (SELECT * FROM tblresults AS a 
              INNER JOIN tblfinalRequest AS b ON a.intRRequestID = b.intRequestID 
              INNER JOIN tblclient AS c ON b.intRequest_ClientID = c.intClientID 
              INNER JOIN tbluser AS d ON d.intID = c.intClientID WHERE intRHWID = ? AND (strRHWStatus IN ('Waiting','Approved','Rejected'))) as ta 
              INNER JOIN tblinitialrequest as tb 
              INNER JOIN tblmservice AS tm ON tb.intITypeOfService = tm.intID
              WHERE ta.intRRequestID = tb.intIRequestID AND ta.intRRequest_No = tb.intIRequest_No`,[req.session.user], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log(''+req.params.userid);
    req.offer= results;
    console.log(req.offer)
    for(var i = 0; i < req.offer.length; i++){
     req.offer[i].datRequestNeedDate =  moment(results[i].datRequestNeedDate).format("LL");
    }
    return next();
  });
}
function findcontract(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblcontract INNER JOIN tbltransaction ON intTRequestID = intConTransID WHERE intConHWID=? AND strConStatus IN ('Waiting', 'Rejected', 'Approved') AND strCurStatus IN ('')`,[req.session.user], function (err, results) {
      console.log(''+req.params.userid);
      req.cont= results;
      return next();
  });
}
function countcontract(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) as numero FROM tblcontract WHERE intConHWID=? AND strConStatus IN ('Waiting', 'Rejected', 'Approved') AND strCurStatus IN ('') `,[req.session.user], function (err, results) {
      console.log(''+req.params.userid);
      req.count= results;
      return next();
  });
}
// -----------------------------------------------------------------Count Incoming Request
function ircount(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) as ircount FROM (SELECT * FROM tblresults AS a 
    INNER JOIN tblfinalRequest AS b ON a.intRRequestID = b.intRequestID 
    INNER JOIN tblclient AS c ON b.intRequest_ClientID = c.intClientID 
    INNER JOIN tbluser AS d ON d.intID = c.intClientID WHERE intRHWID = ? AND (strRHWStatus IN ('Waiting','Approved','Rejected'))) as ta 
    INNER JOIN tblinitialrequest as tb 
    INNER JOIN tblmservice AS tm ON tb.intITypeOfService = tm.intID
    WHERE ta.intRRequestID = tb.intIRequestID AND ta.intRRequest_No = tb.intIRequest_No`, [req.session.user], function(err,results){
      if (err) res.send(err);
      else{
        req.ircount=results;
        console.log('ircount= '+results[0].ircount)
        return next();
      }
    })
}
// -----------------------------------------------------------------JOB OFFER DECISION
function offerdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'accept'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Approved' WHERE  intRRequestID = '${req.body.transID}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.session.user}'`,function (err) {
      console.log(''+err);
      db.query(`UPDATE tblresults SET strRHWStatus='Rejected' WHERE strRHWStatus NOT IN ('Approved', 'Rejected') AND intRHWID = '${req.session.user}'`,function (err) {
        console.log(''+err);
        res.send('accepted');
        // res.redirect('/home_householdworker', flog, findjoboffers, noofincomingrequests, countcontract, findcontract, render);
      })
    })
  }
  else if(req.body.btn1 == 'reject'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Rejected' WHERE intRRequestID = '${req.body.transID}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.session.user}'`,function (err) {
      console.log(''+err);
      res.redirect('/home_householdworker', flog, findjoboffers,noofincomingrequests, countcontract, findcontract, render);
    })
  }
}
router.post('/job_offer', flog, offerdecision)
// -------------------------------------------------------------------------------------CONTRACT DECISION
router.post('/contract_decision', flog, contractdecision)
function contractdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'accept'){
    db.query(`UPDATE tblcontract SET strConStatus='Approved' WHERE intConHWID = '${req.session.user}' and intConTransID = '${req.body.transid}'`,function (err) {
      console.log(err)
      res.redirect('/home_householdworker');
    })
  }
  else if(req.body.btn1 == 'reject'){
    db.query(`UPDATE tblcontract SET strConStatus='Rejected' WHERE intConHWID = '${req.session.user}' and intConTransID = '${req.body.transid}'`,function (err) {
      console.log(''+err);
      res.redirect('/home_householdworker');
    })
  }
}

exports.home_householdworker= router;

                      