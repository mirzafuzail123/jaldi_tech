import React from 'react'
import LoaderLogo from '../assets/LoaderLogo.gif'
export default function Loader() {
    return (
        <>
            <div className="flex items-center justify-center z-50 mt-10 ">
                <img className='items-center h-60 w-60 ' src={LoaderLogo} alt="" />

            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </>

    )
}
