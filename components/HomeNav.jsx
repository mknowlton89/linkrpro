import React from 'react'
import HomeNavLoggedOut from './HomeNavLoggedOut';
import HomeNavLoggedIn from './HomeNavLoggedIn';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const HomeNav = () => {
    const { user } = useContext(UserContext);

    return (
        user ? (
            <HomeNavLoggedIn />
        ) :
            <HomeNavLoggedOut />
    )
}

export default HomeNav
