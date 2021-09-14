// import { connectToDatabase } from "../../lib/mongodb";
import clientPromise from '../../lib/mongodb'

export default async (req, res) => {

    const client = await clientPromise
    const db = client.db();

    const links = await db
        .collection("links")
        .find({})
        .toArray();

    res.json(links);
    // console.log(links)
};