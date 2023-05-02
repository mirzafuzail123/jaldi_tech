import React, { useEffect, useState, useContext } from 'react'
import BackendContext from '../../Context/BackendContext'
import Loader from '../../utils/Loader'
import CampaignDetailHeader from './CampaignDetailHeader'
import { useParams, useLocation } from 'react-router-dom'

export default function CampaignDetail() {
    const params = useParams()
    const location = useLocation()

    const { SingleCampaignFunc, SingleCampaignData, setSingleCampaignData } = useContext(BackendContext)
    const [loading, setloading] = useState(true)
    const [dummyState, setdummyState] = useState(false)
    const [SavingLoader, setSavingLoader] = useState(false)
    const leadList = SingleCampaignData && SingleCampaignData.LeadList

    useEffect(() => {
        SingleCampaignFunc(params.campaignId).then((data) => {
            setSingleCampaignData(data)
            setTimeout(() => {
                setloading(false)
                setSavingLoader(false)
            }, 1000);
        })

    }, [dummyState])

    return (
        SingleCampaignData && <>
            <CampaignDetailHeader name={SingleCampaignData.name} campaignId={SingleCampaignData.id} campaignType={SingleCampaignData.campaignType}
                dummyState={dummyState} setdummyState={setdummyState} SavingLoader={SavingLoader} setSavingLoader={setSavingLoader} />
            {loading ? <Loader /> :
                <div className='my-5 h-72 flex flex-col'>

                    <div className='h-[40%]  px-8 py-7 flex space-x-14 '>
                        <div className='flex flex-col space-y-2'>
                            <h1 className='text-gray-400 text-sm font-semibold'>Total leads</h1>
                            <h1 className='text-black text-center font-semibold text-2xl'>{leadList.length}</h1>
                        </div>                    <div className='flex flex-col space-y-2'>
                            <h1 className='text-gray-400 text-sm font-semibold'>Contacted leads</h1>
                            <h1 className='text-black text-center font-semibold text-2xl'>{leadList.filter((lead) => lead.status !== 'Not contacted').length}</h1>
                        </div>                    <div className='flex flex-col space-y-2'>
                            <h1 className='text-gray-400 text-sm font-semibold'>Pending leads</h1>
                            <h1 className='text-black text-center font-semibold text-2xl'>{leadList.filter((lead) => lead.status === 'Not contacted').length}</h1>
                        </div>
                    </div>
                    <hr />
                    <div className='h-[40%] flex flex-col pt-6 px-6 '>
                        <h1 className='text-gray-800 font-semibold  pb-3'>Lead Status</h1>

                        <div className='flex space-x-14 '>

                            <div className='flex flex-col space-y-1  relative bottom-3'>
                                <h1 className='text-gray-400 text-xs whitespace-nowrap  '><span className='text-[3rem] relative bottom-[0.20rem] text-green-600'>.</span> Qualified</h1>
                                <h1 className='text-black text-center font-semibold text-2xl relative bottom-2'>{leadList.filter((lead) => lead.status === 'Qualified').length}</h1>
                            </div>

                            <div className='flex flex-col space-y-1  relative bottom-3'>
                                <h1 className='text-gray-400 text-xs whitespace-nowrap  '><span className='text-[3rem] relative bottom-[0.20rem] text-purple-600'>.</span> Working deal</h1>
                                <h1 className='text-black text-center font-semibold text-2xl relative bottom-2'>{leadList.filter((lead) => lead.status === 'Working deal').length}</h1>
                            </div>

                            <div className='flex flex-col space-y-1  relative bottom-3'>
                                <h1 className='text-gray-400 text-xs whitespace-nowrap  '><span className='text-[3rem] relative bottom-[0.20rem] text-blue-800'>.</span> Deal closed</h1>
                                <h1 className='text-black text-center font-semibold text-2xl relative bottom-2'>{leadList.filter((lead) => lead.status === 'Deal closed').length}</h1>
                            </div>

                            <div className='flex flex-col space-y-1  relative bottom-3'>
                                <h1 className='text-gray-400 text-xs whitespace-nowrap  '><span className='text-[3rem] relative bottom-[0.20rem] text-gray-800'>.</span> Lost deal</h1>
                                <h1 className='text-black text-center font-semibold text-2xl relative bottom-2'>{leadList.filter((lead) => lead.status === 'Lost deal').length}</h1>
                            </div>

                            <div className='flex flex-col space-y-1  relative bottom-3'>
                                <h1 className='text-gray-400 text-xs whitespace-nowrap  '><span className='text-[3rem] relative bottom-[0.20rem] text-sky-500'>.</span> Future prospect</h1>
                                <h1 className='text-black text-center font-semibold text-2xl relative bottom-2'>{leadList.filter((lead) => lead.status === 'Future prospect').length}</h1>
                            </div>

                            <div className='flex flex-col space-y-1  relative bottom-3'>
                                <h1 className='text-gray-400 text-xs whitespace-nowrap  '><span className='text-[3rem] relative bottom-[0.20rem] text-yellow-600'>.</span> Did not respond</h1>
                                <h1 className='text-black text-center font-semibold text-2xl relative bottom-2'>{leadList.filter((lead) => lead.status === 'Did not respond').length}</h1>
                            </div>

                            <div className='flex flex-col space-y-1  relative bottom-3'>
                                <h1 className='text-gray-400 text-xs whitespace-nowrap  '><span className='text-[3rem] relative bottom-[0.20rem] text-red-600'>.</span> Unqualified</h1>
                                <h1 className='text-black text-center font-semibold text-2xl relative bottom-2'>{leadList.filter((lead) => lead.status === 'Unqualified').length}</h1>
                            </div>

                        </div>
                    </div>

                </div>
            }
        </>
    )
} 