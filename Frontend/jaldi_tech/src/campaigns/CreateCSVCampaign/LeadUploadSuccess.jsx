import React, { useState, useEffect, useContext } from 'react'
import BackendContext from '../../Context/BackendContext'
import CSVCampaignHeader from './CSVCampaignHeader'
import Loader from '../../utils/Loader'
import { useNavigate, useLocation } from 'react-router-dom'
import IntgrationSuccessLogo from '../../assets/IntgrationSuccessLogo.png'

export default function LeadUploadSuccess() {

    const navigate = useNavigate()
    const { AddCSVLeadsFunc } = useContext(BackendContext)
    const location = useLocation()
    const [loading, setloading] = useState(true)

    const { CampaignName, campaignId, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList, PhoneEntriesList, NotesEntriesList } = location.state


    const handleSubmit = () => {
        setloading(true)
        if (CampaignName) {
            navigate('/campaigns/CSVAgents', {
                replace: true, state: {
                    CampaignName, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList, PhoneEntriesList, NotesEntriesList
                }
            })
        }
        else if (campaignId) {
            AddCSVLeadsFunc(
                campaignId, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList,
                PhoneEntriesList, NotesEntriesList).then(() => {
                    navigate(`/campaigns/detail/${campaignId}`)
                })
        }

    }

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])


    return (
        <>
            <CSVCampaignHeader StepName={'Details Uploaded'} Step_no={4} ></CSVCampaignHeader>
            {loading ? <Loader /> : <div>
                <div className='items-center  flex flex-col space-y-3 h-72'>
                    <img src={IntgrationSuccessLogo} className='h-44 w-44' alt="Facebook " />
                    <div className='flex space-x-6'>

                        <div className='flex flex-col '>
                            <h1 className='text-gray-400 font-bold text-xs'>Your file contained</h1>
                            <p className='text-2xl font-bold justify-start '>{FirstNameEntriesList.length}<span className='text-gray-400 font-semibold text-xs'> leads</span></p>
                        </div>

                        <div className='flex flex-col '>
                            <h1 className='text-gray-400 font-bold text-xs'>Successfully uploaded</h1>
                            <p className='text-2xl font-bold justify-start '>{FirstNameEntriesList.length}<span className='text-gray-400 font-semibold text-xs'> leads</span></p>
                        </div>

                        <div className='flex flex-col '>
                            <h1 className='text-red-400 font-bold text-xs'>Unsuccessful</h1>
                            <p className='text-2xl font-bold justify-start text-red-400 '>0<span className='text-red-400 font-semibold text-xs'> leads</span></p>
                        </div>

                    </div>
                </div>
                <hr />
                <footer className='flex justify-between sticky  px-5 pt-3'>
                    <button onClick={() => navigate('/campaigns/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                    <button type='submit' onClick={handleSubmit} className={`w-24 h-10  text-white bg-slate-900  hover:bg-slate-700 rounded-lg`}>Next</button>
                </footer>
            </div>}
        </>
    )
}
