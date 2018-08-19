var express = require('express');
var flog = require( '../login/loggedin');
var router = express.Router();
var moment = require('moment');

//-------------------------------------------------------------------------------------DASHBOARD
function render(req,res){
  if(req.valid==0)
    res.render('admin/views/index',{usertab: req.user});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/', flog, render);

//--------------------------------------------------------------------------------------MAINTENANCE
router.get('/maintenance_contractofservices',flog,rendermaintcontractofservices)
function rendermaintcontractofservices(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_contractofservices',{usertab: req.user});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}




function rendermaintenanceIR(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_ir',{usertab: req.user, itemtab:req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmincidentreport(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmincidentreport ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}


function rendermaintenanceR(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_r',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmrequirements(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmrequirements ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

function rendermaintenanceTL(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_tl',{usertab: req.user, itemtab:req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmleave(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmleave ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

function rendermaintenanceTS(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_ts',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
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
    req.item = results;
    return next();
  });
}

function rendermaintenanceskills(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_householdworker_skills',{usertab: req.user, itemtab: req.item, itemtabs: req.items});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmskills(req, res, next){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query("SELECT a.intID AS skillID, a.strName AS skillName, a.strStatus AS skillStatus FROM tblmskills AS a", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
// function findms(req, res, next){
//   var db = require('../../lib/database')();
//   var db2 = require('../../lib/database')();
//   db.query("SELECT * FROM tblmservice", function (err, results) {
//     if (err) return res.send(err);
//     if (!results[0])
//     console.log('');
//     req.items = results;
//     return next();
//   });
// }
function rendermaintenancecity(req,res){
  if(req.valid==0)
    res.render('admin/views/maintenance_c',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findmcity(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmcity ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

// Enable requirement
function enableRequirement(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmrequirements SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_requirements');
  });

}
// Disable requirement
function disableRequirement(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmrequirements SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_requirements');
});
}

// Enable incident report
function enableIncidentreport(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmincidentreport SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_incident_report');
  });

}
// Disable incident report
function disableIncidentreport(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmincidentreport SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_incident_report');
});
}

// Enable leave
function enableLeave(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmleave SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_type_of_leave');
  });

}
// Disable leave
function disableLeave(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmleave SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_type_of_leave');
});
}

// Enable service
function enableService(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmservice SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_type_of_services');
  });

}
// Disable service
function disableService(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmservice SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_type_of_services');
});
}

// Enable skill
function enableskill(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmskills SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_householdworker_skills');
  });

}
// Disable skill
function disableskill(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmskills SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_householdworker_skills');
});
}

// Enable city
function enablecity(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmcity SET strStatus= 'Active' WHERE strStatus='Inactive' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/maintenance_city');
  });

}
// Disable city
function disablecity(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tblmcity SET strStatus= 'Inactive' WHERE strStatus='Active' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/maintenance_city');
});
}


router.get('/maintenance_incident_report', flog, findmincidentreport, rendermaintenanceIR);
router.get('/maintenance_requirements', flog, findmrequirements, rendermaintenanceR);
router.get('/maintenance_type_of_leave', flog, findmleave, rendermaintenanceTL);
router.get('/maintenance_type_of_services', flog, findmservice, rendermaintenanceTS);
router.get('/maintenance_householdworker_skills', flog, findmskills, rendermaintenanceskills);
router.get('/maintenance_city', flog, findmcity, rendermaintenancecity);

router.get('/enable_requirement/:userid',flog,enableRequirement);
router.get('/disable_requirement/:userid',flog,disableRequirement);
router.get('/enable_incidentreport/:userid',flog,enableIncidentreport);
router.get('/disable_incidentreport/:userid',flog,disableIncidentreport);
router.get('/enable_leave/:userid',flog,enableLeave);
router.get('/disable_leave/:userid',flog,disableLeave);
router.get('/enable_service/:userid',flog,enableService);
router.get('/disable_service/:userid',flog,disableService);
router.get('/enable_skill/:userid',flog,enableskill);
router.get('/disable_skill/:userid',flog,disableskill);
router.get('/enable_city/:userid',flog,enablecity);
router.get('/disable_city/:userid',flog,disablecity);


router.post('/add_requirement',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmrequirements (strName, strType, strStatus)  VALUES ("${req.body.requirementname}", "${req.body.reqtype}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_requirements');
    });
});
router.post('/edit_requirement',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmrequirements SET strName= ?, strType= ? WHERE intID = ?";
  db.query(sql,[req.body.requirementname, req.body.reqtype, req.body.requirementID],function (err) {
    res.redirect('/admin/maintenance_requirements');
    });
});

