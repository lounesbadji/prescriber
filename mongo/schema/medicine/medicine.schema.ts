import * as mongoose from "mongoose";
import {IMedicineModel} from "../../model/medicine/medicine.model";
export let Schema = mongoose.Schema;
export let Mixed = mongoose.Schema.Types.Mixed;

let schema = new Schema({
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
}).pre('save', function(next) {
    next();
    return this;
});

export const Medicine = mongoose.model<IMedicineModel>('medicine', schema);
