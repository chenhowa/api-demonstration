/*
Program Name: 	Practice Sessions and Requests
Author:			Howard Chen
Last Modified:	2-28-2017
Description: 	Implements a set of webpages that showcase the usage of the Olark
				Chatbox API. The main page will make explanations and link to
				other pages that demonstrate the library.
*/

//
//Boilerplate Code from the lectures to set up the express-handlebars-bodyParser-sessions-request system.
//
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); //names are assumed to be .handlebars files.
app.set('port', 4432);   //while you're logged in to flip this should be all right

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set up sessions for this app
var session = require('express-session');
app.use(session({secret:'potato'}));

//Set up request for this app
var request = require('request');

app.use(express.static('public'));

app.get('/', function(req, res, next) {
	context = {};
	context.script = "test.js"
	res.render('explanation',context);
});

app.get('/example_1', function(req, res, next) {
	res.render('example_1');
});

app.get('/example_2', function(req, res, next) {
	res.render('example_2');
});

app.get('/example_3', function(req, res, next) {
	res.render('example_3');
});



//Handle requests for unknown resources.
app.use(function(req,res) {
	res.status(404);
	res.render('404');
});

//handle server errors.
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.type('plain\text');
	res.status(500);
	res.render('500');
});



//Start the app.
app.listen(app.get('port'), function() {
	console.log("Check started on port " + app.get("port") + "; press Ctrl-C to terminate.");
});