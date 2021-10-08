import React from 'react'
import { StyledLink } from '../styles/StyledComponents'

const ProductCard = () => {
    return (
        <div>
            <h1>Sample Product</h1>
            <h2>$4.99/month</h2>
            <StyledLink href="/signup">Try it Free</StyledLink>
        </div>
    )
}

export default ProductCard
