var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');

// ----------------------------------------------------------------------------------index page
router.get('/', flog, dropReplaceReason, findcurrenthw,  findcurrenthwtobereplaced, renderreplacement)
function renderreplacement(req,res){
    if(req.valid==1)
    res.render('request_replacement_client/views/index',{usertab: req.user, currenthwtab: req.currenthw, currenthwtobereplacedtab: req.currenthwtobereplaced, reasons: req.dropReplaceReason});
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
function findcurrenthwtobereplaced(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblcontract INNER JOIN tblhouseholdworker ON intConHWID = intHWID INNER JOIN tblmservice ON tblmservice.intID = intServiceID INNER JOIN tbltransaction ON intTRequestID = intConTransID INNER JOIN tbluser ON tbluser.intID = intHWID INNER JOIN tblreplacement ON intReplaceOldHWID = intConHWID
            INNER JOIN tblfinalrequest ON intRequestID=intReplaceReqID WHERE strCurStatus IN ('To be replaced') AND intTClientID = ?`, [req.session.user], function(err,results){
      console.log(err);
      req.currenthwtobereplaced = results;
      return next();
  })
}
// ------------------------------------------------------------------------------Create a Replace
router.post('/replace', flog, createreplacement)
function createreplacement(req,res){
  var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblfinalrequest (intRequest_ClientID, strRequestType,strRequestName, strRequestDesc, datRequestDate, strRequestStatus, datRequestNeedDate)  VALUES ("${req.session.user}", 'Replacement', '${retVal}',"${req.body.reqdesc}", "${req.body.reqdate}", "Draft", "${req.body.dateneed}")`, function(err) {
    console.log(err)
    db.query(`SELECT intRequestID FROM tblfinalrequest WHERE strRequestName = '${retVal}' AND intRequest_ClientID = '${req.session.user}'`, function(err, results) {
      console.log(results[0].intRequestID)
      db.query(`INSERT INTO tblreplacement VALUES ("${results[0].intRequestID}", "${req.body.hwid}", NULL)`, function(err) {
        console.log(err)
        db.query(`UPDATE tblcontract SET strCurStatus = 'To be replaced' WHERE intConHWID =${req.body.hwid}`, function(err) {
          console.log(err)
            res.redirect('/request_replacement/replace_list_/-/'+results[0].intRequestID+'/-/' + req.body.hwid);
            // res.redirect('/request_replacement')
        });
      });
    });
  });
}

router.post('/cancel',flog,cancelreplacement)
function cancelreplacement(req,res){
  var db = require('../../lib/database')();
  if (req.body.btn1 == 'cancel_draft'){
    db.query(`DELETE FROM tblinitialrequest WHERE intIRequestID = '${req.body.transid}'`, (err) => {
      console.log(err)
      db.query(`DELETE FROM tblfinalrequest WHERE intRequestID = '${req.body.transid}'`, (err) => {
        console.log(err)
        db.query(`DELETE FROM tblreplacement WHERE intReplaceReqID = '${req.body.transid}'`, (err) => {
          if (err){
            console.log(err)
          }
          else{
            db.query(`UPDATE tblcontract SET strCurStatus='Current' WHERE intConHWID  = '${req.body.hwid}' AND strCurStatus IN('To be replaced')`, (err) => {
              if (err){
                console.log(err)
              }
              else{
                res.redirect('/request_replacement');
              }
            });
          }
        });
      });
    });
  }
  else if(req.body.btn1 == 'cancel_onprocess'){
    db.query(`UPDATE tblfinalrequest SET strRequestStatus = 'Cancelled' WHERE intRequestID = '${req.body.transid}'`, (err) => {
      console.log(err)
      db.query(`UPDATE tbltransaction SET strTStatus = 'Cancelled' WHERE intTRequestID = '${req.body.transid}'`, (err) => {
        console.log(err)
        db.query(`DELETE FROM tblreplacement WHERE intReplaceReqID = '${req.body.transid}'`, (err) => {
          if (err){
            console.log(err)
          }
          else{
            db.query(`UPDATE tblcontract SET strCurStatus='Current' WHERE intConHWID  = '${req.body.hwid}' AND strCurStatus IN('To be replaced')`, (err) => {
              if (err){
                console.log(err)
              }
              else{
                res.redirect('/request_replacement');
              }
            });
          }
        });
      });
    });
  }
}

