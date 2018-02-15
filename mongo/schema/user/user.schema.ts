import * as mongoose from "mongoose";
import {IUserModel} from "../../model/user/user.model";
export let Schema = mongoose.Schema;
export let Mixed = mongoose.Schema.Types.Mixed;

let schema = new Schema({
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
        type: Array(Mixed) || null,
        required: false
    },
    doctors: {
        type: Array(Mixed) || null,
        required: false
    },
    medicines: {
        type: Array(Mixed) || null,
        required: false
    }
}).pre('save', function(next) {
    if (this._doc) {
        let doc = <IUserModel>this._doc;

        if (!doc.picture)
            doc.picture = "";

        if(!doc.lastActivity)
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

export const User = mongoose.model<IUserModel>('user', schema);
