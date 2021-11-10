import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const signup = () => {
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
            <div className="page-wrapper">
                <div className="left-third">
                        <div className="logo-wrapper">
                            <a href="/" className="logo">Sourcely</a>
                        </div>

                </div>

                <div className="right-third">
                    <div className="signup-form">
                        <div className="logo-wrapper">
                            {/* <a href="/" className="logo">Sourcely</a> */}
                        </div>
                        <div className="form-wrapper">
                            <h1 className="hr">Create a New Password</h1>
                            <StyledInput
                                type="password"
                                className="pw-large"
                                onChange={(e) => handleInputChange(e.target.value, 'password')}
                                placeholder="Create a password" />
                            <StyledInput
                                type="password"
                                placeholder="Confirm your password"
                                onChange={(e) => handleInputChange(e.target.value, 'passwordConfirmation')} />
                            {error && <p className="error">Something went wrong, please try again.</p>}
                            <p className="password-hint">Password must be between 6 and 50 characters.</p>
                            <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Save Password</Button>
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

export default signup
