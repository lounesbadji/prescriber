"use strict";
var mongoose = require('mongoose');
exports.Schema = mongoose.Schema;
exports.ObjectId = mongoose.Schema.Types.ObjectId;
exports.Mixed = mongoose.Schema.Types.Mixed;
var schema = new exports.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Array(String),
        required: false
    },
    createdAt: {
        type: Date,
        required: false
    }
}).pre('save', function (next) {
    if (this._doc) {
        var doc = this._doc;
        var now = new Date();
        if (!doc.picture)
            doc.picture = "";
        if (!doc.createdAt)
            doc.createdAt = now;
    }
    next();
    return this;
});
exports.User = mongoose.model('user', schema);
