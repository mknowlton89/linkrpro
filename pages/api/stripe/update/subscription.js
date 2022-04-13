import dbConnect from "../../../../lib/dbConnect";
import Link from "../../../../models/Link";
const stripe = require('stripe');

export default async function handler(req, res) {
    // await dbConnect()

    // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
    // const endpointSecret = "whsec_33a86934b6aac6df2d9598798e123463799171e9e9014704537072b6f3193869";

    // const sig = req.headers['stripe-signature'];

    // let event;

    // try {
    //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    // } catch (err) {
    //   res.status(400).send(`Webhook Error: ${err.message}`);
    //   console.log('There was an error', err.message)
    //   return;
    // }

    // console.log('Event', event);
    // console.log('Request', req.body);

    console.log('This is wired up')
    // res.status(200).json({message: "Success!"});

    try {

        switch (req.body.type) {
          case 'subscription_schedule.canceled' :
            // console.log(req.body)
            console.log('Subscription was cancelled');
            console.log(req);
            res.send(200);
            // Find the user
            // Update their accountStatus to cancelled
            break;
            case 'payment_intent.succeeded' :
            // console.log('Payment Intent Succeeded');
            res.send(200);
            // Find the user
            // Update their accountStatus to cancelled
            break;
          default:
            // console.log(`Unhandled event type ${req.body.type}`);
            res.send(200);
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}