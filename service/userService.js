require('../model/post');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = {
    findOne: function (permalink, callback) {
        Post.findOne({permalink: permalink}, function (err, post) {
            if (err) {
                return console.error(err);
            }
            if (post == null) {
                callback(null, "null1");
            } else {
                callback(null, post.header);
            }
        });
    }
};
