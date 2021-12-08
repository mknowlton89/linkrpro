import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';
import Button from '../../components/Button';

const account = () => {

    return (
      <>
        <DashboardWrapper>
          <PageContentWrapper>
            <AccountPageTemplate headline="My Account" activePage={'profile'}>
              <div className="content-wrapper">
                <div>
                  <div className="title-wrapper">
                    <h2>Personal Information</h2>
                  </div>
                    <form>
                      <label for="fname">First Name:</label>
                      <input type="text" id="fname" name="fname" />

                      <label for="lname">Last Name:</label>
                      <input type="text" id="lname" name="lname" />

                      <label for="email">Email Address:</label>
                      <input type="email" id="email" name="email" />

                      <label for="company">Company Name:</label>
                      <input type="text" id="company" name="company" />
                    </form>
                </div>
                <div className='button-wrapper'>
                  <Button primary>Save</Button>
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

          .button-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
          }

          form {
            display: flex;
            flex-direction: column;
            padding-top: 20px;
          }

          label, input {
            padding: 5px 0px;
            font-size: 15px;
          }

          label {
            font-weight: bold;
          }

          input {
            margin-bottom: 10px;
            padding-left: 10px;
          }
        `}</style>
      </>
    )
}

export default account