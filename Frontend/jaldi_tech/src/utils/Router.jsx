import React, { useContext } from 'react'
import {
    createBrowserRouter, redirect, RouterProvider
} from "react-router-dom";

// Components Import
import Base from '../Layout/Base';
import Dashboard from '../dashboard/Dashboard';
import Campaigns from '../campaigns/Campaigns';
import CampaignRouter from '../campaigns/CampaignRouter';
import Agents from '../Agents/Agents';
import AgentsRouter from '../Agents/AgentsRouter';
import Leads from '../Leads.jsx/Leads';
import LeadsRouter from '../Leads.jsx/LeadsRouter';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';

const role = JSON.parse(localStorage.getItem('user_data')) && JSON.parse(localStorage.getItem('user_data')).role


function CustomRouter() {


    const router = createBrowserRouter([
        // General Routes
        {
            path: "/",
            element: <Base />,
            loader: () => {
                if (!localStorage.getItem('access_token')) {
                    throw redirect('/login')
                }
                return null
            },
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                    //   loader: teamLoader,
                },
                {
                    path: "/campaigns",
                    element: (
                        <Campaigns />
                    ),

                    children: CampaignRouter(),
                    // loader: () => {
                    //     throw redirect('/campaigns/connectFacebook')

                    // }
                },
                {
                    path: "/leads",
                    element: <Leads />,
                    children: LeadsRouter(),
                    // loader: CampaignLoader
                },
                {
                    path: "/agents",
                    element: <Agents />,
                    children: AgentsRouter(),
                    loader: () => {
                        if (role === 'Agent') {
                            throw redirect('/dashboard')
                        }
                        else {
                            return null
                        }
                    }
                },

            ],
        },

        // Login
        {
            path: "/login",
            element: <Login />,
            // children: AgentsRouter(),
            loader: () => {
                if (localStorage.getItem('access_token')) {
                    throw redirect('/')
                }
                return null
            },
        },
        {
            path: "/register",
            element: <Register />,
            // children: AgentsRouter(),
            loader: () => {
                if (localStorage.getItem('access_token')) {
                    throw redirect('/')
                }
                return null
            },
        },


    ]);
    return (
        <RouterProvider router={router} />
    )
}

export default CustomRouter;


// export default router