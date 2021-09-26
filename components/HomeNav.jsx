import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import HomeNavLoggedOut from './HomeNavLoggedOut';
import HomeNavLoggedIn from './HomeNavLoggedIn';

const HomeNav = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <StyledLoading />;
    if (error) return <div>{error.message}</div>;

    return (
        user ? (
            <HomeNavLoggedIn />
        ) :
            <HomeNavLoggedOut />
    )
}

export default HomeNav
