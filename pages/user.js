import React, { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0';
const axios = require('axios');

const user = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    console.log(user);
    // console.log(userByEmail);

    useEffect(() => {
        axios.get('/api/user')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        return {}
    }, [])

    return (
        user && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    )
}

export default user



