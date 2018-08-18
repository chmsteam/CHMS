var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var db = require('../../lib/database')();
    req.session.user = '';
    res.render('login/views/index');
});

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
  
  exports.login = router;