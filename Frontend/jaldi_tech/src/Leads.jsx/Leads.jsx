import React, { useEffect, useState, useContext } from 'react'
import BackendContext from '../Context/BackendContext'
import { useNavigate, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faRefresh } from '@fortawesome/free-solid-svg-icons'


export default function Leads() {
    const naviate = useNavigate()
    const { Reload, setReload } = useContext(BackendContext)

    useEffect(() => {
        naviate('/leads/active')
    }, [Reload])

    return (
        <div>
            <span className='text-black text-3xl font-semibold  border-b-4 border-yellow-400 rounded-sm pb-2'>Leads</span>
            <span className='mx-2 text-lg cursor-pointer text-slate-600 hover:text-slate-800' onClick={() => { setReload(!Reload) }}><FontAwesomeIcon icon={faRefresh} /></span>

            <div className='bg-white h-[26rem] w-full mt-10 rounded-md  '>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
