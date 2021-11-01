import React, { useEffect } from 'react';
import CampaignBuilder from '../components/CampaignBuilder'
import TopNav from '../components/TopNav'
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import API from '../utils/API';
import SideNav from '../components/SideNav';


export default function create() {
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
          <CampaignBuilder />
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

// export async function getServerSideProps(context) {
//   const client = await clientPromise

//   const isConnected = await client.isConnected()

//   return {
//     props: { isConnected },
//   }
// }
