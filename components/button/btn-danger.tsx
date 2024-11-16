import React, { ReactNode } from 'react'

const BtnDanger = (props: { name: string, className?: string, onClick?: () => void, type?: "button" | "submit" | "reset" | undefined, icon?: ReactNode }) => {

    const iconElement = (
        <span className="mx-1">
            {props.icon}
        </span>
    )

    return (
        <button className={"btn bg-red-700 hover:bg-red-500 rounded-[12px] px-3 py-1 text-white py-auto " + props.className} type={props.type ? props.type : "button"} onClick={props.onClick}>
            <div className='flex items-center justify-center'>
                {props.icon ? iconElement : null}
                <div>{props.name}</div>
            </div>

        </button>
    )
}

export default BtnDanger