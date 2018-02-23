const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passpost = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// //db connection
mongoose.connect(config.database, () => {
  console.log('*Connected to database --- '+config.database);
});

const app = express();

const users = require('./routes/users');
//Port Number
const port = 3000;

//cors middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.user(passport.session());

//User route
app.use('/users', users);

//Index
app.get('/', (req,res) => {
    res.send("Invalid endpoint");
});

app.listen(port, () =>{
    console.log('------------------------------');
    console.log('*Server started on port: '+port);
    console.log('------------------------------');
});
