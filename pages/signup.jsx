import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FlexCentered, StyledInput } from '../styles/StyledComponents'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const signup = () => {
    const [newUserData, setNewUserData] = useState({});
    const [error, setError] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    const handleSubmit = () => {
        API.createNewUser(newUserData)
            .then((res) => {
                setUser({
                    _id: res.data.data._id,
                    email: res.data.data.email,
                    currentToken: res.data.token
                })

                window.localStorage.setItem('authToken', res.data.token);
                if (res.status === 200) {
                    router.push('/welcome')
                }
            })
            .catch(err => setError(true))
    }

    const handleInputChange = (input, fieldName) => {
        setNewUserData({ ...newUserData, [fieldName]: input })
    }

    useEffect(() => {
        if (newUserData.email && (newUserData.password && newUserData.password.length >= 6) && passwordsMatch) {
            setIsButtonDisabled(false);
        }
    }, [newUserData, passwordsMatch])

    useEffect(() => {
        if (newUserData.passwordConfirmation === newUserData.password) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }, [newUserData])

    useEffect(() => {
        if (!user) {

            if (typeof window !== 'undefined') {
                authToken = localStorage.getItem('authToken');
            };

            if (authToken) {
                API.authorizeUser(authToken)
                    .then((res) => {
                        setUser({
                            _id: res.data.user.userId,
                            email: res.data.user.email,
                            currentToken: authToken
                        })
                    })
                    .catch((err) => { })
            }
        }

        if (user) {
            router.push('/create')
        }
    }, [user])

    return (
        <>
            <div className="page-wrapper">
                <div className="left-third"></div>

                <div className="right-third">
                    <div className="signup-form">
                        <div className="logo-wrapper">
                            <a href="/" className="logo">Sourcely</a>
                        </div>
                        <div className="form-wrapper">
                            <h1 className="hr">Start Your Free 7 Day Trial</h1>
                            <StyledInput
                                type="text"
                                placeholder="Enter your email"
                                onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                            <StyledInput
                                type="password"
                                className="pw-large"
                                onChange={(e) => handleInputChange(e.target.value, 'password')}
                                placeholder="Create a password" />
                            <StyledInput
                                type="password"
                                placeholder="Confirm your password"
                                onChange={(e) => handleInputChange(e.target.value, 'passwordConfirmation')} />
                            {error && <p className="error">Please ensure you entered a valid email.</p>}
                            <p className="password-hint">Password must be between 6 and 50 characters.</p>
                            <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Create Your Account</Button>
                            <div className="login-helper">
                                <p>Already a user?</p>
                                <a href="/login">Click here to login.</a>

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
                max-width: 500px;
                box-sizing: border-box;
            }

            .logo-wrapper, .form-wrapper, .footer-wrapper  {
                padding: 50px;
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
                justify-content: center;
                align-items: center;
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

export default signup
