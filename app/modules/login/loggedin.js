
module.exports= (req,res,next)=>{
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE intID= ?",[req.session.user], function (err, results, fields) {
      if (err) console.log(err);
      if (!results[0])
        req.valid = 5;
      else if (results[0].strType =='Admin')
        req.valid = 0;
      else if ((results[0].strType =='Client' || results[0].strType =='Household Worker') && results[0].strStatus == 'Banned')
        req.valid = 6;
      else if(results[0].strType =='Household Worker')
        req.valid = 2;
      else if(results[0].strType =='Client')
        req.valid = 1;
      req.user = results;
      return next();
    });
  }
