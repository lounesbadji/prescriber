"use strict";
var UserModel_1 = require("../model/user/model/user.model.ts");
var UsersRoute = (function () {
    function UsersRoute() {
    }
    UsersRoute.getUsers = function (req, res) {
        UserModel_1.UserModel.retrieveUsers(function (users, err) {
            if (err)
                res.status(401).send({ data: users, error: err });
            else
                res.status(200).send({ data: users, error: err });
        });
    };
    UsersRoute.getUser = function (req, res) {
        var user = req.query;
        UserModel_1.UserModel.retrieveUser(user.username, function (user, err) {
            if (err)
                res.status(401).send({ data: user, error: err });
            else
                res.status(200).send({ data: user, error: err });
        });
    };
    return UsersRoute;
}());
exports.UsersRoute = UsersRoute;
