import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import LinkHistory from '../components/LinkHistory'
import LoginRequired from '../components/LoginRequired'
import TopNav from '../components/TopNav'
import API from '../utils/API';

export const mylinks = () => {
    const { user, setUser } = useContext(UserContext);

    let authToken;

    useEffect(() => {
        if (!user) {

            if (typeof window !== 'undefined') {
                authToken = localStorage.getItem('authToken');
            };

            if (!authToken) {
                router.push('/login')
            };

            API.authorizeUser(authToken)
                .then((res) => {
                    setUser({
                        _id: res.data.user.userId,
                        email: res.data.user.email,
                        currentToken: authToken
                    })
                })
                .catch((err) => {
                    router.push('/login')
                })
        }
    }, [user])

    return (
        user ? (
        <>
            <TopNav />
            <LinkHistory />
        </>
        ) : <LoginRequired />
    )
}

export default mylinks