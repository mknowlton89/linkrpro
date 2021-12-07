import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';

const security = () => {

    return (
      <DashboardWrapper>
        <PageContentWrapper>
          <AccountPageTemplate headline="My Account" activePage={'security'}>
            <h1>This is children content</h1>
          </AccountPageTemplate>
        </PageContentWrapper>
      </DashboardWrapper>
    )
}

export default security