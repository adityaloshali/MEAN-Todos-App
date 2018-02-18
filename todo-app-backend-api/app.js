var express = require('express');
var app = express();
var bluebird = require('bluebird');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');

var api = require('./routes/api.route');

var mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
  .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp`)})
  .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/todoapp`)});

//To allow Cross Origin Request(Request from our Angular Frontend)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

app.listen(3000,function(){
   console.log("Todo App server has started");
});
