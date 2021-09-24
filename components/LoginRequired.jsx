import React from 'react'
import { StyledLoading } from '../styles/StyledComponents';
import Button from '../components/Button';

const LoginRequired = () => {


    return (
        <>
            <StyledLoading>
                <h2>You must be logged in to view this.</h2>
                <a href="/api/auth/login">
                    <Button
                        primary>
                        Login</Button>
                </a>

            </StyledLoading>
        </>
    )
}

export default LoginRequired
