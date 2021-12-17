import React from 'react'

const ErrorMessage = ({message}) => {
    return (
        <>
            <p>{message}</p>
            <style jsx>{`

            p {
                color: #e42908;
                font-weight: bold;
            }

            `}</style>
        </>

    )
}

export default ErrorMessage
