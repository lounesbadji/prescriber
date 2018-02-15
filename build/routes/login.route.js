"use strict";
var CryptoJS = require('crypto-js');
var user_dao_1 = require("../mongo/dao/user/user.dao");
var LoginRoute = (function () {
    function LoginRoute() {
    }
    LoginRoute.login = function (req, res) {
        var param = req.body;
        user_dao_1.UserDAO.login(param.email, function (user, error) {
            var successPayload = user;
            var errorPayload = { data: null, error: 'Nom de compte ou mot de passe incorrect.' };
            if (user) {
                var hashedPass = CryptoJS.SHA256(param.password).toString();
                var passIsCorrect = (user.password == hashedPass);
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
    };
    return LoginRoute;
}());
exports.LoginRoute = LoginRoute;
//# sourceMappingURL=login.route.js.map