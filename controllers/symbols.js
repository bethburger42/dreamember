var express = require('express');
var Symbol = require('../models/symbol');
var router = express.Router();

router.route('/')
 .get(function(req, res) {
   Symbol.find(function(err, symbols) {
     if (err) return res.status(500).send(err);
     res.send(symbols);
   });
 })
 .post(function(req, res) {
   Symbol.create(req.body, function(err, item) {
     if (err) return res.status(500).send(err);
     res.send(item);
   });
 });

module.exports = router;