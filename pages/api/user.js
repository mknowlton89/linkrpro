import clientPromise from '../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    const userByEmail = await db
        .collection("users")
        .findOne({ email: 'mknowlton89+oauth3@gmail.com' })

    res.json(userByEmail)
};