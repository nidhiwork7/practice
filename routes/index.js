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
  	console.log('The solution is: ', rows);
  	router.get('/nidhi', function(req, res){
	  res.render('nidhi', {
	    title: rows[0].name,
		results: rows
	  });
	});
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

router.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

module.exports = router;

