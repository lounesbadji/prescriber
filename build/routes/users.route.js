"use strict";
exports.__esModule = true;
var user_dao_1 = require("../mongo/dao/user/user.dao");
var UsersRoute = /** @class */ (function () {
    function UsersRoute() {
    }
    UsersRoute.getUsers = function (req, res) {
        user_dao_1.UserDAO.getUsers(function (users, err) {
            if (err)
                res.status(401).send({ data: users, error: err });
            else
                res.status(200).send({ data: users, error: err });
        });
    };
    UsersRoute.getUser = function (req, res) {
        var user = req.query;
        user_dao_1.UserDAO.getUser(user.email, function (user, err) {
            if (err)
                res.status(401).send({ data: user, error: err });
            else
                res.status(200).send({ data: user, error: err });
        });
    };
    UsersRoute.updateUser = function (req, res) {
        var user = JSON.parse(Object.keys(req.body)[0]);
        console.log("USER RECIEIVED : ", user);
        user_dao_1.UserDAO.updateUser(user, function (user, err) {
            if (err)
                res.status(401).send({ data: user, error: err });
            else
                res.status(200).send({ data: user, error: err });
        });
    };
    UsersRoute.getAllDoctors = function () {
    };
    UsersRoute.getUserDoctors = function () {
    };
    return UsersRoute;
}());
exports.UsersRoute = UsersRoute;
//# sourceMappingURL=users.route.js.map