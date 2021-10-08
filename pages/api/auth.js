import dbConnect from "../../lib/dbConnect";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    await dbConnect()

    let token = req.body.params.token

    try {
        let user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        res.status(201).json({success: "Success", user: user})
    } catch (error) {
        res.status(400).json({error: "No user found"})
    }
}