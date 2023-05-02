import React, { useState, useContext, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faClose } from '@fortawesome/free-solid-svg-icons'

export default function StatusFilterDropDown({
    FilterValue, setFilterValue,
}) {

    const FilterRef = useRef()
    const [showFilter, setshowFilter] = useState(false)

    const StatusList = [
        'Qualified', 'Working deal', 'Deal closed', 'Lost deal', 'Future prospect', 'Did not respond', 'Unqualified', 'Not contacted',
    ]

    useEffect(() => {
        const handler = (e) => {
            if (FilterRef.current && !FilterRef.current.contains(e.target)) {
                setshowFilter(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    const handleOnchange = (e) => {
        if (e.target.checked) {
            setFilterValue([...FilterValue, e.target.value])
        }
        else {
            setFilterValue(FilterValue.filter((value) => value !== e.target.value))
        }
    }

    useEffect(() => {
    }, [FilterValue])


    return (
        <>
            <div className='relative ' >

                <div className='flex bg-gray-200 rounded-lg px-2'>
                    {FilterValue.length !== 0 &&
                        <div class="absolute -left-2 -top-0 inline-flex items-center justify-center w-4 h-4 text-[0.70rem] font-bold text-white bg-slate-700 border-2 border-white rounded-full  ">{FilterValue.length}</div>}
                    <h1 className='text-xs font-semibold tracking-wide py-1 cursor-pointer  text-slate-600' onClick={() => setshowFilter(true)}>Status <span ><FontAwesomeIcon icon={faCaretDown} /></span></h1>
                    {FilterValue.length !== 0 &&
                        <FontAwesomeIcon icon={faClose} className=' text-xs py-2 pl-2 cursor-pointer ' onClick={() => setFilterValue([])}></FontAwesomeIcon>}

                </div>


                <div className='absolute z-60'>
                    <Transition
                        show={showFilter}
                        enter="transition-all duration-300 transform origin-top"
                        enterFrom="opacity-0 translate-y-2 scale-95"
                        enterTo="opacity-100 translate-y-0 scale-100"
                        leave="transition-all duration-300 transform origin-top"
                        leaveFrom="opacity-100 translate-y-0 scale-100"
                        leaveTo="opacity-0 translate-y-2 scale-95"
                    >
                        <div ref={FilterRef} className="flex flex-col p-2 absolute z-10 w-40 h-64 -left-10 mt-1 bg-white border rounded-lg shadow-2xl">

                            <div className='w-full h-[13%] border-b-[1px] border-gray-200'>
                                <h1 className='text-xs  px-1 tracking-wide'>Filter by status</h1>
                            </div>

                            <div className='w-full flex flex-col space-y-3 mt-3 h-[77%] border-b-[1px] border-gray-200  overflow-auto scrollbar-none scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar'>
                                {StatusList.map((status, index) => {
                                    return (
                                        <div className='flex space-x-2' key={index}>
                                            <input type="checkbox" checked={FilterValue.includes(status) && true} value={status} id={status} className={`border h-[0.6rem] w-[0.6rem] border-blue-800 cursor-pointer outline-none focus:ring-0`} onChange={handleOnchange} />
                                            <label htmlFor={status} className='text-xs relative bottom-1'>{status} </label>
                                        </div>
                                    )
                                })}

                            </div>

                        </div>
                    </Transition>
                </div>
            </div>
        </>

    )
}
