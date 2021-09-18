import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    // console.log(req.body.link)
    var bodyJson = JSON.stringify(req.body.link)
    // console.log(bodyJson)

    const newLink = await db
        .collection("links")
        .insertOne({
            link: req.body.link.trim(),
            user: req.body.user,
        })

    res.json(newLink)
};