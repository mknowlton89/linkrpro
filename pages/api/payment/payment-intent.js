// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_IdMLxaOvKr65EQnlPUkqUbwC00peRnPDCc');

export default async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: 'jenny.rosen@example.com',
    })
    res.status(201).json(paymentIntent)
  } catch (error) {
    res.status(400).json({Error: "Payment intent not created"})
  }
}

