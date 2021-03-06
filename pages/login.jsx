import React, { useEffect, useState } from 'react'
import LoginLogoutWrapper from '../components/LoginLogoutWrapper'
import { StyledInput } from '../styles/StyledComponents'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ErrorMessage from '../components/ErrorMessage'

const login = () => {
    const [userLoginData, setUserLoginData] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [error, setError] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    const handleSubmit = () => {
        API.loginUser(userLoginData)
            .then((res) => {
                console.log(res.data)
                setUser({
                    _id: res.data.userId,
                    email: res.data.email,
                    currentToken: res.data.token,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    companyName: res.data.companyName,
                    ccOnFile: res.data.ccOnFile,
                    plan: res.data.plan,
                    planPrice: res.data.planPrice,
                    signUpDate: res.data.signUpDate,
                    accountStatus: res.data.accountStatus,
                })

                window.localStorage.setItem('authToken', res.data.token);
                if (res.status === 200) {
                    router.push('/create')
                }
            })
            .catch(err => setError(true))
    }

    const handleInputChange = (input, fieldName) => {
        setUserLoginData({ ...userLoginData, [fieldName]: input })
    }

    useEffect(() => {
        if (userLoginData.email && userLoginData.password) {
            setIsButtonDisabled(false);
        }
    }, [userLoginData])

    useEffect(async () => {
        if (!user) {

            if (typeof window !== 'undefined') {
                authToken = await localStorage.getItem('authToken');
            };

            if (!authToken) {
                return;
            };

            API.authorizeUser(authToken)
                .then((res) => {
                    setUser({
                        _id: res.data.user.userId,
                        email: res.data.user.email,
                        currentToken: authToken
                    })
                })
                .catch((err) => {
                    return;
                })
        }

        if (user) {
            router.push('/create')
        }
    }, [])

    return (
        <>
            <LoginLogoutWrapper>
                <div className="form-wrapper">
                    <div className='demo-credentials'>
                        <h2>Demo User Credentials</h2>
                        <p>Username: demo@user.com</p>
                        <p>Password: testing123</p>
                    </div>
                    <h1 className="hr">Login To Your Account</h1>
                    <StyledInput type="text" placeholder="Enter your Email" onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                    <StyledInput type="password" placeholder="Enter your password" onChange={(e) => handleInputChange(e.target.value, 'password')} />
                    {error && <ErrorMessage message='Email and/or password is incorrect' />}
                    <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Login</Button>
                    <div className="login-helper">
                        <a href="/signup">Don't have an account yet?</a>
                        <a href="/forgot">Forget your username or password?</a>
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

            .demo-credentials {
                background: rgb(208,214,255);
                background: linear-gradient(143deg, rgba(208,214,255,0.6068802521008403) 0%, rgba(144,175,176,0.23433123249299714) 100%);
                padding: 10px;
                font-size: 14px;
                border-radius: 5px;
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

export default login
