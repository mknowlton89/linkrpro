import React from 'react'

const ProductDisplay = () => {
  return (
    <section>
    <div className="product">
      <div className="description">
        <h3>Sample Subscription</h3>
        <h5>$10.00 / month</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <input type="hidden" name="lookup_key" value="`usd-sample-monthly`" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
  </section>
  )
}

export default ProductDisplay


