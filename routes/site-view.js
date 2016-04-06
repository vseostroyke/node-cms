var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../model/post');
var userController = require('../controller/userController');
var Post = mongoose.model('Post');


/* GET pages. */
router.get('/:permalink', function (req, res) {
    userController.findOne(req, res);
});

/* GET home page. */
router.get('/', function (req, res) {
    userController.findOne(req, res);
});

module.exports = router;











