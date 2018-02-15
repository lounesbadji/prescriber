"use strict";
var mongoose = require("mongoose");
exports.Schema = mongoose.Schema;
exports.Mixed = mongoose.Schema.Types.Mixed;
var schema = new exports.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: false
    }
}).pre('save', function (next) {
    next();
    return this;
});
exports.Medicine = mongoose.model('medicine', schema);
//# sourceMappingURL=medicine.schema.js.map