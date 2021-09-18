import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    // console.log(req.body);

    const newSource = await db
        .collection("utm-source")
        .insertOne({
            campaignSource: req.body.campaignSource,
            user: req.body.user,
        })

    res.json(newSource)
};