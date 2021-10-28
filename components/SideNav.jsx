import React from 'react'

const SideNav = () => {
    return (
        <div className="side-nav-wrapper">
            <div className="side-nav-content">
                <div className="top-content">
                    <h1>Paramly</h1>
                    <div className="links">
                        <a href="/create">Campaign Builder</a>
                        <a href="/create">Link History</a>
                        <a href="/create">My Profile</a>
                        <a href="/create">Billing</a>
                    </div>
                </div>
                <div className="bottom-content">
                    <a href="/logout">Logout</a>
                </div>
            </div>

            <style jsx>{`
                .side-nav-wrapper {
                    min-height: 100vh;
                    width: 300px;
                    background: rgb(108,108,235);
                    background: linear-gradient(143deg, rgba(108,108,235,1) 0%, rgba(62,62,175,1) 100%);
                    padding-left: 30px;
                }

                .side-nav-wrapper a {
                    text-decoration: none;
                    color: white;
                    font-size: 16px;
                    margin: 20px 0px 20px 0px;
                }

                .side-nav-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100vh;
                }

                .top-content, .links{
                    display: flex;
                    flex-direction: column;
                }

                .links {
                    padding-top: 40px;
                }
            `}</style>
        </div>
    )
}

export default SideNav
