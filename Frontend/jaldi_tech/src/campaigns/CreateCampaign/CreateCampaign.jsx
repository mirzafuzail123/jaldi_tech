import React, { useState, useContext, useEffect } from 'react'
import BackendContext from '../../Context/BackendContext'
import FacebookContext from '../../Context/FacebookContext'
import Loader from '../../utils/Loader'
import CreateCampaignHeader from './CreateCampaignHeader'
import CampaignLogo from '../../assets/CampaignLogo.png'
import { useNavigate, useLocation } from 'react-router-dom'
export default function CreateCampaign() {

    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setloading] = useState(true)
    const [CampaignName, setCampaignName] = useState(null)
    const { FacebookAdsFunc } = useContext(FacebookContext)

    const CampaignNameSubmitFunc = (e) => {
        setloading(true)
        e.preventDefault()
        if (location.state.type === 'facebook') {
            FacebookAdsFunc().then(() => {
                navigate('/campaigns/selectAds', { replace: true, state: { CampaignName } })
            }).catch(
                setloading(false)
            )

        }
        else if (location.state.type === 'manual') {
            navigate('/campaigns/createLead', { replace: true, state: { CampaignName } })
        }
        else {
            navigate('/campaigns/uploadCSV', { replace: true, state: { CampaignName } })
        }
    }

    const handleOnChange = (e) => {
        setCampaignName(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])


    return (

        <>
            <CreateCampaignHeader StepName={'Create New Campaign'} Step_no={1}></CreateCampaignHeader>
            {loading ? <Loader /> :
                <div>
                    <div className='items-center mt-8 flex flex-col space-x-3 h-64 mb-4'>
                        <h1 className='text-black font-extralight mb-3'>Let's Create a new campaign</h1>
                        <img src={CampaignLogo} className='' alt="Facebook " />
                        <div className='flex flex-col space-y-2 mt-4'>
                            <label htmlFor="campaignName">Enter the name of your campaign <span className='text-red-500'>*</span></label>
                            <input type="text" placeholder='Campaign Name' className='w-72 h-10 rounded-lg p-2 focus:ring-0 placeholder:p-1' onChange={handleOnChange} />
                            <p className='text-xs text-center font-light'>This is the name of your campaign <br /> that your agents will see</p>
                        </div>
                    </div>
                    <hr />
                    <footer className='flex pt-2 justify-between sticky  px-5'>
                        <button onClick={() => navigate('/campaigns/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                        <button onClick={CampaignNameSubmitFunc} disabled={CampaignName ? false : true} className={`w-24 h-10  text-white ${CampaignName ? 'bg-slate-900  hover:bg-slate-700' : 'bg-slate-400'} rounded-lg`}>Next</button>
                    </footer>
                </div>
            }
        </>
    )
}
