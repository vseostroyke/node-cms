var cms = require('../model/cmsModel');
var mongoose = require('mongoose');
var postCategory =require('../model/postCategory');

cms.createModel("CategoryType", {
    id: mongoose.Schema.ObjectId,
    typeName: {type: String, required: true},
    categories: [postCategory]
});
