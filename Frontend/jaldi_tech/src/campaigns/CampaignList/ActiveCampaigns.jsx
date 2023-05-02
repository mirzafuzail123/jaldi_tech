import React, { useState, useEffect, useContext } from 'react'
import BackendContext from '../../Context/BackendContext'
import CampaignListHeader from './CampaignListHeader'
import { Link, useLoaderData } from 'react-router-dom'
import EmptyLogo from '../../assets/EmptyLogo.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv, faWrench } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import Loader from '../../utils/Loader'

export default function ActiveCampaigns() {
    const { CampaignListFunc, Reload } = useContext(BackendContext)
    const [CampaignList, setCampaignList] = useState([])
    const [loading, setloading] = useState(true)

    const [SearchValue, setSearchValue] = useState('')
    const [FilteredData, setFilteredData] = useState([])

    // For search fied
    useEffect(() => {

        const searchTermLowerCase = SearchValue.trim().split(' ').map(term => term.toLocaleLowerCase())
        const filteredList = CampaignList.filter((campaign) => {
            return searchTermLowerCase.some(value => (
                campaign.name.toLowerCase().includes(value)
            ))
        })
        setFilteredData(filteredList)
    }, [CampaignList, SearchValue])



    useEffect(() => {
        CampaignListFunc().then((data) => {
            setCampaignList(data)
            setTimeout(() => {
                setloading(false)
            }, 1000);
        })

    }, [Reload, loading])

    return (
        <>
            <CampaignListHeader SearchValue={SearchValue} setSearchValue={setSearchValue} ></CampaignListHeader>
            {loading ? <Loader /> :
                <div>
                    {CampaignList.length === 0 ? <div className='  text-center space-y-3  mt-7'>
                        <img src={EmptyLogo} className='mx-auto w-60 h-60' alt="Facebook " />
                        <h1 className='text-sm text-gray-500 tracking-wide'>You don't have any active campaigns </h1>

                    </div> :

                        <div className="relative max-h-[19rem]  w-[95%]  mx-auto  overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5">

                            <div className="relative ">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Campaign name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total Leads
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Leads Contacted
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Leads Pending
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date Created
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className='space-y-3'>
                                        {SearchValue === '' ?
                                            CampaignList.map((campaign, index) => {
                                                return (
                                                    <tr key={index} className="bg-gray-50 border-b ">
                                                        <span className='  text-xs ml-5'><FontAwesomeIcon icon={campaign.campaignType === 'Facebook' && faFacebook || campaign.campaignType === 'Manual' && faWrench || campaign.campaignType === 'CSV' && faFileCsv} /></span>
                                                        <Link to={`/campaigns/detail/${campaign.id}`} scope="row" className="cursor-pointer hover:text-blue-400 px-3 text-xs font-semibold whitespace-nowrap">
                                                            {campaign.name}
                                                        </Link>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            {campaign.leads.length}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            0
                                                        </td>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            0
                                                        </td>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            {campaign.created}
                                                        </td>
                                                        <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                            <div className=' bg-green-200 text-green-900 h-5   rounded-full '>
                                                                <span
                                                                    className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">{campaign.status}
                                                                </span>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                )
                                            }) :
                                            FilteredData.length !== 0 ? FilteredData.map((campaign, index) => {
                                                return (
                                                    <tr key={index} className="bg-gray-50 border-b ">
                                                        <span className='  text-xs ml-5'><FontAwesomeIcon icon={campaign.campaignType === 'Facebook' && faFacebook || campaign.campaignType === 'Manual' && faWrench || campaign.campaignType === 'CSV' && faFileCsv} /></span>
                                                        <Link to={`/campaigns/detail/${campaign.id}`} scope="row" className="cursor-pointer hover:text-blue-400 px-3 text-xs font-semibold whitespace-nowrap">
                                                            {campaign.name}
                                                        </Link>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            {campaign.leads.length}
                                                        </td>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            0
                                                        </td>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            0
                                                        </td>
                                                        <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                            {campaign.created}
                                                        </td>
                                                        <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                            <div className=' bg-green-200 text-green-900 h-5   rounded-full '>
                                                                <span
                                                                    className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">{campaign.status}
                                                                </span>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                )
                                            }) :
                                                <h1 className='font-semibold my-20 relative left-[28rem]'>No campaigns found!</h1>
                                        }


                                    </tbody>
                                </table>
                            </div>

                        </div>
                    }

                </div>

            }
        </>
    )
}
