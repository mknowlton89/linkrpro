import React, { useEffect, useContext } from 'react'
import TopNav from '../components/TopNav';
import { StyledLoading } from '../styles/StyledComponents';
import LoginRequired from '../components/LoginRequired';
import { UserContext } from '../context/UserContext';
import API from '../utils/API';

const account = () => {
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
            <div>
                <TopNav />
                {/* <img src={user.picture} alt={user.name} /> */}
                {/* <h2>{user.name}</h2> */}
                <p>{user.email}</p>
                {/* <p>{user.sub}</p> */}
            </div>
        ) :
        <h2>Loading...</h2>
    )
}

export default account