import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { StyledButton, StyledLink, StyledLoading, StyledSecondaryLink } from '../styles/StyledComponents';
import Button from './Button';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const HomeNavLoggedOut = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="top-nav-wrapper">
            <div className="logo-wrapper">
                <a href="/" className="logo">LinkrPro</a>

            </div>
            <div className="profile-wrapper">
                <StyledSecondaryLink className="secondary" href="/login">Login</StyledSecondaryLink>
                <StyledLink className="primary" href="/signup">Try it Free</StyledLink>
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

                .profile-wrapper a {
                    margin-left: 10px;
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
