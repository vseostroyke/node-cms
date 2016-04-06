var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/site-view');
var admin = require('./routes/admin');
var compression = require('compression');
var passport = require('passport');
var User = require('./model/user');
var LocalStrategy = require('passport-local').Strategy;

require('./db/mongo-config');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout', 'layout');
app.set('partials',  {
    leftmenu: "admin/sections/left-menu"
});
app.enable('view cache');//TODO: cahe
app.set('view cache lifetime', 1000 * 4);
app.engine('html', require('hogan-express'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.use(requireLogin);
function requireLogin(req, res, next) {
    if (req.user != null && req.originalUrl != '/admin/login' && req.originalUrl != '/admin/logout') {
        next(); // allow the next route to run
    } else {
        // require the user to log in
        if (req.originalUrl == '/admin/login' || req.originalUrl == '/admin/logout') {
            next()
        } else {
            res.redirect("/admin/login"); // or render a form, etc.                                 }
        }

    }
}
app.use('/admin/', admin);

app.use(compression());


// passport config

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


