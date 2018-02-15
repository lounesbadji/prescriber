import * as mongoose from "mongoose";
export interface IMedicineModel extends mongoose.Document {
    type: string;
    title: string;
    quantity: string;
    price: string;
}
