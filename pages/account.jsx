import React, { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import API from '../utils/API';
import { useRouter } from 'next/router'
import DashboardWrapper from '../components/DashboardWrapper';
import MyAccount from '../components/MyAccount';

const account = () => {
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
                .catch((err) => {
                    router.push('/login')
                })
        }
    }, [user])

    return (
      <DashboardWrapper>
        <MyAccount />
      </DashboardWrapper>
    )
}

export default account