// ------------------------------------------------------------------------------Created replace list page
function renderreplacementlist(req,res){
  if(req.valid==1)
  res.render('request_replacement_client/views/replacement_list',
  {usertab: req.user, itemtab: req.item, listtab: req.list, counttab:req.count, servicetab: req.service, skilltab: req.skill, hwtab: req.hw, 
    noofapprovetab: req.noofapprove, feetab: req.fee, oldhwservicetab: req.oldhwservice, currenthwtobereplacedtab: req.currenthwtobereplaced,
    transdetailstab: req.transdetails, nooftranstab: req.nooftrans, prevtransdetailstab: req.prevtransdetails});
    else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
  }
  
  function findcreatedlist(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblfinalrequest WHERE intRequestID=? AND intRequest_ClientID=?",[req.params.transid, req.session.user], function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.list = results;
      return next();
    });
  }
  function findcreateditem(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT *, count(*) as itemnum FROM tblinitialrequest INNER JOIN tblMservice ON intITypeOfService = intID WHERE intIRequestID=?",[req.params.transid], function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.item = results;
      return next();
    });
  }
  
  function findcountcreateditem(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT COUNT(intIRequestID) AS count FROM tblinitialrequest WHERE intIRequestID=?",[req.params.transid], function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.count= results;
      return next();
    });
  }
  function findmservice(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblmservice ", function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.service = results;
      return next();
    });
  }
  
  function findskills(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblmskills", function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.skill= results;
      return next();
    });
  }
  function findresult(req,res,next){
    var db = require('../../lib/database')();
    db.query(`SELECT strName, strFName, strLName, strGender, strPicture, strRClientStatus, intRHWID, intRRequestID, intRRequest_No, intRHWID, TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) AS age FROM tblresults AS a INNER JOIN tbluser AS b ON a.intRHWID = b.intID INNER JOIN tblhouseholdworker AS c ON b.intID=c.intHWID INNER JOIN tblmservice AS d ON d.intID = c.intServiceID
    WHERE strRHWStatus = 'Approved' AND strRClientStatus IN ('Approved') AND intRRequestID = ?`,[req.params.transid], function (err, results) {
      req.hw= results;
      return next();
    });
  }
  function findapprove(req, res, next){
    var db = require('../../lib/database')();
    db.query(`SELECT COUNT(*) AS NOOFapprove FROM tblresults WHERE strRClientStatus='Approved' AND intRRequestID ='${req.params.transid}'`, function (err, results) {
      if (err) return res.send(err);
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+req.params.transid);
      req.noofapprove= results;
      return next();
    });
  }
  function findfees(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblfee WHERE intID NOT IN('1','4')", function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.fee= results;
      return next();
    });
  }
  
  function findoldhwservice(req,res,next){
    var db = require('../../lib/database')();
    db.query(`SELECT intHWID, intServiceID, strName FROM tblhouseholdworker INNER JOIN tblmservice ON intServiceID=intID WHERE intHWID = '${req.params.hwid}'`, function (err, results) {
      if (err) return res.send(err);
      req.oldhwservice= results;
      return next();
    });
  }
  function findtransaction(req,res,next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tbltransaction WHERE intTRequestID = ?`,[req.params.transid], function(err,results){
      console.log(err);
      for(var i = 0; i < results.length; i++){
        results[i].datDateofDeployment =  moment(results[i].datDateofDeployment).format("LL");
        results[i].timTimeofDeployment = moment(results[i].timTimeofDeployment, 'HH:mm').format('hh:mm a')
      }
      req.transdetails = results;
      return next();
    })
  }
  function dropReplaceReason(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblmreplacereason WHERE strStatus= 'Active' ", function (err, results) {
      if (err) return res.send(err);
      req.dropReplaceReason= results;
      return next();
    });
  }
  
  router.get('/replace_list_/-/:transid/-/:hwid', flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, findoldhwservice,findcurrenthwtobereplaced, findtransaction, findnooftrans, findprevtransaction, renderreplacementlist)
  // -------------------------------------------------------------------------------Set attributes
  router.post('/set_attributes_/-/:transid/-/:hwid',(req,res) =>{
    var db = require('../../lib/database')();
    db.query(`SELECT COUNT (intIRequestID) AS Num FROM tblinitialrequest WHERE intIRequestID = ?`, [req.params.transid], function(err,results) {
      if (err) console.log(err);
      db.query(`INSERT INTO tblinitialrequest VALUES ("${req.params.transid}", "${results[0].Num + 1}", "${req.body.service}", "${req.body.quantity}", "${req.body.age1}", "${req.body.age2}", "${req.body.gender}", "${req.body.educ}", "${req.body.workexp}", "${req.body.salary}")`, function(err){
        if (err) console.log(err);
        res.redirect('/request_replacement/replace_list_/-/'+ req.params.transid +'/-/'+ req.params.hwid);
      })
  })
});
function findnooftrans(req,res,next){
  var db = require('../../lib/database')();
  db.query('SELECT COUNT(*) AS nooftrans FROM tbltransaction WHERE intTRequestID = ?', [req.params.transid], function(err,results){
    if (err){
      res.send(err);
    }
    else{
      req.nooftrans = results
      return next();
    }
  })
}
function findprevtransaction(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tbltransaction INNER JOIN tblfee ON intTypeofDeployment = intID WHERE intTRequestID = ?`,[req.params.transid], function(err,results){
    console.log(err);
    for(var i = 0; i < results.length; i++){
      results[i].datDateofDeployment =  moment(results[i].datDateofDeployment).format("YYYY-MM-DD");
      results[i].timTimeofDeployment = moment(results[i].timTimeofDeployment, 'HH:mm').format('HH:mm:ss')
    }
    req.prevtransdetails = results;
    return next();
  })
}
//---------------------------------------------------------------------------------Submit list to admin
function submitrequest(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblfinalrequest SET strRequestStatus= 'On process' WHERE intRequestID = ?";
  db.query(sql,[req.params.transid],function (err) {
    if (err) return res.send(err);
    res.redirect('/request_replacement/replace_list_/-/'+ req.params.transid +'/-/'+ req.params.hwid);
  });
}

