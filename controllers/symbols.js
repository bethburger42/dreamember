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

// router.route('/:id')
//  .get(function(req, res) {
//    Item.findById(req.params.id, function(err, item) {
//      if (err) return res.status(500).send(err);
//      res.send(item);
//    });
//  })
//  .put(function(req, res) {
//    Item.findByIdAndUpdate(req.params.id, req.body, function(err) {
//      if (err) return res.status(500).send(err);
//      res.send({'message': 'success'});
//    });
//  })
//  .delete(function(req, res) {
//    Item.findByIdAndRemove(req.params.id, function(err) {
//      if (err) return res.status(500).send(err);
//      res.send({'message': 'success'});
//    });
//  });

module.exports = router;