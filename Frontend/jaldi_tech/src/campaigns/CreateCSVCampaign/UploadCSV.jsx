import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Loader from '../../utils/Loader'
import CSVCampaignHeader from './CSVCampaignHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faArrowAltCircleUp, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import Papa from 'papaparse'

export default function UploadCSV() {
    const handleChooseFile = useRef()
    const navigate = useNavigate()
    const location = useLocation()
    const [FileData, setFileData] = useState([])
    const [FileName, setFileName] = useState(null)
    const [loading, setloading] = useState(true)

    const CampaignName = location.state.CampaignName
    const campaignId = location.state.campaignId


    const handleSelectClick = () => {
        handleChooseFile.current.click()
    }

    const handleOnChange = (e) => {
        const fileUploaded = e.target.files[0]
        setFileName(fileUploaded.name)
        Papa.parse(fileUploaded, {
            complete: (results) => {
                setFileData(results.data);
            },
        });
    }


    const handleNext = () => {
        setloading(true)
        if (CampaignName) {
            navigate("/campaigns/selectColums", { replace: true, state: { CampaignName, FileData } })
        }
        else if (campaignId) {
            navigate("/campaigns/selectColums", { replace: true, state: { campaignId, FileData } })
        }

    }


    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])

    return (
        <>
            <CSVCampaignHeader StepName={'Upload .csv file'} Step_no={2} />
            {loading ? <Loader /> : <div>
                <div className='flex flex-col mt-12 mb-20 space-y-10 '>

                    <div className='flex flex-col space-y-4  mx-auto  rounded-md  bg-gray-50 shadow-md w-[28rem] h-40 '>

                        <div className='flex justify-between p-3'>
                            <h1 className='text-lg relative top-1 font-semibold text-slate-600'>
                                <span className='pr-2 text-sm'><FontAwesomeIcon className='text-slate-700' icon={faInfoCircle} /></span>
                                {FileName ? FileName : "Please upload your csv file"}
                                <span className='text-red-500 pl-1'>*</span>
                            </h1>

                            <input type="file" onChange={handleOnChange} accept=".csv" ref={handleChooseFile} className='hidden' value='' />
                            <button
                                onClick={handleSelectClick}
                                type='file'
                                className='bg-green-500  text-white hover:bg-green-700  h-9 w-28 text-sm rounded-lg focus:ring-0 '>
                                Upload <span className='pl-1'><FontAwesomeIcon icon={faArrowAltCircleUp} /></span></button>
                        </div>

                        <div className='flex space-x-2 ml-3 '>
                            <span className='text-xs'><FontAwesomeIcon icon={faCircleQuestion} /></span>
                            <h1 className='text-xs text-gray-400 '>While uploading file, please make sure it is in correct CSV format</h1>
                        </div>

                        <div className='flex space-x-2 ml-3'>
                            <span className='text-xs'><FontAwesomeIcon icon={faCircleQuestion} /></span>
                            <h1 className='text-xs text-gray-400 '>It is recomended that your csv file should contain name , email , phone columns</h1>
                        </div>

                    </div>

                </div>
                <hr />
                <footer className='pt-4 flex justify-between text-end sticky px-5'>
                    <button onClick={() => navigate('/campaigns/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                    <button onClick={handleNext} disabled={FileData.length === 0 ? true : false} className={`w-24 h-10  text-white ${FileData.length === 0 ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-700 '} rounded-lg`}>Next</button>
                </footer>
            </div>}
        </>
    )
}
