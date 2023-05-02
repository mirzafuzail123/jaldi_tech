import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import AgencyLogo from '../assets/AgencyLogo.png'

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const role = JSON.parse(localStorage.getItem('user_data')).role

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo */}
          <NavLink end to="/" className="flex space-x-4 ">
            <div className='bg-slate-800'>
              <img src={AgencyLogo} className={`${sidebarExpanded ? 'block' : 'hidden'} `} alt="" />
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-16">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>

            <ul className="mt-3">

              {/* Dashboard */}
              <Link to={'/dashboard'} className={`flex p-2 cursor-pointer space-x-3 ${(pathname === '/dashboard' || pathname.includes('dashboard')) ? 'bg-slate-900' : 'bg-none'}`}>
                <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    className={`fill-current text-slate-400 ${(pathname === '/dashboard' || pathname.includes('dashboard')) && '!text-indigo-500'
                      }`}
                    d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                  />
                  <path
                    className={`fill-current text-slate-600 ${(pathname === '/dashboard' || pathname.includes('dashboard')) && 'text-indigo-600'}`}
                    d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                  />
                  <path
                    className={`fill-current text-slate-400 ${(pathname === '/dashboard' || pathname.includes('dashboard')) && 'text-indigo-200'}`}
                    d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                  />
                </svg>
                <span className={`${sidebarExpanded ? 'block' : 'hidden'}  text-slate-200 hover:text-slate-400 truncate transition duration-150 `}>
                  Dashboard
                </span>
              </Link>

              {/* Campaigns */}
              <Link to={localStorage.getItem('facebookIntegrationInfo') || role === 'Agent' ? '/campaigns/active' : '/campaigns/connectFacebook'} className={`flex p-2 cursor-pointer space-x-3 ${(pathname === '/campaigns' || pathname.includes('campaigns')) ? 'bg-slate-900' : 'bg-none'}`}>
                <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    className={`fill-current text-slate-600 ${pathname.includes('campaigns') && 'text-indigo-500'}`}
                    d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                  />
                  <path
                    className={`fill-current text-slate-400 ${pathname.includes('campaigns') && 'text-indigo-300'}`}
                    d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                  />
                </svg>
                <span className={`${sidebarExpanded ? 'block' : 'hidden'}  text-slate-200 hover:text-slate-400 truncate transition duration-150 `}>
                  Campaigns
                </span>
              </Link>

              {/* Leads */}
              <Link to={'/leads/active'} className={`flex p-2 cursor-pointer space-x-3 ${(pathname === '/leads' || pathname.includes('leads')) ? 'bg-slate-900' : 'bg-none'}`}>
                <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    className={`fill-current text-slate-600 ${pathname.includes('leads') && 'text-indigo-500'}`}
                    d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                  />
                  <path className={`fill-current text-slate-600 ${pathname.includes('leads') && 'text-indigo-500'}`} d="M1 1h22v23H1z" />
                  <path
                    className={`fill-current text-slate-400 ${pathname.includes('leads') && 'text-indigo-300'}`}
                    d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                  />
                </svg>
                <span className={`${sidebarExpanded ? 'block' : 'hidden'}  text-slate-200 hover:text-slate-400 truncate transition duration-150 `}>
                  All leads
                </span>
              </Link>

              {/* Agents */}
              {role === 'Admin' &&
                <Link to={'/agents/active'} className={`flex p-2 cursor-pointer space-x-3 ${(pathname === '/agents' || pathname.includes('agents')) ? 'bg-slate-900' : 'bg-none'}`}>
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path
                      className={`fill-current text-slate-600 ${pathname.includes('agents') && 'text-indigo-500'}`}
                      d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                    />
                    <path
                      className={`fill-current text-slate-400 ${pathname.includes('agents') && 'text-indigo-300'}`}
                      d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                    />
                  </svg>
                  <span className={`${sidebarExpanded ? 'block' : 'hidden'}  text-slate-200 hover:text-slate-400 truncate transition duration-150 `}>
                    Agents
                  </span>
                </Link>
              }

            </ul>
          </div>
          {/* More group */}
          <div className=''>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
            </h3>
            <ul className="mt-3">

              {/* Settings */}
              <Link to={'/settings'} className={`flex p-2 cursor-pointer space-x-3 ${(pathname === '/settings' || pathname.includes('settings')) ? 'bg-slate-900' : 'bg-none'}`}>
                <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    className={`fill-current text-slate-600 ${pathname.includes('settings') && 'text-indigo-500'}`}
                    d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                  />
                  <path
                    className={`fill-current text-slate-400 ${pathname.includes('settings') && 'text-indigo-300'}`}
                    d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                  />
                  <path
                    className={`fill-current text-slate-600 ${pathname.includes('settings') && 'text-indigo-500'}`}
                    d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                  />
                  <path
                    className={`fill-current text-slate-400 ${pathname.includes('settings') && 'text-indigo-300'}`}
                    d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                  />
                </svg>
                <span className={`${sidebarExpanded ? 'block' : 'hidden'}  text-slate-200 hover:text-slate-400 truncate transition duration-150 `}>
                  Settings
                </span>
              </Link>

              {/* Help */}
              <Link to={'/help'} className={`flex p-2 cursor-pointer space-x-3 ${(pathname === '/help' || pathname.includes('help')) ? 'bg-slate-900' : 'bg-none'}`}>
                <svg className="w-5 h-[6.5]" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-current text-slate-500" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                </svg>
                <span className={`${sidebarExpanded ? 'block' : 'hidden'}  text-slate-200 hover:text-slate-400 truncate transition duration-150 `}>
                  Help
                </span>
              </Link>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;