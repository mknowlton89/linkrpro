import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { StyledButton, StyledLink, StyledLoading } from '../styles/StyledComponents';
import Button from './Button';

const HomeNavLoggedOut = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <StyledLoading />;
    if (error) return <div>{error.message}</div>;

    return (
        <div className="top-nav-wrapper">
            <div className="logo-wrapper">
                <a href="/" className="logo">LinkrPro</a>

            </div>
            <div className="profile-wrapper">
                <StyledLink href="/api/auth/login">Login</StyledLink>
            </div>

            <style jsx>{`
                .top-nav-wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 18px;
                    padding: 0px 20px 0px 20px;
                }

                .profile-wrapper {
                    display: flex;
                    align-items: center;
                }

                a {
                    text-decoration: none;
                    color: black;
                }

                a:hover {
                    cursor: pointer;
                }

                .logo {
                    font-size: 25px;
                    font-weight: bold;
                }

            `}</style>
        </div>
    )
}

export default HomeNavLoggedOut
