import React, { Children } from 'react'
import ActiveAgents from './AgentsList/ActiveAgents'
import CreateAgent from './CreateAgent/CreateAgent'
import PausedAgents from './AgentsList/PausedAgents'
import AgentCreationSuccess from './CreateAgent/AgentCreationSuccess'
import BackendInstance from '../utils/BackendInstance'
export default function AgentsRouter() {
    return (
        [

            // Agents List
            {
                path: "/agents/active",
                element: <ActiveAgents />,
            },
            {
                path: "/agents/paused",
                element: <PausedAgents />,
                //   loader: teamLoader,
            },


            // Create Agent
            {
                path: "/agents/createAgent",
                element: <CreateAgent />,
                //   loader: teamLoader,
            },
            {
                path: "/agents/success",
                element: <AgentCreationSuccess />,
                //   loader: teamLoader,
            },
        ]
    )
}
