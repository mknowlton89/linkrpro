import React from 'react'
import { PageContentWrapper } from '../styles/StyledComponents';
import { AccountHeader } from './AccountHeader';

const Profile = () => {

    return (
        <PageContentWrapper>
            <h1>My Account</h1>
            <AccountHeader activePage={'profile'}/>
        </PageContentWrapper>
    )
}

export default Profile
