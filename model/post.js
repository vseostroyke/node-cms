var cms = require('../model/cmsModel');
var mongoose = require('mongoose');
var postCategory = require('../model/postCategory');

cms.createModel("Post", {
    id: mongoose.Schema.ObjectId,
    header: {type: String, required: true},
    title: {type: String, required: true},
    description: String,
    keywords: String,
    postContent: String,
    permalink: {type: String, required: true, unique: true},
    dateCreation: {type: Date, default: Date.now, required: true},
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},
    status: {type: String, enum: ['DRAFT', 'PUBLISHED']},
    categories: [postCategory]
});
