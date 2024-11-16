"use client"
import React, { useState } from 'react'
import BtnPrimary from '../button/btn-primary'
import { task } from '@/services/task'
import { alert } from '@/utils/alert'
import { useRouter } from 'next/navigation'

const CreateTask = () => {
    const router = useRouter()
    const [newTask, setNewTask] = useState<string>("")

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value)
    }

    const handleCreateNewTask = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const createTask = await task.create(newTask)

        if (createTask && createTask.status == "ok") {
            alert.any("success", "Success!", createTask.message)
            // router.('/manage')
        }
        else {
            alert.any("error", "Error!", "สร้าง Task ไม่สำเร็จ")
        }

    }

    return (
        <form className='flex' onSubmit={handleCreateNewTask}>
            <input className='rounded-[12px] py-2 px-3 text-black w-full mr-2' type='text' placeholder='New Task ....' value={newTask} onChange={inputChange} />
            <BtnPrimary name='Create' type="submit" />
        </form>
    )
}

export default CreateTask