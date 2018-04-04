var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'redhat'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("----------MySql Connected!-----------");
  connection.query('USE node_js');
  connection.query('SELECT * FROM customers', function(err, rows){
  	router.get('/nidhi', function(req, res){
	  res.render('nidhi', {
	    title: rows[0].name,
		results: rows
	  });
	});
  });
});

var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb://localhost:27017';

MongoClient.connect(URL, function(err, client) {
  if (err) throw err;
  var db = client.db('my_mongo');
  console.log("----------mongodb Connected!-----------");
  var collection = db.collection('customers');
    collection.find({}).toArray(function(err, docs) {
      router.get('/contact', function(req, res){
		  res.render('contact', {
		    title: docs[0].name,
			results: docs
		  });
		});
      client.close();
    });
});

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/aboutUs', function(req, res){
  res.render('about', {
    title: 'About'
  });
});


module.exports = router;

