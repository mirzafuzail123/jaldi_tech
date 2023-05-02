import React, { useContext, useState, useEffect, useRef } from 'react'
import BackendContext from '../../Context/BackendContext'
import LeadDetailHeader from './LeadDetailHeader'
import AddLeadTaskModal from '../../Modals/Leads/AddLeadTaskModal'
import EmptyLogo from '../../assets/EmptyLogo.gif'
import Loader from '../../utils/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faNoteSticky, faPaperclip, faMinus, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
export default function LeadTasks() {

    const { SingleLeadData, LeadTaskListFunc } = useContext(BackendContext)
    const [AddTaskOpen, setAddTaskOpen] = useState(false)
    const [loading, setloading] = useState(true)
    const [SavingLoader, setSavingLoader] = useState(false)
    const [LeadTaskData, setLeadTaskData] = useState([])
    const [CommentModal, setCommentModal] = useState(null)
    const [dummyState, setdummyState] = useState(false)
    const CommentModalRef = useRef()

    useEffect(() => {
        const handler = (e) => {
            if (CommentModalRef.current && !CommentModalRef.current.contains(e.target)) {
                setCommentModal(false)
            }
        }
        document.addEventListener('mousedown', handler)
    }, [])

    const ConvertDateFormat = (date) => {
        if (date) {
            const newDate = new Date(date);
            const formatDate = newDate.toLocaleString();
            return formatDate
        }

    }


    useEffect(() => {
        LeadTaskListFunc(SingleLeadData.id).then((data) => {
            setLeadTaskData(data)
            setloading(false)
            setSavingLoader(false)
            setAddTaskOpen(false)
        })
    }, [dummyState])

    return (
        SingleLeadData && <>
            <LeadDetailHeader name={SingleLeadData.fullName} leadId={SingleLeadData.id} setAddTaskOpen={setAddTaskOpen} />
            <AddLeadTaskModal Modal={AddTaskOpen} setModal={setAddTaskOpen} leadId={SingleLeadData.id} SavingLoader={SavingLoader} setSavingLoader={setSavingLoader} dummyState={dummyState} setdummyState={setdummyState} />

            {loading ? <Loader /> :
                <div>
                    {LeadTaskData.length === 0 ?
                        <div className='  text-center space-y-3  mt-7'>
                            <img src={EmptyLogo} className='mx-auto h-60 w-60' alt="Facebook " />
                            <h1 className='text-sm text-gray-500 tracking-wide'>No tasks found  </h1>
                        </div> :


                        <div className="relative max-h-[19rem]  w-[95%]  mx-auto  overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5">

                            <div className="relative ">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Lead Owner
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Lead
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Current status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Created
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Attachment
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Comment
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className='space-y-3 '>
                                        {LeadTaskData.map((task, index) => {
                                            return (
                                                <tr key={index} className="bg-gray-50 border-b ">
                                                    <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                        <FontAwesomeIcon icon={faUser} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                        {task.agent}

                                                    </th>
                                                    <th className="cursor-pointer  hover:text-blue-400 px-6 py-4 text-xs  whitespace-nowrap">
                                                        <FontAwesomeIcon icon={faNoteSticky} className=' relative top-[0.20rem]  mr-2  h-3 w-3 p-1 text-slate-700 border bg-gray-200 rounded-full' />
                                                        {task.lead}

                                                    </th>
                                                    <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                        <div className=' bg-green-200 text-green-900 h-5  rounded-full '>
                                                            <span
                                                                className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">{task.status}
                                                            </span>
                                                        </div>

                                                    </td>
                                                    <td className="px-6 py-4 text-xs  whitespace-nowrap">
                                                        {ConvertDateFormat(task.created)}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs  whitespace-nowrap text-center">
                                                        <PhotoProvider>
                                                            <PhotoView src={`data:image/jpeg;base64,${task.attachment}`}>
                                                                <FontAwesomeIcon className='cursor-pointer' icon={task.attachment ? faPaperclip : faMinus} />
                                                            </PhotoView>
                                                        </PhotoProvider>
                                                    </td>

                                                    <td className="px-6 py-4 text-xs relative flex  whitespace-nowrap text-center">

                                                        <FontAwesomeIcon className='cursor-pointer relative ' icon={task.comment ? faCircleInfo : faMinus} onClick={() => setCommentModal(task.id)} />
                                                        {CommentModal === task.id && task.comment &&
                                                            <div ref={CommentModalRef} className='bubble absolute bg-[#a8aeb5] -top-3   py-1 rounded-md right-28 z-60 '>
                                                                <textarea readOnly value={task.comment} className='text-xs w-44  resize-none border-none outline-none focus:ring-0 bg-[#a8aeb5] text-gray-50 scrollbar-none'></textarea>
                                                            </div>
                                                        }

                                                    </td>


                                                </tr>
                                            )
                                        })}



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
