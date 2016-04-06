var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ = require('lodash-node');

_.mixin({
    pickSchema: function (model, excluded) {
        var fields = [];
        model.schema.eachPath(function (path) {
            _.isArray(excluded) ? excluded.indexOf(path) < 0 ? fields.push(path) : false : path === excluded ? false : fields.push(path);
        });
        return fields;
    }
});

exports.createModel = function (name, model) {
    var modelSchema = Schema(model);
    module.exports = mongoose.model(name, modelSchema);
};
