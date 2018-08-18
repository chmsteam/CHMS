var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');


//Request Add Page
function render(req,res){
  if(req.valid==1)
  res.render('request_add/views/index',{usertab: req.user, listtab: req.list});
  else if(req.valid==0)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}
function findlist(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblfinalrequest WHERE intRequest_ClientID=?",[req.session.user], function (err, results) {
      console.log('xxxxxxxxxxxxxxxxxxxxx'+results);
      for(var i = 0; i < results.length; i++){

        results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
        results[i].datRequestNeedDate =  moment(results[i].datRequestNeedDate).format("LL");
            
      }
      if (err) return res.send(err);
      req.list = results;
      // console.log(req.list.datRequestDate)


      return next();
    });
  }
router.get('/', flog, findlist, render);

//Create a List page
function rendercreatelist_services(req,res){
  if(req.valid==1)
  res.render('request_add/views/createlist_services',{usertab: req.user});
  else if(req.valid==0)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}
router.get('/createlist_services', flog, rendercreatelist_services);

router.post('/createlist_services/createlist', flog, (req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblfinalrequest (intRequest_ClientID, strRequestType,strRequestName, strRequestDesc, datRequestDate, strRequestStatus, datRequestNeedDate)  VALUES ("${req.session.user}", "Add", "${req.body.reqname}", "${req.body.reqdesc}", "${req.body.reqdate}", "Draft", "${req.body.dateneed}")`, (err) => {
    if (err) console.log(err);
      res.redirect('/request_add');
    });
  });


// My list Page
function rendermylist(req,res){
    if(req.valid==1)
      res.render('request_add/views/mylist',{usertab: req.user, itemtab: req.item, listtab: req.list, counttab:req.count, servicetab: req.service, skilltab: req.skill, hwtab: req.hw, noofapprovetab: req.noofapprove, feetab: req.fee});
    else if(req.valid==0)
      res.render('admin/views/invalidpages/normalonly');
    else
      res.render('login/views/invalid');
  }
function findcreatedlist(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfinalrequest WHERE intRequestID=? AND intRequest_ClientID=?",[req.params.userid, req.session.user], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.list = results;
    return next();
  });
}
  function findcreateditem(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT * FROM tblinitialrequest INNER JOIN tblMservice ON intITypeOfService = intID WHERE intIRequestID=?",[req.params.userid], function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.item = results;
      return next();
    });
  }
  function findcountcreateditem(req, res, next){
    var db = require('../../lib/database')();
    db.query("SELECT COUNT(intIRequestID) AS count FROM tblinitialrequest WHERE intIRequestID=?",[req.params.userid], function (err, results) {
      if (err) return res.send(err);
      if (!results[0])
      console.log('');
      req.count= results;
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
  function findapprove(req, res, next){
    var db = require('../../lib/database')();
    db.query(`SELECT COUNT(*) AS NOOFapprove FROM tblresults WHERE strRClientStatus='Approved' AND intRRequestID ='${req.params.userid}'`, function (err, results) {
      if (err) return res.send(err);
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'+req.params.userid);
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
  router.get('/mylist_:userid', flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, rendermylist);


// Add service to list
function rendercreatelist_set_preferences(req,res){
      if(req.valid==1)
        res.render('request_add/views/createlist_set_preferences',{usertab: req.user, servicetab: req.service, listtab: req.list});
      else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
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
router.get('/createlist_set_preferences_:userid', flog, findcreatedlist, findmservice, rendercreatelist_set_preferences);

router.post('/add_to_mylist_:userid',(req,res) =>{
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query(`SELECT COUNT (intIRequestID) AS Num FROM tblinitialrequest WHERE intIRequestID = ?`, [req.params.userid], function(err,results) {
    if (err) console.log(err);
    db2.query(`INSERT INTO tblinitialrequest VALUES ("${req.params.userid}", "${results[0].Num + 1}", "${req.body.service}", "${req.body.quantity}", "${req.body.age1}", "${req.body.age2}", "${req.body.gender}", "${req.body.educ}", "${req.body.workexp}", "${req.body.salary}")`, function(err){
      if (err) console.log(err);
      res.redirect('/request_add/mylist_'+req.params.userid, flog, findcreatedlist, findcreateditem, rendermylist);
    })
  })
});


//------------------------------------------submit list to admin
function submitrequest(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblfinalrequest SET strRequestStatus= 'On process' WHERE intRequestID = ?";
  db.query(sql,[req.params.requestid],function (err) {
    if (err) return res.send(err);
    res.redirect('/request_add');
  });
}
router.get('/submit_request_:requestid',flog,submitrequest);

//----------------------------------------------------------------------------RESULTS SENT BY ADMIN
function findresult(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT strName, strFName, strLName, strGender, strPicture, strRClientStatus, intRHWID, intRRequestID, intRRequest_No, intRHWID, TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) AS age FROM tblresults AS a INNER JOIN tbluser AS b ON a.intRHWID = b.intID INNER JOIN tblhouseholdworker AS c ON b.intID=c.intHWID INNER JOIN tblmservice AS d ON d.intID = c.intServiceID
              WHERE strRHWStatus = 'Approved' AND strRClientStatus IN ('Approved') AND intRRequestID = ?`,[req.params.userid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('xxxxxxxxxxxxxxxxxxxx'+req.params.requestid);
    req.hw= results;
    return next();
  });
}
// ---------------------------------------------------------------------------DECISION MADE BY CLIENT
function clientdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'approve'){
    db.query(`UPDATE tblresults SET strRClientStatus= 'Approved' WHERE strRClientStatus='Waiting' AND intRRequestID = '${req.body.transid}' AND intRRequest_No = '${req.params.requestno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log('xxxxxxxxxxxxxx'+err);
      res.redirect('/request_add/mylist_'+req.body.transid, flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, rendermylist);
    })
  }
  else if(req.body.btn1 == 'reject'){
    db.query(`UPDATE tblresults SET strRClientStatus= 'Rejected' WHERE strRClientStatus='Waiting' AND intRRequestID = '${req.body.transid}' AND intRRequest_No = '${req.params.requestno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
      res.redirect('/request_add/mylist_'+req.body.transid, flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, rendermylist);
    })
  }
}
router.post('/decision_:requestno', flog, clientdecision)


