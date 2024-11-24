"use client"
import { apis } from '@/services/api'
import { alert } from '@/utils/alert'
import { ENV } from '@/utils/constants'
import { cookiesHandler } from '@/utils/cookies'
import React, { useState } from 'react'

const LoginPage = () => {

    const [loginData, setLoginData] = useState<{
        email: string,
        password: string
    }>({
        email: "",
        password: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const result = await apis.auth.login(loginData.email, loginData.password)

            if (!result) {
                alert.any("error", "Login error", "เข้าสู่ระบบผิดพลาด")
            }
            else if (result.statusCode !== 200) {
                alert.any("error", result.messageEn, result.messageTh)
            }
            else {
                alert.any("success", result.messageEn, result.messageTh)
                const save = cookiesHandler.set(ENV.accessTokenName, result.data.accessToken)
                if (save) {
                    location.reload()
                }
                else {
                    alert.any("error", "error to save session", "บันทึกการเข้าใช้งานผิดพลาด")
                }
            }
        } catch (error) {
            alert.any("error", "system error", "เกิดข้อผิดพลาดจากระบบ")
        }



    }

    return (
        <div className='w-full h-full  content-center'>
            <div className='flex justify-center '>
                <form onSubmit={handleSubmit} className='  rounded-[12px] bg-slate-400 w-full md:w-6/12 p-10'>
                    <div className='text-white font-bold text-[25px] text-center'>LOGIN</div>
                    <div className='text-white font-bold text-[22px]'>Email</div>
                    <input className='rounded-[12px] w-full px-3 py-2' placeholder='type email ...' type='email' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                    <br />
                    <br />
                    <div className='text-white font-bold text-[22px]'>Password</div>
                    <input className='rounded-[12px] w-full px-3 py-2' placeholder='type email ...' type='password' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                    <br />
                    <br />
                    <div className='flex justify-center'>
                        <button className='rounded-[12px] bg-green-600 px-3 py-2 text-white hover:bg-green-800'>Confirm</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default LoginPage