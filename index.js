var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();
var User = require('./models/user');

var secret = "superdupersecretpassword";

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = process.env['MONGOLAB_URI'];
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
mongoose.connect(mongooseUri || 'mongodb://localhost/dreams');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/dreams', expressJWT({secret: secret}));
app.use('/api/users', expressJWT({secret: secret})
.unless({path: ['/api/users'], method: 'post'}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.post('/api/auth', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.use('/api/dreams', require('./controllers/dreams'));
app.use('/api/users', require('./controllers/users'));
app.use('/api/symbols', require('./controllers/symbols'));

app.get('*/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000)