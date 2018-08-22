var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');

// ----------------------------------------------------------------------------------index page
router.get('/', flog, findcurrenthw, findcurrenthwtobereplaced, renderreplacement)
function renderreplacement(req,res){
    if(req.valid==1)
    res.render('request_replacement_client/views/index',{usertab: req.user, currenthwtab: req.currenthw,  currenthwtobereplacedtab: req.currenthwtobereplaced});
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
           WHERE strCurStatus IN ('To be replaced') AND intTClientID = '${req.session.user}'`, function(err,results){
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
            res.redirect('/request_replacement/replace_list_'+results[0].intRequestID + req.body.hwid, flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, renderreplacementlist);
            // res.redirect('/request_replacement')
        });
      });
    });
  });
}

// ------------------------------------------------------------------------------Createed replace list page
router.get('/replace_list_:transid:hwid', flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, findoldhwservice, renderreplacementlist)
function renderreplacementlist(req,res){
  if(req.valid==1)
  res.render('request_replacement_client/views/replacement_list',{usertab: req.user, itemtab: req.item, listtab: req.list, counttab:req.count, servicetab: req.service, skilltab: req.skill, hwtab: req.hw, noofapprovetab: req.noofapprove, feetab: req.fee, oldhwservicetab: req.oldhwservice});
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
  db.query("SELECT * FROM tblinitialrequest INNER JOIN tblMservice ON intITypeOfService = intID WHERE intIRequestID=?",[req.params.transid], function (err, results) {
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
    if (!results[0])
    console.log('');
    req.oldhwservice= results;
    return next();
  });
}

// -------------------------------------------------------------------------------Set attributes
router.post('/set_attributes_:transid:hwid',(req,res) =>{
  var db = require('../../lib/database')();
  db.query(`SELECT COUNT (intIRequestID) AS Num FROM tblinitialrequest WHERE intIRequestID = ?`, [req.params.transid], function(err,results) {
    if (err) console.log(err);
    db.query(`INSERT INTO tblinitialrequest VALUES ("${req.params.transid}", "${results[0].Num + 1}", "${req.body.service}", "${req.body.quantity}", "${req.body.age1}", "${req.body.age2}", "${req.body.gender}", "${req.body.educ}", "${req.body.workexp}", "${req.body.salary}")`, function(err){
      if (err) console.log(err);
      res.redirect('/request_replacement/replace_list_'+ req.params.transid + req.params.hwid, flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, findoldhwservice, renderreplacementlist);
    })
  })
});
//---------------------------------------------------------------------------------Submit list to admin
function submitrequest(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblfinalrequest SET strRequestStatus= 'On process' WHERE intRequestID = ?";
  db.query(sql,[req.params.transid],function (err) {
    if (err) return res.send(err);
    res.redirect('/request_replacement/replace_list_'+ req.params.transid + req.params.hwid, flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, findoldhwservice, renderreplacementlist);
  });
}
router.get('/submit_request_:transid:hwid',flog,submitrequest);

// ----------------------------------------------------------------------------
// router.get('/mylist_:userid', flog, findcreatedlist, findcreateditem, findcountcreateditem, findmservice, findskills, findresult, findapprove, findfees, rendermylist);














exports.request_replacement= router;