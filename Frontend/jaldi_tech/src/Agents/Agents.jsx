import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Agents() {
    const naviate = useNavigate()
    const [dummy, setdummy] = useState(false)
    useEffect(() => {
        naviate('/agents/active')
        setdummy(!dummy)
    }, [])

    return (
        <div>
            <span className='text-black text-3xl font-semibold  border-b-4 border-yellow-400 rounded-sm pb-2'>Agents</span>
            <div className='bg-white h-[26rem] w-full mt-10 rounded-md '>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
