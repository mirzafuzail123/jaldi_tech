import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CSVCampaignHeader from './CSVCampaignHeader'
import Loader from '../../utils/Loader'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectColumns() {

    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setloading] = useState(true)

    const { CampaignName, FileData, campaignId } = location.state

    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Phone, setPhone] = useState(null);
    const [Notes, setNotes] = useState(null);


    // Getting entries of each colum
    const getIndex = (value) => {
        return FileData[0].findIndex((v) => v === value);
    };

    // Validating Email Entries
    const isEmailFunc = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // Validating String
    const isStringValid = (str) => {
        return (
            typeof (str) === 'string' &&
            str.trim() !== "" &&
            isNaN(str)
        );
    }

    // Validating Phone Number
    const isValidPhoneNumber = (phoneNumber) => {
        return !isNaN(phoneNumber);
    }


    const handleOnSubmit = (e) => {
        setloading(true)
        e.preventDefault()
        const FirstNameEntriesList = []
        const LastNameEntriesList = []
        const EmailEntriesList = []
        const PhoneEntriesList = []
        const NotesEntriesList = []

        FileData.slice(1, -1).forEach((entry) => {
            const firstName = isStringValid(entry[getIndex(FirstName)])
            const email = isEmailFunc(entry[getIndex(Email)])
            const phone = isValidPhoneNumber(entry[getIndex(Phone)])

            if (firstName && email && phone) {
                FirstNameEntriesList.push(entry[getIndex(FirstName)])
                LastNameEntriesList.push(entry[getIndex(LastName)])
                EmailEntriesList.push(entry[getIndex(Email)])
                PhoneEntriesList.push(entry[getIndex(Phone)])
                NotesEntriesList.push(entry[getIndex(Notes)])

            }
            else {
                alert('Invalid')
                throw false;
            }

            if (CampaignName) {
                navigate('/campaigns/uploaded', {
                    replace: true, state: {
                        CampaignName, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList, PhoneEntriesList, NotesEntriesList,
                    }
                })
            }
            else if (campaignId) {
                navigate('/campaigns/uploaded', {
                    replace: true, state: {
                        campaignId, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList, PhoneEntriesList, NotesEntriesList,
                    }
                })
            }



        })


    }

    useEffect(() => {

        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [])


    return (
        <>
            <CSVCampaignHeader StepName={'Map your data'} Step_no={3} ></CSVCampaignHeader>
            {loading ? <Loader /> : <div>
                <div className='mt-4'>

                    <form id='agentForm' className=' flex  flex-col space-y-2'>

                        <div className='h-[17.6rem] overflow-auto flex flex-col  items-center'>

                            <div className='flex flex-col space-y-1 mt-2'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                                    <InputLabel id="demo-simple-select-label" className='text-sm'>First name</InputLabel>
                                    <Select
                                        defaultValue="choose"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        label="First name"
                                        value={FirstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className={`w-72 text-sm`}
                                    >
                                        {FileData[0].filter((option) => option !== LastName && option !== Email && option !== Phone && option !== Notes).
                                            map((column, index) => {
                                                return (
                                                    <MenuItem key={index} value={column}>{column}</MenuItem>
                                                )
                                            })}

                                    </Select>
                                </FormControl>
                            </div>

                            <div className='flex flex-col space-y-1 mt-2'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                                    <InputLabel id="demo-simple-select-label" className=''>Last name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        required
                                        id="demo-simple-select"
                                        label="Last Name"
                                        value={LastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className={`w-72`}
                                    >
                                        {FileData[0].filter((option) => option !== FirstName && option !== Email && option !== Phone && option !== Notes).
                                            map((column, index) => {
                                                return (
                                                    <MenuItem key={index} value={column}>{column}</MenuItem>
                                                )
                                            })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='flex flex-col space-y-1 mt-2'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                                    <InputLabel id="demo-simple-select-label">Email</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={Email}
                                        className={`w-72`}
                                    >
                                        {FileData[0].filter((option) => option !== LastName && option !== FirstName && option !== Phone && option !== Notes).
                                            map((column, index) => {
                                                return (
                                                    <MenuItem key={index} value={column}>{column}</MenuItem>
                                                )
                                            })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='flex flex-col space-y-1 mt-2'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                                    <InputLabel id="demo-simple-select-label">Phone</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Phone"
                                        required
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={Phone}
                                        className={`w-72`}
                                    >
                                        {FileData[0].filter((option) => option !== LastName && option !== Email && option !== FirstName && option !== Notes).
                                            map((column, index) => {
                                                return (
                                                    <MenuItem key={index} value={column}>{column}</MenuItem>
                                                )
                                            })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='flex flex-col space-y-1 mt-2'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                                    <InputLabel id="demo-simple-select-label">Notes</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Notes"
                                        required
                                        onChange={(e) => setNotes(e.target.value)}
                                        value={Notes}
                                        className={`w-72`}
                                    >
                                        {FileData[0].filter((option) => option !== LastName && option !== Email && option !== Phone && option !== FirstName).
                                            map((column, index) => {
                                                return (
                                                    <MenuItem key={index} value={column}>{column}</MenuItem>
                                                )
                                            })}
                                    </Select>
                                </FormControl>
                            </div>

                        </div>

                        <hr />

                        <footer className='flex   justify-between sticky  px-5'>
                            <button onClick={() => navigate('/campaigns/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                            <button type='submit' onClick={handleOnSubmit} className={`w-24 h-10  text-white bg-slate-900  hover:bg-slate-700 rounded-lg`}>Next</button>
                        </footer>
                    </form>

                </div>
            </div>}
        </>
    )
}
