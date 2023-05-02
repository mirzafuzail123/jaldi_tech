import React, { useContext, useState, useEffect } from 'react'
import Loader from '../../utils/Loader'
import ManualLeadHeader from './ManualLeadHeader'
import { useNavigate, useLocation } from 'react-router-dom';

export default function CreateManualLead() {
    const navigate = useNavigate()
    const location = useLocation()
    const CampaignName = location.state.CampaignName
    const campaignId = location.state.campaignId
    const [loading, setloading] = useState(true)

    const CreateLeadSubmitFunc = (e) => {
        e.preventDefault()
        setloading(true)
        const form = document.getElementById('agentForm')
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)

        if (CampaignName) {
            navigate('/campaigns/assignAgent', { replace: true, state: { data, CampaignName } })
        }
        else if (campaignId) {
            navigate('/campaigns/assignAgent', { replace: true, state: { data, campaignId } })
        }

    }

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])


    return (
        <>
            <ManualLeadHeader StepName={'Add lead detail'} Step_no={2}></ManualLeadHeader>
            {loading ? <Loader /> : <div>
                <div className='mt-4'>

                    <form id='agentForm' onSubmit={CreateLeadSubmitFunc} className=' flex  flex-col space-y-2'>

                        <div className='h-[17.6rem] overflow-auto flex flex-col space-y-4 items-center'>
                            <div className='flex flex-col space-y-1'>
                                <label htmlFor="fullName" className='relative left-1 text-sm'>Full Name <span className='text-red-500'>*</span></label>
                                <input required type="text" id='fullName' name='fullName' placeholder='Name' className='w-72 text-sm h-10 rounded-lg p-2 focus:ring-0 placeholder:p-1' />
                            </div>

                            <div className='flex flex-col space-y-1'>
                                <label htmlFor="email" className='relative left-1 text-sm'>Email <span className='text-red-500'>*</span></label>
                                <input required type="email" id='email' name='email' placeholder='name@gmail.com' className={`w-72 text-sm h-10 rounded-lg p-2  focus:ring-0 placeholder:p-1`} />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label htmlFor="phone_number" className='relative left-1 text-sm'>Phone <span className='text-red-500'>*</span></label>
                                <input required type="tel" id='phone_number' name='phone_number' placeholder='Enter phone' className={`w-72 h-10 text-sm rounded-lg p-2   focus:ring-0 placeholder:p-1`} />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label htmlFor="notes" className='relative left-1 text-sm'>Notes</label>
                                <input type="text" id='notes' name='notes' placeholder='Enter notes' className={`w-72 h-10 text-sm rounded-lg p-2  focus:ring-0 placeholder:p-1`} />
                            </div>

                        </div>


                        <hr />

                        <footer className='flex   justify-between sticky  px-5'>
                            <button onClick={() => navigate('/campaigns/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                            <button type='submit' className={`w-24 h-10  text-white bg-slate-900  hover:bg-slate-700 rounded-lg`}>Next</button>
                        </footer>
                    </form>

                </div>
            </div>}
        </>
    )
}
