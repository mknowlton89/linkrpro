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
        if (!response) {
            return res.status(401).json({message: "User not found"})
        }

        authToken = jwt.sign({
            userId: currentUser._id,
            email: currentUser.email,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            companyName: currentUser.companyName,
            ccOnFile: currentUser.ccOnFile,
            plan: currentUser.plan,
            planPrice: currentUser.planPrice,
            signUpDate: currentUser.signUpDate,
            accountStatus: currentUser.accountStatus,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h"
        });

        return res.status(200).json({userId: currentUser._id, email: currentUser.email, token: authToken, firstName: currentUser.firstName, lastName: currentUser.lastName, companyName: currentUser.companyName})
    }).catch (error => {
        return res.status(400).json({message: "An error has occurred."})
    })
}