router.post('/add_incidentreport',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmincidentreport (strName, strDesc, strStatus)  VALUES ("${req.body.incidentname}", "${req.body.incidentdesc}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_incident_report');
    });
});
router.post('/edit_incidentreport',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmincidentreport SET strName= ?, strDesc=? WHERE intID = ?";
  db.query(sql,[req.body.incidentname, req.body.incidentdesc, req.body.incidentID],function (err) {
    res.redirect('/admin/maintenance_incident_report');
    });
});

router.post('/add_leave',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmleave (strName, intDays, strStatus)  VALUES ("${req.body.leavename}", "${req.body.leaveday}","Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_type_of_leave');
    });
});
router.post('/edit_leave',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmleave SET strName= ?, intDays=? WHERE intID = ?";
  db.query(sql,[req.body.leavename, req.body.leaveday, req.body.leaveID],function (err) {
    res.redirect('/admin/maintenance_type_of_leave');
    });
});

router.post('/add_service',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmservice (strName, strStatus)  VALUES ("${req.body.servicename}","Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_type_of_services');
  });
});
router.post('/edit_service',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmservice SET strName= ? WHERE intID = ?";
  db.query(sql,[req.body.servicename, req.body.serviceID],function (err) {
    res.redirect('/admin/maintenance_type_of_services');
    });
});

router.post('/add_skill',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmskills (strName, strStatus)  VALUES ("${req.body.skill}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_householdworker_skills');
  });
});
router.post('/edit_skill',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmskills SET strName= ?, intSkillID_intID=? WHERE intID = ?";
  db.query(sql,[req.body.skillname, req.body.serviceid, req.body.skillID],function (err) {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_householdworker_skills');
    });
});

router.post('/add_city',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tblmcity (strName, strStatus)  VALUES ("${req.body.cityname}", "Active")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_city');
  });
});
router.post('/edit_city',(req, res) => {
  var db = require('../../lib/database')();
  var sql = "UPDATE tblmcity SET strName= ? WHERE intID = ?";
  db.query(sql,[req.body.cityname,  req.body.cityID],function (err) {
    if (err) console.log(err);
    res.redirect('/admin/maintenance_city');
    });
});

// ---------------------------------------------------------------------------------------TRANSACTION
//------------------------------------------------------------------------------------ TRANSACTION: Client Request
function rendertransclient(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_client_request',{usertab: req.user, requesttab: req.request});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclientrequest(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT CONCAT(b.strLName,', ', b.strFName) AS strName, strRequestType, datRequestDate, datRequestNeedDate, strRequestStatus, intRequestID FROM tblfinalrequest as a INNER JOIN tbluser as b ON a.intRequest_ClientID = b.intID WHERE a.strRequestStatus IN ('On process', 'On contract', 'Pending') ORDER BY intRequestID Desc`, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    for(var i = 0; i < results.length; i++){
      results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
      results[i].datRequestNeedDate =  moment(results[i].datRequestNeedDate).format("LL");   
    }
    req.request = results;
    return next();
  });

}
router.get('/transaction_client_request', flog, findclientrequest, rendertransclient);

router.post('/transactionrequestdecision',flog, clientrequestdecision);
function clientrequestdecision(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1='approve'){
    db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Approved' WHERE intRequestID='${req.body.transid}'`, function (err) {
      console.log(err);
      res.redirect('/admin/transaction_client_request')
    });
  }
  else{

  }
}

//------------------------------------------------------------------------------------ TRANSACTION: Client Request(specific)
function rendertransclientspecific(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_client_requestlist',{usertab: req.user, listtab:req.list, requesttab: req.request, clienttab: req.client, selectedtab: req.selected});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclientlistspecific(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblinitialrequest INNER JOIN tblMservice ON intITypeOfService = intID WHERE intIRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.request = results;
    return next();
  });
}
function findclientrequestspecific(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfinalrequest WHERE intRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.list = results;
    return next();
  });
}

function findclient(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,CONCAT(strLName,', ', strFName) AS strName FROM tbluser INNER JOIN tblclient ON intID = intClientID INNER JOIN tblFinalRequest ON intID = intRequest_ClientID WHERE intRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.client = results;
    return next();
  });
}
function findselected(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblmservice INNER JOIN tblhouseholdworker ON intID = intServiceID INNER JOIN tblresults ON intRHWID = intHWID WHERE intRRequestID=?",[req.params.requestid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.selected = results;
    return next();
  });
}
router.get('/transaction_client_request_:requestid', flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);

