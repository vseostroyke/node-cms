require('../model/post');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var _ = require('lodash-node');

module.exports = {
    findOne: function (params, callback) {
        Post.findOne(params, function (err, post) {
            if (err) {
                //res.redirect('/');//TODO: error page
                return console.error(err);
            }
            return callback(err, post);
        });
    },

    saveOrUpdate: function (req, res, callback) {
        if (req.body.id != null && req.body.id != "") {
            this.findOne({_id: req.body.id}, function (err, post) {
                if (err || post == null) {
                    res.redirect('create-post');
                } else {
                    post.header = req.body.header;
                    _.merge(post, _.pick(req.body, _.pickSchema(Post, ['dateCreation', 'id'])));
                    return post.save(callback);
                }
            });
        } else {
            var post = new Post(_.pick(req.body, _.pickSchema(Post, ['dateCreation', 'id'])));
            post.dateCreation = new Date();
            return post.save(callback);
        }
    }
};
