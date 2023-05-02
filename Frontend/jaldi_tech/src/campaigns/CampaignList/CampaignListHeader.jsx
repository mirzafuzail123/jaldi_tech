import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react'
export default function CampaignListHeader({ SearchValue, setSearchValue }) {

    const role = JSON.parse(localStorage.getItem('user_data')).role

    const navigate = useNavigate()
    const location = useLocation();
    const { pathname } = location;
    const CreateCampaignRef = useRef()
    const [CreateCampaignDropdown, setCreateCampaignDropdown] = useState(false)

    const handleSearchSubmitFunc = (e) => {
        if (e.key === 'Enter') {
            setSearchValue(e.target.value)
        }
    };

    useEffect(() => {
        const handler = (e) => {
            if (CreateCampaignRef.current && !CreateCampaignRef.current.contains(e.target)) {
                setCreateCampaignDropdown(false)
            }

        }
        document.addEventListener('mousedown', handler)
    }, [])

    return (
        <header className='flex border-b-2 border-gray-300 justify-between px-5 h-16 w-full bg-gray-100 rounded-sm'>
            <div className='flex space-x-8  py-5'>
                <NavLink to={'/campaigns/active'} className={`text-sm ${pathname.includes('active') ? "text-blue-900 pb-10  border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>ACTIVE</NavLink>
                <NavLink to={'/campaigns/archived'} className={`text-sm ${pathname.includes('archived') ? "text-blue-900 pb-10   border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>ARCHIVED</NavLink>
                <NavLink to={'/campaigns/paused'} className={`text-sm ${pathname.includes('paused') ? "text-blue-900 pb-10 border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>PAUSED</NavLink>
            </div>

            <div class="relative my-4 ">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search"
                    onKeyDown={handleSearchSubmitFunc}
                    onChange={(e) => setSearchValue(e.target.value)
                    }
                    id="default-search"
                    className="block w-full h-4 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search campaigns"
                    required />
            </div>

            {role === 'Admin' &&
                <div className='relative my-3 mr-4 space-y-1' onClick={() => setCreateCampaignDropdown(!CreateCampaignDropdown)} >

                    <button className=' w-32 h-9 text-xs bg-slate-800 hover:bg-slate-600 text-white rounded-lg'><span className='py-1'><FontAwesomeIcon icon={faFileCirclePlus} /></span> Create Campaign</button>

                    {CreateCampaignDropdown && (

                        <div ref={CreateCampaignRef} className="absolute bg-white rounded-lg shadow-2xl  py-2  z-60">

                            <h1 onClick={() => navigate('/campaigns/createCampaign', { state: { 'type': 'facebook' } })} className="block cursor-pointer text-xs px-4 py-2 text-gray-800 hover:bg-slate-500 hover:text-white  whitespace-nowrap">Create Facebook Campaign</h1>
                            <h1 onClick={() => navigate('/campaigns/createCampaign', { state: { 'type': 'manual' } })} className="block cursor-pointer text-xs px-4 py-2 text-gray-800 hover:bg-slate-500 hover:text-white ">Add leads manually</h1>
                            <h1 onClick={() => navigate('/campaigns/createCampaign', { state: { 'type': 'csv' } })} className="block cursor-pointer text-xs px-4 py-2 text-gray-800 hover:bg-slate-500 hover:text-white ">Upload CSV file</h1>
                        </div>

                    )}
                </div>
            }


        </header>
    )
}