//----------------------------------------------------------------------------------------------------- 
function rendertransclientno(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_client_request_result',{usertab: req.user, listtab:req.list, requesttab: req.request, resultatab:req.resulta});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findclientrequestspecific2(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfinalrequest WHERE intRequestID=?",[req.params.requestidd], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.list = results;
    return next();
  });
}
function findclientlistno(req,res,next){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query(`SELECT * FROM tblinitialrequest WHERE intIRequestID=? AND intIRequest_No=?`,[req.params.requestid, req.params.requestno], function (err, results) {
    if (err) return res.send(err);
    req.request=results;
    console.log('');
    return next();
  });
}
function resultquery(req,res,next){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  db.query(`SELECT * FROM tblinitialrequest WHERE intIRequestID=? AND intIRequest_No=?`,[req.params.requestid, req.params.requestno], function (err, results) {
    if (!results[0])
    if (err) return res.send(err);
    console.log('');
      if (results[0].strIRequestGender == 'Any'){
        db2.query(`SELECT *
                    FROM
                        (SELECT a.intHWID, b.strType, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                        FROM tblhouseholdworker as a INNER JOIN tblhw_educbg as b on a.intHWID= b.intHWID_educbg  inner join tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID
                        ) as ta INNER JOIN
                        (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                          FROM tblhw_workbg
                          Group by intHWID_workbg) as tb 
                    ON tb.intHWID_workbg =  ta.intHWID
                    WHERE ((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService}) AND (age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2})
                            AND (strGender IN ('Male', 'Female')) AND (strType="${results[0].strIRequestEduc}")) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid} AND intRRequest_No =${req.params.requestno})
                    HAVING Work_exp >= ${results[0].intIRequestExp} `,function(err,results2){
          console.log('query1');
          if (err) return res.send(err);
          req.resulta = results2; 
          return next();
        })
      }
      else {
        db2.query(`SELECT *
                    FROM
                        (SELECT a.intHWID, b.strType, g.strName, f.strStatus, CONCAT(f.strFName,' ', f.strLName) AS hwname, a.intServiceID, a.strGender, TIMESTAMPDIFF(YEAR,a.datBirthDay,CURDATE()) as age
                        FROM tblhouseholdworker as a INNER JOIN tblhw_educbg as b on a.intHWID= b.intHWID_educbg  inner join tblmservice as g on a.intServiceID=g.intID inner join tbluser as f on a.intHWID = f.intID
                        ) as ta INNER JOIN
                        (SELECT intHWID_workbg, sum(intWorkEnd - intWorkStart) AS Work_exp
                          FROM tblhw_workbg
                          Group by intHWID_workbg) as tb 
                    ON tb.intHWID_workbg =  ta.intHWID
                    WHERE ((strStatus = 'Registered') AND (intServiceID = ${results[0].intITypeOfService}) AND (age BETWEEN ${results[0].intIRequestAge1} AND ${results[0].intIRequestAge2})
                            AND (strGender = '${results[0].strIRequestGender}') AND (strType="${results[0].strIRequestEduc}")) AND intHWID NOT IN(SELECT intRHWID FROM tblresults WHERE intRRequestID = ${req.params.requestid} AND intRRequest_No =${req.params.requestno})
                    HAVING Work_exp >= ${results[0].intIRequestExp} `,function(err,results2){
          console.log('query2');
          if (err) return res.send(err);
          req.resulta = results2; 
          return next();
        })

      }
  });
}
router.get('/transaction_result_:requestid:requestno', flog, findclientrequestspecific2, resultquery, findclientlistno, rendertransclientno);

// --------------------------------------------------------------------------------TRANSACTIONS ADD TO LIST
router.post('/transaction_add_to_list_:requestid:requestno:requesthw', flog, findclientrequestspecific2, resultquery, findclientlistno, addtolist);
function addtolist(req,res){
  var db = require('../../lib/database')();
  var db2  = require('../../lib/database')();
  db2.query(`SELECT * FROM tblresults WHERE intRRequestID = ${req.params.requestid} AND intRRequest_No =${req.params.requestno} AND intRHWID=${req.params.requesthw}`, function (err, results2) {
    if (err) return res.send(err);
      if (!results2[0]){
        console.log('wala pa laman kaya inadd')
        db.query(`INSERT INTO tblresults VALUES (?,?,?,'','')`, [req.params.requestid, req.params.requestno, req.params.requesthw], function (err, results) {
        }) 
      }
      else{
        // db.query(`INSERT INTO tblresults VALUES (?,?,?,'','')`, [req.params.requestid, req.params.requestno, req.params.requesthw], function (err, results) {
        //   if (err) return res.send(err);
          console.log('di pa naka add kaya inadd');
        // })
      }
    res.redirect('/admin/transaction_result_'+ req.params.requestid + req.params.requestno, flog, findclientrequestspecific2, resultquery, findclientlistno, rendertransclientno)
  })
}

