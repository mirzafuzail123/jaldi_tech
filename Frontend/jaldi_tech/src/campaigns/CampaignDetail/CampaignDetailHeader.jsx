import React, { useState, useRef, useEffect, useContext } from 'react'
import BackendContext from '../../Context/BackendContext'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCaretDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react';
import CampaignEditModal from '../../Modals/Campaigns/CampaignEditModal'
import DeleteConfirmation from '../../Modals/DeleteConfirmation';

export default function CampaignDetailHeader({ name, campaignId, campaignType, setAddAgentModal, dummyState, setdummyState, SavingLoader, setSavingLoader }) {

    const role = JSON.parse(localStorage.getItem('user_data')).role

    const navigate = useNavigate()
    const { DeleteCampaignFunc } = useContext(BackendContext)
    const location = useLocation();
    const ActionRef = useRef()
    const AddLeadRef = useRef()
    const { pathname } = location;

    const [isActionOpen, setisActionOpen] = useState(false)
    const [isAddLeadOpen, setisAddLeadOpen] = useState(false)

    const [EditModal, setEditModal] = useState(false)
    const [DeleteModal, setDeleteModal] = useState(false)
    const [DeletingLoader, setDeletingLoader] = useState(false)



    // Handle Delete Campaign
    const handleDeleteCampaignFunc = () => {
        DeleteCampaignFunc(campaignId).then(() => {
            navigate('/campaigns/active')
        })
    }


    useEffect(() => {
        const handler = (e) => {
            if (ActionRef.current && !ActionRef.current.contains(e.target)) {
                setisActionOpen(false)
            }
            if (AddLeadRef.current && !AddLeadRef.current.contains(e.target)) {
                setisAddLeadOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])


    return (
        <>
            {/* For Editing Campaign */}
            <CampaignEditModal EditModal={EditModal} setEditModal={setEditModal} CampaignName={name} campaignId={campaignId}
                dummyState={dummyState} setdummyState={setdummyState} SavingLoader={SavingLoader} setSavingLoader={setSavingLoader} />
            <DeleteConfirmation Modal={DeleteModal} setModal={setDeleteModal} deleteFunc={handleDeleteCampaignFunc} statement='Are you sure you want to delete this campaign ?' DeletingLoader={DeletingLoader} setDeletingLoader={setDeletingLoader} />

            <header className='flex border-b-2 border-gray-300    px-4 h-16 w-full bg-gray-100 rounded-sm'>
                <div className='flex space-x-5 pt-3 w-[40%]'>
                    <Link to={'/campaigns/active'} className='text-xl text-gray-800 pt-1 p-3 bg-gray-200 h-10 w-10 rounded-md hover:text-gray-300 hover:bg-gray-700'> <FontAwesomeIcon icon={faAngleLeft} /> </Link>
                    <h1 className='text-lg pt-1 text-slate-800 font-semibold  zigzag'>{name}</h1>

                </div>
                <div className='flex space-x-7 w-[30%] text-center py-5 '>
                    <h1
                        onClick={() => navigate(`/campaigns/detail/${campaignId}`)}
                        className={`cursor-pointer text-sm ${pathname.includes('detail') ? "text-blue-900 pb-10  border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>Detail</h1>
                    {role === 'Admin' && <h1
                        onClick={() => navigate(`/campaigns/campaignAgents/${campaignId}`)}
                        className={`cursor-pointer text-sm ${pathname.includes('campaignAgents') ? "text-blue-900 pb-10   border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>Agents</h1>}

                    {role === 'Admin' &&
                        <h1
                            onClick={() => navigate(`/campaigns/campaignActivity/${campaignId}`)}
                            className={`cursor-pointer text-sm ${pathname.includes('ampaignActivity') ? "text-blue-900 pb-10 border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>Activity</h1>}
                    <h1
                        onClick={() => navigate(`/campaigns/campaignTasks/${campaignId}`)}
                        className={`cursor-pointer text-sm ${pathname.includes('campaignTasks') ? "text-blue-900 pb-10 border-b-3 border-yellow-400 rounded-sm" : "text-gray-400"} font-semibold hover:text-black `}>Tasks</h1>
                </div>


                {
                    role === 'Admin' && pathname.includes('detail') &&
                    <div className='py-4 flex space-x-2 mr-1 w-[33.3%] justify-end'>

                        {/* Actions */}
                        <div className='relative'>
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
                                        <li className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200">Archive</li>
                                        <li className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200">Pause</li>
                                        <li className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => { setEditModal(true); setisActionOpen(false) }}>Edit</li>
                                        <li className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => { setDeleteModal(true); setisActionOpen(false) }}>Delete</li>
                                    </ul>
                                </div>
                            </Transition>
                        </div>

                        {/* Add Lead */}
                        {campaignType !== 'Facebook' &&
                            <div className='relative'>
                                <button
                                    onClick={() => setisAddLeadOpen(true)}
                                    className='w-24 h-9  text-xs bg-slate-800 hover:bg-slate-600 text-white rounded-lg'>Add lead</button>
                                <Transition
                                    show={isAddLeadOpen}
                                    enter="transition-all duration-300 transform origin-top"
                                    enterFrom="opacity-0 translate-y-2 scale-95"
                                    enterTo="opacity-100 translate-y-0 scale-100"
                                    leave="transition-all duration-300 transform origin-top"
                                    leaveFrom="opacity-100 translate-y-0 scale-100"
                                    leaveTo="opacity-0 translate-y-2 scale-95"
                                >
                                    <div ref={AddLeadRef} className="absolute z-10 w-36 right-1   mt-1 bg-white border rounded-lg shadow-2xl">
                                        <ul className="py-2">
                                            <li
                                                className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200"
                                                onClick={() => { navigate('/campaigns/uploadCSV', { state: { campaignId } }) }}>Upload CSV file</li>
                                            <li
                                                onClick={() => { navigate('/campaigns/createLead', { state: { campaignId } }) }}
                                                className="px-4 py-2 text-[0.80rem] whitespace-nowrap cursor-pointer hover:bg-gray-200">Add Manually</li>
                                        </ul>
                                    </div>
                                </Transition>
                            </div>

                        }

                    </div>
                }

                {
                    pathname.includes('campaignAgents') &&
                    <div className='py-4 flex space-x-6 w-[33.3%] justify-end '>
                        <button
                            onClick={() => setAddAgentModal(true)}
                            className='w-24 h-9 text-xs bg-slate-800 hover:bg-slate-600 text-white rounded-lg'>
                            <span className='text-[0.70rem] relative bottom-[0.10rem]'><FontAwesomeIcon icon={faUserPlus} /></span> Add Agent</button>

                    </div>
                }
                {
                    pathname.includes('campaignActivity') &&
                    <div className='py-3 flex space-x-6 w-[33.3%] justify-end '>
                    </div>
                }
                {
                    pathname.includes('campaignTasks') &&
                    <div className='py-3 flex space-x-6 w-[33.3%] justify-end '>
                    </div>
                }



            </header >
        </>

    )
}
