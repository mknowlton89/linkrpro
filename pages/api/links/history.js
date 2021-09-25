import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {

    console.log(req.query.id)

    const client = await clientPromise
    const db = client.db();

    const linkHistory = await db
        .collection("links")
        .find({ user: req.query.id })
        .limit(100)
        .toArray()

    res.json(linkHistory)
};