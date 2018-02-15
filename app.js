"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var signup_1 = require("./routes/signup.route");
var login_1 = require("./routes/login.route");
var contacts_1 = require("./routes/contacts");
var users_1 = require("./routes/users.route");
var message_1 = require("./routes/message");
var app = express();
// Configuration
app.use(function (req, res, next) { res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100'); next(); });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.use(errorHandler());
}
// Routes
app.post('/signup', signup_1.SignupRoute.signup);
app.post('/login', login_1.LoginRoute.login);
app.post('/contacts/add', contacts_1.ContactsRoute.addContact);
app.post('/contacts/delete', contacts_1.ContactsRoute.deleteContact);
app.post('/message/add', message_1.MessageRoute.addMessage);
app.get('/contacts', contacts_1.ContactsRoute.getContacts);
app.get('/user', users_1.UsersRoute.getUser);
app.get('/users', users_1.UsersRoute.getUsers);
app.get('/messages', message_1.MessageRoute.getConv);
app.get('/detail', message_1.MessageRoute.getDetail);
app.listen(3000, function () {
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});
exports.App = app;
