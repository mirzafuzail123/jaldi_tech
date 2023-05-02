import React, { useState } from 'react'
import FacebookContext from './FacebookContext'
import FacebookInstance from '../utils/FacebookInstance'
export default function FacebookContextProvider(props) {

    const [FacebookAuthResponse, setFacebookAuthResponse] = useState(null)
    const [FacebookPagesResponse, setFacebookPagesResponse] = useState(null)
    const [FacebookAdAccountsResponse, setFacebookAdAccountsResponse] = useState(null)
    const [FacebookAdsResponse, setFacebookAdsResponse] = useState(null)



    // Facebook Pages List
    const FacebookPagesListFunc = async (token) => {
        const params = {
            access_token: token,
            fields: 'id,name,access_token'
        }
        const response = await FacebookInstance.get('/me/accounts', { params })
        setFacebookPagesResponse(response.data)

    }

    // Facebook Ad Accounts List
    const FacebookAdAccontsFunc = async (token) => {
        const params = {
            access_token: FacebookAuthResponse.accessToken,
            fields: 'id,name'
        }
        const response = await FacebookInstance.get('/me/adaccounts', { params })
        console.log(response)
        setFacebookAdAccountsResponse(response.data)
    }



    // Getting Long lived token



    // Retrieving Campaigns and Ads
    const FacebookAdsFunc = async () => {
        const token = JSON.parse(localStorage.getItem('facebookIntegrationInfo')).facebookToken
        const act_id = JSON.parse(localStorage.getItem('facebookIntegrationInfo')).adAccountId
        const params = {
            access_token: token,
            fields: 'id,name,adsets.fields(id , name , ads.fields(id,name))'
        }
        const response = await FacebookInstance.get(`${act_id}/campaigns`, { params })
        setFacebookAdsResponse(response.data)
    }



    return (
        <FacebookContext.Provider value={{
            FacebookAuthResponse, setFacebookAuthResponse, FacebookPagesListFunc, FacebookPagesResponse,
            FacebookAdAccontsFunc, FacebookAdAccountsResponse, setFacebookAdAccountsResponse, FacebookAdsFunc,
            FacebookAdsResponse, setFacebookAdsResponse,
        }}>
            {props.children}
        </FacebookContext.Provider>
    )
}
