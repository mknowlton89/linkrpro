import React, { useEffect, useState } from 'react'
import { StyledLoading } from '../styles/StyledComponents';
import LoginRequired from '../components/LoginRequired'
import API from '../utils/API'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { PageContentWrapper } from '../styles/StyledComponents';

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
            <PageContentWrapper>
                    <h1>Your Link History</h1>
                    <div className="table-row">
                        {linkHistory.map((link) => {
                            return <p key={link._id}>{link.link}</p>
                        })}
                    </div>

            </PageContentWrapper>

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

                .table-row p {
                    padding: 12px;
                    font-size: 18px;
                    margin: 0;
                }

                .table-row p:hover {
                    background-color: #fdfdfd
                }

            `}</style>
        </>
    )
}

export default LinkHistory
