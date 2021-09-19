import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    console.log(req.query.user)

    // const testUtm = await db
    //     .collection("utm-url")
    //     .find()
    // db.Package.find({ photographerId: req.query._id }).sort({ price: 1 })
    await db.collection('utm-url').find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        // .then(parameters => res.json(parameters))
        // .catch(err => res.status(422).json(err));

        // console.log(utms)

        // res.json(testUtm)
    })
}