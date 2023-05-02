import React, { useEffect, useState, useContext, useRef } from 'react'
import BackendContext from '../../Context/BackendContext'
import Loader from '../../utils/Loader'
import CampaignDetailHeader from './CampaignDetailHeader'
import CampaignAddAgentModal from '../../Modals/Campaigns/CampaignAddAgentModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmation from '../../Modals/DeleteConfirmation'


export default function CampaignAgents() {

    const { SingleCampaignData, AgentListFunc, CampaignAgentsFunc, RemoveCampaignAgentFunc } = useContext(BackendContext)
    const [CampaignAgents, setCampaignAgents] = useState([])
    const [loading, setloading] = useState(true)
    const [AddAgentModal, setAddAgentModal] = useState(false)
    const [RemoveAgentModal, setRemoveAgentModal] = useState(false)
    const [RemovedAgentEmail, setRemovedAgentEmail] = useState(null)
    const [AgentList, setAgentList] = useState([])
    const [RemoveToolTip, setRemoveToolTip] = useState(null)
    const [SavingLoader, setSavingLoader] = useState(false)
    const [dummyState, setdummyState] = useState(false)


    const handleRemoveAgentFunc = () => {
        RemoveCampaignAgentFunc(SingleCampaignData.id, RemovedAgentEmail).then(() => {
            setdummyState(!dummyState)
            setRemoveAgentModal(false)
        })
    }

    useEffect(() => {
        CampaignAgentsFunc(SingleCampaignData.id).then((data) => {
            setCampaignAgents(data)
            AgentListFunc().then((data) => {
                setAgentList(data)
                setloading(false)
            })
        })

    }, [SavingLoader, dummyState])


    return (
        SingleCampaignData && <>
            <CampaignDetailHeader name={SingleCampaignData.name} campaignId={SingleCampaignData.id} setAddAgentModal={setAddAgentModal} />
            <CampaignAddAgentModal Modal={AddAgentModal} setModal={setAddAgentModal} AgentList={AgentList}
                campaignId={SingleCampaignData.id} CampaignAgents={CampaignAgents} SavingLoader={SavingLoader} setSavingLoader={setSavingLoader} />
            <DeleteConfirmation Modal={RemoveAgentModal} setModal={setRemoveAgentModal} deleteFunc={handleRemoveAgentFunc} statement='Are you sure you want to remove this agent ?' />
            {loading ? <Loader /> :
                <div className="relative  shadow-md sm:rounded-lg mt-5">

                    <div className="relative  shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-[0.6rem] text-gray-400 uppercase ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Active
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Leads assigned
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Leads contacted
                                    </th>

                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody className='space-y-3 '>

                                {CampaignAgents.map((agent, index) => {
                                    return (
                                        <tr className="bg-gray-50 border-b " id={agent.id} key={index}>

                                            <th scope="row" className="cursor-pointer w-[30%] hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                {agent.username}

                                            </th>

                                            <td className="px-6 py-4 w-[20%]">
                                                <span
                                                    className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full bg-green-200 text-green-900">Active</span>
                                            </td>
                                            <td className="px-6 py-4 w-[15%]">
                                                0
                                            </td>
                                            <td className="px-6 py-4 w-[15%]">
                                                0
                                            </td>

                                            <td className=" relative pl-20 flex">

                                                <span
                                                    onClick={() => { setRemoveAgentModal(true); setRemovedAgentEmail(agent.email) }}
                                                    onMouseEnter={() => setRemoveToolTip(agent.id)}
                                                    onMouseLeave={() => setRemoveToolTip(null)}
                                                    className=' pl-5 pr-2 py-4 cursor-pointer relative'><FontAwesomeIcon icon={faTrash} /> </span>
                                                <div className={`bg-gray-900 mt-5 w-14 h-4 rounded-md ${RemoveToolTip !== agent.id && 'hidden'} `}>
                                                    <h1 className='text-[0.6rem] text-center text-white '>Remove</h1>
                                                </div>

                                            </td>


                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            }
        </>
    )
}
