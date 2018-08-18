require('dotenv').config();
var express = require('express');
var winston = require('winston');
var bodyParser= require('body-parser');
var app = express();

var nodemailer= require('nodemailer');
var xoauth2= require('xoauth2');

require('./app')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(app.get('port'), () => {
    console.log(`ExpressJS server listening to port ${app.get('port')}`);
});

