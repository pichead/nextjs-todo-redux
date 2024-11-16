"use client"
import React, { useState } from 'react'
import BtnPrimary from '../button/btn-primary'
import { alert } from '@/utils/alert'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import * as taskAction from '@/store/slices/taskSlice';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
const CreateTask = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [newTask, setNewTask] = useState<string>("")

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value)
    }

    const handleCreateNewTask = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await dispatch(taskAction.createTask(newTask))

        if (taskAction.createTask.fulfilled.match(res)) {
            alert.any('success', 'Success!', 'Create tasks!');
        } else if (taskAction.createTask.rejected.match(res)) {
            alert.any('error', 'Error!', 'Failed to Create tasks!');
        }
        setNewTask("")

    }

    return (
        <form className='flex' onSubmit={handleCreateNewTask}>
            <input className='rounded-[12px] py-2 px-3 text-black w-full mr-2' type='text' placeholder='New Task ....' value={newTask} onChange={inputChange} />
            <BtnPrimary name='Create' type="submit" icon={<PlaylistAddIcon />} />
        </form>
    )
}

export default CreateTask