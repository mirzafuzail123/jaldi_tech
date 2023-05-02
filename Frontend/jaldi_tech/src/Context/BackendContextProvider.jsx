import React, { useState } from 'react'
import BackendContext from './BackendContext'
import BackendInstance from '../utils/BackendInstance'

export default function BackendContextProvider(props) {

    const [Reload, setReload] = useState(false)


    const [SelectedPage, setSelectedPage] = useState(null)
    const [SelectedAccount, setSelectedAccount] = useState(null)

    const [SingleCampaignData, setSingleCampaignData] = useState(null)
    const [SingleLeadData, setSingleLeadData] = useState(null)

    const [NotificationMessage, setNotificationMessage] = useState(null)

    // Register User
    const RegisterUserFunc = async (data) => {
        const response = await BackendInstance.post('/register/', { data })
    }

    // Login User
    const LoginUserFunc = async (data) => {
        const response = await BackendInstance.post('/login/', { data })
        if (response.status === 200) {
            localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
            localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh_token));
            localStorage.setItem('user_data', JSON.stringify({ 'id': response.data.id, 'email': response.data.email, 'username': response.data.username, 'last_login': response.data.last_login, 'role': response.data.role }))
            if (response.data.facebookToken) {
                localStorage.setItem('facebookIntegrationInfo', JSON.stringify({ 'facebookToken': response.data.facebookToken, 'adAccountId': response.data.adAccountId }))
            }
        }
    }


    // Create Agent
    const CreateAgentFunc = async (data) => {
        const response = await BackendInstance.post('/createAgent/', { data })
    }


    // Retreive Agents List
    const AgentListFunc = async () => {
        const response = await BackendInstance.get('/agentsList/')
        return response.data
    }


    // Campaign Agents
    const CampaignAgentsFunc = async (id) => {
        const response = await BackendInstance.get(`/campaignAgents/${id}`)
        return response.data
    }


    // Add Agents to Campaign
    const AddAgentsToCampaignFunc = async (id, email) => {
        const response = await BackendInstance.post(`/addAgentToCampaign/${id}/`, { email })
    }


    //    Remove Agents from Campaign
    const RemoveCampaignAgentFunc = async (id, email) => {
        const response = await BackendInstance.post(`/removeCampaignAgent/${id}/`, { email })
    }


    // Save Integration
    const SaveIntegrationFunc = async (FacebookAuthResponse) => {
        const data = {
            'facebookToken': FacebookAuthResponse.accessToken,
            'facebookUserId': FacebookAuthResponse.userID,
            'pageId': SelectedPage.id,
            'pageName': SelectedPage.name,
            'pageToken': SelectedPage.access_token,
            'adAccountId': SelectedAccount.id,
            'adAccountName': SelectedAccount.name,
        }
        const response = await BackendInstance.post('/facebookIntegration/', { data })
    }


    // Save Facebook Campaign
    const SaveCampaignFunc = async (CampaignName, SelectedCampaign, SelectedAds, SelectedAgents) => {
        const campaignData = {
            'name': CampaignName,
            'campaignName': SelectedCampaign.campaignName,
            'campaignId': SelectedCampaign.campaignId,
            'agents': SelectedAgents
        }
        const adsData = {
            'ads': SelectedAds,
            'agents': SelectedAgents
        }
        const response = await BackendInstance.post('/saveCampaign/', { campaignData, adsData })

    }


    // Save Manual Campaign
    const SaveManualCampaignFunc = async (campaignName, leadData, agent) => {
        const data = {
            'name': campaignName,
            'leadData': leadData,
            'agent': agent
        }
        const response = await BackendInstance.post('/createManualCampaign/', { data })
    }

    // Save CSV Campaign 
    const SaveCSVCampaignFunc = async (
        CampaignName, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList,
        PhoneEntriesList, NotesEntriesList, SelectedAgents
    ) => {
        const leads = []
        FirstNameEntriesList.map((value, index) => {
            const leadData = {
                'fullName': FirstNameEntriesList[index] + ' ' + LastNameEntriesList[index],
                'email': EmailEntriesList[index],
                'phone_number': PhoneEntriesList[index],
                'note': NotesEntriesList[index]
            }
            leads.push(leadData)
        })
        const data = {
            'name': CampaignName,
            'leadData': leads,
            'agents': SelectedAgents
        }
        const response = await BackendInstance.post('/createCSVCampaign/', { data })
    }


    // Fetching Campaign List
    const CampaignListFunc = async () => {
        const response = await BackendInstance.get('/campaignList/')
        if (response.status === 200) {
            return response.data
        }
        else {
            return null
        }
    }


    // Fetching Campaign Detail
    const SingleCampaignFunc = async (campaignId) => {
        const response = await BackendInstance.get(`/singleCampaign/${campaignId}/`)
        return response.data
    }


    // Fetching Campaign Task List
    const CampaignTaskListFunc = async (id) => {
        const response = await BackendInstance.get(`/campaignTaskList/${id}/`)
        return response.data
    }


    // Fetching Campaign activities
    const CampaignActivityListFunc = async (id) => {
        const response = await BackendInstance.get(`/campaignActivityList/${id}`)
        return response.data
    }


    // Updating Campaign Func
    const UpdateCampaignFunc = async (data, campaignId) => {
        const response = await BackendInstance.patch(`/updateCampaign/${campaignId}/`, data)
    }


    // Delete Campaign Func
    const DeleteCampaignFunc = async (campaignId) => {
        const response = await BackendInstance.delete(`/deleteCampaign/${campaignId}/`)
    }


    // Fetchinh Lead list
    const LeadListFunc = async () => {
        const response = await BackendInstance.get('/leadList/')
        return response.data
    }


    // Deleting Leads
    const LeadDeleteFunc = async (idList) => {
        const response = await BackendInstance.delete('/leadDelete/', {
            data: {
                ids: idList
            }
        })
    }

    // Adding Leads to existing Campaign
    const AddCSVLeadsFunc = async (
        CampaignId, FirstNameEntriesList, LastNameEntriesList, EmailEntriesList,
        PhoneEntriesList, NotesEntriesList,) => {
        const leads = []
        FirstNameEntriesList.map((value, index) => {
            const leadData = {
                'fullName': FirstNameEntriesList[index] + ' ' + LastNameEntriesList[index],
                'email': EmailEntriesList[index],
                'phone_number': PhoneEntriesList[index],
                'note': NotesEntriesList[index]
            }
            leads.push(leadData)
        })
        const data = {
            'id': CampaignId,
            'leadData': leads

        }
        const response = await BackendInstance.post('/addLead/', data)
    }


    // Adding leads manually in campaigns
    const AddManualLeadsFunc = async (CampaignId, leadData, agent) => {
        const data = {
            'id': CampaignId,
            'leadData': leadData,
            'leadOwner': agent
        }
        const response = await BackendInstance.post('/addLead/', data)
    }


    // Adding Tasks to Leads
    const AddLeadTaskFunc = async (id, status, attachment, comment) => {
        const response = await BackendInstance.post(`/addLeadTask/${id}/`, { status, attachment, comment })

    }

    // Fetching Lead Task list
    const LeadTaskListFunc = async (leadId) => {
        const response = await BackendInstance.get(`/leadTaskList/${leadId}/`)
        return response.data
    }


    // Fetching Lead Activity List
    const LeadActivityListFunc = async (id) => {
        const response = await BackendInstance.get(`/leadActivityList/${id}/`)
        return response.data
    }


    // Fetching Single Lead
    const LeadDetailFunc = async (id) => {
        const response = await BackendInstance.get(`/singleLead/${id}/`)
        return response.data
    }


    // Reassigning Agent to Lead
    const LeadReassinAgentFunc = async (id, agentId) => {
        const response = await BackendInstance.patch(`/leadReassignAgent/${id}/`, { 'leadOwner': agentId })
    }


    // Fetching Notification List
    const NotificationListFunc = async () => {
        const response = await BackendInstance.get('/notificationList/')
        return response.data
    }


    // Reading Notification
    const ReadNotificationFunc = async (id) => {
        const response = await BackendInstance.patch(`/readNotification/${id}/`, { 'is_read': true })
        console.log(response)
    }




    return (
        <BackendContext.Provider value={{
            Reload, setReload, SaveIntegrationFunc, RegisterUserFunc, LoginUserFunc, CreateAgentFunc, AgentListFunc, SelectedPage,
            setSelectedPage, SelectedAccount, setSelectedAccount, SaveCampaignFunc, SaveManualCampaignFunc, SaveCSVCampaignFunc,
            CampaignListFunc, SingleCampaignFunc, SingleCampaignData, setSingleCampaignData, UpdateCampaignFunc, AddAgentsToCampaignFunc,
            RemoveCampaignAgentFunc, DeleteCampaignFunc, LeadListFunc, SingleLeadData, setSingleLeadData, LeadDeleteFunc, AddCSVLeadsFunc, AddManualLeadsFunc,
            CampaignAgentsFunc, AddLeadTaskFunc, LeadTaskListFunc, LeadDetailFunc, CampaignTaskListFunc, LeadActivityListFunc, CampaignActivityListFunc,
            LeadReassinAgentFunc, NotificationListFunc, ReadNotificationFunc, NotificationMessage, setNotificationMessage

        }}>
            {props.children}
        </BackendContext.Provider>
    )
}
