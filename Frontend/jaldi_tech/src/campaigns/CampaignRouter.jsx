import ConnectFacebook from './fb_Integration/ConnectFacebook';
import ActiveCampaigns from './CampaignList/ActiveCampaigns';
import PausedCampaigns from './CampaignList/PausedCampaigns';
import ArchieveCampaign from './CampaignList/ArchieveCampaigns'
import SelectPage from './fb_Integration/SelectPage';
import SelectAdAccount from './fb_Integration/SelectAdAccount';
import CreateCampaign from './CreateCampaign/CreateCampaign';
import SelectAds from './CreateCampaign/SelectAds';
import SelectAgents from './CreateCampaign/SelectAgents';
import CreateSuccess from './CreateCampaign/CreateSuccess';
import IntegrationSuccess from './fb_Integration/IntegrationSuccess';
import BackendInstance from '../utils/BackendInstance';
import CreateManualLead from './CreateManualLead/CreateManualLead';
import AssignAgent from './CreateManualLead/AssignAgent';
import CampaignDetail from './CampaignDetail/CampaignDetail';
import CampaignAgents from './CampaignDetail/CampaignAgents';
import CampaignTasks from './CampaignDetail/CampaignTasks';
import UploadCSV from './CreateCSVCampaign/UploadCSV';
import SelectColumns from './CreateCSVCampaign/SelectColumns';
import LeadUploadSuccess from './CreateCSVCampaign/LeadUploadSuccess';
import CSVAgents from './CreateCSVCampaign/CSVAgents';
import { redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CampaignActivity from './CampaignDetail/CampaignActivity';

const role = JSON.parse(localStorage.getItem('user_data')) && JSON.parse(localStorage.getItem('user_data')).role

const CheckingRole = async () => {
    if (role === 'Agent') {
        throw redirect('/campaigns/active')
    }
    else {
        return null
    }
}

function CampaignRouter() {

    return (
        [
            // Initial Integration
            {
                path: "/campaigns/connectFacebook",
                element: <ConnectFacebook />,

            },

            {
                path: "/campaigns/selectPage",
                element: <SelectPage />,

            },
            {
                path: "/campaigns/selectAdAccount",
                element: <SelectAdAccount />,
                //   loader: teamLoader,
            },
            {
                path: "/campaigns/integrationSuccess",
                element: <IntegrationSuccess />,
                //   loader: teamLoader,
            },



            // Creating Facebook Campaign
            {
                path: "/campaigns/createCampaign",
                element: <CreateCampaign />,
                loader: async () => {
                    await CheckingRole()
                    return null

                }
            },
            {
                path: "/campaigns/selectAds",
                element: <SelectAds />,
                loader: async () => {
                    await CheckingRole()
                    return null

                }
            },
            {
                path: "/campaigns/selectAgents",
                element: <SelectAgents />,
                loader: async () => {
                    const response = await BackendInstance.get('/agentsList/')
                    if (response.status === 200) {
                        return response.data
                    }
                    else {
                        return null
                    }
                },
            },
            {
                path: "/campaigns/success",
                element: <CreateSuccess />,
                loader: async () => {
                    await CheckingRole()
                    return null

                }
            },


            // Manual Leads

            {
                path: "/campaigns/createLead",
                element: <CreateManualLead />,
                loader: async () => {
                    await CheckingRole()
                    return null

                }
            },
            {
                path: "/campaigns/assignAgent",
                element: <AssignAgent />,
                loader: async () => {
                    await CheckingRole()
                    return null

                },
            },


            // Uploading CSV File
            {
                path: "/campaigns/uploadCSV",
                element: <UploadCSV />,
                loader: async () => {
                    await CheckingRole()
                    return null

                }
            },
            {
                path: "/campaigns/selectColums",
                element: <SelectColumns />,
                loader: async () => {
                    await CheckingRole()
                    return null

                }
            },
            {
                path: "/campaigns/uploaded",
                element: <LeadUploadSuccess />,
                loader: async () => {
                    await CheckingRole()
                    return null

                }

            },
            {
                path: "/campaigns/CSVAgents",
                element: <CSVAgents />,
                loader: async () => {
                    await CheckingRole()
                    const response = await BackendInstance.get('/agentsList/')
                    if (response.status === 200) {
                        return response.data
                    }
                    else {
                        return null
                    }
                },
            },



            // CampaignList
            {
                path: "/campaigns/active",
                element: <ActiveCampaigns />,
            },


            {
                path: "/campaigns/archived",
                element: <ArchieveCampaign />,
                //   loader: teamLoader,            
            },
            {
                path: "/campaigns/paused",
                element: <PausedCampaigns />,
                //   loader: teamLoader,            
            },


            // Campaign Detail
            {
                path: "/campaigns/detail/:campaignId",
                element: <CampaignDetail />,
            },
            {
                path: "/campaigns/campaignAgents/:campaignId",
                element: <CampaignAgents />,
                loader: async () => {
                    await CheckingRole()
                    return null
                }
            },
            {
                path: "/campaigns/campaignActivity/:campaignId",
                element: <CampaignActivity />,
            },
            {
                path: "/campaigns/campaignTasks/:campaignId",
                element: <CampaignTasks />,
            },
        ]
    )
}



export default CampaignRouter

