import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import API from '../utils/API'


const LinkHistory = () => {
    const { linkHistory, setLinkHistory } = useState([])
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        if (user) {
            // console.log(user.sub)
            API.getLinkHistoryById(user.sub)
                // .then(res => console.log(res))
                .then((res) => console.log(res.data))
                .catch(err => console.log(err))
        }
    }, [user])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div>

        </div>
    )

}

export default LinkHistory
