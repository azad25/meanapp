const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const userdata = require('../models/user');

//Register
router.post('/register', (req,res,next)=>{
    let newUser = new userdata({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    userdata.addUser(newUser, (err,user) => {
      if(err){
        res.json({
          succsess:false,
          msg: 'Failed to register'
        });
      }else{
        res.json({
          succsess:true,
          msg: 'Registered'
        });
      }
    });
});


//Authenticate
router.post('/authenticate', (req,res,next) => {
  const username = req.body.username;
  const password = req.body.password;

  userdata.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({
        succsess: false,
        msg: 'User not found'
      });
    }

    userdata.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 86400 //1 day
        });

        res.json({
          succsess: true,
          token: 'JWT ' + token,
          usercache: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      }else{
        return res.json({
          succsess: false,
          msg: 'Invalid Credentials'
        });
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}),
  (req,res,next) => {
    res.json({
      user: req.user
    });
});

//Validate
router.get('/validate', (req,res,next)=>{
    res.send('validate');
});

module.exports = router;
