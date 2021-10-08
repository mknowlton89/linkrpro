import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { StyledButton, StyledLink, StyledLoading } from '../styles/StyledComponents';
import Button from './Button';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const HomeNavLoggedIn = () => {
    const { user } = useContext(UserContext);

    return (
        user && (
            <div className="top-nav-wrapper">
                <div className="logo-wrapper">
                    <a href="/" className="logo">LinkrPro</a>

                </div>
                <div className="profile-wrapper">
                    <a className="logout" href="/api/auth/logout">Logout</a>
                    <StyledLink href="/create">Dashboard</StyledLink>
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
                    padding-left: 20px;
                    padding-right: 20px;
                }

                a:hover {
                    cursor: pointer;
                }

                img {
                    max-height: 55px;
                    padding: 10px 0px 10px 20px;
                }

                .logo {
                    font-size: 25px;
                    font-weight: bold;
                }

                .logout {
                    font-style: italics;
                }

            `}</style>
            </div>
        )
    )
}

export default HomeNavLoggedIn
