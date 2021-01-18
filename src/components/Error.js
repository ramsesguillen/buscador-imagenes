import React from 'react'

export const Error = ({ mensaje }) => {
    return (
        <p className="my-3 p-4 text-center text-danger alert alert-info">
            { mensaje }
        </p>
    )
}