router.post('/submit_request_/-/:transid/-/:hwid',flog,submitrequest);

function submitrequest2(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblfinalrequest SET strRequestStatus= 'On process' WHERE intRequestID = ?";
  db.query(sql,[req.params.transid],function (err) {
    if (err) return res.send(err);
    db.query(`UPDATE tblcontract SET strCurStatus = 'To be replaced' WHERE intConHWID = ?`,[req.params.hwid], function (err){
      console.log(err)
      res.redirect('/request_replacement/replace_list_'+ req.params.transid + req.params.hwid, flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, findoldhwservice, renderreplacementlist);
    })
  });
}
router.post('/submit_replaceclient_:transid:hwid',flog,submitrequest2);

// -----------------------------------------------------------------------------VIEW LIST RESULT
router.get('/result_/-/:transid/-/:transno/-/:hwid', flog, findviewlist, findcreatedlist, findoldhwservice, renderviewlist)
function findviewlist(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT strName, strFName, strLName, strGender, strPicture, strRClientStatus, intRHWID, intRRequestID, intRRequest_No, intRHWID, TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) AS age FROM tblresults AS a INNER JOIN tbluser AS b ON a.intRHWID = b.intID INNER JOIN tblhouseholdworker AS c ON b.intID=c.intHWID INNER JOIN tblmservice AS d ON d.intID = c.intServiceID
              WHERE strRHWStatus = 'Approved' AND strRClientStatus IN ('Waiting', 'Rejected', 'Approved') AND intRRequestID = ? AND intRRequest_No = ?`,[req.params.transid, req.params.transno], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('xxxxxxxxxxxxxxxxxxxx');
    req.hw= results;
    return next();
  });
}
function renderviewlist(req,res){
  if(req.valid==1)
    res.render('request_replacement_client/views/replacement_list_viewlist',{usertab: req.user, hwtab: req.hw, listtab: req.list, oldhwservicetab: req.oldhwservice});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
// ---------------------------------------------------------------------------View LIST DECISION
router.post('/decision_:requestno', flog, clientdecision)
function clientdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'approve'){
    db.query(`UPDATE tblresults SET strRClientStatus= 'Approved' WHERE strRClientStatus='Waiting' AND intRRequestID = '${req.body.transid}' AND intRRequest_No = '${req.params.requestno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log('xxxxxxxxxxxxxx'+err);
      db.query(`SELECT * FROM tblresults as a INNER JOIN tblinitialrequest as b on a.intRRequestID = b.intIRequestID WHERE intRRequestID = '${req.body.transid}' AND intRRequest_No = '${req.params.requestno}' AND intRHWID = '${req.body.hwid}' AND strRClientStatus = 'Approved'`, function (err,results){
        db.query(`INSERT INTO tblcontract VALUES ('${req.body.transid}', '${req.body.reqno}', '${req.body.hwid}', '${results[0].deciRequestSalary}', '', NULL, '',NULL,'','')`, function(err,results2){
          console.log('yyyyyyyyyyyyy'+err)
          res.redirect('/request_replacement/result_/-/'+ req.body.transid +'/-/'+req.params.requestno+'/-/'+ req.body.oldhwid);
        })
      })
    })
  }
  else if(req.body.btn1 == 'reject'){
    db.query(`UPDATE tblresults SET strRClientStatus= 'Rejected' WHERE strRClientStatus='Waiting' AND intRRequestID = '${req.body.transid}' AND intRRequest_No = '${req.params.requestno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
      res.redirect('/request_replacement/result_/-/'+ req.body.transid +'/-/'+req.params.requestno+'/-/'+ req.body.oldhwid);
    })
  }
  else if(req.body.btn1 == 'revert'){
    db.query(`UPDATE tblresults SET strRClientStatus= 'Waiting' WHERE strRClientStatus IN('Rejected','Approved') AND intRRequestID = '${req.body.transid}' AND intRRequest_No = '${req.params.requestno}' AND intRHWID = '${req.body.hwid}'`,function (err, results) {
      console.log(err);
      db.query(`SELECT COUNT(*) bato FROM tblcontract WHERE intConTransID = ? AND intConHWID =?`,[req.body.transid, req.body.hwid], function(err,results){
        console.log(err);
        if(results[0].bato == 0){
          res.redirect('/request_replacement/result_/-/'+ req.body.transid +'/-/'+req.params.requestno+'/-/'+ req.body.oldhwid);
        }
        else{
          db.query(`DELETE FROM tblcontract WHERE intConTransID = ? AND intConHWID =? `, [req.body.transid, req.body.hwid], function(err){
            res.redirect('/request_replacement/result_/-/'+ req.body.transid +'/-/'+req.params.requestno+'/-/'+ req.body.oldhwid);
          })
        }
      })
    })
  }
}

// ------------------------------------------------------------------------------CHOOSE DEPLOYMENT
router.post('/contract', flog, findcreatedlist2);

function findcreatedlist2(req, res){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbltransaction WHERE intTRequestID=?",[req.body.transid], function (err, results) {
    console.log(err);
    if (!results[0]){
      db.query(`SELECT * FROM tblcontract WHERE intConHWID= (SELECT intReplaceOldHWID FROM tblreplacement WHERE intReplaceOldHWID = ? AND strCurStatus='To be replaced') ORDER BY intContransID DESC LIMIT 1`,[req.body.hwid], function (err,results2){
        db.query(`INSERT INTO tbltransaction VALUES ('${req.body.transid}', '${req.session.user}', '${req.body.reqdate}', '${req.body.dep}', '${req.body.datedep}', '${req.body.timedep}', '${results2[0].strConCopy}', 'Accepted', NULL, NULL, '','','${req.body.invnum}', '','')`, function(err){
          res.redirect('/request_replacement/contract_/-/'+req.body.transid+'/-/'+req.body.hwid)
        })  
      })
    }
    else{
      db.query(`UPDATE tbltransaction SET datDateRequested='${req.body.reqdate}', intTypeofDeployment='${req.body.dep}', datDateofDeployment='${req.body.datedep}', timTimeofDeployment='${req.body.timedep}' WHERE intTClientID = '${req.session.user}' AND intTRequestID = '${req.body.transid}'`,function(err){
        console.log(err);
        res.redirect('/request_replacement/contract_/-/'+req.body.transid+'/-/'+req.body.hwid)
      })
    }
  });
}

// -----------------------------------------------------------------------CONTRACT
router.get('/contract_/-/:transid/-/:hwid',flog, findcreatedlist, findcontractstatus, findcontractstatusforhw, findnoofacceptcontract, findtotnoofacceptcontract, findoldhwservice, findagency, agencyfee, transpofee, replacement, replacementfee, clientaddress, rendercontract);
function rendercontract(req,res){
  if(req.valid==1)
    res.render('request_replacement_client/views/contract',{usertab: req.user, listtab: req.list, conttab: req.cont, hwtab: req.hw, noacontracttab: req.noacontract, tnocontracttab: req.tnocontract, oldhwservicetab: req.oldhwservice, agencytab: req.agency, agencyfeetab: req.agencyfee, transpofeetab: req.transpofee, replacementtab: req.replacement, replacementfeetab: req.replacementfee, clientaddtab: req.clientadd});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findcontractstatus(req,res,next){
    var db = require('../../lib/database')();
    db.query(`SELECT * FROM tbltransaction WHERE intTRequestID = '${req.params.transid}'`, function(err, results){
      console.log('error:>>> '+req.params.hwid);
      req.cont = results;
      return next();
    })
}
function agencyfee(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfee WHERE intID = 1 `, function(err,results){
    if (err){
      res.send(err);
    }
    else{
       req.agencyfee= results;
       return next();
    }
  })
}
function transpofee(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfee WHERE intID = 2 `, function(err,results){
    if (err){
      res.send(err);
    }
    else{
       req.transpofee= results;
       return next();
    }
  })
}
function replacementfee(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfee WHERE intID = 4`, function(err,results){
    if (err){
      res.send(err);
    }
    else{
       req.replacementfee= results;
       return next();
    }
  })
}
function replacement(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfreereplacement`, function(err,results){
    if (err){
      res.send(err);
    }
    else{
       req.replacement= results;
       return next();
    }
  })
}
function clientaddress(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblclient WHERE intClientID = ?`,[req.session.user], function(err,results){
    if (err){
      res.send(err);
    }
    else{
      req.clientadd=results;
      return next();
    }
  })
}

