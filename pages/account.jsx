import React, { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import TopNav from '../components/TopNav';
import { StyledLoading } from '../styles/StyledComponents';
import LoginRequired from '../components/LoginRequired';
const axios = require('axios');

const account = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <StyledLoading><div>Loading...</div></StyledLoading>;
    if (error) return <div>{error.message}</div>;


    return (
        user ? (
            <div>
                <TopNav />
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.sub}</p>
            </div>
        ) :
        <LoginRequired />
    )
}

export default account



