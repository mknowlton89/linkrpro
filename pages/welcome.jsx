import React, { useEffect, useState } from 'react'
import { createCheckoutSession } from 'next-stripe/client'
import { loadStripe } from '@stripe/stripe-js'
import { HelperText, StyledInput } from '../styles/StyledComponents'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router'
import HELPER from '../utils/HELPER'
import LoginLogoutWrapper from '../components/LoginLogoutWrapper'

const welcome = () => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    const handleClick = async (planName, planPrice) => {

        const session = await createCheckoutSession({
            success_url: 'http://localhost:3000/create?success=true',
            cancel_url: window.location.href,
            line_items: [{ price: planPrice, quantity: 1 }],
            payment_method_types: ['card'],
            mode: 'subscription'
        })

        const stripe = await loadStripe(process.env.STRIPE_PUBLIC_TEST_KEY);

        if (stripe) {

            API.updateUser(user, planName, planPrice)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))

            stripe.redirectToCheckout({ sessionId: session.id });
        }

    }

    // TODO: Rethink how this useEffect works - currently, it's redirecting everyone to /login and then /create automatically

    useEffect(() => {
        if (!user) {

            if (typeof window !== 'undefined') {
                authToken = localStorage.getItem('authToken');
            };

            if (!authToken) {
                router.push('/login')
            };

            API.authorizeUser(authToken)
                .then((res) => {
                    setUser({
                        _id: res.data.user.userId,
                        email: res.data.user.email,
                    })
                })
                .catch((err) => {
                    router.push('/login')
                })
        }
    }, [])

    console.log(user)

    return (
        <>
            <LoginLogoutWrapper>
                <div className="form-wrapper">
                    <h1 className="hr">Select a Plan</h1>
                    <div
                        className="product-card">
                        <h1>Sample Product #1</h1>
                        <h3>$10.00/Month</h3>
                        <Button onClick={(e) => handleClick("Test Product", 'price_1Jr6QiA2NnxEX769RVJTEj4E')} primary>Add Billing Info</Button>
                    </div>
                </div>
            </LoginLogoutWrapper>

            <style jsx>{`

            .form-wrapper {
                display: flex;
                flex-direction: column;
                width: 100%:
                justify-content: center;
                box-sizing: border-box;
                padding: 0px 100px;
            }

            .hr::before {
                background-color: #6161e8;
                display: block;
                content: "";
                height: 5px;
                width: 34px;
                margin-bottom: 20px;
            }

            .login-helper {
                padding-top: 8px;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .login-helper a {
                padding-left: 5px;
                text-decoration: underline;
            }

            a:visited {
            text-decoration: none;
            color: black;
            }

            .product-card {
              width: fit-content;
              border: 3px solid #8980F5;
              border-radius: 10px;
              padding: 20px;
              box-sizing: border-box;
            }

            @media only screen and (max-width: 600px) {
                .form-wrapper {
                    padding: 0px 50px;
                }
            }
            `}</style>
        </>
    )
}

export default welcome
