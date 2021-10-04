import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")

export default async function handler(req, res) {
    await dbConnect()

    let currentUser;
    let authToken;

    await User.findOne({
        email: req.query.email
    }).then(user => {
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        currentUser = user;
           return bcrypt.compare(req.query.password, user.password);
    }).then(response => {
        console.log(response)
        if (!response) {
            return res.status(401).json({message: "User not found"})
        }

        authToken = jwt.sign({
            userId: currentUser._id,
            email: currentUser.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h"
        });

        console.log(authToken)

        return res.status(200).json({userId: currentUser._id, email: currentUser.email, token: authToken})
    }).catch (error => {
        return res.status(400).json({message: "An error has occurred."})
    })

    // User.findOne({
    //   email: req.query.email
    // }).then(user => {
    //     console.log(user, "User line 13")
    //   if (!user) {
    //     return res.status(404).json({
    //       message: "There is no account with that email address."
    //     });
    //   }
    //   return bcrypt.compare(req.query.password, user.password);
    // }).then(response => {
    //     console.log(response, "Response line 22")
    //   if (response) {
    //       console.log("response is true")
    //     let authToken = jwt.sign({
    //         userId: user._id,
    //         email: user.email
    //     }, process.env.JWT_SECRET_KEY, {
    //         expiresIn: "24h"
    //     });
    //     console.log(authToken, "authToken line 34")
    //     res.status(200).json({
    //         email: user.email,
    //         userId: user._id,
    //         token: authToken
    //     });
    //   } else {
    //     return res.status(401).json({
    //         message: "Email or password is incorrect"
    //     });
    //     }
    //   }).catch(err => {
    //   return res.status(401).json({
    //     message: "Authentication failed. Please try again"
    //   });
    // });
}