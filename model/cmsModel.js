var mongoose = require('mongoose');
var Schema = mongoose.Schema;
exports.createModel = function (name, model) {
    var modelSchema = Schema(model);
    module.exports = mongoose.model(name, modelSchema);
};
