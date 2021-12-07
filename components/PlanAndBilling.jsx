import React from 'react'
import { PageContentWrapper } from '../styles/StyledComponents';
import { AccountHeader } from './AccountHeader';

const PlanAndBilling = () => {

    return (
        <PageContentWrapper>
            <h1>My Account</h1>
            <AccountHeader activePage={'plans'}/>
        </PageContentWrapper>
    )
}

export default PlanAndBilling