function findcontractstatusforhw(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT a.*, strName, strFName, strLName FROM tblcontract AS a INNER JOIN tblhouseholdworker as b on a.intConHWID = b.intHWID INNER JOIN tblmservice as c on c.intID = b.intServiceID INNER JOIN tbluser as d on d.intID = b.intHWID WHERE intConTransID = '${req.params.transid}'`, function(err, results){
    console.log('error: '+err);
    req.hw = results;
    return next();
  })
}

function findnoofacceptcontract(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) as noa FROM tblcontract WHERE strConStatus='Approved' AND intConTransID='${req.params.transid}'`,function(err,results){
    console.log(err)
    req.noacontract = results;
    // console.log('noa: '+ results[0].noa);
    return next();
  })
}
function findtotnoofacceptcontract(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT(*) as tno FROM tblcontract WHERE intConTransID='${req.params.transid}'`,function(err,results){
    console.log(err)
    req.tnocontract = results;
    // console.log('tn: '+ results[0].tno);
    return next();
  })
}
// -------------------------------------------------------------------------------------EDIT SALARY
router.post('/edit_salary', flog, editsalary)
function editsalary (req,res){
  var db = require('../../lib/database')();
    db.query(`UPDATE tblcontract SET intConSalary=? WHERE intConHWID = ? and intConTransID = ?`, [req.body.salary, req.body.hwid , req.body.transid], function(err){
      console.log('xxxxxxx'+req.body.id)
      res.redirect('/request_replacement/contract_/-/'+req.body.transid+'/-/'+req.body.oldhwid)
  })
}

// -------------------------------------------------------------------------------------SEND CONTRACT TO HW
router.post('/send_contract_hw', flog, sendcontracttohw)
function sendcontracttohw (req,res){
  var db = require('../../lib/database')();
    if (req.body.btn1 == 'sendtohw'){
      db.query(`UPDATE tblcontract SET strConStatus='Waiting' WHERE intConHWID = '${req.body.hwid}' and intConTransID = '${req.body.transid}'`, function(err){
        res.redirect('/request_replacement/contract_/-/'+req.body.transid+'/-/'+req.body.oldhwid)
      })
    }
}

// ------------------------------------------------------------------------------------------accept cont / SEND REQ TO ADMIN
router.post('/deccontract',flog, contractstatus);
function contractstatus (req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'accept'){
    db.query(`UPDATE tbltransaction SET strContractStatus = 'Accepted' WHERE intTClientID = '${req.session.user}' AND intTRequestID = '${req.body.transid}'`,function(err){
      console.log(err);
      res.redirect('/request_replacement/contract_'+req.body.transid+req.body.oldhwid,flog, findcreatedlist, findcontractstatus, rendercontract);
    })
  }
}

router.post('/send_to_admin',flog, sendtoadmin);
function sendtoadmin (req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'send'){
    db.query(`UPDATE tblfinalrequest SET strRequestStatus = 'Pending' WHERE intRequest_ClientID = '${req.session.user}' AND intRequestID = '${req.body.transid}'`,function(err){
        console.log(err);
        res.send('sent');
        // res.redirect('/request_replacement/invoice_/-/'+req.body.transid+'/-/'+req.body.oldhwid);
    })
  }
}

//------------------------------------------------------------------------------------------- INVOICE 
router.get('/invoice_/-/:userid/-/:hwid',flog, findagency, findclient, findtrans, finditems, findsubtotal, findotherfee, renderinvoice);
function renderinvoice(req,res){
  if(req.valid==1)
    res.render('request_replacement_client/views/invoice',{usertab: req.user, agencytab: req.agency, clienttab: req.client, dctab: req.dc, itemtab: req.item, subtotaltab: req.subtotal, otherfeetab: req.otherfee});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

function findagency(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblagency", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.agency = results;
    return next();
  });
}

function findclient(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT b.*, strFName, strLName, strEmail FROM tbluser as a inner join tblclient as b on a.intID=b.intClientID where intID = ?",[req.session.user], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.client = results;
    return next();
  });
}

function findtrans (req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT datDateRequested, strInvoiceNum FROM tbltransaction WHERE intTRequestID = ?`,[req.params.userid], function (err, results) {

    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    for(var i = 0; i < results.length; i++){
      results[i].datDateRequested =  moment(results[i].datDateRequested).format("LL");   
    }
    if (err) return res.send(err);
    req.dc = results;
    return next();
  });
}

