import React, { useState, useEffect } from 'react'
import FacebookHeader from './FacebookHeader'
import IntgrationSuccessLogo from '../../assets/IntgrationSuccessLogo.png'
import Loader from '../../utils/Loader'
import { useNavigate } from 'react-router-dom'

export default function IntegrationSuccess() {

    const [loading, setloading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])


    return (

        <>
            <FacebookHeader StepName={"Facebook Integration"} Step_no={'Done!'} ></FacebookHeader>
            {loading ? <Loader></Loader> : <div>
                <div className='items-center my-6  flex flex-col   h-[15.5rem]'>
                    <img src={IntgrationSuccessLogo} alt="Facebook " />
                    <p className='font-semibold'>Integration Completed!</p>
                    <p className='text-sm mt-1 '>Let's create your first facebook campaign.</p>
                </div>
                <hr />
                <footer className='pt-3 text-center sticky px-5'>
                    <button onClick={() => navigate('/campaigns/createCampaign', { state: { 'type': 'facebook' } })} className={`w-40 h-10  text-sm text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Create campaign</button>
                </footer>
            </div>}
        </>
    )
}
