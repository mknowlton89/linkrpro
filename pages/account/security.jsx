import React, { useState } from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';
import Button from '../../components/Button';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const security = () => {
  const { user } = useContext(UserContext);
  const [ userInfo, setUserInfo] = useState();


  const handleInputChange = (input, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: input })
  }

  const handleSubmit = () => {
    //TODO: Need to build a new endpoint that does the following
    //TODO: Need to validate PW
    //TODO: Then encrypt new PW
    //TODO: Save the encrypted pw
    //TODO: Return a success message
    // API.updateUserInfo(user, userInfo)
    //   .then((res) => console.log(res.data))
    //   .catch(err => console.log(err))
  }

    return (
      <>
        <DashboardWrapper>
          <PageContentWrapper>
            <AccountPageTemplate headline="My Account" activePage={'security'}>
            <div className="content-wrapper">
                  <div>
                    <div className="title-wrapper">
                      <h2>Update Your Password</h2>
                    </div>
                      <form>
                        <label for="currentPassword">Current Password:</label>
                        <input type="text" id="currentPassword" name="currentPassword" onChange={(e) => handleInputChange(e.target.value, 'currentPassword')} />

                        <label for="newPassword">New Password:</label>
                        <input type="password" id="newPassword" name="newPassword" onChange={(e) => handleInputChange(e.target.value, 'newPassword')} />

                        <label for="newPasswordConfirm">Confirm New Password:</label>
                        <input type="password" id="email" name="email" onChange={(e) => handleInputChange(e.target.value, 'newPasswordConfirm')} />

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
            max-width: 300px;
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

export default security