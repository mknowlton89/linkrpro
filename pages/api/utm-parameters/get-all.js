import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    await db.collection(req.query.parameter).find({ user: req.query.user }).toArray(function (err, result) {
        let arrayToReturn = result.map(a => a[req.query.parameter])
        if (err) throw err;
        res.json(arrayToReturn)
    })
}