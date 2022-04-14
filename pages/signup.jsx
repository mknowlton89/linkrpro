import React, { useEffect, useState } from 'react'
import LoginLogoutWrapper from '../components/LoginLogoutWrapper'
import { StyledInput } from '../styles/StyledComponents'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ErrorMessage from '../components/ErrorMessage'

const Signup = () => {
    const [newUserData, setNewUserData] = useState({});
    const [error, setError] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    async function handleSubmit() {

        let signUpDate = await setSignUpDate()

        API.createNewUser({
            email: newUserData.email,
            password: newUserData.password,
            signUpDate: signUpDate
        })
            .then((res) => {
                setUser({
                    _id: res.data.data._id,
                    email: res.data.data.email,
                    ccOnFile: res.data.data.ccOnFile,
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

    async function setSignUpDate() {
        let signUpDate = new Date().toString()

        return signUpDate;
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
    }, [])

    console.log(newUserData)

    return (
        <>
            <LoginLogoutWrapper>
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
                    {error && <ErrorMessage message='Email and/or password is incorrect' />}
                    <p className="password-hint">Password must be between 6 and 50 characters.</p>
                    <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Step 2 - Choose Plan</Button>
                    <div className="login-helper">
                        <p>Already a user?</p>
                        <a href="/login">Click here to login.</a>

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
                max-width: 600px;
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

            @media only screen and (min-width: 1000px) {
                .form-wrapper {
                    padding: 0px 0px 0px 100px;
                }
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

export default Signup
