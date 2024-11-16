"use client"

import React from 'react'
import BtnDanger from '../button/btn-danger'
import { alert } from '@/utils/alert'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import * as taskAction from '@/store/slices/taskSlice';
import DeleteIcon from '@mui/icons-material/Delete';
const Task = ({ todo }: { todo: ITask }) => {
    const dispatch = useDispatch<AppDispatch>();

    const completeTask = async () => {
        console.log(todo.name)
        const res = await dispatch(taskAction.completeTask(todo.id))
        if (taskAction.completeTask.fulfilled.match(res)) {
            alert.any('success', 'Success!', 'Pending tasks!');
        } else if (taskAction.completeTask.rejected.match(res)) {
            alert.any('error', 'Error!', 'Failed to Pending tasks!');
        }
    }

    const pendingTask = async () => {
        console.log(todo.name)
        const res = await dispatch(taskAction.pendingTask(todo.id))
        if (taskAction.pendingTask.fulfilled.match(res)) {
            alert.any('success', 'Success!', 'Pending tasks!');
        } else if (taskAction.pendingTask.rejected.match(res)) {
            alert.any('error', 'Error!', 'Failed to Pending tasks!');
        }
    }

    const removeTask = async () => {

        const res = await dispatch(taskAction.removeTask(todo.id))
        if (taskAction.removeTask.fulfilled.match(res)) {
            alert.any('success', 'Success!', 'Remove tasks!');
        } else if (taskAction.removeTask.rejected.match(res)) {
            alert.any('error', 'Error!', 'Failed to Remove tasks!');
        }

    }



    return (
        <div key={"todo_" + todo.id} className='flex mb-4 hover:cursor-pointer'>
            <div className={`w-10/12 md:w-11/12 ${todo.status === "SUCCESS" ? "bg-green-200 " : "bg-purple-100 "}  text-neutral-800 p-2  rounded-[12px]`} onClick={todo.status === "PENDING" ? completeTask : pendingTask}>
                <div className={`text-[15px] text-wrap ${todo.status === "SUCCESS" ? "line-through" : ""}`}>{todo.name}</div>
            </div>
            <BtnDanger className='w-2/12 md:w-1/12 ml-2 ' name='' onClick={removeTask} icon={<DeleteIcon />} />
        </div>
    )
}

export default Task