import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../css/Transitions'
import UserAvatar from '../assets/user-avatar-32.png';
import NotificationDropDown from '../DropDowns/Notification/NotificationDropDown';
export default function Header({ sidebarOpen, setSidebarOpen }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {

        const clickHandler = ({ target }) => {
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });


    return (
        <nav className="sticky w-full  top-0 bg-slate-200 border-b border-slate-300 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12 -mb-px">

                    {/* Header: Left side */}
                    <div className="flex ">

                        {/* Hamburger button */}
                        <button
                            className="text-slate-500 hover:text-slate-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="5" width="16" height="2" />
                                <rect x="4" y="11" width="16" height="2" />
                                <rect x="4" y="17" width="16" height="2" />
                            </svg>
                        </button>

                    </div>

                    {/* Header: Right side */}
                    <div className="flex space-x-5 items-center">

                        {/* Notification */}
                        <NotificationDropDown />

                        {/* Profile */}
                        <div className="relative inline-flex">
                            <button
                                ref={trigger}
                                className="inline-flex justify-center items-center group"
                                aria-haspopup="true"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                            >
                                <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
                                <div className="flex items-center truncate">
                                    <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">Acme Inc.</span>
                                    <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
                                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                    </svg>
                                </div>
                            </button>

                            <Transition
                                className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                                show={dropdownOpen}
                                enter="transition ease-out duration-200 transform"
                                enterStart="opacity-0 -translate-y-2"
                                enterEnd="opacity-100 translate-y-0"
                                leave="transition ease-out duration-200"
                                leaveStart="opacity-100"
                                leaveEnd="opacity-0"
                            >
                                <div
                                    ref={dropdown}
                                    onFocus={() => setDropdownOpen(true)}
                                    onBlur={() => setDropdownOpen(false)}
                                >
                                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
                                        <div className="font-medium text-slate-800">Acme Inc.</div>
                                        <div className="text-xs text-slate-500 italic">Administrator</div>
                                    </div>
                                    <ul>
                                        <li>
                                            <Link
                                                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                                                to="/settings"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                                Settings
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                                                to="/login"
                                                onClick={() => {
                                                    localStorage.clear()
                                                    setDropdownOpen(!dropdownOpen)
                                                }}
                                            >
                                                Sign Out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Transition>
                        </div>

                    </div>

                </div>
            </div>
        </nav>
    );
}




