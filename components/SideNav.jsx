import React from 'react'
import Button from './Button';
import { useRouter } from 'next/router'
import Image from 'next/image'

const SideNav = () => {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear();
        router.reload()
    }

    return (
        <div className="side-nav-wrapper">
            <div className="side-nav-content">
                <div className="top-content">
                    <h1>Sourcely</h1>
                    <div className="links">
                        <div className="link-group">
                            <Image
                                src="/icons/add.png"
                                alt="Picture of the author"
                                width={20}
                                height={20}
                            />
                            <a href="/create">Campaign Builder</a>
                        </div>
                        <div className="link-group">
                            <Image
                                src="/icons/box.png"
                                alt="Picture of the author"
                                width={20}
                                height={20}
                            />
                            <a href="/mylinks">Link History</a>
                        </div>
                        <div className="link-group">
                            <Image
                                src="/icons/user.png"
                                alt="Picture of the author"
                                width={20}
                                height={20}
                            />
                            <a href="/account">Account</a>
                        </div>
                        <div className="link-group">
                            <Image
                                src="/icons/credit-card.png"
                                alt="Picture of the author"
                                width={20}
                                height={20}
                            />
                            <a href="/account">Billing</a>
                        </div>
                    </div>
                </div>
                <div className="bottom-content">
                    {/* <Button onClick={() => handleLogout()}> */}
                        <div className="link-group bottom" onClick={() => handleLogout()}>
                            <Image
                                src="/icons/sign-in.png"
                                alt="Picture of the author"
                                width={20}
                                height={20}
                            />
                            <a href="/account">Sign Out</a>
                        </div>
                    {/* </Button> */}
                </div>
            </div>

            <style jsx>{`
                .side-nav-wrapper {
                    min-height: 100vh;
                    width: 300px;
                    background: rgb(108,108,235);
                    background: linear-gradient(143deg, rgba(108,108,235,1) 0%, rgba(62,62,175,1) 100%);
                    padding: 20px 35px;
                    box-sizing: border-box;
                    border-radius: 0px 5px 5px 0px;
                }

                .side-nav-wrapper a {
                    text-decoration: none;
                    color: black;
                    font-size: 16px;
                    font-weight: bold;
                }

                .side-nav-wrapper a, h1 {
                    padding: 20px;
                    margin: 5px 0px;
                }

                h1 {
                    color: #d4d4ff;
                }

                .side-nav-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                }

                .top-content, .links{
                    display: flex;
                    flex-direction: column;
                }

                .bottom-content {
                    display: flex;
                    flex-direction: column;
                }

                .links {
                    padding-top: 40px;
                }

                .link-group {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding-left: 20px;
                }

                .link-group:hover {
                    background-color: #6c6ceb;
                    border-radius: 10px;
                }

                .bottom {
                    justify-content: center;
                }
            `}</style>
        </div>
    )
}

export default SideNav
