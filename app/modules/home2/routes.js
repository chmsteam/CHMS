var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment')

router.get('/', flog, findjoboffers, noofincomingrequests, countcontract, findcontract, render);
function render(req,res){
    if(req.valid==2)
      res.render('home2/views/index',{usertab: req.user, offertab: req.offer, irtab: req.ir, conttab: req.cont, counttab: req.count});
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
              INNER JOIN tbluser AS d ON d.intID = c.intClientID WHERE intRHWID = ? AND (strRHWStatus IN ('Waiting','Approved'))) as ta 
              INNER JOIN tblinitialrequest as tb 
              WHERE ta.intRRequestID = tb.intIRequestID AND ta.intRRequest_No = tb.intIRequest_No`,[req.session.user], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log(''+req.params.userid);
    req.offer= results;
    for(var i = 0; i < req.offer.length; i++){
     req.offer[i].datRequestNeedDate =  moment(results[i].datRequestNeedDate).format("LL");
    }
    return next();
  });
}
function findcontract(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblcontract WHERE intConHWID=? AND strConStatus='Waiting'`,[req.session.user], function (err, results) {
      console.log(''+req.params.userid);
      req.cont= results;
      return next();
  });
}
function countcontract(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) as numero FROM tblcontract WHERE intConHWID=? AND strConStatus='Waiting'`,[req.session.user], function (err, results) {
      console.log(''+req.params.userid);
      req.count= results;
      return next();
  });
}
// -----------------------------------------------------------------JOB OFFER DECISION
function offerdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'accept'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Approved' WHERE strRHWStatus='Waiting' AND intRRequestID = '${req.body.transID}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.session.user}'`,function (err) {
      console.log(''+err);
      db.query(`UPDATE tblresults SET strRHWStatus='Rejected' WHERE strRHWStatus NOT IN ('Approved') AND intRHWID = '${req.session.user}'`,function (err) {
        console.log(''+err);
        res.redirect('/home_householdworker', flog, findjoboffers, noofincomingrequests, countcontract, findcontract, render);
      })
    })
  }
  else if(req.body.btn1 == 'reject'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Rejected' WHERE strRHWStatus='Waiting' AND intRRequestID = '${req.body.transID}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.session.user}'`,function (err) {
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
      res.redirect('/home_householdworker', flog, findjoboffers, noofincomingrequests, countcontract, findcontract, render);
    })
  }
  // else if(req.body.btn1 == 'reject'){
  //   db.query(`UPDATE tblresults SET strRHWStatus= 'Rejected' WHERE strRHWStatus='Waiting' AND intRRequestID = '${req.body.transID}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.session.user}'`,function (err) {
  //     console.log(''+err);
  //     res.redirect('/home_householdworker', flog, findjoboffers, noofincomingrequests, countcontract, findcontract, render);
  //   })
  // }
}

exports.home_householdworker= router;

                      