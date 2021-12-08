import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    await dbConnect()

    console.log(req);

    switch (req.method) {
        case "POST":
            try {
                const newUser = await User.create(req.body)

                let authToken = jwt.sign({
                    userId: newUser._id,
                    email: newUser.email
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "24h"
                });
                res.status(200).json({ success: true, data: newUser, token: authToken })
            } catch (error) {
                res.status(400).json({ error })
            }
            break;

        case "PUT":
            try {
                const updatedUser = await User.updateOne({_id: req.body.user._id}, {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, companyName: req.body.companyName})

                res.status(200).json({success: true, data: updatedUser})

            } catch (error) {
                console.log(error)
                res.status(400).json({error})
            }

        default:
            break;
    }
}