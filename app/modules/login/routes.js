var express = require('express');
var router = express.Router();
var signupRouter = express.Router();
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var mailer =  nodemailer.createTransport({
	service: 'gmail',
	port: 25,
	secure: true,
	auth:{
		user: 'testchms123@gmail.com',
		pass: 'wordpass123456' //pass ng email
	}
});

router.get('/', (req, res) => {
    var db = require('../../lib/database')();
    req.session.user = '';
    res.render('login/views/index');
});
//sending suggestions
router.post('/suggestion', (req, res) =>{
    console.log(req.body.email)
      mailer.sendMail({
        from: req.body.email,
        to: 'testchms123@gmail.com',
        subject: 'Customer Suggestion, from ' + req.body.email,
        html:
            "<p> Hi greetings, Im " + req.body.name + "</p>" + 
            "<p>"+ req.body.msg + "</p>",
        template: 'send', //name ng html file na irerender
        },
        function(err, response){
            if(err){
                console.log("Bad email");
                console.log(err);
            }
            else{
                console.log("sent");
                }
            }
        );
    res.redirect('/login');
  })
router.post('/', (req, res) => {
  var db = require('../../lib/database')();
  if(req.body.email === "" || req.body.password === ""){
    res.render('login/views/invalidpages/blank');
  }
  else{
    db.query("SELECT * FROM tbluser WHERE strEmail= ? ",[req.body.email], (err, results, fields) => {
        if (err) console.log(err);
        if (!results[0]){
          res.render('login/views/invalidpages/incorrect');
        }
        else if ( results[0].strStatus == 'Unregistered' || results[0].strStatus == 'Rejected'){
          res.render('login/views/invalidpages/unreg');
        }
        else if ( results[0].strStatus == 'Banned'){
          res.render('login/views/invalidpages/banned');
        }
        else if(req.body.password === results[0].strPassword){
          req.session.user = results[0].intID;
          if(results[0].strType != 'Admin' && results[0].strType != 'Household Worker')
            res.redirect('/home_client');
          else if(results[0].strType != 'Admin' && results[0].strType != 'Client')
            res.redirect('/home_householdworker');
          else if(results[0].strType != 'Household Worker' && results[0].strType != 'Client')
            res.redirect('/admin');
        }
        else{
            res.render('login/views/invalidpages/incorrect');
        }
      });
    }
  });

signupRouter.route('/client')
    .get((req, res) => {
      req.session.user = '';
      res.render('login/views/regiClient');
    })
    .post((req, res) => {
        var db = require('../../lib/database')();
        if(req.body.password === req.body.conpassword && req.body.password != ""){
          db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus) VALUES ("${req.body.firstname}", "${req.body.middlename}", "${req.body.lastname}","${req.body.email}", "${req.body.password}", 'blank.jpg', "Client", "Unregistered")`, (err) => {
            if (err) console.log(err);
            db.query(`SELECT * FROM tbluser WHERE strEmail=? and strPassword=?`,[req.body.email, req.body.password], (err, results)=>{
              if (err) console.log(err);
                db.query(`INSERT INTO tblClient VALUES ("${results[0].intID}", "${req.body.contactnum}", "${req.body.housenum}", "${req.body.streetnum}","${req.body.province}", "${req.body.city}", "${req.body.permanentadd}", "${req.body.ofcaddress}", "${req.body.ofcnum}")`,(err) =>{
                  if (err) console.log(err);
              })
            })
          });
          res.send('success')
        }
        else{
          res.send('notmatch')
        }
        
      });
//---dropdowns
//services
function dropServices(req, res, next){
  var db = require('../../lib/database')();
  db.query('SELECT * FROM tblmservice WHERE strStatus = "Active" ', function (err, results, fields) {
      if (err) return res.send(err);
      req.dropServices = results;
      return next();
  });
}
//otherskills
function dropSkills(req, res, next){
  var db = require('../../lib/database')();
  db.query('SELECT * FROM tblmskills WHERE strStatus = "Active" ', function (err, results, fields) {
      if (err) return res.send(err);
      req.dropSkills = results;
      return next();
  });
}
signupRouter.route('/household_worker')
    .get(dropServices, dropSkills,(req, res) => {
      req.session.user = '';
      res.render('login/views/regiHousehold',{
        services: req.dropServices,
        dropskills: req.dropSkills
      });
    })
    .post((req, res) => {
        var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
          }
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
      db.query(`INSERT INTO tbluser(strFName, strMName, strLName, strEmail, strPassword, strPicture, strType, strStatus) VALUES ('${req.body.fname}', '${req.body.mname}', '${req.body.lname}', '${req.body.eaddress}', ?, 'blank.jpg', 'Household Worker', 'Unregistered')`,[retVal], (err) => {
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
          else{
            db511.query(`INSERT INTO tblhw_workbg VALUES ('${results[0].intID}', '${req.body.workcomp1}', '${req.body.workadd1}', '${req.body.workpos1}', '0', '0')`, (err) =>{
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

          res.send('success')
          });
        });
      });
signupRouter.route('/Terms_and_Conditions')
    .get((req, res) => {
      req.session.user = '';
      res.render('login/views/terms');
    })

exports.login = router;
exports.registration = signupRouter;