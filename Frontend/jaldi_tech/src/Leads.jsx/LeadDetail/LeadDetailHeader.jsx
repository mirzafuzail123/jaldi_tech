import React, { useState, useRef, useEffect, useContext } from 'react'
import BackendContext from '../../Context/BackendContext'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faFileCirclePlus, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react'
import DeleteConfirmation from '../../Modals/DeleteConfirmation'

export default function LeadDetailHeader({ name, leadId, setAddTaskOpen, setIsReassignOpen }) {

    const navigate = useNavigate()
    const location = useLocation();
    const { LeadDeleteFunc, LeadReassinAgentFunc } = useContext(BackendContext)
    const { pathname } = location;
    const ActionRef = useRef()

    const [isActionOpen, setisActionOpen] = useState(false)
    const [DeleteModal, setDeleteModal] = useState(false)
    const [DeletingLoader, setDeletingLoader] = useState(false)


    const user_role = localStorage.getItem('user_data') && JSON.parse(localStorage.getItem('user_data')).role

    useEffect(() => {
        const handler = (e) => {
            if (ActionRef.current && !ActionRef.current.contains(e.target)) {
                setisActionOpen(false)
            }

        }
        document.addEventListener('mousedown', handler)
    }, [])


    // For Deleting Lead
    const handleDeleteFunc = () => {
        LeadDeleteFunc([leadId]).then(() => {
            setDeletingLoader(false)
            navigate('/leads/active')
        })
    }



    return (
        <header className='flex border-b-2 border-gray-300 justify-between   px-4 h-16 w-full bg-gray-100 rounded-sm'>
            <DeleteConfirmation Modal={DeleteModal} setModal={setDeleteModal} deleteFunc={handleDeleteFunc} statement='Are you sure you want to delete selected lead(s) ?' DeletingLoader={DeletingLoader} setDeletingLoader={setDeletingLoader} />

            <div className='flex space-x-5 pt-3 w-[40%]'>
                <Link to={'/leads/active'} className='text-xl text-gray-800 pt-1 p-3 bg-gray-200 h-10 w-10 rounded-md hover:text-gray-300 hover:bg-gray-700'> <FontAwesomeIcon icon={faAngleLeft} /> </Link>
                <h1 className='text-lg pt-1 text-slate-800 font-semibold  zigzag'>{name}</h1>

            </div>
            <div className='flex space-x-7 w-[30%] text-center py-5 '>
                <h1
                    onClick={() => navigate(`/leads/leadDetail/${leadId}`)}
                    className={`cursor-pointer text-sm ${pathname.includes('leadDetail') ? "text-blue-900 pb-10  border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>Detail</h1>
                {user_role === 'Admin' &&
                    <h1
                        onClick={() => navigate(`/leads/leadActivity/${leadId}`)}
                        className={`cursor-pointer text-sm ${pathname.includes('leadActivity') ? "text-blue-900 pb-10   border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>Activity</h1>}
                <h1
                    onClick={() => navigate(`/leads/leadTasks/${leadId}`)}
                    className={`cursor-pointer text-sm ${pathname.includes('leadTasks') ? "text-blue-900 pb-10 border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>Tasks</h1>
            </div>


            <div className='mr-3 flex space-x-6 w-[30%] justify-end '>

                {pathname.includes('leadDetail') && user_role === 'Admin' &&
                    <div className='relative py-4'>
                        <button
                            onClick={() => setisActionOpen(!isActionOpen)}
                            className='w-24 h-9  text-xs bg-slate-800 hover:bg-slate-600 text-white rounded-lg'>
                            Actions
                            <span className='pl-1'><FontAwesomeIcon icon={faCaretDown} /></span></button>
                        <Transition
                            show={isActionOpen}
                            enter="transition-all duration-300 transform origin-top"
                            enterFrom="opacity-0 translate-y-2 scale-95"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="transition-all duration-300 transform origin-top"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-2 scale-95"
                        >
                            <div ref={ActionRef} className="absolute z-10 w-24   mt-1 bg-white border rounded-lg shadow-2xl">
                                <ul className="py-2">
                                    <li className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => setIsReassignOpen(true)}>Reassign</li>
                                    <li className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => setDeleteModal(true)}>Delete</li>
                                </ul>
                            </div>
                        </Transition>
                    </div>}

                {pathname.includes('leadTasks') && user_role === 'Agent' &&
                    <button
                        onClick={() => setAddTaskOpen(true)}
                        className='w-24 h-9 mt-4  text-sm rounded-lg text-white bg-slate-900 hover:bg-slate-700' ><FontAwesomeIcon icon={faFileCirclePlus} className='pr-[0.15rem] pb-[0.10rem] text-xs' /> Add task</button>
                }

            </div>



        </header >
    )
}
