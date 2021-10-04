import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const welcome = () => {
    const { user, setUser } = useContext(UserContext);

    console.log(user)

    return (
        <div>
        {user.email ?
            <div>
                <h1>Welcome, {user.email}</h1>
            </div>
        : <h2>Loading...</h2>}
        </div>
    )
}

export default welcome