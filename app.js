var app = express();
var router = express.Router();

var rndString = require('randomstring')
var express = require('express')
var bodyParser = require('body-parser')
var moment = require('moment-timezone')
var fs = require('fs')
var mongoose = require('mongoose')
var db = require('./mongo/database')
var passport = require('./passport')()
var schema = mongoose.Schema;

require('./func');

//server setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '₩1234567890-=~!@#$%^&*()_+'
}));
app.use(passport.initialize());
app.use(passport.session());

//router
var auth = require('./routes/auth')(express.Router(), db.User, passport, rndString);
var post = require('./routes/post')(express.Router(), db.Post, rndString, moment);

//router use
app.use('/',index);
app.use('/auth',auth);
app.use('/post',post);

app.listen(3000, function(){
    console.log("Server Running at 3000 port")
})

module.exports = app;