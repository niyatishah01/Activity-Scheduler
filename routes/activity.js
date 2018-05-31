var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Activity = require('../models/Activity.js');

/* GET ALL ACTIVITY NAMES */
router.get('/', function(req, res, next) {
  Activity.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE ACTIVITY BY ID */
router.get('/:id', function(req, res, next) {
  Activity.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ACTIVITY */
router.post('/', function(req, res, next) {
  Activity.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ACTIVITY */
router.put('/:id', function(req, res, next) {
  Activity.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ACTIVITY */
router.delete('/:id', function(req, res, next) {
  Activity.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
