import React from 'react'

const Card = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <React.Fragment>
            <div className='border rounded-[12px] p-4 bg-white'>
                {children}
            </div>
        </React.Fragment>
    )
}

export default Card