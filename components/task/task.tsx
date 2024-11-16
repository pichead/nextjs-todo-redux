"use client"

import React from 'react'
import BtnDanger from '../button/btn-danger'
import { task } from '@/services/task'
import { alert } from '@/utils/alert'

const Task = ({ todo }: { todo: ITask }) => {

    const completeTask = async () => {
        const complete = await task.complete(todo.id)

        if (complete && complete.status === "ok") {
            location.reload()
        }
        else {
            alert.any("error", "Error", "Complete task ไม่สำเร็จ")
        }

    }

    const pendingTask = async () => {
        const complete = await task.pending(todo.id)

        if (complete && complete.status === "ok") {
            location.reload()
        }
        else {
            alert.any("error", "Error", "Pending task ไม่สำเร็จ")
        }

    }

    const removeTask = async () => {
        const complete = await task.remove(todo.id)

        if (complete && complete.status === "ok") {
            location.reload()
        }
        else {
            alert.any("error", "Error", "ลบ task ไม่สำเร็จ")
        }

    }



    return (
        <div key={"todo_" + todo.id} className='flex mb-4 hover:cursor-pointer'>
            <div className={`w-10/12 md:w-11/12 ${todo.status === "SUCCESS" ? "bg-red-300 " : "bg-purple-100 "}  text-neutral-800 p-2  rounded-[12px]`} onClick={todo.status === "PENDING" ? completeTask : pendingTask}>
                <div className={`text-[15px] text-wrap ${todo.status === "SUCCESS" ? "line-through" : ""}`}>{todo.name}</div>
            </div>
            <BtnDanger className='w-2/12 md:w-1/12 ml-2 ' name='X' onClick={removeTask} />
        </div>
    )
}

export default Task