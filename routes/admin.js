var express = require('express');
var router = express.Router();
var User = require('../model/user');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');


router.get('/view', function (req, res, next) {
    res.render('admin/sections/view', {
        user: req.user,
        pageTitle: 'Админка',
        layout: "admin/layouts/admin-layout"
    });
});

router.get('/create-post', function (req, res, next) {
    res.render('admin/sections/create-post', {
        pageTitle: 'Создать новую запись',
        layout: "admin/layouts/admin-layout"
    });
});

router.get('/create-post/:id', function (req, res, next) {
    Post.findOne({_id: req.params.id}, function (err, post) {
        if (err) {
            return console.error(err);
        }
        if (post == null) {
            res.render('admin/sections/create-post', {
                pageTitle: 'Создать новую запись',
                layout: "admin/layouts/admin-layout"
            });
        } else {
            res.render('admin/sections/create-post', {
                pageTitle: 'Создать новую запись',
                layout: "admin/layouts/admin-layout",
                title: post.title,
                header: post.header,
                permalink: post.permalink,
                dateCreation: post.dateCreation,
                content: post.content
            });
        }
    });

});

router.post('/save-post', function (req, res, next) {
    var post = new Post({
        "header": req.body.header,
        "title": req.body.title,
        "permalink": req.body.permalink,
        "content": req.body.content,
        "dateCreation": new Date()
    });
    post.save(function (err, inserted) {
        if (inserted) {
            res.redirect('create-post/' + inserted._id.toString());
        } else {
            res.render('admin/sections/create-post/', {
                pageTitle: 'Создать новую запись',
                layout: "admin/layouts/admin-layout"
            });
        }
    });
});


module.exports = router;


