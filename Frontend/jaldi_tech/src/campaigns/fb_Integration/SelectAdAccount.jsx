import React, { useContext, useState, useEffect } from 'react'
import FacebookContext from '../../Context/FacebookContext'
import BackendContext from '../../Context/BackendContext'
import Loader from '../../utils/Loader'
import FacebookHeader from './FacebookHeader'
import { useNavigate } from 'react-router-dom'

export default function SelectAdAccount() {

    const navigate = useNavigate()
    const { FacebookAuthResponse, FacebookAdAccountsResponse, } = useContext(FacebookContext)
    const { SaveIntegrationFunc, setSelectedPage, SelectedPage, SelectedAccount, setSelectedAccount, } = useContext(BackendContext)

    const [loading, setloading] = useState(true)
    const [Checked, setChecked] = useState(null)

    const SelectAdAccountSubmitFunc = () => {
        setloading(true)
        localStorage.setItem('facebookIntegrationInfo', JSON.stringify({ 'facebookToken': FacebookAuthResponse.accessToken, 'adAccountId': SelectedAccount.id }))
        SaveIntegrationFunc(FacebookAuthResponse).then(() => {
            setSelectedPage(null)
            setSelectedAccount(null)
            navigate('/campaigns/integrationSuccess', { replace: true })
        })
    }

    const handleOnChange = (e) => {
        setSelectedAccount({
            'id': e.target.id,
            'name': e.target.name,
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [FacebookAdAccountsResponse])

    return (
        <>
            <FacebookHeader StepName={"Facebook Integration"} Step_no={3} ></FacebookHeader>
            {loading ? <Loader></Loader> : <div>
                {FacebookAdAccountsResponse &&
                    <div className='items-center mt-8 my-2 flex flex-col space-y-3 h-64 overflow-auto'>
                        <h1 className='text-black font-extralight relative right-10 mb-2'>Select your Facebook Ad Account</h1>

                        <div className='flex flex-col space-y-3 items-center'>
                            <div className='flex flex-col space-y-3'>

                                {/* List of all Pages */}
                                {FacebookAdAccountsResponse.data.map((account, index) => {
                                    return (
                                        <div key={index} className='flex space-x-3'>
                                            <input id={account.id} type="checkbox" name={account.name}
                                                checked={Checked === account.id && true} onClick={() => setChecked(account.id)} onChange={handleOnChange}
                                                className={`border border-blue-800 cursor-pointer outline-none focus:ring-0`} />
                                            <label htmlFor={account.id} className='relative bottom-1'>{account.name}</label>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                    </div>
                }
                <hr />
                <footer className='flex pt-2 justify-between sticky  px-5'>
                    <button onClick={() => navigate('/campaigns/connectFacebook')} className={`w-24 h-10  text-white bg-slate-900 hover:bg-slate-700 rounded-lg`}>Cancel</button>
                    <button onClick={SelectAdAccountSubmitFunc} disabled={!SelectedAccount ? true : false} className={`w-24 h-10  text-white ${SelectedAccount ? 'bg-slate-900 hover:bg-slate-700' : 'bg-slate-400'} rounded-lg`}>Next</button>
                </footer>
            </div>}
        </>
    )
}
