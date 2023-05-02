import React, { useContext, useState, useEffect } from 'react'
import Loader from '../../utils/Loader'
import BackendContext from '../../Context/BackendContext';
import CreateAgentHeader from './CreateAgentHeader'
import { useNavigate } from 'react-router-dom';
export default function CreateAgent() {
    const navigate = useNavigate()
    const { CreateAgentFunc } = useContext(BackendContext)
    const [EmailError, setEmailError] = useState(false)
    const [loading, setloading] = useState(true)

    const CreateAgentSubmitFunc = (e) => {
        e.preventDefault()
        setEmailError(false)
        setloading(true)
        const form = document.getElementById('agentForm')
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)
        CreateAgentFunc(data).then(() => {
            navigate('/agents/success')
            setloading(false)
        }).catch(() => {
            setEmailError(true)
            setloading(false)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])


    return (
        <>
            <CreateAgentHeader></CreateAgentHeader>
            {loading ? <Loader /> :

                <div className='mt-7'>
                    <form id='agentForm' onSubmit={CreateAgentSubmitFunc} className='h-72' >

                        <div className='items-center flex flex-col space-y-4 h-[95%] border-b-[1px] border-gray-200'>
                            <div className='flex flex-col space-y-1 '>
                                <label htmlFor="username" className='relative left-1 text-sm'>Full Name <span className='text-red-500'>*</span></label>
                                <input required type="text" id='username' name='username' placeholder='Name' className='w-72 h-10 text-sm rounded-lg p-2 focus:ring-0 placeholder:p-1' />
                            </div>

                            <div className='flex flex-col space-y-1'>
                                <label htmlFor="email" className='relative left-1 text-sm'>Email <span className='text-red-500'>*</span></label>
                                <input required type="email" id='email' name='email' placeholder='name@gmail.com' className={`w-72 h-10 text-sm rounded-lg p-2 ${EmailError && 'border-red-400'} focus:ring-0 placeholder:p-1`} />
                                {EmailError && <p className="text-red-600 text-xs ">Email already exists</p>}

                            </div>

                            <div className='flex flex-col items-center space-y-1'>
                                <label htmlFor="password" className='relative right-24 text-sm'>Password <span className='text-red-500'>*</span></label>
                                <input required type="password" id='password' name='password' placeholder='Password' className='w-72 h-10 text-sm rounded-lg p-2 focus:ring-0 placeholder:p-1' />
                            </div>
                        </div>

                        <footer className='flex justify-between mt-2  px-5'>
                            <button onClick={(e) => { e.preventDefault(); navigate(-1) }} className={`relative w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                            <button type='submit' className={`relative  w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Next</button>
                        </footer>
                    </form>

                </div>
            }
        </>
    )
}
