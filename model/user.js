var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var modelSchema = Schema({
    username: String,
    password: String,
    email: String
});

modelSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", modelSchema);
