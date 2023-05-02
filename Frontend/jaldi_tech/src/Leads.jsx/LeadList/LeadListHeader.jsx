import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import BackendContext from '../../Context/BackendContext'
import StatusFilterDropDown from '../../DropDowns/Leads/StatusFilterDropDown'
import FilterModal from '../../Modals/FilterModal'
import DeleteConfirmation from '../../Modals/DeleteConfirmation'
export default function LeadListHeader({
    SearchValue, setSearchValue, StatusFilterValue, setStatusFilterValue,
    isChecked, setisChecked, dummyState, setdummyState }) {

    const role = JSON.parse(localStorage.getItem('user_data')).role


    const [Modal, setModal] = useState(false)
    const [DeleteModal, setDeleteModal] = useState(false)
    const [DeletingLoader, setDeletingLoader] = useState(false)

    const { LeadDeleteFunc } = useContext(BackendContext)

    const handleSearchSubmitFunc = (e) => {
        if (e.key === 'Enter') {
            setSearchValue(e.target.value)
        }
    };

    const handleDeleteFunc = () => {
        LeadDeleteFunc(isChecked).then(() => {
            setisChecked([])
            setdummyState(!dummyState)
            setDeletingLoader(false)
            setDeleteModal(false)
        })
    }

    return (
        <header className='flex border-b-2 border-gray-300 justify-between px-5 h-16 w-full bg-gray-100 rounded-sm'>
            <FilterModal Modal={Modal} setModal={setModal} />


            <DeleteConfirmation Modal={DeleteModal} setModal={setDeleteModal} deleteFunc={handleDeleteFunc} statement='Are you sure you want to delete selected lead(s) ?' DeletingLoader={DeletingLoader} setDeletingLoader={setDeletingLoader} />
            <div className='flex justify-between mx-4 my-5 w-full'>
                <div className='flex space-x-4'>
                    <h1 className='text-sm font-bold text-slate-800 mr-2'>Filter by</h1>
                    <StatusFilterDropDown FilterValue={StatusFilterValue} setFilterValue={setStatusFilterValue} />
                    <h1 className='text-xs font-semibold py-1 cursor-pointer  text-slate-600' onClick={() => setModal(true)}>Campaigns <span ><FontAwesomeIcon icon={faCaretDown} /></span> </h1>
                    {role === 'Admin' && <h1 className='text-xs font-semibold py-1 cursor-pointer  text-slate-600' onClick={() => setModal(true)}>Agents <span ><FontAwesomeIcon icon={faCaretDown} /></span></h1>}
                    <h1 className='text-xs font-semibold py-1 cursor-pointer  text-slate-600' onClick={() => setModal(true)}>Last Updated <span ><FontAwesomeIcon icon={faCaretDown} /></span></h1>
                    <h1 className='text-xs font-semibold py-1 cursor-pointer  text-slate-600' onClick={() => setModal(true)}>Creation date <span ><FontAwesomeIcon icon={faCaretDown} /></span></h1>
                </div>
                {isChecked.length === 0 ?
                    <div className="relative pb-8 bottom-[0.3rem]  ">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search"
                            onKeyDown={handleSearchSubmitFunc}
                            onChange={(e) => setSearchValue(e.target.value)
                            }
                            value={SearchValue}
                            id="default-search"
                            className="block w-full h-4 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search leads"
                            required />
                    </div> :
                    <div className="relative pb-8 bottom-[0.3rem]  " >
                        <button onClick={() => setDeleteModal(true)} className='w-24 h-8 rounded-lg bg-red-400 hover:bg-red-600 text-black text-xs font-semibold'>Delete <span>({isChecked.length})</span></button>
                    </div>
                }

            </div>
        </header>
    )
}
