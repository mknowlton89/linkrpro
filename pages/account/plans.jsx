import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';
import Button from '../../components/Button';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const plans = () => {
  const { user } = useContext(UserContext);

  console.log(user)

    return (
      <>
        <DashboardWrapper>
          <PageContentWrapper>
            <AccountPageTemplate headline="My Account" activePage={'plans'}>
                <div className="content-wrapper">
                  <div>
                    <div className="title-wrapper">
                      <h2>Current Plan (Disabled for Demo)</h2>
                    </div>
                    <div className='current-plan-card'>
                      <div className='current-plan-details'>
                        <div>
                          <h1>Pro Plan</h1>
                          <p>This is a description of the plan you are on. Isn't it great.</p>
                        </div>
                        <div>
                          <p>Next Bill Date: 12/31/2021</p>
                        </div>
                      </div>

                      <div className='current-plan-buttons'>
                        <Button primary>Change Plan</Button>
                        <Button>Billing History</Button>
                        <Button>Cancel Plan</Button>
                      </div>
                    </div>
                  </div>
                </div>
            </AccountPageTemplate>
          </PageContentWrapper>
        </DashboardWrapper>

        <style jsx>{`
            .content-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              width: 100%;
              padding: 10px 30px;
              box-sizing: border-box;
            }

            .title-wrapper {
              width: 100%;
              border-bottom: 1px solid black;
            }

            .current-plan-card {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              background-color: #f3f3f3;
              padding: 30px 0px;
              padding-left: 10%;
              padding-right: 10%;
              margin-top: 30px;
              filter: blur(2px);
            }

            .current-plan-buttons {
              display: flex;
              flex-direction: column;
            }

            .current-plan-details {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 70%;
            }
          `}</style>
        </>
    )
}

export default plans