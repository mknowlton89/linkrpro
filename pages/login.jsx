import React from 'react'
import { FlexCentered,  FlexColumnDiv, StyledInput} from '../styles/StyledComponents'
import Button from '../components/Button'

const login = () => {

    const handleSubmit = () => {
        alert("Submit was called!")
    }

    return (
        <>
            <FlexCentered>
                <div className="signup-form">
                    <h1>Login To Your Account</h1>
                    <StyledInput type="text" placeholder="Enter your Email"></StyledInput>
                    <StyledInput type="password" placeholder="Enter your password"></StyledInput>
                    <Button onClick={handleSubmit} primary>Login</Button>
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

export default login
