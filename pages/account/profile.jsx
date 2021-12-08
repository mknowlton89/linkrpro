import React, { useState } from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';
import Button from '../../components/Button';
import API from '../../utils/API';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const account = () => {
  const [ userInfo, setUserInfo] = useState({});
  const { user } = useContext(UserContext);

  const handleInputChange = (input, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: input })
  }

  const handleSubmit = () => {
    API.updateUserInfo(user, userInfo)
      .then((res) => console.log(res.data))
      .catch(err => console.log(err))
  }

  console.log(userInfo);

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
                      <label for="firstName">First Name:</label>
                      <input type="text" id="firstName" name="firstName" onChange={(e) => handleInputChange(e.target.value, 'firstName')} />

                      <label for="lastName">Last Name:</label>
                      <input type="text" id="lastName" name="lastName" onChange={(e) => handleInputChange(e.target.value, 'lastName')} />

                      <label for="email">Email Address:</label>
                      <input type="email" id="email" name="email" onChange={(e) => handleInputChange(e.target.value, 'email')} />

                      <label for="company">Company Name:</label>
                      <input type="text" id="companyName" name="companyName" onChange={(e) => handleInputChange(e.target.value, 'companyName')} />
                    </form>
                </div>
                <div className='button-wrapper'>
                  <Button primary onClick={handleSubmit}>Save</Button>
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