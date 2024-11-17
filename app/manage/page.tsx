"use client"
import BtnDanger from '@/components/button/btn-danger'
import BtnWarning from '@/components/button/btn-warning'
import CreateTask from '@/components/task/createTask'
import Task from '@/components/task/task'
import React, { useEffect, useState } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import { alert } from '@/utils/alert'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import * as taskAction from '@/store/slices/taskSlice';



const PageManage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, isInit } = useSelector((state: RootState) => state.task);

    const [taskList, setTaskList] = useState<ITask[]>([])


    useEffect(() => {
        getTask()
    }, [])

    const getTask = async () => {

        if (isInit) {
            setTaskList([...tasks])
        }
        else {
            await dispatch(taskAction.fetchInitialTasks())
        }
    }

    const clearComplete = async () => {
        const res = await dispatch(taskAction.removeCompleteTasks())
        if (taskAction.removeCompleteTasks.fulfilled.match(res)) {
            console.log("res.payload : ", res.payload)
            setTaskList(res.payload);
            alert.any('success', 'Success!', 'Completed tasks cleared!');
        } else if (taskAction.removeCompleteTasks.rejected.match(res)) {
            alert.any('error', 'Error!', 'Failed to clear completed tasks.');
        }
    }

    const clearAll = async () => {
        const res = await dispatch(taskAction.removeAllTasks())
        if (taskAction.removeAllTasks.fulfilled.match(res)) {
            setTaskList(res.payload);
            alert.any('success', 'Success!', 'remove all tasks!');
        } else if (taskAction.removeCompleteTasks.rejected.match(res)) {
            alert.any('error', 'Error!', 'Failed to remove all tasks.');
        }
    }

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);

    return (
        <React.Fragment>
            <div className='mx-auto w-11/12 md:w-6/12 my-10'>
                <div className='font-bold text-[23px] text-white'>Task !</div>
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
                    <Task key={t.id} todo={t} />
                ))}

            </div>
        </React.Fragment>
    )
}

export default PageManage