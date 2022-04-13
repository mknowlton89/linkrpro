import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51JbliZA2NnxEX769QWNQEcOj9Ivq97Mxt1ZEkvrdaZPCrUChuUsLvnuMV2otI7N3RTaVA9CD5VSlrfHeqxLETxTd00RAgDKbM4');

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case "POST":
            try {
                console.log(req.body);
                const stripeCustomer = await stripe.customers.create({
                    email: req.body.email,
                  });

                console.log(stripeCustomer);

                    const newUser = await User.create({stripeCustomerId: stripeCustomer.id, email: req.body.email, password: req.body.password, signupDate: req.body.signupDate})

                let authToken = jwt.sign({
                    userId: newUser._id,
                    email: newUser.email,
                    stripeCustomerId: stripeCustomer.id,
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "24h"
                });
                res.status(200).json({ success: true, data: newUser, token: authToken })
            } catch (error) {
                console.log("Error", error)
                res.status(400).json({error: error })
            }
            break;

        case "PUT":
            try {
                const updatedUser = await User.updateOne({_id: req.body.user._id}, {plan: req.body.planName, planPrice: req.body.planPrice})

                res.status(200).json({success: true, data: updatedUser})

            } catch (error) {
                // console.log(error)
                res.status(400).json({error})
            }

        default:
            break;
    }
}