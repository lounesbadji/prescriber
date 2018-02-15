"use strict";
var user_schema_1 = require("../../schema/user/user.schema");
var CryptoJS = require('crypto-js');
var UserDAO = (function () {
    function UserDAO() {
    }
    UserDAO.getUsers = function (callback) {
        user_schema_1.User.find({}, function (err, usersFound) {
            if (err) {
                console.log(err);
                callback(null, err);
            }
            else if (usersFound.length != 0) {
                usersFound.map(function (e) { return new user_schema_1.User(e); });
                callback(usersFound, null);
            }
        });
    };
    UserDAO.getUser = function (email, callback) {
        user_schema_1.User.find({ email: email }, function (err, userFound) {
            if (err) {
                callback(null, err);
            }
            else {
                if (userFound.length != 0) {
                    var user = new user_schema_1.User(userFound[0]);
                    callback(user, null);
                }
                else {
                    callback(null, null);
                }
            }
        });
    };
    UserDAO.addUser = function (user, callback) {
        var hashedPass = CryptoJS.SHA256(user.password).toString();
        var newUser = {
            email: user.email,
            password: hashedPass,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            sex: user.sex
        };
        var userCreated = new user_schema_1.User(newUser);
        UserDAO.getUser(newUser.email, function (userFound, err) {
            if (err) {
                console.log("erreur :", err);
            }
            else if (userFound) {
                callback(null, 'Cet utilisateur existe déjà.');
            }
            else {
                userCreated.save(function (error, data) {
                    var userCreated = new user_schema_1.User(data);
                    if (error) {
                        console.log(error);
                    }
                    if (data) {
                        callback(userCreated, null);
                    }
                });
            }
        });
    };
    UserDAO.updateUser = function (user, callback) {
        var user_ = new user_schema_1.User(user);
        user_schema_1.User.update({ user: user.email }, { $set: {
                firstName: user_.firstName,
                lastName: user_.lastName,
                picture: user_.picture
            } }, function (error) {
            if (error) {
                console.log(error);
            }
            else {
                callback(user_, null);
            }
        });
    };
    UserDAO.login = function (email, callback) {
        if (email && email != '') {
            UserDAO.getUser(email, function (user, error) { return callback(user, error); });
        }
        else {
            callback(null, 'CheckUser error => user undefined');
        }
    };
    return UserDAO;
}());
exports.UserDAO = UserDAO;
//# sourceMappingURL=user.dao.js.map