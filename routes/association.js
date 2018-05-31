var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Association = require('../models/Association.js');

/* GET ALL ASSOCIATION NAMES */
router.get('/', function(req, res, next) {
  Association.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE ASSOCIATION BY ID */
router.get('/:id', function(req, res, next) {
  Association.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ASSOCIATION */
router.post('/', function(req, res, next) {
  Association.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ASSOCIATION */
router.put('/:id', function(req, res, next) {
  Association.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ASSOCIATION */
router.delete('/:id', function(req, res, next) {
  Association.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
