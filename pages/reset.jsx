import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoginLogoutWrapper from '../components/LoginLogoutWrapper';
import { StyledInput } from '../styles/StyledComponents';
import ErrorMessage from '../components/ErrorMessage';

const reset = () => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    let resetToken;

    async function handleSubmit() {

        const queryParams = new URLSearchParams(window.location.search);

        resetToken = queryParams.get('token')

        API.resetUserPassword(resetToken, userData.password)
            .then((res) => {
                if (res.status === 200) {
                    router.push('/login')
                }
            })
            .catch(err => setError(true))
    }

    const handleInputChange = (input, fieldName) => {
        setUserData({ ...userData, [fieldName]: input })
    }

    useEffect(() => {

        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);

            if (queryParams.get('token')) {
                resetToken = queryParams.get('token')
                console.log(resetToken, "resetToken");
            } else {
                router.push('/login')
            }
        };
    }, [])

    useEffect(() => {
        if ((userData.password && userData.password.length >= 6) && passwordsMatch) {
            setIsButtonDisabled(false);
        }
    }, [userData, passwordsMatch])

    useEffect(() => {
        if (userData.passwordConfirmation === userData.password) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }, [userData])

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

    return (
        <>
            <LoginLogoutWrapper>
                <div className="form-wrapper">
                    <h1 className="hr">Reset Your Password</h1>
                    <StyledInput
                        type="password"
                        className="pw-large"
                        onChange={(e) => handleInputChange(e.target.value, 'password')}
                        placeholder="Enter your new password" />
                    <StyledInput
                        type="password"
                        placeholder="Confirm your password"
                        onChange={(e) => handleInputChange(e.target.value, 'passwordConfirmation')} />
                    {error && <ErrorMessage message="Something went wrong, please try again" />}
                    <p className="password-hint">Password must be between 6 and 50 characters.</p>
                    <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Save Password</Button>
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

export default reset
