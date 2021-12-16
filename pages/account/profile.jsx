import React, { useState } from 'react'
import DashboardWrapper from '../../components/DashboardWrapper';
import { PageContentWrapper } from '../../styles/StyledComponents';
import AccountPageTemplate from '../../components/AccountPageTemplate';
import Button from '../../components/Button';
import API from '../../utils/API';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const account = () => {
  const [ userInfo, setUserInfo] = useState();
  const { user } = useContext(UserContext);

  const handleInputChange = (input, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: input })
  }

  const handleSubmit = () => {
    API.updateUserInfo(user, userInfo)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Your account has been updated.")
        }
      })
      .catch(err => {
        toast.error('Sorry - we were unable to save your updates.')
      })
  }

    return (
      <>
        <ToastContainer />
        <DashboardWrapper>
          <PageContentWrapper>
            <AccountPageTemplate headline="My Account" activePage={'profile'}>
              <div className="content-wrapper">
                <div>
                  <div className="title-wrapper">
                    <h2>Personal Information</h2>
                  </div>
                    <form>
                      <label htmlFor="firstName">First Name:</label>
                      <input type="text" id="firstName" name="firstName" defaultValue={user ? user.firstName : ''} onChange={(e) => handleInputChange(e.target.value, 'firstName')} />

                      <label htmlFor="lastName">Last Name:</label>
                      <input type="text" id="lastName" name="lastName" defaultValue={user ? user.lastName : ''} onChange={(e) => handleInputChange(e.target.value, 'lastName')} />

                      <label htmlFor="email">Email Address:</label>
                      <input type="email" id="email" name="email" defaultValue={user ? user.email : ''} onChange={(e) => handleInputChange(e.target.value, 'email')} />

                      <label htmlFor="company">Company Name:</label>
                      <input type="text" id="companyName" name="companyName" defaultValue={user ? user.companyName : ''} onChange={(e) => handleInputChange(e.target.value, 'companyName')} />
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