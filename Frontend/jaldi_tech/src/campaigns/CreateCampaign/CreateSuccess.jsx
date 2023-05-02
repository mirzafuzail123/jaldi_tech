import React from 'react'
import CreateCampaignHeader from './CreateCampaignHeader'
import SuccessLogo from '../../assets/SuccessLogo.png'
import { useNavigate } from 'react-router-dom'


export default function CreateSuccess() {
    const navigate = useNavigate()

    const FinishFunc = () => {
        navigate('/campaigns/active')
    }
    return (
        <>
            <CreateCampaignHeader StepName={'Campaign has been created'} Step_no={'Done!'}></CreateCampaignHeader>
            <div className='items-center mt-14 flex flex-col space-y-5 h-56 mb-4'>
                <img src={SuccessLogo} alt="Facebook " />
                <p className='text-sm '>Facebook campaign has been created and activated successfully!</p>
            </div>
            <hr />
            <footer className='pt-2 text-center sticky px-5'>
                <button onClick={FinishFunc} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Finish</button>
            </footer>
        </>
    )
}
