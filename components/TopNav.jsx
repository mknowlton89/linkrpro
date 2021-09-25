import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { StyledButton, StyledLoading } from '../styles/StyledComponents';
import Button from './Button';

const TopNav = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <StyledLoading />;
    if (error) return <div>{error.message}</div>;

    return (
        user && (
            <div className="top-nav-wrapper">
                <div className="logo-wrapper">
                    <a href="/" className="logo">LinkrPro</a>

                </div>
                <div className="profile-wrapper">
                    <a href="/">Create</a>
                    <a href="/account">My Links</a>
                    <a href="/account">Account</a>
                    <a href="/api/auth/logout">Logout</a>
                    <img src={user.picture} />
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

            `}</style>
            </div>
        )
    )
}

export default TopNav
