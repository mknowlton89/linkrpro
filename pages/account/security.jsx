import React, { useState, useEffect } from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';
import Button from '../../components/Button';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import API from '../../utils/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from '../../components/ErrorMessage';

const security = () => {
  const { user } = useContext(UserContext);
  const [ userInfo, setUserInfo] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState(false);


  const handleInputChange = (input, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: input })
  }

  const resetForm = () => {
    document.getElementById("passwordReset").reset();
  }

  const handleSubmit = () => {
    API.updateUserPassword(user, userInfo)
      .then((res) => {
        if (res.status === 200) {
            resetForm();
            toast.success("SUCCESS!");
        }
      })
      .catch(err => setError(true))

    }


  useEffect(() => {
    if (userInfo.currentPassword && (userInfo.newPassword && userInfo.newPassword.length >= 6) && passwordsMatch) {
        setIsButtonDisabled(false);
    }
}, [userInfo, passwordsMatch])

useEffect(() => {
    if (userInfo.newPassword === userInfo.newPasswordConfirm) {
        setPasswordsMatch(true);
    } else {
        setPasswordsMatch(false);
    }
}, [userInfo])

    return (
      <>
        <ToastContainer />
        <DashboardWrapper>
          <PageContentWrapper>
            <AccountPageTemplate headline="My Account" activePage={'security'}>
            <div className="content-wrapper">
                  <div>
                    <div className="title-wrapper">
                      <h2>Update Your Password</h2>
                    </div>
                      <form id='passwordReset'>
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input type="password" id="currentPassword" name="currentPassword" onChange={(e) => handleInputChange(e.target.value, 'currentPassword')} />

                        <label htmlFor="newPassword">New Password:</label>
                        <input type="password" id="newPassword" name="newPassword" onChange={(e) => handleInputChange(e.target.value, 'newPassword')} />

                        <label htmlFor="newPasswordConfirm">Confirm New Password:</label>
                        <input type="password" id="email" name="email" onChange={(e) => handleInputChange(e.target.value, 'newPasswordConfirm')} />

                      </form>
                  </div>
                  {error && <ErrorMessage message='Please make sure your current password is correct.' />}
                  <div className='button-wrapper'>
                    <Button primary disabled={isButtonDisabled} onClick={handleSubmit}>Save</Button>
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