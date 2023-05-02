import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function AgentsHeader({ SearchValue, setSearchValue }) {
    const naviagte = useNavigate()
    const location = useLocation();
    const { pathname } = location;

    const handleSearchSubmitFunc = (e) => {
        if (e.key === 'Enter') {
            setSearchValue(e.target.value)
        }
    };

    return (
        <header className='flex border-b-2 border-gray-300 justify-between px-5 h-16 w-full bg-gray-100 rounded-sm'>
            <div className='flex space-x-8  py-5'>
                <NavLink to={'/agents/active'} className={`text-sm ${pathname.includes('active') ? "text-blue-900 pb-10  border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>ACTIVE</NavLink>
                <NavLink to={'/agents/paused'} className={`text-sm ${pathname.includes('paused') ? "text-blue-900 pb-10 border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>PAUSED</NavLink>
            </div>

            <div className="relative my-4 ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search"
                    onKeyDown={handleSearchSubmitFunc}
                    onChange={(e) => setSearchValue(e.target.value)
                    }
                    id="default-search"
                    className="block w-full h-4 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search agents"
                    required />
            </div>

            <button
                onClick={() => naviagte('/agents/createAgent')} className='w-24 h-9 my-3 text-xs bg-slate-800 hover:bg-slate-600 text-white rounded-lg'>
                <span className='text-[0.70rem] relative bottom-[0.10rem]'><FontAwesomeIcon icon={faUserPlus} /></span> Add Agent</button>


        </header>
    )
}
