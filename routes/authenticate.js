var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/user');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.get('/register', function (req, res) {
    res.render('admin/sections/register', {
        username: ""
    });
});

router.post('/register', function (req, res, next) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            return res.render("admin/register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('view');
            });
        });
    });
});


router.get('/login', function (req, res, next) {
    res.render('admin/sections/login', {
        username: "",
        layout: "admin/layouts/login-layout"
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.render('admin/sections/login', {
                failureFlash: 'Введите верные логин и(или) пароль',
                username: req.body.username,
                layout: "admin/layouts/login-layout"
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('view');
        });
    })(req, res, next);
});

router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;