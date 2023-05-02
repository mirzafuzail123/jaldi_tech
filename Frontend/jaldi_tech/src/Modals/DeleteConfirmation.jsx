import React, { useRef, useEffect, useState } from 'react'
import DeleteWarning from '../assets/DeleteWarning.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'


export default function DeleteConfirmation({ Modal, setModal, deleteFunc, statement, DeletingLoader, setDeletingLoader }) {
    const ModalRef = useRef()

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        setDeletingLoader(true)
        await deleteFunc()
    }

    useEffect(() => {
        const handler = (e) => {
            if (ModalRef.current && !ModalRef.current.contains(e.target)) {
                setModal(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-80 left-20 mt-28 h-full max-w-md md:h-auto mx-auto" ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow">

                        <div className="h-[18rem] flex flex-col">
                            <div className='mx-auto mt-2'>
                                <img src={DeleteWarning} className='h-40 w-40' alt="" />
                            </div>

                            <div className='text-center '>
                                <h1 className='text-xs font-semibold'>{statement}</h1>
                            </div>

                            <div className='flex justify-between mx-10 mt-8'>
                                <button className='w-24 h-9 text-sm rounded-lg text-white cursor-pointer bg-gray-500 hover:bg-gray-600 ' onClick={() => setModal(false)}>Cancel</button>
                                <button className={`w-24 h-9 text-sm rounded-lg text-white cursor-pointer ${DeletingLoader ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'} `}
                                    onClick={handleDeleteClick}>
                                    <span className={`${DeletingLoader && 'hidden'}`}>Delete</span>
                                    <span className={`${!DeletingLoader && 'hidden'}`}><FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /></span>
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
