const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Register
router.post('/register', (req,res,next)=>{
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });

    User.addUser(newUser, (err,user) => {
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
router.get('/authenticate', (req,res,next)=>{
    res.send('authenticate');
});

//Profile
router.get('/profile', (req,res,next)=>{
    res.send('profile');
});

//Validate
router.get('/validate', (req,res,next)=>{
    res.send('validate');
});

module.exports = router;
