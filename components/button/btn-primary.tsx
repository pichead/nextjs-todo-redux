import React, { ReactNode } from 'react'

const BtnPrimary = (props: { name: string, className?: string, onClick?: () => void, type?: "button" | "submit" | "reset" | undefined, icon?: ReactNode }) => {

    const iconElement = (
        <span className="mx-1">
            {props.icon}
        </span>
    )
    return (
        <button className={"btn bg-violet-700 hover:bg-violet-500 rounded-[12px] px-3 py-1 text-white text-center" + props.className} type={props.type ? props.type : "button"} onClick={props.onClick}>
            <div className='flex items-center justify-center'>
                {props.icon ? iconElement : null}
                <div>{props.name}</div>
            </div>
        </button>
    )
}

export default BtnPrimary