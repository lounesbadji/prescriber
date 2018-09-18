import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import {SignupRoute} from "./routes/signup.route";
import {LoginRoute} from "./routes/login.route";
import {UsersRoute} from "./routes/users.route";
import {MedicineRoute} from "./routes/medicine.route";

let app = express();

// Configuration
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || 3000;

if (env === 'development') {
    app.use(errorHandler());
}

//Connection to mongoose
let uri = 'mongodb://url7k8yjugcwtyf:Xkakr86UIRP6ma3momdc@bshogbnqmgtjmdo-mongodb.services.clever-cloud.com:27017/bshogbnqmgtjmdo';
mongoose.connect(uri);

////////////
// Routes //
///////////

//LOGIN

app.post('/signup', SignupRoute.signup);
app.post('/login', LoginRoute.login);


app.get('/doctors/list', UsersRoute.getAllDoctors);
app.get('/doctors/:userId', UsersRoute.getUserDoctors);

app.post('/medicine/add', MedicineRoute.addMedicines);

//USER
app.get('/user', UsersRoute.getUser);
app.get('/users', UsersRoute.getUsers);
app.post('/user/update', UsersRoute.updateUser);


app.listen(port, () => {
    console.log("Demo Express server listening on port %d in %s mode", port, app.settings.env);
});

export var App = app;
