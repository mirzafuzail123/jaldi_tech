import React, { useEffect, useState, useContext } from 'react'
import BackendContext from '../Context/BackendContext'
import Swal from 'sweetalert2'
import NotificationLogo from '../assets/NotificationLogo.gif'
export default function Notification() {

    const id = JSON.parse(localStorage.getItem('user_data')).id
    const [showNotification, setshowNotification] = useState(false)
    const { NotificationMessage, setNotificationMessage } = useContext(BackendContext)

    useEffect(() => {
        var pusher = new Pusher('375c49019de020560ecb', {
            cluster: 'ap2',
            encrypted: true
        });
        setshowNotification(true)
        setTimeout(() => {
            setshowNotification(false)
        }, 5000);

        var channel = pusher.subscribe(`notification-${id}`);
        channel.bind(`notification-event`, function (data) {
            setNotificationMessage(data)
            Swal.fire({
                html: `
                <div class="flex space-x-4 space items-center h-20 overflow-hidden ">
                  <img src=${NotificationLogo} alt="My Image" class="w-12 bg-slate-700 border-r-2 border-gray-100 " />
                  <div class="flex flex-col ">
                    <p class="whitespace-nowrap text-sm font-semibold text-start ">New Leads</p>
                    <p class="whitespace-nowrap text-xs ">${data.message}</p>
                  </div>
                </div>
              `,
                position: 'top-end',
                width: 'auto',
                showConfirmButton: false,
                padding: '0rem 0rem 0rem',
                customClass: {
                    htmlContainer: 'my-swal-container',
                },
                showClass: {
                    popup: 'animate__animated animate__fadeInRight animate__faster"'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp animate__faster"'
                }
            })
        });
    }, [])






}
