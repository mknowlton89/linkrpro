import React from 'react'
import { AccountHeader } from './AccountHeader'

const AccountContentWrapper = ({ children }) => {
    return (
        <>
            <div className='account-content-wrapper'>{children}</div>

            <style jsx>{`
                .account-content-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    box-sizing: border-box;
                }
            `}</style>
        </>
    )
}

export default AccountContentWrapper
