import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';

const plans = () => {

    return (
      <DashboardWrapper>
        <PageContentWrapper>
          <AccountPageTemplate headline="My Account" activePage={'plans'}>
            <h1>This is children content</h1>
          </AccountPageTemplate>
        </PageContentWrapper>
      </DashboardWrapper>
    )
}

export default plans