function finditems(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT intServiceID,ta.strName, COUNT(intServiceID) AS service, fltFee, (COUNT(intServiceID)*fltfee) as subtotal FROM
          (SELECT * FROM tblresults INNER JOIN tblhouseholdworker ON intHWID = intRHWID INNER JOIN tblmservice ON intServiceID = intID WHERE strRClientStatus ='Approved' and intRRequestID=?) as ta,
          (SELECT * FROM tblfee WHERE intID=4) as tb 
          GROUP BY intServiceID `,[req.params.userid], function (err, results) {

    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function findsubtotal(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT (COUNT(intServiceID)*fltfee) as subtotal FROM
            (SELECT * FROM tblresults INNER JOIN tblhouseholdworker ON intHWID = intRHWID INNER JOIN tblmservice ON intServiceID = intID WHERE strRClientStatus ='Approved' and intRRequestID=?) as ta,
            (SELECT * FROM tblfee WHERE intID=4) as tb`, [req.params.userid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.subtotal = results;
    return next();
  });
}
function findotherfee(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT intTypeofDeployment, strName, fltFee, intTRequestID FROM tblfee INNER JOIN tbltransaction ON intID = intTypeofDeployment WHERE intTRequestID = ?`,[req.params.userid], function (err, results) {

    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.otherfee = results;
    return next();
  });
}

// ----------------------------------------------------------------------------
// router.get('/mylist_:userid', flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, rendermylist);














exports.request_replacement= router;