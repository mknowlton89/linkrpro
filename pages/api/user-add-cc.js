import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    await dbConnect()

        try {
            console.log('updateCcOnFile ran')
            const updatedUser = await User.updateOne({_id: req.body.user._id}, {ccOnFile: req.body.ccOnFile})

            res.status(200).json({success: true, data: updatedUser})

        } catch (error) {
            res.status(400).json({error})
        }
}