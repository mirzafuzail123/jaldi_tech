import React, { useState, useEffect, useContext } from 'react'
import CSVCampaignHeader from './CSVCampaignHeader'
import Loader from '../../utils/Loader'
import { useNavigate, useLocation, useLoaderData } from 'react-router-dom'
import BackendContext from '../../Context/BackendContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function CSVAgents() {

    const location = useLocation()
    const navigate = useNavigate()
    const { SaveCSVCampaignFunc } = useContext(BackendContext)
    const AgentsList = useLoaderData()

    const [loading, setloading] = useState(true)
    const [SelectedAgents, setSelectedAgents] = useState([])
    const { CampaignName, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList, PhoneEntriesList, NotesEntriesList } = location.state

    const user_data = JSON.parse(localStorage.getItem('user_data'))
    const email = user_data.email
    const username = user_data.username

    const handleSelectedAgents = (e) => {
        if (e.target.checked) {
            setSelectedAgents([...SelectedAgents, e.target.id])
        }
        else {
            setSelectedAgents(SelectedAgents.filter((agentId) => agentId !== e.target.id))
        }
    }

    const handleSubmit = () => {
        setloading(true)
        SaveCSVCampaignFunc(
            CampaignName, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList,
            PhoneEntriesList, NotesEntriesList, SelectedAgents
        ).then(() => {
            navigate('/campaigns/success')
        })
    }


    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    })


    return (
        <>
            <CSVCampaignHeader StepName={'Select Agents'} Step_no={5} ></CSVCampaignHeader>
            {loading ? <Loader /> :
                <div>
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

                                    <tr class="bg-gray-50 border-b ">
                                        <th scope="row" class="cursor-pointer hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                            <input type="checkbox" onChange={handleSelectedAgents} id={AgentsList[0].parent} className={`border border-blue-800 cursor-pointer outline-none focus:ring-0`} />
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

                                    {AgentsList.map((agent) => {
                                        return (
                                            <tr class="bg-gray-50 border-b ">
                                                <th scope="row" class="cursor-pointer hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                                    <input type="checkbox" onChange={handleSelectedAgents} id={agent.id} className={`border border-blue-800 cursor-pointer outline-none focus:ring-0`} />
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
                        <button onClick={handleSubmit} disabled={SelectedAgents.length === 0 ? true : false} className={`w-24 h-10  text-white ${SelectedAgents.length !== 0 ? 'bg-slate-900  hover:bg-slate-700' : 'bg-slate-400'} rounded-lg`}>Next</button>
                    </footer>
                </div>}
        </>
    )
}
