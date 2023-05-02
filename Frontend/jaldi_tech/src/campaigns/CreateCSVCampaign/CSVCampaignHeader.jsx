import React from 'react'

export default function CSVCampaignHeader(props) {
    const { StepName, Step_no } = props
    return (
        <>
            <header className='flex border-b-2 border-gray-300 justify-between h-14 w-full bg-gray-100 rounded-sm'>
                <h1 className='py-4 px-8 text-[1.1rem] text-black '>{StepName}</h1>
                {Step_no && <h1 className='text-gray-500 px-8 py-4 text-sm'>{Step_no === 'Done!' ? Step_no : `Step ${Step_no}/5`}</h1>}
            </header>
        </>
    )


}
