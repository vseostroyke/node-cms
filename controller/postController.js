var postService = require('../service/postService');
require('../model/post');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
    saveOrUpdate: function (req, res) {
        postService.saveOrUpdate(req, res, function (err, inserted) {
            if (inserted) {
                res.redirect('create-post/?id=' + inserted._id.toString());
            } else {
                res.redirect('create-post');
            }
        });
    }
};
