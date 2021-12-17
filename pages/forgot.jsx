import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { StyledInput } from '../styles/StyledComponents'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoginLogoutWrapper from '../components/LoginLogoutWrapper'
import ErrorMessage from '../components/ErrorMessage'

const forgot = () => {
    const [userLoginData, setUserLoginData] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    const handleSubmit = () => {
        // Create a JWT that expires in 1 hour and give it the user's email address
        API.generateResetToken(userLoginData.email)
            .then((res) => {
                if (res.status === 200) {
                    // TODO: Queue an email that will allow someone to go to /reset w/ the url param that includes said JWT.
                    // TODO: Give the user confirmation that we have sent an email
                }
            })
            .catch(err => setError(true))
    }

    const handleInputChange = (input, fieldName) => {
        setUserLoginData({ ...userLoginData, [fieldName]: input })
    }

    useEffect(() => {
        if (userLoginData.email) {
            setIsButtonDisabled(false);
        }
    }, [userLoginData])

    useEffect(() => {
        // if (!user) {

        //     if (typeof window !== 'undefined') {
        //         authToken = localStorage.getItem('authToken');
        //     };

        //     // console.log(authToken)

        //     if (authToken) {
        //         API.authorizeUser(authToken)
        //             .then((res) => {
        //                 setUser({
        //                     _id: res.data.user.userId,
        //                     email: res.data.user.email,
        //                     currentToken: authToken
        //                 })
        //             })
        //             .catch((err) => {
        //                 router.push('/login')
        //             })
        //     };
        // }

        if (user) {
            router.push('/create')
        }
    }, [user])

    return (
        <>
            <LoginLogoutWrapper>
                <div className="form-wrapper">
                    <h1 className="hr">Reset Your Password</h1>
                    <p>We'll send you a link to reset your password</p>
                    <StyledInput type="text" placeholder="Enter your Email" onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                    {error && <ErrorMessage message='Please enter a valid email address.' />}
                    <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Reset Password</Button>
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

            @media only screen and (max-width: 600px) {
                .form-wrapper {
                    padding: 0px 50px;
                }
            }

            `}</style>
        </>
    )
}

export default forgot
