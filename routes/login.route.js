"use strict";
var UserModel_1 = require("../model/user/model/user.model.ts");
var CryptoJS = require('crypto-js');
var LoginRoute = (function () {
    function LoginRoute() {
    }
    LoginRoute.login = function (req, res) {
        var param = JSON.parse(Object.keys(req.body)[0]);
        UserModel_1.UserModel.checkUser(param.username, function (user, error) {
            if (user) {
                if (user.password == CryptoJS.HmacSHA1(param.password, '1234').toString()) {
                    res.status(200).send({ data: user, error: null });
                }
                else {
                    res.status(401).send({ data: null, error: 'Nom de compte ou mot de passe incorrect.' });
                }
            }
            else {
                res.status(401).send({ data: null, error: 'Nom de compte ou mot de passe incorrect.' });
            }
        });
    };
    return LoginRoute;
}());
exports.LoginRoute = LoginRoute;
