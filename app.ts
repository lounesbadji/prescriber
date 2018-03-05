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

/** CORS Config **/
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    app.use(errorHandler());
}

/** DB connection **/
let uri = 'mongodb://uujzlnyve5ljx1t:cVD2FZYIY7IVm5Bg9H8H@bsuzveblc1e274i-mongodb.services.clever-cloud.com:27017/bsuzveblc1e274i';
mongoose.connect(uri);


/** Routes **/

//LOGIN
app.post('/signup', SignupRoute.signup);
app.post('/login', LoginRoute.login);

//DOCTORS
app.get('/doctors/list', UsersRoute.getAllDoctors);
app.get('/doctors/:userId', UsersRoute.getUserDoctors);

//MEDICINE
app.post('/medicine/add', MedicineRoute.addMedicines);

//USER
app.get('/user', UsersRoute.getUser);
app.get('/users', UsersRoute.getUsers);
app.post('/user/update', UsersRoute.updateUser);

app.listen(3000, () => {
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
    console.log(env);
});

export var App = app;
