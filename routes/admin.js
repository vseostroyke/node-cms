var express = require('express');
var router = express.Router();
var User = require('../model/user');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var _ = require('lodash-node');


router.get('/view', function (req, res, next) {
    res.render('admin/sections/view', {
        user: req.user,
        pageTitle: 'Админка',
        layout: "admin/layouts/admin-layout"
    });
});

router.get('/create-post', function (req, res, next) {
    if (req.query.id == null) {
        res.render('admin/sections/create-post', {
            pageTitle: 'Создать новую запись',
            layout: "admin/layouts/admin-layout"
        });
    } else {
        Post.findOne({_id: req.query.id}, function (err, post) {
            if (err || post == null) {
                res.redirect('/admin/view');
                return console.error(err);
            } else {
                res.render('admin/sections/create-post', {
                    pageTitle: 'Редактировать запись',
                    layout: "admin/layouts/admin-layout",
                    title: post.title,
                    header: post.header,
                    permalink: post.permalink,
                    dateCreation: post.dateCreation,
                    postContent: post.postContent,
                    id: post._id.toString()
                });
            }
        });
    }

});

router.post('/save-post', function (req, res, next) {

        if (req.body.id != null && req.body.id != "") {
            Post.findOne({_id: req.body.id}, function (err, post) {
                if (err || post == null) {
                    res.redirect('create-post');
                } else {
                    post.header = req.body.header;
                    _.merge(post, _.pick(req.body, _.pickSchema(Post, ['dateCreation', 'id'])));
                    post.save(function (err, inserted) {
                        if (inserted) {
                            res.redirect('create-post/?id=' + inserted._id.toString());
                        } else {
                            res.redirect('create-post');
                        }
                    });
                }

            });
        }
        else {
            var post = new Post(_.pick(req.body, _.pickSchema(Post, ['dateCreation', 'id'])));
            post.dateCreation = new Date();
            post.save(function (err, inserted) {
                if (inserted) {
                    res.redirect('create-post/?id=' + inserted._id.toString());
                } else {
                    res.redirect('create-post');
                }
            });
        }
    }
)
;


module.exports = router;


