import React, { useEffect, useContext } from 'react'
import TopNav from '../components/TopNav';
import { StyledLoading } from '../styles/StyledComponents';
import LoginRequired from '../components/LoginRequired';
import { UserContext } from '../context/UserContext';
import API from '../utils/API';
import SideNav from '../components/SideNav';
import { useRouter } from 'next/router'

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
        user ? (
            <>
              <div className="page-wrapper">
                <SideNav />
                <p>{user.email}</p>
              </div>

              <style jsx>{`
                .page-wrapper {
                  display: flex;

                }
              `}</style>
            </>
          ) :
            <h2>Loading...</h2>
    )
}

export default account