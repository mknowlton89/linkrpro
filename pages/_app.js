// pages/_app.js
import React, { useContext } from 'react';
// import { UserProvider } from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState({});


  return (
    <UserContext.Provider value={currentUser}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}