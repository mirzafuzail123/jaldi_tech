import React, { useRef, useEffect, useContext, useState } from 'react'
import BackendContext from '../../Context/BackendContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function CampaignEditModal({
    EditModal, setEditModal, CampaignName, campaignId, dummyState, setdummyState, SavingLoader, setSavingLoader }) {

    const ModalRef = useRef()
    const { UpdateCampaignFunc } = useContext(BackendContext)


    // Edit Campaign Name
    const handleUpdateCampaignName = (e) => {
        setSavingLoader(true)
        e.preventDefault()
        const newName = document.getElementById('CampaignName').value

        if (newName !== CampaignName) {
            const data = { 'name': newName }
            UpdateCampaignFunc(data, campaignId).then(() => {
                setEditModal(false)
                setdummyState(!dummyState)
            }).catch(() => {
                setSavingLoader(false)
                setEditModal(false)
            })
        }
        else {
            setSavingLoader(false)
            setEditModal(false)
        }
    }

    useEffect(() => {
        const handler = (e) => {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setEditModal(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    return (
        EditModal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full " >
                <div className="relative w-72 h-full max-w-md md:h-auto mx-auto left-20 mt-28" ref={ModalRef}>
                    <div className="relative  bg-white rounded-lg shadow-2xl dark:bg-gray-700">

                        <div className="h-60 flex flex-col ">

                            <div className='w-full flex justify-between h-[25%] bg-gray-200 '>
                                <h1 className='py-4 px-5 text-black text-lg'>Edit Campaign</h1>
                                <span
                                    onClick={() => setEditModal(false)}
                                    className='py-4 px-5 text-xs cursor-pointer text-gray-600'>
                                    <FontAwesomeIcon icon={faClose} />
                                </span>
                            </div>

                            <div className='flex flex-col space-y-1 mx-5 mt-3'>
                                <label htmlFor="CampaignName" className='text-sm'>Name <span className='text-red-500'>*</span></label>
                                <input type="text"
                                    id='CampaignName'
                                    defaultValue={CampaignName}
                                    placeholder='Enter campaign name'
                                    className='text-sm p-3 w-60 h-10 rounded-lg outline-none focus:ring-0 placeholder:text-sm ' />
                            </div>

                            <div className='mx-5 mt-8'>
                                <button
                                    onClick={handleUpdateCampaignName}
                                    disabled={SavingLoader}
                                    className={`w-60 h-9 text-sm text-center  ${SavingLoader ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-700'}  text-white rounded-lg`}>
                                    <span className={`${SavingLoader && 'hidden'}`}>Save</span>
                                    <span className={`${!SavingLoader && 'hidden'}`}><FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /></span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
