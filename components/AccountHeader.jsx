import React from 'react'

export const AccountHeader = ({ activePage }) => {
    return (
        <>
            <div className="account-header-wrapper">
                <a className={(activePage == 'profile') ? 'active' : ''} href="/account/profile">My Profile</a>
                <a className={(activePage === 'plans') ? 'active' : ''} href="/account/plans">Plan & Billing</a>
                <a className={(activePage === 'security') ? 'active' : ''} href="/account/security">Security</a>

            </div>

            <style jsx>{`
                .account-header-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 90px;
                    background-color: #fff;
                    box-sizing: border-box;
                    margin: 30px 0px;
                }

                a {
                    margin: 10px 25px;
                    padding: 0px 5px 5px 5px;
                    font-size: 16px;
                    border-bottom: 3px solid transparent;
                }

                .active {
                    border-bottom: 3px solid #21897E;
                }
            `}</style>
        </>
    )
}
