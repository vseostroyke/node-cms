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
    },

    findOne: function (params, callback) {
        postService.findOne(params, callback);
    },

    findAll: function (req, res) {
        postService.findAll({}, function (err, posts) {
            res.render('admin/sections/all-posts', {
                posts: posts,
                pageTitle: 'Все записи',
                layout: "admin/layouts/admin-layout"
            });
        });
    }
};
