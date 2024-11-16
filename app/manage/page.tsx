"use client"
import BtnDanger from '@/components/button/btn-danger'
import BtnWarning from '@/components/button/btn-warning'
import CreateTask from '@/components/task/createTask'
import Task from '@/components/task/task'
import { task } from '@/services/task'
import React, { useEffect, useState } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import { alert } from '@/utils/alert'


const PageManage = () => {

    const [taskList, setTaskList] = useState<ITask[]>([])

    useEffect(() => {
        getTask()
    }, [])

    const getTask = async () => {
        const getTask = await task.findAllActive()
        if (getTask?.status === "ok") {
            setTaskList(getTask.data)
        }
        else {
            setTaskList([])
        }
    }

    const clearComplete = async () => {
        const clearTask = await task.removeComplete()
        if (clearTask && clearTask.status === "ok") {
            location.reload()
        }
        else {
            alert.any("error", "Error!", "ลบ Task ไม่สำเร็จ")
        }
    }


    const clearAll = async () => {
        const clearTask = await task.removeAll()
        if (clearTask && clearTask.status === "ok") {
            location.reload()
        }
        else {
            alert.any("error", "Error!", "ลบ Task ไม่สำเร็จ")
        }
    }


    return (
        <React.Fragment>
            <div className='mx-auto w-11/12 md:w-6/12 my-10'>
                <div className='font-bold text-[23px]'>Task !</div>
                <br />
                <div className='flex justify-start md:justify-end'>
                    <div className='flex justify-end gap-2'>
                        <BtnWarning name="Clear Completed" icon={<DoneAllIcon />} onClick={clearComplete} />
                        <BtnDanger name='Clear All' icon={<ClearIcon />} onClick={clearAll} />
                    </div>
                </div>
                <br />
                <CreateTask />
                <br />
                <div className='text-end my-1 mx-3'>
                    <small className='text-white'>{taskList.length} Task</small>
                </div>
                {taskList.map((t) => (
                    <Task todo={t} />
                ))}

            </div>
        </React.Fragment>
    )
}

export default PageManage