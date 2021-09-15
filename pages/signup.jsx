import React, { useEffect } from 'react'
import { FlexCentered,  FlexColumnDiv, StyledInput} from '../styles/StyledComponents'
import Button from '../components/Button'

const signup = () => {

    const handleSubmit = () => {
        alert("Submit was called!")
    }

    // useEffect(() => {
    //     API.getHelloTest()
    //     .then((res) => console.log(res.data))
    //     .catch ((err) => console.log(err))
    //     return () => {}
    // }, []);

    return (
        <>
            <FlexCentered>
                <div className="signup-form">
                    <h1>Sign Up For Free Today</h1>
                    <StyledInput type="text" placeholder="Enter your Email"></StyledInput>
                    <StyledInput type="password" placeholder="Enter your password"></StyledInput>
                    <StyledInput type="password" placeholder="Confirm your password"></StyledInput>
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
