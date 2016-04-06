var postService = require('../service/postService');
require('../model/post');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
    findOne: function (req, res) {
        postService.findOne({permalink: req.param.permalink}, function (err, results) {
            if (results == null) {
                results = {header: "null1"};
            }
            res.render('index', {
                title: results.header,
                evalResult: 'eval'
            });
        });
    }
};