// ------------------------------------------------------------------------------------------------------TRANSACTION: SEND TO HW, SEND TO CLIENT
function addfunctions(req,res){
  var db = require('../../lib/database')();
  if(req.body.btn1 == 'sendtohw'){
    db.query(`UPDATE tblresults SET strRHWStatus= 'Waiting' WHERE strRHWStatus='' AND intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
      res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
  else if(req.body.btn1 == 'cancelsendtohw'){
    db.query(`UPDATE tblresults SET strRHWStatus= '' WHERE strRHWStatus='Waiting' AND intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
    res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
  else if(req.body.btn1 == 'sendtoclient'){
    db.query(`UPDATE tblresults SET strRClientStatus= 'Waiting' WHERE strRClientStatus='' AND intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
    res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
  else if(req.body.btn1 == 'removefromlist'){
    db.query(`DELETE FROM tblresults WHERE intRRequestID = '${req.params.requestid}' AND intRRequest_No = '${req.body.reqno}' AND intRHWID = '${req.body.hwid}'`,function (err) {
      console.log(''+err);
    res.redirect('/admin/transaction_client_request_'+req.params.requestid, flog, findclientrequestspecific, findclientlistspecific, findclient, findselected, rendertransclientspecific);
    })
  }
}
router.post('/tr_add_actions_:requestid',flog, addfunctions);


// ------------------------------------------------------------------------------------------------------------------View HW Profile
function renderhwprofile(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_hw_profile',{usertab: req.user, hw1tab: req.hw1, hw2tab: req.hw2, hw3tab: req.hw3, listtab: req.list});
  else if(req.valid==1)
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
router.get('/hw_profile_:requestid:hwid', flog, findhw, findhweduc, findhwwork,  findclientrequestspecific, renderhwprofile)




// --------------------------------------------------------------------------------TRANSACTIONS SETTLEMENT
router.get('/transaction_settle', flog, findtranssettle, rendertranssettle);
function rendertranssettle(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_settle',{usertab: req.user, listtab: req.list});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findtranssettle(req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT CONCAT(b.strLName,', ', b.strFName) AS strName, strRequestType, datRequestDate, datRequestNeedDate, strRequestStatus, intRequestID FROM tblfinalrequest as a INNER JOIN tbluser as b ON a.intRequest_ClientID = b.intID WHERE a.strRequestStatus IN ('Approved') ORDER BY intRequestID Desc`, function (err, results) {
    console.log(err)
    for(var i = 0; i < results.length; i++){
      results[i].datRequestDate =  moment(results[i].datRequestDate).format("LL");
      results[i].datRequestNeedDate =  moment(results[i].datRequestNeedDate).format("LL");   
    }
    req.list = results;
    return next();
  });
}

router.post('/transaction_settledecision',flog, clientsettledecision);
function clientsettledecision(req,res){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  if(req.body.btn1='settle'){
    db2.query(`UPDATE tbltransaction SET strORNumber=?, datDateSettled=?, strTStatus='On-going' WHERE intTRequestID='${req.body.transid}'`,[req.body.ornum, req.body.datesettled], function (err) {
      console.log(err);
      db.query(`UPDATE tblfinalrequest SET strRequestStatus ='Finished' WHERE intRequestID='${req.body.transid}'`, function (err) {
      console.log(err);
        res.redirect('/admin/transaction_settle')
      });
    });
  }
  else{
    
  }
}
//----------------------------------------------------------------------------------TRANSACTIONS SETTLED
router.get('/transaction_settled', flog, findtranssettled, rendertranssettled);
function rendertranssettled(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_settled',{usertab: req.user, listtab: req.list});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}

function findtranssettled (req,res,next){
  var db = require('../../lib/database')();
  db.query(`SELECT CONCAT(b.strLName,', ', b.strFName) AS strName, intTRequestID, datDateSettled, strTStatus, DATE_ADD(datDateSettled, INTERVAL 6 MONTH) AS dateexpire FROM tbltransaction as a INNER JOIN tbluser as b ON a.intTClientID = b.intID WHERE a.strTStatus IN ('On-going') ORDER BY datDateSettled Desc`, function (err, results) {
    console.log(err)
    for(var i = 0; i < results.length; i++){
      results[i].datDateSettled =  moment(results[i].datDateSettled).format("LL");
      results[i].dateexpire =  moment(results[i].dateexpire).format("LL");   
    }
    req.list = results;
    return next();
  });
}
// --------------------------------------------------------------------------------TRANSACTIONS INVOICE
function rendertransinvoice(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_invoice',{usertab: req.user});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/transaction_invoice', flog, rendertransinvoice);

function rendertransinvoiceprint(req,res){
  if(req.valid==0)
    res.render('admin/views/transaction_invoice_print',{usertab: req.user});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/transaction_invoice_print', flog, rendertransinvoiceprint);


//=--------------------------------------------------------------------------------TRANSACTION CLIENT LIST
router.get('/client_list', flog, regifindclientlist, findmrequirementscl, renderregiclientlist);
function renderregiclientlist(req,res){
  if(req.valid==0)
    res.render('admin/views/client_list',{usertab: req.user, itemtab: req.item, requirementtab: req.requirement});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
function regifindclientlist(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client'", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function findmrequirementscl(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblmrequirements WHERE strType='Client' `, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.requirement = results;
    return next();
  });
}


// Approve client and reject client2
function approveClient2(req,res){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  if(req.body.btn1 == 'approve'){
    var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Unregistered' AND intID = ?";
    db.query(sql,[req.body.clientID],function (err) {
    if (err) return res.send(err)
    res.redirect('/admin/client_list');
    })
  }
  else if (req.body.btn1 == 'reject'){
    var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
    db2.query(sql,[req.body.clientID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/client_list');
    })
  }
  else if(req.body.btn1 == 'revert'){
    var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
    db.query(sql,[req.body.clientID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/client_list');
    })
  }
}
router.post('/tr_approve_client',flog,approveClient2);




// ---------------------------------------------------------------------------------TRANSACTION HWLIST
function findhwlist(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, tbluser.strStatus AS stat, CONCAT(strFName,' ', strLName) AS strNames FROM tbluser INNER JOIN tblhouseholdworker ON intHWID = tbluser.intID INNER JOIN tblmservice ON tblmservice.intID = intServiceID WHERE tbluser.strType='Household Worker'", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function findmrequirementshw(req, res, next){
  var db = require('../../lib/database')();
  db.query(`SELECT * FROM tblmrequirements WHERE strType='Household Worker' `, function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.requirement = results;
    return next();
  });
}
function renderhwlist(req,res){
  if(req.valid==0)
    res.render('admin/views/householdworker_list',{usertab: req.user, itemtab: req.item, requirementtab: req.requirement});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/householdworker_list', flog, findhwlist, findmrequirementshw, renderhwlist);

// HW APPROVE/REJECT/REVERT
function hwoptions(req,res){
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  console.log('xxxxxxxxxxxxx'+req.body.hwID)
  if(req.body.btn1 == 'approve'){
    var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Unregistered' AND intID = ?";
    db.query(sql,[req.body.hwID],function (err) {
    if (err) return res.send(err)
    res.redirect('/admin/householdworker_list');
    })
  }
  else if (req.body.btn1 == 'reject'){
    var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
    db2.query(sql,[req.body.hwID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/householdworker_list');
    })
  }
  else if(req.body.btn1 == 'revert'){
    var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
    db.query(sql,[req.body.hwID],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/householdworker_list');
    })
  }
}
router.post('/tr_approve_hw',flog,hwoptions);


// ------------------------------------------------------------------------------------------------------CLIENT PROFILE
router.get('/profile_client_:userid',flog, findprofclient, renderprofclient);
function renderprofclient(req,res){
  if(req.valid==0)
  res.render('admin/views/profile_client',{usertab: req.user, clienttab: req.client});
  else if(req.valid==1)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}
function findprofclient(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT *,CONCAT(strLName,', ', strFName) AS strName FROM tbluser INNER JOIN tblclient ON intID = intClientID WHERE intID=?",[req.params.userid], function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    console.log(results[0].intID+'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    req.client = results;
    return next();
  });
}

// ----------------------------------------------------------------------------------------------------HOUSEHOLD WORKER PROFILE
router.get('/profile_hw_:hwid',flog, findhw, findhweduc, findhwwork, renderprofhw);
function renderprofhw(req,res){
  if(req.valid==0)
  res.render('admin/views/profile_hw',{usertab: req.user, hw1tab: req.hw1, hw2tab: req.hw2, hw3tab: req.hw3});
  else if(req.valid==1)
  res.render('admin/views/invalidpages/normalonly');
  else
  res.render('login/views/invalid');
}



//---------------------------------------------------------------------------------HOUSEHOLD WORKER REGISTRATION
//dropdown(other skills)
function dropSkills(req, res, next){
  var db = require('../../lib/database')();
  db.query('SELECT * FROM tblmskills WHERE strStatus = "Active" ', function (err, results, fields) {
      if (err) return res.send(err);
      req.dropSkills = results;
      return next();
  });
}
function renderregistrationHW(req,res){
  // var educelem = ['hey', req.body.elemname, req.body.elemadd, req.body.elemyear];
  // console.log('xxxxxxxxxxxxx'+educelem[0]);
  if(req.valid==0)
    res.render('admin/views/registration_household_worker',{usertab: req.user, itemtab: req.item, dropskills: req.dropSkills});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/registration_household_worker', flog, findmservice, dropSkills,  renderregistrationHW);


router.post('/register_householdworker',(req, res) => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    // console.log('xxxxxxxxxxxxx'+educelem);
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  var db3 = require('../../lib/database')();
  var db41 = require('../../lib/database')();
  var db421 = require('../../lib/database')();
  var db422 = require('../../lib/database')();
  var db431 = require('../../lib/database')();
  var db432 = require('../../lib/database')();
  var db433 = require('../../lib/database')();
  var db441 = require('../../lib/database')();
  var db442 = require('../../lib/database')();
  var db443 = require('../../lib/database')();
  var db451 = require('../../lib/database')();
  var db452 = require('../../lib/database')();
  var db453 = require('../../lib/database')();
  var db454 = require('../../lib/database')();
  var db511 = require('../../lib/database')();
  var db512 = require('../../lib/database')();
  var db513 = require('../../lib/database')();
  var db514 = require('../../lib/database')();
  var db521 = require('../../lib/database')();
  var db522 = require('../../lib/database')();
  var db523 = require('../../lib/database')();
  var db531 = require('../../lib/database')();
  var db532 = require('../../lib/database')();
  var db541 = require('../../lib/database')();
  var db61 = require('../../lib/database')();
  var db62 = require('../../lib/database')();
  var db63 = require('../../lib/database')();
  var db64 = require('../../lib/database')();
  var db65 = require('../../lib/database')();
  var db66 = require('../../lib/database')();
  //tbl user
  db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus) VALUES ('${req.body.fname}', '${req.body.mname}', '${req.body.lname}', '', ?, 'blank.jpg', 'Household Worker', 'Unregistered')`,[retVal], (err) => {
    //find hw
    db2.query(`SELECT intID from tbluser WHERE strPassword=?`, [retVal], (err,results) => {
      if (err) console.log(err);
    //   // tbl hw
      db3.query(`INSERT INTO tblhouseholdworker VALUES 
                ('${results[0].intID}', 
                 '${req.body.service}', 
                 '${req.body.bday}',
                 '${req.body.gender}',
                 '${req.body.civilstatus}',  
                 '${req.body.citizenship}',
                 '${req.body.religion}',
                 '${req.body.height}',
                 '${req.body.weight}',
                 '${req.body.cellnum}',
                 '${req.body.telnum}',
                 '${req.body.housenum}',
                 '${req.body.street}',
                 '${req.body.municipality}',
                 '${req.body.city}',
                 '${req.body.paddress}',
                 '${req.body.baddress}',
                 '${req.body.skills}')`, (err) => {
                  if (err) console.log(err);

        if(req.body.elemname==''){
          console.log('hindi nakapag elem');
        }
        else if(req.body.elemname!='' && req.body.secondname==''){
          console.log('nakapag elem')
          db41.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername=='' && req.body.vocname==''){
          console.log('nakapag hs')
          db421.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db422.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername!='' && req.body.vocname==''){
          console.log('nakapag college')
          db431.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db432.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
          db433.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type3}', '${req.body.tername}', '${req.body.teradd}', '${req.body.teryear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername=='' && req.body.vocname!=''){
          console.log('nakapag voc')
          db441.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db442.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
          db443.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type4}', '${req.body.vocname}', '${req.body.vocadd}', '${req.body.vocyear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
        }
        else if(req.body.elemname!='' && req.body.secondname!='' && req.body.tername!='' && req.body.vocname!=''){
          console.log('all')
          db451.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type}', '${req.body.elemname}', '${req.body.elemadd}', '${req.body.elemyear}', '')`, (err) => {
            console.log(err);
          })
          db452.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type2}', '${req.body.secondname}', '${req.body.secondadd}', '${req.body.secondyear}', '')`, (err) => {
            console.log(err);
          })
          db453.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type4}', '${req.body.vocname}', '${req.body.vocadd}', '${req.body.vocyear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
          db454.query(`INSERT INTO tblhw_educbg VALUES ('${results[0].intID}', '${req.body.type3}', '${req.body.tername}', '${req.body.teradd}', '${req.body.teryear}', '${req.body.educskill}')`, (err) => {
            console.log(err);
          })
        }
        
        });
      if(req.body.workfrom1 !='' && req.body.workfrom2 !='' && req.body.workfrom3 !='' && req.body.workfrom4 !=''){
        db511.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
        db512.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp2}', '${req.body.workadd2}', '${req.body.workpos2}', '${req.body.workfrom2}', '${req.body.workto2}')`, (err) =>{
          console.log(err);
        })
        db513.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp3}', '${req.body.workadd3}', '${req.body.workpos3}', '${req.body.workfrom3}', '${req.body.workto3}')`, (err) =>{
          console.log(err);
        })
        db514.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp4}', '${req.body.workadd4}', '${req.body.workpos4}', '${req.body.workfrom4}', '${req.body.workto4}')`, (err) =>{
          console.log(err);
        })
      }
      else if(req.body.workfrom1 !='' && req.body.workfrom2 !='' && req.body.workfrom3 !='' && req.body.workfrom4 ==''){
        db521.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
        db522.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp2}', '${req.body.workadd2}', '${req.body.workpos2}', '${req.body.workfrom2}', '${req.body.workto2}')`, (err) =>{
          console.log(err);
        })
        db523.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp3}', '${req.body.workadd3}', '${req.body.workpos3}', '${req.body.workfrom3}', '${req.body.workto3}')`, (err) =>{
          console.log(err);
        })
      }
      else if(req.body.workfrom1 !='' && req.body.workfrom2 !='' && req.body.workfrom3 =='' && req.body.workfrom4 ==''){
        db531.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
        db532.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp2}', '${req.body.workadd2}', '${req.body.workpos2}', '${req.body.workfrom2}', '${req.body.workto2}')`, (err) =>{
          console.log(err);
        })
      }
      else if(req.body.workfrom1 !='' && req.body.workfrom2 =='' && req.body.workfrom3 =='' && req.body.workfrom4 ==''){
        db541.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '${req.body.workfrom1}', '${req.body.workto1}')`, (err) =>{
          console.log(err);
        })
      }
        db61.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Relative', '${req.body.name1}', '${req.body.add1}', '${req.body.occ1}', '${req.body.contact1}')`, (err) => {
          console.log(err);
        })
        db62.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Relative', '${req.body.name2}', '${req.body.add2}', '${req.body.occ2}', '${req.body.contact2}')`, (err) => {
          console.log(err);
        })
        db63.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Relative', '${req.body.name3}', '${req.body.add3}', '${req.body.occ3}', '${req.body.contact3}')`, (err) => {
          console.log(err);
        })
        db64.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Non-relative', '${req.body.name4}', '${req.body.add4}', '${req.body.occ4}', '${req.body.contact4}')`, (err) => {
          console.log(err);
        })
        db65.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Non-relative', '${req.body.name5}', '${req.body.add5}', '${req.body.occ5}', '${req.body.contact5}')`, (err) => {
          console.log(err);
        })
        db66.query(`INSERT INTO tblhw_ref VALUES ('${results[0].intID}', 'Non-relative', '${req.body.name6}', '${req.body.add6}', '${req.body.occ6}', '${req.body.contact6}')`, (err) => {
          console.log(err);
        })

      res.redirect('/admin/registration_household_worker');
      });
    });
});

