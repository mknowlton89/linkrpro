import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import LinkHistory from '../components/LinkHistory'
import LoginRequired from '../components/LoginRequired'
import TopNav from '../components/TopNav'

export const mylinks = () => {
    const { user, error, isLoading } = useUser();
    return (
        user ? (
        <>
            <TopNav />
            <LinkHistory />
        </>
        ) : <LoginRequired />
    )
}

export default mylinks