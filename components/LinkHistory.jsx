import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import { StyledLoading } from '../styles/StyledComponents';
import LoginRequired from '../components/LoginRequired'
import API from '../utils/API'

const LinkHistory = () => {
    const { user, error, isLoading } = useUser();
    const [linkHistory, setLinkHistory] = useState([]);

    useEffect(() => {
        if (user) {
            API.getLinkHistoryById(user.sub)
                .then((res) => setLinkHistory(res.data))
                .catch(err => console.log(err))
        }
    }, [user])

    if (isLoading) return <StyledLoading><h2>Loading...</h2></StyledLoading>;
    if (error) return <div>{error.message}</div>;

    console.log(linkHistory)

    return (
        <>
            <div className="history-table">
                <div className="table-title">
                    <h1>Your Link History</h1>
                </div>
                {linkHistory.map((link) => {
                    return <div className="table-row">
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
