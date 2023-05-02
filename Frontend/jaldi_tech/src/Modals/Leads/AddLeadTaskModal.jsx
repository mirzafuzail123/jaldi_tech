import React, { useRef, useEffect, useState, useContext } from 'react'
import BackendContext from '../../Context/BackendContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPaperclip, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


export default function AddLeadTaskModal({ Modal, setModal, leadId, SavingLoader, setSavingLoader, dummyState, setdummyState }) {

    const { AddLeadTaskFunc } = useContext(BackendContext)
    const handleChooseFile = useRef()

    const [LeadStatus, setLeadStatus] = useState(null)
    const [Attachment, setAttachment] = useState(null)
    const [AttachmentName, setAttachmentName] = useState(null)
    const [Comments, setComments] = useState(null)

    const handleAttachmentOnchange = (e) => {

        const file = e.target.files[0];
        setAttachmentName(file.name)
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64 = e.target.result;
            setAttachment(base64);
        };

        reader.readAsDataURL(file);
    }

    const handleAddTask = () => {
        setSavingLoader(true)
        AddLeadTaskFunc(leadId, LeadStatus, Attachment, Comments).then(() => {
            setLeadStatus(null)
            setAttachment(null)
            setAttachmentName(null)
            setComments(null)
            setdummyState(!dummyState)

        }).catch((error) => {
            alert(error)
            setLeadStatus(null)
            setAttachment(null)
            setAttachmentName(null)
            setComments(null)
            setSavingLoader(false)
            setModal(false)
        })

    }

    useEffect(() => {

    }, [AttachmentName])



    const theme = createTheme({
        typography: {

            fontSize: 10,

        },
    });


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-[19rem] h-full max-w-md md:h-auto mx-auto left-20 mt-28" >
                    <div className="relative bg-white rounded-lg shadow ">

                        <div className="h-[25rem] flex flex-col ">

                            <div className='w-full h-[15%] bg-gray-200 flex justify-between p-4 px-5'>
                                <h1 className='text-xl font-semibold '>Add task</h1>
                                <FontAwesomeIcon icon={faClose} className='text-gray-500 pt-1 cursor-pointer' onClick={() => setModal(false)} />
                            </div>

                            <div className='flex flex-col mt-3 mx-auto space-y-2'>
                                <ThemeProvider theme={theme}>

                                    {/* Status */}
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, }}  >
                                        <InputLabel id="demo-simple-select-label" >Status <span className='text-red-500'>*</span> </InputLabel>
                                        <Select
                                            defaultValue="choose"
                                            labelId="demo-simple-select-label"
                                            id='Status'
                                            required
                                            label="Status"
                                            value={LeadStatus}
                                            onChange={(e) => { setLeadStatus(e.target.value) }}
                                            className={`w-60 text-sm relative right-1`}
                                        >
                                            <MenuItem value={'Not contacted'}>Not contacted</MenuItem>
                                            <MenuItem value={'Qualified'}>Qualified</MenuItem>
                                            <MenuItem value={'Working deal'}>Working deal</MenuItem>
                                            <MenuItem value={'Deal closed'}>Deal closed</MenuItem>
                                            <MenuItem value={'Lost deal'}>Lost deal</MenuItem>
                                            <MenuItem value={'Future prospect'}>Future prospect</MenuItem>
                                            <MenuItem value={'Did not respond'}>Did not respond</MenuItem>
                                            <MenuItem value={'Unqualified'}>Unqualified</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {/* Attachement */}
                                    <div className='flex'>
                                        <input type="file" accept='image/*' name="attachment" hidden ref={handleChooseFile} onChange={handleAttachmentOnchange} />

                                        <TextField
                                            disabled={true}
                                            className={`w-60 relative left-1 text-sm`}
                                            id="standard-basic"
                                            onClick={() => { handleChooseFile.current.click() }}
                                            label={AttachmentName ? AttachmentName : 'Attachment (optional)'}
                                            variant="standard" />
                                        <span className='relative top-3 right-3'><FontAwesomeIcon icon={faPaperclip} /> </span>
                                    </div>

                                    {/* Comments */}
                                    <textarea
                                        onChange={(e) => setComments(e.target.value)}
                                        id='Comments'
                                        placeholder='Comments (optional)'
                                        className='text-xs w-64 h-24 resize-none relative top-7 border border-gray-400 placeholder:text-gray-400 placeholder:font-light rounded-sm focus:ring-0 outline-none' ></textarea>

                                </ThemeProvider>
                            </div>

                            <div className='mt-14 mx-auto'>
                                <button
                                    onClick={handleAddTask}
                                    disabled={LeadStatus && !SavingLoader ? false : true}
                                    className={`w-64 h-8 text-sm ${LeadStatus && !SavingLoader ? ' bg-slate-900 hover:bg-slate-700' : 'bg-slate-500'}  text-white rounded-lg`}>
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
