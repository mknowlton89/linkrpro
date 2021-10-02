import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
    await dbConnect()

    try {
        const newUser = await User.create(req.body)
            res.status(200).json({ success: true, data: newUser })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}