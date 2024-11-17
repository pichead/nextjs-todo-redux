"use client"

import React, { useEffect, useState } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import * as taskAction from '@/store/slices/taskSlice';

function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { tasks, isInit } = useSelector((state: RootState) => state.task);

  const [taskList, setTaskList] = useState<ITask[]>([...tasks])

  const getTask = async () => {
    if (isInit) {
      setTaskList([...tasks])
    }
    else {
      await dispatch(taskAction.fetchInitialTasks())
    }
  }


  useEffect(() => {
    getTask()
  }, [])


  useEffect(() => {
    setTaskList([...tasks])
  }, [tasks])

  return (
    <div>


      <div className='flex flex-wrap text-white'>
        <div className='w-4/12 mb-5'>
          <div className='mx-3  rounded bg-pink-500 hover:bg-pink-600 h-[160px] flex items-center justify-center'>
            <div className='text-center'>
              <div className='text-[33px] font-bold'>{taskList.length}</div>
              <div className='text-[17px] font-bold mt-4'>All</div>
            </div>
          </div>
        </div>
        <div className='w-4/12 mb-5'>
          <div className='mx-3  rounded bg-yellow-600 hover:bg-yellow-700 h-[160px] flex items-center justify-center'>
            <div className='text-center'>
              <div className='text-[33px] font-bold'>{taskList.filter((f) => f.status === "PENDING").length}</div>
              <div className='text-[17px] font-bold mt-4'>Pending</div>
            </div>
          </div>
        </div>
        <div className='w-4/12 mb-5'>
          <div className='mx-3  rounded bg-emerald-600 hover:bg-emerald-700 h-[160px] flex items-center justify-center'>
            <div className='text-center'>
              <div className='text-[33px] font-bold'>{taskList.filter((f) => f.status === "SUCCESS").length}</div>
              <div className='text-[17px] font-bold mt-4'>Success</div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className='mx-3'>
        <div className='w-12/12 md:w-7/12 mx-auto'>
          <table className='text-black w-full text-center'>
            <thead className='border-b border-zinc-900'>
              <tr>
                <th className='bg-slate-400 rounded-tl-[12px]  p-2'>ID</th>
                <th className='bg-slate-400 p-2'>Name</th>
                <th className='bg-slate-400 p-2'>Status</th>
                <th className='bg-slate-400 rounded-tr-[12px]   p-2'>Create At</th>
              </tr>
            </thead>
            <tbody className='mt-2'>
              {taskList.map((m, i: number) => (
                <tr key={"tb_" + i} className='border-b border-zinc-900'>
                  <td className={`${i % 2 === 0 ? " bg-white " : " bg-emerald-100 "} ${i + 1 === taskList.length ? " rounded-bl-[12px] " : " "}  my-2`}>{m.id}</td>
                  <td className={`${i % 2 === 0 ? " bg-white " : " bg-emerald-100 "} p-2`}>{m.name}</td>
                  <td className={`${i % 2 === 0 ? " bg-white " : " bg-emerald-100 "} p-2`}>{m.status}</td>
                  <td className={`${i % 2 === 0 ? " bg-white " : " bg-emerald-100 "} ${i + 1 === taskList.length ? " rounded-br-[12px] " : " "}   p-2`}> {(new Date(m.createdAt)).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

export default Home