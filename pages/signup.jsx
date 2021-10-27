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
                    .catch((err) => {})
            }
        }

        if (user) {
            router.push('/create')
        }
    }, [user])

    return (
        <>
            <div className="page-wrapper">
                <div className="signup-form">
                    <h1>Start Your 7 Day Free Trial</h1>
                    <StyledInput
                        type="text"
                        placeholder="Enter your Email"
                        onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                    <StyledInput
                        type="password"
                        className="pw-large"
                        onChange={(e) => handleInputChange(e.target.value, 'password')}
                        placeholder="Enter your password between 6 and 50 characters" />
                    <StyledInput
                        type="password"
                        placeholder="Confirm your password"
                        onChange={(e) => handleInputChange(e.target.value, 'passwordConfirmation')} />
                    {error && <p className="error">Please ensure you entered a valid email.</p>}
                    <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Create Your Account</Button>
                </div>
                <div className="left-third"></div>
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
                width: 40%;
                text-align: center;
                justify-content: center;
                margin: 50px;
            }

            .left-third {
                background-color: var(--light-green);
                width: 60%;
            }

            .error {
                color: tomato;
                font-size: 18px;
                text-align: left;
            }

            @media only screen and (max-width: 1100px) {
                .page-wrapper {
                    justify-content: center;
                }

                .left-third {
                    display: none;
                }
            }

            @media only screen and (max-width: 975px) {
                .signup-form {
                    width: 50%;
                }
            }

            @media only screen and (max-width: 800px) {
                .signup-form {
                    width: 70%;
                }
            }

            @media only screen and (max-width: 550px) {
                .signup-form {
                    width: 100%;
                    margin: 20px;
                }
            }

            `}</style>
        </>
    )
}

export default signup
