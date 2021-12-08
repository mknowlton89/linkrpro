import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import API from '../utils/API';
import SideNav from '../components/SideNav';

const DashboardWrapper = ({children}) => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter()

    let authToken;

    // This logic sets the user by getting the authToken from local storage (if available) and then checks that it's valid
    useEffect(() => {
        if (!user) {

            if (typeof window !== 'undefined') {
                authToken = localStorage.getItem('authToken');
            };

            if (authToken) {
              API.authorizeUser(authToken)
                .then((res) => {
                    setUser({
                        _id: res.data.user.userId,
                        email: res.data.user.email,
                        currentToken: authToken,
                        firstName: res.data.user.firstName,
                        lastName: res.data.user.lastName,
                        companyName: res.data.user.companyName,
                        ccOnFile: res.data.user.ccOnFile,
                        plan: res.data.user.plan,
                        planPrice: res.data.user.planPrice,
                        signUpDate: res.data.user.signUpDate,
                        accountStatus: res.data.user.accountStatus,
                    })
                })
                .catch((err) => {
                    router.push('/login')
                })
            } else {
              router.push('/login')
            }
        }
    }, [user])

    return (
      user ? (
        <>
          <div className="page-wrapper">
            <SideNav />
            {children}
          </div>

          <style jsx>{`
            .page-wrapper {
              display: flex;
            }
          `}</style>
        </>
      ) :
        <div></div>
    )
  }

export default DashboardWrapper
