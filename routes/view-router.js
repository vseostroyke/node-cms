var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../model/post');
var siteViewController = require('../controller/siteViewController');
var Post = mongoose.model('Post');


/* GET pages. */
router.get('/:permalink', function (req, res) {
    siteViewController.findOne(req, res);
});

/* GET home page. */
router.get('/', function (req, res) {
    siteViewController.findOne(req, res);
});

module.exports = router;











