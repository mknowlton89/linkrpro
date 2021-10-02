import React, { useEffect } from 'react'
import API from '../utils/API';

const SamplePage = () => {

    useEffect(() => {
        API.createNewUser({
            email: 'mknowlton89+10@gmail.com',
            password: "test",
        })
            .then(res => console.log(res))
            .catch (err => console.log(err))
    }, [])

    return (
            <>
                <div>
                    <h1>Hello from Sample Page</h1>
                </div>
            </>

    )
}

export default SamplePage
