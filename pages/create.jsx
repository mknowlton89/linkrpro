import React, { useEffect, useContext } from 'react'
import CampaignBuilder from '../components/CampaignBuilder'
import DashboardWrapper from '../components/DashboardWrapper'
import API from '../utils/API'
import { UserContext } from '../context/UserContext';

const Create = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {

        if (user) {
          if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);

            if (queryParams.get('success')) {
              API.updateCreditCardOnFile(user, true)
            }
          };

        }

      }, [user])

    return (
        <DashboardWrapper>
            <CampaignBuilder />
        </DashboardWrapper>
    );
}

export default Create
