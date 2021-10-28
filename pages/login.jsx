import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { StyledInput} from '../styles/StyledComponents'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Image from 'next/image'

const login = () => {
    const [userLoginData, setUserLoginData] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    const handleSubmit = () => {
        API.loginUser(userLoginData)
            .then((res) => {
                console.log(res)
                setUser({
                    _id: res.data.userId,
                    email: res.data.email,
                    currentToken: res.data.token
                })

                window.localStorage.setItem('authToken', res.data.token);
                if (res.status === 200) {
                    router.push('/create')
                }
            })
            .catch(err => console.log(err, "Error Finding User"))
    }

    const handleInputChange = (input, fieldName) => {
        setUserLoginData({ ...userLoginData, [fieldName]: input })
    }

    useEffect(() => {
        if (userLoginData.email && userLoginData.password) {
            setIsButtonDisabled(false);
        }
    }, [userLoginData])

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
                        currentToken: authToken
                    })
                })
                .catch((err) => {
                    router.push('/login')
                })
        }

        if (user) {
            router.push('/create')
        }
    }, [user])

    return (
        <>
            <div className="page-wrapper">
                <div className="left-third">
                </div>
                <div className="right-third">
                    <div className="signup-form">
                        <div className="logo-wrapper">
                            <a href="/" className="logo">Paramly</a>
                        </div>
                        <div className="form-wrapper">
                            <h1 className="hr">Login To Your Account</h1>
                            <StyledInput type="text" placeholder="Enter your Email" onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                            <StyledInput type="password" placeholder="Enter your password" onChange={(e) => handleInputChange(e.target.value, 'password')} />
                            <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Login</Button>
                            <div className="login-helper">
                                <a href="/signup">Don't have an account yet?</a>
                                <a href="/login">Forget your username or password?</a>
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
                text-decoration: underline;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
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

export default login
