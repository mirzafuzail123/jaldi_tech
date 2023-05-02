import React, { useContext, useEffect, useState } from 'react'
import BackendContext from '../../Context/BackendContext'
import ManualLeadHeader from './ManualLeadHeader'
import { useNavigate, useLoaderData, useLocation } from 'react-router-dom'
import Loader from '../../utils/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function AssignAgent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [AgentsList, setAgentsList] = useState([])
    const { SaveManualCampaignFunc, AddManualLeadsFunc, AgentListFunc, CampaignAgentsFunc } = useContext(BackendContext)

    const { CampaignName, data, campaignId } = location.state

    const [AssignedAgent, setAssignedAgent] = useState(null)
    const [loading, setloading] = useState(true)


    const user_data = JSON.parse(localStorage.getItem('user_data'))
    const email = user_data.email
    const username = user_data.username


    const handleSubmit = (e) => {
        setloading(true)
        e.preventDefault()
        if (CampaignName) {
            SaveManualCampaignFunc(CampaignName, data, AssignedAgent).then(() => {
                navigate('/campaigns/success')
            })
        }
        else if (campaignId) {
            AddManualLeadsFunc(campaignId, data, AssignedAgent).then(() => {
                navigate(`/campaigns/detail/${campaignId}`)
            })
        }

    }

    useEffect(() => {
        if (CampaignName) {
            AgentListFunc().then((data) => {
                setAgentsList(data)
                setTimeout(() => {
                    setloading(false)
                }, 1000);
            })
        }
        else if (campaignId) {
            CampaignAgentsFunc(campaignId).then((data) => {
                setAgentsList(data)
                setTimeout(() => {
                    setloading(false)
                }, 1000);
            })
        }

    }, [])

    return (
        AgentsList.length !== 0 && <>
            <ManualLeadHeader StepName={'Assign Agent'} Step_no={3}></ManualLeadHeader>
            {loading ? <Loader /> : <div>
                <div class="relative overflow-auto h-72 shadow-md sm:rounded-lg mt-4">

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-[0.6rem] text-gray-400 uppercase ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">

                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        User
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='space-y-3'>
                                {!campaignId &&
                                    <tr class="bg-gray-50 border-b ">
                                        <th scope="row" class="cursor-pointer hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                            <input readOnly
                                                type="checkbox"
                                                checked={AssignedAgent === AgentsList[0].parent ? true : false}
                                                id={AgentsList[0].parent}
                                                onClick={() => setAssignedAgent(AgentsList[0].parent)}
                                                className={`border border-blue-800 cursor-pointer outline-none focus:ring-0`} />
                                        </th>
                                        <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                            <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                            {username}

                                        </th>
                                        <td class="px-6 py-4 text-xs  whitespace-nowrap">
                                            {email}
                                        </td>

                                        <td class="px-6 py-4 text-xs  whitespace-nowrap">
                                            Active
                                        </td>

                                    </tr>
                                }

                                {AgentsList.map((agent) => {
                                    return (
                                        <tr class="bg-gray-50 border-b ">
                                            <th scope="row" class="cursor-pointer hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                                <input readOnly
                                                    type="checkbox"
                                                    checked={AssignedAgent === agent.id ? true : false}
                                                    onClick={() => setAssignedAgent(agent.id)}
                                                    id={agent.id}
                                                    className={`border border-blue-800 cursor-pointer outline-none focus:ring-0`} />
                                            </th>
                                            <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                {agent.username}

                                            </th>
                                            <td class="px-6 py-4 text-xs  whitespace-nowrap">
                                                {agent.email}
                                            </td>

                                            <td class="px-6 py-4 text-xs  whitespace-nowrap">
                                                Active
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <hr />
                <footer className='pt-2 flex justify-between text-end sticky px-5'>
                    <button onClick={() => navigate('/campaigns/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                    <button onClick={handleSubmit} disabled={!AssignedAgent ? true : false} className={`w-24 h-10  text-white ${AssignedAgent ? 'bg-slate-900  hover:bg-slate-700' : 'bg-slate-400'} rounded-lg`}>Next</button>
                </footer>
            </div>}
        </>
    )
}
