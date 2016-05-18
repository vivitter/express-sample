var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Get Users Documents
  request.get('http://localhost:3000/users', function(error, response, body){
    var docs = JSON.parse(response.body);
    res.render('index', { title: 'Express', users: docs });
  });
});

// Register new user
router.post('/', function(req, res) {
  // Create new user object
  var user = {
    id: req.body.id,
    password: req.body.password
  };

  // Request Option
  var options = {
    url: 'http://localhost:3000/users',
    form: user,
    json: true
  }

  // Post request to User API
  request.post(options, function(error, response, body){
    res.redirect('/');
  })
})

module.exports = router;
