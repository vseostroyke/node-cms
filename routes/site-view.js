var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../model/post');
var userController = require('../controller/userController');
var Post = mongoose.model('Post');
var async = require('async');


/* GET pages. */
router.get('/:permalink', function (req, res) {
    userController.findOne(req.params.permalink, function (err, results) {
        res.render('index', {
            title: results,
            //_id.id
            evalResult: 'eval'/*eval("var mongoose = require('mongoose');function r(r){return r} " +
             " userController.findOne('', r) results + results;")*/
        });
        //eval(" userController.findOne(req.params.permalink, function (err, results) {res.render('index', {title: results + '1'})})");

    })
});

/* GET home page. */
router.get('/', function (req, res) {
    userController.findOne(req.params.permalink, function (err, results) {
        res.render('index', {
            title: results
        })
    });
});

module.exports = router;











