import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    await db.collection('utm-url').find({ user: req.query.user }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result)
    })
}