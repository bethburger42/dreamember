var express = require('express');
var Dream = require('../models/dream');
var router = express.Router();

router.get('/', function(req, res) {
  Dream.find(function(err, dreams) {
    if (err) return res.send({message: 'An error occurred when finding your dreams.'});
    res.send(dreams);
  });
});

// router.post('/', function(req, res) {
//   Dream.create(req.body, function(err, dreams) {
//     if (err) return res.send({message: 'An error occurred when creating this dream.'});
//     res.send(dream);
//   });
// });

router.post('/', function(req, res) {
  var dream = new Dream(req.body);
  dream.save(function(err) {
    if (err) return res.send({message: 'An error occurred when creating an airplane'});
    res.send(airplane);
  });
});

router.get('/:id', function(req, res) {
  Dream.findById(req.params.id, function(err, dream) {
    if (err) return res.send({message: 'This dream not found'});
    res.send(dream);
  });
});

router.put('/:id', function(req, res) {
    Dream.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
});

router.delete('/:id', function(req, res) {
  Dream.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.send({message: 'This dream not found'});
    res.send({message: 'Dream deleted'});
  });
});

module.exports = router;
