import React, { useEffect, useState, useContext } from 'react'
import { FacebookAuthProvider, getAuth, signInWithRedirect, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import FacebookHeader from './FacebookHeader'
import FacebookLogo from '../../assets/FacebookLogo.png'
import { useNavigate } from 'react-router-dom'
import FacebookContext from '../../Context/FacebookContext'
import Loader from '../../utils/Loader'

export default function ConnectFacebook() {
    const navigate = useNavigate()
    const { setFacebookAuthResponse, FacebookPagesListFunc } = useContext(FacebookContext)
    const [loading, setloading] = useState(true)

    // Firebase scopes
    const provider = new FacebookAuthProvider()
    provider.addScope("ads_management");
    provider.addScope("business_management");
    provider.addScope("ads_read");
    provider.addScope("pages_show_list");
    provider.addScope("pages_read_engagement");
    provider.addScope("pages_manage_ads");
    provider.addScope("leads_retrieval");
    provider.addScope("pages_read_engagement");
    provider.addScope("pages_manage_metadata");

    const auth = getAuth()


    // Facebook login
    const handleLogin = async (e) => {
        e.preventDefault()
        setloading(true)
        signInWithPopup(auth, provider)
            .then((result) => {
                setloading(true)
                // The signed-in user info.
                const user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                setFacebookAuthResponse({ 'accessToken': accessToken, 'userID': user.providerData[0].uid })
                FacebookPagesListFunc(accessToken).then(() => {
                    navigate('/campaigns/selectPage')
                })
                setloading(false)

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    };



    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    })


    // const handleLogout = () => {
    //     window.FB.logout((response) => {
    //         setAuthResponse(null);
    //     });
    // }

    return (

        <>
            <FacebookHeader StepName={"Let's create your first campaign"} Step_no={1} ></FacebookHeader>
            {loading ? <Loader></Loader> : <div>
                <div className='items-center my-16 flex flex-col '>
                    <h1 className='text-black font-extralight mb-2'>Connect your Facebook account</h1>
                    <img src={FacebookLogo} alt="Facebook " />
                    <button onClick={handleLogin} className='text-white mt-5 bg-slate-900 hover:bg-slate-700 w-48 h-10 rounded-lg'>Connect Facebook</button>

                </div>
            </div>}

        </>
    )
}
