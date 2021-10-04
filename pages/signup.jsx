import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FlexCentered, FlexColumnDiv, StyledInput } from '../styles/StyledComponents'
import Button from '../components/Button'
import API from '../utils/API'
import { set } from 'mongoose'

const signup = () => {
    const [newUserData, setNewUserData] = useState({});
    const [error, setError] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const router = useRouter()

    const handleSubmit = () => {
        API.createNewUser(newUserData)
            .then((res) => {
                console.log(res)
                // Add the token to local storage.
                // Add it to a useContext hook
                    // Store the token
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
        if (newUserData.passwordConfirmation === newUserData.password){
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }, [newUserData])

    return (
        <>
            <FlexCentered>
                <div className="signup-form">
                    <h1>Start Your 7 Day Free Trial</h1>

                    <StyledInput
                        type="text"
                        placeholder="Enter your Email"
                        onChange={(e) => handleInputChange(e.target.value.toLowerCase(), 'email')} />
                    <StyledInput
                        type="password"
                        onChange={(e) => handleInputChange(e.target.value, 'password')}
                        placeholder="Enter your password between 6 and 50 characters" />
                    <StyledInput
                        type="password"
                        placeholder="Confirm your password"
                        onChange={(e) => handleInputChange(e.target.value, 'passwordConfirmation')} />
                    {error && <p className="error">Please ensure you entered a valid email.</p>}
                    <Button onClick={handleSubmit} disabled={isButtonDisabled && 'disabled'} primary>Create Your Account</Button>
                </div>
            </FlexCentered>

            <style jsx>{`

            .signup-form {
                display: flex;
                flex-direction: column;
                width: 60%;
                text-align: center;
            }

            .error {
                color: tomato;
                font-size: 18px;
                text-align: left;
            }

            `}</style>
        </>
    )
}

export default signup
