var express = require('express');
var router = express.Router();
var postController = require('../controller/postController');


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
        postController.findOne({_id: req.query.id}, function (err, post) {
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
        postController.saveOrUpdate(req, res);
    }
);


module.exports = router;


