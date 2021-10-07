import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import API from '../utils/API';

export const welcome = () => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

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
                //
                .catch((err) => {
                    router.push('/login')
                })
        }
    }, [user])

    return (
        <div>
        {user ?
            <div>
                <h1>Welcome, {user.email}</h1>
            </div>
        : <h2>Loading...</h2>}
        </div>
    )
}

export default welcome