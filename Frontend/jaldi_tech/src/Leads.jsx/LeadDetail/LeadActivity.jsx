import React, { useContext, useState, useEffect, useRef } from 'react'
import BackendContext from '../../Context/BackendContext'
import LeadDetailHeader from './LeadDetailHeader'
import Loader from '../../utils/Loader'
import EmptyLogo from '../../assets/EmptyLogo.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faNoteSticky, faFileCsv, faWrench, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function LeadActivity() {
    const { SingleLeadData, LeadActivityListFunc } = useContext(BackendContext)
    const [LeadActivityData, setLeadActivityData] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        LeadActivityListFunc(SingleLeadData.id).then((data) => {
            setLeadActivityData(data)
            setloading(false)
        })


    }, [])

    const ConvertDateFormat = (date) => {
        if (date) {
            const newDate = new Date(date);
            const formatDate = newDate.toLocaleString();
            return formatDate
        }

    }

    return (
        SingleLeadData && <>
            <LeadDetailHeader name={SingleLeadData.fullName} leadId={SingleLeadData.id} />
            {loading ? <Loader /> : <div>
                {LeadActivityData.length === 0 ?
                    <div className='  text-center space-y-3  mt-7'>
                        <img src={EmptyLogo} className='mx-auto h-60 w-60' alt="Facebook " />
                        <h1 className='text-sm text-gray-500 tracking-wide'>No activity found  </h1>
                    </div> :
                    <div className="relative max-h-[19rem]  w-[95%]  mx-auto  overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5">

                        <div className="relative ">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Admin
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Lead
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Assigned to
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Source
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Time stamp
                                        </th>


                                    </tr>
                                </thead>
                                <tbody className='space-y-3 '>
                                    {LeadActivityData.map((activity, index) => {
                                        return (
                                            <tr key={index} className="bg-gray-50 border-b ">
                                                <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                    <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                    {activity.admin}

                                                </th>
                                                <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                    <FontAwesomeIcon icon={faNoteSticky} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                    {activity.lead}

                                                </th>
                                                <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                    <div className=' bg-green-200 text-green-900 h-5  rounded-full '>
                                                        <span
                                                            className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">{activity.action}
                                                        </span>
                                                    </div>

                                                </td>
                                                <td className="cursor-pointer hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                    {activity.action !== 'generated' ?
                                                        <>
                                                            <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                            {activity.assigned_to}
                                                        </>
                                                        :
                                                        <FontAwesomeIcon className='cursor-pointer relative left-5 ' icon={faMinus} />
                                                    }

                                                </td>
                                                <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                    <h1 scope="row" className="cursor-pointer hover:text-blue-400  text-xs font-semibold whitespace-nowrap">
                                                        <span className='  text-xs mr-2'><FontAwesomeIcon icon={activity.leadType === 'Facebook' && faFacebook || activity.leadType === 'Manual' && faWrench || activity.leadType === 'CSV' && faFileCsv} /></span>
                                                        {activity.leadType}

                                                    </h1>
                                                </td>
                                                <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                    {ConvertDateFormat(activity.created)}
                                                </td>




                                            </tr>
                                        )
                                    })}



                                </tbody>
                            </table>
                        </div>

                    </div>
                }
            </div>}
        </>
    )
}
