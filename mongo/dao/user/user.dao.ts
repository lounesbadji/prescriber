import {IUserModel} from "../../model/user/user.model";
import {User} from "../../schema/user/user.schema";
import {SignupInput} from "../../../model/input/signup/singup.input";
import CryptoJS = require('crypto-js');

export class UserDAO {

    static getUsers(callback: (users: Array<IUserModel>, error: string) => void) {

        User.find({}, (err, usersFound) => {

            if (err) {
                console.log(err);
                callback(null, err);
            }
            else if (usersFound.length != 0) {
                usersFound.map((e)=>new User(e));
                callback(usersFound, null);
            }
        });
    }


    static getUser(email: string, callback: (user: IUserModel, error: string) => void) {
        User.find({email: email}, (err, userFound) => {
            if (err) {
                callback(null, err);
            }
            else {
                if (userFound.length != 0) {
                    let user= new User(userFound[0]);
                    callback(user, null);
                }
                else {
                    callback(null, null);
                }
            }
        });
    }

    static addUser(user: SignupInput, callback: (user: IUserModel, error: string) => void) {

        let hashedPass = CryptoJS.SHA256(user.password).toString();
        let newUser = {
            email: user.email,
            password: hashedPass,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            sex: user.sex
        };
        let userCreated: IUserModel = new User(newUser);

        UserDAO.getUser(newUser.email, (userFound, err) => {

                if (err) {
                    console.log("erreur :", err);
                } else if (userFound) {
                    callback(null, 'Cet utilisateur existe déjà.');
                } else {
                    userCreated.save((error, data) => {
                        let userCreated = new User(data);
                        if (error) {
                            console.log(error);
                        }
                        if (data) {
                            callback(userCreated, null);
                        }
                    });
                }
            }

        );
    }

    static updateUser(user: IUserModel, callback: (user: IUserModel, error: string) => void ) {
        let user_= new User(user);
        User.update({user: user.email}, { $set: {
            firstName: user_.firstName,
            lastName: user_.lastName,
            picture: user_.picture
        }}, (error) => {

            if (error) {
                console.log(error);
            } else {
                callback(user_, null);
            }
        })
    }

    static login(email: string, callback: (user: IUserModel, error: string) => void) {

        if (email && email != '') {
            UserDAO.getUser(email, (user, error) => callback(user, error));
        }
        else  {
            callback(null, 'CheckUser error => user undefined');
        }
    }

    //static  retrieveContacts(user: IUserModel, callback: (users: Array<IUserModel>, error: string) => void) {
    //     if (user) {
    //         let contacts=user.contact;
    //         if (contacts.length == 0) {
    //             callback([], null);
    //         }
    //         else{
    //             UserDAO.getUsers((users, error) => {
    //                 users=users.filter((u) => {
    //                     return (contacts.indexOf(u.username)>-1);
    //                 });
    //                 callback(users, null);
    //             });
    //         }
    //     }
    //     else callback(null, 'retrieveContacts error => user undefined');
    // }
    //
    //static  addContacts(user: IUserModel, contacts: Array<IUserModel>, callback: (user: IUserModel, error: string) => void) {
    //
    //     if (user) {
    //         let usernames=contacts.map((e)=>e.username);
    //
    //         for(let username of usernames)
    //             user.contact.push(username);
    //9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
    //         delete user._id;
    //         let user_ = new User(user);
    //         delete user_._id;
    //
    //         User.update({username: user_.username}, {$set:{contact: user_.contact}} , (error)=> {
    //             if (error)console.log(error);
    //             else callback(user_, null);
    //         });
    //     }
    //     else callback(null, 'addContacts error => user undefined');
    //
    // }
    //
    //static  deleteContact(user: IUserModel, contact: IUserModel, callback: (user: IUserModel, error: string) => void) {
    //     let contact_=user.contact.filter((e) => { return (e!=contact.username);});
    //     user.contact=contact_;
    //     let user_=new User(user);
    //     User.update({username: user.username}, {$set:{contact: user_.contact}}, (error)=> {
    //         if (error)console.log(error);
    //         else callback(user_, null);
    //     });
    // }
    //

}
