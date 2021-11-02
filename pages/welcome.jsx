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
            <div className="page-wrapper">
                <div className="left-third">
                    <div className="logo-wrapper">
                        <a href="/" className="logo">Sourcely</a>
                    </div>
                </div>

                <div className="right-third">
                    <div className="signup-form">
                        <div className="logo-wrapper">
                            {/* <a href="/" className="logo">Paramly</a> */}
                            {/* <h1 className="hr">Confirm Your Plan</h1> */}
                        </div>
                        <div className="form-wrapper">
                            <h1 className="hr">Select a Plan</h1>
                            <div
                                className="product-card">
                                <h1>Sample Product #1</h1>
                                <h3>$10.00/Month</h3>
                                <Button onClick={(e) => handleClick("Test Product", 'price_1Jr6QiA2NnxEX769RVJTEj4E')} primary>Add Billing Info</Button>
                            </div>
                        </div>
                        <div className="footer-wrapper">
                            <a href="/" className="privacy-policy">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`

            .page-wrapper {
                display: flex;
                flex-direction: row;
                min-height: 100vh;
                margin: 0;
                padding: 0;
            }
            .signup-form {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                min-height: 100vh;
                box-sizing: border-box;
            }

            .product-card {
              width: fit-content;
              border: 3px solid #8980F5;
              border-radius: 10px;
              padding: 20px;
              box-sizing: border-box;
            }

            .logo-wrapper, .form-wrapper, .footer-wrapper  {
                padding: 50px;
            }

            .form-wrapper {
                display: flex;
                flex-direction: column;
                width: 100%:
                justify-content: center;
                box-sizing: border-box;
                padding: 0px 150px;
            }

            .footer-wrapper {
                display: flex;
                justify-content: flex-start;
            }

            a {
                text-decoration: none;
                color: black;
                text-align: left;
            }

            a:hover {
                cursor: pointer;
            }

            .logo {
                font-size: 35px;
                font-weight: bold;
            }

            .left-third {
                background: rgb(208,214,255);
                background: linear-gradient(143deg, rgba(208,214,255,0.6068802521008403) 0%, rgba(144,175,176,0.23433123249299714) 100%);
                min-width: 35%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .right-third {
                width: 65%;
            }

            .hr::before {
                background-color: #6161e8;
                display: block;
                content: "";
                height: 5px;
                width: 34px;
                margin-bottom: 20px;
            }

            button {
                padding-top: 30px;
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

            @media only screen and (max-width: 900px) {
                .page-wrapper {
                    justify-content: center;
                }

                .left-third {
                    display: none;
                }
            }

            @media only screen and (max-width: 755px) {
                .right-third {
                    width: 100%;
                }
            }

            @media only screen and (max-width: 500px) {
                .logo-wrapper, .form-wrapper, .footer-wrapper  {
                padding: 30px;
            }
            }

            `}</style>
        </>
    )
}

export default welcome
