import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {

        await dbConnect()

        try {
            const user = await User.findById(req.body.user._id)

            if (!user) {
                res.status(404).json({message: 'User Not Found'})
                return;
            }

            await user.comparePassword(req.body.currentPassword, async function(err, isMatch) {
                if (err) {
                    res.status(401).json({message: 'Password incorrect'});
                    return;
                }
                console.log(isMatch, 'isMatch')
                if (isMatch) {
                    const hashed = await bcrypt.hash(req.body.newPassword, 10);

                    await User.updateOne({_id: req.body.user._id}, {password: hashed})
                    res.status(200).json({message: 'Updated password'})
                }

                res.status(400).json({message: 'Password incorrect'})
            });

        } catch (error) {
            res.status(400).json({message: 'An error occurred.'})
        }
    }