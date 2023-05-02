import React from 'react'
import CreateAgentHeader from './CreateAgentHeader'
import EmailLogo from '../../assets/EmailLogo.png'
import { useNavigate } from 'react-router-dom'
export default function AgentCreationSuccess() {
    const navigate = useNavigate()

    return (
        <>
            <CreateAgentHeader></CreateAgentHeader>
            <div className='items-center text-center mt-10 flex flex-col space-y-3 h-60 mb-4'>
                <img src={EmailLogo} alt="Facebook " />
                <p className='text-xs font-light '>We have sent an email to <br /> <span className='text center font-bold'>mirza@gmail.com</span></p>
                <p className='text-xs font-light '>Following the link in email , user can insatall <br />  app and start working with leads</p>
            </div>
            <hr />
            <footer className='pt-3 text-center sticky px-5'>
                <button onClick={() => navigate('/agents/active')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Finish</button>
            </footer>
        </>
    )
}
