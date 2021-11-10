import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    await dbConnect()

    try {

        let resetToken = jwt.sign({
            email: req.body.params.userEmail
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h"
        });

        await User.updateOne({email: req.body.params.userEmail}, {resetToken: resetToken})

        res.status(200).json({ success: true, resetToken: resetToken })
    } catch (error) {
        res.status(400).json({ error })
    }
}
