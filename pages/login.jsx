import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { StyledInput} from '../styles/StyledComponents'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

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
                <div className="signup-form">
                    <h1>Login To Your Account</h1>
                    <StyledInput type="text" placeholder="Enter your Email" onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                    <StyledInput type="password" placeholder="Enter your password" onChange={(e) => handleInputChange(e.target.value, 'password')} />
                    <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Login</Button>
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

            @media only screen and (max-width: 1100px) {
                .page-wrapper {
                    justify-content: center;
                }

                .left-third {
                    display: none;
                }
            }

            @media only screen and (max-width: 800px) {
                .signup-form {
                    width: 70%;
                }
            }

            @media only screen and (max-width: 480px) {
                .signup-form {
                    width: 90%;
                }
            }

            @media only screen and (max-width: 400px) {
                .signup-form {
                    width: 100%;
                    margin: 20px;
                }
            }

            `}</style>
        </>
    )
}

export default login
