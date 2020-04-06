const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const dotend = require('dotenv').config();
const {spawn} = require("child_process");

const {ensureAuthenticated} = require('./config/auth')

//links routes
const routes = require('./routes/index');

require(`./config/passport`)(passport);
const app = express();
app.use(express.json());

app.set('view engine', 'ejs')

//DB connection
mongoose.connect(process.env.mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
let db = mongoose.connection;
/*Check connection*/
db.once('open', function () {
    console.log("Connected to Database");
  });
  
  /*Check for DB error */
  db.on('error', function (err) {
    console.log(`Error occured while connecting to DB - ${err}`);
  });

  app.use(express.urlencoded({ extended : false}));

//express middleware
app.use(
    session({
        secret: 'Rahulsecret',
        resave: true,
        saveUninitialized: true
    }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); 

app.use(function(req, res, next) { 
    res.locals.currentuser = req.user;
    res.locals.login = req.isAuthenticated();
    
    // res.locals.success_msg = req.flash('success_msg');
    // res.locals.error_msg = req.flash('error_msg');
    // res.locals.error = req.flash('error');
    next();
  });

app.use('/',express.static('public'));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users') );

 
app.get('/ai',  (req, res)=>{
    let name = res.locals.currentuser.firstname
    //console.log(name)
    var process = spawn('python',['./pyController/test.py', req.query.firstname, req.query.lastname]);
    process.stdout.on('data', (data)=>{
        console.log(data.toString());
        res.send("data.toString()");
    })
});

const port =process.env.PORT;
app.listen(port, console.log(`Server connected to port ${port}`));