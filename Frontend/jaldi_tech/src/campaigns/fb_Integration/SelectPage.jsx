import React, { useEffect, useContext, useState } from 'react'
import FacebookHeader from './FacebookHeader'
import { useNavigate, redirect, } from 'react-router-dom'
import FacebookContext from '../../Context/FacebookContext'
import BackendContext from '../../Context/BackendContext'
import Loader from '../../utils/Loader'

export default function SelectPage() {

    const { FacebookPagesResponse, FacebookAdAccontsFunc, } = useContext(FacebookContext)
    const { SelectedPage, setSelectedPage } = useContext(BackendContext)
    const navigate = useNavigate()

    const [Checked, setChecked] = useState(null)
    const [loading, setloading] = useState(true)


    const SelectPageSubmitFunc = () => {
        setloading(true)
        FacebookAdAccontsFunc().then(() => {
            navigate('/campaigns/selectAdAccount', { replace: true })
            setloading(false)
        }).catch((error) => {
            console.log(error)
            alert('No ad Account found')
            setloading(false)
        })
    }

    const handleOnChange = (e) => {
        setSelectedPage({
            'id': e.target.id,
            'name': e.target.name,
            'access_token': e.target.value
        })
    }

    useEffect(() => {
        if (FacebookPagesResponse === null) {
            console.log(FacebookPagesResponse)
            redirect('/campaigns/connectFacebook')
        }
        setTimeout(() => {
            setloading(false)
        }, 1000);
    }, [FacebookPagesResponse])



    return (
        <>
            <FacebookHeader StepName={"Facebook Integration"} Step_no={2} ></FacebookHeader>
            {loading ? <Loader></Loader> : <div>
                {FacebookPagesResponse &&
                    <div className='text-center  mt-8 my-2 flex flex-col space-y-7 h-64 overflow-auto'>
                        <h1 className='text-black font-extralight relative right-10 mb-2'>Select your Facebook Page</h1>
                        <div className='flex flex-col space-y-3 items-center'>
                            <div className='flex flex-col space-y-3'>

                                {/* List of all Pages */}
                                {FacebookPagesResponse.data.map((page, index) => {
                                    return (
                                        <div key={index} className='flex space-x-3'>
                                            <input id={page.id} type="checkbox" value={page.access_token} name={page.name}
                                                checked={Checked === page.id && true} onClick={() => setChecked(page.id)} onChange={handleOnChange}
                                                className={`border border-blue-800 cursor-pointer outline-none focus:ring-0`} />
                                            <label htmlFor={page.id} className='relative bottom-1'>{page.name}</label>
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
                    <button onClick={SelectPageSubmitFunc} disabled={!SelectedPage ? true : false} className={`w-24 h-10  text-white ${SelectedPage ? 'bg-slate-900 hover:bg-slate-700' : 'bg-slate-400'} rounded-lg`}>Next</button>
                </footer>
            </div>}
        </>
    )
}
