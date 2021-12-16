import React from 'react'
import AccountContentWrapper from './AccountContentWrapper';
import { AccountHeader } from './AccountHeader';

const AccountPageTemplate = ({headline, activePage, children}) => {

    return (
        <>
          <h1>{headline}</h1>
          <AccountHeader activePage={activePage} />
          <AccountContentWrapper>
            {children}
          </AccountContentWrapper>
        </>
    )
}

export default AccountPageTemplate