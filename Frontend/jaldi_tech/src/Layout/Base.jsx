import React, { useState, useEffect } from 'react'
import Sidebar from '../partials/Sidebar'
import Header from '../partials/Header'
import Notification from '../partials/Notification'
import { Outlet, useNavigate } from 'react-router-dom'
import FilterModal from '../Modals/FilterModal'
export default function Base() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {

    }, [])

    return (
        <div className='relative bg-slate-200 h-screen overflow-hidden'>
            {/* Notification */}
            <Notification></Notification>

            <div className="flex  ">

                {/* SideBar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} ></Sidebar>

                {/* Header */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} ></Header>

                    {/* Components will renser from here */}
                    <main>
                        <div className="sm:px-6 lg:px-8 py-2 w-full max-w-9xl ">
                            <Outlet />
                        </div>
                    </main>
                </div>

            </div>

        </div>

    )
}
