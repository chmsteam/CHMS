var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();

router.get('/', flog, findjoboffers, noofincomingrequests,  render);
function render(req,res){
    if(req.valid==2)
      res.render('home2/views/index',{usertab: req.user, offertab: req.offer, irtab: req.ir});
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
  db.query(`SELECT intRRequestID, intRRequest_No, strRequestDesc, strRHWStatus, c.*, d.* FROM tblresults AS a INNER JOIN tblfinalRequest AS b ON a.intRRequestID = b.intRequestID INNER JOIN tblclient AS c ON b.intRequest_ClientID = c.intClientID INNER JOIN tbluser AS d ON d.intID= c.intClientID WHERE intRHWID = ? AND (strRHWStatus IN ('Waiting','Approved'))`,[req.session.user], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log(''+req.params.userid);
    req.offer= results;
    return next();
  });
}

// -----------------------------------------------------------------JOB OFFER DECISION
function offerdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'accept'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Approved', strRClientStatus='Waiting' WHERE strRHWStatus='Waiting' AND intRRequestID = '${req.body.transID}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.session.user}'`,function (err) {
      console.log(''+err);
      db.query(`UPDATE tblresults SET strRHWStatus='Rejected' WHERE strRHWStatus NOT IN ('Approved') AND intRHWID = '${req.session.user}'`,function (err) {
        console.log(''+err);
        res.redirect('/home_householdworker', flog, findjoboffers, render);
      })
    })
  }
  else if(req.body.btn1 == 'reject'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Rejected' WHERE strRHWStatus='Waiting' AND intRRequestID = '${req.body.transID}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.session.user}'`,function (err) {
      console.log(''+err);
      res.redirect('/home_householdworker', flog, findjoboffers, render);
    })
  }
  // else if(req.body.btn1 == 'sendtoclient'){
  //   db.query(`UPDATE tblresults SET strRClientStatus= 'Waiting' WHERE strRClientStatus='' AND intRRequestID = '${req.params.requestid}' AND intRHWID = '${req.body.hwid}'`,function (err) {
  //     console.log(''+err);
  //   res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
  //   })
  // }
  // else if(req.body.btn1 == 'removefromlist'){
  //   db.query(`DELETE FROM tblresults WHERE intRRequestID = '${req.params.requestid}' AND intRHWID = '${req.body.hwid}'`,function (err) {
  //     console.log(''+err);
  //   res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
  //   })
  // }
}
router.post('/job_offer', flog, offerdecision)


exports.home_householdworker= router;

                      