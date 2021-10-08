import React, { useEffect, useState } from 'react'
import { StyledLoading } from '../styles/StyledComponents';
import LoginRequired from '../components/LoginRequired'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const LinkHistory = () => {
    const [linkHistory, setLinkHistory] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            API.getLinkHistoryById(user._id)
                .then((res) => setLinkHistory(res.data))
                .catch(err => console.log(err))
        }
    }, [user])

    console.log(linkHistory)

    return (
        <>
            <div className="history-table">
                <div className="table-title">
                    <h1>Your Link History</h1>
                </div>
                {linkHistory.map((link) => {
                    return <div className="table-row" key={link._id}>
                        <p>{link.link}</p>
                    </div>
                })}
            </div>

            <style jsx>{`
                .history-table {
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                }

                .table-title {
                    background-color: #efefef;
                    margin-bottom: 30px;
                }

                .table-title h1 {
                    padding-left: 20px;
                }

                .table-row {
                    padding-left: 20px;
                    font-size: 18px;
                    background-color: #fdfdfd;
                }

            `}</style>
        </>
    )
}

export default LinkHistory
