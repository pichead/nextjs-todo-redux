import React from 'react'

const BtnPrimary = (props: { name: string, className?: string, onClick?: () => void, type?: "button" | "submit" | "reset" | undefined }) => {
    return (
        <button className={"btn bg-violet-700 hover:bg-violet-500 rounded-[12px] px-3 py-1 text-white " + props.className} type={props.type ? props.type : "button"} onClick={props.onClick}>{props.name}</button>
    )
}

export default BtnPrimary