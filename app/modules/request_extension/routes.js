var express = require('express');
var flog = require( '../login/loggedin');
var db = require('../../lib/database')();
var router = express.Router();
var moment = require('moment');

router.get('/', flog, findhw, render)
function render(req,res){
    if(req.valid==1)
    res.render('request_extension/views/index',{usertab: req.user, hwtab: req.hw});
    else if(req.valid==0)
    res.render('admin/views/invalidpages/normalonly');
    else
    res.render('login/views/invalid');
}
function findhw(req,res,next){
    db.query(`SELECT *
                FROM tbluser 
                INNER JOIN tblhouseholdworker ON intID=intHWID
                INNER JOIN tblcontract ON intConHWID=intHWID
                INNER JOIN tbltransaction ON intTRequestID=intConTransID
                INNER JOIN tblmservice as ts ON ts.intID = intServiceID
                WHERE intTClientID =? AND strCurStatus IN ('Current', 'On leave')`,[req.session.user], function(err,results){
                    if (err) res.send(err);
                    else{
                        for(var i = 0; i < results.length; i++){
                            results[i].datDateStarted =  moment(results[i].datDateStarted).format("LL");
                            results[i].datDateExpiry = moment(results[i].datDateExpiry).format('LL')
                          }
                          req.hw=results;
                          return next();

                    }
        
    })
}

exports.request_extension= router;