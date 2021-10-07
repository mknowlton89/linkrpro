import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    await dbConnect()

    console.log(req.body.params.token)

    let token = req.body.params.token

    try {
        let user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        res.status(201).json({success: "Success", user: user})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "No user found"})
    }




    // db.User.findOne({ _id: authorized.userId }, { password: 0 })
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    //   },

    // console.log(isUserAuthorized);

//     token = req.body.params.token.split('"');
//     let authorized = jwt.verify(token[1], process.env.SECRET_KEY);
//     console.log(authorized);

//     db.User.findOne({ _id: authorized.userId }, { password: 0 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },

//     try {
//         const newUser = await User.create(req.body)

//             let authToken = jwt.sign({
//                 userId: newUser._id,
//                 email: newUser.email
//             }, process.env.JWT_SECRET_KEY, {
//                 expiresIn: "24h"
//               });

//             console.log(authToken)
//             res.status(200).json({ success: true, data: newUser, token: authToken })
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({error})
//     }
}