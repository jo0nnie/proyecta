import React from 'react'

export const Badge = ({ text }) => {
    return (
        <span className="inline-block text-xs font-medium bg-red-100 text-blue-800 px-3 py-1 rounded-full">
            {text}
        </span>
    )
}
