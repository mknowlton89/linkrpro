// import clientPromise from '../../lib/mongodb'
// const mongoose = require("mongoose");
// const UserModel = require('../../models/user')

// export default async (req, res) => {

//     const client = await clientPromise
//     const db = client.db();

//     // console.log(req);

//     // const newUser = await db
//     //     .collection("users")
//     //     .insertOne(req.body)
//     //         .then(dbModel => res.json(dbModel))
//     //         .catch(err => res.status(422).json(err));

//     const newUser = await db.User.create(req.body)
//             .then(dbModel => res.json(dbModel))
//             .catch(err => res.status(422).json(err));

//     res.json(newUser)
// };

import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
    await dbConnect()

    try {
        const newUser = await User.create(req.body)
            res.status(200).json({ success: true, data: newUser })
    } catch (error) {
        res.status(400).json({ success: false })
    }
// };
}