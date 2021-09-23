import React, { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import TopNav from '../components/TopNav';
const axios = require('axios');

const account = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    console.log(user);
    // console.log(userByEmail);

    // useEffect(() => {
    //     axios.get('/api/user')
    //         .then(function (response) {
    //             console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //     return {}
    // }, [])

    return (
        user && (
            <div>
                <TopNav />
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.sub}</p>
            </div>
        )
    )
}

export default account



