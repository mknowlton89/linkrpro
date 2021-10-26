import React from 'react';
import { UserProvider } from '../context/UserContext';
import '../styles/globalStyles.css'

export default function App({ Component, pageProps }) {

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}