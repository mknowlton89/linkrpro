import React from 'react'
import { AccountHeader } from './AccountHeader'

const AccountContentWrapper = ({ children }) => {
    return (
        <>
            <div className='personal-details-wrapper'>{children}</div>

            <style jsx>{`
                .personal-details-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 500px;
                    background-color: #fff;
                    box-sizing: border-box;
                }
            `}</style>
        </>
    )
}

export default AccountContentWrapper
