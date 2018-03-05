import express = require("express")
import {UserDAO} from "../mongo/dao/user/user.dao";

export class SignupRoute {
    static signup(req: express.Request, res: express.Response) {
        let user = req.body;
        UserDAO.addUser(user, (userAdded, error) => res.status(error ? 401 : 200).send(error ? error : userAdded));
    }
}
