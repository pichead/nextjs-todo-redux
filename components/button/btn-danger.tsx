import React from 'react'

const BtnDanger = (props: { name: string, className: string, onClick?: () => void, type?: "button" | "submit" | "reset" | undefined }) => {
    return (
        <button className={"btn bg-red-700 hover:bg-red-500 rounded-[12px] px-3 py-1 text-white " + props.className} type={props.type ? props.type : "button"} onClick={props.onClick}>{props.name}</button>
    )
}

export default BtnDanger