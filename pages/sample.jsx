import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import { StyledLoading } from '../styles/StyledComponents';
import LoginRequired from '../components/LoginRequired'

const SamplePage = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <StyledLoading><h2>Loading...</h2></StyledLoading>;
    if (error) return <div>{error.message}</div>;

    return (
        user ? (
            <>
                <div>
                    <h1>Hello from Sample Page</h1>
                </div>
            </>
        ) : <LoginRequired />

    )
}

export default SamplePage