// ----------------------------------------------------------------------------------VIEW HW PROFILE
router.get('/hw_profile_:userid:hwid', flog, findhw, findhweduc, findhwwork, findcreatedlist, renderhwprofile)
function renderhwprofile(req,res){
  if(req.valid==1)
    res.render('request_add/views/hw_profile',{usertab: req.user, hw1tab: req.hw1, hw2tab: req.hw2, hw3tab: req.hw3, listtab: req.list});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findhw(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser INNER JOIN tblhouseholdworker on intID = intHWID INNER JOIN tblmservice AS a ON intServiceID=a.intID WHERE tbluser.intID =?",[req.params.hwid], function (err, results) {
    console.log(''+req.params.hwid);
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw1 = results;
    return next();
  });
}

function findhweduc(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblhw_educbg WHERE intHWID_educbg = ? ",[req.params.hwid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw2 = results;
    return next();
  });
}
function findhwwork(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblhw_workbg WHERE intHWID_workbg = ? ",[req.params.hwid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.hw3 = results;
    return next();
  });
}

// -----------------------------------------------------------------------------VIEW LIST RESULT
router.get('/result_:userid:requestno', flog, findviewlist, findcreatedlist, renderviewlist)
function findviewlist(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT strName, strFName, strLName, strGender, strPicture, strRClientStatus, intRHWID, intRRequestID, intRRequest_No, intRHWID, TIMESTAMPDIFF(YEAR,datBirthDay,CURDATE()) AS age FROM tblresults AS a INNER JOIN tbluser AS b ON a.intRHWID = b.intID INNER JOIN tblhouseholdworker AS c ON b.intID=c.intHWID INNER JOIN tblmservice AS d ON d.intID = c.intServiceID
              WHERE strRHWStatus = 'Approved' AND strRClientStatus IN ('Waiting', 'Rejected', 'Approved') AND intRRequestID = ? AND intRRequest_No = ?`,[req.params.userid, req.params.requestno], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('xxxxxxxxxxxxxxxxxxxx'+req.params.userid);
    req.hw= results;
    return next();
  });
}
function renderviewlist(req,res){
  if(req.valid==1)
    res.render('request_add/views/mylist_viewlist',{usertab: req.user, hwtab: req.hw, listtab: req.list});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

// ---------------------------------------------------------------------DEPLOYMENT PROCESS
router.post('/contract', flog, findcreatedlist2);
function findcreatedlist2(req, res){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  var db3 = require('../../lib/database')();
  db.query("SELECT * FROM tbltransaction WHERE intTRequestID=?",[req.body.transid], function (err, results) {
    console.log(err);
    if (!results[0]){
      db2.query(`INSERT INTO tbltransaction VALUES ('${req.body.transid}', '${req.session.user}', '${req.body.reqdate}', '${req.body.dep}', '${req.body.datedep}', '${req.body.timedep}', '', '', NULL, '','','${req.body.invnum}')`, function(err){
        console.log(err);
        res.redirect('/request_add/contract_'+req.body.transid,flog, findcreatedlist,rendercontract)
      })  
    }
    else{
      db3.query(`UPDATE tbltransaction SET datDateRequested='${req.body.reqdate}', intTypeofDeployment='${req.body.dep}', datDateofDeployment='${req.body.datedep}', timTimeofDeployment='${req.body.timedep}' WHERE intTClientID = '${req.session.user}' AND intTRequestID = '${req.body.transid}'`,function(err){
        console.log(err);
        res.redirect('/request_add/contract_'+req.body.transid,flog,findcreatedlist, rendercontract)
      })
    }
  });
}

router.get('/contract_:userid',flog, findcreatedlist, rendercontract);
function rendercontract(req,res){
  if(req.valid==1)
    res.render('request_add/views/contract',{usertab: req.user, listtab: req.list});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
// function contracts(req,next){
//   var db = require('../../lib/database')();
//   db.query(`SELECT * FROM tblcontract WHERE intConTransID = ? `,[req.params.userid], function (err, results) {
//     console.log(err);
//     req.hw= results;
//     console.log(req.hw);
//     return next();
//   });
// }
// function contractresponse(req,res,next){
//   var db = require('../../lib/database')();
//   console.log('xxxxxxxxxxxxxxx'+req.params.userid)
//   db.query(`SELECT strName, strFName, strLName, intRHWID, intRRequestID, deciRequestSalary FROM tblresults AS a INNER JOIN tbluser AS b ON a.intRHWID = b.intID INNER JOIN tblhouseholdworker AS c ON b.intID=c.intHWID INNER JOIN tblmservice AS d ON d.intID = c.intServiceID
// 		    INNER JOIN tblfinalrequest on intRequestID =  intRRequestID INNER JOIN tblinitialrequest ON intIRequest_No = intRRequest_No
//         WHERE strRHWStatus = 'Approved' AND strRClientStatus IN ('Approved') AND intRRequestID = ?`,[req.params.userid], function(err, results, fields){
//           db.query(`INSERT INTO tblcontract VALUES ('${results[0].intRRequestID}', '${results[0].intRHWID}', '${results[0].deciRequestSalary}', '')`, function(err, results){

//           })

//           return next();
//           })
// }

router.post('/deccontract',flog, contractstatus);
function contractstatus (req,res){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  console.log('xxxxxxxxxxxxxxxxxxxxxxxx');
  if(req.body.btn1 == 'accept'){
    db.query(`UPDATE tbltransaction SET strContractStatus = 'Accepted' WHERE intTClientID = '${req.session.user}' AND intTRequestID = '${req.body.transid}'`,function(err){
      console.log(err);
      db.query(`UPDATE tblfinalrequest SET strRequestStatus = 'Pending' WHERE intRequest_ClientID = '${req.session.user}' AND intRequestID = '${req.body.transid}'`,function(err){
        console.log(err);
        res.redirect('/request_add/invoice_'+req.body.transid);
      })
    })
  }
}

//------------------------------------------------------------------------------------------- INVOICE 
router.get('/invoice_:userid',flog, findagency, findclient, findtrans, finditems, findagencyfee, findotherfee, renderinvoice);
function renderinvoice(req,res){
  if(req.valid==1)
    res.render('request_add/views/invoice',{usertab: req.user, agencytab: req.agency, clienttab: req.client, dctab: req.dc, itemtab: req.item, agencyftab: req.agencyf, otherfeetab: req.otherfee});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

function findagency(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblagency",[req.params.hwid], function (err, results) {
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
  db.query(`SELECT intServiceID,strName, COUNT(intServiceID) AS service, deciRate, (COUNT(intServiceID)*deciRate) as Rate FROM
            (SELECT * FROM tblresults INNER JOIN tblhouseholdworker ON intHWID = intRHWID INNER JOIN tblmservice ON intServiceID = intID WHERE strRClientStatus ='Approved' and intRRequestID=?) as ta
            GROUP BY intServiceID `,[req.params.userid], function (err, results) {

    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function findagencyfee(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblfee WHERE intID = 1`, function (err, results) {

    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.agencyf = results;
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


function rendercreatelist_summary(req,res){
  if(req.valid==1)
    res.render('request_add/views/createlist_summary',{usertab: req.user});
  else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/createlist_summary', flog, rendercreatelist_summary);





exports.request_add= router;

                      