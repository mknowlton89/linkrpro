import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FlexCentered, FlexColumnDiv, StyledInput } from '../styles/StyledComponents'
import Button from '../components/Button'
import AUTH0 from '../utils/AUTH0';

const signup = () => {
    const [newUserData, setNewUserData] = useState({});
    const router = useRouter()

    const handleSubmit = () => {
        AUTH0.createNewUser(newUserData)
            .then((res) => {
                if (res.status === 200) {
                    router.push('/')
                }
            })

            .catch(err => console.log(err))
    }

    const handleInputChange = (input, fieldName) => {
        setNewUserData({ ...newUserData, [fieldName]: input })
    }

    // useEffect(() => {
    //     API.getHelloTest()
    //     .then((res) => console.log(res.data))
    //     .catch ((err) => console.log(err))
    //     return () => {}
    // }, []);

    console.log(newUserData);

    return (
        <>
            <FlexCentered>
                <div className="signup-form">
                    <h1>Start Your 7 Day Free Trial</h1>

                    <StyledInput
                        type="text"
                        setNewUserData={setNewUserData}
                        placeholder="Enter your Email"
                        onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                    {/* <StyledInput
                    type="password"
                    placeholder="Enter your password" /> */}

                    <StyledInput
                        type="password"
                        setNewUserData={setNewUserData}
                        placeholder="Confirm your password"
                        onChange={(e) => handleInputChange(e.target.value, 'password')} />
                    <Button onClick={handleSubmit} primary>Create Your Account</Button>
                </div>
            </FlexCentered>

            <style jsx>{`

            .signup-form {
                display: flex;
                flex-direction: column;
                width: 60%;
                text-align: center;
            }

            `}</style>
        </>
    )
}

export default signup