//--------------------------------------------------------------------------------CLIENT REGISTRATION
function renderregistrationClient(req,res){
  if(req.valid==0)
    res.render('admin/views/registration_client',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/registration_client', flog, renderregistrationClient);

router.post('/register_client',(req, res) => {
  var db = require('../../lib/database')();
  var db2 = require('../../lib/database')();
  var db3 = require('../../lib/database')();
  db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus) VALUES ("${req.body.firstname}", "${req.body.middlename}", "${req.body.lastname}","${req.body.email}", "${req.body.password}", 'blank.jpg', "Client", "Unregistered")`, (err) => {
    if (err) console.log(err);
    db2.query(`SELECT * FROM tbluser WHERE strEmail=? and strPassword=?`,[req.body.email, req.body.password], (err, results)=>{
      if (err) console.log(err);
        db3.query(`INSERT INTO tblClient VALUES ("${results[0].intID}", "${req.body.contactnum}", "${req.body.housenum}", "${req.body.streetnum}","${req.body.province}", "${req.body.city}", "${req.body.permanentadd}", "${req.body.ofcaddress}", "${req.body.ofcnum}")`,(err) =>{
          if (err) console.log(err);
      })
    })
  });
  res.redirect('/admin/registration_client');
});


// 
// --------------------------------------------------------------------------------CLIENT
// Reinstate client
function reinstateClient(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Banned' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/client_list');
  });
}
// Ban Client
function banClient(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tbluser SET strStatus= 'Banned' WHERE strStatus='Registered' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/client_list');
});
}
router.get('/reinstate_client/:userid',flog,reinstateClient);
router.get('/ban_client/:userid',flog,banClient);

function findclientlist(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND (strStatus='Registered' OR strStatus='Banned')", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function renderclientlist(req,res){
  if(req.valid==0)
    res.render('admin/views/client_list',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/client_list', flog, findclientlist, renderclientlist);

// -------------------------------------------------------------------------------ClIENT PENDING REGISTRATION
// Approve client
function approveClient(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Unregistered' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/client_pending_registration');
  });
}
// Revert client
function revertClient(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/client_pending_registration');
  });
}
// reject Client
function rejectClient(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/client_pending_registration');
  });
}
router.get('/approve_client/:userid',flog,approveClient);
router.get('/revert_client/:userid',flog,revertClient);
router.get('/reject_client/:userid',flog,rejectClient);

function findclientregi(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Client' AND (strStatus='Unregistered' OR strStatus='Rejected') ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function renderclientregi(req,res){
  if(req.valid==0)
    res.render('admin/views/client_pending_registration',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/client_pending_registration', flog, findclientregi, renderclientregi);


// ---------------------------------------------------------------------------------HOUSEHOLD WORKER
// Reinstate Household Worker
function reinstateHW(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Banned' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/householdworker_list');
  });
}
// Ban Household Worker
function banHW(req,res){
var db = require('../../lib/database')();
var sql = "UPDATE tbluser SET strStatus= 'Banned' WHERE strStatus='Registered' AND intID = ?";
db.query(sql,[req.params.userid],function (err) {
  if (err) return res.send(err);
  res.redirect('/admin/householdworker_list');
});
}
router.get('/reinstate_householdworker/:userid',flog,reinstateHW);
router.get('/ban_householdworker/:userid',flog,banHW);




// -------------------------------------------------------------------------------Household Worker PENDING REGISTRATION
// Approve HW
function approveHW(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Registered' WHERE strStatus='Unregistered' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/householdworker_pending_registration');
  });
}
// Revert HW
function revertHW(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Unregistered' WHERE strStatus='Rejected' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/householdworker_pending_registration');
  });
}
// reject hw
function rejectHW(req,res){
  var db = require('../../lib/database')();
  var sql = "UPDATE tbluser SET strStatus= 'Rejected' WHERE strStatus='Unregistered' AND intID = ?";
  db.query(sql,[req.params.userid],function (err) {
    if (err) return res.send(err);
    res.redirect('/admin/householdworker_pending_registration');
  });
}
router.get('/approve_householdworker/:userid',flog,approveHW);
router.get('/revert_householdworker/:userid',flog,revertHW);
router.get('/reject_householdworker/:userid',flog,rejectHW);

function findhwregi(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Household Worker' AND (strStatus='Unregistered' OR strStatus='Rejected') ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}
function renderhwregi(req,res){
  if(req.valid==0)
    res.render('admin/views/householdworker_pending_registration',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');

}
router.get('/householdworker_pending_registration', flog, findhwregi, renderhwregi);

//----------------------------------------------------------------------------------UTILITIES
function findustaff(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT *, CONCAT(strFName,' ', strLName) AS strName FROM tbluser WHERE strType='Admin' ", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

function renderutilitiesStaff(req,res){
  if(req.valid==0)
    res.render('admin/views/utilities_staff',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
router.get('/utilities_staff', flog, findustaff, renderutilitiesStaff);

router.post('/add_staff',(req, res) => {
  var db = require('../../lib/database')();
  db.query(`INSERT INTO tbluser (strFName, strMName, strLName, strEmail, strPassword, strType, strStatus)  VALUES ("${req.body.firstname}", "${req.body.middlename}", "${req.body.lastname}", "${req.body.email}", "${req.body.password}", "${req.body.type}", "Registered")`, (err) => {
    if (err) console.log(err);
    res.redirect('/admin/utilities_staff');
    });
});

router.get('/utilities_fees', flog, findfees, renderutilfees);
function renderutilfees(req,res){
  if(req.valid==0)
    res.render('admin/views/utilities_fees',{usertab: req.user, itemtab: req.item});
  else if(req.valid==1)
    res.render('admin/views/invalidpages/normalonly');
  else
    res.render('login/views/invalid');
}
function findfees(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tblfee", function (err, results) {
    if (err) return res.send(err);
    if (!results[0])
    console.log('');
    req.item = results;
    return next();
  });
}

exports.admin= router;
