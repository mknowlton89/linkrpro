import React from 'react';
import { UserProvider } from '../context/UserContext';

export default function App({ Component, pageProps }) {

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}