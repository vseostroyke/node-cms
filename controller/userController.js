var userService = require('../service/userService');
require('../model/post');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
    findOne: function (req, res) {
        userService.findOne(req.param.permalink, function (err, results) {
            res.render('index', {
                title: results,
                evalResult: 'eval'
            });
        });
    }
};
