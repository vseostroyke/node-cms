var cms = require('../model/cmsModel');
var mongoose = require('mongoose');
var categoryType =  require('../model/categoryType');

cms.createModel("PostCategory", {
    id: mongoose.Schema.ObjectId,
    name: {type: String, required: true},
    title: {type: String, required: true},
    description: String,
    keywords: String,
    content: String,
    permalink: {type: String, required: true},
    categoryType: categoryType
});
