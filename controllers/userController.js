const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');


var postSignup = (req, res)=>{
    const {firstname, lastname, email, username, password, password2} = req.body;
    let errors = [];

    if(!firstname || !lastname || !email || !username || !password || !password2){
        return res.json({status: false, msg:'Please fill all the require filled'});
    }
    if(password.length < 7){
        return  res.json({status: false, msg:'Password needs to be atleast 7 charecters'});
    }
    if(password != password2){
        return res.json({status: false, msg:'Passwords do not match'});
    }
    if(errors.length > 0){
        res.json({status: false, msg:'Something went wrong'});
    }
    else{
        User.findOne({$or:[{email: email},{username:username}]})
        .then(user=>{
            if(user){
                res.json({status: false, msg:'User already exists, Please check with username or Email'});
            }
            else{
                const newUser = new User({
                    firstname, lastname, email, username, password
                });
                bcrypt.genSalt(10, (err,salt)=> bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(reguser=>{
                        res.render('index');
                        res.json({status: true, msg:'You`re Successfully registered'});
                    })
                    .catch(err=>console.log(err));
                }))
            }
        })
    }
}

var postSignin = (req,res,next)=>{
    passport.authenticate('useru',{
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
      })(req, res, next);
}

var signOut =(req, res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
}
module.exports={postSignup, postSignin, signOut}