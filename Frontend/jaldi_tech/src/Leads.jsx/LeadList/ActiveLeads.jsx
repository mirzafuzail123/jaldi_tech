import React, { useState, useEffect, useContext } from 'react'
import BackendContext from '../../Context/BackendContext'
import LeadListHeader from './LeadListHeader'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Loader from '../../utils/Loader'
import EmptyLogo from '../../assets/EmptyLogo.gif'

export default function ActiveLeads() {

    const role = JSON.parse(localStorage.getItem('user_data')).role


    const { LeadListFunc, setSingleLeadData, Reload } = useContext(BackendContext)
    const navigate = useNavigate()
    const [loading, setloading] = useState(true)
    const [dummyState, setdummyState] = useState(false)
    const [LeadList, setLeadList] = useState([])
    const [isChecked, setisChecked] = useState([])
    const [SearchValue, setSearchValue] = useState('')
    const [StatusFilterValue, setStatusFilterValue] = useState([])
    const [FilteredData, setFilteredData] = useState([])


    // TO convert Date Format
    const ConvertDateFormat = (date) => {
        if (date) {
            const newDate = new Date(date);
            const formatDate = newDate.toLocaleString();
            return formatDate
        }

    }


    // For Select ALL
    const handleSelectAll = (e) => {
        if (FilteredData.length === 0) {
            if (e.target.checked) {
                setisChecked(LeadList.map((lead) => lead.id))
            }
            else {
                setisChecked([])
            }
        }
        else {
            if (e.target.checked) {
                setisChecked(FilteredData.map((lead) => lead.id))
            }
            else {
                setisChecked([])
            }
        }


    }

    // For single Select
    const handleSelect = (e) => {

        if (e.target.checked) {
            setisChecked([...isChecked, parseInt(e.target.id)])
        }
        else {
            setisChecked(isChecked.filter((id) => id !== parseInt(e.target.id)))
        }
    }

    // For lead Detail
    const hanldeLeadClick = (id) => {
        const selectedLead = LeadList.filter((lead) => lead.id === id)
        setSingleLeadData(selectedLead[0])
        navigate(`/leads/leadDetail/${id}`)
    }


    useEffect(() => {
        LeadListFunc().then((data) => {
            setLeadList(data)
            setTimeout(() => {
                setloading(false)
            }, 1000);
        })

    }, [loading, Reload, dummyState])


    // For search fied
    useEffect(() => {
        const filteredList = LeadList
            .filter((lead) => lead.status.includes(StatusFilterValue))
            .filter((lead) => lead.email.toLowerCase().indexOf(SearchValue.toLowerCase()) !== -1 || lead.fullName.toLowerCase().indexOf(SearchValue.toLowerCase()) !== -1)

        console.log(LeadList.filter((lead) => lead.status.includes(StatusFilterValue)))



        // StatusFilterValue.length !== 0 && setSearchValue(...SearchValue + StatusFilterValue.map((value) => { return value }))
        // const searchTermLowerCase = SearchValue.trim().split(' ').map(term => term.toLocaleLowerCase())
        // const filteredList = LeadList.filter((lead) => {
        //     return searchTermLowerCase.some(value => (
        //         lead.fullName.toLowerCase().includes(value) ||
        //         lead.email.toLowerCase().includes(value)) ||
        //         lead.status.toLowerCase().includes(value)
        //     )

        // })
        setFilteredData(filteredList)
    }, [LeadList, SearchValue, StatusFilterValue])


    return (
        <>
            <LeadListHeader SearchValue={SearchValue} setSearchValue={setSearchValue} StatusFilterValue={StatusFilterValue} setStatusFilterValue={setStatusFilterValue}
                isChecked={isChecked} setisChecked={setisChecked} dummyState={dummyState} setdummyState={setdummyState} />
            {loading ? <Loader /> : <div>
                {LeadList.length === 0 ? <div className='  text-center space-y-3  mt-7'>
                    <img src={EmptyLogo} className='mx-auto h-60 w-60' alt="Facebook " />
                    <h1 className='text-sm text-gray-500 tracking-wide'>You don't have any leads </h1>

                </div> :
                    <div className="relative max-h-[19rem]  w-[95%]  mx-auto  overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5">

                        <div className="relative ">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10">
                                    <tr>
                                        {role === 'Admin' &&
                                            <th scope="col" className="px-6 py-3">
                                                <input type="checkbox" onClick={handleSelectAll} className={`border border-blue-800 cursor-pointer h-3 w-3 outline-none focus:ring-0`} />

                                            </th>
                                        }
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Campaign
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Lead owner
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            status
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Last Updated
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created
                                    </th> */}
                                    </tr>
                                </thead>
                                <tbody className='space-y-3'>
                                    {SearchValue === '' && StatusFilterValue.length === 0 ?
                                        LeadList.map((lead, index) => {
                                            return (
                                                <tr key={index} className="bg-gray-50 border-b ">
                                                    {role === 'Admin' &&
                                                        <th scope="row" className="cursor-pointer hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                                            <input type="checkbox" onClick={handleSelect} id={lead.id} checked={isChecked.includes(lead.id)} className={`border border-blue-800 cursor-pointer h-3 w-3 outline-none focus:ring-0`} />

                                                        </th>
                                                    }
                                                    <td id={lead.id} onClick={() => hanldeLeadClick(lead.id)} className="cursor-pointer hover:text-blue-400 px-6 py-4 text-xs  font-semibold whitespace-nowrap">
                                                        {lead.fullName}
                                                    </td>

                                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                                        {lead.phone_number}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                                        {lead.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                                                        {lead.campaign.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                                        {lead.leadOwner.username}
                                                    </td>
                                                    <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                        <div className=' bg-green-200 text-green-900 h-5   rounded-full '>
                                                            <span
                                                                className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">{lead.status}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    {/* <td className="px-6 py-4 text-xs  whitespace-nowrap  ">
                                                    {ConvertDateFormat(lead.updated)}
                                                </td>
                                                <td className="px-6 py-4  text-xs  whitespace-nowrap ">
                                                    {ConvertDateFormat(lead.created)}
                                                </td> */}
                                                </tr>
                                            )
                                        }) :

                                        FilteredData.length !== 0 ? FilteredData.map((lead, index) => {
                                            return (
                                                <tr key={index} className="bg-gray-50 border-b ">
                                                    {role === 'Admin' &&
                                                        <th scope="row" className="cursor-pointer hover:text-blue-400 px-6 py-4 text-[0.7rem] whitespace-nowrap">
                                                            <input type="checkbox" onClick={handleSelect} id={lead.id} checked={isChecked.includes(lead.id)} className={`border border-blue-800 cursor-pointer h-3 w-3 outline-none focus:ring-0`} />

                                                        </th>
                                                    }
                                                    <td id={lead.id} onClick={() => hanldeLeadClick(lead.id)} className="cursor-pointer hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                        {lead.fullName}
                                                    </td>

                                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                                        {lead.phone_number}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                                        {lead.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                                                        {lead.campaign.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                                        {lead.leadOwner.username}
                                                    </td>
                                                    <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                        <div className=' bg-green-200 text-green-900 h-5   rounded-full '>
                                                            <span
                                                                className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">{lead.status}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    {/* <td className="px-6 py-4 text-xs  whitespace-nowrap  ">
                                                    {ConvertDateFormat(lead.updated)}
                                                </td>
                                                <td className="px-6 py-4  text-xs  whitespace-nowrap ">
                                                    {ConvertDateFormat(lead.created)}
                                                </td> */}
                                                </tr>
                                            )
                                        }) :
                                            <h1 className='font-semibold my-20 relative left-[28rem]'>No leads found!</h1>

                                    }


                                </tbody>
                            </table>
                        </div>

                    </div>}
            </div>}
        </>
    )
}
