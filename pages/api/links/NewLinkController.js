import clientPromise from '../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    console.log(req)

    const newLink = await db
        .collection("links")
        .insertOne(req)

    res.json(newLink)
};