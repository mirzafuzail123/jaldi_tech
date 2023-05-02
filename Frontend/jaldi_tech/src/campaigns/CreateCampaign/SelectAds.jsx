import React, { useState, useContext, useEffect } from 'react'
import CreateCampaignHeader from './CreateCampaignHeader'
import { useNavigate, useLocation } from 'react-router-dom'
import BackendContext from '../../Context/BackendContext'
import FacebookContext from '../../Context/FacebookContext'
import Loader from '../../utils/Loader'


export default function SelectAds() {
    const navigate = useNavigate()
    const location = useLocation()
    const { FacebookAdsResponse } = useContext(FacebookContext)

    const CampaignName = location.state.CampaignName
    const [SelectedCampaign, setSelectedCampaign] = useState(null)
    const [SelectedAds, setSelectedAds] = useState([])


    const [loading, setloading] = useState(true)
    const [Adsets, setAdsets] = useState()

    const AdsSubmitFunc = () => {
        navigate('/campaigns/selectAgents', { replace: true, state: { CampaignName, SelectedCampaign, SelectedAds } })
    }

    const handleAdsOnChange = (e) => {
        if (e.target.checked) {
            setSelectedAds([...SelectedAds, {
                'id': e.target.id,
                'name': e.target.value
            }])
        }
        else {
            setSelectedAds(SelectedAds.filter(item => item.id !== e.target.id))
        }
    }

    const handleCampaignClick = (e) => {
        if (e.target.value !== 'Choose a campaign') {
            const index = e.target.value
            const campaign = FacebookAdsResponse.data[index]
            setSelectedCampaign({
                'campaignId': campaign.id,
                'campaignName': campaign.name
            })
            if (campaign.adsets) {
                setAdsets(campaign.adsets.data)

            }
            else {
                setAdsets(null)
            }

        }
        else {
            setAdsets(null)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [FacebookAdsResponse, SelectedAds])

    return (
        <>
            <CreateCampaignHeader StepName={'Select Facebook Ads'} Step_no={2}></CreateCampaignHeader>
            {loading ? <Loader /> :
                <div>
                    {FacebookAdsResponse && <div className=' mt-8 flex flex-col space-y-3 h-64 mb-4 overflow-y-auto'>
                        <label htmlFor="campaign" class="text-center block mb-2 text-sm font-medium text-gray-900">Select a campaign <span className='text-red-500'>*</span></label>
                        <select id="campaign" onClick={handleCampaignClick} class="bg-gray-50 mx-auto border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-800 focus:border-slate-800  w-[30%] p-2.5">
                            <option selected value='Choose a campaign'>Choose a campaign</option>
                            {FacebookAdsResponse.data.map((campaign, index) => {
                                return (
                                    <option key={index} value={index} >{campaign.name}</option>

                                )
                            })}

                        </select>
                        {Adsets ? <>
                            {
                                Adsets.map((adset, index) => {
                                    return (
                                        <div key={index} className=' flex flex-col space-y-4'>
                                            <h1 className='text-center font-semibold'>{adset.name}</h1>
                                            {adset.ads && adset.ads.data.map((ad) => {
                                                return (
                                                    <div className='flex space-x-3 mx-auto '>
                                                        <input
                                                            id={ad.id}
                                                            value={ad.name}
                                                            type="checkbox"
                                                            className={`border border-blue-800 text-sm h-3 w-3 cursor-pointer outline-none focus:ring-0`}
                                                            onChange={handleAdsOnChange}
                                                        />
                                                        <label htmlFor={ad.id} className='text-sm relative bottom-[0.3rem]' >{ad.name}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })
                            }
                        </> :

                            <p className='text-xs font-light text-center'>No adsets found!</p>
                        }
                    </div>
                    }
                    <hr />
                    <footer className='pt-2 flex justify-between text-end sticky px-5'>
                        <button onClick={() => navigate('/campaigns/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                        <button onClick={AdsSubmitFunc} disabled={SelectedAds.length === 0 ? true : false} className={`w-24 h-10  text-white ${SelectedAds.length === 0 ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-700 '} rounded-lg`}>Next</button>
                    </footer>
                </div>
            }
        </>
    )
}
