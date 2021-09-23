import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import { StyledLoading } from '../styles/StyledComponents';
import { useRouter } from 'next/router'
import TopNav from '../components/TopNav';
import Button from '../components/Button';

const SamplePage = () => {
    const { user, error, isLoading } = useUser();
    const router = useRouter()

    const goToLogin = () => {
        router.push('api/auth/login')
    }

    if (isLoading) return <StyledLoading><h2>Loading...</h2></StyledLoading>;
    if (error) return <div>{error.message}</div>;

    // if (!user && !isLoading) {
    //     router.push('/api/auth/login')
    // }

    return (
        user ? (
            <>
                <TopNav />
                <div>
                    <h1>Hello from Sample Page</h1>
                </div>
            </>
        ) :
                <StyledLoading>
                    <h2>You must be logged in to view this.</h2>
                    <Button
                    onClick={() => goToLogin()}
                    primary>
                    Login</Button>
                </StyledLoading>
    )
}

export default SamplePage
