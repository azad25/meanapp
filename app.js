const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// //db connection
mongoose.connect(config.database, () => {
  console.log('*Connected to database --- '+config.database);
  console.log('------------------------------');
});

const app = express();

const users = require('./routes/users');
//Port Number
const port = 3590;

//cors middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

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
