import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    await dbConnect()

    try {
        const newUser = await User.create(req.body)
            // .then(() => {
            //     if (newUser) {
            //         console.log(newUser._id)
            //         console.log(newUser.email)
            //         // let authToken = jwt.sign({
            //         //     userId: newUser._id,
            //         //     email: newUser.email
            //         // })
            //     }
            // })

            let authToken = jwt.sign({
                userId: newUser._id,
                email: newUser.email
            }, process.env.JWT_SECRET_KEY, {
                expiresIn: "24h"
              });

            console.log(authToken)
            res.status(200).json({ success: true, data: newUser, token: authToken })
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}