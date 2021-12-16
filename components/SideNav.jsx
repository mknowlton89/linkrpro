import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import { createBillingPortalSession } from 'next-stripe/client'
import API from '../utils/API'
import { UserContext } from '../context/UserContext'

const SideNav = () => {
    let [sessionUrl, setSessionUrl] = useState("");
    const { user } = useContext(UserContext);

    useEffect(() => {

        //     async function getBillingPortalUrl() {
        //         console.log("getBillingPortalUrl was called")
        //         const session =  await createBillingPortalSession({
        //             customer: "cus_KWPs3prS2AQvul",
        //             return_url: window.location.href
        //             })

        //         console.log(session.url)

        //         if (session) {
        //             setSessionUrl(session.url)
        //         }
        //     }

        if (user) {
            API.getStripeCustomerId(user.email)
                .then((res) => console.log(res))
                .catch(err => console.log(err))
            // getBillingPortalUrl()
        }



    }, [UserContext])

    const handleLogout = () => {
        localStorage.clear();
    }



    // console.log(sessionUrl)

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
                            <a href="/create">New Link</a>
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
                            <a href="/account/profile">Account</a>
                        </div>
                        <div className="link-group">
                            <Image
                                src="/icons/settings.png"
                                alt="Picture of the author"
                                width={20}
                                height={20}
                            />
                            <a href={sessionUrl}>Settings</a>
                            {/* <button onClick={handleBillingClick}>Billing</button> */}
                        </div>
                    </div>
                </div>
                <div className="bottom-content">
                        <div className="link-group bottom" onClick={() => handleLogout()}>
                            <Image
                                src="/icons/sign-in.png"
                                alt="Picture of the author"
                                width={20}
                                height={20}
                            />
                            <a href="/login">Sign Out</a>
                        </div>
                </div>
            </div>

            <style jsx>{`
                .side-nav-wrapper {
                    min-height: 100vh;
                    width: 300px;
                    background: rgb(59,169,156);
background: linear-gradient(143deg, rgba(59,169,156,1) 0%, rgba(105,209,197,1) 100%);
                    padding: 20px 35px;
                    box-sizing: border-box;
                    border-radius: 0px 5px 5npx 0px;
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
                    color: #e6e6e6;
                }

                .side-nav-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                }

                .top-content, .links, .bottom-content{
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
                    background-color: #69D1C5;
                    border-radius: 10px;
                }


            `}</style>
        </div>
    )
}

export default SideNav
