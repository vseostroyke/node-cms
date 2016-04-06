var mongoose = require('mongoose');
var cms = require('../model/cmsModel');

cms.createModel("Setting", {
    id: mongoose.Schema.ObjectId,
    theme: {type: String, required: true}
});
