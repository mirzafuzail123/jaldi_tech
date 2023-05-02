import React, { useContext, useState, useEffect } from 'react'
import Loader from '../../utils/Loader'
import BackendContext from '../../Context/BackendContext'
import LeadDetailHeader from './LeadDetailHeader'
import ReassignAgentModal from '../../Modals/Leads/ReassignAgentModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser, faCode } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function LeadDetail() {
    const { SingleLeadData, LeadDetailFunc, CampaignAgentsFunc } = useContext(BackendContext)
    const [LeadDetailState, setLeadDetailState] = useState(null)
    const [IsReassignOpen, setIsReassignOpen] = useState(false)
    const [loading, setloading] = useState(true)
    const [SavingLoader, setSavingLoader] = useState(false)
    const [AgentList, setAgentList] = useState([])
    const [dummyState, setdummyState] = useState(false)



    const RemoveBrackets = (string) => {
        if (string && string.includes("{") && string.includes("{")) {
            const updated_str = string.replace(/[{}]/g, "")
            return updated_str
        }
        else {
            return string
        }
    }


    useEffect(() => {
        LeadDetailFunc(SingleLeadData.id).then((data) => {
            setLeadDetailState(data)

            CampaignAgentsFunc(data.campaign).then((campaignAgents) => {
                setAgentList(campaignAgents)
                setloading(false)
                setSavingLoader(false)
                setIsReassignOpen(false)
            }).catch(() => {
                setloading(false)
            })

        })

    }, [dummyState])


    return (
        SingleLeadData && <>

            <LeadDetailHeader name={SingleLeadData.fullName} leadId={SingleLeadData.id} setIsReassignOpen={setIsReassignOpen} />
            {loading ? <Loader /> : <div>
                <ReassignAgentModal Modal={IsReassignOpen} setModal={setIsReassignOpen} SavingLoader={SavingLoader} setSavingLoader={setSavingLoader}
                    leadId={SingleLeadData.id} CampaignAgents={AgentList} leadOwner={SingleLeadData.leadOwner} dummyState={dummyState} setdummyState={setdummyState} />
                <div className='flex flex-col mx-8 mt-5 space-y-6'>
                    <h1 className='text-xl font-bold'>Lead Info</h1>

                    <div className='flex mx-4 space-x-12' >

                        {/* Column 1 */}
                        <div className='w-[33.3%] flex flex-col space-y-6'>

                            <div className='flex flex-col space-y-1 '>
                                <h1 className='text-slate-800 font font-bold text-sm'>Email</h1>
                                <div className='w-full flex justify-between border-b-[0.2px] border-gray-300'>
                                    <h1 className='text-xs font-bold  text-slate-500'>{LeadDetailState.email}</h1>
                                    <span className='cursor-pointer'><FontAwesomeIcon icon={faEnvelope} /> </span>
                                </div>
                            </div>

                            <div className='flex flex-col space-y-1 '>
                                <h1 className='text-slate-800 font font-bold text-sm'>Phone</h1>
                                <div className='w-full flex justify-between border-b-[0.2px] border-gray-300'>
                                    <h1 className='text-xs font-bold  text-slate-500'>{LeadDetailState.phone_number}</h1>
                                    <span className='cursor-pointer'><FontAwesomeIcon icon={faPhone} /> </span>
                                </div>
                            </div>

                            <div className='flex flex-col space-y-1 '>
                                <h1 className='text-slate-800 font font-bold text-sm'>WhatsApp</h1>
                                <div className='w-full flex justify-between border-b-[0.2px] border-gray-300'>
                                    <h1 className='text-xs font-bold relative top-1  text-slate-500'>{LeadDetailState.phone_number}</h1>
                                    <span className='cursor-pointer text-xl relative bottom-1'><FontAwesomeIcon icon={faWhatsapp} /> </span>
                                </div>
                            </div>

                        </div>

                        {/* Column 2 */}
                        <div className='w-[33.30%] flex flex-col space-y-6'>

                            <div className='flex flex-col space-y-1 '>
                                <h1 className='text-slate-800 font font-bold text-sm'>Source</h1>
                                <div className='w-full flex justify-between border-b-[0.2px] border-gray-300'>
                                    <h1 className='text-xs font-bold pb-[0.4rem]  text-slate-500'>{SingleLeadData.campaign.name}</h1>
                                    <span><FontAwesomeIcon icon={faCode} /></span>

                                </div>
                            </div>

                            <div className='flex flex-col space-y-1 '>
                                <h1 className='text-slate-800 font font-bold text-sm'>Owner</h1>
                                <div className='w-full flex justify-between border-b-[0.2px] border-gray-300'>
                                    <h1 className='text-xs font-bold  text-slate-500'>{LeadDetailState.leadOwner}</h1>
                                    <span><FontAwesomeIcon icon={faUser} /></span>
                                </div>
                            </div>

                            <div className='flex flex-col space-y-2 '>
                                <h1 className='text-slate-800 font font-bold text-sm'>Status</h1>
                                <div className='flex'>
                                    <div className='flex bg-green-200 text-green-900 h-5  rounded-full '>
                                        <span
                                            className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">{LeadDetailState.status}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className='w-[33.30%] flex flex-col  space-y-6'>

                            <div className='flex flex-col space-y-2 '>
                                <h1 className='text-slate-800 font font-bold text-sm'>Notes</h1>
                                <h1 className='text-xs font-semibold pb-[0.4rem]  text-slate-500'>{RemoveBrackets(LeadDetailState.note)}</h1>
                            </div>

                        </div>

                    </div>
                </div>
            </div>}
        </>
    )
}
