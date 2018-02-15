import express = require("express")
import CryptoJS = require('crypto-js');
import {UserDAO} from "../mongo/dao/user/user.dao";

export class LoginRoute {

    static login(req: express.Request, res: express.Response) {

        let param = req.body;

        UserDAO.login(param.email, (user, error) => {

            let successPayload = user;
            let errorPayload = {data: null, error: 'Nom de compte ou mot de passe incorrect.'};

            if (user) {

                let hashedPass = CryptoJS.SHA256(param.password).toString();
                let passIsCorrect: boolean = (user.password == hashedPass);

                if (passIsCorrect) {
                    res.status(200).send(successPayload);
                }
                else {
                    res.status(401).send(errorPayload);
                }
            }
            else {
                res.status(401).send(errorPayload);
            }

        });
    }
}
