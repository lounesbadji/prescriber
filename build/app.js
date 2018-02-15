"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var signup_route_1 = require("./routes/signup.route");
var login_route_1 = require("./routes/login.route");
var users_route_1 = require("./routes/users.route");
var medicine_route_1 = require("./routes/medicine.route");
var app = express();
// Configuration
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.use(errorHandler());
}
//Connection to mongoose
var uri = 'mongodb://localhost:27017/prescriber';
mongoose.connect(uri);
////////////
// Routes //
///////////
//LOGIN
app.post('/signup', signup_route_1.SignupRoute.signup);
app.post('/login', login_route_1.LoginRoute.login);
app.get('/doctors/list', users_route_1.UsersRoute.getAllDoctors);
app.get('/doctors/:userId', users_route_1.UsersRoute.getUserDoctors);
app.post('/medicine/add', medicine_route_1.MedicineRoute.addMedicines);
//USER
app.get('/user', users_route_1.UsersRoute.getUser);
app.get('/users', users_route_1.UsersRoute.getUsers);
app.post('/user/update', users_route_1.UsersRoute.updateUser);
app.listen(3000, function () {
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});
exports.App = app;
//# sourceMappingURL=app.js.map