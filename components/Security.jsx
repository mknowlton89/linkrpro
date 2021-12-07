import React from 'react'
import { PageContentWrapper } from '../styles/StyledComponents';
import { AccountHeader } from './AccountHeader';

const Security = () => {

    return (
        <PageContentWrapper>
            <h1>My Account</h1>
            <AccountHeader activePage={'security'}/>
        </PageContentWrapper>
    )
}

export default Security
