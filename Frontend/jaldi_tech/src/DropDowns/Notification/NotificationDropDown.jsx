import React, { useRef, useContext, useState, useEffect } from 'react'
import BackendContext from '../../Context/BackendContext'
import { Transition } from '@headlessui/react'
import NotificationIcon from '../../assets/NotificationIcon.gif'
import SingleNotification from '../../assets/SingleNotification.gif'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'

export default function NotificationDropDown() {

    const NotificationRef = useRef()
    const navigate = useNavigate()
    const { NotificationListFunc, ReadNotificationFunc, NotificationMessage } = useContext(BackendContext)
    const [NotificationOpen, setNotificationOpen] = useState(false)
    const [NotificationData, setNotificationData] = useState([])
    const [UnreadNotifications, setUnreadNotifications] = useState([])
    const [dummyState, setdummyState] = useState(false)
    moment.updateLocale('en', {
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'just now',
            m: '1 minute ago',
            mm: '%d minutes ago',
            h: '1 hour ago',
            hh: '%d hours ago',
            d: '1 day ago',
            dd: '%d days ago',
            M: '1 month ago',
            MM: '%d months ago',
            y: '1 year ago',
            yy: '%d years ago',
        },
    });


    const FormattedTimeStamp = (timeStamp) => {

        const formattedTimestamp = moment(timeStamp).fromNow(true);
        return formattedTimestamp
    }

    const handleReadNotification = async (id, is_read) => {
        if (is_read === false) {
            ReadNotificationFunc(id).then(() => {
                setNotificationOpen(false)
                setdummyState(!dummyState)
                navigate('/leads/active')

            })
        }
        else {
            setNotificationOpen(false)
            navigate('/leads/active')
        }

    }


    useEffect(() => {
        const handler = (e) => {
            if (NotificationRef.current && !NotificationRef.current.contains(e.target)) {
                setNotificationOpen(false)
            }

        }
        document.addEventListener('mousedown', handler)
    }, [])

    useEffect(() => {
        NotificationListFunc().then((data) => {
            setNotificationData(data)
            setUnreadNotifications(data.filter((notification) => notification.is_read === false))
        })
    }, [dummyState, NotificationMessage])


    return (
        <div className='relative' >
            <div className='cursor-pointer' onClick={() => setNotificationOpen(true)}>
                <img src={NotificationIcon} className=' h-10 w-10 ' alt="" />
                {UnreadNotifications.length !== 0 &&
                    <div class="absolute inline-flex items-center justify-center w-5 h-5 text-[0.70rem] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 -right-0 ">{UnreadNotifications.length}</div>}
            </div>
            <Transition
                show={NotificationOpen}
                enter="transition-all duration-300 transform origin-top"
                enterFrom="opacity-0 translate-y-2 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="transition-all duration-300 transform origin-top"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-2 scale-95"
            >
                <div ref={NotificationRef} className="flex flex-col p-2 absolute z-10 w-80 h-64 -left-32 mt-1 bg-white border rounded-lg shadow-2xl">

                    <div className='w-full h-[13%] border-b-[1px] border-gray-200'>
                        <h1 className='text-sm font-semibold px-1 tracking-wide'>Notifications</h1>
                    </div>
                    <div className='w-full flex flex-col space-y-3 mt-3 h-[75%] border-b-[1px] border-gray-200  overflow-auto scrollbar-none scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar'>
                        {NotificationData.length === 0 ? <h1 className='m-auto text-xs'>No notifications !</h1> :
                            NotificationData.map((notification, index) => {
                                return (

                                    <div className='flex space-x-3 hover:bg-gray-50 cursor-pointer' key={index} onClick={() => { handleReadNotification(notification.id, notification.is_read) }}>
                                        <img src={SingleNotification} className='w-7 h-7' alt="" />
                                        <h1 className={`text-xs ${!notification.is_read && 'font-semibold'} `}>{notification.message}</h1>
                                        <div className=' bg-gray-200 flex whitespace-nowrap text-black h-5   rounded-full '>
                                            <span
                                                className="text-[0.70rem] px-1 left-1 relative   mr-2">{FormattedTimeStamp(notification.created)}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })


                        }
                    </div>

                </div>
            </Transition>

        </div>
    )
}
