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

            //   API.getStripeCustomerId(user.email)
            //     .then((res) => {
            //         let stripeCustomerId = res.data.
            //     })
            }
          };

        }

      }, [user])

      console.log(user)

    return (
        <DashboardWrapper>
            <CampaignBuilder />
        </DashboardWrapper>
    );
}

export default Create
