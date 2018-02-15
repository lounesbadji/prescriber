import * as mongoose from "mongoose";
export interface IUserModel extends mongoose.Document {
    email: string,
    firstName: string,
    lastName: string,
    picture?: string,
    password: string,
    role: string,
    lastActivity: Date
    visitors?: string[],
    doctors?: string[],
    medicines?: string[]
}
