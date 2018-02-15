import express = require("express")
import {UserDAO} from "../mongo/dao/user/user.dao";
import {IUserModel} from "../mongo/model/user/user.model";

export class UsersRoute {
    static getUsers(req: express.Request, res: express.Response) {
        UserDAO.getUsers((users, err)=>{
            if(err)res.status(401).send({data: users,error: err})
            else res.status(200).send({data: users,error: err})
        });
    }

    static getUser(req: express.Request, res: express.Response) {
        let user: IUserModel= req.query;
        UserDAO.getUser(user.email,(user, err)=>{
            if(err)res.status(401).send({data: user,error: err})
            else res.status(200).send({data: user,error: err})
        });
    }

    static updateUser(req: express.Request, res: express.Response) {
        let user: IUserModel = JSON.parse(Object.keys(req.body)[0]);
        console.log("USER RECIEIVED : ", user);
        UserDAO.updateUser(user,(user, err)=>{
            if(err)res.status(401).send({data: user,error: err});
            else res.status(200).send({data: user,error: err});
        });
    }

    static getAllDoctors() {

    }

    static getUserDoctors() {

    }
}
