var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
//var dotenv = require('dotenv');
var bodyParser = require('body-parser');

var app = express();

//require('dotenv').load();     //dotenv is for cloud9

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

app.use(express.static(__dirname + ''));

routes(app);    // pass the app as an argument for routes to use
var port = process.env.PORT || 8080;
app.listen(port);