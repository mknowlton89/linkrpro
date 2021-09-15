import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {

    // console.log(req)

    const client = await clientPromise
    const db = client.db();

    const linkHistory = await db
        .collection("links")
        .find({ _id: req.query.id })

    res.json(linkHistory)
};