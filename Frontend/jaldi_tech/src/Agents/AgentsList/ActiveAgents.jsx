import React, { useState, useEffect, useContext } from 'react'
import BackendContext from '../../Context/BackendContext'
import { useLoaderData } from 'react-router-dom'
import Loader from '../../utils/Loader'
import AgentsHeader from './AgentsHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function ActiveAgents() {

    const { AgentListFunc } = useContext(BackendContext)
    const [AgentsList, setAgentsList] = useState([])
    const [loading, setloading] = useState(true)

    const [SearchValue, setSearchValue] = useState('')
    const [FilteredData, setFilteredData] = useState([])

    const user_data = JSON.parse(localStorage.getItem('user_data'))
    const email = user_data.email
    const username = user_data.username
    const last_login = user_data.last_login


    // Converting date format
    const ConvertDateFormat = (date) => {
        const newDate = new Date(date);
        const formatDate = newDate.toLocaleString();
        return formatDate
    }


    // For search fied
    useEffect(() => {

        const searchTermLowerCase = SearchValue.trim().split(' ').map(term => term.toLocaleLowerCase())
        const filteredList = AgentsList.filter((agent) => {
            return searchTermLowerCase.some(value => (
                agent.username.toLowerCase().includes(value) ||
                agent.email.toLowerCase().includes(value)
            ))
        })
        setFilteredData(filteredList)
    }, [AgentsList, SearchValue])


    useEffect(() => {
        AgentListFunc().then((data) => {
            setAgentsList(data)
            setTimeout(() => {
                setloading(false)
            }, 1000);
        })

    }, [])

    return (
        <>
            <AgentsHeader SearchValue={SearchValue} setSearchValue={setSearchValue} X ></AgentsHeader>
            {loading ? <Loader /> :
                <div className="relative max-h-[19rem]  w-[95%]  mx-auto  overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5">

                    <div className="relative ">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-[0.6rem] text-gray-400 uppercase  bg-white sticky top-0 z-10 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last Active
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody className='space-y-3 '>


                                {SearchValue === '' ?
                                    <>
                                        <tr className="bg-gray-50 border-b ">
                                            <th scope="row" className="cursor-pointer hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                                1
                                            </th>
                                            <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                {username}

                                            </th>
                                            <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                {email}
                                            </td>
                                            <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                Admin
                                            </td>
                                            <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                {ConvertDateFormat(last_login)}
                                            </td>
                                            <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                <div className=' bg-green-200 text-green-900 h-5   rounded-full '>
                                                    <span
                                                        className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">Active
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 cursor-pointer ">
                                                ...
                                            </td>
                                        </tr>
                                        {AgentsList.map((agent, index) => {
                                            return (
                                                <tr className="bg-gray-50 border-b " id={agent.id} key={index}>
                                                    <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                                        {index + 2}
                                                    </th>

                                                    <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                        <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                        {agent.username}

                                                    </th>
                                                    <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                        {agent.email}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                        {agent.role}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                        {agent.last_login === null ? 'Never logged in' : ConvertDateFormat(agent.last_login)}
                                                    </td>
                                                    <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                        <div className=' bg-green-200 text-green-900 h-5   rounded-full '>
                                                            <span
                                                                className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">Active
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 cursor-pointer ">
                                                        ...
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </>
                                    :
                                    FilteredData.length !== 0 ? FilteredData.map((agent, index) => {
                                        return (
                                            <tr className="bg-gray-50 border-b " id={agent.id} key={index}>
                                                <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                                    {index + 2}
                                                </th>

                                                <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                    <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                    {agent.username}

                                                </th>
                                                <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                    {agent.email}
                                                </td>
                                                <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                    {agent.role}
                                                </td>
                                                <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                    {agent.last_login === null ? 'Never logged in' : ConvertDateFormat(agent.last_login)}
                                                </td>
                                                <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                    <div className=' bg-green-200 text-green-900 h-5   rounded-full '>
                                                        <span
                                                            className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">Active
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 cursor-pointer ">
                                                    ...
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                        <h1 className='font-semibold my-20 relative left-[28rem]'>No agents found!</h1>
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            }
        </>
    )
}



