import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
    await dbConnect()

    try {
        // If this fails because the token isn't valid or it is expired, it will automatically return a 400 error.
        let resetToken = jwt.verify(req.body.params.resetToken, process.env.JWT_SECRET_KEY);

        const hashed = await bcrypt.hash(req.body.params.newPassword, 10);

        await User.updateOne({email: resetToken.email}, {password: hashed})

        res.status(200).json({success: true})

    } catch (error) {
        res.status(400).json({ error })
    }
}
