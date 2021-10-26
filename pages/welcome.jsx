import React from 'react'
import { createCheckoutSession } from 'next-stripe/client'
import { loadStripe } from '@stripe/stripe-js'

const welcome = () => {

  const handleClick = async () => {
    
    const session = await createCheckoutSession({
      success_url: 'http://localhost:3000/create',
      cancel_url: window.location.href,
      line_items: [{ price: 'price_1Jov4iA2NnxEX769e78UA5VE', quantity: 1 }],
      payment_method_types: ['card'],
      mode: 'subscription'
    })

    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_TEST_KEY);

    console.log(stripe);

    if (stripe) {
      stripe.redirectToCheckout({sessionId: session.id});
    }

  }

  return (
    <div>
      <h1>Sample Product</h1>
      <h3>$10.00/Month</h3>
      <button onClick={handleClick}>Try For Free</button>
    </div>
  )
}

export default welcome
