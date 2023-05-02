import React, { useState, useEffect } from 'react'
import CampaignListHeader from './CampaignListHeader'
import EmptyLogo from '../../assets/EmptyLogo.gif'
import Loader from '../../utils/Loader'

export default function PausedCampaigns() {
    const [loading, setloading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])
    return (
        <>
            <CampaignListHeader></CampaignListHeader>
            {loading ? <Loader /> :
                <div className='  text-center space-y-3  mt-7'>
                    <img src={EmptyLogo} className='mx-auto w-60 h-60' alt="Facebook " />
                    <h1 className='text-sm text-gray-500 tracking-wide'>You don't have any paused campaigns </h1>

                </div>
            }
        </>
    )
}
