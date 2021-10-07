import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/Link";

export default async (req, res) => {

    await dbConnect()
    console.log(req)

    try {
        let results = await Link.find({
            user: req.query.id
        })
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({Error: "An error occurred. Please try again."})
    }
};