import React, { useRef, useEffect, useState, useContext } from 'react'
import BackendContext from '../../Context/BackendContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClose, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export default function CampaignAddAgentModal({ Modal, setModal, leadId, leadOwner, CampaignAgents, SavingLoader, setSavingLoader, dummyState, setdummyState }) {

    const ModalRef = useRef()
    const { LeadReassinAgentFunc } = useContext(BackendContext)
    const [SelectedAgent, setSelectedAgent] = useState(null)

    const theme = createTheme({
        typography: {

            fontSize: 11,
        },
    });

    const handleReassignFunc = () => {
        setSavingLoader(true)
        LeadReassinAgentFunc(leadId, SelectedAgent).then(() => {
            setdummyState(!dummyState)
        })
    }



    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-[22rem] h-full max-w-md md:h-auto mx-auto left-20 mt-28" ref={ModalRef}>
                    <div className="relative bg-white rounded-lg shadow ">

                        <div className="h-60 flex flex-col ">

                            <div className='bg-gray-200 h-[25%] w-full flex justify-between '>
                                <h1 className='text-lg m-4 font-semibold tracking-wide'>Add agent to campaign</h1>
                                <FontAwesomeIcon icon={faClose} className='m-5 text-gray-500 cursor-pointer' onClick={() => setModal(false)} />
                            </div>

                            <div className='mx-5 my-6'>
                                <ThemeProvider theme={theme}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, }} ref={ModalRef} >
                                        <InputLabel id="demo-simple-select-label" className=''>Agent</InputLabel>
                                        <Select
                                            defaultValue="choose"
                                            labelId="demo-simple-select-label"
                                            id='SelectAgent'
                                            required
                                            label="First name"
                                            value={SelectedAgent}
                                            onChange={(e) => { setSelectedAgent(e.target.value) }}
                                            className={`w-72 text-sm`}
                                        >
                                            {CampaignAgents.map((agent, index) => {
                                                return (
                                                    leadOwner.email !== agent.email &&
                                                    <MenuItem key={index} value={agent.id}><FontAwesomeIcon icon={faUser} className=' relative top-[0.10rem]  mr-2  h-2 w-2 p-1 text-slate-700 border bg-gray-200 rounded-full' /> {agent.username}</MenuItem>
                                                )
                                            })}

                                        </Select>
                                    </FormControl>
                                </ThemeProvider>
                            </div>

                            <div className='mx-auto'>
                                <button
                                    disabled={SavingLoader}
                                    onClick={handleReassignFunc}
                                    className={`w-72 h-8 rounded-md ${SavingLoader ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-700'} text-white`}>
                                    <span className={`${SavingLoader && 'hidden'}`}>Add</span>
                                    <span className={`${!SavingLoader && 'hidden'}`}><FontAwesomeIcon icon={faCircleNotch} className='animate-spin ' /></span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
