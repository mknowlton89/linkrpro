import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FlexCentered,  FlexColumnDiv, StyledInput} from '../styles/StyledComponents'
import Button from '../components/Button'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const login = () => {
    const [userLoginData, setUserLoginData] = useState({});
    const { setUser } = useContext(UserContext);
    const router = useRouter()

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

    return (
        <>
            <div className="page-wrapper">
                <div className="signup-form">
                    <h1>Login To Your Account</h1>
                    <StyledInput type="text" placeholder="Enter your Email" onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                    <StyledInput type="password" placeholder="Enter your password" onChange={(e) => handleInputChange(e.target.value, 'password')} />
                    <Button onClick={handleSubmit} primary>Login</Button>
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

            `}</style>
        </>
    )
}

export default login
