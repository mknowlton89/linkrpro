import dbConnect from "../../../lib/dbConnect";
import Link from "../../../models/Link";

export default async (req, res) => {

    await dbConnect()

    let createdOn = new Date();

    console.log(createdOn)

    let newLink = await Link.create({
            link: req.body.link.trim(),
            user: req.body.user,
            createdOn: createdOn
        })

    res.json(newLink)
};