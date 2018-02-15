"use strict";
exports.__esModule = true;
var user_dao_1 = require("../mongo/dao/user/user.dao");
var SignupRoute = /** @class */ (function () {
    function SignupRoute() {
    }
    SignupRoute.signup = function (req, res) {
        var user = req.body;
        user_dao_1.UserDAO.addUser(user, function (userAdded, error) {
            res.status(error ? 401 : 200).send(error ? error : userAdded);
        });
    };
    return SignupRoute;
}());
exports.SignupRoute = SignupRoute;
//# sourceMappingURL=signup.route.js.map