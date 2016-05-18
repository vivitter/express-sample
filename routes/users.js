var express = require('express');
var router = express.Router();

// Definition of the user schema
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  id: String,
  password: String
});
var User = mongoose.model('User', UserSchema);

// Connect to DB
mongoose.connect('mongodb://localhost/tetsudb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, docs){
    if(err) {
      res.end('error');
    }

    var users = [];
    docs.forEach(function(doc){
      users.push(doc);
    });
    res.json(users);
  });
});

router.post('/', function(req, res) {
  var new_user = req.body;
  console.log(new_user);

  var user = new User();
  user.id = new_user.id;
  user.password = new_user.password;
  user.save(function(err){
    if(err){
      console.log(err);
    }
  })
  res.end('ok');
});

module.exports = router;
