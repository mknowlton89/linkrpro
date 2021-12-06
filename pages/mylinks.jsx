import React, { useState, useEffect} from 'react';
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LinkHistory from '../components/LinkHistory';
import DashboardWrapper from '../components/DashboardWrapper';

export const mylinks = () => {
  const [linkHistory, setLinkHistory] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
        API.getLinkHistoryById(user._id)
            .then((res) => setLinkHistory(res.data))
            .catch(err => console.log(err))
    }
}, [user])

    return (
      <DashboardWrapper>
        <LinkHistory data={linkHistory}/>
      </DashboardWrapper>
    )
}

export default mylinks