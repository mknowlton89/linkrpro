import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router'

const TopNav = () => {
    const { user } = useContext(UserContext);
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear();
        router.reload()
    }

    return (
        user && (
            <div className="top-nav-wrapper">
                <div className="logo-wrapper">
                    <a href="/" className="logo">LinkrPro</a>

                </div>
                <div className="profile-wrapper">
                    <a href="/create">Create</a>
                    <a href="/mylinks">My Links</a>
                    <a href="/account">Account</a>
                    <button onClick={handleLogout}>Logout</button>
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
