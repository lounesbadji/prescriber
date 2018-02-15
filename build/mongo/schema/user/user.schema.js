"use strict";
var mongoose = require("mongoose");
exports.Schema = mongoose.Schema;
exports.Mixed = mongoose.Schema.Types.Mixed;
var schema = new exports.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    role: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    lastActivity: {
        type: Date,
        required: false
    },
    visitors: {
        type: Array(exports.Mixed) || null,
        required: false
    },
    doctors: {
        type: Array(exports.Mixed) || null,
        required: false
    },
    medicines: {
        type: Array(exports.Mixed) || null,
        required: false
    }
}).pre('save', function (next) {
    if (this._doc) {
        var doc = this._doc;
        if (!doc.picture)
            doc.picture = "";
        if (!doc.lastActivity)
            doc.lastActivity = new Date();
        if (doc.role === 'doctor') {
            doc.doctors = null;
            doc.medicines = null;
            doc.visitors = [];
        }
        if (doc.role === 'visitor') {
            doc.visitors = null;
            doc.medicines = [];
            doc.doctors = [];
        }
    }
    next();
    return this;
});
exports.User = mongoose.model('user', schema);
//# sourceMappingURL=user.schema.js.map