"use strict";
var UserModel_1 = require("../model/user/model/user.model.ts");
var SignupRoute = (function () {
    function SignupRoute() {
    }
    SignupRoute.signup = function (req, res) {
        var user = JSON.parse(Object.keys(req.body)[0]);
        UserModel_1.UserModel.addUser(user, function (userAdded, err) {
            if (err)
                res.status(401).send({ data: userAdded, error: err });
            else
                res.status(200).send({ data: userAdded, error: err });
        });
    };
    return SignupRoute;
}());
exports.SignupRoute = SignupRoute;
