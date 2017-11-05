var express = require('express')
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport')
var schema = mongoose.Schema;

//server setting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '₩1234567890-=~!@#$%^&*()_+'
}));

//router
var index = require('./routes/index');
var auth = require('./routes/auth');
var post = require('./routes/post');
var twitter = require('./routes/twitter');

app.use(passport.initialize());
app.use(passport.session());

//router use
app.use('/', index);
app.use('/auth',auth);
app.use('/post',post);
app.use('/twitter', twitter)

app.listen(8681, function(){
    console.log("Server Running at 3000 port")
})

module.exports = app;